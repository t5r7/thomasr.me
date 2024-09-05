// this file sets the flickr photo background and updates photo info

const lastFMKey = atob("YTBmNDAyMGJmNzE0NTQwNTg4OTJiZDRhMzA5YWFiNGQ="); // please get your own keys, thanks :)
const flickrKey = atob("MzJiOTFiYWFlYjlkZTJiYjRhZTkwY2ZhMjgxZjNjOGM=");
let ran = false;
let photoJSON = null; // set when bg loaded

document.addEventListener("DOMContentLoaded", flickrBG);
document.addEventListener("DOMContentLoaded", addToggleEventListener);

function addToggleEventListener() {
	if(window.location.hash.toLowerCase().includes('now')) {
		// we need to open the toggle, and run the content if now in the hash
		document.getElementById("now-toggle").open = true;
		ran = true;
		nowLFM();
		nowFlickr();
		return; // no need to add the event listener
	}
	
	// if we're here, then no hash, so add the event listener
	document.getElementById("now-toggle").addEventListener("toggle", function() {
		window.location.hash = this.open ? "now" : "";

		if(ran) return; // only get content once
		ran = true;
		nowLFM();
		nowFlickr();
	});
}

async function nowLFM() {
	// Get latest track
	const latestTracks = await fetch(`https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=itsmeimtom&api_key=${lastFMKey}&format=json&limit=1`);
	const latestTracksJSON = await latestTracks.json();

	const track = latestTracksJSON.recenttracks.track[0];
	const trackURL = track.url;
	const trackName = track.name;
	const trackArtist = track.artist["#text"];
	const trackAlbum = track.album["#text"];
	const trackImage = track.image[2]["#text"];

	if (track["@attr"] && track["@attr"].nowplaying) {
		document.getElementById("js-lp-ago").innerHTML = `I'm currently listening to`;
	} else if (track.date && track.date.uts) {
		const trackDate = new Date(track.date.uts * 1000);
		document.getElementById("js-lp-ago").innerHTML = capFirst(`${getAgo(trackDate)} ago, I listened to`);
	}

	document.getElementById("js-lp-name").innerHTML = trackName;
	document.getElementById("js-lp-name").href = trackURL;
	document.getElementById("js-lp-artist").innerHTML = trackArtist;


	// get most popular
	// top track of given time period
	const topTracks = await fetch(`https://ws.audioscrobbler.com/2.0/?method=user.gettoptracks&period=1month&user=itsmeimtom&api_key=${lastFMKey}&format=json&limit=1`);
	const topTracksJSON = await topTracks.json();
	const topTrack = topTracksJSON.toptracks.track[0];
	const topTrackURL = topTrack.url;
	const topTrackName = topTrack.name;
	const topTrackArtist = topTrack.artist.name;
	const topTrackPlayCount = topTrack.playcount;
	const topTrackImage = topTrack.image[2]["#text"];

	document.getElementById("js-mp-name").innerHTML = topTrackName;
	document.getElementById("js-mp-name").href = topTrackURL;
	document.getElementById("js-mp-artist").innerHTML = topTrackArtist;
	document.getElementById("js-mp-plays").innerHTML = topTrackPlayCount;
}


async function nowFlickr() {
	const p = await getFlickrPhoto();

	const photoTitle = p.photo.title._content;
	const photoURL = p.photo.urls.url[0]._content;
	const photoLocation = `${p.photo.location.county._content}, ${p.photo.location.region._content}, ${p.photo.location.country._content}`;
	const photoTakenDate = new Date(p.photo.dates.taken);
	const photoTakenAgo = getAgo(photoTakenDate);
	const photoUploadedDate = new Date(p.photo.dates.posted * 1000);
	const photoUploadedAgo = getAgo(photoUploadedDate);

	document.getElementById("js-flickr-title").innerHTML = photoTitle;
	document.getElementById("js-flickr-title").href = photoURL;
	document.getElementById("js-flickr-location").innerHTML = photoLocation;
	document.getElementById("js-flickr-date").innerHTML = `${photoTakenAgo}`;
	document.getElementById("js-flickr-date").title = `${photoTakenDate.toLocaleString()}`;
}

