/**
 * photo-gallery.js
 */
const photoGallery = [
    {
        src: "../images/gallery-photos/photo-1.jpg",
        caption: "The Day He Asked",
        date: "October 14, 2024",
        angle: "-5deg"
    },
    {
        src: "../images/gallery-photos/photo-1.jpg",
        caption: "Up in the Clouds",
        date: "June 22, 2023",
        angle: "3deg"
    },
    {
        src: "../images/gallery-photos/photo-1.jpg",
        caption: "New Keys!",
        date: "January 05, 2025",
        angle: "-2deg"
    },
    {
        src: "../images/gallery-photos/photo-1.jpg",
        caption: "Summer Nights",
        date: "August 12, 2024",
        angle: "4deg"
    },
    {
        src: "../images/gallery-photos/photo-1.jpg",
        caption: "Front Row Seats",
        date: "May 30, 2022",
        angle: "-3deg"
    },
    {
        src: "../images/gallery-photos/photo-1.jpg",
        caption: "Welcome Home, Barnaby",
        date: "March 18, 2025",
        angle: "6deg"
    }
];

document.addEventListener('DOMContentLoaded', () => {
    const galleryContainer = document.getElementById('scrapbook-gallery');
    
    // Create Lightbox HTML dynamically if it doesn't exist
    const lightbox = document.createElement('div');
    lightbox.id = 'lightbox-overlay';
    lightbox.innerHTML = `
        <div id="lightbox-content">
            <img id="lightbox-img" src="" alt="">
            <div id="lightbox-caption">
                <h3 id="lb-title" style="font-family: 'Georgia', serif; margin:0;"></h3>
                <p id="lb-date" style="font-size: 0.8rem; color: #666; margin: 5px 0 0 0;"></p>
            </div>
        </div>
    `;
    document.body.appendChild(lightbox);

    lightbox.onclick = () => lightbox.style.display = 'none';

    // Build Gallery
    photoGallery.forEach(photo => {
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

        item.onclick = () => {
            document.getElementById('lightbox-img').src = photo.src;
            document.getElementById('lb-title').innerText = photo.caption;
            document.getElementById('lb-date').innerText = photo.date;
            lightbox.style.display = 'flex';
        };

        galleryContainer.appendChild(item);
    });
});