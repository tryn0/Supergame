$(document).ready(function(){
    $('#mapa').css('display','none');
    $('#boton').click(function(){
       /* $('#mapa').css({
            'display' : 'block',
            'position' : 'fixed',
            'background-color' : 'rgba(0,0,0,0.5)',
            'z-index' : '1',
            'width' : '100%',
            'height' : '100%'
        });*/
        $('#mapa>p').css('z-index','5');
        $('#contenido').load('./principal.html');
    });
    $('#mapa>p').click(function(){
        $('#mapa').css('display','none');
    });
    anime({
        targets: '.line-drawing-demo .lines path',
        strokeDashoffset: [anime.setDashoffset, 0],
        easing: 'easeInOutSine',
        duration: 1500,
        delay: function(el, i) { return i * 250 },
        direction: 'alternate',
        loop: true
      });
})