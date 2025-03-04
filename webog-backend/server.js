const express = require('express');
const path = require('path');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');
const app = express();

// Port configuration
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Session setup for basic auth
app.use(cookieSession({
    name: 'session',
    keys: ['supersecret'], // Change to a random secret key
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Sample User Database (you can replace this with a real database)
const users = {
    user1: { username: 'user1', password: 'password123' }, // Replace with hashed passwords in production
    user2: { username: 'user2', password: 'password456' }
};

// Middleware for authenticating the user
function checkAuth(req, res, next) {
    if (!req.session.user) {
        return res.redirect('/login.html');
    }
    next();
}

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html')); // Serve homepage
});

app.get('/dashboard.html', checkAuth, (req, res) => {
    res.sendFile(path.join(__dirname, 'dashboard.html')); // Serve the dashboard, only if authenticated
});

// Login route (for POST requests to authenticate users)
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Check if username exists and the password matches
    if (users[username] && users[username].password === password) {
        req.session.user = { username: username }; // Store the user's session
        return res.redirect('/dashboard.html'); // Redirect to the dashboard after successful login
    }

    // If login fails, redirect back to login page with an error
    res.redirect('/login.html?error=Invalid credentials');
});

// Logout route
app.get('/logout', (req, res) => {
    req.session = null; // Destroy the session
    res.redirect('/login.html'); // Redirect to login page after logout
});

// For any other route, return a 404 error
app.use((req, res) => {
    res.status(404).send('Page Not Found');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
