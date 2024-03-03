---
layout: default
title: "Now"
description: "What am I up to?"
permalink: /now/
---

<!-- lazy inline style rocks, change my mind -->
<style>
#lastfm, #statuscafe, #flickr, #strava {
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

#flickr a:last-of-type {
	border: none;
}

#flickr a:last-of-type:hover img, #flickr a:last-of-type:focus img {
	opacity: 0.8;
}

#strava {
	padding: 0;
}

#strava iframe {
	width: 100%;
	height: 454px; /* awkward height from their embed code */
	border: none;
}
</style>

I'm currently in my first year of a degree in [Computer Networks & Security](https://www.port.ac.uk/study/courses/undergraduate/bsc-hons-computer-networks-and-security) at the University of Portsmouth. I'm a committee member of the [Computer Networking Society](https://netsoc.group) there. Living in a shoebox, I'm trying to spend my time learning and being outside as much as possible; Getting back into photography, hiking, and trying to travel as much as I can.

The text above was last updated on 2024-03-03. The data in the boxes below is fetched programmatically and should be up to date.

<noscript>
<p>Unfortunately, you need JavaScript enabled to see the programmatically fetched data that would be here.</p>
<p>You can still use the links below to access my profiles manually.</p>
</noscript>

<div id="statuscafe"><p>Fetching information from status.cafe, hold tight!</p></div>

<div id="lastfm"><p>Fetching information from Last.fm, hold tight!</p></div>

<div id="flickr"><p>Fetching information from Flickr, hold tight!</p></div>

<div id="strava">
	<iframe src="https://www.strava.com/athletes/93454796/latest-rides/3963eabee1c38df288efc43c8f4260c4b334a99b"></iframe>
</div>

---

Data from [status.cafe](https://status.cafe/users/yom), [Last.fm](https://www.last.fm/user/itsmeimtom), [setlist.fm](https://www.setlist.fm/concerts/imtom) (soon), and [Flickr](https://www.flickr.com/photos/imtom). This product uses the Flickr API but is not endorsed or certified by SmugMug, Inc.

You might be interested in [the now page movement](https://nownownow.com/about).

<script src="{{ site.baseurl }}/static/js/now.js">