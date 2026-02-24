const groupDatabase = {
    "LIV1": ["Liv LaRosa", "Will L"],
    "BUSH": ["Susan Bushman", "Mark Bushman", "Ethan Bushman", "Owen Bushman"],
};

let guestCount = 1;

document.addEventListener('DOMContentLoaded', () => {
    const codeBtn = document.getElementById('verify-code-btn');
    const addBtn = document.getElementById('add-guest-btn');
    const container = document.getElementById('additional-guests-container');
    const codeInput = document.getElementById('group-code-input');
    const rsvpForm = document.getElementById('rsvp-form');
    const primarySelect = document.getElementById('full-name-1');
    const codeSection = document.getElementById('rsvp-entry-container');
    const mainWrapper = document.getElementById('rsvp-main-wrapper');
    let maxGroupSize=0;

    // Initial check on load (starts disabled)
    validateGuestFields();

    // Listen for any input changes inside the form
    rsvpForm.addEventListener('input', () => {
        validateGuestFields();
    });
    // --- 1. CODE VERIFICATION ---
    codeBtn.addEventListener('click', () => {
        const code = codeInput.value.toUpperCase();
        const familyList = groupDatabase[code];
        maxGroupSize = groupDatabase[code].length;


        if (familyList) {
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
            alert("Invalid code. Please try again!");
        }
    });

    // --- 2. NAME DEDUPLICATION LOGIC ---
    function getAvailableNames() {
        const code = codeInput.value.toUpperCase();
        const familyList = groupDatabase[code] || [];
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
                            <option value="Vegetarian">Chef's Seasonal Risotto (Veg/Vegan)</option>
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

    if (currentName.value !== "" && currentAttendance.value !== "") {
        if (currentAttendance.value === "no") {
            isComplete = true;
        } else if (currentAttendance.value === "yes") {
            const hasFood = currentEntree && currentEntree.value !== "";
            const hasShuttle = currentTransport && currentTransport.value !== "";
            if (hasFood && hasShuttle) isComplete = true;
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


    // --- 4. DYNAMIC SHOW/HIDE (Laser Targeted by Index) ---
    document.addEventListener('change', (e) => {
        if (e.target.classList.contains('attendance-check')) {
            const index = e.target.getAttribute('data-index');
            const foodSec = document.getElementById(`food-section-${index}`);
            const transSec = document.getElementById(`transport-section-${index}`);

            if (e.target.value === 'yes') {
                if (foodSec) foodSec.style.display = 'block';
                if (transSec) transSec.style.display = 'block';
            } else {
                if (foodSec) foodSec.style.display = 'none';
                if (transSec) transSec.style.display = 'none';
            }
        }
    });
});