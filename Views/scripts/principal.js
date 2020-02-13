import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r113/build/three.module.js';
import { OrbitControls } from 'https://threejsfundamentals.org/threejs/resources/threejs/r113/examples/jsm/controls/OrbitControls.js';

//$('body').append('<div style="999" class="demo-content align-center line-drawing-demo cargando"><svg viewBox="0 0 280 100" width="200px" color="red"><g fill="none" fill-rule="evenodd" stroke="currentColor" stroke-width="1" class="lines"><path class="el" d="M58 80V50.12C57.7 41.6 51.14 35 43 35a15 15 0 0 0 0 30h7.5v15H43a30 30 0 1 1 0-60c16.42 0 29.5 13.23 30 29.89V80H58z"/><path class="el" d="M73 80V20H58v60h15z"/><path class="el" d="M58 80V49.77C58.5 33.23 71.58 20 88 20a30 30 0 0 1 30 30v30h-15V50a15 15 0 0 0-15-15c-8.14 0-14.7 6.6-15 15.12V80H58zm75 0V20h-15v60h15z"/><path class="el" d="M118 80V49.77C118.5 33.23 131.58 20 148 20a30 30 0 0 1 30 30v30h-15V50a15 15 0 0 0-15-15c-8.14 0-14.7 6.6-15 15.12V80h-15zm-7.5-60a7.5 7.5 0 1 1-7.48 8v-1c.25-3.9 3.5-7 7.48-7z"/><path class="el" d="M133 65a15 15 0 0 1-15-15v-7.5h-15V50a30 30 0 0 0 30 30V65zm30 15V49.77C163.5 33.23 176.58 20 193 20a30 30 0 0 1 30 30v30h-15V50a15 15 0 0 0-15-15c-8.14 0-14.7 6.6-15 15.12V80h-15z"/><path class="el" d="M238 65a15 15 0 0 1 0-30c8.1 0 14.63 6.53 15 15h-15v15h30V49.89C267.5 33.23 254.42 20 238 20a30 30 0 0 0 0 60V65z"/><path class="el" d="M260.48 65a7.5 7.5 0 1 1-7.48 8v-1c.26-3.9 3.5-7 7.48-7z"/></g></svg></div>');


