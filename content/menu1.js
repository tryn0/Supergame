    import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r113/build/three.module.js';
    import {OrbitControls} from 'https://threejsfundamentals.org/threejs/resources/threejs/r113/examples/jsm/controls/OrbitControls.js';
    import {GUI} from 'https://threejsfundamentals.org/threejs/../3rdparty/dat.gui.module.js';
    
$(document).ready(function(){
    
  
    //Evitar seleccionar texto
    $('html').css('user-select','none');
  

    var scene = new THREE.Scene();
    //var camera = new THREE.PerspectiveCamera(90, window.innerWidth/window.innerHeight, 0.1, 1000);
    var renderer = new THREE.WebGLRenderer();

    /*
    In addition to creating the renderer instance, we also need to set the size at which we want it to render our app. 
    It's a good idea to use the width and height of the area we want to fill with our game 
    - in this case, the width and height of the browser window. For performance intensive games, you can also give setSize smaller values, 
    like window.innerWidth/2 and window.innerHeight/2, for half the resolution. 
    This does not mean that the game will only fill half the window, but rather look a bit blurry and scaled up.

    Last but not least, we add the renderer element to our HTML document. 
    This is a <canvas> element the renderer uses to display the scene to us.
    */

    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);


    var camera = new THREE.PerspectiveCamera(45,window.innerWidth/window.innerHeight,1,10000);
    camera.position.set(-25,150,100);
    
    var controls = new OrbitControls(camera,renderer.domElement);
    controls.maxDistance = 175;
    controls.minDistance = 65;
    controls.update();

    /* Create Lights: PointLight / SpotLight etc.*/
    var spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(100,100,150);
    spotLight.castShadow = true; //If set to true light will cast dynamic shadows. Warning: This is expensive and requires tweaking to get shadows looking right.
    spotLight.shadow.mapSize.width = 2048;
    spotLight.shadow.mapSize.height = 2048;
    spotLight.shadow.camera.near = 50;
    spotLight.shadow.camera.far = 5000;
    spotLight.shadow.camera.fov = 90;
    scene.add(spotLight);

    /* Create Material */
    function Mat(){
        var texture = new THREE.TextureLoader().load('../textures/tierra.jpg');
        var material = new THREE.MeshPhongMaterial({
            //color      : new THREE.Color("rgb(35,35,213)"),  //Diffuse color of the material
            //emissive   : new THREE.Color("rgb(64,128,255)"), //Emissive(light) color of the material, essentially a solid color unaffected by other lighting. Default is black.
            /*specular   : new THREE.Color("yellow"),*/ /*Specular color of the material, i.e., how shiny the material is and the color of its shine. 
                                                            Setting this the same color as the diffuse value (times some intensity) makes the material more metallic-looking; 
                                                            setting this to some gray makes the material look more plastic. Default is dark gray.*/
            shininess  : 1,                                  //How shiny the specular highlight is; a higher value gives a sharper highlight. Default is 30.
            //flatShading    : THREE.FlatShading,                  //How the triangles of a curved surface are rendered: THREE.SmoothShading, THREE.FlatShading, THREE.NoShading
            wireframe  : 1,                                  //THREE.Math.randInt(0,1)
            //transparent: 1,
            //opacity    : 1,                                //THREE.Math.randFloat(0,1) 
            map : texture
        });
        return material;
    }

    /* Create Geometry */
    var geometry = new THREE.SphereGeometry(40,350,350,0,Math.PI*2,0,Math.PI);
    //SphereGeometry(radius, widthSegments, heightSegments, phiStart, phiLength, thetaStart, thetaLength)

    /* Create Earth Sphere*/
    var earth = new THREE.Mesh(geometry, Mat());

    scene.add(earth);

    //camera.position.z = 100;



    /*
    This will create a loop that causes the renderer to draw the scene 60 times per second. 
    If you're new to writing games in the browser, you might say "why don't we just create a setInterval? 
    The thing is - we could, but requestAnimationFrame has a number of advantages. 
    Perhaps the most important one is that it pauses when the user navigates to another browser tab, hence not wasting their precious processing power and battery life.
    */
    function render(){
        requestAnimationFrame(render);
        /*
        Para que rote hay que usar esto:
        earth.rotation.x += 0.000;
        earth.rotation.y += 0.002;
        Solo rotará horizontalmente.
        */
       //Rotación indicada para centrar en Japon
        earth.rotation.x = -0.35;
        earth.rotation.y = 2.25;
        renderer.render(scene, camera);
    }
    render();

    function animate(){
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene,camera);
    }
});