//Primero declaro las variables globales que voy a utilizar en todo el código, el array de las imagenes y los elementos que necesito del HTML. Pueden ser var. 
//Pero considero mejor declararlas como const, pues no deben cambiar su valor.
const listaImagenes = ["aubergine", "banana", "carrots", "cherries", "dollar", "lemon", "orange", "peach", "potato", "tomato"];
const cantidadMonedas = document.getElementById("nMonedas");
const cantidad = parseInt(cantidadMonedas.value); // convierto las nMonedas del HTML a número para poder hacer operaciones matemáticas con las monedas, ya que se recogen como un String.
const caja = document.getElementById("mAcumuladas");
const botonSalir = document.getElementById("salir");
const botonEchar = document.getElementById("echar");
const listaHistorial = document.getElementsByTagName("ul")[0]; //Cojo el primer y único elemento ul que tengo.
const pantallas = document.querySelectorAll(".pantalla");

botonSalir.disabled = true;//inicializamos la página con el botón cobrar deshabilitado.

//Creo una función para usarla en el evento que pasaremos después y que recogerá las monedas que insertemos.
function echarMonedas() {
    //debugger;
    if (!isNaN(cantidad) && cantidad > 0) { //si es un número, y este es mayor a cero:
        mAcumuladas.innerHTML = cantidad; //convertimos a número el string.
        botonSalir.disabled = false; // habilitamos poder echar cobrar el prremio.
        botonEchar.disabled = true; // deshabilitamos poder echar más monedas.
        listaHistorial.innerHTML += "<ul>Has introducido " + cantidadMonedas.value + " monedas</ul>";//Escribimos en el historial una nueva línea.
        caja.innerHTML = cantidadMonedas.value; // Pasamos las monedas introducidas a nuestro elemento que muestra las monedas que tenemos en la tragaperras.
    } else {
        alert("Introduce una cantidad válida. Has introducido " + cantidadMonedas.value + " monedas."); //Si la condición no se cumple mosytramos una adevertencia.
    }
}

//Creo la función que va a ejecutarse cuando el evento palanca sea desencadenado
function tirarPalanca(palanca) { // pasamos el evento por parámetro.

    const cajaAcumulada = parseInt(caja.innerHTML); //Convertimos a número lo que muestra el elemento que contiene las monedas de la tragaperras.
    if (cajaAcumulada === 0) { // condicional para saber si estamos a cero en la caja de la máquina, si se cumple nos devuelve el booleano a false.
        return false;
    }
    palanca.src = "img/palancaDOWN.png"; // Si no, cambiamos la imagen y retornamos verdadero. Lo que usaremos después para generar la tirada.
    return true;      
}

//Función para el botón salir:
function cobrar() {
    botonSalir.disabled = true; // Deshabilito el botón cobrar.
    botonEchar.disabled = false; // Volvemos a habilitar el botón echar
    listaHistorial.innerHTML += "<ul>HAS SACADO " + caja.innerHTML + " MONEDAS</ul>"; // Escribimos en el historial lo que hay en ese momento en la máquina.
    alert("Has cobrado " + caja.innerHTML + " monedas"); //Pasamos un aviso de lo que se ha cobrado.
    cantidadMonedas.value = caja.innerHTML; // Escribimos en el campo que inserta monedas el valor de lo que hay en la máquina.
    caja.innerHTML -= caja.innerHTML; // restamos lo que hay en la máquina, a sí mismo para dejarla a cero. pues siempre se cobra todo lo acumulado.
}

//Función que genera un número aleatorio de cero a la longitud de nuestro array, pues es de donde se van a coger los nombres de las imágenes. Restamos uno pues el array empieza en cero.
function numAleatorio() {
    return Math.round(Math.random() * (listaImagenes.length - 1));//uso de la librería Math que nos ayuda con las operaciones y random que genera ese número aleatorio entre cero y uno.

}

//Función que se ejecutará cuando se desencadene el evento palanca:
function iniciarPartida() {
    const hayCredito = tirarPalanca(this.src = "img/palancaUP.png"); // declaramos una variable, que podría ser let, pero como no debe cambiar la declaro constante.
    if (!hayCredito){ //evaluamos si no se cumple la condición implementada en la función tirarPalanca, retorna un booleano.
        alert("No tienes monedas para jugar"); // si el booleano es false, sacamos un mensaje y detenemos la ejecución de la función con un return vacío.
        return;
    }
    //Si no entramos por el if entonces es que ppodemos jugar:
    listaHistorial.innerHTML += "<ul>Has gastado 1 moneda</ul>"; //escribo en el historial lo que vale la tirada.
    mAcumuladas.innerHTML -= 1; // se lo resto a lo que tenemos acumulado en la máquina.
    intervaloTiempoImagenes(); //generamos varias imágenes en cada pantalla, que se explica en la fuunción correspondiente.
    setTimeout(condicionGanancia, 500);//ejecutamos la función (que también se explica más adelante) 
                                       //con el parámetro para setTimeout que es el tiempo que va a esperar para ejecutar la función y así coger la última imagen generada.
}

//Función que mostará las imágenes en el elemento correspondiente del HTML.
function generaImagenes() {

    const posicionesAleatorias = [numAleatorio(), numAleatorio(), numAleatorio()]; //Creo un array de tres números aleatorios, gracias a lafuunción antes implementada.

    pantallas.forEach(function (pantalla, i) { // Por cada una de las pantallas vamos a coger el resultado del array anterior y las asignamos a cada elemento del HTML.
        const posicionImagenActual = posicionesAleatorias[i];
        pantalla.src = "img/" + listaImagenes[posicionImagenActual] + ".png"; //Cogemos el array global de las imagenes y asignamos el número aleatorio a la posición de dicho array,
                                                                              //así conseguimos renderizar la imagen escribiendo en el elemento del HTML de cada pantalla.
    })
}

