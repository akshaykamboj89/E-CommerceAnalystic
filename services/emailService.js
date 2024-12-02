const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');
require('dotenv').config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_SERVICE_USER,
        pass: process.env.EMAIL_SERVICE_PASS,
    },
});

const sendEmail = async (to, subject, templatePath, data) => {
    try {
        const emailHtml = await ejs.renderFile(templatePath, data);
        await transporter.sendMail({
            from: `"E-Commerce Team" <${process.env.EMAIL_SERVICE_USER}>`,
            to,
            subject,
            html: emailHtml,
        });
        console.log('Email sent successfully!');
    } catch (error) {
        console.error('Error sending email:', error.message);
    }
};

module.exports = { sendEmail };
