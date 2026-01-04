//TODO
//add dietary restrictions
//flowery language
const groupDatabase = {
    "LIV1": ["Liv LaRosa","Will L"],
    "BUSH": ["Susan Bushman","Mark Bushman", "Ethan Bushman", "Owen Bushman"],
    "Default": ["Please enter primary name first"]
};
let guestCount = 1;

document.addEventListener('DOMContentLoaded', () => {
    const codeBtn = document.getElementById('verify-code-btn');
    const addBtn = document.getElementById('add-guest-btn');
    const container = document.getElementById('additional-guests-container');
    const codeInput = document.getElementById('group-code-input');
    const rsvpForm = document.getElementById('rsvp-form');
    const primarySelect = document.getElementById('full-name-1');
    const codeSection = document.getElementById('code-entry-section');
    const primaryNameInput = document.getElementById('full-name-1');

    codeBtn.addEventListener('click', () => {
        const code = codeInput.value.toUpperCase();
        const familyList = groupDatabase[code];

        if (familyList) {
            // Populate the primary name dropdown
            primarySelect.innerHTML = '<option value="" disabled selected>-- Select Your Name --</option>';
            familyList.forEach(name => {
                const opt = document.createElement('option');
                opt.value = name;
                opt.textContent = name;
                primarySelect.appendChild(opt);
            });

            // Switch views
            codeSection.style.display = 'none';
            rsvpForm.style.display = 'block';
        } else {
            document.getElementById('code-error').style.display = 'block';
        }
    });


    // FUNCTION: Create and append the new guest UI
    const renderNewGuest = (availableNames) => {
        guestCount++;
        const guestDiv = document.createElement('div');
        guestDiv.className = 'guest-entry-wrapper';
        
        guestDiv.innerHTML = `
            <hr>
            <h3>Guest #${guestCount}</h3>
            <div class="form-group">
                <label>Full Name</label>
                <select name="name-${guestCount}" class="guest-name-select" required>
                    <option value="" disabled selected>-- Select Name --</option>
                    ${availableNames.map(name => `<option value="${name}">${name}</option>`).join('')}
                </select>
            </div>
            <div class="form-group">
                <label>Attendance</label>
                <select name="attendance-${guestCount}" class="attendance-check" required>
                    <option value="" disabled selected>Will they attend?</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                </select>
            </div>
            
            <div class="food-section" style="display: none;">
                <div class="form-group">
                    <label>Entree Choice</label>
                    <select name="entree-${guestCount}">
                        <option value="" disabled selected>Select a meal</option>
                        <option value="Beef">Steak</option>
                        <option value="Chicken">Chicken</option>
                        <option value="Vegetarian">Vegetarian</option>
                    </select>
                </div>
            </div>
            
            <button type="button" class="remove-btn">Remove Guest</button>
        `;
        container.appendChild(guestDiv);
    };
    // MAIN CLICK HANDLER
    addBtn.addEventListener('click', () => {
        const wrappers = container.querySelectorAll('.guest-entry-wrapper');
        let nameField, attField;

        // Validation Logic
        if (wrappers.length === 0) {
            nameField = primaryNameInput;
            attField = document.querySelector('select[name="attendance-1"]');
        } else {
            const lastRow = wrappers[wrappers.length - 1];
            nameField = lastRow.querySelector('.guest-name-select');
            attField = lastRow.querySelector('.attendance-check');
        }

        // Check if current guest is complete
        if (!nameField.value || !attField.value) {
            alert("Please finish the current guest entry before adding another.");
            return;
        }

        // Deduplication Logic
        const getAvailableNames = () => {
            const code = codeInput.value.toUpperCase();
            const familyList = groupDatabase[code] || [];
            const usedNames = [];
            
            // Collect all currently selected values
            document.querySelectorAll('select[name^="name-"]').forEach(sel => {
                if (sel.value) usedNames.push(sel.value);
            });

            return familyList.filter(name => !usedNames.includes(name));
        };

        renderNewGuest(getAvailableNames());

        // Auto-disable if that was the last possible family member
        if (getAvailableNames().length === 1) {
            addBtn.disabled = true;
            addBtn.innerText = "All guests added";
        }
    });

    // 2. Logic to watch for "Yes" value changes
    // We listen to the whole form and check if the changed element is an 'attendance-check'
    document.getElementById('rsvp-form').addEventListener('change', (e) => {
        if (e.target.classList.contains('attendance-check')) {
            // Find the wrapper div this specific guest belongs to
            const wrapper = e.target.closest('.guest-entry-wrapper') || e.target.closest('.form-container');
            
            // Find the food section inside that wrapper
            const foodSection = wrapper.querySelector('.food-section');
            const foodSelect = foodSection ? foodSection.querySelector('select') : null;

            if (foodSection && foodSelect) {
                if (e.target.value === 'yes') {
                    foodSection.style.display = 'block';
                    foodSelect.required = true;
                } else {
                    foodSection.style.display = 'none';
                    foodSelect.required = false;
                    foodSelect.value = ""; // Clear selection if they change to 'No'
                }
            }
        }
    });
    // Remove Guest Logic
    container.addEventListener('click', (e) => {
        if (e.target.classList.contains('remove-btn')) {
            e.target.closest('.guest-entry-wrapper').remove();
            addBtn.disabled = false;
            addBtn.innerText = "+ Add Another Guest";
        }
    });
});