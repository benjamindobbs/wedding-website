//TODO
//Strip whitespace + force lowercase

const SITE_PASSWORD = "whosthatbrideitsjess!"; // Set your password here

function checkPassword() {
    const entered = document.getElementById('site-password-input').value;
    const errorMsg = document.getElementById('password-error');

    if (entered.replace(/\s+/g, '').toLowerCase() === SITE_PASSWORD.replace(/\s+/g, '').toLowerCase()) {
        localStorage.setItem('siteAuth', 'true');
        showSite();
    } else {
        errorMsg.style.display = 'block';
    }
}

function showSite() {
    const overlay = document.getElementById('password-overlay');
    const content = document.getElementById('main-site-content');
    if (!overlay || !content) return;

    content.style.display = 'block';
    overlay.classList.add('fade-out');
}

// Check on page load if they are already authorized
document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('siteAuth') === 'true') {
        showSite();
    }
});

// Guard for inner pages: redirect to homepage if not authenticated
(function () {
    const isHomepage = !!document.getElementById('password-overlay');
    if (!isHomepage && localStorage.getItem('siteAuth') !== 'true') {
        const root = document.body.dataset.root || '../';
        window.location.replace(root + 'index.html');
    }
})();

document.addEventListener('DOMContentLoaded', () => {
    const toggleBtn = document.getElementById('toggle-password');
    const passwordInput = document.getElementById('site-password-input');
    if (!passwordInput) return;

    passwordInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') checkPassword();
    });

    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            const isPassword = passwordInput.getAttribute('type') === 'password';
            passwordInput.setAttribute('type', isPassword ? 'text' : 'password');
            
            // Swap Material Icon text
            toggleBtn.textContent = isPassword ? 'visibility_off' : 'visibility';
        });
    }

    // Check session auth on load (immediate show, no fade)
    if (localStorage.getItem('siteAuth') === 'true') {
        document.getElementById('password-overlay').style.display = 'none';
        document.getElementById('main-site-content').style.display = 'block';
    }
});