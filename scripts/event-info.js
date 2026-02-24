const eventDetails = {
    ceremony: [
        {line1: "Ceremony • 3:30 PM • Emanuel Lutheran Church",url1:null},
        {line2:"60 Church St, Manchester, CT • On Site Parking",url2:"https://maps.app.goo.gl/tdSsSY2uhXiaKwE99"}
    ],
    reception: [
        {line1: "Reception • 6:00PM • The Starting Gate • Semi-Formal",url1:null},
        {line2:"128 Wilbraham Rd Banquet Hall, Hampden, MA • Valet Parking", url2:"https://maps.app.goo.gl/f9y9hrE75YpYtJi87"}
    ]
};

document.addEventListener('DOMContentLoaded', () => {
    const renderModern = (id, data) => {
        const container = document.getElementById(id);
        if (!container) return;

        // Split data[1].line2 by the bullet point if it exists
        const parts = data[1].line2.split('•').map(p => p.trim());

        container.innerHTML = `
            <div class="line-1">${data[0].line1}</div>
            <div class="line-2-wrapper">
                <a href="${data[1].url2}" target="_blank" class="info-pill link-pill">
                    <i class="material-icons">place</i> ${parts[0]}
                </a>
                <div class="info-pill">
                    <i class="material-icons">local_parking</i> ${parts[1]}
                </div>
            </div>
        `;
    };

    renderModern('ceremony-info', eventDetails.ceremony);
    renderModern('reception-info', eventDetails.reception);
});