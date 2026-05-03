const localRecsData = [
    // Breakfast
    {
        category: "Breakfast",
        name: "Vernon Diner",
        imageUrl: "../images/local-recs/vernon-diner.png",
        websiteUrl: "https://www.vernondiner.com/",
        flavorText: "The local (former 24/7) diner. Exactly what you're picturing, and better than you're thinking"
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
        flavorText: "Good coffee with nice indoor/outdoor seating. Birdhouse is infront of the local wetlands reserve as well. You can technically walk to the entrance, but I would reccomend driving."
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
        flavorText: "Add a description here."
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
    flavorText: "British style pub with patio seating. Great place to grab a drink or food and enjoy a nice day."
    },

    // Things to Do
    {
        category: "Things to Do",
        name: "The Shops at Evergreen Walk",
        imageUrl: "../images/local-recs/evergreen-walk.jpg",
        websiteUrl: "https://theshopsatevergreenwalk.com/",
        flavorText: "Promenade mall with an assortment of restaraunts, stores, and treats."
    },
    {
        category: "Things to Do",
        name: "Wickham Park",
        imageUrl: "../images/local-recs/wickham.jpg",
        websiteUrl: "https://wickhampark.org/",
        flavorText: "Beautiful local park with gardens, disc golf, and an aviary. There is a $10 parking fee"
    }
];

const categoryOrder = ["Breakfast", "Lunch/Dinner", "Things to Do"];

function getPageSize() {
    return window.innerWidth <= 768 ? 1 : 3;
}

function cardHTML(rec, isNew = false) {
    return `
        <div class="rec-card"${isNew ? ' data-new' : ''}>
            <img src="${rec.imageUrl}" alt="${rec.name}" class="rec-image">
            <div class="rec-content">
                <span class="rec-tag">${rec.category}</span>
                <h3 class="rec-name">${rec.name}</h3>
                <p class="rec-flavor">${rec.flavorText}</p>
                <a href="${rec.websiteUrl}" target="_blank" rel="noopener" class="rec-link-btn">Visit Website</a>
            </div>
        </div>
    `;
}

