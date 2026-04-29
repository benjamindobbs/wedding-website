/**
 * nav.js — Shared sidebar navigation
 * Injects the hamburger button + sidebar drawer into every page.
 * The correct relative paths are determined by the data-root attribute
 * on the <body> tag:
 *   - index.html (root):  <body data-root="./">
 *   - pages/*.html:       <body data-root="../">
 */

(function () {
    const root = document.body.dataset.root || './';

    const pages = [
        { label: 'Home',          href: `${root}index.html` },
        { label: 'Our Story',     href: `${root}our-story/` },
        { label: 'Wedding Party', href: `${root}wedding-party/` },
        { label: 'Registry',      href: `${root}registry/` },
        { label: 'Travel',        href: `${root}travel/` },
        { label: 'FAQ',           href: `${root}faq/` },
        { label: 'RSVP',          href: `${root}rsvp/` },
    ];

    const navLinks = pages
        .map(p => `<a href="${p.href}" class="nav-tab">${p.label}</a>`)
        .join('');

    const html = `
        <button class="hamburger-btn" id="hamburger-btn" aria-label="Open menu">
            <i class="material-icons">menu</i>
        </button>

        <div class="sidebar-overlay" id="sidebar-overlay"></div>

        <aside class="sidebar-drawer" id="sidebar-drawer" aria-label="Navigation menu">
            <div class="sidebar-header">
                <span class="sidebar-title">Jess &amp; Ben</span>
                <button class="sidebar-close-btn" id="sidebar-close-btn" aria-label="Close menu">
                    <i class="material-icons">close</i>
                </button>
            </div>
            <nav class="sidebar-nav">
                ${navLinks}
            </nav>
        </aside>
    `;

    // Inject into body
    document.body.insertAdjacentHTML('afterbegin', html);

    // Wire up open/close
    const btn     = document.getElementById('hamburger-btn');
    const drawer  = document.getElementById('sidebar-drawer');
    const overlay = document.getElementById('sidebar-overlay');
    const closeBtn = document.getElementById('sidebar-close-btn');

    function openMenu() {
        drawer.classList.add('open');
        overlay.classList.add('open');
        document.body.style.overflow = 'hidden';
        btn.querySelector('.material-icons').textContent = 'close';
    }

    function closeMenu() {
        drawer.classList.remove('open');
        overlay.classList.remove('open');
        document.body.style.overflow = '';
        btn.querySelector('.material-icons').textContent = 'menu';
    }

    btn.addEventListener('click', () => {
        drawer.classList.contains('open') ? closeMenu() : openMenu();
    });

    overlay.addEventListener('click', closeMenu);
    closeBtn.addEventListener('click', closeMenu);

    // Close on nav link click (smooth UX)
    drawer.querySelectorAll('.nav-tab').forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // Close on Escape key
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') closeMenu();
    });
})();