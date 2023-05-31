import { scene, camera, orbitControls } from "../script.js";
import * as THREE from "three";

// Menu sound button
const menuSound = document.querySelector(".menu-container-blue-sound");
const iconSoundOff = document.getElementById("sound-off");
const iconSoundOn = document.getElementById("sound-on");
menuSound.addEventListener("click", () => {
	menuSound.classList.toggle("active");

	if (menuSound.classList.contains("active")) {
		iconSoundOff.style.display = "none";
		iconSoundOn.style.display = "block";
	} else {
		iconSoundOff.style.display = "block";
		iconSoundOn.style.display = "none";
	}
});

// Menu animation button
const menuAnimation = document.querySelector(".menu-container-blue-animation");
const iconAnimationOff = document.getElementById("animation-off");
const iconAnimationOn = document.getElementById("animation-on");
menuAnimation.addEventListener("click", () => {
	menuAnimation.classList.toggle("active");

	if (menuAnimation.classList.contains("active")) {
		iconAnimationOff.style.display = "none";
		iconAnimationOn.style.display = "block";
		orbitControls.autoRotate = true;
	} else {
		iconAnimationOff.style.display = "block";
		iconAnimationOn.style.display = "none";
		orbitControls.autoRotate = false;
	}
});

// Menu album button
const menuAlbum = document.querySelector(".menu-container-blue-album");
const catalogueContainer = document.getElementById("catalogue-container");
menuAlbum.addEventListener("click", () => {
	menuAlbum.classList.toggle("active");
	if (menuAlbum.classList.contains("active")) {
		catalogueContainer.style.display = "flex";
	} else {
		catalogueContainer.style.display = "none";
	}
});

// Menu lightning button
const menuLightning = document.querySelector(".menu-container-blue-lightning");
menuLightning.addEventListener("click", () => {
	menuLightning.classList.toggle("active");
});

// Menu information button
const menuInformation = document.querySelector(
	".menu-container-blue-information"
);
const informationContainer = document.getElementById("information-container");

var catalogue_product_list = document.querySelectorAll(
	".catalogue-product-list"
);

// file name in html code
var myText = document.getElementById("myText").textContent;

function loadCatalogue(catalogue_product_list) {
	catalogue_product_list.forEach(function (product_list) {
		product_list.addEventListener("click", () => {
			let product_list_text = product_list.querySelector(
				".catalogue-product-list-text"
			).innerText;
			console.log(product_list.getAttribute("data-value"));

			resetCatalogueSelect();
			product_list.classList.toggle("active");
		});
	});
}

function resetCatalogueSelect() {
	catalogue_product_list.forEach(function (product_list) {
		product_list.classList.remove("active");
	});
}

loadCatalogue(catalogue_product_list);

menuInformation.addEventListener("click", () => {
	menuInformation.classList.toggle("active");

	if (menuInformation.classList.contains("active")) {
		informationContainer.style.display = "flex";
	} else {
		informationContainer.style.display = "none";
	}
});

// for 3d category dropdown
const optionMenu = document.querySelector(".select-menu");
const selectBtn = optionMenu.querySelector(".select-menu-button");
const options = optionMenu.querySelectorAll(".option");
const sBtn_text = optionMenu.querySelector(".select-menu-text");
const catalogueTitle = document.querySelector(".catalogue-description-title");
const catalogueDescription = document.querySelector(".catalogue-description");

selectBtn.addEventListener("click", () => {
	optionMenu.classList.toggle("active");
});

options.forEach(function (option) {
	option.addEventListener("click", () => {
		let selectedOption = option.querySelector(".option-text").innerText;
		sBtn_text.innerText = selectedOption;

		catalogueTitle.innerText = selectedOption + " Series";

		optionMenu.classList.toggle("active");

		let http = new XMLHttpRequest();

		http.onreadystatechange = function () {
			if (this.readyState == 4 && this.status == 200) {
				let response = JSON.parse(this.responseText);
				let out = "";
				for (let item of response) {
					out += `
						<div class="catalogue-product-list" data-value="${item.id}">
							<div class="catalogue-product-list-text">${item.model_name}</div>
							<img class="catalogue-image-preview" src="./files/${item.image_preview}" />
						</div>	
					
					`;
				}
				catalogueDescription.innerHTML = out;
				catalogue_product_list = document.querySelectorAll(
					".catalogue-product-list"
				);
				loadCatalogue(catalogue_product_list);
			}
		};

		http.open("POST", "./utils/model_name.php", true);
		http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		http.send("category=" + selectedOption);
	});
});

window.addEventListener("click", function (e) {
	if (!document.getElementById("item-category").contains(e.target)) {
		if (optionMenu.classList.contains("active")) {
			optionMenu.classList.toggle("active");
		}
	}
});

// dark/light mode toggle
const toggle = document.querySelector(".toggle");

let getMode = localStorage.getItem("mode");

if (getMode && getMode === "dark-theme") {
	document.body.classList.add("dark-theme");
	toggle.classList.add("active");

	scene.background = new THREE.Color(0x1d2538);

	scene.remove(scene.getObjectByName("grid"));

	const grid = new THREE.GridHelper(20, 20, 0x475b74, 0x475b74);
	grid.name = "grid";
	scene.add(grid);

	localStorage.setItem("mode", "dark-theme");
}

toggle.addEventListener("click", () => toggle.classList.toggle("active"));

toggle.addEventListener("click", () => {
	document.body.classList.toggle("dark-theme");

	if (document.body.classList.contains("dark-theme")) {
		scene.background = new THREE.Color(0x1d2538);

		scene.remove(scene.getObjectByName("grid"));

		const grid = new THREE.GridHelper(20, 20, 0x475b74, 0x475b74);
		grid.name = "grid";
		scene.add(grid);

		localStorage.setItem("mode", "dark-theme");
	} else {
		scene.background = new THREE.Color(0xdbe9e9);

		scene.remove(scene.getObjectByName("grid"));
		const grid = new THREE.GridHelper(20, 20, 0xffffff, 0xffffff);
		grid.name = "grid";
		scene.add(grid);

		localStorage.setItem("mode", "light");
	}
});

// Resize canvas
window.addEventListener("resize", () => {
	myCanvas.style.width = window.innerWidth + "px";
	myCanvas.style.height = window.innerHeight + "px";
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
});
