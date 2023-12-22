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

	setCssAccent("Darkest", hslToHex(hue, 40, 5));
	setCssAccent("Dark", hslToHex(hue, 50, 15));
	setCssAccent("Light", hslToHex(hue, 50, 75));
	setCssAccent("Lightest", hslToHex(hue, 35, 95));
	setCssAccent("", hslToHex(hue, 50, 45));
}

// Thank you, icl7126
// https://stackoverflow.com/a/44134328/6325767
function hslToHex(h, s, l) {
	l /= 100;
	const a = s * Math.min(l, 1 - l) / 100;
	const f = n => {
		const k = (n + h / 30) % 12;
		const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
		return Math.round(255 * color).toString(16).padStart(2, "0");   // convert to Hex and prefix "0" if needed
	};
	return `#${f(0)}${f(8)}${f(4)}`;
}

async function randomAccent() {
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

window.addEventListener('load', randomAccent);

// Rainbow Colour Bar (Summer Pride!!)
const now = new Date();
if ([5, 6, 7].includes(now.getMonth())) { // if June, July or Aug
	document.getElementById('colour-bar').classList.add('pride');
	document.getElementById('colour-bar').setAttribute('title', 'Happy Pride! <3');
}