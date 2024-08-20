// config/mail.js

const nodemailer = require('nodemailer');
require('dotenv').config(); // Ensure you have access to environment variables

// Create a transport object using SMTP transport or other providers
const transporter = nodemailer.createTransport({
    service: 'Gmail', // Replace with your email service provider
    auth: {
        user: process.env.EMAIL_USER, // Your email address
        pass: process.env.EMAIL_PASS, // Your email password or app-specific password
    },
});

// Function to send an email
async function sendEmail(to, subject, text, html) {
    try {
        const info = await transporter.sendMail({
            from: process.env.EMAIL_USER, // Sender address
            to, // List of recipients
            subject, // Subject line
            text, // Plain text body
            html, // HTML body
        });
        console.log('Email sent:', info.messageId);
    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
}

module.exports = sendEmail;
