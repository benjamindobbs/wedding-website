const weddingParty = [
    { name: "Olivia LaRosa",   role: "Maid of Honor",      image: "../images/wedding-party/photo-1.jpg",  rotation: "-2deg", flavor: "placeholder"      },
    { name: "Elliot Bushman",  role: "Best Man",            image: "../images/wedding-party/photo-1.jpg",  rotation: "3deg",  flavor: "placeholder"    },
    { name: "Helen Wunderlich",role: "Bridesmaid",          image: "../images/wedding-party/photo-1.jpg",  rotation: "-1deg", flavor: "placeholder"     },
    { name: "Dan Aitken",      role: "Groomsmen",           image: "../images/wedding-party/photo-1.jpg",  rotation: "4deg",  flavor: "placeholder"     },
    { name: "Emma Pond",       role: "Bridesmaid",          image: "../images/wedding-party/photo-1.jpg",  rotation: "-1deg", flavor: "placeholder"     },
    { name: "Evan Gonzales",   role: "Groomsmen",           image: "../images/wedding-party/photo-1.jpg",  rotation: "2deg",  flavor: "placeholder"     },
    { name: "Alexa Meller",    role: "Bridesmaid",          image: "../images/wedding-party/photo-1.jpg",  rotation: "-2deg", flavor: "placeholder"  },
    { name: "Marcus Ubarry",   role: "Groomsmen",           image: "../images/wedding-party/marcus.jpg",   rotation: "3deg",  flavor: "placeholder"   },
    { name: "Carolyn Kamp",    role: "Junior Bridesmaid",   image: "../images/wedding-party/photo-1.jpg",  rotation: "1deg",  flavor: "placeholder"  },
    { name: "Brian Arnesen",   role: "Groomsmen",           image: "../images/wedding-party/photo-1.jpg",  rotation: "-2deg", flavor: "placeholder"     },
    { name: "Kelsey Kamp",     role: "Junior Bridesmaid",   image: "../images/wedding-party/photo-1.jpg",  rotation: "3deg",  flavor: "placeholder"  },
    { name: "Kyle Polito",     role: "Groomsmen",           image: "../images/wedding-party/photo-1.jpg",  rotation: "-1deg", flavor: "placeholder"     },
];

let currentIndex = 0;
let isAnimating  = false; // guard so rapid clicks don't stack animations

document.addEventListener('DOMContentLoaded', () => {
    const directory = document.getElementById('party-directory');
    if (!directory) return;

    weddingParty.forEach((person, index) => {
        const card = document.createElement('div');
        card.className = 'member-card';
        card.style.setProperty('--rotation', person.rotation);
        card.onclick = () => showPerson(index, null);
        card.innerHTML = `
            <div class="polaroid">
                <img src="${person.image}" alt="${person.name}">
                <div class="polaroid-caption">${person.name.split(' ')[0]}</div>
            </div>
        `;
        directory.appendChild(card);
    });
});


/* ── Core display function ─────────────────────────────────────
   direction: 'next' | 'prev' | null (null = no animation, e.g. first open)
──────────────────────────────────────────────────────────────── */
function showPerson(index, direction) {
    currentIndex = index;
    const person      = weddingParty[index];
    const detailView  = document.getElementById('party-detail-view');
    const directoryView = document.getElementById('party-directory');
    const card        = detailView.querySelector('.detail-card');

    // --- First open: no animation, just show ---
    if (!direction) {
        _updateCardContent(person);
        directoryView.style.display = 'none';
        detailView.style.display    = 'block';
        window.scrollTo(0, 0);
        return;
    }

    if (isAnimating) return;
    isAnimating = true;

    // --- Exit: slide current card out ---
    const exitClass  = direction === 'next' ? 'exit-left'   : 'exit-right';
    const enterClass = direction === 'next' ? 'enter-right' : 'enter-left';

    card.classList.add(exitClass);

    card.addEventListener('animationend', function onExit() {
        card.removeEventListener('animationend', onExit);
        card.classList.remove(exitClass);

        // Swap content while card is off-screen
        _updateCardContent(person);

        // --- Enter: slide new content in ---
        // Force a reflow so the browser registers the class removal before adding the new one
        void card.offsetWidth;
        card.classList.add(enterClass);

        card.addEventListener('animationend', function onEnter() {
            card.removeEventListener('animationend', onEnter);
            card.classList.remove(enterClass);
            isAnimating = false;
        }, { once: true });

    }, { once: true });
}

function _updateCardContent(person) {
    document.getElementById('detail-img').src           = person.image;
    document.getElementById('detail-name').innerText    = person.name;
    document.getElementById('detail-subtitle').innerText = person.role;
    document.getElementById('detail-flavor').innerText  = person.flavor;
}


/* ── Navigation ───────────────────────────────────────────────── */
function nextPerson() {
    const next = (currentIndex + 1) % weddingParty.length;
    showPerson(next, 'next');
}

function prevPerson() {
    const prev = (currentIndex - 1 + weddingParty.length) % weddingParty.length;
    showPerson(prev, 'prev');
}

function closeDetail() {
    const detailView    = document.getElementById('party-detail-view');
    const directoryView = document.getElementById('party-directory');
    detailView.style.display    = 'none';
    directoryView.style.display = 'grid';
    window.scrollTo(0, 0);
}