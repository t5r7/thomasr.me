let now = new Date();
let h = now.getHours();

let greeting = "Hello There,";
if (h >= 0 && h < 12) greeting = "Good Morning,"; // 5-12 
if (h >= 12 && h < 18) greeting = "Good Afternoon,"; // 12-18
if (h >= 18 && h < 22) greeting = "Good Evening,"; // 18-22
if (h >= 22) greeting = "Good Evening,"; // 22-23

document.getElementById('js-greeting').innerText = greeting;