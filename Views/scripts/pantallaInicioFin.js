$(document).ready(function(){
    //Botones transparentes
    $('.transparente').css('background-color','transparent');
    //Sombra blanca botones transparentes
    $('.transparente').css('box-shadow','9px 9px 37px -4px rgba(255,255,255,0.53)');
    $('[data-toggle="tooltip"]').tooltip();

    $('#volverAjugar').click(function(){
    	window.location.replace("../Views/sushigame.html");
    });
    $('#volverAinicio').click(function(){
    	window.location.replace("../Views/content/mapa.html");
    });
});