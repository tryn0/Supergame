import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r113/build/three.module.js';
import { OrbitControls } from 'https://threejsfundamentals.org/threejs/resources/threejs/r113/examples/jsm/controls/OrbitControls.js';

$(document).ready(function(){

    //Creacion de la escena y el entorno
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight, 1,10000);
    var renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer = new THREE.WebGLRenderer({antialias: true});

    //Posicion de la cámara (x, y, z)
    camera.position.set(0, 0, 1000);
    

    //Controles de la cámara
    var controls = new OrbitControls(camera, renderer.domElement);
    controls.maxDistance = 1000;
    controls.minDistance = 750;
    

    //Función para el redimensionamiento de la pantalla
    $(window).resize(onResize);
    onResize();
    function onResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }

    //Agregado del entorno de threejs al body
    $('body').append(renderer.domElement);

    //Creacion del objeto del mapa
    var geometry = new THREE.BoxGeometry(1300, 1470, 25, 1, 1, 1);
    var svg = new THREE.TextureLoader().load('../images/mapa_japon.png');
    var material = new THREE.MeshBasicMaterial({
        map: svg
    });
    var cube = new THREE.Mesh(geometry, material);

    var niveles = [];

    //Creacion de puntos
    var tokio = new THREE.Mesh( new THREE.SphereGeometry(10, 50, 50 ), new THREE.MeshBasicMaterial( {color: 0xffff00} ) );
    tokio.position.set(335,-15,20);
    tokio.name = 'Tokio';

    var tokio2 = new THREE.Mesh( new THREE.SphereGeometry(10, 50, 50 ), new THREE.MeshBasicMaterial( {color: 0xffff00} ) );
    tokio2.position.set(-335,-15,-20);
    tokio2.name = 'Tokio';

    var hokkaido = new THREE.Mesh( new THREE.SphereGeometry(10, 50, 50 ), new THREE.MeshBasicMaterial( {color: 0xffff00} ) );
    hokkaido.position.set(200,400,20);
    hokkaido.name = 'Hokkaido';
    hokkaido.color = 'grey';   

    var hokkaido2 = new THREE.Mesh( new THREE.SphereGeometry(10, 50, 50 ), new THREE.MeshBasicMaterial( {color: 0xffff00} ) );
    hokkaido2.position.set(-200,400,-20);
    hokkaido2.name = 'Hokkaido';

    var kioto = new THREE.Mesh(new THREE.SphereGeometry(10, 50, 50), new THREE.MeshBasicMaterial({color: 0xffff00}));
    kioto.position.set(15,-150,20);
    kioto.name = 'Kioto';

    var kioto2 = new THREE.Mesh(new THREE.SphereGeometry(10, 50, 50), new THREE.MeshBasicMaterial({color: 0xffff00}));
    kioto2.position.set(-15,-150,-20);
    kioto2.name = 'Kioto';

    //Añadir puntos a lista para luego poder hacer click con raycaster
    niveles.push(tokio, tokio2, hokkaido, hokkaido2, kioto, kioto2);

    //Añadir puntos a la escena (pantalla)
    scene.add(cube,tokio,tokio2, hokkaido, hokkaido2, kioto, kioto2);


    //Creacion de líneas, cara1 (de frente)
    var lineGeometry = new THREE.Geometry();
    lineGeometry.vertices.push(new THREE.Vector3(335,-15,20), new THREE.Vector3(200,400,20));
    var lineMaterial = new THREE.LineBasicMaterial({color: 'red',linewidth: 5});
    var line = new THREE.Line(lineGeometry, lineMaterial);
    scene.add(line);

    var lineGeometry2 = new THREE.Geometry();
    lineGeometry2.vertices.push(new THREE.Vector3(15,-150,20), new THREE.Vector3(335,-15,20));
    var lineMaterial2 = new THREE.LineBasicMaterial({color: 'red',linewidth: 5});
    var line2 = new THREE.Line(lineGeometry2, lineMaterial2);
    scene.add(line2);

    //Creacion de líneas, cara2 (de espalda)
    var lineGeometry3 = new THREE.Geometry();
    lineGeometry3.vertices.push(new THREE.Vector3(-335,-15,-20), new THREE.Vector3(-200,400,-20));
    var lineMaterial3 = new THREE.LineBasicMaterial({color: 'red',linewidth: 5});
    var line3 = new THREE.Line(lineGeometry3, lineMaterial3);
    scene.add(line3);

    var lineGeometry4 = new THREE.Geometry();
    lineGeometry4.vertices.push(new THREE.Vector3(-15,-150,-20), new THREE.Vector3(-335,-15,-20));
    var lineMaterial3 = new THREE.LineBasicMaterial({color: 'red',linewidth: 5});
    var line4 = new THREE.Line(lineGeometry4, lineMaterial3);
    scene.add(line4);

    
    //Funcion que renderiza 60 veces por segundo la scene y camera, la pantalla vaya, 60fps
    function render() {
        requestAnimationFrame(render);
        renderer.render(scene, camera);
    }
    render();


    //Comprueba al hacer click si lo que has clicado está en la lista niveles
    //si está comprueba el nombre del objeto, y según el nombre te redirecciona a un nivel u otro
    $(window).click(function (event) {
        // the following line would stop any other event handler from firing
        // (such as the mouse's TrackballControls)
        // event.preventDefault();

        const rect = renderer.domElement.getBoundingClientRect();
        const left = event.clientX - rect.left;
        const top = event.clientY - rect.top;

        const x = (left / rect.width) * 2 - 1;
        const y = -(top / rect.height) * 2 + 1;

        const raycaster = new THREE.Raycaster();
        raycaster.ray.origin.setFromMatrixPosition(camera.matrixWorld);
        raycaster.ray.direction.set(x, y, 0.5).unproject(camera).sub(raycaster.ray.origin).normalize();

        const intersects = raycaster.intersectObjects(niveles, true);
        if (intersects.length > 0){
            switch(intersects[0].object.name){
                //Si su nombre es tokio
                case 'Tokio':
                    if (confirm("¿Quieres viajar a "+intersects[0].object.name+"?")) {
                        window.location.href = './tokio.html';
                    }else{
                        return false;
                    }
                  break;
                //Si su nombre es hokkaido
                case 'Hokkaido':
                    if (confirm("¿Quieres viajar a "+intersects[0].object.name+"?")) {
                        window.location.href = './hokkaido.html';
                    }else{
                        return false;
                    }
                    break;
                case 'Kioto':
                    if (confirm("¿Quieres viajar a "+intersects[0].object.name+"?")) {
                        window.location.href = './kioto.html';
                    }else{
                        return false;
                    }
                    break;
            }
        }
    });
})