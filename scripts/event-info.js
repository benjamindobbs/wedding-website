const eventDetails = {
    ceremony: {
        title: "Ceremony",
        time: "3:30 PM",
        venue: "Emanuel Lutheran Church",
        address: "60 Church St, Manchester, CT",
        mapsUrl: "https://maps.app.goo.gl/tdSsSY2uhXiaKwE99",
        parking: "on-site parking"
    },
    reception: {
        title: "Reception",
        time: "6:00 PM",
        venue: "The Starting Gate",
        address: "128 Wilbraham Rd, Hampden, MA",
        mapsUrl: "https://maps.app.goo.gl/jgFsfYf6QJjdai8Y9",
        dresscode: "semi-formal",
        parking: "valet parking"
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const render = (id, data) => {
        const container = document.getElementById(id);
        if (!container) return;

        const extras = [data.dresscode, data.parking].filter(Boolean).join(', ');

        container.innerHTML = `
            <div class="line-1">${data.title}</div>
            <div class="line-prose">
                ${data.time} at <a href="${data.mapsUrl}" target="_blank">${data.venue}</a>, ${data.address}${extras ? ` — ${extras}` : ''}
            </div>
        `;
    };

    render('ceremony-info', eventDetails.ceremony);
    render('reception-info', eventDetails.reception);
});
