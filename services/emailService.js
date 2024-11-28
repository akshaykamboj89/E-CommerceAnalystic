const nodemailer = require('nodemailer');
require('dotenv').config(); 

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_SERVICE_USER,
        pass: process.env.EMAIL_SERVICE_PASS,
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
