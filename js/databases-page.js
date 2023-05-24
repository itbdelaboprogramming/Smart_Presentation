function onFileChange() {
	document.getElementById("submit-file-container").style.display = "block";
	var name = document.getElementById("fileUpload");
	var nameContainer = document.getElementById("pop-up-text-fileName");
	nameContainer.innerHTML = name.files.item(0).name;
}

function cancelSubmit() {
	document.getElementById("submit-file-container").style.display = "none";
}