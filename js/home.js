import { scene, camera, orbitControls } from "../script.js";
import * as THREE from "three";
import { GLTFLoader } from "https://unpkg.com/three@0.139.2/examples/jsm/loaders/GLTFLoader.js";

// Const, Var, Let
// ------------ sound ------------
const menuSound = document.querySelector(".menu-container-blue-sound");
const iconSoundOff = document.getElementById("sound-off");
const iconSoundOn = document.getElementById("sound-on");
const soundExpand = document.querySelector(".sound-expand");

// ------------ animation ------------
const menuAnimation = document.querySelector(".menu-container-blue-animation");
const iconAnimationOff = document.getElementById("animation-off");
const iconAnimationOn = document.getElementById("animation-on");

// ------------ catalogue ------------
const menuAlbum = document.querySelector(".menu-container-blue-album");
const catalogueContainer = document.getElementById("catalogue-container-2");
var catalogue_product_list = document.querySelectorAll(
	".catalogue-product-list-2"
);
let product_list_text = document.querySelector(
	".catalogue-product-list-text-2"
).innerText;

const catalogueDetailContainer = document.getElementById("catalogue-container");
const catalogueDetailBack = document.querySelector(".catalogue-back-button");
const catalogueDetailDescription = document.querySelector(
	".catalogue-description"
);
const catalogueDetailTitle = document.querySelector(
	".catalogue-description-title"
);

// ------------ lightning ------------
const menuLightning = document.querySelector(".menu-container-blue-lightning");

// ------------ information ------------
const menuInformation = document.querySelector(
	".menu-container-blue-information"
);
const informationContainer = document.getElementById("information-container");
var myText = document.getElementById("myText").textContent;
let information_description_title = document.querySelector(
	".information-description-title"
);
const information_description = document.querySelector(
	".information-description"
);

// ------------ 3d category dropdown ------------
const optionMenu = document.querySelector(".select-menu");
const selectBtn = optionMenu.querySelector(".select-menu-button");
const options = optionMenu.querySelectorAll(".option");
const sBtn_text = optionMenu.querySelector(".select-menu-text");
const catalogueTitle = document.querySelector(".catalogue-description-title-2");
const catalogueDescription = document.querySelector(".catalogue-description-2");

let product_list_detail_dataset_value;

// ------------ dark/light mode ------------
const toggle = document.querySelector(".toggle");

let getMode = localStorage.getItem("mode");
var audio = new Audio("./audio/podcast-18169.mp3");
audio.loop = true;
audio.volume = 0.5;
var audio_speech = new Audio("./audio/voicebooking-speech.wav");
audio_speech.loop = true;
// Menu sound button
menuSound.addEventListener("click", () => {
	menuSound.classList.toggle("active");

	if (menuSound.classList.contains("active")) {
		iconSoundOff.style.display = "none";
		iconSoundOn.style.display = "block";
		soundExpand.style.display = "flex";
	} else {
		iconSoundOff.style.display = "block";
		iconSoundOn.style.display = "none";
		soundExpand.style.display = "none";
	}
});

const toggle_music = document.querySelector(".toggle-music");
const toggle_speech = document.querySelector(".toggle-speech");

toggle_music.addEventListener("click", () => {
	toggle_music.classList.toggle("active");

	if (toggle_music.classList.contains("active")) {
		audio.play();
	} else {
		audio.pause();
	}
});

toggle_speech.addEventListener("click", () => {
	toggle_speech.classList.toggle("active");

	if (toggle_speech.classList.contains("active")) {
		audio_speech.play();
	} else {
		audio_speech.pause();
		audio_speech.currentTime = 0;
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
		catalogueDetailContainer.style.display = "none";
	} else {
		catalogueContainer.style.display = "none";
		catalogueDetailContainer.style.display = "none";
	}
});
loadCatalogue(catalogue_product_list);
catalogueDetailBack.addEventListener("click", () => {
	catalogueContainer.style.display = "flex";
	catalogueDetailContainer.style.display = "none";
	catalogueDetailTitle.innerText = "";
	catalogueDetailDescription.innerHTML = "";
});

