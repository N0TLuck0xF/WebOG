-- Create the Users table
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'user') DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create the Posts table
CREATE TABLE IF NOT EXISTS posts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    author_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE SET NULL
);

-- Create the Comments table
CREATE TABLE IF NOT EXISTS comments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    post_id INT,
    author_id INT,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
    FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE SET NULL
);

-- Sample Data Insertion for Users Table (aligned with provided data)
INSERT INTO users (id, username, email, password, role, created_at, updated_at)
VALUES
(1, 'admin7887', 'bitoutlaws@gmail.com', '$2b$10$zYhGvOxl9pkLQ9M/l8R4q.Qcx5TqS1XyrZT1mwG5g3I2y.aJB3nE6', 'admin', '2025-03-04T08:00:00Z', '2025-03-04T08:00:00Z'),
(2, 'user790go', 'bitoutlaws@gmail.com', '$2b$10$E4FzE5kYxFCn92FZl6sY8nYWGOG7M8mOOpOmxRlRZ6gbJl6jVLgOe', 'user', '2025-03-04T08:30:00Z', '2025-03-04T08:30:00Z');

-- Sample Data Insertion for Posts Table (aligned with provided data)
INSERT INTO posts (id, title, content, author_id, created_at, updated_at)
VALUES
(1, 'Welcome to WebOG', 'This is the first post in WebOG. Stay tuned for more updates!', 1, '2025-03-04T09:00:00Z', '2025-03-04T09:00:00Z'),
(2, 'Feature Updates', 'New updates coming soon, including a fresh design and better functionality.', 2, '2025-03-04T10:00:00Z', '2025-03-04T10:00:00Z');

-- Sample Data Insertion for Comments Table (aligned with provided data)
INSERT INTO comments (id, post_id, author_id, content, created_at)
VALUES
(1, 1, 2, 'Excited for the new updates!', '2025-03-04T09:15:00Z'),
(2, 2, 1, 'We’re working hard to improve the platform. Thanks for your support!', '2025-03-04T10:15:00Z');

-- Indexes for better search performance
CREATE INDEX idx_user_email ON users(email);
CREATE INDEX idx_post_author ON posts(author_id);
CREATE INDEX idx_comment_post ON comments(post_id);

