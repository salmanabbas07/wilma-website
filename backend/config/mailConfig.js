// config/mailConfig.js
// This file configures Nodemailer with Gmail SMTP settings.

const nodemailer = require('nodemailer');
require('dotenv').config();

// Create a reusable Nodemailer transporter using Gmail SMTP
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT, 10) || 465,
  secure: true, // Port 465 requires SSL/TLS (secure: true)
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS, // 16-character Google App Password
  },
});

/**
 * Helper function to verify that the SMTP connection works.
 * You can call this when the server starts to check credentials.
 */
const verifyMailConnection = async () => {
  try {
    // Only attempt verification if credentials have been configured
    if (!process.env.SMTP_USER || process.env.SMTP_USER === 'yourbusiness@gmail.com') {
      console.warn('⚠️  SMTP credentials not set yet. Please update backend/.env with your Gmail App Password.');
      return false;
    }

    await transporter.verify();
    console.log('✅ Nodemailer SMTP connection successfully verified.');
    return true;
  } catch (error) {
    console.error('❌ Nodemailer SMTP connection error:', error.message);
    return false;
  }
};

module.exports = {
  transporter,
  verifyMailConnection,
};
