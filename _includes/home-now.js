// this file sets the flickr photo background and updates photo info

const lastFMKey = atob("YTBmNDAyMGJmNzE0NTQwNTg4OTJiZDRhMzA5YWFiNGQ="); // please get your own keys, thanks :)
const flickrKey = atob("MzJiOTFiYWFlYjlkZTJiYjRhZTkwY2ZhMjgxZjNjOGM=");

document.addEventListener("DOMContentLoaded", nowFlickr); // flickr - background and photo info
document.addEventListener("DOMContentLoaded", nowLFM); // last.fm - latest/most played tracks

async function nowLFM() {
	// Get latest track
	const latestTracks = await fetch(
		`https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=itsmeimtom&api_key=${lastFMKey}&format=json&limit=1`
	);
	const latestTracksJSON = await latestTracks.json();

	// get most popular
	// top track of given time period
	const topTracks = await fetch(
		`https://ws.audioscrobbler.com/2.0/?method=user.gettoptracks&period=1month&user=itsmeimtom&api_key=${lastFMKey}&format=json&limit=1`
	);
	const topTracksJSON = await topTracks.json();
	const topTrack = topTracksJSON.toptracks.track[0];
	const topTrackURL = topTrack.url;
	const topTrackName = topTrack.name;
	const topTrackArtist = topTrack.artist.name;
	const topTrackPlayCount = topTrack.playcount;
	const topTrackImage = topTrack.image[2]["#text"];

	// latest/current track
	const track = latestTracksJSON.recenttracks.track[0];
	const trackURL = track.url;
	const trackName = track.name;
	const trackArtist = track.artist["#text"];
	const trackAlbum = track.album["#text"];
	const trackImage = track.image[2]["#text"];

	let currentOrPastIntro = "";
	if (track["@attr"] && track["@attr"].nowplaying) {
		currentOrPastIntro = `I'm currently listening to`;
	} else if (track.date && track.date.uts) {
		const trackDate = new Date(track.date.uts * 1000);
		currentOrPastIntro = capFirst(
			`${getAgo(trackDate)} ago, I listened to`
		);
	}

	const listItem = document.createElement("li");
	listItem.setAttribute("class", "now-item-js");

	const emojiIcon = document.createElement("span");
	emojiIcon.className = "emoji-icon";
	emojiIcon.setAttribute("aria-hidden", "true");
	emojiIcon.textContent = "🎧";

	const textSpan = document.createElement("span");
	textSpan.innerHTML = `In the last month I've listened to <a href="${topTrackURL}">${topTrackName}</a> by ${topTrackArtist} ${numberToEnglish(topTrackPlayCount)} times, making it my most-played track. ${currentOrPastIntro} <a href="${trackURL}">${trackName}</a> by ${trackArtist}. You can find me on <a href="https://www.last.fm/user/itsmeimtom">Last.fm</a> for more stats.`;

	listItem.appendChild(emojiIcon);
	listItem.appendChild(textSpan);

	document.getElementById("now-list").appendChild(listItem);
}

async function nowFlickr() {
	const p = await getFlickrPhoto();

	const sizes = await fetch(
		`https://api.flickr.com/services/rest/?method=flickr.photos.getSizes&nojsoncallback=1&api_key=${flickrKey}&photo_id=${p.photo.id}&format=json`
	);
	const sizesJSON = await sizes.json();

	let sizesList = sizesJSON.sizes.size;
	// remove original as option (thank you copilot)
	sizesList = sizesList.filter((s) => s.label !== "Original");

	// get screen width
	const screenWidth = window.innerWidth;
	// get the size closest to the screen width (thank you copilot)
	const photoBGURL = sizesList.reduce((prev, curr) => {
		if (curr.width > screenWidth) return prev;
		return curr;
	}).source;

	document.getElementById("bg-cover").style.backgroundImage =
		`url(${photoBGURL})`;

	const photoTitle = p.photo.title._content;
	const photoURL = p.photo.urls.url[0]._content;
	// const photoLocation = `${p.photo.location.county._content}, ${p.photo.location.region._content}, ${p.photo.location.country._content}`;
	const photoLocation = `${p.photo.location.county._content}, ${p.photo.location.country._content}`;
	const photoTakenDate = new Date(p.photo.dates.taken);
	const photoTakenAgo = getAgo(photoTakenDate);
	const photoUploadedDate = new Date(p.photo.dates.posted * 1000);
	const photoUploadedAgo = getAgo(photoUploadedDate);

	const listItem = document.createElement("li");
	listItem.setAttribute("class", "now-item-js");

	const emojiIcon = document.createElement("span");
	emojiIcon.className = "emoji-icon";
	emojiIcon.setAttribute("aria-hidden", "true");
	emojiIcon.textContent = "🖼️";

	const textSpan = document.createElement("span");
	textSpan.innerHTML = `I took <a href="${photoURL}">${photoTitle}</a> <span title="${photoTakenDate.toLocaleString()}">${photoTakenAgo} ago</span> in ${photoLocation} 
	
	It is currently the background of this page! I shared it ${photoUploadedAgo} ago.`;

	listItem.appendChild(emojiIcon);
	listItem.appendChild(textSpan);

	// ok we now need to wait for the image to load before we can show it
	const dummyImg = new Image();
	dummyImg.src = photoBGURL;
	dummyImg.onload = function () {
		document.getElementById("bg-cover").classList.add("loaded");
		document
			.querySelector("header#home-header img")
			.classList.add("loaded");
		document.getElementById("now-list").appendChild(listItem);
	};
}

