// auth.js - Full Authentication Script for WebOG

// Wait for the DOM to fully load before running the script
document.addEventListener("DOMContentLoaded", function() {
    // Check if the user is already logged in
    if (localStorage.getItem('loggedIn') === 'true') {
        displayDashboard();
    }

    // Event listener for the login form submission
    document.getElementById("loginForm").addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent the form from submitting normally

        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        // Authenticate the user with the credentials
        if (authenticate(username, password)) {
            // Store the login state in localStorage
            localStorage.setItem('loggedIn', 'true');
            localStorage.setItem('username', username);

            // Redirect or display the dashboard
            displayDashboard();
        } else {
            // If authentication fails, alert the user
            alert("Incorrect username or password. Please try again.");
        }
    });

    // Event listener for logging out
    document.getElementById("logoutButton").addEventListener("click", function() {
        // Remove the login state from localStorage
        localStorage.removeItem('loggedIn');
        localStorage.removeItem('username');
        // Reload the page to show the login form
        window.location.reload();
    });
});

// Simulate user authentication (you can replace this with a real authentication process)
function authenticate(username, password) {
    // Hardcoded valid credentials for demo purposes
    const validUsername = "weboguser";  // Replace with your username
    const validPassword = "password123";  // Replace with your password

    // Compare the entered username and password to the valid credentials
    return username === validUsername && password === validPassword;
}

// Function to display the dashboard after successful login
function displayDashboard() {
    // Hide the login form and show the dashboard
    document.getElementById("loginForm").style.display = "none";
    document.getElementById("dashboard").style.display = "block";

    // Get the username from localStorage and display a personalized welcome message
    const username = localStorage.getItem('username');
    document.getElementById("welcomeMessage").textContent = `Welcome back, ${username}!`;
}
