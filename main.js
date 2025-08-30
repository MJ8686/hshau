Shery.mouseFollower();
Shery.makeMagnet(".nav-left a" /* Element to target.*/, {
  //Parameters are optional.
  ease: "cubic-bezier(0.23, 1, 0.320, 1)",
  duration: 1,
});

function updateClock() {
  let now = new Date();

  // Convert UTC to Eastern Time (USA)
  let utc = now.getTime() + (now.getTimezoneOffset() * 60000);
  // Offset for Eastern Standard Time = -5 hours (300 min)
  // Use -4 hours (240 min) if in Daylight Saving
  let usaTime = new Date(utc - (5 * 60 * 60000));

  let hours = usaTime.getHours();
  let minutes = usaTime.getMinutes();

  // Convert to 12-hour format
  let ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12; // if 0, make it 12

  // Format minutes with leading zero
  minutes = minutes < 10 ? "0" + minutes : minutes;

  document.getElementById("clock").textContent = hours + ":" + minutes + " " + ampm;
}

setInterval(updateClock, 1000);
updateClock();

const scroll = new LocomotiveScroll({
    el: document.querySelector('.main'),
    smooth: true
});

const input = document.getElementById("revealInput");
const preloader = document.getElementById("preloader");

input.focus(); // make typing easier

function revealWebsite() {
  // prevent multiple triggers
  if (preloader.dataset.revealed) return;
  preloader.dataset.revealed = true;

  gsap.to(preloader, {
    y: "-100%",
    duration: 1.5,
    ease: "power2.inOut",
    onComplete: () => preloader.style.display = "none"
  });

  gsap.to(content, {
    opacity: 1,
    duration: 1
  });
}

// Listen for input
input.addEventListener("input", () => {
  if (input.value.trim().toLowerCase() === "human") {
    revealWebsite();
  }
});
