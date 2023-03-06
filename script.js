const myCanvas = document.querySelector("#myCanvas");
var myText = document.getElementById("myText").textContent;

import * as THREE from "three";
import { OrbitControls } from "https://unpkg.com/three@0.139.2/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "https://unpkg.com/three@0.139.2/examples/jsm/loaders/GLTFLoader.js";
import { STLLoader } from "https://unpkg.com/three@0.139.2/examples/jsm/loaders/STLLoader.js";
import { VRMLLoader } from "https://unpkg.com/three@0.139.2/examples/jsm/loaders/VRMLLoader.js";

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

// Resize canvas match the size of the screen
resizeCanvasToDisplaySize(myCanvas);

const size = 10;
const divisions = 10;

const gridHelper = new THREE.GridHelper(size, divisions);
scene.add(gridHelper);

const light = new THREE.PointLight();
light.position.set(-20, 20, 20);
scene.add(light);
const light1 = new THREE.PointLight();
light1.position.set(-20, -20, 20);
scene.add(light1);

const light3 = new THREE.PointLight();
light3.position.set(-20, 20, -20);
scene.add(light3);
const light4 = new THREE.PointLight();
light4.position.set(-20, -20, -20);
scene.add(light4);

camera.position.set(1, 3, 3);
camera.lookAt(scene.position);

const renderer = new THREE.WebGLRenderer({ canvas: myCanvas });
renderer.setClearColor(0xffffff, 1.0);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(myCanvas.offsetWidth, myCanvas.offsetHeight);

const orbitControls = new OrbitControls(camera, renderer.domElement);

const loader = new GLTFLoader();

let pathnya = "files/" + myText;
console.log(pathnya);

loader.load(
	pathnya,
	function (gltf) {
		scene.add(gltf.scene);
	},
	undefined,
	function (error) {
		console.error(error);
	}
);

renderer.setAnimationLoop(() => {
	orbitControls.update();

	renderer.render(scene, camera);
});
