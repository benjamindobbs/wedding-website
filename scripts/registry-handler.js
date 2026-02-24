let registryTimer = null;
const REGISTRY_URL = "https://www.myregistry.com/wedding-registry/ben-dobbs-and-jessica-polito-west-hartford-ct/5319880";

function openRegistryPortal() {
    const portal = document.getElementById('registry-portal');
    const mainView = document.getElementById('portal-main-view');
    const sitemapView = document.getElementById('portal-sitemap-view');
    const countdownEl = document.getElementById('countdown');

    // Reset views
    portal.style.display = 'flex';
    mainView.style.display = 'block';
    sitemapView.style.display = 'none';

    let timeLeft = 10;
    countdownEl.textContent = timeLeft;

    if (registryTimer) clearInterval(registryTimer);

    registryTimer = setInterval(() => {
        timeLeft--;
        countdownEl.textContent = timeLeft;
        if (timeLeft <= 0) {
            instantRedirect();
        }
    }, 1000);
}

function instantRedirect() {
    clearInterval(registryTimer);
    window.open(REGISTRY_URL, "_blank");
    window.location.href = "../index.html";
    closePortal();
}

function showSitemap() {
    // 1. Kill the timer so they don't get redirected while looking at the map
    clearInterval(registryTimer);
    
    // 2. Swap the card content
    document.getElementById('portal-main-view').style.display = 'none';
    document.getElementById('portal-sitemap-view').style.display = 'block';
}

function closePortal() {
    clearInterval(registryTimer);
    document.getElementById('registry-portal').style.display = 'none';
}


// Attach this to your navigation link or button
document.querySelector('a[href="#registry"]').addEventListener('click', (e) => {
    e.preventDefault();
    openRegistryPortal();
});

document.addEventListener('DOMContentLoaded', () => {
    // Check if we are on the registry page
    const portal = document.getElementById('registry-portal');
    if (portal) {
        openRegistryPortal();
    }
});