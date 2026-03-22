//TODO
//Strip whitespace + force lowercase

const SITE_PASSWORD = "whosthatbrideitsjess!"; // Set your password here

function checkPassword() {
    const entered = document.getElementById('site-password-input').value;
    const errorMsg = document.getElementById('password-error');

    if (entered.replace(/\s+/g, '').toLowerCase() === SITE_PASSWORD.replace(/\s+/g, '').toLowerCase()) {
        // Save to session so they don't have to re-enter on refresh
        sessionStorage.setItem('siteAuth', 'true');
        showSite();
    } else {
        errorMsg.style.display = 'block';
    }
}

function showSite() {
    const overlay = document.getElementById('password-overlay');
    const content = document.getElementById('main-site-content');
    
    // First, make the content behind it exist in the layout
    content.style.display = 'block';
    
    // Then, trigger the fade out animation
    overlay.classList.add('fade-out');
}

// Check on page load if they are already authorized
document.addEventListener('DOMContentLoaded', () => {
    if (sessionStorage.getItem('siteAuth') === 'true') {
        showSite();
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const toggleBtn = document.getElementById('toggle-password');
    const passwordInput = document.getElementById('site-password-input');

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
    if (sessionStorage.getItem('siteAuth') === 'true') {
        document.getElementById('password-overlay').style.display = 'none';
        document.getElementById('main-site-content').style.display = 'block';
    }
});