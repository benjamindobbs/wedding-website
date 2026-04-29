const weddingParty = [
    { name: "Olivia LaRosa",   role: "Maid of Honor",      image: "../images/wedding-party/liv.jpg",  rotation: "-2deg", flavor: "Jess and Liv met in Kindergarten, as proven by an old home video where Jess recounts her first day of school and notes that she met a girl named Olivia who went to the bathroom with her. Jess and Liv are now on year 21 of being friends, yet they still find things to talk for hours about, and could probably set the world record for being chatters. It’s a wonder our teachers ever let us sit next to each other! Jess and Liv have been through it all together, from Girl Scouts and playground drama, to prom and graduations, to all of the crazy changes adulthood has brought them. Although they no longer live down the street from one another, Liv and Jess love to swap stories, shop, and joke around wherever they are. Liv continues to be a loyal, witty, caring, and organized best friend to Jess. Liv works hard for the goals she sets for herself, but will always make time to have your back. If you get a chance to talk to Liv, you may want to ask her about law school, as she’s currently crushing it and reminding us all to work hard and look fashionable doing it!"      },
    { name: "Elliot Bushman",  role: "Best Man",            image: "../images/wedding-party/elliot.jpg",  rotation: "3deg",  flavor: "In case you didn’t know, Jess and Ben actually met through Elliot! Elliot is a mutual friend of Jess and Ben, having grown up as a family friend of the Politos and participating in Boy Scouts with Ben. Ben's known Elliot for well over 10 years now. They've traveled to deserts and fjords together, lived together for years, and have never run out of conversation. Jess spent many summers and school weekends hanging out with the Bushmans and other family friends as kids! Jess and Elliot continue to spend time together as they did when they were kids- sitting around campfires in the summers and skiing in the winters. If you get the chance to talk to Elliot, ask him about ordering a cave suit!"    },
    { name: "Helen Wunderlich",role: "Bridesmaid",          image: "../images/wedding-party/helen.jpg",  rotation: "-1deg", flavor: "Jess met Helen during their undergraduate years at Marist. Jess and Helen were both in the social work program when Jess offered for Helen to live in her on-campus apartment for a semester while her roommate studied abroad. Since living together, Jess and Helen have continued to remain great friends! When you meet Helen, you will see how silly and loving she is towards everyone around her! If you get the chance to talk to her, make sure to ask what she’s working on in Minecraft!"     },
    { name: "Dan & Alexa",      role: "Groomsmen & Bridesmaid",           image: "../images/wedding-party/dan-alexa.jpg",  rotation: "4deg",  flavor: "Ben met Dan & Alexa in 2017 working as camp counselors at The Summer Place. Ben distinctly remembers Alexa's shock at how pretty Jess was when he first showed her a picture during camp in 2019. She said to him, \"Oh wow, she’s so pretty! I didn’t think you cared about stuff like that\". Since Jess and Ben started dating, the four of them have spent many years visiting each other’s homes, eating all you can eat sushi, and joking about how similar they all are! Dan and Alexa are the absolute best \"couple\" friends, and we can’t wait to have them by our side for the big day! If you get the chance to talk to them, you may want to ask if they’ll show you a picture of their golden retrievers!"},
    { name: "Emma Pond",       role: "Bridesmaid",          image: "../images/wedding-party/emma.jpg",  rotation: "-1deg", flavor: "Jess met Emma early on in their time at Marist as they both pursued their BSW degrees. Jess and Emma were consistent partners in school projects, always working hard and laughing along the way! Jess and Emma remain amazing friends who share the same brain, even though they live further apart than they would prefer. Emma will likely have difficulty keeping in her tears on the big day, as she has the biggest heart of anyone we know. If you get the chance to talk to her, you may want to ask about what new craft project she is perfecting! "},
    { name: "Evan Gonzales",   role: "Groomsmen",           image: "../images/wedding-party/evan.jpg",  rotation: "2deg",  flavor: "Evan recolects our meeting as 'That annoying freshman stealing my mouse at a robotics meeting', which is more or less how I remember it as well. Evan would introduce me tech threatre as well as to Marcus as well as most of the people I hung out with in high school. He's impossibly funny and charasmatic and is a cherished friend. If you get the chance to talk to Evan, ask him about being an AMC A-lister. (Yes, he earns commision)"     },
    { name: "Marcus Ubarry",   role: "Groomsmen",           image: "../images/wedding-party/marcus.jpg",   rotation: "3deg",  flavor: "Marcus has irreperably damanged my sense of humor. I think I've probably received over 1000 hours of videos over the years, many of which has foundationally changed my vernacular. He genuinely makes anything he's involved in 10 times funnier. He is also an incredibly caring friend who always is there to help regardless of if it's shopping for toasters online or hard labor. If you get a chance to talk to Marcus, see what he's been cooking"   },
    { name: "Carolyn & Kelsey Kamp",    role: "Junior Bridesmaids",   image: "../images/wedding-party/carolyn-kelsey.jpg",  rotation: "1deg",  flavor: "Jess met Carolyn and Kelsey the day they were born! Jess, Carolyn, and Kelsey have spent countless holidays and family events together swimming in backyard pools, taking obligatory family photos, and joking around with the youngest cousins (the flower girl and ring bearer). Though Jess can still remember the girls when they were babies, Carolyn and Kelsey have quickly grown up and now make Jess feel like an old lady! If you get the chance to talk to Carolyn and Kelsey, be sure to ask about their sports, as they keep very busy with cross country/track and gymnastics!"  },
    { name: "Brian Arnesen",   role: "Groomsmen",           image: "../images/wedding-party/brian.jpg",  rotation: "-2deg", flavor: "I met Brian when I was a freshman in high school. He also biked to school and I made the mistake of giving him and his friends my lock combo. I think after I figured out how to unlock my bike from 10' up that tree is when we really became friends. Even when he is relegated to eating exclusively corn tortillas and crunchy peanutbutter or only ozzy bars and pickles for a week he is the vibe setter. Pure of heart and full of whimsy Brian is the world's greatest travel partner."     },
    { name: "Kyle Polito",     role: "Groomsmen",           image: "../images/wedding-party/kyle.jpg",  rotation: "-1deg", flavor: "Although you would never guess from pictures, Jess and Kyle are in fact twins! Jess and Kyle grew up together, alternating between arguing and playing games like Super Mario Bros or seeing how high they could bounce Jess on the trampoline. These days, Jess and Kyle live far apart, and call each other way more often than they would have guessed they would when they were kids. Kyle is a kind soul who loves a good laugh. When Kyle sees Jess and Ben, he can often be found chatting up Ben and swapping music recommendations. If you get the chance to talk to Kyle, you may want to ask about what he’s been listening to recently!"     },
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