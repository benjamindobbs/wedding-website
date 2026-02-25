/**
 * gallery-logic.js
 * Clicking a photo hides the grid and shows a scrapbook detail card
 * with the same slide animation used on the wedding party page.
 */

const photoGallery = [
    { src: "../images/gallery-photos/photo-1.jpg", caption: "The Day He Asked",      date: "October 14, 2024",  angle: "-5deg" },
    { src: "../images/gallery-photos/photo-1.jpg", caption: "Up in the Clouds",      date: "June 22, 2023",     angle: "3deg"  },
    { src: "../images/gallery-photos/photo-1.jpg", caption: "New Keys!",             date: "January 05, 2025",  angle: "-2deg" },
    { src: "../images/gallery-photos/photo-1.jpg", caption: "Summer Nights",         date: "August 12, 2024",   angle: "4deg"  },
    { src: "../images/gallery-photos/photo-1.jpg", caption: "Front Row Seats",       date: "May 30, 2022",      angle: "-3deg" },
    { src: "../images/gallery-photos/photo-1.jpg", caption: "Welcome Home, Barnaby", date: "March 18, 2025",    angle: "6deg"  },
];

let currentPhotoIndex = 0;
let isAnimating       = false;

document.addEventListener('DOMContentLoaded', () => {
    const galleryContainer = document.getElementById('scrapbook-gallery');

    photoGallery.forEach((photo, index) => {
        const item = document.createElement('div');
        item.className = 'gallery-item';
        item.style.setProperty('--rotation', photo.angle);

        item.innerHTML = `
            <div class="polaroid">
                <img src="${photo.src}" alt="${photo.caption}">
                <div class="polaroid-caption">
                    <span class="caption-text">${photo.caption}</span>
                    <span class="caption-date">${photo.date}</span>
                </div>
            </div>
        `;

        item.onclick = () => showPhoto(index, null);
        galleryContainer.appendChild(item);
    });
});


/* ── Core display function ──────────────────────────────────────
   direction: 'next' | 'prev' | null (null = first open, no animation)
──────────────────────────────────────────────────────────────── */
function showPhoto(index, direction) {
    currentPhotoIndex = index;
    const photo       = photoGallery[index];
    const galleryView = document.getElementById('scrapbook-gallery');
    const photoWrapper = document.querySelector('.photo-page-wrapper');
    const detailView  = document.getElementById('photo-detail-view');
    const card        = detailView.querySelector('.detail-card');

    // --- First open: no animation ---
    if (!direction) {
        _updatePhotoContent(photo);
        photoWrapper.style.display = 'none';
        detailView.style.display   = 'block';
        window.scrollTo(0, 0);
        return;
    }

    if (isAnimating) return;
    isAnimating = true;

    const exitClass  = direction === 'next' ? 'exit-left'   : 'exit-right';
    const enterClass = direction === 'next' ? 'enter-right' : 'enter-left';

    card.classList.add(exitClass);

    card.addEventListener('animationend', function onExit() {
        card.removeEventListener('animationend', onExit);
        card.classList.remove(exitClass);

        _updatePhotoContent(photo);

        void card.offsetWidth; // force reflow
        card.classList.add(enterClass);

        card.addEventListener('animationend', function onEnter() {
            card.removeEventListener('animationend', onEnter);
            card.classList.remove(enterClass);
            isAnimating = false;
        }, { once: true });

    }, { once: true });
}

function _updatePhotoContent(photo) {
    document.getElementById('photo-detail-img').src          = photo.src;
    document.getElementById('photo-detail-caption').innerText = photo.caption;
    document.getElementById('photo-detail-date').innerText    = photo.date;
}


/* ── Navigation ───────────────────────────────────────────────── */
function nextPhoto() {
    const next = (currentPhotoIndex + 1) % photoGallery.length;
    showPhoto(next, 'next');
}

function prevPhoto() {
    const prev = (currentPhotoIndex - 1 + photoGallery.length) % photoGallery.length;
    showPhoto(prev, 'prev');
}

function closePhoto() {
    const photoWrapper = document.querySelector('.photo-page-wrapper');
    const detailView   = document.getElementById('photo-detail-view');
    detailView.style.display   = 'none';
    photoWrapper.style.display = 'block';
    window.scrollTo(0, 0);
}