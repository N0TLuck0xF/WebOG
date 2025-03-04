// dashboard.js

// Ensure the DOM is fully loaded before running any script
document.addEventListener("DOMContentLoaded", function () {
    // Get the current user from sessionStorage or an API call
    const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));

    // If no user is logged in, redirect to the login page
    if (!currentUser) {
        window.location.href = "login.html";
        return;
    }

    // Display the logged-in user's info in the header
    document.getElementById("username").textContent = currentUser.username;
    document.getElementById("user-role").textContent = currentUser.role;

    // Fetch posts from the API or local storage and display them
    fetchPosts();

    // Add event listener to the logout button
    document.getElementById("logout-button").addEventListener("click", logout);

    // Handle creation of a new post
    document.getElementById("new-post-form").addEventListener("submit", createPost);
});

// Fetch posts from the backend or local storage
function fetchPosts() {
    // Replace with an actual API call if needed
    const posts = JSON.parse(localStorage.getItem("posts")) || [];
    const postsContainer = document.getElementById("posts-container");
    postsContainer.innerHTML = "";

    // Loop through each post and display it
    posts.forEach(post => {
        const postElement = document.createElement("div");
        postElement.classList.add("post");

        // Post Title
        const postTitle = document.createElement("h3");
        postTitle.textContent = post.title;

        // Post Content
        const postContent = document.createElement("p");
        postContent.textContent = post.content;

        // Post Author
        const postAuthor = document.createElement("span");
        postAuthor.classList.add("author");
        postAuthor.textContent = `By: ${post.author}`;

        // Post Created Date
        const postDate = document.createElement("span");
        postDate.classList.add("created-at");
        postDate.textContent = new Date(post.created_at).toLocaleString();

        // Append to the post element
        postElement.appendChild(postTitle);
        postElement.appendChild(postContent);
        postElement.appendChild(postAuthor);
        postElement.appendChild(postDate);

        // Append post element to the posts container
        postsContainer.appendChild(postElement);
    });
}

// Function to handle post creation
function createPost(event) {
    event.preventDefault();

    const title = document.getElementById("post-title").value;
    const content = document.getElementById("post-content").value;
    const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));

    if (!title || !content) {
        alert("Please enter a title and content for the post.");
        return;
    }

    // Create a new post object
    const newPost = {
        id: Date.now(),
        title: title,
        content: content,
        author: currentUser.username,
        authorId: currentUser.id,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    };

    // Store the post in local storage or send to backend
    let posts = JSON.parse(localStorage.getItem("posts")) || [];
    posts.push(newPost);
    localStorage.setItem("posts", JSON.stringify(posts));

    // Clear the form fields
    document.getElementById("post-title").value = "";
    document.getElementById("post-content").value = "";

    // Re-fetch and display the posts
    fetchPosts();
}

// Function to handle user logout
function logout() {
    // Clear session storage and redirect to login page
    sessionStorage.removeItem("currentUser");
    window.location.href = "login.html";
}
