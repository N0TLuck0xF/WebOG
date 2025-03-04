// login.js

// Ensure the DOM is fully loaded before executing any scripts
document.addEventListener("DOMContentLoaded", function () {
    // Add event listener for the login form submission
    document.getElementById("login-form").addEventListener("submit", loginUser);
});

// Function to handle user login
function loginUser(event) {
    event.preventDefault();

    // Get the values of the username/email and password input fields
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Validate input fields
    if (!email || !password) {
        alert("Please enter both email and password.");
        return;
    }

    // Fetch the user data (here it's hardcoded for the sake of this example, but in a real app, this would be an API call)
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Find the user that matches the email
    const user = users.find(user => user.email === email);

    if (!user) {
        alert("No user found with this email address.");
        return;
    }

    // Check if the provided password matches the stored password
    // In a real app, you'd use a hashing function to verify the password securely
    const passwordMatch = bcrypt.compareSync(password, user.password);

    if (passwordMatch) {
        // On successful login, store the user in sessionStorage
        sessionStorage.setItem("currentUser", JSON.stringify(user));

        // Redirect to the dashboard
        window.location.href = "dashboard.html";
    } else {
        alert("Incorrect password.");
    }
}
