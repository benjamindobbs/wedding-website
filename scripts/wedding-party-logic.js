const weddingParty = [
    { name: "Olivia LaRosa",   role: "Maid of Honor",      image: "../images/wedding-party/liv.jpg",  rotation: "-2deg", flavor: "placeholder"      },
    { name: "Elliot Bushman",  role: "Best Man",            image: "../images/wedding-party/elliot.jpg",  rotation: "3deg",  flavor: "I've known Elliot for well over 10 years now. We've traveled to deserts and fjords together, lived together for years, and have never run out of conversation."    },
    { name: "Helen Wunderlich",role: "Bridesmaid",          image: "../images/wedding-party/helen.jpg",  rotation: "-1deg", flavor: "placeholder"     },
    { name: "Dan & Alexa",      role: "Groomsmen & Bridesmaid",           image: "../images/wedding-party/dan-alexa.jpg",  rotation: "4deg",  flavor: "placeholder"     },
    { name: "Emma Pond",       role: "Bridesmaid",          image: "../images/wedding-party/emma.jpg",  rotation: "-1deg", flavor: "I met Dan & Alexa in 2017 working at The Summer Place. I distinctly remember Alexa's shock at how pretty Jess was when I first showed her a picture. She said to me 'Oh wow, she's so pretty! I didn't think you cared about stuff like that'."     },
    { name: "Evan Gonzales",   role: "Groomsmen",           image: "../images/wedding-party/evan.jpg",  rotation: "2deg",  flavor: "Evan recolects our meeting as 'That annoying freshman stealing my mouse at a robotics meeting', which is more or less how I remember it as well. Evan would introduce me tech threatre as well as to Marcus as well as most of the people I hung out with in high school. He's impossibly funny and charasmatic and is a cherished friend."     },
    { name: "Marcus Ubarry",   role: "Groomsmen",           image: "../images/wedding-party/marcus.jpg",   rotation: "3deg",  flavor: "Marcus has irreperably damanged my sense of humor. I think I've probably received over 1000 hours of videos over the years, many of which has foundationally changed my vernacular. He genuinely makes anything he's involved in 10 times funnier. He is also an incredibly caring friend who always is there to help regardless of if it's shopping for toasters online or hard labor."   },
    { name: "Carolyn & Kelsey Kamp",    role: "Junior Bridesmaids",   image: "../images/wedding-party/photo-1.jpg",  rotation: "1deg",  flavor: "placeholder"  },
    { name: "Brian Arnesen",   role: "Groomsmen",           image: "../images/wedding-party/brian.jpg",  rotation: "-2deg", flavor: "I met Brian when I was a freshman in high school. He also biked to school and I made the mistake of giving him and his friends my lock combo. I think after I figured out how to unlock my bike from 10' up that tree is when we really became friends. Even when he is relegated to eating exclusively corn tortillas and crunchy peanutbutter or only ozzy bars and pickles for a week he is the vibe setter. Pure of heart and full of whimsy Brian is the world's greatest travel partner."     },
    { name: "Kyle Polito",     role: "Groomsmen",           image: "../images/wedding-party/kyle.jpg",  rotation: "-1deg", flavor: "placeholder"     },
];

let currentIndex = 0;
let isAnimating  = false; // guard so rapid clicks don't stack animations

document.addEventListener('DOMContentLoaded', () => {
    const directory = document.getElementById('party-directory');
    if (!directory) return;

    // Touch swipe on the detail view
    const detailView = document.getElementById('party-detail-view');
    let swipeStartX = 0;
    let swipeStartY = 0;
    detailView.addEventListener('touchstart', (e) => {
        swipeStartX = e.touches[0].clientX;
        swipeStartY = e.touches[0].clientY;
    }, { passive: true });
    detailView.addEventListener('touchend', (e) => {
        const dx = e.changedTouches[0].clientX - swipeStartX;
        const dy = e.changedTouches[0].clientY - swipeStartY;
        if (Math.abs(dy) > Math.abs(dx)) {
            if (dy > 60) closeDetail();
        } else {
            if (Math.abs(dx) < 50) return;
            if (dx < 0) nextPerson();
            else prevPerson();
        }
    }, { passive: true });

    weddingParty.forEach((person, index) => {
        const card = document.createElement('div');
        card.className = 'member-card';
        card.style.setProperty('--rotation', person.rotation);
        card.onclick = () => showPerson(index, null);
        card.innerHTML = `
            <div class="polaroid">
                <img src="${person.image}" alt="${person.name}">
                <div class="polaroid-caption">${person.name}</div>
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