// Menu lightning button
const lightning_expand = document.querySelector(
	".menu-container-blue-lightning-expand"
);
menuLightning.addEventListener("click", () => {
	menuLightning.classList.toggle("active");

	if (menuLightning.classList.contains("active")) {
		lightning_expand.style.display = "block";
	} else {
		lightning_expand.style.display = "none";
	}
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

				response.forEach((item, index) => {
					if (index == 0) {
						out += `
							<div class="catalogue-product-list-2 active" id="model_name">
								<div class="catalogue-product-list-text-2">${item.model_name}</div>
								<img class="catalogue-image-preview-2" src="./files/${item.image_preview}" />
							</div>
						`;
					} else {
						out += `
							<div class="catalogue-product-list-2" >
								<div class="catalogue-product-list-text-2">${item.model_name}</div>
								<img class="catalogue-image-preview-2" src="./files/${item.image_preview}" />
							</div>	
						`;
					}
				});

				catalogueDescription.innerHTML = out;
				catalogue_product_list = document.querySelectorAll(
					".catalogue-product-list-2"
				);
				loadCatalogue(catalogue_product_list);
			}
		};

		http.open("POST", "./utils/database.php", true);
		http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		http.send("category=" + selectedOption);

		if (menuAlbum.classList.contains("active")) {
			catalogueDetailContainer.style.display = "none";
			catalogueContainer.style.display = "flex";
		}
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
myCanvas.style.width = window.innerWidth + "px";
myCanvas.style.height = window.innerHeight + "px";
camera.aspect = window.innerWidth / window.innerHeight;
camera.updateProjectionMatrix();

window.addEventListener("resize", () => {
	myCanvas.style.width = window.innerWidth + "px";
	myCanvas.style.height = window.innerHeight + "px";
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
});

let loader = new GLTFLoader();
loader.name = "loader";

// helper function
function updateInformation(model_name) {
	let http = new XMLHttpRequest();

	http.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
			let response = JSON.parse(this.responseText);
			let out = "";

			// update file (canvas)
			myText = response[0].file;
			let specification_img = response[0].specification_img;
			updateFile3D(myText);

			// update title
			information_description_title.innerText = response[0].model_name;

			// update model_name
			let information_description_model_name = document.querySelector(
				".information-description-model-number"
			);
			response.forEach((item, index, array) => {
				if (index == 0 && index == array.length - 1) {
					out += `${item.model_number}`;
				} else if (index == array.length - 1) {
					out += `${item.model_number}`;
				} else {
					out += `${item.model_number} | `;
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
					out += `<img class="information-specification-img" src="./files/${specification_img}" />`;
				} else {
					out += `${item} <br><br>`;
				}
			});
			information_description_specification.innerHTML = out;

			// update link
			out = "";
			let information_link = document.querySelector(".information-link");
			information_link.href = response[0].link_to_web;
			information_link.innerText = ` ${model_name} Series | Nakayama Iron Works (ncjpn.com)`;

			information_description.scrollTo({ top: 0, behavior: "smooth" });
		}
	};
	http.open("POST", "./utils/database.php", true);
	http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	http.send("modelname=" + model_name);
}

function loadCatalogue(catalogue_product_list) {
	catalogue_product_list.forEach(function (product_list) {
		product_list.addEventListener("click", () => {
			let temp_product_list_text = product_list.querySelector(
				".catalogue-product-list-text-2"
			).innerText;
			if (temp_product_list_text != product_list_text) {
				product_list_text = temp_product_list_text;

				updateInformation(product_list_text);
			}

			resetCatalogueSelect();
			product_list.classList.toggle("active");

			if (product_list.classList.contains("active")) {
				information_description_title.innerText = product_list_text;
			}

			loadCatalogueDetail(product_list_text);
			catalogueContainer.style.display = "none";
			catalogueDetailContainer.style.display = "flex";
		});

		if (product_list.classList.contains("active")) {
			let product_list_text = product_list.querySelector(
				".catalogue-product-list-text-2"
			).innerText;

			updateInformation(product_list_text);
		}
	});
	catalogueDescription.scrollTo({ top: 0, behavior: "smooth" });
}

function loadFile3D(id) {
	let http = new XMLHttpRequest();

	http.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
			let response = JSON.parse(this.responseText);

			updateFile3D(response[0].file);
		}
	};
	http.open("POST", "./utils/database.php", true);
	http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	http.send("id=" + id);
}

function resetCatalogueSelect() {
	catalogue_product_list.forEach(function (product_list) {
		product_list.classList.remove("active");
	});
}

function updateFile3D(file_name) {
	try {
		let file3D = scene.getObjectByName("file3D");
		file3D.name = "file3D";

		scene.remove(file3D);

		loader.load(
			`./files/${file_name}`,
			function (gltf) {
				file3D = gltf.scene;
				file3D.name = "file3D";
				scene.add(file3D);
			},
			undefined,
			function (error) {
				console.error(error);
			}
		);
	} catch (e) {
		// do nothing
	}
}

