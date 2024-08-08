---
layout: default
title: "Now"
description: "What am I up to?"
permalink: /now/
---

<!-- lazy inline style rocks, change my mind -->
<style>
#lastfm, #statuscafe, #flickr, #strava, #planestrains {
	margin-bottom: 2em;
	padding: 1em;
	border: 1px solid var(--c);
}

#lastfm div, #statuscafe div {
	display: flex;
	align-items: center;
	margin-bottom: 1em;
}

#lastfm div img {
	flex: 1;
	width: 20%;
	margin: 0.5em 1em 0 0;
	aspect-ratio: 1/1;
	border-radius: 8px;
}

#statuscafe div span#statuscafe-face {
	flex: 1;
	margin-right: 0.5em;
	text-align: center;
	font-size: 2em;
}

#lastfm div p {
	flex: 5;
}

#statuscafe div p {
	flex: 10;
}


#flickr figure {
	margin: 0;
}

#flickr p {
	margin-top: 0;
}

#flickr img {
	width: 100%;
	border-radius: 8px;
}

a.img-link {
	border-bottom: none !important; /* we love !important */
}

a.img-link:hover img, a.img-link:focus img {
	opacity: 0.8;
}

#strava {
	padding: 0;
}

#strava iframe {
	width: 100%;
	/* height: 454px; /* awkward height from their embed code */
	margin: 0;
	padding: 0;
	border: none;
}

#planestrains {
	text-align: center;
}

#planestrains img {
	width: 80%;
	padding: 0.5em;
	border-radius: 8px;
	background-color: var(--cLightest, #fff);
}
</style>


<noscript>
<p>Unfortunately, you need JavaScript enabled to see the programmatically fetched data that would be here.</p>
<p>You can still use the links below to access my profiles manually.</p>
</noscript>

<!-- <div id="statuscafe"><p>Fetching information from status.cafe, hold tight!</p></div> -->

<div id="lastfm"><p>Fetching information from Last.fm, hold tight!</p></div>

<div id="flickr"><p>Fetching information from Flickr, hold tight!</p></div>

<div id="planestrains">
	<p>RailMiles Stats &amp; Latest Journey:</p>
	<a href="https://yom.railmiles.me" class="img-link"><img src="https://public.railmiles.me/signatures/3560e69400242162df2413a6e10a1264.png"></a>
	<p>More <a href="{{ site.baseurl }}/journey-logging"><span class="emoji-icon">✈️</span><span class="emoji-icon">🚂</span> Journey Logging</a></p>
</div>

<div id="strava">
	<iframe title="Strava Frame; summary of latest activities" src="https://www.strava.com/athletes/93454796/activity-summary/3963eabee1c38df288efc43c8f4260c4b334a99b"></iframe>
</div>

---

Looking for professional happenings? [LinkedIn](https://www.linkedin.com/in/t5r7) is the place to be!

---

Data from [Last.fm](https://www.last.fm/user/itsmeimtom), [Flickr](https://www.flickr.com/photos/imtom), [RailMiles](https://yom.railmiles.me), and [Strava](https://www.strava.com/athletes/93454796). This product uses the Flickr API but is not endorsed or certified by SmugMug, Inc.

Part of Derek Sivers's [now page movement](https://nownownow.com/about).

<script src="{{ site.baseurl }}/static/js/now.js">