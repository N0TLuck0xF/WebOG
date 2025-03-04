// config.js

module.exports = {
    // Server Port Configuration
    PORT: process.env.PORT || 3000, // Default to port 3000 if not set in environment variables

    // Session Configuration
    SESSION_SECRET: process.env.SESSION_SECRET || 'supersecret', // Replace with a secure key
    SESSION_MAX_AGE: 24 * 60 * 60 * 1000, // 24 hours (in milliseconds)

    // Database Configuration (example for a MongoDB setup)
    DB_HOST: process.env.DB_HOST || 'localhost', // MongoDB host (can be changed for cloud DB)
    DB_PORT: process.env.DB_PORT || 27017, // Default MongoDB port
    DB_NAME: process.env.DB_NAME || 'webog', // Name of the database

    // JWT Authentication Configuration (if you're using JWT tokens for login)
    JWT_SECRET: process.env.JWT_SECRET || 'your-jwt-secret', // Secure JWT secret key
    JWT_EXPIRATION: '1h', // Token expiration time

    // Email Configuration (if sending emails, for example, via an SMTP server)
    EMAIL_HOST: process.env.EMAIL_HOST || 'smtp.mailtrap.io',
    EMAIL_PORT: process.env.EMAIL_PORT || 587,
    EMAIL_USER: process.env.EMAIL_USER || 'your-email-user',
    EMAIL_PASS: process.env.EMAIL_PASS || 'your-email-password',

    // Security-related settings (example: CORS)
    CORS_ALLOWED_ORIGINS: process.env.CORS_ALLOWED_ORIGINS || 'http://localhost:3000', // Add other origins as needed

    // Other custom configuration values
    SITE_NAME: 'WebOG', // The name of your platform
    API_VERSION: 'v1', // Versioning for your API endpoints
    LOGGING_LEVEL: process.env.LOGGING_LEVEL || 'info', // Set logging level (info, debug, error, etc.)
    USE_SSL: process.env.USE_SSL || false, // Set to true if your site is using SSL (https)
};