//Esto no es un requisito del ejercicio:
//Función que va a recoger las imagenes generadas de forma aleatoria. Mostrando una en el intervalo de tiempo determinado y deteniéndose en el otro intervalo especificado:
function intervaloTiempoImagenes(){
    const setIntervalImagenes = setInterval(function(){ //Guardamos en una variable const, que podría ser let, la función que genera las imágenes (primer parámetro) 
                                                        //cada X tiempo en milisegundos (segundo parámetro), devuelve un identificador q puedes cancelar
        generaImagenes()
    }, 50); //intervalo de tiempo que tarda en mostrar cada imagen
    setTimeout(function(){ //Con esta función vamos a establecer cuándo detener el intervalo.
        clearInterval(setIntervalImagenes)
    }, 500)//tiempo que tarda en limpiar el intervalo.
}

//Función que nos retornará en cada caso el premio ganado en función de las imágenes mostradas en cada pantalla de nuestro HTML:
function condicionGanancia() {

    const imageSources = []; //Declaramos un array vacío como const, pero puede ser let.
    pantallas.forEach(function (pantalla) { //Bucle que nos va a rellenar el array vacío con el valor del atributo src de los elementos pantalla del HTML.
        const sourcePantalla = pantalla.src;
        imageSources.push(sourcePantalla); //con push rellenamos el array con cada valor anterior en una posición.
    })
    const [imgSource1, imgSource2, imgSource3] = imageSources; //de esta forma lo que hago es igualar nuestro array, 
                                                               //cambiando el nombre de cada elemento de él mismo y así usarlo en nuestro condicional y que sea más claro, 
                                                               //al no tener que decirle con corchetes la posición de cada elemento.
    //si tengo 3 iguales
    if (imgSource1 === imgSource2 && imgSource1 === imgSource3) {
        if (imgSource1.includes("dollar")) { //si alguno incluye dollar, entonces todos son dollar
            listaHistorial.innerHTML += "<ul>TRES DOLARES,HAS GANADO 10 MONEDAS</ul>";
            caja.innerHTML = parseInt(caja.innerHTML) + 10;
            return;
        } else { //Si no hay dollar entonces todos son frutas.
            listaHistorial.innerHTML += "<ul>TRES FRUTAS IGUALES, HAS GANADO 5 MONEDAS</ul>";
            caja.innerHTML = parseInt(caja.innerHTML) + 5;
            return;
        }

    }
    //si tengo dos iguales
    else if (imgSource1 === imgSource2 || imgSource1 === imgSource3 || imgSource2 === imgSource3) {
        //Buscanos la condición para dos dollar, ya que si hubiese tres dollar se queda en la condición anterior.
        if ((imgSource1.includes("dollar") && imgSource2.includes("dollar")) || (imgSource1.includes("dollar") && imgSource3.includes("dollar")) || (imgSource2.includes("dollar") && imgSource3.includes("dollar"))) {
            listaHistorial.innerHTML += "<ul>DOS DOLARES, HAS GANADO 4 MONEDAS</ul>";
            caja.innerHTML = parseInt(caja.innerHTML) + 4;
            return;
        //si tenemos un dollar en alguuna posición y además los otros son iguales:
        } else if ((imgSource1.includes("dollar") && imgSource2 === imgSource3) || (imgSource2.includes("dollar") && imgSource1 === imgSource3) || (imgSource3.includes("dollar") && imgSource1 === imgSource2)) {
            listaHistorial.innerHTML += "<ul>UN DOLAR Y DOS FRUTAS IGUALES, HAS GANADO 3 MONEDAS</ul>";
            caja.innerHTML = parseInt(caja.innerHTML) + 3;
            return;
        }//si no se cumple ninguna de las anteriores, entonces tenemos dos frutas iguales
        listaHistorial.innerHTML += "<ul>DOS FRUTAS IGUALES HAS GANADO 2 MONEDAS</ul>";
        caja.innerHTML = parseInt(caja.innerHTML) + 2;
    }
    //si tengo una moneda solo, ya que todas las posiciones son diferentes pero aparece un dollar:
    if (imgSource1 !== imgSource2 && imgSource1 !== imgSource3 && imgSource2 !== imgSource3) {
        if (imgSource1.includes("dollar") || imgSource2.includes("dollar") || imgSource3.includes("dollar")) {
            listaHistorial.innerHTML += "<ul>1 DOLLAR, HAS GANADO 1 MONEDA</ul>";
            caja.innerHTML = parseInt(caja.innerHTML) + 1;
        }
    }
}

//recogemos los elementos del HTML, los asociamos a los eventos y los mantenemos a la escucha:
document.getElementById('echar').addEventListener("click", echarMonedas, false); //Si hacemos click en el botón echar, ejecutamos la función echarMonedas.
document.getElementById('palanca').addEventListener("mousedown", tirarPalanca, false); //Mientras tenemos presionado el botón del ratón, ejecutamos la función tirarPalanca.
document.getElementById('palanca').addEventListener("mouseup", iniciarPartida, false); //Cuando soltamos el botón del ratón, ejecutamos la función iniciarPartida
document.getElementById('salir').addEventListener("click", cobrar, false); //Si hacemos click en el botón salir, ejecutamos la función cobrar. 




// CUando quieras hacer git 
// git add fichero, 
// git commit -m "mesnage" 
// git push origin master