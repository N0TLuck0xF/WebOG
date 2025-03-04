const users = {};

// Create a new user (for registration)
function createUser(username, password) {
    if (users[username]) {
        return { success: false, message: 'Username already taken' };
    }

    // Simple password hashing (for demonstration only, use a better hashing method in production)
    const hashedPassword = hashPassword(password);
    users[username] = { username, password: hashedPassword };

    return { success: true, message: 'User created successfully' };
}

// Authenticate a user (for login)
function authenticateUser(username, password) {
    const user = users[username];
    if (!user) {
        return { success: false, message: 'User not found' };
    }

    if (user.password !== hashPassword(password)) {
        return { success: false, message: 'Incorrect password' };
    }

    return { success: true, message: 'Authentication successful', user };
}

// Hash password (use a real hashing method like bcrypt in production)
function hashPassword(password) {
    // Simple hash function (this is NOT secure, only for demonstration)
    return password.split('').reverse().join('');
}

// Export functions for use in server.js
module.exports = {
    createUser,
    authenticateUser,
    users
};