document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('local-recs-sections');
    if (!container) return;

    container.innerHTML = `
        <div class="recs-category-btns">
            ${categoryOrder.map(cat =>
                `<button class="recs-cat-btn" data-category="${cat}">${cat}</button>`
            ).join('')}
        </div>

        <div class="recs-carousel-view" id="recs-carousel-view">
            <button class="recs-arrow" id="recs-carousel-prev" aria-label="Previous">
                <span class="material-icons">chevron_left</span>
            </button>
            <div class="recs-stage">
                <div id="recs-carousel-track"></div>
                <div class="recs-counter" id="recs-carousel-counter"></div>
            </div>
            <button class="recs-arrow" id="recs-carousel-next" aria-label="Next">
                <span class="material-icons">chevron_right</span>
            </button>
        </div>

        <div class="recs-filtered-view" id="recs-filtered-view" hidden>
            <button class="recs-arrow" id="recs-filtered-prev" aria-label="Previous">
                <span class="material-icons">chevron_left</span>
            </button>
            <div class="recs-stage">
                <div class="recs-filtered-grid" id="recs-filtered-grid"></div>
                <div class="recs-counter" id="recs-filtered-counter"></div>
            </div>
            <button class="recs-arrow" id="recs-filtered-next" aria-label="Next">
                <span class="material-icons">chevron_right</span>
            </button>
        </div>
    `;

    const carouselView    = document.getElementById('recs-carousel-view');
    const carouselTrack   = document.getElementById('recs-carousel-track');
    const carouselCounter = document.getElementById('recs-carousel-counter');
    const carouselPrev    = document.getElementById('recs-carousel-prev');
    const carouselNext    = document.getElementById('recs-carousel-next');

    const filteredView    = document.getElementById('recs-filtered-view');
    const filteredGrid    = document.getElementById('recs-filtered-grid');
    const filteredCounter = document.getElementById('recs-filtered-counter');
    const filteredPrev    = document.getElementById('recs-filtered-prev');
    const filteredNext    = document.getElementById('recs-filtered-next');

    const catBtns = container.querySelectorAll('.recs-cat-btn');

    let view           = 'carousel';
    let carouselStart  = 0; // index of the first visible card in the sliding window
    let activeCategory = null;
    let filteredPage   = 0;

    function render(dir = null) {
        catBtns.forEach(btn =>
            btn.classList.toggle('active', btn.dataset.category === activeCategory)
        );

        if (view === 'carousel') {
            carouselView.hidden = false;
            filteredView.hidden = true;

            const ps       = getPageSize();
            const maxStart = localRecsData.length - ps;
            carouselStart  = ((carouselStart % (maxStart + 1)) + (maxStart + 1)) % (maxStart + 1);
            const visible  = localRecsData.slice(carouselStart, carouselStart + ps);

            if (dir) {
                const gap = window.innerWidth <= 480 ? 16 : 24;
                const stageWidth = carouselTrack.parentElement.clientWidth;
                const cardWidth  = (stageWidth - (ps - 1) * gap) / ps;
                carouselTrack.style.setProperty('--recs-slide-from',
                    dir === 'next' ? `${cardWidth + gap}px` : `${-(cardWidth + gap)}px`
                );
                carouselTrack.innerHTML = '';
                carouselTrack.classList.remove('slide-next', 'slide-prev');
                void carouselTrack.offsetWidth;
                carouselTrack.classList.add(dir === 'next' ? 'slide-next' : 'slide-prev');
            } else {
                carouselTrack.classList.remove('slide-next', 'slide-prev');
            }
            const newIdx = dir === 'next' ? visible.length - 1 : 0;
            carouselTrack.innerHTML = visible.map((rec, i) =>
                cardHTML(rec, dir !== null && i === newIdx)
            ).join('');
            carouselCounter.textContent = '';
            carouselPrev.disabled = false;
            carouselNext.disabled = false;
        } else {
            carouselView.hidden = true;
            filteredView.hidden = false;

            const items      = localRecsData.filter(r => r.category === activeCategory);
            const ps         = getPageSize();
            const totalPages = Math.ceil(items.length / ps);
            filteredPage     = Math.min(filteredPage, totalPages - 1);
            const visible    = items.slice(filteredPage * ps, filteredPage * ps + ps);

            filteredGrid.innerHTML = visible.map(cardHTML).join('');
            filteredCounter.textContent = totalPages > 1
                ? `${filteredPage + 1} / ${totalPages}`
                : '';
            filteredPrev.disabled = filteredPage === 0;
            filteredNext.disabled = filteredPage >= totalPages - 1;
        }
    }

    // Auto-rotate the carousel every 8 seconds, advancing one card at a time
    let autoPlay;
    function startAutoPlay() {
        clearInterval(autoPlay);
        autoPlay = setInterval(() => {
            const ps       = getPageSize();
            const maxStart = localRecsData.length - ps;
            carouselStart  = carouselStart >= maxStart ? 0 : carouselStart + 1;
            render('next');
        }, 8000);
    }
    startAutoPlay();

    carouselPrev.addEventListener('click', () => { carouselStart--; render('prev'); startAutoPlay(); });
    carouselNext.addEventListener('click', () => { carouselStart++; render('next'); startAutoPlay(); });
    filteredPrev.addEventListener('click', () => { filteredPage--; render(); });
    filteredNext.addEventListener('click', () => { filteredPage++; render(); });

    catBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Stop auto-rotation permanently once the user picks a category
            clearInterval(autoPlay);
            view = 'filtered';
            activeCategory = btn.dataset.category;
            filteredPage = 0;
            render();
        });
    });

    window.addEventListener('resize', () => {
        carouselStart = 0;
        filteredPage  = 0;
        render();
    });

    render();
});
