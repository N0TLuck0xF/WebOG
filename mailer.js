// mailer.js
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();

// Configure nodemailer transporter
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Function to send verification email
function sendVerificationEmail(toEmail, verificationToken) {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: toEmail,
        subject: "Email Verification for WebOG",
        html: `
            <h1>Email Verification</h1>
            <p>Thank you for registering with WebOG. Please verify your email by clicking the link below:</p>
            <a href="http://localhost:3000/verify-email?token=${verificationToken}">Verify Email</a>
        `
    };

    return transporter.sendMail(mailOptions);
}

module.exports = { sendVerificationEmail };
