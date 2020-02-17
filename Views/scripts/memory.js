// creacion de variables 
var cajaabierta = "";
var imagenabierta = "";
var contador = 0;
var imagenencontrada = 0;

var divcartas = "#cajacartas";

var imagenesdeportes = [
  "./images/corredo.jpg"
  "./images/danza.jpg",
  "./images/mireia.jpg",
  "./images/nadador.jpeg",
  "./images/tenista.jpg",
  "./images/ganador.jpg",
  "./images/baloncesto.jpeg",
  "./images/ganadores.jpg"
];


// funcion random usada para la posicion de las imagenes variables
function random(MaxValue, MinValue) {
        return Math.round(Math.random() * (MaxValue - MinValue) + MinValue);
    }
    
function agitarImagenes() {
    // metodo para poner las imagenes aleatoriamente
    var todasimagenes = $(divcartas).children();
    var imagen = $(divcartas + " div:first-child");
    // esto sera un array con los src de las imagenes
    var arrayimagenes = new Array();
    //añado los src de mis imagenes al array de imagenes
    for (var i = 0; i < todasimagenes.length; i++) {
        arrayimagenes[i] = $("#" + imagen.attr("id") + " img").attr("src");
        imagen = imagen.next();
    }
    imagen = $(divcartas + " div:first-child");
    
    for (var z = 0; z < todasimagenes.length; z++) {
    var aleatorio = random(0, arrayimagenes.length - 1);
// le añadimos los src a las imagenes de forma aleatoria
        $("#" + imagen.attr("id") + " img").attr("src", arrayimagenes[aleatorio]);
        arrayimagenes.splice(aleatorio, 1);
        imagen = imagen.next();
    }
}
// reseteo el juego, muevo las imagenes las invisibilizo y quito contadores y exito


function resetear() {
    // ocultamos las imagenes, las desordenamos, ponemos el contador a cero
    agitarImagenes();
    $(divcartas + " div img").hide();
    $(divcartas + " div").css("visibility", "visible");
    contador = 0;
    $("#success").remove();
    $("#contador").html("" + contador);
    cajaabierta= "";
    imagenabierta= "";
    imagenencontrada = 0;
    score=0;
    return false;
}

function AbrirCarta(e) {
    //nos quedamos con el id de la carta que he clickado
    var id = $(e.currentTarget).attr("id");

    if ($("#" + id + " img").is(":hidden")) {
        // si el div esta oculto que no se abra, le quitamos el evento con off
        $(divcartas + " div").off("click", AbrirCarta);
    // deslizo la imagen en mi div
        $("#" + id + " img").slideDown('fast');

            if (imagenabierta== "") {
                // si es la primera vez que abrimos guardamos el id para comparar con otra
                cajaabierta = id;
                imagenabierta  = $("#" + id + " img").attr("src");
                setTimeout(function() {
                    $(divcartas + " div").on("click", AbrirCarta)
                }, 300);
                // si es la segunda que abrimos comparamos una con otra y en el caso que no sean se ocultan las imagenes  con slideup
            } else {
                otraimagenabierta = $("#" + id + " img").attr("src");
                if (imagenabierta != otraimagenabierta) {
                    setTimeout(function() {
                        $("#" + id + " img").slideUp('fast');
                        $("#" + cajaabierta + " img").slideUp('fast');
                        cajaabierta= "";
                        imagenabierta = "";
                    }, 400);
        } else {
                // aqui si las dos imagenes son las mismas se esconden junto sus div
                $("#" + id + " img").parent().css("visibility", "hidden");
                $("#" + cajaabierta+ " img").parent().css("visibility", "hidden");
                imagenencontrada++;
                cajaabierta= "";
                imagenabierta= "";
        }
        //le vamos añadiendo el metodo abrir a todos nuestros div de imagenes
        setTimeout(function() {
        $(divcartas + " div").on("click", AbrirCarta)
        }, 400);
    }
        contador++;
        // cada dos clicks es un intento que hace el jugador
        $("#contador").html("" + Math.round(contador/2));
        // divido los clicks para que cada dos sea un intento
        var intentos=Math.round(contador/2);
        var score=0;
        //según los intentos llevará una puntuación u otra
        if(intentos<=8){
            score=2000;
        }else if(intentos>8 && intentos <= 12){
            score=1500;

        }else if(intentos>12 && intentos<=18){
            score=1000;
        }else if(intentos>18){
            score=500;
        }
    // si las imagenes encontradas son las mismas que longitud hay ha ganado el juego
        if (imagenencontrada == imagenesdeportes.length) {
            //acesso a la bd y suma de puntos
            mandarPuntos(score);
            $("#cajacartas").append("<span id='success'>Enhorabuena has ganado "+score+" puntos  </span>");
            $("#mapa").append("<div class='wrapper' id='volverAinicio'><div role='button' class='retro-boton primary'><a class='boton' href='index.php'> <span class='boton-inner'><span class='content-wrapper'><span class='boton-content'><span class='boton-content-inner' label='Volver al inicio'></span></span></span></span></a></div></div><script  src='../Views/scripts/botones.js'></script>");
            $('#volverAinicio').click(function(){
                window.location.replace("../Views/content/mapa.html");
            });
        }
        function mandarPuntos(score){
            var puntos = {puntosMemory: score};
            $.ajax({
                    url:   '../Controllers/puntuacionMemory.php', //archivo que recibe la peticion
                    type:  'post', //método de envio
                    data: puntos, //datos que se envian a traves de ajax
                    success:  function () { //una vez que el archivo recibe el request lo procesa y lo devuelve
                    }
            });
        }
    }
}
// al comenzar, cargamos las imagenes 
$(function() {

//carga el array de imagenes y les pone un id que comienza por 1
for (var y = 1; y < 3 ; y++) {
    $.each(imagenesdeportes , function(i, val) {
        $(divcartas).append("<div id=card" + y + i + "><img src=" + val + " />");
    });
}

// añadimos el evento a cada div creado que contiene las cartas
    $(divcartas + " div").click(AbrirCarta);
//llamamos al metodo random de colocar cartas
    agitarImagenes();
//añadimos el evento reseteo al enlace
    $("#reset").click(function(e) {
        e.preventDefault();
       resetear();
      });

});