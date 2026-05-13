const groupDatabase ={
'POTG':['George Dobbs','Virginia Carman'],
'SSTR':['Hannah Dobbs','Jake Kilburg'],
'BRTR':['Tim Dobbs','Kathryn Cogert'],
'LOUC':['Monica Carman','Jake Burk'],
'KDOB':['Kate Ariail','Coke Ariail'],
'JFON':["Jean Fonvielle"],
'RDOB':['Rebecca Dobbs','Annette Watlington'],
'ANNE':["Anne Butterfield"],
'SHERY':["Sherry Herlehy"],
'SHARN':["Sharon Herlehy"],
'LUSN':["Gillian Lusins"],
'MAGN':['Nancy Magnuson','Phil Magnuson'],
'SZKA':['MaryLynn Szoka','Roy Szoka'],
'LANG':['Sue Lang','James Lang'],
'GNZO':['Evan Gonzales','Victoria Feldman'],
'MRGS':['Marcus Ubarry','Cynthia Petersons'],
'EMAN':['Elliot Bushman'],
'BARN':["Brian Arnesen"],
'THKM':['Dan Aitken','Alexa Meller'],
'JKJN':['Jack Marsalisi','Jen Aguilar'],
'DVND':["Derek Von Neida"],
'RATS':["Jake Gilbert"],
'JOME':["Matthew Jones"],
'DROB':['Dan Roberts','Rachel Roberts'],
'TINI':['Lou Lestini','Mary Lestini'],
'LILS':["Mike Lillis"],
'KRUZ':["Eric Kruzyk"],
'VINY':["Vincent Attianese"],
'FRRH':['Joe Farrah','Lex Farrah'],
'DURS':['Caitlyn D\'Urso','Nick D\'Urso'],
'ANDR':["Jordan Alexandre"],
'POTB':['Judy Polito','Marc Polito'],
'KYLE':["Mr. Kyle Polito"],
'ROSE':["Mrs. Rosemary Hokanson"],
'KAMP':['Julie Kamp','Josh Kamp','Carolyn Kamp','Kelsey Kamp'],
'HOLZ':['Sherri Mittelholzer','Brian Mittelholzer','Ian Mittelholzer','Hannah Mittelholzer'],
'ALAN':['Alan Hokanson','Janet Hall'],
'ADSN':['Al Anderson','Maureen Anderson'],
'BETY':['Grandma Polito'],
'PLTO':['Joe Polito','Mary Polito'],
'FITZ':['Sara Fitzgerald','Ryan Fitzgerald','Gianna Fitzgerald'],
'PNIK':['Catherine Panick','Chad Panick'],
'FOGL':['Nancy Fogle','Don Fogle','Ron Polito','Jackie Polito'],
'LANA':['Lana Polito'],
'DMNK':['Dominick Polito'],
'HEND':['Amy Henderson','Jim Henderson'],
'YSLS':['Aria Yslas','James Yslas'],
'HDRS':['Jaeger Henderson','Stormy Henderson'],
'CADN':['Caden Henderson'],
'SAVG':['Carol Savidge','Ed Savidge'],
'BUSH':['Susan Bushman','Mark Bushman'],
'EBSH':['Ethan Bushman','Sydney Fournier'],
'OBSH':['Owen Bushman','Maella Hassoubi'],
'LRSA':['Katherine LaRosa','Steve LaRosa','Nick LaRosa'],
'HNES':['Lee Haines','Mike Haines'],
'LIVY':['Olivia LaRosa','Will Lonardo'],
'JMAN':['Jess Mann','Dan Schwartz'],
'GRASO':['Nicole Grasso','Johan Ruiz'],
'GRCE':['Grace Imondi'],
'CONI':['Connor Jordan'],
'AMOR':['Alex Amoro'],
'SMYD':['Sam Donovan'],
'MGHA':['Megha Rao'],
'POND':['Emma Pond','Connor Pond'],
'AMKA':['Amanda Coscia','Kaitlin Losauro'],
'FRND':['Helen Wunderlich'],
'KELY':['Kelly Unanue','Mel Brentnall'],
'LEKE':['Lea Morlock','Kenzie Vaughan'],
'ANNA':['Anna Garvey'],
'NIEL':['Kathy Nielsen','Niels Nielsen'],
'SMTH':['Paula Smyth','Blaise Smyth'],
'APZO':['Thalia Apuzzo','Jeff Apuzzo'],
'MEAD':['Kathleen Meade'],
'MLVN':['Liz Melvin','Bob Melvin'],
'GOOB':['Diana Goober','Marty Goober']
}