async function flickrBG() {
	const p = await getFlickrPhoto();

	const sizes = await fetch(`https://api.flickr.com/services/rest/?method=flickr.photos.getSizes&nojsoncallback=1&api_key=${flickrKey}&photo_id=${p.photo.id}&format=json`);
	const sizesJSON = await sizes.json();

	let sizesList = sizesJSON.sizes.size;
	// remove original as option (thank you copilot)
	sizesList = sizesList.filter(s => s.label !== "Original");

	// get screen width
	const screenWidth = window.innerWidth;
	// get the size closest to the screen width (thank you copilot)
	const photoURL = sizesList.reduce((prev, curr) => {
		if (curr.width > screenWidth) return prev;
		return curr;
	}).source;
	
	document.getElementById("bg-cover").style.backgroundImage = `url(${photoURL})`;
	
	// there is no way to know when the image has loaded, so we just hope for the best here
	window.setTimeout(() => {
		document.getElementById("bg-cover").classList.add('loaded');
		document.querySelector("header#home-header img").classList.add('loaded');
	}, 1000);

}

async function getFlickrPhoto() {
	// if we've already got the photo, return it
	if(photoJSON !== null) return photoJSON;

	const latestPhotos = await fetch(`https://api.flickr.com/services/rest/?method=flickr.people.getPublicPhotos&nojsoncallback=1&api_key=${flickrKey}&user_id=193606210@N05&per_page=1&format=json&page=1`);
	const latestPhotosJSON = await latestPhotos.json();

	const photo = await fetch(`https://api.flickr.com/services/rest/?method=flickr.photos.getInfo&nojsoncallback=1&api_key=${flickrKey}&photo_id=${latestPhotosJSON.photos.photo[0].id}&format=json`);

	// first time we get the photo, set global and return it
	photoJSON = await photo.json();
	return photoJSON;
}

// not sure but this section is most definitely not mine, likely stackoverflow or chatgpt
function getAgo(date) {
	const currentDate = new Date();
	const timeDiff = Math.abs(currentDate - date);

	// there's probably a better way to do this but im tired
	const minutesAgo = Math.floor(timeDiff / 60000);
	const hoursAgo = Math.floor(minutesAgo / 60);
	const daysAgo = Math.floor(hoursAgo / 24);
	const weeksAgo = Math.floor(daysAgo / 7);
	const monthsAgo = Math.floor(weeksAgo / 4);

	if (monthsAgo > 12) return `over a year`;
	if (weeksAgo > 4) return `${numberToEnglish(monthsAgo)} month${monthsAgo > 1 ? "s" : ""}`;
	if (daysAgo > 7) return `${numberToEnglish(weeksAgo)} week${weeksAgo > 1 ? "s" : ""}`;
	if (hoursAgo > 24) return `${numberToEnglish(daysAgo)} day${daysAgo > 1 ? "s" : ""}`;
	if (minutesAgo > 60) return `${numberToEnglish(hoursAgo)} hour${hoursAgo > 1 ? "s" : ""}`;
	return `${numberToEnglish(minutesAgo)} minute${minutesAgo > 1 ? "s" : ""}`;
}


// http://stackoverflow.com/questions/14766951/convert-digits-into-words-with-javascript
function numberToEnglish(e, i) { var n, l, t, o, r, s, u, h, d, c, f, p = e.toString(), a = i || ""; if (0 === parseInt(p)) return "zero"; for (n = ["", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"], l = ["", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"], t = ["", "thousand", "million", "billion", "trillion", "quadrillion", "quintillion", "sextillion", "septillion", "octillion", "nonillion", "decillion", "undecillion", "duodecillion", "tredecillion", "quatttuor-decillion", "quindecillion", "sexdecillion", "septen-decillion", "octodecillion", "novemdecillion", "vigintillion", "centillion"], o = p.length, s = []; 0 < o;)r = o, s.push(p.slice(o = Math.max(0, o - 3), r)); if (u = s.length, t.length < u) return ""; for (f = [], d = 0; d < u; d++)parseInt(s[d]) && (1 === (h = s[d].split("").reverse().map(parseFloat))[1] && (h[0] += 10), (c = t[d]) && f.push(c), (c = n[h[0]]) && f.push(c), (c = l[h[1]]) && f.push(c), (h[0] || h[1]) && (h[2] || !d && u) && f.push(a), (c = n[h[2]]) && f.push(c + " hundred")); return f.reverse().join(" ") }

function capFirst(string) {
	 let s = string.trim();
	return s.charAt(0).toUpperCase() + s.slice(1);
}