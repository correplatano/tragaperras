var listaImagenes = ["aubergine", "banana", "carrots", "cherries", "dollar", "lemon", "orange", "peach", "potato", "tomato"];
var cantidadMonedas = document.getElementById("nMonedas");
var caja = document.getElementById("mAcumuladas");
var botonSalir = document.getElementById("salir");
var botonEchar = document.getElementById("echar");
var listaHistorial = document.getElementsByTagName("ul")[0];

botonSalir.disabled=true;

function echarMonedas(){
    
    if (!isNaN(cantidadMonedas.value) && cantidadMonedas.value>0){
        mAcumuladas.innerHTML = cantidadMonedas.value;
        botonSalir.disabled=false;
        botonEchar.disabled=true;
        listaHistorial.innerHTML += "<ul>Has introducido " + cantidadMonedas.value + " monedas</ul>";

    } else {
        alert ("Introduce una cantidad válida. Has introducido " + cantidadMonedas + " monedas.");
    }
}

function tirarPalanca(palanca){
    
    if (mAcumuladas.innerHTML == 0){
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

document.getElementById('echar').addEventListener("click", function(){echarMonedas(this);}, false)
document.getElementById('palanca').addEventListener("mousedown", function(palanca){tirarPalanca(this);listaHistorial.innerHTML += "<ul>Has gastado 1 moneda</ul>";}, false)
document.getElementById('palanca').addEventListener("mouseup", function(palanca){tirarPalanca(this.src="img/palancaUP.png");mAcumuladas.innerHTML -= 1;}, false)
document.getElementById('salir').addEventListener("click", function(){cobrar(this);}, false)



// CUando quieras hacer git 
// git add fichero, 
// git commit -m "mesnage" 
// git push origin master