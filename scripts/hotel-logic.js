const hotelData = [
    {
        name: "Cambria Hotel",
        imageUrl: "../images/hotel-photos/cambria.jpg",
        description: "Sophisticated boutique hotel featuring a luxe spa, fine dining, and bright, elegant suites.",
        price: "$198",
        link: "https://www.choicehotels.com/connecticut/south-windsor/cambria-hotels/ct136?mc=llgoxxpx",
        distCeremony:"5mi/15 min",
        distReception:"22mi/45 min",
        amenities:{
            breakfast: false,
            walkToRestaurants: true,
            toReception: true,
            fromReception: true
        }
    },
    {
        name: "Fairfield Marriott",
        imageUrl: "../images/hotel-photos/marriot.jpg",
        description: "Contemporary rooms with an indoor pool and fitness center. A reliable and comfortable choice.",
        price: "$199",
        link: "https://www.marriott.com/en-us/hotels/bdlth-fairfield-inn-and-suites-hartford-manchester/overview/",
        distCeremony:"5mi/15 min",
        distReception:"22mi/45 min",
        amenities:{
            breakfast: true,
            walkToRestaurants: false,
            toReception: true,
            fromReception: true
        }
    },
    {
        name: "Homewood Suites",
        imageUrl:"../images/hotel-photos/hilton.jpg",
        description: "Unfussy hotel offering free breakfast, shuttle service, and an indoor pool for a relaxed stay.",
        price: "$199",
        link: "https://www.hilton.com/en/book/reservation/customize/",
        distCeremony:"5mi/15 min",
        distReception:"22mi/45 min",
        amenities:{
            breakfast: true,
            walkToRestaurants: false,
            toReception: true,
            fromReception: true
        }
    }
];

document.addEventListener('DOMContentLoaded', () => {
    const hotelGrid = document.getElementById('hotel-grid');

    hotelData.forEach(hotel => {
        const card = document.createElement('div');
        card.className = 'hotel-card';

        // Helper to generate a checkbox row
        const check = (bool) => bool ? 
            '<span class="status-yes">✔</span>' : 
            '<span class="status-no">✘</span>';

        card.innerHTML = `
            <img src="${hotel.imageUrl}" alt="${hotel.name}" class="hotel-image">
            <div class="hotel-content">
                <h2 class="hotel-name">${hotel.name}</h2>
                <div class="hotel-price">Avg ${hotel.price} / Night</div>
                
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
                    <div class="amenity-item ${hotel.amenities.toReception ? '' : 'status-no'}">
                        ${check(hotel.amenities.toReception)} Shuttle To Reception
                    </div>
                    <div class="amenity-item ${hotel.amenities.fromReception ? '' : 'status-no'}">
                        ${check(hotel.amenities.fromReception)} Shuttle From Reception
                    </div>
                </div>

                <p class="hotel-description">${hotel.description}</p>
                <a href="${hotel.link}" target="_blank" class="book-btn">View Rates</a>
            </div>
        `;

        hotelGrid.appendChild(card);
    });
});