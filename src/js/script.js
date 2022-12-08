import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'


const monkeyUrl = new URL('../assets/monkey.glb', import.meta.url);

const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    20,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

const Orbit = new OrbitControls(camera, renderer.domElement);

// const axesHelper = new THREE.AxesHelper(40);
// scene.add(axesHelper);

camera.position.set(-10, 30, 30);
Orbit.update();

// const boxGeometry = new THREE.BoxGeometry(5,5,5);
// const boxMaterial = new THREE.MeshBasicMaterial({color: 0xFF0000});
// const box = new THREE.Mesh(boxGeometry, boxMaterial);
// scene.add(box);
// const boxGeometry1 = new THREE.BoxGeometry(1,1,1);
// const boxMaterial1 = new THREE.MeshBasicMaterial({color: 0xFF0000});
// const box1 = new THREE.Mesh(boxGeometry1, boxMaterial1);
// scene.add(box1);
// box1.position.set(2,2,2)

// const planeGeometry = new THREE.PlaneGeometry(30,30);
// const planeMaterial = new THREE.MeshBasicMaterial({
//     color: 0xFFFFFF,
//     side: THREE.DoubleSide
// });

const assetLoader = new GLTFLoader();
assetLoader.load(monkeyUrl.href, function(gltf){
    const model = gltf.scene;
    scene.add(model);
    model.position.set(0, 0, 0)
}, undefined, function(error){
    concole.error(error);
});



// const plane = new THREE.Mesh(planeGeometry, planeMaterial);
// scene.add(plane);
// plane.rotation.x = -0.5 * Math.PI;

// const gridHelper = new THREE.GridHelper(30);
// scene.add(gridHelper);

function animate(){
    // box.rotation.x += 0.01;
    // box.rotation.y += 0.01;
    renderer.render(scene,camera);
}

renderer.setAnimationLoop(animate);

renderer.setClearColor(0xffffff);
