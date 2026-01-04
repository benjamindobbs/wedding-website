
const photos = [
    { src: "../images/gallery-photos/photo-1.jpg", caption: 'Place Holder' },
    { src: '../images/gallery-photos/photo-2.jpg', caption: 'Place Holder' },
    { src: '../images/gallery-photos/photo-3.jpg', caption: 'Place Holder' },
    { src: '../images/gallery-photos/photo-4.jpg', caption: 'Place Holder' },

];

document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('photo-grid');

    photos.forEach((photo, index) => {
        const card = document.createElement('div');
        card.className = 'photo-card';
        
        // Stagger the animation so they pop in one by one
        card.style.animationDelay = `${index * 0.1}s`;

        card.innerHTML = `
            <img src="${photo.src}" alt="${photo.caption}" loading="lazy">
            <div class="photo-caption">${photo.caption}</div>
        `;

        grid.appendChild(card);
    });
});