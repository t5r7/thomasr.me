// homepage greeting and email deobfuscation

async function greet() {
  // now is already defined by the accent colour script
  let h = now.getHours();

  let greeting = "Hello,";
  if (h >= 0 && h < 12) greeting = "Good&nbsp;Morning,"; // 5-12
  if (h >= 12 && h < 18) greeting = "Good&nbsp;Afternoon,"; // 12-18
  if (h >= 18 && h < 22) greeting = "Good&nbsp;Evening,"; // 18-22
  if (h >= 22) greeting = "Good&nbsp;Evening,"; // 22-23

  document.querySelector("#js-greeting").innerHTML = greeting;
}

window.addEventListener("load", greet);

let emailClicked = false;
function emailOnclick(e) {
  if (!emailClicked) {
    // rot13decode the email, thanks copilot!
    e.innerText = e.innerText.replace(/[a-zA-Z]/g, function (c) {
      return String.fromCharCode(
        (c <= "Z" ? 90 : 122) >= (c = c.charCodeAt(0) + 13) ? c : c - 26
      );
    });

    // remove the text describing it as rot-13 encoded
    document.querySelector("#rot-13-text").remove();
  }

  // select the text
  window.getSelection().setBaseAndExtent(e, 0, e, 1);

  if (emailClicked == false) emailClicked = true;
}
