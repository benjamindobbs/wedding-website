const faqData = [
    ["How do I RSVP?", "You can RSVP on our website by filling out the form" + '<a href=\"../pages/rsvp.html\"> here </a>' ],
    ["Where do I park for the Ceremony?", "There is parking onsite"],
    ["Where do I park for the Reception?", "There is valeted parking onsite"],
    ["When Should I Arrive to the Church?", "15 Minutes before the ceremony"],
    ["Where can I stay?", "Please consult the options listed on our" + '<a href=\"../pages/travel.html\"> travel page </a>'],
    ["Do I have a plus one?", "You will see all valid guests when you enter your group code in the RSVP "+ '<a href=\"../pages/rsvp.html\"> form </a>'],
    ["Are Kids Allowed?","Kids will appear in the RSVP "+ '<a href=\"../pages/rsvp.html\"> form </a>'+" if they are intended to attend."]
];

document.addEventListener('DOMContentLoaded', () => {
    const faqList = document.getElementById('faq-list');

    faqData.forEach(item => {
        // item[0] is the Question, item[1] is the Answer
        const question = item[0];
        const answer = item[1];

        const card = document.createElement('div');
        card.className = 'faq-card';

        card.innerHTML = `
            <div class="faq-question">${question}</div>
            <div class="faq-answer">${answer}</div>
        `;

        faqList.appendChild(card);
    });
});