// Add invitation codes here to show the welcome drinks RSVP question to that party
const welcomeDrinksGroups = new Set([
  'POTG','SSTR','BRTR','LOUC','KDOB','JFON','RDOB','ANNE','SHERY','SHARN','GNZO','MRGS','EMAN','BARN','THKM','POTB','KYLE','ROSE','KAMP','HOLZ','PLTO','FITZ','PNIK','FOGL','LANA','DMNK','HEND','CADN','LIVY','POND','FRND'
]);

function stripTitle(name) {
    return name.replace(/^(mr\.?|mrs\.?|ms\.?|miss|dr\.?|prof\.?|rev\.?|sir)\s+/i, '').trim();
}

const nameToCode = {};
for (const [code, names] of Object.entries(groupDatabase)) {
    for (const name of names) {
        nameToCode[name.toLowerCase()] = code;
        nameToCode[stripTitle(name).toLowerCase()] = code;
    }
}

let guestCount = 1;

function findGroupByName(search) {
    const normalized = search.trim().toLowerCase();
    for (const key in groupDatabase) {
        const match = groupDatabase[key].find(name => name.toLowerCase().includes(normalized));
        if (match) return groupDatabase[key];
    }
    return null;
}

document.addEventListener('DOMContentLoaded', () => {
    const codeBtn = document.getElementById('verify-code-btn');
    const addBtn = document.getElementById('add-guest-btn');
    const container = document.getElementById('additional-guests-container');
    const nameInput = document.getElementById('name-search-input');
    const rsvpForm = document.getElementById('rsvp-form');
    const primarySelect = document.getElementById('full-name-1');
    const codeSection = document.getElementById('rsvp-entry-container');
    const mainWrapper = document.getElementById('rsvp-main-wrapper');
    let maxGroupSize=0;
    let isWelcomeDrinksEligible = false;
    let currentGroupCode = null;

    // Initial check on load (starts disabled)
    validateGuestFields();

    // Listen for any input changes inside the form
    rsvpForm.addEventListener('input', () => {
        validateGuestFields();
    });
    nameInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') codeBtn.click();
    });

    // --- 1. NAME LOOKUP ---
    codeBtn.addEventListener('click', () => {
        const input = nameInput.value.trim();
        const code = nameToCode[input.toLowerCase()] ?? nameToCode[stripTitle(input).toLowerCase()];
        const familyList = code ? groupDatabase[code] : null;

        if (familyList) {
            currentGroupCode = code;
            maxGroupSize = familyList.length;
            isWelcomeDrinksEligible = welcomeDrinksGroups.has(code);

            primarySelect.innerHTML = '<option value="" disabled selected>-- Select Your Name --</option>';
            familyList.forEach(name => {
                const opt = document.createElement('option');
                opt.value = name;
                opt.textContent = name;
                primarySelect.appendChild(opt);
            });

            // Smooth UI Transition
            codeSection.style.display = 'none';
            rsvpForm.style.display = 'block';
            mainWrapper.classList.remove('rsvp-hero-layout');
            mainWrapper.style.height = 'auto';
            mainWrapper.style.paddingTop = '60px';
        } else {
            alert("We couldn't find your name. Please check your spelling and try again.");
        }
    });

    // --- 2. NAME DEDUPLICATION LOGIC ---
    function getAvailableNames() {
        const familyList = currentGroupCode ? groupDatabase[currentGroupCode] : [];
        const usedNames = [];
        document.querySelectorAll('.guest-name-select').forEach(sel => {
            if (sel.value) usedNames.push(sel.value);
        });
        return familyList.filter(name => !usedNames.includes(name));
    }

    // --- 3. RENDER NEW GUEST ---
    function renderNewGuest(availableNames) {
        guestCount++;
        const guestDiv = document.createElement('div');
        guestDiv.className = 'guest-entry extra-guest';
        guestDiv.id = `guest-entry-${guestCount}`;

        let nameOptions = availableNames.map(name => `<option value="${name}">${name}</option>`).join('');

        guestDiv.innerHTML = `
            <div class="guest-header">
                <h3>Guest ${guestCount}</h3>
                <button type="button" class="remove-guest-btn" onclick="this.closest('.guest-entry').remove()"><i class="material-icons">close</i>Remove Guest</button>
            </div>
            <div class="form-main-grid">
                <div class="form-group">
                    <label>Guest Name</label>
                    <select name="name-${guestCount}" class="guest-name-select" required>
                        <option value="" disabled selected>-- Select Name --</option>
                        ${nameOptions}
                    </select>
                </div>
                <div class="form-group">
                    <label>Will they attend?</label>
                    <select name="attendance-${guestCount}" class="attendance-check" data-index="${guestCount}" required>
                        <option value="" disabled selected>Choose an option</option>
                        <option value="yes">Yes, they'll be there!</option>
                        <option value="no">Regretfully, no</option>
                    </select>
                </div>
            </div>
            
            <div id="food-section-${guestCount}" class="food-section" style="display: none;">
                <div class="form-main-grid">
                    <div class="form-group">
                        <label>Entree Choice</label>
                        <select name="entree-${guestCount}">
                            <option value="" disabled selected>Choose an option</option>
                            <option value="Beef">Braised Boneless Short Ribs</option>
                            <option value="Chicken">Preserved Lemon Chicken</option>
                            <option value="Fish">Chilean Oven Roasted Sea Bass</option>
                            <option value="Vegetarian">Chef's Seasonal Risotto (Vegetarian)</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Dietary Restrictions</label>
                        <textarea name="dietary-${guestCount}" rows="2"></textarea>
                    </div>
                </div>
            </div>

            <div id="transport-section-${guestCount}" class="transport-section" style="display: none;">
                <div class="form-group">
                    <label>Shuttle Service</label>
                    <select name="transport-${guestCount}">
                        <option value="" disabled selected>Choose an option</option>
                        <option value="Yes">Yes, please</option>
                        <option value="No">No, thank you</option>
                    </select>
                </div>
            </div>

            ${isWelcomeDrinksEligible ? `
            <div id="welcome-drinks-section-${guestCount}" class="welcome-drinks-section" style="display: none;">
                <div class="form-group">
                    <label>Welcome Drinks</label>
                    <p style="font-size: 0.8rem; margin-bottom: 10px; color: #64748b;">You're invited to join us for welcome drinks the evening before the wedding! Please let us know if you'll be able to make it.</p>
                    <select name="welcome-drinks-${guestCount}">
                        <option value="" disabled selected>Choose an option</option>
                        <option value="Yes">Yes, I'll be there!</option>
                        <option value="No">No, thank you</option>
                    </select>
                </div>
            </div>` : ''}
        `;
        container.appendChild(guestDiv);
        document.getElementById('add-guest-btn').disabled = true;
    }
