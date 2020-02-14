//
// ---Retro Button---
//
var buttons = document.querySelectorAll('.boton');

for(var i = 0; i < buttons.length; i++) {
  // Click
  buttons[i].addEventListener('mousedown', function() {
    this.classList.add('boton-active');
  });
  buttons[i].addEventListener('mouseup', function() {
    this.classList.remove('boton-active');
  });

  // Hover
  buttons[i].addEventListener('mouseleave', function() {
    this.classList.remove('boton-center', 'boton-right', 'boton-left', 'boton-active');
  });

  buttons[i].addEventListener("mousemove", function(e) {
    var leftOffset = this.getBoundingClientRect().left;
    var botonWidth = this.offsetWidth;
    var myPosX = e.pageX;
    var newClass = "";
    // if on left 1/3 width of boton
    if(myPosX < (leftOffset + .3 * botonWidth) ) {
      newClass = 'boton-left'
    } else {
      // if on right 1/3 width of boton
      if(myPosX > (leftOffset + .65 * botonWidth) ) {
        newClass = 'boton-right';
      } else {
        newClass = 'boton-center';
      }
    }
    // remove prev class
    var clearedClassList = this.className.replace(/boton-center|boton-right|boton-left/gi, "").trim();
    this.className = clearedClassList + " " + newClass;
  });
}

