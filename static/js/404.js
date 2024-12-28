// some of these are truely awful old projects that have been privated on github
// but better here than not, since their github pages sites are still accessible
const known = [
	"clicker",
	"numvsnum",
	"innit",
	"assuetum",
	"monday",
	"sorry",
	"kis",
	"wirusworld",
	"mlghorn",
	"boot",
	"errors",
	"youtubethumbnails",
	"faces",
	"starfield",
	"mac",
	"windows",
	"jstest",
	"n3soundboard",
	"wordfall",
	"squarewaves",
	"taps",
	"discord-downloads",
	"howtosay",
	"pinkfletchxyz",
	"randomcolours",
	"steamwishlisttotal",
	"fontrandomizer",
	"slashes",
	"redditgallery",
	"wildcardlanding",
	"ibillysite",
	"fa-chess",
	"abeceda",
	"photos",
	"imagegallery",
	"brexit",
	"wancheck",
	"ubuntu-codename-generator",
	"screen-test",
	"hi",
	"tools",
	"ibillylanding",
	"ibillyltd",
	"farthest-from",
	"busstop",
	"billygeorge.me",
	"planviewerthing",
	"roadsigns",
	"last.fm-background",
	"stagecoach-bus-map",
	"google-home-info",
	"tracert-ipinfo",
	"pinghost",
	"shesaid",
	"bsods",
	"33rpm",
	"calculate-2020-gcse-grade",
	"tfwm-bus-routes-map",
	"sky-epg",
	"flickr-mm",
	"flickr-toys",
	"prefers-color-scheme",
	"regplates",
	"speedtest.net-csv-mapper",
	"transport-network-name-generator",
	"osmaps-gpx-dl",
	"train-types-from",
	"rejselog",
	"distances",
	"hampshire-stations",
	"uni-budget",
	"station-mapper",
	"rm-journey-mapper",
	"reddit-unsub-inactive",
	"monzo-analyse-csv",
	"flickr-photo-grid"
];

const apiEndpoint = `https://github-pages-check.thomasr.me/?slug=${location.pathname}`;
const newHost = "thomasr.dev";
const newURL = location.href.replace(location.host, newHost); // swap the host - nice and easy

async function checkRedirect() {
	const knownPathFormat = location.pathname
		.split("/")[1]
		.replace(/\//g, "")
		.toLowerCase();

	// check the list of hardcoded project names before we make a needless request
	if (known.includes(knownPathFormat)) return pageHasMoved(newURL);

	const r = await fetch(apiEndpoint, { method: "HEAD" });
	const statusStart = r.status.toString().charAt(0);

	if (statusStart === "2" || statusStart === "3") return pageHasMoved(newURL);

	// if we're here, then we can only assume the page really doesn't exist
	// not anywhere... :(
}

function pageHasMoved(newURL) {
	document.title = "This page has moved!";

	document.querySelector("article").innerHTML = `
        <header id="page-header">
	        <h2 id="page-title">This page has moved!</h2>
            <h3 id="page-description">You should be redirected shortly.</h3>
        </header>

        <p>If you are not redirected, please navigate to <a href="${newURL}">${newURL.replace("https://", "")}</a>.</p>
        `;

	window.location = newURL;
}

document.addEventListener("DOMContentLoaded", checkRedirect);
