const people = [
    {
        name: "Elliot Bushman",
        role: "Best Man",
        blurb: "We like the e man",
        image: "../images/gallery-photos/photo-1.jpg"
    },
    {
        name: "Liv LaRosa",
        role: "Maid of Honor",
        blurb: "Goat",
        image: "../images/gallery-photos/photo-1.jpg"
    },
    {
        name: "Henlen",
        role: "Emotional Support",
        blurb: "yeah, that's bestie",
        image: "../images/gallery-photos/photo-1.jpg"
    }
];

document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('people-container');

    people.forEach((person) => {
        const card = document.createElement('div');
        card.className = 'person-card';

        card.innerHTML = `
            <div class="person-image">
                <img src="${person.image}" alt="${person.name}">
            </div>
            <div class="person-text">
                <h2>${person.name}</h2>
                <h3>${person.role}</h3>
                <p>${person.blurb}</p>
            </div>
        `;
        container.appendChild(card);
    });
    const observerOptions = {
        threshold: 0.2, // Trigger when 20% of the card is visible
        rootMargin: "0px 0px -50px 0px" // Slight offset to make the animation feel more natural
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
                // Stop observing once the animation has played
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Tell the observer to watch all the cards
    document.querySelectorAll('.person-card').forEach(card => {
        observer.observe(card);
    });
});