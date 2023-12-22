const newURL = `https://github-pages.thomasr.me${location.pathname}`;

if (location.pathname !== "/404.html") {
    const reqToCheck = new XMLHttpRequest();
    reqToCheck.open("HEAD", newURL, true);
    reqToCheck.onreadystatechange = function() {
        if (reqToCheck.readyState === 4) {
            if (reqToCheck.status === 404) {
                // it doesn't exist
            } else {
                document.title = "This page has moved!";
                document.getElementById("page-title").innerHTML = "This page has moved!";
                document.getElementById("page-description").innerHTML = "You should be redirected shortly.";
                window.location = newURL;
            }
        }
    };
    reqToCheck.send();
}
