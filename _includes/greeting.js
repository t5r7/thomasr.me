// homepage greeting and email deobfuscation

async function greet() {
	// now is already defined by the accent colour script
	let h = now.getHours();

	let greeting = "Hello,";
	if (h >= 0 && h < 12) greeting = "Good&nbsp;Morning,"; // 5-12 
	if (h >= 12 && h < 18) greeting = "Good&nbsp;Afternoon,"; // 12-18
	if (h >= 18 && h < 22) greeting = "Good&nbsp;Evening,"; // 18-22
	if (h >= 22) greeting = "Good&nbsp;Evening,"; // 22-23

	document.getElementById('js-greeting').innerHTML = greeting;
}

async function emailDeobfuscate() {
	const email = atob('bWVAVG9tUi5tZQ==');
	document.getElementById('js-email').innerHTML = email;
}

window.addEventListener('load', greet);
window.addEventListener('load', emailDeobfuscate);