// routes/inquiryRoutes.js
// Defines routes for handling customer inquiries.

const express = require('express');
const rateLimit = require('express-rate-limit');
const { inquiryValidationRules, validateInquiry } = require('../validators/inquiryValidator');
const { sendInquiry } = require('../controllers/inquiryController');

const router = express.Router();

/**
 * Specific rate limiter for form submissions to prevent email spam & abuse.
 * Allows maximum 5 submissions per 15 minutes per IP address.
 */
const inquiryLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 requests per windowMs
  standardHeaders: true, // Return standard RateLimit headers in response
  legacyHeaders: false, // Disable X-RateLimit-* headers
  message: {
    success: false,
    message: 'Prejeli smo preveč povpraševanj iz vašega naslova. Prosimo, poskusite znova čez 15 minut (Too many requests, please try again later).',
  },
});

/**
 * POST /api/inquiry/send
 * 1. inquiryLimiter: prevents spam
 * 2. inquiryValidationRules: validates input fields
 * 3. validateInquiry: stops request if validation fails
 * 4. sendInquiry: prepares HTML email and delivers via Nodemailer
 */
router.post('/send', inquiryLimiter, inquiryValidationRules, validateInquiry, sendInquiry);

// Also accept POST /api/inquiry as an alias for convenience
router.post('/', inquiryLimiter, inquiryValidationRules, validateInquiry, sendInquiry);

module.exports = router;