function loadCatalogueDetail(model_name) {
	let http = new XMLHttpRequest();

	http.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
			let response = JSON.parse(this.responseText);
			let out = "";

			response.forEach((item, index) => {
				if (index == 0) {
					out += `
						<div class="catalogue-product-list active" data-value="${item.id}" id="model_name">
							<div class="catalogue-product-list-text">${item.model_number}</div>
							<img class="catalogue-image-preview" src="./files/${item.image_preview}" />
						</div>
					`;
					product_list_detail_dataset_value = item.id;
				} else {
					out += `
						<div class="catalogue-product-list" data-value="${item.id}">
							<div class="catalogue-product-list-text">${item.model_number}</div>
							<img class="catalogue-image-preview" src="./files/${item.image_preview}" />
						</div>	
					`;
				}
			});

			catalogueDetailDescription.innerHTML = out;
			catalogueDetailTitle.innerText = model_name + " Models";

			let catalogue_product_list_detail = document.querySelectorAll(
				".catalogue-product-list"
			);
			catalogue_product_list_detail.forEach(function (product_list_detail) {
				product_list_detail.addEventListener("click", () => {
					if (
						product_list_detail.dataset.value !=
						product_list_detail_dataset_value
					) {
						loadFile3D(product_list_detail.dataset.value);
						product_list_detail_dataset_value =
							product_list_detail.dataset.value;

						catalogue_product_list_detail.forEach(function (product_list) {
							product_list.classList.remove("active");
						});
						product_list_detail.classList.toggle("active");
					}
				});
			});
		}
	};
	http.open("POST", "./utils/database.php", true);
	http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	http.send("getmodelnumber=" + model_name);
}

// slider
const slider = document.getElementById("slider-zoom");
const maxValue = slider.getAttribute("max");
let value;
const sliderFill = document.getElementById("fill-zoom");

updateSlider();
updateZoomCamera();
slider.addEventListener("input", () => {
	updateSlider();
	updateZoomCamera();
});

function updateZoomCamera() {
	camera.zoom = slider.value;
	camera.updateProjectionMatrix();
}

function updateSlider() {
	value = (slider.value / maxValue) * 100 + "%";
	sliderFill.style.width = value;
}

// slider env brightness
const slider_env = document.getElementById("slider-env");
const maxValue_env = slider_env.getAttribute("max");
let value_env;
const sliderFill_env = document.getElementById("fill-env");

updateSliderEnv();
slider_env.addEventListener("input", () => {
	updateSliderEnv();
	updateEnvBrightness();
});

function updateSliderEnv() {
	value_env = (slider_env.value / maxValue_env) * 100 + "%";
	sliderFill_env.style.width = value_env;
}

function updateEnvBrightness() {
	let ambient = scene.getObjectByName("ambientLight");
	ambient.intensity = slider_env.value;
}

// slider lamp position
const slider_lamp_pos = document.getElementById("slider-lamp-pos");
const maxValue_lamp_pos = slider_lamp_pos.getAttribute("max");
let value_lamp_pos;
const sliderFill_lamp_pos = document.getElementById("fill-lamp-pos");

updateSliderLampPos();
slider_lamp_pos.addEventListener("input", () => {
	updateSliderLampPos();
	updateLampPos();
});

function updateSliderLampPos() {
	value_lamp_pos = (slider_lamp_pos.value / maxValue_lamp_pos) * 100 + "%";
	sliderFill_lamp_pos.style.width = value_lamp_pos;
}

function updateLampPos() {
	let lamp = scene.getObjectByName("dirLight");
	lamp.position.set(100, 100, -(slider_lamp_pos.value - 200));
}

// slider lamp
const slider_lamp = document.getElementById("slider-lamp");
const maxValue_lamp = slider_lamp.getAttribute("max");

let value_lamp;

const sliderFill_lamp = document.getElementById("fill-lamp");
updateSliderLamp();
slider_lamp.addEventListener("input", () => {
	updateSliderLamp();
	updateLamp();
});

function updateSliderLamp() {
	value_lamp = (slider_lamp.value / maxValue_lamp) * 100 + "%";
	sliderFill_lamp.style.width = value_lamp;
}

function updateLamp() {
	let lamp = scene.getObjectByName("dirLight");
	lamp.intensity = slider_lamp.value;
}
