import { scene, camera } from "../script.js";
import * as THREE from "three";

// Const, Var, Let
// ------------ dark/light mode toggle ------------
const toggle = document.querySelector(".toggle");
let getMode = localStorage.getItem("mode");

// ------------ filter (ascending/descending) ------------
const filter_sort_box = document.querySelector(".filter-sort-box");
const filter_asc = document.getElementById("filter-asc");
const filter_desc = document.getElementById("filter-desc");

// ------------ filter (sort by) ------------
const filter_text = document.querySelector(".filter-text");

const divMNa = document.getElementById("div_sort_model_name");
const radMNa = document.getElementById("sort_model_name");
const divMNu = document.getElementById("div_sort_model_number");
const radMNu = document.getElementById("sort_model_number");
const divDM = document.getElementById("div_sort_date_modified");
const radDM = document.getElementById("sort_date_modified");

// dark/light mode toggle
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

// filter (ascending/descending)
filter_sort_box.addEventListener("click", () => {
	if (filter_asc.style.display != "none") {
		filter_asc.style.display = "none";
		filter_desc.style.display = "block";
	} else {
		filter_asc.style.display = "block";
		filter_desc.style.display = "none";
	}
});

// filter (sort by)
filter_text.addEventListener("click", () => {
	// do something
	let filter_drop_down = document.querySelector(".filter-drop-down");
	if (filter_drop_down.style.display == "none") {
		filter_drop_down.style.display = "flex";
	} else {
		filter_drop_down.style.display = "none";
	}
});

window.addEventListener("click", function (e) {
	if (!document.querySelector(".filter-container").contains(e.target)) {
		let filter_drop_down = document.querySelector(".filter-drop-down");
		if (filter_drop_down.style.display != "none") {
			filter_drop_down.style.display = "none";
		}
	}
});

divMNa.addEventListener("click", () => {
	radMNa.checked = true;
});

divMNu.addEventListener("click", () => {
	radMNu.checked = true;
});

divDM.addEventListener("click", () => {
	radDM.checked = true;
});

// const database_data = document.querySelectorAll("tr");
const database_table = document.getElementById("database-data");

updateDatabaseDataSelect(database_table);

// ------------ 3d category dropdown ------------
const optionMenu = document.querySelector(".select-menu");
const selectBtn = optionMenu.querySelector(".select-menu-button");
const options = optionMenu.querySelectorAll(".option");
const sBtn_text = optionMenu.querySelector(".select-menu-text");

// for 3d category dropdown
selectBtn.addEventListener("click", () => {
	optionMenu.classList.toggle("active");
});

options.forEach(function (option) {
	option.addEventListener("click", () => {
		let selectedOption = option.querySelector(".option-text").innerText;
		sBtn_text.innerText = selectedOption;

		optionMenu.classList.toggle("active");
	});
});

window.addEventListener("click", function (e) {
	if (!document.getElementById("item-category").contains(e.target)) {
		if (optionMenu.classList.contains("active")) {
			optionMenu.classList.toggle("active");
		}
	}
});

// for pagination dropdown
const optionMenu_pagination = document.querySelector(".pagination-select-menu");
const selectBtn_pagination = optionMenu_pagination.querySelector(
	".pagination-select-menu-button"
);
const options_pagination =
	optionMenu_pagination.querySelectorAll(".pagination-option");
const sBtn_text_pagination = optionMenu_pagination.querySelector(
	".pagination-select-menu-text"
);

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
			updateDatabaseData(selectedOptionPagination);
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

// canvas
let right_content = document.querySelector(".right-content");
// let width = window.innerWidth * 0.4;
let width = right_content.offsetWidth * 0.9;
if (width < 275) {
	width = 275;
}
myCanvas.style.width = width + "px";
myCanvas.style.height = width + "px";

window.addEventListener("resize", () => {
	right_content = document.querySelector(".right-content");

	width = right_content.offsetWidth * 0.9;

	if (width < 275) {
		width = 275;
	}
	myCanvas.style.width = width + "px";
	myCanvas.style.height = width + "px";
	camera.aspect = width / width;
	camera.updateProjectionMatrix();
});

// FUNCTION HELPER
function resetDatabaseDataSelect(database_data) {
	database_data.forEach(function (data) {
		data.classList.remove("active");
	});
}

function updateDatabaseData(amount) {
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
			let number = 1;

			response.forEach((item) => {
				let date_modified_date = item.date_modified.split(" ");
				let date_modified_time = date_modified_date[1].split(":");
				let date_modified_time_display;

				if (date_modified_time[0] > 12) {
					date_modified_time_display =
						date_modified_time[0] - 12 + ":" + date_modified_time[1] + " PM";
				} else {
					date_modified_time_display =
						date_modified_time[0] + ":" + date_modified_time[1] + " AM";
				}

				out += `
					<tr>
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
			});

			database_table.innerHTML = out;
			updateDatabaseDataSelect(database_table);
		}
	};
	http.open("POST", "./utils/database.php", true);
	http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	http.send("dataamount=" + amount);
}

function updateDatabaseDataSelect(database_table) {
	const database_data = database_table.querySelectorAll("tr");

	database_data.forEach(function (data) {
		data.addEventListener("click", () => {
			resetDatabaseDataSelect(database_data);
			data.classList.toggle("active");
		});
	});
}
