const faqData = [
    {q:"How do I RSVP?",
      a:"You can RSVP on our website by filling out the form" + '<a href=\"../pages/rsvp.html\"> here </a>',
      category: "events"
    },
    {q:"Where do I park for the Ceremony?",
        a:"There is parking onsite",
        category: "travel"
    },
    {q:"Where do I park for the Reception?",
        a:"There is valeted parking onsite",
        category:"events"
    },
    {q:"When Should I Arrive to the Church?",
        a:"15 Minutes before the ceremony",
        category: "events"
    },
    {q:"Where can I stay?",
        a:"Please consult the options listed on our" + '<a href=\"../pages/travel.html\"> travel page </a>',
        category: "travel"

    },
    {
        q:"Do I have a plus one?",
        a:"You will see all valid guests when you enter your group code in the RSVP "+ '<a href=\"../pages/rsvp.html\"> form </a>',
        category: "events"
    },
    {
        q:"Are Kids Allowed?",
            a:"Kids will appear in the RSVP "+ '<a href=\"../pages/rsvp.html\"> form </a>'+" if they are intended to attend.",
            category: "events"
    },
    {q: "What is the password to the registry?",
        a: "It is the same as the password to this website and is printed on your invitation",
        category: "other"
    }
];

document.addEventListener('DOMContentLoaded', () => {
    const faqContainer = document.getElementById('faq-container');
    const searchInput = document.getElementById('faq-search');
    const catButtons = document.querySelectorAll('.cat-btn');
    
    let currentCategory = 'all';
    let currentSearch = '';

    function renderFAQs() {
        faqContainer.innerHTML = '';

        const filteredData = faqData.filter(item => {
            const matchesSearch = item.q.toLowerCase().includes(currentSearch) || 
                                  item.a.toLowerCase().includes(currentSearch);
            const matchesCategory = currentCategory === 'all' || item.category === currentCategory;
            
            return matchesSearch && matchesCategory;
        });

        if (filteredData.length === 0) {
            faqContainer.innerHTML = `<p class="no-results">No matches found.</p>`;
            return;
        }

        filteredData.forEach(item => {
            // ... (Same card creation logic as before)
            const card = document.createElement('div');
            card.className = 'faq-card';
            card.innerHTML = `<div class="faq-question">${item.q} <i class="material-icons">expand_more</i></div>
                              <div class="faq-answer">${item.a}</div>`;
            card.addEventListener('click', () => card.classList.toggle('active'));
            faqContainer.appendChild(card);
        });
    }

    // Category Button Listener
    catButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            catButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentCategory = btn.dataset.category;
            renderFAQs();
        });
    });

    // Search Listener
    searchInput.addEventListener('input', (e) => {
        currentSearch = e.target.value.toLowerCase();
        renderFAQs();
    });

    renderFAQs(); // Initial run
});