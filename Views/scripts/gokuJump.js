$(document).ready(function(){	
	carga();		
  llamada1();
	$(document).keypress(function(e){	
		if (e.which==32) {
			$("#figura1").attr('style','display:none;');
			$("#figura2").attr('style','display:block;');
			$("#figura2").animate({bottom:"450px"});
			$("#figura2").animate({bottom:"95px"}
				,900, function(){
					$("#figura1").attr('style','display:block;');
					$("#figura2").attr('style','display:none;');
				});
			}
	});
});

function mandarPuntos(puntos){
  var puntuacion = { puntosGoku: puntos};
  $.ajax({
    url:   '../Controllers/puntuacionGokuJump.php', //archivo que recibe la peticion
    type:  'post', //método de envio
    data: puntuacion, //datos que se envian a traves de ajax
    success:  function () { //una vez que el archivo recibe el request lo procesa y lo devuelve
    }
  });
}

function sacapuntos(){

	var tiempo=String(contador_m)+String(contador_s);
	var puntos=tiempo*10;
	return puntos;

}

function detenerse(){
    clearInterval(cronometro);
}
   
function carga(){
    contador_s =0;
    contador_m =0;
    m = document.getElementById("reloj");
    cronometro = setInterval(
        function(){
            if(contador_s==60){
                contador_s=0;
                contador_m++;
                if(contador_m==60)
                    {
                        contador_m=0;
                    }
                }
                if (contador_m<10 && contador_s<10) {
                	m.textContent = "0"+contador_m+" : "+"0"+contador_s;
                }
                else if(contador_m<10 && contador_s>10){
                	m.textContent = "0"+contador_m+" : " +contador_s;
                }
                else{
                	m.textContent = contador_m+" : "+contador_s;
                }     
                contador_s++;
            }
            ,1000);
    };





	function llamada1() {
 	 	intervalo = setInterval(mueveobstaculo, milisegundos(2000,4000));
    
	}

	function mueveobstaculo(){	
		$("#suelo").after("<img src='images/valla.png' id='obstaculo'>");
    if ($("#obstaculo")!= 'undefined') {
      $("#obstaculo").animate({right:"-20%"});
      $("#obstaculo").animate({right:"-10%"});
      $("#obstaculo").animate({right:"0%"});
      var move=5;
      for (var i = 0; i < 15; i++) {
        move=move+10;
        llamadetectorcolision();
        $("#obstaculo").animate({right:""+move+"%"});
        llamadetectorcolision();
        var obs=document.getElementById("obstaculo");
        let coords = obs.getBoundingClientRect();
        if (coords <=0) {
          $("#obstaculo").remove();
        }
      }
    }
		
	}

function llamada2() {
 	 intervalo2 = setInterval(mueveobstaculo, milisegundos(1000,7000));
}

function llamadetectorcolision(){
	var llamardetector=setInterval(DetectarColision,1);
}

function DetectarColision(){	
	/// "a" y "b" deben ser dos objetos HTMLElement
  		var a = $("#figura1");
  		var b = $("[id*=obstaculo]");
      var c = $("#figura2");
  
  		var a_pos = {t : a.position().top, 
  					l: a.position().left, 
               		r: a.position().left + a.width(), 
               		b: a.position().top + a.height()};

  		var b_pos =  {t : b.position().top, 
  						l: b.position().left, 
               		r: b.position().left + b.width(), 
               		b: b.position().top + b.height()}; 

      var c_pos =  {t : c.position().top, 
              l: c.position().left, 
                  r: c.position().left + c.width(), 
                  b: c.position().top + c.height()};           

 //Detecta si se superponen las áreas
  		if(   a_pos.l <= b_pos.r && a_pos.r >= b_pos.l 
    		|| a_pos.b <= b_pos.t && a_pos.t >= b_pos.b ){
  				var puntosfinal=sacapuntos();
          mandarPuntos(parseInt(puntosfinal));
  				document.getElementById("puntos").textContent = "Puntuacion : "+puntosfinal;
          $("body").css("animation-play-state", "paused");
 				  $("#figura1").css("display","none");
 				  $("#suelo").css("display","none");
 				  $("#obstaculo").css("display","none");
 				  $("#gameover").css("display","block");
 				  detenerse();	
 				  clearInterval(intervalo);
 		}/*
    else if (c_pos.l <= b_pos.r && c_pos.r >= b_pos.l 
        && c_pos.b >= b_pos.t && c_pos.t <= b_pos.b){
          var puntosfinal=sacapuntos();
          document.getElementById("puntos").textContent = "Puntuacion : "+puntosfinal;
          $("body").css("animation-play-state", "paused");
          $("#figura1").css("display","none");
          $("#figura2").css("display","none");
          $("#suelo").css("display","none");
          $("#obstaculo").css("display","none");
          $("#gameover").css("display","block");
          detenerse();  
          clearInterval(intervalo);
    }*/
	}


function milisegundos(min,max) {
	return Math.floor(Math.random() * (max - min) + min);
}

