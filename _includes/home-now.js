// this file

const lastFMKey = atob("YTBmNDAyMGJmNzE0NTQwNTg4OTJiZDRhMzA5YWFiNGQ="); // please get your own keys, thanks :)

document.addEventListener("DOMContentLoaded", nowLFM); // last.fm - latest/most played tracks

async function nowLFM() {
  document.querySelector('#now-music').style.display = 'flex';

  let latestTracks, topTracks, latestTracksJSON, topTracksJSON;

  try {
    // Get latest track
    latestTracks = await fetch(
      `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=itsmeimtom&api_key=${lastFMKey}&format=json&limit=1`
    );
    latestTracksJSON = await latestTracks.json();

    // get most popular
    // top track of given time period
    topTracks = await fetch(
      `https://ws.audioscrobbler.com/2.0/?method=user.gettoptracks&period=1month&user=itsmeimtom&api_key=${lastFMKey}&format=json&limit=1`
    );
    topTracksJSON = await topTracks.json();
  }
  catch (error) {
    console.error("Error fetching last.fm data", error);
    return document.querySelector('#now-music').style.display = 'none';
  }

  if (!topTracks.ok && !latestTracks.ok) return document.querySelector('#now-music').style.display = 'none';

  const topTrack = topTracksJSON.toptracks.track[0];
  const topTrackURL = topTrack.url;
  const topTrackName = topTrack.name;
  const topTrackArtist = topTrack.artist.name;
  const topTrackPlayCount = topTrack.playcount;
  const topTrackImage = topTrack.image[2]["#text"];

  // latest/current track
  const track = latestTracksJSON.recenttracks.track[0];
  const currentTrackURL = track.url;
  const currentTrackName = track.name;
  const currentTrackArtist = track.artist["#text"];
  const currentTrackAlbum = track.album["#text"];
  const currentTrackImage = track.image[2]["#text"];

  let currentOrPastIntro = "";
  if (track["@attr"] && track["@attr"].nowplaying) {
    currentOrPastIntro = `I'm currently listening to`;
  } else if (track.date && track.date.uts) {
    const trackDate = new Date(track.date.uts * 1000);
    currentOrPastIntro = capFirst(
      `${getAgo(trackDate)} ago, I listened to`
    );
  }

  document.querySelector('#now-music-top-name').textContent = topTrackName;
  document.querySelector('#now-music-top-name').setAttribute('href', topTrackURL);
  document.querySelector('#now-music-top-artist').textContent = topTrackArtist;
  document.querySelector('#now-music-top-listens').textContent = numberToEnglish(topTrackPlayCount);

  document.querySelector('#now-music-current-intro').textContent = currentOrPastIntro;
  document.querySelector('#now-music-current-name').textContent = currentTrackName;
  document.querySelector('#now-music-current-name').setAttribute('href', currentTrackURL);
  document.querySelector('#now-music-current-artist').textContent = currentTrackArtist;
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
  let n, l, t, o, r, s, u, h, d, c, f, p = e.toString(), a = i || "";
  if (0 === parseInt(p)) return "zero";
  n = ["", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"];
  l = ["", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"];
  t = ["", "thousand", "million", "billion", "trillion", "quadrillion", "quintillion", "sextillion", "septillion", "octillion", "nonillion", "decillion", "undecillion", "duodecillion", "tredecillion", "quatttuor-decillion", "quindecillion", "sexdecillion", "septen-decillion", "octodecillion", "novemdecillion", "vigintillion", "centillion"];
  o = p.length, s = [];
  while (0 < o) (r = o), s.push(p.slice((o = Math.max(0, o - 3)), r));
  if (t.length < (u = s.length)) return "";
  for (f = [], d = 0; d < u; d++)
    parseInt(s[d]) && (1 === (h = s[d].split("").reverse().map(parseFloat))[1] && (h[0] += 10),
      (c = t[d]) && f.push(c), (c = n[h[0]]) && f.push(c), (c = l[h[1]]) && f.push(c),
      (h[0] || h[1]) && (h[2] || (!d && u)) && f.push(a), (c = n[h[2]]) && f.push(c + " hundred"));
  return f.reverse().join(" ");
}

function capFirst(string) {
  let s = string.trim();
  return s.charAt(0).toUpperCase() + s.slice(1);
}
