const apiEndpoint = `https://github-pages-check.thomasr.me/?slug=${location.pathname}`;
const newURL = location.href.replace(location.host, `thomasr.dev`);

async function checkRedirect() {
    const r = await fetch(apiEndpoint, { method: "HEAD" });
    const statusStart = r.status.toString().charAt(0);

    if (statusStart === "2" || statusStart === "3") {
        document.title = "This page has moved!";

        document.querySelector("article").innerHTML = `
        <header id="page-header">
	        <h2 id="page-title">This page has moved!</h2>
            <h3 id="page-description">You should be redirected shortly.</h3>
        </header>

        <p>If you are not redirected, please navigate to <a href="${newURL}">${newURL}</a>.</p>
        `;

        window.location = newURL;
    }
}

document.addEventListener("DOMContentLoaded", checkRedirect);