  $(function(){
    //Mandar los puntos por ajax
    function mandarPuntos(){
      var puntuacion = { puntosCarrera: puntos};
      $.ajax({
        url:   '../Controllers/puntuacionCarrera.php', //archivo que recibe la peticion
        type:  'post', //método de envio
        data: puntuacion, //datos que se envian a traves de ajax
        success:  function () { //una vez que el archivo recibe el request lo procesa y lo devuelve
            window.location.replace("../Views/content/mapa.html");
        }
      });
    }

    var jinete = $("#jinete");
    var anchodiv = $("#carrera").width();
    var id;
    var tiempo_corriendo;
    var tiempo;
    var puntos;
    // empieza el cronometro 
    crono();
    // cuando levanto la tecla espacio
    $(document).keyup(function (e) {
      var posicionjinete = $("#jinete").position();
      //obtengo la posicion actual 
      var posicionactual = jinete.css("left");
      //le elimino las ultimas dos cifras que son las letras px para poder pasarlo a entero
      var poscadena = posicionactual.slice(0, -2);
      //convierto a entero para compararlo con el ancho de mi div
      var posicion = parseInt(poscadena);

      //32 es el código de la barra espaciadora
      if (e.which == 32) {
        // si la posicion de mi jinete es menor que el ancho del div de la carrera que siga
        if (posicion <= anchodiv - 100) {
          jinete.css('left', parseInt(jinete.css('left')) + 40);
          //si supera el ancho, ya ha llegado a la meta
        } else {
          // segun los segundos se puntua
          var sec = parseInt($("#segundo").text());
          if (sec <= 5) {
            puntos = 2000;
          } else if (sec > 5 && sec <= 10) {
            puntos = 1500;
          } else if (sec > 10 && sec <= 15) {
            puntos = 1000;
          } else {
            puntos = 500;
          }
          // al ganar añado un div con un boton para ir al menu y la puntuacion
          $("body").append("<div id='success'> </div>");
          $("#success").text("Has ganado " + puntos + " puntos");
          $("#success").append("<div class='wrapper' id='volver'><div role='button' class='retro-boton primary'><a class='boton' href='index.php'> <span class='boton-inner'><span class='content-wrapper'><span class='boton-content'><span class='boton-content-inner' label='Volver al menú'></span></span></span></span></a></div></div><script  src='../Views/scripts/botones.js'></script>");

          //paro el crono y el settimeout de ir hacia atras
          clearTimeout(id);
          parar();
          // le quito el evento de pulsar para que no pueda seguir ejecutandose
          $(document).off("keyup");
          $('#volver').click(function(){
            mandarPuntos();
          })
          
        }
        // me creo la marcha atras del caballo cada segundo cada vez que levante la tecla
        id = setTimeout(function () {
          jinete.css('left', parseInt(jinete.css('left')) - 8);
        }, 1000);

      };

    });
    // reseteo el juego cargandolo de nuevo
    $("#reset").click(function () {
      location.reload();
    });

  });


  // comenzar un crono
  function crono() {
    tiempo = {
      minuto: 0,
      segundo: 0
    };
    tiempo_corriendo = setInterval(function () {
      // Segundos
      tiempo.segundo++;
      if (tiempo.segundo >= 60) {
        tiempo.segundo = 0;
        tiempo.minuto++;
      }

      // Minutos
      if (tiempo.minuto >= 60) {
        tiempo.minuto = 0;
        tiempo.hora++;
      }
      //lo pinto en mis divs cada segundo con el setinterval
      $("#minuto").text(tiempo.minuto < 10 ? '0' + tiempo.minuto : tiempo.minuto);
      $("#segundo").text(tiempo.segundo < 10 ? '0' + tiempo.segundo : tiempo.segundo);
    }, 1000);


}
// parar el cronometro
function parar() {
  clearInterval(tiempo_corriendo);
}