function validateGuestFields() {
    const addGuestBtn = document.getElementById('add-guest-btn');
    const nameSelects = document.querySelectorAll('.guest-name-select');
    const attendanceSelects = document.querySelectorAll('.attendance-check');
    const entreeSelects = document.querySelectorAll('select[name^="entree-"]');
    const transportSelects = document.querySelectorAll('select[name^="transport-"]');
    const welcomeDrinksSelects = document.querySelectorAll('select[name^="welcome-drinks-"]');

    const currentCount = nameSelects.length;
    const idx = currentCount - 1;

    // 1. Check if the group is already full
    if (currentCount >= maxGroupSize) {
        addGuestBtn.disabled = true;
        addGuestBtn.innerText = "Group Limit Reached";
        return; // Stop here
    }

    // 2. Otherwise, run your existing sleek validation
    let isComplete = false;
    const currentName = nameSelects[idx];
    const currentAttendance = attendanceSelects[idx];
    const currentEntree = entreeSelects[idx];
    const currentTransport = transportSelects[idx];
    const currentWelcomeDrinks = welcomeDrinksSelects[idx];

    if (currentName.value !== "" && currentAttendance.value !== "") {
        if (currentAttendance.value === "no") {
            isComplete = true;
        } else if (currentAttendance.value === "yes") {
            const hasFood = currentEntree && currentEntree.value !== "";
            const hasShuttle = currentTransport && currentTransport.value !== "";
            const hasWelcomeDrinks = !isWelcomeDrinksEligible || (currentWelcomeDrinks && currentWelcomeDrinks.value !== "");
            if (hasFood && hasShuttle && hasWelcomeDrinks) isComplete = true;
        }
    }

    addGuestBtn.disabled = !isComplete;
    addGuestBtn.innerHTML = isComplete ? '+ Add Another Guest' : 'Finish current guest to add more';
}

    addBtn.addEventListener('click', () => {
        const available = getAvailableNames();
        if (available.length === 0) {
            alert("No more guests found in your group.");
            return;
        }
        renderNewGuest(available);
    });


    // --- 5. REVIEW STEP ---
    const reviewContainer = document.getElementById('rsvp-review-container');

    rsvpForm.addEventListener('submit', (e) => {
        e.preventDefault();
        buildAndShowReview();
    });

    function buildAndShowReview() {
        const data = new FormData(rsvpForm);
        const guestCount = rsvpForm.querySelectorAll('.guest-name-select').length;
        const entreeLabels = {
            'Beef': 'Braised Boneless Short Ribs',
            'Chicken': 'Preserved Lemon Chicken',
            'Fish': 'Chilean Oven Roasted Sea Bass',
            'Vegetarian': "Chef's Seasonal Risotto (Vegetarian)"
        };

        let guestsHTML = '';
        for (let i = 1; i <= guestCount; i++) {
            const name = data.get(`name-${i}`) || '—';
            const attendance = data.get(`attendance-${i}`);
            const attendanceLabel = attendance === 'yes' ? 'Attending' : 'Not attending';

            let detailsHTML = '';
            if (attendance === 'yes') {
                const entreeVal = data.get(`entree-${i}`);
                const entree = entreeLabels[entreeVal] || entreeVal || '—';
                const dietary = data.get(`dietary-${i}`) || 'None';
                const transport = data.get(`transport-${i}`) || '—';
                detailsHTML = `
                    <div class="review-detail"><span>Entree:</span> ${entree}</div>
                    <div class="review-detail"><span>Dietary Restrictions:</span> ${dietary}</div>
                    <div class="review-detail"><span>Shuttle:</span> ${transport}</div>`;
            }

            guestsHTML += `
                <div class="review-guest">
                    <div class="review-guest-name">${name} &mdash; <em>${attendanceLabel}</em></div>
                    ${detailsHTML}
                </div>`;
        }

        const email = data.get('email-1') || '—';

        reviewContainer.innerHTML = `
            <div class="form-container">
                <h2 style="margin-bottom: 5px;">Review Your RSVP</h2>
                <p style="color: var(--text-muted); margin-bottom: 25px;">Please confirm your details before submitting.</p>
                <div class="review-email"><span>Contact Email:</span> ${email}</div>
                <div id="review-guests-list">${guestsHTML}</div>
                <div class="review-actions">
                    <button type="button" id="review-back-btn" class="btn-back">&#8592; Go Back &amp; Edit</button>
                    <button type="button" id="review-submit-btn" class="submit-btn">Confirm &amp; Submit RSVP</button>
                </div>
            </div>`;

        reviewContainer.style.display = 'block';
        rsvpForm.style.display = 'none';

        document.getElementById('review-back-btn').addEventListener('click', () => {
            reviewContainer.style.display = 'none';
            rsvpForm.style.display = 'block';
        });

        document.getElementById('review-submit-btn').addEventListener('click', () => {
            const submitBtn = document.getElementById('review-submit-btn');
            submitBtn.disabled = true;
            submitBtn.textContent = 'Submitting...';

            fetch(rsvpForm.action, {
                method: 'POST',
                body: new FormData(rsvpForm),
                headers: { 'Accept': 'application/json' }
            }).then(response => {
                if (response.ok) {
                    reviewContainer.innerHTML = `
                        <div class="form-container" style="text-align: center; padding: 60px 40px;">
                            <span class="rsvp-eyebrow">All done!</span>
                            <h2 style="margin: 10px 0 15px;">We can't wait to see you!</h2>
                            <p style="color: var(--text-muted);">Your RSVP has been received. We'll be in touch as the big day approaches.</p>
                        </div>`;
                } else {
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'Confirm & Submit RSVP';
                    alert('Something went wrong. Please try again.');
                }
            }).catch(() => {
                submitBtn.disabled = false;
                submitBtn.textContent = 'Confirm & Submit RSVP';
                alert('Something went wrong. Please try again.');
            });
        });
    }

    // --- 4. DYNAMIC SHOW/HIDE (Laser Targeted by Index) ---
    document.addEventListener('change', (e) => {
        if (e.target.classList.contains('attendance-check')) {
            const index = e.target.getAttribute('data-index');
            const foodSec = document.getElementById(`food-section-${index}`);
            const transSec = document.getElementById(`transport-section-${index}`);

            const welcomeDrinksSec = document.getElementById(`welcome-drinks-section-${index}`);

            if (e.target.value === 'yes') {
                if (foodSec) foodSec.style.display = 'block';
                if (transSec) transSec.style.display = 'block';
                if (isWelcomeDrinksEligible && welcomeDrinksSec) welcomeDrinksSec.style.display = 'block';
            } else {
                if (foodSec) foodSec.style.display = 'none';
                if (transSec) transSec.style.display = 'none';
                if (welcomeDrinksSec) welcomeDrinksSec.style.display = 'none';
            }
        }
    });
});