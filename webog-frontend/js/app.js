// app.js - Full Script for WebOG Dashboard

// Wait for the DOM to load
document.addEventListener("DOMContentLoaded", function() {
    // Check if the user is logged in
    if (localStorage.getItem('loggedIn') === 'true') {
        displayDashboard();
    } else {
        // Display login form if the user is not logged in
        displayLoginForm();
    }

    // Event listener for the login form submission
    document.getElementById("loginForm").addEventListener("submit", handleLogin);
    
    // Event listener for logout
    document.getElementById("logoutButton").addEventListener("click", handleLogout);

    // Event listeners for buttons within the dashboard
    document.getElementById("startButton").addEventListener("click", handleStart);
    document.getElementById("settingsButton").addEventListener("click", handleSettings);
    document.getElementById("helpButton").addEventListener("click", handleHelp);
});

// Handle login action
function handleLogin(event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Simulate authentication (you can replace this with a real authentication process)
    if (authenticate(username, password)) {
        localStorage.setItem('loggedIn', 'true');
        localStorage.setItem('username', username);
        displayDashboard();
    } else {
        alert("Incorrect username or password. Please try again.");
    }
}

// Simulate authentication (replace with real authentication in production)
function authenticate(username, password) {
    const validUsername = "weboguser"; // Example username
    const validPassword = "password123"; // Example password

    return username === validUsername && password === validPassword;
}

// Display the login form
function displayLoginForm() {
    document.getElementById("loginForm").style.display = "block";
    document.getElementById("dashboard").style.display = "none";
}

// Display the dashboard
function displayDashboard() {
    const username = localStorage.getItem('username');
    document.getElementById("welcomeMessage").textContent = `Welcome back, ${username}!`;

    document.getElementById("loginForm").style.display = "none";
    document.getElementById("dashboard").style.display = "block";
}

// Handle logout action
function handleLogout() {
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('username');
    displayLoginForm();
}

// Handle Start button action
function handleStart() {
    alert("Starting your session...");
    // Here you could add code to start the user's session, load their apps, etc.
}

// Handle Settings button action
function handleSettings() {
    alert("Opening settings...");
    // Here you could add code to open the settings page or settings modal
}

// Handle Help button action
function handleHelp() {
    alert("Opening help...");
    // Here you could add code to show help content or open a help section
}
