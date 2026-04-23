
const targetDate = new Date("Aug 14, 2026 23:59:59").getTime();

function updateCountdown() {
    const now = new Date().getTime();
    const distance = targetDate - now;
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    document.getElementById("days").innerHTML = days;
    if (distance < 0) {
        clearInterval(timer);
        document.getElementById("countdown").innerHTML = "TODAY!";
    }
}

updateCountdown();
const timer = setInterval(updateCountdown, 1000);