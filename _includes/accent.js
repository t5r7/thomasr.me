function getHue() {
	return Math.floor(Math.random() * 360);
}

function setCssAccent(a, c) {
	document.querySelector(":root").style.setProperty(`--c${a}`, `${c}`);
}

function setColour(hue) {
	// if reduce motion is enabled, do nothing
	if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
		document.querySelector("html").style["visibility"] = "visible";
		return;
	}

	localStorage.setItem("last-colour", hue);

	document.querySelector('meta[name="theme-color"]').content =
		`hsl(${hue}, 40%, 50%)`;

	setCssAccent("Darkest", `hsl(${hue}, 40%, 5%)`);
	setCssAccent("Dark", `hsl(${hue}, 50%, 25%)`);
	setCssAccent("", `hsl(${hue}, 50%, 40%)`);
	setCssAccent("Light", `hsl(${hue}, 50%, 75%)`);
	setCssAccent("Lightest", `hsl(${hue}, 40%, 95%)`);

	document.querySelector("html").style["visibility"] = "visible";
}

function randomAccent() {
	const lastColour = localStorage.getItem("last-colour");

	// if last colour doesn't exist
	if (!lastColour) {
		setColour(getHue());
	} else {
		// while new colour is too similar to last colour
		let newColour = getHue();

		while (Math.abs(newColour - lastColour) < 40) {
			newColour = getHue();
		}

		setColour(newColour);
	}
}

window.addEventListener("DOMContentLoaded", randomAccent);

// Rainbow Colour Bar (Summer Pride!!)
const now = new Date();
if ([5, 6, 7].includes(now.getMonth())) {
	// if June, July or Aug
	document.getElementById("colour-bar").classList.add("pride");
	document
		.getElementById("colour-bar")
		.setAttribute("title", "Happy Pride! <3");
}
