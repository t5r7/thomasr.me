const lastFMKey = atob("YTBmNDAyMGJmNzE0NTQwNTg4OTJiZDRhMzA5YWFiNGQ="); // please get your own keys, thanks :)
const flickrKey = atob("MzJiOTFiYWFlYjlkZTJiYjRhZTkwY2ZhMjgxZjNjOGM=");

const statusOut = document.getElementById("statuscafe");
const lastFMOut = document.getElementById("lastfm");
const setlistFMOut = document.getElementById("setlistfm");
const flickrOut = document.getElementById("flickr");

async function getStatusCafe() {
	const status = await fetch(`https://status.cafe/users/yom/status.json`);
	const statusJSON = await status.json();

	if (!statusJSON.author || !statusJSON.timeAgo) {
		// something went wrong here (does the user exist?)
		statusOut.remove();
		return;
	}

	const statusText = statusJSON.content;
	const statusFace = statusJSON.face;
	const statusAgo = statusJSON.timeAgo;

	statusOut.innerHTML = `
	<div>
	<span id="statuscafe-face">${statusFace}</span>
		<p>
			${statusText} (<em>${statusAgo}</em>)
		</p>
	</div>
	`;
}

async function getLastFM() {
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
		lastFMOut.innerHTML = `
		<div>
		<img src="${trackImage}" alt="Album Art for ${trackAlbum}">
		<p>
			I'm currently listening to:<br><strong><a href="${trackURL}">${trackName}</a></strong> by <strong>${trackArtist}</strong>
		</p>
		</div>
		`;
	} else if (track.date && track.date.uts) {
		const trackDate = new Date(track.date.uts * 1000);
		
		lastFMOut.innerHTML = `
		<div>
			<img src="${trackImage}" alt="Album Art for ${trackAlbum}">
			<p>
				${getAgo(trackDate)} ago, I listened to:<br><strong><a href="${trackURL}">${trackName}</a></strong> by <strong>${trackArtist}</strong>
			</p>
		</div>
		`;
		// on <strong>${trackAlbum}</strong>.
	}

	// top track of given time period
	const topTracks = await fetch(`https://ws.audioscrobbler.com/2.0/?method=user.gettoptracks&period=1month&user=itsmeimtom&api_key=${lastFMKey}&format=json&limit=1`);
	const topTracksJSON = await topTracks.json();
	const topTrack = topTracksJSON.toptracks.track[0];
	const topTrackURL = topTrack.url;
	const topTrackName = topTrack.name;
	const topTrackArtist = topTrack.artist.name;
	const topTrackPlayCount = topTrack.playcount;
	const topTrackImage = topTrack.image[2]["#text"];

	lastFMOut.innerHTML += `
	<div>
		<img src="${topTrackImage}" alt="Album Art for ${topTrackName}">
		<p>
			With ${topTrackPlayCount} scrobbles in the last month, my most played song is:<br>
			<strong><a href="${topTrackURL}">${topTrackName}</a></strong> by <strong>${topTrackArtist}</strong>
		</p>
	</div>
	`;
}

// todo: this needs middleman to get around CORS
// async function getSetlistFM() {
// 	const setlist = await fetch(`https://api.setlist.fm/rest/1.0/user/imtom/attended?p=1`, {
// 		headers: {
// 			"Accept": "application/json",
// 			"x-api-key": setlistFMKey
// 		}
// 	});
// 	const setlistJSON = await setlist.json();

// 	console.log(setlistJSON);
// }

async function getFlickr() {
	const latestPhotos = await fetch(`https://api.flickr.com/services/rest/?method=flickr.people.getPublicPhotos&nojsoncallback=1&api_key=${flickrKey}&user_id=193606210@N05&per_page=1&format=json&page=1`);
	const latestPhotosJSON = await latestPhotos.json();

	const photo = await fetch(`https://api.flickr.com/services/rest/?method=flickr.photos.getInfo&nojsoncallback=1&api_key=${flickrKey}&photo_id=${latestPhotosJSON.photos.photo[0].id}&format=json`);
	const photoJSON = await photo.json();
	
	const photoTitle = photoJSON.photo.title._content;
	const photoURL = photoJSON.photo.urls.url[0]._content;
	const photoLocation = `${photoJSON.photo.location.county._content}, ${photoJSON.photo.location.region._content}, ${photoJSON.photo.location.country._content}`;
	const photoTakenDate = new Date(photoJSON.photo.dates.taken);
	const photoTakenAgo = getAgo(photoTakenDate);
	const photoUploadedDate = new Date(photoJSON.photo.dates.posted * 1000);
	const photoUploadedAgo = getAgo(photoUploadedDate);

	flickrOut.innerHTML = `
	<figure>
		<figcaption>
			<p>
				Latest photo from Flickr, <strong>taken ${photoTakenAgo} ago</strong> (<em>uploaded ${photoUploadedAgo} ago</em>):<br>
				<strong><a href="${photoURL}">${photoTitle}</a></strong>, from <strong>${photoLocation}</strong> 
			</p>
		</figcaption>
		<a href="${photoURL}"><img src="https://live.staticflickr.com/${latestPhotosJSON.photos.photo[0].server}/${latestPhotosJSON.photos.photo[0].id}_${latestPhotosJSON.photos.photo[0].secret}_b.jpg" alt="${photoTitle}"></a>
	</figure>`;
}


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
	if (weeksAgo > 4) return `${monthsAgo} month${monthsAgo>1?"s":""}`;
	if (daysAgo > 7) return `${weeksAgo} week${weeksAgo>1?"s":""}`;
	if (hoursAgo > 24) return `${daysAgo} day${daysAgo>1?"s":""}`;
	if (minutesAgo > 60) return`${hoursAgo} hour${hoursAgo>1?"s":""}`;
	return `${minutesAgo} minute${minutesAgo>1?"s":""}`;
}

document.addEventListener("DOMContentLoaded", getStatusCafe);
document.addEventListener("DOMContentLoaded", getLastFM);
// document.addEventListener("DOMContentLoaded", getSetlistFM);
document.addEventListener("DOMContentLoaded", getFlickr);
