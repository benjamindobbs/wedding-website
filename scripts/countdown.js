
const targetDate = new Date("Aug 15, 2026 00:00:00").getTime();

function updateCountdown() {
    const now = new Date().getTime();
    const distance = targetDate - now;
    if (distance < 0) {
        clearInterval(timer);
        document.getElementById("countdown").innerHTML = "TODAY!";
        return;
    }
    const days = Math.ceil(distance / (1000 * 60 * 60 * 24));
    document.getElementById("days").innerHTML = days;
    document.getElementById("days-label").innerHTML = days === 1 ? "Day to Go" : "Days to Go";
}

updateCountdown();
const timer = setInterval(updateCountdown, 1000);