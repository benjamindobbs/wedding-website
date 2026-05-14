const localRecsData = [
    // Breakfast
    {
        category: "Breakfast",
        name: "Vernon Diner",
        imageUrl: "../images/local-recs/vernon-diner.png",
        websiteUrl: "https://www.vernondiner.com/",
        flavorText: "The local (former 24/7) diner. Exactly what you're picturing, and better than you're thinking."
    },
    {
        category: "Breakfast",
        name: "Red Cabin",
        imageUrl: "../images/local-recs/red-cabin.jpg",
        websiteUrl: "https://www.theredcabin.com/",
        flavorText: "Cute family owned breakfast spot with great french toast."
    },
    {
        category: "Breakfast",
        name: "Birdhouse Coffee",
        imageUrl: "../images/local-recs/birdhouse.jpg",
        websiteUrl: "https://www.birdhousecoffee.com/",
        flavorText: "Good coffee with nice indoor/outdoor seating."
    },
    {
        category: "Breakfast",
        name: "Silk City Coffee",
        imageUrl: "../images/local-recs/silk-city.png",
        websiteUrl: "https://silkcitycoffee.com/",
        flavorText: "Cute local coffee spot on Main Street in Manchester. Great spot to get a coffee and relax."
    },

    // Lunch / Dinner
    {
        category: "Lunch/Dinner",
        name: "Burtons Grill",
        imageUrl: "../images/local-recs/burtons.jpg",
        websiteUrl: "https://burtonsgrill.com/locations/ct/south-windsor/",
        flavorText: "Upscale American bar and grill that is walkable from the Cambria hotel."
    },
    {
        category: "Lunch/Dinner",
        name: "PhoLy",
        imageUrl: "../images/local-recs/pholy.jpg",
        websiteUrl: "https://www.pholyct.com/",
        flavorText: "Great local Vietnamese Restaurant. Best bahn mi in the area."
    },
    {
        category: "Lunch/Dinner",
        name: "Sushi House",
        imageUrl: "../images/local-recs/sushi-house.jpg",
        websiteUrl: "https://sushihousect.com/",
        flavorText: "All you can eat sushi, a personal favorite spot for the bride and groom."
    },
    {
        category: "Lunch/Dinner",
        name: "Main Pub",
        imageUrl: "../images/local-recs/main-pub.jpg",
        websiteUrl: "https://mainpub.com/",
        flavorText: "British style pub with patio seating. Great place to grab a drink or food, and enjoy a nice day."
    },

    // Things to Do
    {
        category: "Things to Do",
        name: "The Shops at Evergreen Walk",
        imageUrl: "../images/local-recs/evergreen-walk.jpg",
        websiteUrl: "https://theshopsatevergreenwalk.com/",
        flavorText: "Promenade mall with an assortment of restaurants, stores, and treats. You may want to visit Munson’s Chocolates, as that is where Jess worked her first job!"
    },
    {
        category: "Things to Do",
        name: "Wickham Park",
        imageUrl: "../images/local-recs/wickham.jpg",
        websiteUrl: "https://wickhampark.org/",
        flavorText: "Beautiful local park with gardens, disc golf, and an aviary. There is a $10 parking fee."
    }
];

const categoryOrder = ["Breakfast", "Lunch/Dinner", "Things to Do"];

document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('local-recs-sections');
    if (!container) return;

    categoryOrder.forEach(category => {
        const items = localRecsData.filter(r => r.category === category);
        if (!items.length) return;

        const section = document.createElement('div');
        section.className = 'recs-section';
        section.innerHTML = `
            <h2 class="recs-section-title">${category}</h2>
            <div class="recs-grid">
                ${items.map(rec => `
                    <div class="rec-card">
                        <img src="${rec.imageUrl}" alt="${rec.name}" class="rec-image">
                        <div class="rec-content">
                            <h3 class="rec-name">${rec.name}</h3>
                            <p class="rec-flavor">${rec.flavorText}</p>
                            <a href="${rec.websiteUrl}" target="_blank" rel="noopener" class="rec-link-btn">Visit Website</a>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
        container.appendChild(section);
    });
});
