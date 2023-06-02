import { scene, camera, orbitControls } from "../script.js";
import * as THREE from "three";

// Const, Var, Let
// ------------ sound ------------
const menuSound = document.querySelector(".menu-container-blue-sound");
const iconSoundOff = document.getElementById("sound-off");
const iconSoundOn = document.getElementById("sound-on");

// ------------ animation ------------
const menuAnimation = document.querySelector(".menu-container-blue-animation");
const iconAnimationOff = document.getElementById("animation-off");
const iconAnimationOn = document.getElementById("animation-on");

// ------------ catalogue ------------
const menuAlbum = document.querySelector(".menu-container-blue-album");
const catalogueContainer = document.getElementById("catalogue-container");

// ------------ lightning ------------
const menuLightning = document.querySelector(".menu-container-blue-lightning");

// ------------ information ------------
const menuInformation = document.querySelector(
	".menu-container-blue-information"
);
const informationContainer = document.getElementById("information-container");
var catalogue_product_list = document.querySelectorAll(
	".catalogue-product-list"
);
var myText = document.getElementById("myText").textContent;
let information_description_title = document.querySelector(
	".information-description-title"
);
let product_list_text = document.querySelector(
	".catalogue-product-list-text"
).innerText;

// ------------ 3d category dropdown ------------
const optionMenu = document.querySelector(".select-menu");
const selectBtn = optionMenu.querySelector(".select-menu-button");
const options = optionMenu.querySelectorAll(".option");
const sBtn_text = optionMenu.querySelector(".select-menu-text");
const catalogueTitle = document.querySelector(".catalogue-description-title");
const catalogueDescription = document.querySelector(".catalogue-description");

// ------------ dark/light mode ------------
const toggle = document.querySelector(".toggle");

let getMode = localStorage.getItem("mode");

// Menu sound button
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
menuAlbum.addEventListener("click", () => {
	menuAlbum.classList.toggle("active");
	if (menuAlbum.classList.contains("active")) {
		catalogueContainer.style.display = "flex";
	} else {
		catalogueContainer.style.display = "none";
	}
});
loadCatalogue(catalogue_product_list);

// Menu lightning button
menuLightning.addEventListener("click", () => {
	menuLightning.classList.toggle("active");
});

// Menu information button

menuInformation.addEventListener("click", () => {
	menuInformation.classList.toggle("active");

	if (menuInformation.classList.contains("active")) {
		informationContainer.style.display = "flex";
	} else {
		informationContainer.style.display = "none";
	}
});
updateInformation(product_list_text);

// for 3d category dropdown

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
				let desc = "";

				response.forEach((item, index) => {
					if (index == 0) {
						out += `
							<div class="catalogue-product-list active" data-value="${item.id}" id="model_name">
								<div class="catalogue-product-list-text">${item.model_name}</div>
								<img class="catalogue-image-preview" src="./files/${item.image_preview}" />
							</div>
						`;
					} else {
						out += `
							<div class="catalogue-product-list" data-value="${item.id}">
								<div class="catalogue-product-list-text">${item.model_name}</div>
								<img class="catalogue-image-preview" src="./files/${item.image_preview}" />
							</div>	
						`;
					}
				});

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

// helper function
function updateInformation($model_name) {
	let http = new XMLHttpRequest();

	http.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
			console.log(this.responseText);
			let response = JSON.parse(this.responseText);
			let out = "";

			// update title
			information_description_title.innerText = response[0].model_name;

			// update model_name
			let information_description_model_name = document.querySelector(
				".information-description-model-number"
			);
			response.forEach((item, index, array) => {
				if (index == 0 && index == array.length - 1) {
					out += `${item.model_number}`;
				} else if (index == 0) {
					out += `${item.model_number} | `;
				} else if (index == array.length - 1) {
					out += `${item.model_number}`;
				}
			});
			information_description_model_name.innerText = out;

			// update description
			out = "";
			let information_description_description = document.querySelector(
				".information-description-description"
			);

			let array_description = response[0].description.split(". ");

			array_description.forEach((item, index, array) => {
				if (index === 0 && index === array.length - 1) {
					out += `<p> ${item} </p>`;
				} else if (index === 0) {
					out += `<p> ${item} <br><br>`;
				} else if (index === array.length - 1) {
					out += `${item} </p>`;
				} else {
					out += `${item} <br><br>`;
				}
			});
			information_description_description.innerHTML = out;

			// update specification
			out = "";
			let information_description_specification = document.querySelector(
				".information-description-specification-detail"
			);

			let array_specification = response[0].specification.split(". ");

			array_specification.forEach((item, index, array) => {
				if (index === 0 && index === array.length - 1) {
					out += `<p> ${item} </p>`;
				} else if (index === 0) {
					out += `<p> ${item} <br><br>`;
				} else if (index === array.length - 1) {
					out += `${item} </p>`;
				} else {
					out += `${item} <br><br>`;
				}
			});
			information_description_specification.innerHTML = out;

			// update link
			out = "";
			let information_link = document.querySelector(".information-link");
			information_link.href = response[0].link_to_web;
			information_link.innerText = ` ${$model_name} Series | Nakayama Iron Works (ncjpn.com))`;
		}
	};
	http.open("POST", "./utils/model_name.php", true);
	http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	http.send("modelname=" + $model_name);
}

function loadCatalogue(catalogue_product_list) {
	catalogue_product_list.forEach(function (product_list) {
		product_list.addEventListener("click", () => {
			let temp_product_list_text = product_list.querySelector(
				".catalogue-product-list-text"
			).innerText;
			if (temp_product_list_text != product_list_text) {
				product_list_text = temp_product_list_text;
				console.log(product_list.getAttribute("data-value"));
				console.log(product_list_text);
				updateInformation(product_list_text);
			} else {
				console.log("sama");
			}

			resetCatalogueSelect();
			product_list.classList.toggle("active");

			if (product_list.classList.contains("active")) {
				information_description_title.innerText = product_list_text;
			}
		});

		if (product_list.classList.contains("active")) {
			let product_list_text = product_list.querySelector(
				".catalogue-product-list-text"
			).innerText;

			updateInformation(product_list_text);
		}
	});
}

function resetCatalogueSelect() {
	catalogue_product_list.forEach(function (product_list) {
		product_list.classList.remove("active");
	});
}
