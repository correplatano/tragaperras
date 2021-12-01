var listaImagenes = ["aubergine", "banana", "carrots", "cherries", "dollar", "lemon", "orange", "peach", "potato", "tomato"];
var cantidadMonedas = document.getElementById("nMonedas").value;
var botonSalir = document.getElementById("salir");
var botonEchar = document.getElementById("echar");

mAcumuladas.innerHTML = "<p>" + 0 + "</p>";

botonSalir.disabled=true;

function echarMonedas(nMonedas){
    
    if (!isNaN(cantidadMonedas) && cantidadMonedas>0){
        mAcumuladas.innerHTML = cantidadMonedas;
        botonSalir.disabled=false;
        botonEchar.disabled=true;
    } else {
        alert ("Introduce una cantidad válida" + cantidadMonedas);

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

function cobrar(mAcumuladas){
    let premio = parseInt(mAcumuladas.value);
    alert("Has cobrado " + premio + " monedas")
    
}


document.getElementById('echar').addEventListener("click", function(nMonedas){echarMonedas(this);}, false)
document.getElementById('palanca').addEventListener("mousedown", function(palanca){tirarPalanca(this);}, false)
document.getElementById('palanca').addEventListener("mouseup", function(palanca){tirarPalanca(this.src="img/palancaUP.png");mAcumuladas.innerHTML -= 1;}, false)
document.getElementById('salir').addEventListener("click", function(mAcumuladas){cobrar(this);}, false)

