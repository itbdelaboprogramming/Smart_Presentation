const menuInformation = document.querySelector(
	".menu-container-blue-information"
);
menuInformation.addEventListener("click", () =>
	menuInformation.classList.toggle("active")
);

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

const menuAnimation = document.querySelector(".menu-container-blue-animation");
const iconAnimationOff = document.getElementById("animation-off");
const iconAnimationOn = document.getElementById("animation-on");
menuAnimation.addEventListener("click", () => {
	menuAnimation.classList.toggle("active");

	if (menuAnimation.classList.contains("active")) {
		iconAnimationOff.style.display = "none";
		iconAnimationOn.style.display = "block";
	} else {
		iconAnimationOff.style.display = "block";
		iconAnimationOn.style.display = "none";
	}
});

const menuAlbum = document.querySelector(".menu-container-blue-album");
menuAlbum.addEventListener("click", () => menuAlbum.classList.toggle("active"));

const menuLightning = document.querySelector(".menu-container-blue-lightning");
menuLightning.addEventListener("click", () =>
	menuLightning.classList.toggle("active")
);
