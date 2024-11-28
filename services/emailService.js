const nodemailer = require('nodemailer');
require('dotenv').config(); // Load .env file

const transporter = nodemailer.createTransport({
    service: 'gmail', // Ya jo email service aap use kar rahe ho
    auth: {
        user: process.env.EMAIL_SERVICE_USER, // Email from .env
        pass: process.env.EMAIL_SERVICE_PASS, // Password from .env
    },
});

const sendEmail = async (to, subject, text) => {
    try {
        await transporter.sendMail({
            from: `"Your Project Name" <${process.env.EMAIL_SERVICE_USER}>`,
            to,
            subject,
            text,
        });
        console.log('Email sent successfully!');
    } catch (error) {
        console.error('Error sending email:', error.message);
    }
};

module.exports = { sendEmail };
