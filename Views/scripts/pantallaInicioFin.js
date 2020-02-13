$(document).ready(function(){
    //Botones transparentes
    $('.transparente').css('background-color','transparent');
    //Sombra blanca botones transparentes
    $('.transparente').css('box-shadow','9px 9px 37px -4px rgba(255,255,255,0.53)');
    $('[data-toggle="tooltip"]').tooltip();

    $('#jugar').click(function(){
    	window.location.replace("juego.html");
    });
    $('#inicio').click(function(){
    	window.location.replace("../Controllers/index.php");
    });
});