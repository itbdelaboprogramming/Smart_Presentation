import { scene, camera, loader } from "../script.js";
import * as THREE from "three";
import { GLTFLoader } from "https://unpkg.com/three@0.139.2/examples/jsm/loaders/GLTFLoader.js";

// ---------------------------------------------------------------------------------------
// -------------------------------- Const, Var, Let --------------------------------------
// ---------------------------------------------------------------------------------------

// ------------------------------ dark/light mode toggle ---------------------------------
const toggle = document.querySelector(".toggle");
let getMode = localStorage.getItem("mode");

// --------------------------- filter (ascending/descending) -----------------------------
const filter_sort_box = document.querySelector(".filter-sort-box");
const filter_asc = document.getElementById("filter-asc");
const filter_desc = document.getElementById("filter-desc");
let order_type = "ASC";

// --------------------------------- filter (sort by) ------------------------------------
let filter_drop_down = document.querySelector(".filter-drop-down");
const filter_text = document.querySelector(".filter-text");

let selected_sort_by = "model_name";
const divMNa = document.getElementById("div_sort_model_name");
const radMNa = document.getElementById("sort_model_name");
const divMNu = document.getElementById("div_sort_model_number");
const radMNu = document.getElementById("sort_model_number");
const divDM = document.getElementById("div_sort_date_modified");
const radDM = document.getElementById("sort_date_modified");

// --------------------------------- pagination drop down --------------------------------
const optionMenu_pagination = document.querySelector(".pagination-select-menu");
const selectBtn_pagination = optionMenu_pagination.querySelector(
	".pagination-select-menu-button"
);
const options_pagination =
	optionMenu_pagination.querySelectorAll(".pagination-option");
const sBtn_text_pagination = optionMenu_pagination.querySelector(
	".pagination-select-menu-text"
);

// ------------------------------- pagination previous/next ------------------------------
const total_data = document.querySelector(".total-data");
const total_page = document.getElementById("total-page");
const total_data_first = document.querySelector(".total-data-first");
const total_data_last = document.querySelector(".total-data-last");
const current_page = document.getElementById("current-page");
const pagination_first_page_button = document.getElementById(
	"pagination-first-page-button"
);
const pagination_previous_page_button = document.getElementById(
	"pagination-previous-page-button"
);
const pagination_next_page_button = document.getElementById(
	"pagination-next-page-button"
);
const pagination_last_page_button = document.getElementById(
	"pagination-last-page-button"
);

// ---------------------------- resize canvas width responsive ---------------------------
let right_content = document.querySelector(".right-content");
let width = right_content.offsetWidth * 0.9;

// ----------------------------------- database data -------------------------------------
const database_table = document.getElementById("database-data");
let selected_database_data_selected;

// let loader = new GLTFLoader();
// loader.name = "loader";

// -------------------------------- 3d category dropdown ---------------------------------
const optionMenu = document.querySelector(".select-menu");
const selectBtn = optionMenu.querySelector(".select-menu-button");
const options = optionMenu.querySelectorAll(".option");
const sBtn_text = optionMenu.querySelector(".select-menu-text");

// ---------------------------------------------------------------------------------------
// ---------------------------------- PROGRAM CODE ---------------------------------------
// ---------------------------------------------------------------------------------------