async function getFlickrPhoto() {
	const latestPhotos = await fetch(
		`https://api.flickr.com/services/rest/?method=flickr.people.getPublicPhotos&nojsoncallback=1&api_key=${flickrKey}&user_id=193606210@N05&per_page=1&format=json&page=1`
	);
	const latestPhotosJSON = await latestPhotos.json();

	const photo = await fetch(
		`https://api.flickr.com/services/rest/?method=flickr.photos.getInfo&nojsoncallback=1&api_key=${flickrKey}&photo_id=${latestPhotosJSON.photos.photo[0].id}&format=json`
	);

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
	if (weeksAgo > 4)
		return `${numberToEnglish(monthsAgo)} month${monthsAgo > 1 ? "s" : ""}`.trim();
	if (daysAgo > 7)
		return `${numberToEnglish(weeksAgo)} week${weeksAgo > 1 ? "s" : ""}`.trim();
	if (hoursAgo > 24)
		return `${numberToEnglish(daysAgo)} day${daysAgo > 1 ? "s" : ""}`.trim();
	if (minutesAgo > 60)
		return `${numberToEnglish(hoursAgo)} hour${hoursAgo > 1 ? "s" : ""}`.trim();
	return `${numberToEnglish(minutesAgo)} minute${minutesAgo > 1 ? "s" : ""}`.trim();
}

// http://stackoverflow.com/questions/14766951/convert-digits-into-words-with-javascript
function numberToEnglish(e, i) {
	var n,
		l,
		t,
		o,
		r,
		s,
		u,
		h,
		d,
		c,
		f,
		p = e.toString(),
		a = i || "";
	if (0 === parseInt(p)) return "zero";
	for (
		n = [
			"",
			"one",
			"two",
			"three",
			"four",
			"five",
			"six",
			"seven",
			"eight",
			"nine",
			"ten",
			"eleven",
			"twelve",
			"thirteen",
			"fourteen",
			"fifteen",
			"sixteen",
			"seventeen",
			"eighteen",
			"nineteen"
		],
			l = [
				"",
				"",
				"twenty",
				"thirty",
				"forty",
				"fifty",
				"sixty",
				"seventy",
				"eighty",
				"ninety"
			],
			t = [
				"",
				"thousand",
				"million",
				"billion",
				"trillion",
				"quadrillion",
				"quintillion",
				"sextillion",
				"septillion",
				"octillion",
				"nonillion",
				"decillion",
				"undecillion",
				"duodecillion",
				"tredecillion",
				"quatttuor-decillion",
				"quindecillion",
				"sexdecillion",
				"septen-decillion",
				"octodecillion",
				"novemdecillion",
				"vigintillion",
				"centillion"
			],
			o = p.length,
			s = [];
		0 < o;

	)
		(r = o), s.push(p.slice((o = Math.max(0, o - 3)), r));
	if (((u = s.length), t.length < u)) return "";
	for (f = [], d = 0; d < u; d++)
		parseInt(s[d]) &&
			(1 === (h = s[d].split("").reverse().map(parseFloat))[1] &&
				(h[0] += 10),
			(c = t[d]) && f.push(c),
			(c = n[h[0]]) && f.push(c),
			(c = l[h[1]]) && f.push(c),
			(h[0] || h[1]) && (h[2] || (!d && u)) && f.push(a),
			(c = n[h[2]]) && f.push(c + " hundred"));
	return f.reverse().join(" ");
}

function capFirst(string) {
	let s = string.trim();
	return s.charAt(0).toUpperCase() + s.slice(1);
}
