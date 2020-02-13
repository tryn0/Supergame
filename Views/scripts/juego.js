$(document).ready(function(){
	var nivel=1;//nivel de dificultad
	var dificultad = 2500; //velocidad en milisegundos para nivel 1
	var velocidad=0.4; //velocidad para nivel 2
	//esta función sirve para cambiar la velocidad del objetivo cada vez que se consiga pulsar sobre el mismo.
	function movida(){
		$("#trayectoria").append("<img src='images/sushi.jpg' class='onigiri' width='150px' height='100px' style='position:relative; left:-300px; border-bottom-right-radius: 30px 30px; border-bottom-left-radius: 30px 30px; border-top-right-radius: 65px 100px; border-top-left-radius: 65px 100px;'></img>");	
		$(".onigiri").click(function(e){

			if(velocidad <=1){
		 		velocidad+=0.08;
			}

	  		$(e.currentTarget).remove();

	  		movida();
		});
		function makeNewPosition($trayectoria){
			    // Get viewport dimensions (remove the dimension of the div)
			$trayectoria = ($trayectoria || $(window))
			var h = $trayectoria.height() - 50;
			var w = $trayectoria.width() - 50;
			var nh = Math.floor(Math.random() * h);
			var nw = Math.floor(Math.random() * w);
			return [nh, nw];
		}
		function animateDiv() {
			var $target = $('.onigiri');
			var newq = makeNewPosition($target.parent());
			var oldq = $target.offset();
			var speed = calcSpeed([oldq.top, oldq.left], newq);
			$('.onigiri').animate({
			    top: newq[0],
			    left: newq[1]
			},speed, function() {
			    animateDiv();
			});
		};
		function calcSpeed(prev, next) {
			var x = Math.abs(prev[1] - next[1]);
			var y = Math.abs(prev[0] - next[0]);
			var greatest = x > y ? x : y;
			//var speedModifier = 1;
			var speed = Math.ceil(greatest / velocidad);
			return speed;
		}
		animateDiv();
	}
	movida();
	//FUNCION PARA VIDAS Y PUNTUACION
	var vida=0;	
	//PREVENCION ACCIONES DEL RATON
	$("html").contextmenu(function (e){
		e.preventDefault();
	});
	$.fn.disableSelection = function() {
        return this.attr('unselectable', 'on').css('user-select', 'none').on('selectstart dragstart', false);
    };
    $('html').disableSelection();


	$("html").click(function(e){
		if($(e.target).attr("class")=="onigiri"){
			var puntos = parseInt($("#puntos").text());
			$("#puntos").text(puntos+100);
		}
		else{
			velocidad-=0.08;
			if (vida==0) {
				$('#vida3').attr("src","images/vida0.png");
				vida++;
			}
			else if (vida==1) {
				$('#vida2').attr("src","images/vida0.png");
				vida++;
			}
			else if (vida==2) {
				$('#vida1').attr("src","images/vida0.png");
				//MUESTRA GAME OVER Y RANKING
				mandarPuntos();
			}
		}
		function mandarPuntos(){
			console.log($("#puntos").text());
			var puntos = { puntitos: parseInt($("#puntos").text())};
	       // var parametros = puntos;
	        var ajax = $.ajax({
	                url:   '../Controllers/puntuaciones.php', //archivo que recibe la peticion
	                type:  'post', //método de envio
	                data: puntos, //datos que se envian a traves de ajax
	                success:  function(data){ //una vez que el archivo recibe el request lo procesa y lo devuelve
						window.location.replace('../Controllers/finalJuego.php')
	                }

			});
		}
	});
});