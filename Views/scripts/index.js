$(document).ready(function () {

  //Evitar seleccionar texto
  $('html').css('user-select', 'none');

  //ARCOIRIS
  // VARIABLES
  const DPR = window.devicePixelRatio;
  const colors = [
    ['#EC008C', '#f957b6'],
    ['#EF4136', '#ff7972'],
    ['yellow', '#fff'],
    ['lime', '#7aff7a'],
    ['#27AAE1', '#5ec8f2'],
    ["#662D91", '#a158d8']
  ]
  const tau = Math.PI * 2;
  const start = Math.PI; // Posicion inicial
  const finish = .5; // Finish (in % of circle "tau" basically ending at Math.PI * 2)
  const inc = .003;
  const rainbowHeight = 1.7; // del alto de la vista
  const arcStagger = .05; // en %
  const sparklesInPerStripe = 2;

  let sparkles = []

  // UTILIDADES
  const clamp = (min, max, val) => {
    return Math.min(Math.max(min, val), max)
  }
  const boolRandom = () => {
    return Math.round(Math.random()) ? false : true
  }

  // CANVAS
  const sizeCanvas = () => {
    radius = clamp(15, 50, window.innerWidth / 60 / DPR);
    const canvas = document.getElementById('rainbow');
    canvas.width = window.innerWidth * DPR;
    canvas.height = window.innerHeight * DPR;
  }

  // DESTELLOS
  const addRandom = function (lineWidth) {
    return (boolRandom() ? -1 : 1) * Math.random() * lineWidth;
  }
  const makeSparkle = ({
    cx,
    cy,
    radiusX,
    radiusY,
    endAngle,
    lineWidth,
    color
  }) => {
    return {
      x: cx + radiusX * Math.cos(endAngle) + addRandom(lineWidth), // stay out in front
      y: cy + radiusY * Math.sin(endAngle) + addRandom(lineWidth),
      opacity: 1,
      color,
      rad: Math.max(radius * Math.random() * DPR, 15)
    }
  }

  // ANIMACION
  function animate(percent = 0) {
    const doneAnimatingIn = percent >= finish + arcStagger * colors.length; // ANIMACION DE LARCO IRIS

    let width = window.innerWidth * DPR;
    let height = window.innerHeight * DPR;

    const lineWidth = height * .5 / colors.length;

    const cx = width / 2;
    const startCy = height + lineWidth * rainbowHeight + (height - colors.length * lineWidth) / 3;

    const startRadiusX = width / 2 + colors.length * lineWidth * 2;
    const startRadiusY = height;

    let ctx = document.getElementById('rainbow').getContext('2d');
    ctx.clearRect(0, 0, width, height);
    ctx.globalAlpha = 1;
    ctx.lineWidth = lineWidth;

    for (let i = colors.length - 1; i > -1; i--) {
      const [colorLine, colorSparkle] = colors[i];

      const cy = startCy + i * (lineWidth / 2 - 1);

      // Making these "concentric" ellipses
      const radiusX = startRadiusX - i * lineWidth / 2;
      const radiusY = startRadiusY - i * lineWidth / 2;

      const endAngle = tau * (percent - i * arcStagger) + start;

      const angle = clamp(start, tau * finish + start, endAngle);

      // DRAW ONE OF OUR ELLIPSE LINES
      // - One color of our rainbow
      ctx.beginPath();
      ctx.shadowColor = colorLine;
      ctx.strokeStyle = colorLine;
      ctx.ellipse(
        cx,
        cy,
        radiusX,
        radiusY,
        0,
        start,
        angle,
        false
      );
      ctx.lineCap = "round";
      ctx.stroke();
      ctx.closePath();


      if (!doneAnimatingIn) {
        // ADD: Animating in sparkles, follow the start of each color
        for (let j = 0; j < sparklesInPerStripe; j++) {
          sparkles.push(
            makeSparkle({
              cx,
              cy,
              radiusX,
              radiusY,
              endAngle: angle,
              lineWidth,
              color: colorLine
            })
          );
        }
      } else {
        // ADD: Normal sparkles after animating in
        sparkles.push(makeSparkle({
          cx,
          cy,
          radiusX,
          radiusY,
          endAngle: Math.random() * Math.PI + Math.PI,
          lineWidth,
          color: boolRandom() ? '#fff' : colorSparkle
        }));
      }
    }

    // IMPRIMIR DESTELLOS
    const nextSparkles = [];
    for (let i = 0, len = sparkles.length; i < len; i++) {
      const {
        x,
        y,
        opacity,
        color,
        rad
      } = sparkles[i];
      ctx.beginPath();
      ctx.globalAlpha = opacity;
      ctx.fillStyle = color;
      ctx.arc(x - rad, y - rad, rad, 0, Math.PI / 2);
      ctx.arc(x - rad, y + rad, rad, 3 * Math.PI / 2, 2 * Math.PI);
      ctx.arc(x + rad, y + rad, rad, Math.PI, 3 * Math.PI / 2);
      ctx.arc(x + rad, y - rad, rad, Math.PI / 2, Math.PI);
      ctx.fill();

      // Destellos de los destellos
      if (opacity > .2 && rad > .2) {
        nextSparkles.push({
          x,
          y,
          opacity: opacity - .03,
          rad: rad - .2,
          color
        });
      }
    }
    sparkles = nextSparkles;

    if (!doneAnimatingIn) {
      // Animacion del arcoiris
      requestAnimationFrame(function () {
        animate(percent + inc);
      })
    } else {
      // Destellos en el arcoiris
      requestAnimationFrame(function () {
        animate(finish + colors.length * arcStagger);
      })
    }
  }

  sizeCanvas();
  requestAnimationFrame(function () {
    animate()
  });
  window.addEventListener('resize', sizeCanvas);
  //ACABA ARCOIRIS






  //MUESTRA TEXTO ENCIMA DEL ARCOIRIS
  var showText = function (target, message, index, interval) {
    if (index < message.length) {
      $(target).append(message[index++]);
      setTimeout(function () {
        showText(target, message, index, interval);
      }, interval);
    }
  }
  //Cambiar título del juego
  setTimeout(function () {
    showText("#div", "It's me! MARIO!", -1, 150);
  }, 3500);



  //CUANDO SE CLICA EN EL TITULO
  $('#div').click(function () {
    window.location.href = './content/principal.html';
  })
});