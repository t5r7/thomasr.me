// this whole file is a bit of an experiment, but it seems to work alright!
// hopefully nothing is catastrophically broken

let preloaded = {};

function updateLinks() {
	document.querySelectorAll("a").forEach(a => {
		if (!isLocal(a.href)) return;

		a.onmouseenter = e => {
			e.preventDefault()
			preloadPage(a.href);
		}

		a.onfocus = e => {
			e.preventDefault()
			preloadPage(a.href);
		}

		a.onclick = e => {
			e.preventDefault()
			goToPage(a.href);
		}
	});
}

async function preloadPage(href, element) {
	if (preloaded[href]) return;

	const res = await fetch(href);
	if(!res.ok) return;

	const pageContent = await res.text();
	const pageDOM = new DOMParser().parseFromString(pageContent, "text/html");

	preloaded[href] = pageDOM;
}

async function goToPage(href) {
	console.log("navigating to", href);
	let newDOM;

	if(preloaded[href]) {
		console.log("preloaded - swapping body", href);

		newDOM = preloaded[href];

		history.pushState({}, "", href);

		document.title = newDOM.title;
		document.body.innerHTML = newDOM.body.innerHTML;
		updateMetaTags(newDOM);
		window, scrollTo(0, 0);
		randomAccent();
		updateLinks();

		// this is jank... but it works
		if (href === `${location.origin}/` || href === `${location.origin}`) {
			window.greet();
			window.emailDeobfuscate();
		}
	} else {
		console.log("not preloaded - directing normally", href);
		return location.href = href;
		// const pageContent = await fetch(href).then(res => res.text());
		// newDOM = new DOMParser().parseFromString(pageContent, 'text/html');
	}
}

document.addEventListener('DOMContentLoaded', () => {
	updateLinks();
});

// let's not bother ourselves with the back and forward buttons
// maybe in the future...
window.addEventListener('popstate', () => {
	window.location = location.href;
});

function updateMetaTags(newDOM) {
	document.title = newDOM.title;

	// copilot wrote this bit, and it seems to work!
	const newMetaTags = newDOM.querySelectorAll("meta");
	const currentMetaTags = document.querySelectorAll("meta");

	newMetaTags.forEach(newMetaTag => {
		let found = false;

		currentMetaTags.forEach(currentMetaTag => {
			if (currentMetaTag.isEqualNode(newMetaTag)) {
				found = true;
			}
		});

		if (!found) {
			document.head.appendChild(newMetaTag);
		}
	});
}

function isLocal(href) {
	if (href.startsWith(`${location.origin}`)) {
		return true;
	}

	if (href.startsWith('http://') || href.startsWith('https://')) {
		return false;
	}

	return true;
}