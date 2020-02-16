$(document).ready(function(){	
	carga();	
	llamadetectorcolision();
	if ($("#gameover").css("display","none")) {
		llamada1();	
	}	
	//llamada2();
	$(document).keypress(function(e){	
		if (e.which==32) {
			$("#figura1").attr('style','display:none;');
			$("#figura2").attr('style','display:block;');
			$("#figura2").animate({bottom:"300px"});
			$("#figura2").animate({bottom:"95px"}
				,900, function(){
					$("#figura1").attr('style','display:block;');
					$("#figura2").attr('style','display:none;');
				});
			}
			
	});
});

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
		$("#suelo").after("<img src='multimedia/valla.png' id='obstaculo'>");
		$("#obstaculo").animate({right:"-20%"});
		$("#obstaculo").animate({right:"-10%"});
		$("#obstaculo").animate({right:"0%"});
		var move=5;
		for (var i = 0; i < 15; i++) {
			move=move+10;
			$("#obstaculo").animate({right:""+move+"%"});
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
  		var b = $("#obstaculo");
  
  		var a_pos = {t : a.position().top, 
  					l: a.position().left, 
               		r: a.position().left + a.width(), 
               		b: a.position().top + a.height()};
  		var b_pos =  {t : b.position().top, 
  						l: b.position().left, 
               		r: b.position().left + b.width(), 
               		b: b.position().top + b.height()};            

 //Detecta si se superponen las áreas
  		if(   a_pos.l <= b_pos.r && a_pos.r >= b_pos.l 
    		&& a_pos.b >= b_pos.t && a_pos.t <= b_pos.b ){
  				var puntosfinal=sacapuntos();
  				document.getElementById("puntos").textContent = "Puntuacion : "+puntosfinal;
 				$("body").css("background-image","url(../multimedia/gameover.jpg");
 				$("#figura1").css("display","none");
 				$("#suelo").css("display","none");
 				$("#obstaculo").css("display","none");
 				$("#gameover").css("display","block");
 				detenerse();	
 				clearInterval(intervalo);
 		}
	}


function milisegundos(min,max) {
	return Math.floor(Math.random() * (max - min) + min);
}

