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

// Creating a scene with background color
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xdbe9e9);
// 0xdbe9e9 = light blue
// 0xe0e4e7 = light gray

// Plane geometry as a ground
const geometry = new THREE.PlaneGeometry(20, 20, 8, 8);
const material = new THREE.MeshBasicMaterial({
	color: 0x4f5354,
	side: THREE.DoubleSide,
	transparent: true,
	opacity: 0,
});
const plane = new THREE.Mesh(geometry, material);
plane.rotateX(-Math.PI / 2);
scene.add(plane);

const camera = new THREE.PerspectiveCamera(
	40,
	myCanvas.offsetWidth / myCanvas.offsetHeight
);

// Resize canvas match the size of the screen
resizeCanvasToDisplaySize(myCanvas);

// create grid helper
const size = 20;
const divisions = 20;
const colorCenterLine = 0xFFFFFF
const colorGrid = 0xFFFFFF

const gridHelper = new THREE.GridHelper(size, divisions, colorCenterLine, colorGrid);
scene.add(gridHelper);

/*
	Light in 3D scene
	set(x,y,z)
		+x front
		+y up
		+z left
*/

//distance from 0,0,0
const r = 20;

// above obj light
const light = new THREE.PointLight();
light.position.set(r, r, 0);
light.shadowMapVisible = true;
scene.add(light);

const light1 = new THREE.PointLight();
light1.position.set(-0.5 * r, r, 0.866 * r);
scene.add(light1);

const light2 = new THREE.PointLight();
light2.position.set(-0.5 * r, r, -0.866 * r);
scene.add(light2);

// below obj light
const light3 = new THREE.PointLight();
light3.position.set(0, -r, 0);
scene.add(light3);

// Camera position
camera.position.set(3, 2, 2);
camera.lookAt(scene.position);

const renderer = new THREE.WebGLRenderer({ canvas: myCanvas });
renderer.setClearColor(0xffffff, 1.0);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(myCanvas.offsetWidth, myCanvas.offsetHeight);

const orbitControls = new OrbitControls(camera, renderer.domElement);

const loader = new GLTFLoader();

let path = "files/" + myText;

loader.load(
	path,
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
