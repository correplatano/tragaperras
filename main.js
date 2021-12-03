const listaImagenes = ["aubergine", "banana", "carrots", "cherries", "dollar", "lemon", "orange", "peach", "potato", "tomato"];
const cantidadMonedas = document.getElementById("nMonedas");
const cantidad = parseInt(cantidadMonedas.value);
const caja = document.getElementById("mAcumuladas");
//const cajaCantidad = parseInt(caja.innerHTML);
const botonSalir = document.getElementById("salir");
const botonEchar = document.getElementById("echar");
const listaHistorial = document.getElementsByTagName("ul")[0];

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
    listaHistorial.innerHTML += "<ul>HAS GANADO " + caja.innerHTML + " MONEDAS</ul>";
    alert("Has cobrado " + caja.innerHTML + " monedas");
    cantidadMonedas.value = caja.innerHTML;
    caja.innerHTML -= caja.innerHTML;
}

function numAleatorio(){
    return Math.round(Math.random() * (listaImagenes.length -1));
    
}

function generaImagenes(){

    const posicionesAleatorias= [numAleatorio(), numAleatorio(),numAleatorio()];
    const pantallas = document.querySelectorAll(".pantalla");
    
    pantallas.forEach(function (pantalla, i){
        const posicionImagenActual = posicionesAleatorias[i];
        pantalla.src="img/" + listaImagenes[posicionImagenActual] + ".png";
        
    })
    
}
function intervaloTiempoImagenes(){
    const setintervalImagenes = setInterval(function(){ //ejecuta un codigo cada x tiempo, primer parametro es una funcion el segundo es el intervalo de tiempo en milliseg, devuelve un identificador q puedes cancelar
        generaImagenes()
    }, 200);
    setTimeout(function(){
        clearInterval(setintervalImagenes)
    }, 1000)
}


document.getElementById('echar').addEventListener("click", function(){echarMonedas(this);}, false)
document.getElementById('palanca').addEventListener("mousedown", function(palanca){tirarPalanca(this);listaHistorial.innerHTML += "<ul>Has gastado 1 moneda</ul>";}, false)
document.getElementById('palanca').addEventListener("mouseup", function(palanca){tirarPalanca(this.src="img/palancaUP.png");mAcumuladas.innerHTML -= 1;}, false)
document.getElementById('salir').addEventListener("click", function(){cobrar(this);}, false)
document.getElementById('palanca').addEventListener("mousedown", function(){generaImagenes(this);intervaloTiempoImagenes();}, false)



// CUando quieras hacer git 
// git add fichero, 
// git commit -m "mesnage" 
// git push origin master