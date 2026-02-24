const weddingParty = [{ name: "Olivia LaRosa", role: "Maid of Honor", image: "../images/wedding-party/photo-1.jpg", rotation: "-2deg", flavor: "lib" }, { name: "Elliot Bushman", role: "Best Man", image: "../images/wedding-party/photo-1.jpg", rotation: "3deg", flavor: "e man" }, { name: "Helen Wunderlich", role: "Bridesmaid", image: "../images/wedding-party/photo-1.jpg", rotation: "-1deg", flavor: "elen" }, { name: "Dan Aitken", role: "Groomsmen", image: "../images/wedding-party/photo-1.jpg", rotation: "4deg", flavor: "bong" }, { name: "Emma Pond", role: "Bridesmaid", image: "../images/wedding-party/photo-1.jpg", rotation: "-1deg", flavor: "emna" }, { name: "Evan Gonzales", role: "Groomsmen", image: "../images/wedding-party/evan.jpg", rotation: "2deg", flavor: "ebin" }, { name: "Alexa Meller", role: "Bridesmaid", image: "../images/wedding-party/photo-1.jpg", rotation: "-2deg", flavor: "dog mom" }, { name: "Marcus Ubarry", role: "Groomsmen", image: "../images/wedding-party/marcus.jpg", rotation: "3deg", flavor: "marges" }, { name: "Carolyn Kamp", role: "Junior Bridesmaid", image: "../images/wedding-party/photo-1.jpg", rotation: "1deg", flavor: "child 1" }, { name: "Brian Arnesen", role: "Groomsmen", image: "../images/wedding-party/photo-1.jpg", rotation: "-2deg", flavor: "barn" }, { name: "Kelsey Kamp", role: "Junior Bridesmaid", image: "../images/wedding-party/photo-1.jpg", rotation: "3deg", flavor: "child 2" }, { name: "Kyle Polito", role: "Groomsmen", image: "../images/wedding-party/photo-1.jpg", rotation: "-1deg", flavor: "twin" }];
let currentIndex = 0;
document.addEventListener('DOMContentLoaded', () => {
    const directory = document.getElementById('party-directory');
    if (!directory) return;

    weddingParty.forEach((person, index) => {
        const card = document.createElement('div');
        card.className = 'member-card';
        card.style.setProperty('--rotation', person.rotation);

        // 1. Attach the click to the outermost wrapper
        card.onclick = () => {
            console.log("Opening detail for:", person.name); // Debug line
            showPerson(index);
        };

        card.innerHTML = `
        <div class="polaroid">
            <img src="${person.image}" alt="${person.name}">
            <div class="polaroid-caption">${person.name.split(' ')[0]}</div>
        </div>
    `;

        directory.appendChild(card);
    });
});



function showPerson(index) {
    currentIndex = index;
    const person = weddingParty[index];
    const detailView = document.getElementById('party-detail-view');
    const directoryView = document.getElementById('party-directory');

    // 1. Update Content
    document.getElementById('detail-img').src = person.image;
    document.getElementById('detail-name').innerText = person.name;
    document.getElementById('detail-subtitle').innerText = person.role;
    document.getElementById('detail-flavor').innerText = person.flavor;

    // 2. Toggle Views
    directoryView.style.display = 'none';
    detailView.style.display = 'block';

    // 3. Reset to top
    window.scrollTo(0, 0);
}

function closeDetail() {
    const detailView = document.getElementById('party-detail-view');
    const directoryView = document.getElementById('party-directory');

    detailView.style.display = 'none';
    directoryView.style.display = 'grid'; // Brings back the 4-column layout
    window.scrollTo(0, 0);
}

function nextPerson() {
    currentIndex = (currentIndex + 1) % weddingParty.length;
    showPerson(currentIndex);
}

function prevPerson() {
    currentIndex = (currentIndex - 1 + weddingParty.length) % weddingParty.length;
    showPerson(currentIndex);
}
