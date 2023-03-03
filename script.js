const myCanvas = document.querySelector('#myCanvas');
var myText = document.getElementById("myText").textContent;

import * as THREE from 'three';
import { OrbitControls } from 'https://unpkg.com/three@0.139.2/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://unpkg.com/three@0.139.2/examples/jsm/loaders/GLTFLoader.js'
import { STLLoader } from 'https://unpkg.com/three@0.139.2/examples/jsm/loaders/STLLoader.js'
import { VRMLLoader } from 'https://unpkg.com/three@0.139.2/examples/jsm/loaders/VRMLLoader.js'

function resizeCanvasToDisplaySize(canvas) {
    // Lookup the size the browser is displaying the canvas in CSS pixels.
    const displayWidth = canvas.clientWidth;
    const displayHeight = canvas.clientHeight;

    // Check if the canvas is not the same size.
    const needResize =
        canvas.width !== displayWidth || canvas.height !== displayHeight;

    if (needResize) {
        // Make the canvas the same size
        canvas.width = displayWidth;
        canvas.height = displayHeight;
    }

    return needResize;
}

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    40,
    myCanvas.offsetWidth / myCanvas.offsetHeight
);

resizeCanvasToDisplaySize(myCanvas)

camera.position.set(1, 3, 3);
camera.lookAt(scene.position);

const light = new THREE.SpotLight()
light.position.set(20, 20, 20)
scene.add(light)

const renderer = new THREE.WebGLRenderer({ canvas: myCanvas });
renderer.setClearColor(0xffffff, 1.0);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(myCanvas.offsetWidth, myCanvas.offsetHeight);

const orbitControls = new OrbitControls(camera, renderer.domElement);

const loader = new GLTFLoader();


// let text = "MSD700_bucket_MCLA007A_00_2.glb";
let pathnya = "files/" + myText;
console.log(pathnya)

loader.load( pathnya, function ( gltf ) {

    scene.add( gltf.scene );

}, undefined, function ( error ) {

    console.error( error );

} );


renderer.setAnimationLoop(() => {
    orbitControls.update();

    renderer.render(scene, camera);
});


// const assetLoader = new GLTFLoader();
// assetLoader.load(metal.href, function(gltf){
//     const model = gltf.scene;
//     scene.add(model);
//     model.position.set(0, 0, 0)
// }, undefined, function(error){
//     concole.error(error);
// });

// const loader = new STLLoader()
// loader.load("/test.stl", function (geometry) {
//     const group = new THREE.Group()
//     scene.add(group)

//     const material = new THREE.MeshPhongMaterial({ color: 0xaaaaaa, specular: 0x111111, shininess: 200 })
//     const mesh = new THREE.Mesh(geometry, material)
//     mesh.position.set(0, 0, 0)
//     mesh.scale.set(10, 10, 10)
//     mesh.castShadow = true
//     mesh.receiveShadow = true

//     geometry.center()
//     group.add(mesh)
// })

// var loader = new VRMLLoader();
// loader.load( 'files/test.wrl', function ( object ) {
//   vrmlScene = object;
//   scene.add( object );
//   orbitControls.reset();
// }, undefined, function(error){
//   console.error(error);
// } );