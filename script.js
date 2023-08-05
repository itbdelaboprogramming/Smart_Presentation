const myCanvas = document.querySelector("#myCanvas");
var myText = document.getElementById("myText").textContent;

import * as THREE from "three";
import { OrbitControls } from "https://unpkg.com/three@0.139.2/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "https://unpkg.com/three@0.139.2/examples/jsm/loaders/GLTFLoader.js";

// Creating a scene with background color
export const scene = new THREE.Scene();
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

export const camera = new THREE.PerspectiveCamera(
	60,
	myCanvas.offsetWidth / myCanvas.offsetHeight
);

// create grid helper
const size = 20;
const divisions = 20;
const colorCenterLine = 0xffffff;
const colorGrid = 0xffffff;

const grid = new THREE.GridHelper(size, divisions, colorCenterLine, colorGrid);
grid.name = "grid";
scene.add(grid);

/*
	Light in 3D scene
	set(x,y,z)
		+x front
		+y up
		+z left
*/

const ambientLight = new THREE.HemisphereLight(
	"white", // bright sky color
	"grey", // dim ground color
	0.2 // intensity
);
ambientLight.name = "ambientLight";
scene.add(ambientLight);

var dirLight = new THREE.DirectionalLight(0x404040, 20);
dirLight.name = "dirLight";
dirLight.position.set(100, 100, 0);

dirLight.castShadow = true;

scene.add(dirLight);

// Camera position
camera.position.set(3, 2, 2);
camera.lookAt(scene.position);

const renderer = new THREE.WebGLRenderer({ canvas: myCanvas });
renderer.setClearColor(0xffffff, 1.0);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(myCanvas.offsetWidth, myCanvas.offsetHeight);

export const orbitControls = new OrbitControls(camera, renderer.domElement);

const loadingScreenBar = document.getElementById("loadingBar");
const loadingScreenContainer = document.querySelector(
	".loadingScreenContainer"
);
const loadingManager = new THREE.LoadingManager();

loadingManager.onStart = function () {
	loadingScreenContainer.style.display = "flex";
};

loadingManager.onProgress = function (url, loaded, total) {
	loadingScreenBar.value = (loaded / total) * 100;
};

loadingManager.onLoad = function () {
	loadingScreenBar.value = 0;
	loadingScreenContainer.style.display = "none";
};

export const loader = new GLTFLoader(loadingManager);
loader.name = "loader";

let path = "files/" + myText;

loader.load(
	path,
	function (gltf) {
		let file3D = gltf.scene;
		file3D.name = "file3D";
		scene.add(file3D);
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
