// Ensure the script waits for the HTML to load
document.addEventListener('DOMContentLoaded', () => {
    
    const attendanceSelect = document.getElementById('attendance-1');
    const extraSection = document.getElementById('food-questions-1');

    // This "Event Listener" stays active in the background
    attendanceSelect.addEventListener('change', function() {
        // 'this.value' refers to the value of the dropdown at the moment of change
        if (this.value === 'yes') {
            extraSection.style.display = 'block';
        } else {
            extraSection.style.display = 'none';
        }
    });
});
