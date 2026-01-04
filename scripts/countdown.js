
const targetDate = new Date("Aug 14, 2026 23:59:59").getTime();

const timer = setInterval(function() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    // Time calculation
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));


    // Output the results in the elements with id="days", etc.
    document.getElementById("days").innerHTML = days;

    // If the countdown is finished, display some text
    if (distance < 0) {
        clearInterval(timer);
        document.getElementById("countdown").innerHTML = "TODAY!";
    }
}, 1000);