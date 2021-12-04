const listaImagenes = ["aubergine", "banana", "carrots", "cherries", "dollar", "lemon", "orange", "peach", "potato", "tomato"];
const cantidadMonedas = document.getElementById("nMonedas");
const cantidad = parseInt(cantidadMonedas.value);
const caja = document.getElementById("mAcumuladas");
//const cajaCantidad = parseInt(caja.innerHTML);
const botonSalir = document.getElementById("salir");
const botonEchar = document.getElementById("echar");
const listaHistorial = document.getElementsByTagName("ul")[0];
const pantallas = document.querySelectorAll(".pantalla");
botonSalir.disabled=true;


function echarMonedas(){
    //debugger;
    if (!isNaN(cantidad) && cantidad > 0){
        mAcumuladas.innerHTML = cantidad;
        botonSalir.disabled=false;
        botonEchar.disabled=true;
        listaHistorial.innerHTML += "<ul>Has introducido " + cantidadMonedas.value + " monedas</ul>";
        caja.innerHTML = cantidadMonedas.value;
    } else {
        alert ("Introduce una cantidad válida. Has introducido " + cantidadMonedas.value + " monedas.");
    }
}

function tirarPalanca(palanca){
    
    let cajaAcumulada = parseInt(caja.innerHTML);

    if (cajaAcumulada == 0){
        alert("No tienes monedas para jugar");
        palanca.preventDefault();

    }else{         
        palanca.src="img/palancaDOWN.png";
    }
}

function cobrar(){
    botonSalir.disabled=true;
    botonEchar.disabled=false;
    listaHistorial.innerHTML += "<ul>HAS SACADO " + caja.innerHTML + " MONEDAS</ul>";
    alert("Has cobrado " + caja.innerHTML + " monedas");
    cantidadMonedas.value = caja.innerHTML;
    caja.innerHTML -= caja.innerHTML;
}

function numAleatorio(){
    return Math.round(Math.random() * (listaImagenes.length -1));
    
}

function generaImagenes(){

    const posicionesAleatorias= [numAleatorio(), numAleatorio(),numAleatorio()];

    pantallas.forEach(function (pantalla, i){
        const posicionImagenActual = posicionesAleatorias[i];
        pantalla.src="img/" + listaImagenes[posicionImagenActual] + ".png";
        
    })
    
}
/*function intervaloTiempoImagenes(){
    const setIntervalImagenes = setInterval(function(){ //ejecuta un codigo cada x tiempo, primer parametro es una funcion el segundo es el intervalo de tiempo en milliseg, devuelve un identificador q puedes cancelar
        generaImagenes()
    }, 50);
    setTimeout(function(){
        clearInterval(setIntervalImagenes)
    }, 500)
}*/

function condicionGanancia(){
    //debugger;
    const imageSources = [];
    pantallas.forEach(function (pantalla){
        //debugger;
        const sourcePantalla = pantalla.src;
        imageSources.push(sourcePantalla);
        console.log(imageSources);
    })
        //si tengo 3 iguales
    if (imageSources[0] === imageSources[1] === imageSources[2]){
        if ( imageSources[0].includes("dollar") ){
            //debugger;
            listaHistorial.innerHTML += "<ul>HAS GANADO 10 MONEDAS</ul>";
            caja.innerHTML = parseInt(caja.innerHTML) + 10;
            return;
        }
        listaHistorial.innerHTML += "<ul>HAS GANADO 5 MONEDAS</ul>";
        caja.innerHTML = parseInt(caja.innerHTML) + 5;
    }
        //si tengo dos iguales
    if ( imageSources[0] === imageSources[1] || imageSources[0] === imageSources[2] || imageSources[1] === imageSources[2]){
        if ( (imageSources[0].includes("dollar") &&  imageSources[1].includes("dollar")) || (imageSources[0].includes("dollar") && imageSources[2].includes("dollar")) || (imageSources[1].includes("dollar") && imageSources[2].includes("dollar")) ){
            //debugger;
            listaHistorial.innerHTML += "<ul>HAS GANADO 4 MONEDAS</ul>";
            caja.innerHTML = parseInt(caja.innerHTML) + 4;
            return;
        } else if((imageSources[0].includes("dollar") && imageSources[1] === imageSources[2]) || (imageSources[1].includes("dollar") && imageSources[0] === imageSources[2]) || (imageSources[2].includes("dollar") && imageSources[0] === imageSources[1])){
            listaHistorial.innerHTML += "<ul>HAS GANADO 3 MONEDAS</ul>";
            caja.innerHTML = parseInt(caja.innerHTML) + 3;
            return;
        }
        listaHistorial.innerHTML += "<ul>HAS GANADO 2 MONEDAS</ul>";
        caja.innerHTML = parseInt(caja.innerHTML) + 2;
        }
    
    if (imageSources[0] !== imageSources[1] && imageSources[0] !== imageSources[2] && imageSources[1] !== imageSources[2])
        if (imageSources[0].includes("dollar") || imageSources[1].includes("dollar") || imageSources[2].includes("dollar"))
        listaHistorial.innerHTML += "<ul>HAS GANADO 1 MONEDAS</ul>";
        caja.innerHTML = parseInt(caja.innerHTML) + 1;
            
       
}


document.getElementById('echar').addEventListener("click", function(){echarMonedas(this);}, false)
document.getElementById('palanca').addEventListener("mousedown", function(palanca){tirarPalanca(this);listaHistorial.innerHTML += "<ul>Has gastado 1 moneda</ul>";}, false)
document.getElementById('palanca').addEventListener("mouseup", function(palanca){tirarPalanca(this.src="img/palancaUP.png");mAcumuladas.innerHTML -= 1;}, false)
document.getElementById('salir').addEventListener("click", function(){cobrar(this);}, false)
document.getElementById('palanca').addEventListener("mousedown", function(){generaImagenes(this);condicionGanancia();}, false)



// CUando quieras hacer git 
// git add fichero, 
// git commit -m "mesnage" 
// git push origin master