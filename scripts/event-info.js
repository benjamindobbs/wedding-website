const eventDetails = {
    ceremony: {
        title: "Ceremony",
        time: "3:30 PM",
        endTime: "4:00 PM",
        timeStart: "20260815T153000",
        timeEnd:   "20260815T160000",
        venue: "Emanuel Lutheran Church",
        address: "60 Church St, Manchester, CT",
        mapsUrl: "https://maps.app.goo.gl/tdSsSY2uhXiaKwE99",
        details: "We joyfully invite you to celebrate our marriage at Emanuel Lutheran Church. Please plan to arrive by 3:15 PM. The ceremony will be held inside the church."
    },
    reception: {
        title: "Reception",
        time: "5:30 PM",
        endTime: "10:30 PM",
        timeStart: "20260815T173000",
        timeEnd:   "20260815T223000",
        venue: "The Starting Gate",
        address: "128 Wilbraham Rd, Hampden, MA",
        mapsUrl: "https://maps.app.goo.gl/jgFsfYf6QJjdai8Y9",
        details: "Please join us for an evening of dinner and dancing at The Starting Gate in Hampden, Massachusetts. Cocktail hour will begin at five-thirty, and a formal dinner to follow at six-thirty. "
    },
    afterParty: {
        title: "After Party",
        time: "11:00 PM",
        endTime: "12:00 AM",
        timeStart: "20260815T230000",
        timeEnd:   "20260816T000000",
        venue: "Cambria Hotel",
        address: "1000 Long Leaf Ln, South Windsor, CT",
        mapsUrl: "https://maps.google.com/?q=1000+Long+Leaf+Ln,+South+Windsor,+CT+06074",
        details: "We invite you to join us for a relaxed gathering at the Cambria Hotel bar following the reception. The hotel bar remains open until midnight. We hope you will join us, buy a drink, and close the evening together."
    }
};

function addToCalendar(type) {
    const ev = eventDetails[type];
    const params = new URLSearchParams({
        action: 'TEMPLATE',
        text: `Jess & Ben's Wedding — ${ev.title}`,
        dates: `${ev.timeStart}/${ev.timeEnd}`,
        details: ev.details,
        location: `${ev.venue}, ${ev.address}`,
        ctz: 'America/New_York'
    });
    window.open(`https://calendar.google.com/calendar/render?${params}`, '_blank');
}

document.addEventListener('DOMContentLoaded', () => {
    const render = (id, data, type) => {
        const container = document.getElementById(id);
        if (!container) return;

        container.innerHTML = `
            <h2 class="pamphlet-event-title">${data.title}</h2>
            <div class="pamphlet-time">${data.time} – ${data.endTime}</div>
            <div class="pamphlet-venue">${data.venue}</div>
            <div class="pamphlet-address">${data.address}</div>
            <div class="pamphlet-rule"></div>
            <p class="pamphlet-details">${data.details}</p>
            <div class="pamphlet-actions">
                <a href="${data.mapsUrl}" class="pamphlet-btn" target="_blank" rel="noopener">
                    <i class="material-icons">directions</i> Get Directions
                </a>
                <button class="pamphlet-btn" onclick="addToCalendar('${type}')">
                    <i class="material-icons">event</i> Add to Calendar
                </button>
            </div>
        `;
    };

    render('ceremony-pamphlet', eventDetails.ceremony, 'ceremony');
    render('reception-pamphlet', eventDetails.reception, 'reception');
    render('after-party-pamphlet', eventDetails.afterParty, 'afterParty');
});
