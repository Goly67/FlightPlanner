document.getElementById('flightPlanForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const departure = document.getElementById('departure').value;
    const arrival = document.getElementById('arrival').value;
    const squawk = document.getElementById('squawk').value;
    const cruisingLevel = document.getElementById('cruisingLevel').value;

    if (!departure || !arrival || !squawk || !cruisingLevel) {
        alert("Departure, Arrival, Squawk, and Cruising Level are required fields!");
        return;  // Don't submit if any of these fields are empty
    }

    const formData = {
        id: Date.now(),
        callsign: document.getElementById('callsign').value,
        aircraft: document.getElementById('aircraft').value,
        flightRule: document.getElementById('flightRule').value,
        cruisingLevel: document.getElementById('cruisingLevel').value,
        departure: departure,
        arrival: arrival,
        sid: document.getElementById('sid').value || 'Radar vectors',
        squawk: squawk
    };

    let flightPlans = JSON.parse(localStorage.getItem('flightPlans')) || [];
    flightPlans.push(formData);
    localStorage.setItem('flightPlans', JSON.stringify(flightPlans));

    // Dispatch a custom event to notify other pages about the new flight plan
    const event = new Event('flightPlanUpdated');
    window.dispatchEvent(event);

    // Optionally clear the form after submission
    document.getElementById('flightPlanForm').reset();
});

document.getElementById('aircraft').addEventListener('input', function (e) {
    document.getElementById('flightRule').focus(); // Move focus to the next field
});

document.getElementById('flightRule').addEventListener('input', function (e) {
    document.getElementById('cruisingLevel').focus(); // Move focus to the next field
});

// Add event listener for Enter key press in the cruisingLevel input field
document.getElementById('cruisingLevel').addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
        e.preventDefault(); // Prevent form submission
        document.getElementById('squawk').focus(); // Move focus to the next field
    }
});
document.getElementById('squawk').addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
        e.preventDefault(); // Prevent form submission
        document.getElementById('sid').focus(); // Move focus to the next field
    }
});
document.getElementById('sid').addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
        e.preventDefault(); // Prevent form submission
        document.getElementById('departure').focus(); // Move focus to the next field
    }
});
document.getElementById('departure').addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
        e.preventDefault(); // Prevent form submission
        document.getElementById('arrival').focus(); // Move focus to the next field
    }
});
document.getElementById('arrival').addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
        document.getElementById('flightPlanForm').submit(); // Submit the form
    }
});

// Load existing flight plans from local storage
function loadFlightPlans() {
    return JSON.parse(localStorage.getItem('flightPlans')) || []; 
}

// Save flight plans to local storage
function saveFlightPlans(flightPlans) {
    localStorage.setItem('flightPlans', JSON.stringify(flightPlans)); 
}

// Load flight plans on page load
let flightPlans = loadFlightPlans();

// ... (rest of your JavaScript code)

document.getElementById('flightPlanForm').addEventListener('submit', function (e) {
    e.preventDefault();

    // ... (your existing form submission logic)

    // Update the flightPlans array and save to local storage
    flightPlans.push(formData);
    saveFlightPlans(flightPlans);
});

// ... (rest of your JavaScript code)

// Function to update the flight plans when a new plan is created
window.addEventListener('flightPlanUpdated', function() {
    flightPlans = loadFlightPlans(); // Reload flight plans after the update
});


// Function to generate a random squawk code starting with "3"
function generateRandomSquawk() {
const randomPart = Math.floor(1000 + Math.random() * 9000).toString(); // Generates a random 4-digit number
return "3" + randomPart.slice(1); // Ensures the squawk starts with 3
}

// Automatically generate a squawk code and set it in the squawk input field when the page loads
document.getElementById('squawk').value = generateRandomSquawk();