$(document).ready(function(){
    /*FUNCIONA PARA LA ANIMACION DE PROGRSO CARGANDO
    anime({
        targets: '.line-drawing-demo .lines path',
        strokeDashoffset: [anime.setDashoffset, 0],
        easing: 'easeInOutSine',
        duration: 1500,
        delay: function(el, i) { return i * 250 },
        direction: 'alternate',
        loop: true
    });*/
    

    
    //Funcion para convertir latitud y longitud en Vector3
    //necesario para color los marcadores e infobox en una esfera
    function _convertLatLonToVec3(lat, lon) {
        lat = lat * Math.PI / 180.0;
        lon = -lon * Math.PI / 180.0;
        return new THREE.Vector3(
            Math.cos(lat) * Math.cos(lon),
            Math.sin(lat),
            Math.cos(lat) * Math.sin(lon));
    }

    /*function InfoBox(city, radius, domElement) {
        this._screenVector = new THREE.Vector3(0, 0, 0);

        this.position = _convertLatLonToVec3(city.lat, city.lng).multiplyScalar(radius);

        // create html overlay box
        this.box = document.createElement('div');
        this.box.innerHTML = city.name;
        this.box.className = "hudLabel";

        this.domElement = domElement;
        this.domElement.appendChild(this.box);

    }

    InfoBox.prototype.update = function () {
        this._screenVector.copy(this.position);
        this._screenVector.project(camera);

        var posx = Math.round((this._screenVector.x + 1) * this.domElement.offsetWidth / 2);
        var posy = Math.round((1 - this._screenVector.y) * this.domElement.offsetHeight / 2);

        var boundingRect = this.box.getBoundingClientRect();

        // update the box overlays position
        this.box.style.left = (posx - boundingRect.width) + 'px';
        this.box.style.top = posy + 'px';
    };*/

    // -------------------------------------------------------------------
    //Funcion para crear un marcador (chincheta)
    function Marker() {
        THREE.Object3D.call(this);

        var radius = 0.005;
        var sphereRadius = 0.02;
        var height = 0.05;

        var material = new THREE.MeshPhongMaterial({
            color: 0xDC143C
        });

        var cone = new THREE.Mesh(new THREE.ConeBufferGeometry(radius, height, 8, 1, true), material);
        cone.position.y = height * 0.5;
        cone.rotation.x = Math.PI;

        var sphere = new THREE.Mesh(new THREE.SphereBufferGeometry(sphereRadius, 16, 8), material);
        sphere.position.y = height * 0.95 + sphereRadius;

        this.add(cone, sphere);
    }
    Marker.prototype = Object.create(THREE.Object3D.prototype);

    // ------ Earth object -------------------------------------------------
    //Funcion para crear un objecto Earth (esfera, planneta tierra)
    function Earth(radius, texture, altura, agua) {
        THREE.Object3D.call(this);

        this.userData.radius = radius;

        var earth = new THREE.Mesh(
            new THREE.SphereBufferGeometry(radius, 300, 300),
            new THREE.MeshPhongMaterial({
                map: texture,
                bumpMap: altura,
                bumpScale: 0.025,
                specularMap: agua
            })
        );

        this.add(earth);
    }
    var marcadores = [];
    Earth.prototype = Object.create(THREE.Object3D.prototype);

    Earth.prototype.createMarker = function (lat, lon, name) {
        var marker = new Marker();

        var latRad = lat * (Math.PI / 180);
        var lonRad = -lon * (Math.PI / 180);
        var r = this.userData.radius;
        this.userData.name = name;

        marker.position.set(Math.cos(latRad) * Math.cos(lonRad) * r, Math.sin(latRad) * r, Math.cos(latRad) * Math.sin(lonRad) * r);
        marker.rotation.set(0.0, -lonRad, latRad - Math.PI * 0.5);
        marker.name = name;

        this.add(marker);
        marcadores.push(marker);
    };

    // ------ Three.js code ------------------------------------------------

    var scene, camera, renderer, label;
    var controls;

    init();

    function init() {
        //Creacion de la scene, camera y entorno de threejs
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(45, 4 / 3, 0.1, 100);
        camera.position.set(-1.60, 1.5, -1.3);
        renderer = new THREE.WebGLRenderer({
            antialias: true
        });

        //Creacion del control de la cámara
        controls = new OrbitControls(camera, renderer.domElement);
        controls.maxDistance = 4;
        controls.minDistance = 2;

        //Creacion de iluminacion
        var spotLight = new THREE.SpotLight(0xffffff);
        spotLight.position.set(-350, 0, -200);
        spotLight.castShadow = false; //If set to true light will cast dynamic shadows. Warning: This is expensive and requires tweaking to get shadows looking right.
        spotLight.shadow.mapSize.width = 1024;
        spotLight.shadow.mapSize.height = 1024;
        spotLight.shadow.camera.near = 50;
        spotLight.shadow.camera.far = 10000;
        spotLight.shadow.camera.fov = 60;
        scene.add(spotLight);


        //Textura (imagen de la tierra)
        var texture = new THREE.TextureLoader().load('../textures/tierra.jpg');
        //Textura de agua y tierra
        var agua = new THREE.TextureLoader().load('../textures/tierra-agua.png');
        //Textura de elevación del terreno
        var altura = new THREE.TextureLoader().load('../textures/altura.jpg');

        //Creación del planeta
        var earth = new Earth(1.0, texture, altura, agua);

        //Añadir marcador
        earth.createMarker(35.683333, 139.683333, 'Tokio'); // Tokyo

        //Añadir planeta a la scene
        scene.add(earth);

        //-------------
        // globe
        //Creacion de infobox

        //var radius1 = 1;

        //var sphere1 = new THREE.Mesh(new THREE.SphereGeometry(radius1, 16, 16));
        // scene.add( sphere1 );

        /*var city = {
            "name": "Nader Hany",
            "lat": 30,
            "lng": 30
        };*/

        //var label = new InfoBox(city, radius1, document.body);
        /*var material1 = new THREE.MeshPhongMaterial({
            color: 0xDC143C
        });
        var marker1 = new THREE.Mesh(new THREE.SphereGeometry(0.05, 16, 16), material1);
        marker1.userData = {
            URL: "http://stackoverflow.com"
        };
        marker1.position.copy(label.position);
        scene.add(marker1);

        var city2 = {
            "name": "Nader Hany",
            "lat": 40,
            "lng": 40
        };*/
        /*var label2 = new InfoBox(city2, radius1, document.body);
        var geometry2 = new THREE.SphereGeometry(0.05, 16, 16);
        var material2 = new THREE.MeshPhongMaterial({*/
        /* map: THREE.ImageUtils.loadTexture('https://upload.wikimedia.org/wikipedia/commons/4/40/Egyptian_Revolution_Flag_%281952-1958%29.jpg', THREE.SphericalRefractionMapping) */
        /*});
        var marker2 = new THREE.Mesh(geometry2, material2);

        marker2.userData = {
            URL: "http://stackoverflow.com"
        };
        marker2.position.copy(label2.position);
        scene.add(marker2);*/

        //markerarry.push(marker1)
        //markerarry.push(marker2)

        //----------------
        //Funcion para comprobar si lo que se ha clicado está en la lista de chinchetas/marcadores
        //si esta, en este caso como solo se ha programado japon, pues te lleva a japon
        //pero en el código de japon se hizo para mas de 1 objeto
        $(window).click(function (event){
            const rect = renderer.domElement.getBoundingClientRect();
            const left = event.clientX - rect.left;
            const top = event.clientY - rect.top;

            const x = (left / rect.width) * 2 - 1;
            const y = -(top / rect.height) * 2 + 1;

            const raycaster = new THREE.Raycaster();
            raycaster.ray.origin.setFromMatrixPosition(camera.matrixWorld);
            raycaster.ray.direction.set(x, y, 0.5).unproject(camera).sub(raycaster.ray.origin).normalize();

            const intersects = raycaster.intersectObjects(marcadores, true);
            if (intersects.length > 0) {
                if (confirm("¿Quieres viajar a Japón?")) {
                    window.location.href = './mapa.html';
                } else {
                    return false;
                }
            }
        });
        //-----------------------
        //Llamada a la funcion para el redimensionamiento de la ventana
        $(window).resize(onResize);
        onResize();

        //Agregado del entorno threejs al body, lo agrega como canvas
        $('body').append(renderer.domElement);

        animate();
    }

    //Funcion del redimensionamiento de la ventana
    function onResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }

    //Funcion que se llama asi misma y actualiza los controles de la cámara y renderiza la scene y la camera 60 veces por segundo, 60fps
    function animate(){
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
    }
    
    /*TEMA DE LA PARTE DE PANTALLA DE CARGA
    $('canvas').ready(function(){
        $('svg').fadeOut('slow');
    });*/
})