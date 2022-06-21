if ("serviceWorker" in navigator) {
  // register service worker
  navigator.serviceWorker.register("service-worker.js");
}

var DateTime = luxon.DateTime;

let countdownDate = DateTime.fromObject(
  { year: 2022, month: 7, day: 7, hour: 7 },
  { zone: "America/Toronto" }
);
console.log(countdownDate);

function startCountdown() {
  let now, timeLeft, days, hours, minutes, seconds;

  function updateCountdown() {
    now = DateTime.now();
    timeLeft = countdownDate - now; // in milliseconds

    days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    document.getElementById("days").innerHTML = padNum(days);
    document.getElementById("hours").innerHTML = padNum(hours);
    document.getElementById("minutes").innerHTML = padNum(minutes);
    document.getElementById("seconds").innerHTML = padNum(seconds);
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);
}

/**
 * Pads the number with a leading zero for n < 10
 * and checks if the number is positive.
 *
 * @param {int} n - number
 * @returns {string} the padded number, the original number, or 0 if the number is negative
 */
function padNum(n) {
  if (n < 0) {
    return 0;
  } else if (n == 0) {
    return "00";
  } else if (n < 10 && n > 0) {
    n = "0" + n;
    return n;
  } else {
    return n;
  }
}

window.onload = startCountdown();
