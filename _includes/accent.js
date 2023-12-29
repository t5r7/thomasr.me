function getHue() {
	return Math.floor(Math.random() * 360);
}

function setCssAccent(a, c) {
	document.querySelector(":root").style.setProperty(`--c${a}`, `${c}`);
}

function setColour(hue) {
	// if reduce motion is enabled, do nothing
	if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
		return;
	}

	localStorage.setItem("last-colour", hue); 

	document.querySelector('meta[name="theme-color"]').content = `${hslToHex(hue, 40, 50)}`;

	setCssAccent("Darkest", `hsl(${hue}, 40%, 5%)`);
	setCssAccent("Dark", `hsl(${hue}, 50%, 25%)`);
	setCssAccent("", `hsl(${hue}, 50%, 40%)`);
	setCssAccent("Light", `hsl(${hue}, 50%, 75%)`);
	setCssAccent("Lightest", `hsl(${hue}, 40%, 95%)`);

	document.querySelector("html").style["visibility"] = "visible";
}

// thanks chatgpt:
function hslToHex(h, s, l) {
	h /= 360;
	s /= 100;
	l /= 100;

	const toHex = (c) => Math.round(c * 255).toString(16).padStart(2, '0');

	const [r, g, b] = [h + 1 / 3, h, h - 1 / 3].map((q) => {
		if (q < 0) q += 1;
		if (q > 1) q -= 1;
		return q < 1 / 6 ? l + (s - l * s) * 6 * q :
			q < 1 / 2 ? s < 0.5 ? l + s : l + (1 - l) * s * 6 * (1 / 2 - q) :
				q < 2 / 3 ? s < 0.5 ? l + s * (1 - l) * 6 * (q - 1 / 2) : l - (1 - l) * s * 6 * (q - 1 / 2) :
					s < 0.5 ? l - (1 - l) * s * 6 * (2 / 3 - q) : l + s;

	});

	return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
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

window.addEventListener("load", randomAccent);

// Rainbow Colour Bar (Summer Pride!!)
const now = new Date();
if ([5, 6, 7].includes(now.getMonth())) { // if June, July or Aug
	document.getElementById("colour-bar").classList.add("pride");
	document.getElementById("colour-bar").setAttribute("title", "Happy Pride! <3");
}