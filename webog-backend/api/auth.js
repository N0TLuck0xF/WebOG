// Check if user is already logged in
function checkLoginStatus() {
    fetch('/check-login')
        .then(response => response.json())
        .then(data => {
            if (data.loggedIn) {
                document.getElementById('loginStatus').textContent = `Hello, ${data.username}`;
                document.getElementById('logoutBtn').style.display = 'inline-block';
                document.getElementById('loginBtn').style.display = 'none';
            } else {
                document.getElementById('loginStatus').textContent = 'Not logged in';
                document.getElementById('logoutBtn').style.display = 'none';
                document.getElementById('loginBtn').style.display = 'inline-block';
            }
        })
        .catch(error => console.error('Error checking login status:', error));
}

// Handle login form submission
function handleLogin(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            window.location.href = '/dashboard.html';
        } else {
            alert('Invalid username or password');
        }
    })
    .catch(error => console.error('Error during login:', error));
}

// Handle logout action
function handleLogout() {
    fetch('/logout')
        .then(response => {
            if (response.ok) {
                window.location.href = '/login.html';
            } else {
                alert('Logout failed');
            }
        })
        .catch(error => console.error('Error during logout:', error));
}

// Event listeners for login/logout actions
document.addEventListener('DOMContentLoaded', () => {
    checkLoginStatus();

    // Event listener for login form
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    // Event listener for logout button
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', handleLogout);
    }
});
