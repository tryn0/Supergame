# Supergame

### Autor/es
- __[Esambino](https://codepen.io/Esambino/pen/Ahlxi)__ - Proyecto en CodePen, desde el cual partí para recrear el planeta tierra.
- __[shalanah](https://codepen.io/shalanah/pen/ymRpPd)__ - Proyecto en CodePen, del que partí para hacer el arcoiris en canvas.
- __[tryn0](https://github.com/tryn0)__ - Yo, recopilé código y del cual estos códigos empecé este trabajo.

___

### Contenido
Juego para la semana cultural del IES Polígono Sur.  
De momento este proyecto sólo contiene lo que he creado yo sólo:  
+ Pantalla con el título del juego (Aún sin especificar, para la prueba usé It's me MARIO!!)
    + Arcoiris creado con canvas y con destellos o "brillitos".
    + Al acabar de pintar el arcoiris, con un setTimeout, aparece el título del juego.
    + Al hacer click en el título pasaría a la pantalla principal, un planeta tierra, con la cámara y la iluminación centrada en Japón. Puedes mover la cámara.
+ En la pantalla principal, como he dicho antes, contiene un planeta tierra, [aquí](#three.js) explico en profundidad cómo lo hice.
___

### A hacer/ideas
Estas ideas están en la rama develop.

___

### Plugins
He usado estos plugins de JavaScript para el desarrollo de este proyecto:
+ [three.js](https://threejs.org/)
+ three.js->[OrbitControls.js](https://threejs.org/docs/#examples/en/controls/OrbitControls)

___

### three.js
Es un framework de JavaScript para crear y mostrar contenido 3D en la web, da la capacidad de mostrar modelos, juegos, videos musicales, visualización de datos o casi cualquier otra cosa que se pueda imaginar, directamente en el navegador y en el smartphone.
Con este framework, se dibujó una esfera, añadiéndole la textura de la tierra, además de añadirle iluminación.

___

### OrbitControls.js
Es una librería que contiene three.js para el control de órbitas (de la cámara).  
Con esta librería se puede mover la cámara y girar la cámara con eje en el planeta.

___

### Cómo funciona
Cargas el archivo juego.html en tu navegador, que usa juego.js, al aparecer el título lo clicas, y redirigirá a la pantalla principal.