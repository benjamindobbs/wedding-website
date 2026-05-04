const hotelData = [
    {
        name: "Cambria Hotel",
        imageUrl: "../images/hotel-photos/cambria.jpg",
        address: "1000 Long Leaf Ln, South Windsor, CT 06074",
        phone: "8603274084",
        link: "https://www.choicehotels.com/reservations/groups/VZ11R5",
        distCeremony:"5mi/15 min",
        distReception:"22mi/45 min",
        amenities:{
            breakfast: false,
            walkToRestaurants: true,
        }
    },
    {
        name: "Fairfield Marriott",
        imageUrl: "../images/hotel-photos/marriot.jpg",
        address: "121 Pavilions Dr, Manchester, CT 06042",
        phone: "8606489796",
        link: "https://www.marriott.com/event-reservations/reservation-link.mi?id=1773249110066&key=GRP&app=resvlink&_branch_match_id=1451598405527886058&_branch_referrer=H4sIAAAAAAAAA8soKSkottLXTywo0MtNLCrKzC8p0UvOz9UvSi3OyczLtgdK2ALZZSCOWmaKraG5ubGRiaWhoYGBmZladmqlrXtQgFpdUWpaKlB3Xnp8UlF%2BeXFqka1zRlF%2BbioAnUE9uWAAAAA%3D",
        distCeremony:"5mi/15 min",
        distReception:"22mi/45 min",
        amenities:{
            breakfast: true,
            walkToRestaurants: false,
        }
    },
    {
        name: "Homewood Suites",
        imageUrl:"../images/hotel-photos/hilton.jpg",
        address: "109 Pavilions Dr, Manchester, CT 06042",
        phone: "8606442244",
        link: "https://www.hilton.com/en/book/reservation/deeplink/?ctyhocn=BDLHFHW&groupCode=CHWPDW&arrivaldate=2026-08-13&departuredate=2026-08-16&cid=OM,WW,HILTONLINK,EN,DirectLink&fromId=HILTONLINKDIRECT",
        distCeremony:"5mi/15 min",
        distReception:"22mi/45 min",
        amenities:{
            breakfast: true,
            walkToRestaurants: false,
        }
    }
];

const isApple = /iPhone|iPad|iPod|Macintosh/.test(navigator.userAgent);

function mapsUrl(address) {
    const encoded = encodeURIComponent(address);
    return isApple
        ? `https://maps.apple.com/?q=${encoded}`
        : `https://www.google.com/maps/search/?api=1&query=${encoded}`;
}

function formatPhone(digits) {
    const d = digits.replace(/\D/g, '');
    const ten = d.length === 11 ? d.slice(1) : d;
    return `(${ten.slice(0,3)}) ${ten.slice(3,6)}-${ten.slice(6)}`;
}

document.addEventListener('DOMContentLoaded', () => {
    const hotelGrid = document.getElementById('hotel-grid');

    hotelData.forEach(hotel => {
        const card = document.createElement('div');
        card.className = 'hotel-card';

        const check = (bool) => bool ?
            '<span class="status-yes">✔</span>' :
            '<span class="status-no">✘</span>';

        const digits = hotel.phone.replace(/\D/g, '');
        const telHref = `tel:+1${digits.length === 11 ? digits.slice(1) : digits}`;

        card.innerHTML = `
            <img src="${hotel.imageUrl}" alt="${hotel.name}" class="hotel-image">
            <div class="hotel-content">
                <h2 class="hotel-name">${hotel.name}</h2>

                <div class="hotel-contact">
                    <div class="contact-item">
                        <span class="contact-label">Address:</span>
                        <a href="${mapsUrl(hotel.address)}" target="_blank" class="contact-link">${hotel.address}</a>
                    </div>
                    <div class="contact-item">
                        <span class="contact-label">Phone:</span>
                        <a href="${telHref}" class="contact-link">${formatPhone(hotel.phone)}</a>
                    </div>
                </div>

                <div class="hotel-details-row">
                    <div class="hotel-logistics">
                        <div class="logistic-item">
                            <span class="logistic-label">To Ceremony:</span>
                            <span class="logistic-value">${hotel.distCeremony}</span>
                        </div>
                        <div class="logistic-item">
                            <span class="logistic-label">To Reception:</span>
                            <span class="logistic-value">${hotel.distReception}</span>
                        </div>
                    </div>

                    <div class="amenities-grid">
                        <div class="amenity-item ${hotel.amenities.breakfast ? '' : 'status-no'}">
                            ${check(hotel.amenities.breakfast)} Breakfast
                        </div>
                        <div class="amenity-item ${hotel.amenities.walkToRestaurants ? '' : 'status-no'}">
                            ${check(hotel.amenities.walkToRestaurants)} Walkable Restaurants
                        </div>
                    </div>
                </div>

                <a href="${hotel.link}" target="_blank" class="book-btn">View Room Block Info</a>
            </div>
        `;

        hotelGrid.appendChild(card);
    });
});