// ------------------------------ dark/light mode toggle ---------------------------------
if (getMode && getMode === "dark-theme") {
	document.body.classList.add("dark-theme");
	toggle.classList.add("active");

	scene.background = new THREE.Color(0x98a2b3);

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
		scene.background = new THREE.Color(0x98a2b3);

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

// --------------------------- filter (ascending/descending) -----------------------------
filter_sort_box.addEventListener("click", () => {
	if (filter_asc.style.display != "none") {
		filter_asc.style.display = "none";
		filter_desc.style.display = "block";
		order_type = "DESC";
		current_page.innerText = "1";
		updateDatabaseData(
			sBtn_text_pagination.innerText,
			sBtn_text.innerText,
			selected_sort_by,
			order_type
		);
	} else {
		filter_asc.style.display = "block";
		filter_desc.style.display = "none";
		order_type = "ASC";
		current_page.innerText = "1";
		updateDatabaseData(
			sBtn_text_pagination.innerText,
			sBtn_text.innerText,
			selected_sort_by,
			order_type
		);
	}
});

// --------------------------------- filter (sort by) ------------------------------------
filter_text.addEventListener("click", () => {
	if (filter_drop_down.style.display == "none") {
		filter_drop_down.style.display = "flex";
	} else {
		filter_drop_down.style.display = "none";
	}
});

window.addEventListener("click", function (e) {
	if (!document.querySelector(".filter-container").contains(e.target)) {
		if (filter_drop_down.style.display != "none") {
			filter_drop_down.style.display = "none";
		}
	}
});

divMNa.addEventListener("click", () => {
	radMNa.checked = true;
	selected_sort_by = "model_name";
	current_page.innerText = "1";
	updateDatabaseData(
		sBtn_text_pagination.innerText,
		sBtn_text.innerText,
		selected_sort_by,
		order_type
	);
	filter_drop_down.style.display = "none";
});

divMNu.addEventListener("click", () => {
	radMNu.checked = true;
	selected_sort_by = "model_number";
	current_page.innerText = "1";
	updateDatabaseData(
		sBtn_text_pagination.innerText,
		sBtn_text.innerText,
		selected_sort_by,
		order_type
	);
	filter_drop_down.style.display = "none";
});

divDM.addEventListener("click", () => {
	radDM.checked = true;
	selected_sort_by = "date_modified";
	current_page.innerText = "1";
	updateDatabaseData(
		sBtn_text_pagination.innerText,
		sBtn_text.innerText,
		selected_sort_by,
		order_type
	);
	filter_drop_down.style.display = "none";
});

// ------------------------------- pagination previous/next ------------------------------
updateTotalPage();

pagination_first_page_button.addEventListener("click", () => {
	if (!pagination_first_page_button.classList.contains("disabled")) {
		current_page.innerText = "1";
		pagination_first_page_button.classList.add("disabled");
		pagination_previous_page_button.classList.add("disabled");

		pagination_next_page_button.classList.remove("disabled");
		pagination_last_page_button.classList.remove("disabled");

		updateDatabaseData(
			sBtn_text_pagination.innerText,
			sBtn_text.innerText,
			selected_sort_by,
			order_type
		);
	}
});

pagination_previous_page_button.addEventListener("click", () => {
	if (!pagination_previous_page_button.classList.contains("disabled")) {
		let pageNumber = parseInt(current_page.innerText) - 1;
		current_page.innerText = pageNumber;

		pagination_next_page_button.classList.remove("disabled");
		pagination_last_page_button.classList.remove("disabled");

		if (pageNumber == 1) {
			pagination_first_page_button.classList.add("disabled");
			pagination_previous_page_button.classList.add("disabled");
		}

		updateDatabaseData(
			sBtn_text_pagination.innerText,
			sBtn_text.innerText,
			selected_sort_by,
			order_type
		);
	}
});

pagination_next_page_button.addEventListener("click", () => {
	if (!pagination_next_page_button.classList.contains("disabled")) {
		let pageNumber = parseInt(current_page.innerText) + 1;
		current_page.innerText = pageNumber;

		pagination_first_page_button.classList.remove("disabled");
		pagination_previous_page_button.classList.remove("disabled");

		updateDatabaseData(
			sBtn_text_pagination.innerText,
			sBtn_text.innerText,
			selected_sort_by,
			order_type
		);

		if (pageNumber == parseInt(total_page.innerText)) {
			pagination_next_page_button.classList.add("disabled");
			pagination_last_page_button.classList.add("disabled");
		}
	}
});

pagination_last_page_button.addEventListener("click", () => {
	if (!pagination_last_page_button.classList.contains("disabled")) {
		current_page.innerText = total_page.innerText;
		pagination_next_page_button.classList.add("disabled");
		pagination_last_page_button.classList.add("disabled");

		updateDatabaseData(
			sBtn_text_pagination.innerText,
			sBtn_text.innerText,
			selected_sort_by,
			order_type
		);

		pagination_first_page_button.classList.remove("disabled");
		pagination_previous_page_button.classList.remove("disabled");
	}
});

// ----------------------------------- database data -------------------------------------
updateDatabaseDataSelect(database_table);

// -------------------------------- 3d category dropdown ---------------------------------
selectBtn.addEventListener("click", () => {
	optionMenu.classList.toggle("active");
});

options.forEach(function (option) {
	option.addEventListener("click", () => {
		let selectedOption = option.querySelector(".option-text").innerText;
		sBtn_text.innerText = selectedOption;
		optionMenu.classList.toggle("active");
		current_page.innerText = "1";
		updateDatabaseData(
			sBtn_text_pagination.innerText,
			sBtn_text.innerText,
			selected_sort_by,
			order_type
		);
	});
});

window.addEventListener("click", function (e) {
	if (!document.getElementById("item-category").contains(e.target)) {
		if (optionMenu.classList.contains("active")) {
			optionMenu.classList.toggle("active");
		}
	}
});

// --------------------------------- pagination drop down --------------------------------
selectBtn_pagination.addEventListener("click", () => {
	optionMenu_pagination.classList.toggle("active");
});

options_pagination.forEach(function (option) {
	option.addEventListener("click", () => {
		let selectedOptionPagination = option.querySelector(
			".pagination-option-text"
		).innerText;
		if (sBtn_text_pagination.innerText != selectedOptionPagination) {
			sBtn_text_pagination.innerText = selectedOptionPagination;
			current_page.innerText = "1";
			updateDatabaseData(
				sBtn_text_pagination.innerText,
				sBtn_text.innerText,
				selected_sort_by,
				order_type
			);
			updateTotalPage();
		}

		optionMenu_pagination.classList.toggle("active");
	});
});

window.addEventListener("click", function (e) {
	if (!document.getElementById("pagination-dropdown").contains(e.target)) {
		if (optionMenu_pagination.classList.contains("active")) {
			optionMenu_pagination.classList.toggle("active");
		}
	}
});

// ---------------------------- resize canvas width responsive ---------------------------
resizeCanvas();

window.addEventListener("resize", () => {
	resizeCanvas();
});

// ---------------------------------------------------------------------------------------
// ---------------------------------- FUNCTION HELPER ------------------------------------
// ---------------------------------------------------------------------------------------

// ---------------------------- resize canvas width responsive ---------------------------
function resizeCanvas() {
	right_content = document.querySelector(".right-content");

	width = right_content.offsetWidth * 0.9;

	if (window.innerWidth <= 1140) {
		width = window.innerWidth * 0.4;
	}
	myCanvas.style.width = width + "px";
	myCanvas.style.height = width + "px";
	camera.aspect = width / width;
	camera.updateProjectionMatrix();
}

// ------------------------------- pagination previous/next ------------------------------
function updateTotalPage() {
	total_page.innerText = Math.ceil(
		total_data.innerText / sBtn_text_pagination.innerText
	);

	if (total_page.innerText == 1) {
		pagination_first_page_button.classList.add("disabled");
		pagination_previous_page_button.classList.add("disabled");
		pagination_next_page_button.classList.add("disabled");
		pagination_last_page_button.classList.add("disabled");
	} else if (
		current_page.innerText == total_page.innerText &&
		total_page.innerText != 1
	) {
		pagination_first_page_button.classList.remove("disabled");
		pagination_previous_page_button.classList.remove("disabled");
		pagination_next_page_button.classList.add("disabled");
		pagination_last_page_button.classList.add("disabled");
	} else if (current_page.innerText == 1 && total_page.innerText != 1) {
		pagination_first_page_button.classList.add("disabled");
		pagination_previous_page_button.classList.add("disabled");
		pagination_next_page_button.classList.remove("disabled");
		pagination_last_page_button.classList.remove("disabled");
	}
}

// ----------------------------------- database data -------------------------------------
function updateDatabaseData(amount, category, order_by, order_type) {
	const offset = (parseInt(current_page.innerText) - 1) * parseInt(amount);
	const search_key = getSearchParameters();
	let http = new XMLHttpRequest();

	http.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
			let response = JSON.parse(this.responseText);

			let out = "";
			out += `
				<tr class="noHover">
					<th class="left-table">NO.</th>
					<th>MODEL NAME</th>
					<th>MODEL NUMBER</th>
					<th>CATEGORY</th>
					<th>DATE MODIFIED</th>
					<th>TYPE</th>
					<th class="right-table">SIZE</th>
				</tr>
			`;
			let number =
				(parseInt(current_page.innerText) - 1) * parseInt(amount) + 1;
			let firstDataNumber = number;
			let lastDataNumber;

			response[0].forEach((item, index) => {
				let date_modified_date = item.date_modified.split(" ");
				let date_modified_time = date_modified_date[1].split(":");
				let date_modified_time_display;

				if (date_modified_time[0] > 12) {
					if (date_modified_time[0] - 12 < 10) {
						date_modified_time_display =
							"0" +
							(date_modified_time[0] - 12) +
							":" +
							date_modified_time[1] +
							" PM";
					} else {
						date_modified_time_display =
							date_modified_time[0] - 12 + ":" + date_modified_time[1] + " PM";
					}
				} else {
					date_modified_time_display =
						date_modified_time[0] + ":" + date_modified_time[1] + " AM";
				}

				out += `
					<tr data-value="${item.id}">
						<td>${number}</td>
						<td>${item.model_name}</td>
						<td>${item.model_number}</td>
						<td>${item.category}</td>
						<td>${date_modified_date[0]} ${date_modified_time_display}</td>
						<td>${item.file_type}</td>
						<td>${item.size}</td>
					</tr>
				`;

				number++;
				lastDataNumber = number;
			});

			database_table.innerHTML = out;
			updateDatabaseDataSelect(database_table);
			total_data.innerText = response[1];
			total_data_first.innerText = firstDataNumber;
			total_data_last.innerText = lastDataNumber - 1;
			updateTotalPage();
		}
	};
	http.open("POST", "./utils/database.php", true);
	http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	http.send(
		"dataamount=" +
			amount +
			"&tablecategory=" +
			category +
			"&orderby=" +
			order_by +
			"&ordertype=" +
			order_type +
			"&offset=" +
			offset +
			"&searchkey=" +
			search_key
	);
}

function resetDatabaseDataSelect(database_data) {
	database_data.forEach(function (data) {
		data.classList.remove("active");
	});
}

function updateDatabaseDataSelect(database_table) {
	const database_data = database_table.querySelectorAll("tr");

	database_data.forEach(function (data) {
		data.addEventListener("click", () => {
			if (!data.classList.contains("noHover")) {
				if (
					selected_database_data_selected != data.getAttribute("data-value")
				) {
					loadFile3D(data.getAttribute("data-value"));
					resetDatabaseDataSelect(database_data);
					data.classList.toggle("active");
					selected_database_data_selected = data.getAttribute("data-value");
				}
			}
		});

		if (selected_database_data_selected) {
			if (selected_database_data_selected == data.getAttribute("data-value")) {
				data.classList.toggle("active");
			}
		}
	});
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

// ---------------------------------------- search ---------------------------------------
// ------------------------------- pagination previous/next ------------------------------
function getSearchParameters() {
	let prmstr = window.location.search;
	var param = new URLSearchParams(prmstr);
	let value;
	if (param.has("search")) {
		value = param.get("search");
	} else {
		value = "";
	}
	return value;
}
