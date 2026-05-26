// @ts-nocheck
const faqData = [
    {q:"How do I RSVP?",
      a:"Please kindly scan the QR code on your invitation, or follow this link to fill out our <a href=\"../rsvp/\"> RSVP form</a>. RSVP forms need to be completed once by one member of your party listed on the invitation.<br/><br/>The form will ask you to enter the full name of a member of your party to begin.<br/><br/>Once you are able to proceed, you will need to RSVP with your information including entree choice, dietary restrictions if applicable, and let us know if you will be using the shuttle we provide for the reception. Once you fill in your answers to the questions, you will be able to add additional family members’ or significant others’ answers by selecting \"Add another guest.\"<br/><br/>Once you have completed all of the questions for each guest in your party, please select \"Review RSVP\" and submit the form once all of the information is correct.",
      category: "events"
    },
    {q:"Where do I park for the Ceremony?",
        a:"At the church, there is plenty of parking available! There are smaller parking lots located on either side of the church building, including handicap parking. There is also a parking lot across the street from the church, as well as street parking.",
        category: "travel"
    },
    {q:"Where do I park for the Reception?",
        a:"At The Starting Gate, please follow the long road until you reach the valet, who will be stationed at the main entrance to the venue. You must pass all of the other buildings, as the venue is at the end of the road. The valet will park your car in the parking lot at the top of the hill complimentary.",
        category:"events"
    },
    {q:"When Should I Arrive to the Church?",
        a:"Please kindly arrive 30 minutes prior to the ceremony, which will begin at 3:30pm.",
        category: "events"
    },
    {q:"Where can I stay?",
        a:"Please review the options listed on our <a href=\"../travel/\"> travel page</a>, as you will find recommended hotels and hotel block information. We are recommending guests stay in the Manchester/South Windsor area.",
        category: "travel"
    },
    {q:"Will there be a shuttle?",
        a:"There will not be transportation available for the ceremony, so please plan your travel to and from the ceremony. The recommended hotels are located about 15 minutes from the church. You will have some time to freshen up, check in to your hotel, or have a drink between the ceremony and the reception.<br/><br/>For the reception, transportation will be available for guests from one of the recommended hotels to the venue, and then from the venue back to the hotel. If you are intending to utilize the shuttle we are providing, you must indicate this on your RSVP.<br/><br/>Please note, you are able to leave your car at the Cambria hotel overnight, even if you are not a hotel guest. We know some of our guests live in town, so leaving your car overnight may be best if you want to utilize the shuttle back to South Windsor, and then use a ride-share service home from the local hotel.<br/><br/>Guests who indicate they will use the shuttle will receive an email closer to the wedding date with detailed information about the shuttle location and timing.",
        category:"travel"
    },
    {q:"Can I use ride-share (Uber/Lyft) to and from the ceremony/reception?",
        a:"Ride-share will likely be available to and from the ceremony, but we recommend you schedule the ride in advance in order to ensure you are able to arrive on time. Ride-share is NOT available to and from the reception, as indicated by our venue. Please plan to arrive via shuttle or personal vehicle.",
        category:"travel"
    },
    {
    q:"Do I have a plus one?",
        a:"You will be able to see all of the members of your party while completing the RSVP form.",
        category: "events"
    },
    {q: "What is the password to the registry?",
        a: "The password is: whosthatbrideitsjess!",
        category: "other"
    },
    {q: "What is the dress code?",
        a:"If you’re anything like us, you don’t understand wedding dress code language, so please accept these requests instead:<ul> <li> Please wear either a suit or a midi/floor length dress. </li> <li> Dresses are encouraged to be colorful, but preferably not solid blue. </li> <li> All wedding events will take place indoors, so no need to worry about heels on grass.</li><li>As always, do not wear white!</li></ul>",
        category:"events"
    },
    {q:"Is there an open bar?",
        a:"Yes! Please plan your travel accordingly, and consider RSVP-ing yes to the shuttle if you do not have a designated driver.",
        category:"events"
    },
    {q:"Is there an after-party?",
        a:"Yes! There will be a casual after-party at the Cambria hotel bar. We would love for you to join, and you are welcome to join even if you are not staying at that hotel. Depending on the weather, please join the bride and groom either in the bar or on the patio. The hotel bar will be open until midnight, and you are welcome to buy a drink and end the night with us!",
        category:"events"
    },
    {q:"When will extended family photos take place?",
        a:"Jess and Ben are very excited to celebrate with so many out of town family members! If you are a member of the Dobbs, Carman, Polito, or Hokanson family, please make sure to arrive on time or a few minutes early to the cocktail hour.<br/><br/>Family photos will take place at the start of cocktail hour. You will be directed to proceed to the \"wedding garden,\" which overlooks the golf course.<br/><br/>We want to ensure everyone is included in the photos, so please make sure to join us at the start of cocktail hour for those large group photos!!",
        category:"events"
    },
    {q:"When do I need to RSVP by?",
        a:"Please complete the RSVP by July 1st.",
        category:"events"
    }
];

document.addEventListener('DOMContentLoaded', () => {
    const faqContainer = document.getElementById('faq-container');

    faqData.forEach(item => {
        const card = document.createElement('div');
        card.className = 'faq-card';
        card.innerHTML = `<div class="faq-question">${item.q} <i class="material-icons">expand_more</i></div>
                          <div class="faq-answer">${item.a}</div>`;
        card.addEventListener('click', () => {
            const isActive = card.classList.contains('active');
            faqContainer.querySelectorAll('.faq-card.active').forEach(c => c.classList.remove('active'));
            if (!isActive) card.classList.add('active');
        });
        faqContainer.appendChild(card);
    });
});