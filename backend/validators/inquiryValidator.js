// validators/inquiryValidator.js
// Validates incoming inquiry form data using express-validator.

const { body, validationResult } = require('express-validator');

// Define validation rules for each form field
const inquiryValidationRules = [
  // 1. Name validation: required, trimmed, max 100 characters
  body('name')
    .trim()
    .notEmpty().withMessage('Prosimo, vnesite vaše ime in priimek (Name is required).')
    .isLength({ min: 2, max: 100 }).withMessage('Ime mora vsebovati med 2 in 100 znakov.'),

  // 2. Email validation: required, valid email format, max 150 characters
  body('email')
    .trim()
    .notEmpty().withMessage('Prosimo, vnesite vaš e-poštni naslov (Email is required).')
    .isEmail().withMessage('Vnesite veljaven e-poštni naslov (Invalid email address).')
    .normalizeEmail()
    .isLength({ max: 150 }).withMessage('E-poštni naslov je predolg.'),

  // 3. Phone validation: optional, but if provided, must be a reasonable phone format
  body('phone')
    .optional({ checkFalsy: true }) // Allow empty or omitted string
    .trim()
    .isLength({ min: 5, max: 30 }).withMessage('Telefonska številka mora vsebovati med 5 in 30 znakov.')
    .matches(/^[0-9+\s\-()]+$/).withMessage('Telefonska številka lahko vsebuje le številke, presledke, +, - in oklepaje.'),

  // 4. Subject / Service validation: required, non-empty, max 100 characters
  body('subject')
    .trim()
    .notEmpty().withMessage('Prosimo, izberite zadevo ali vrsto storitve (Subject/Service is required).')
    .isLength({ max: 100 }).withMessage('Zadeva je predolga.'),

  // 5. Message validation: required, min 10 characters (matches frontend), max 3000 characters
  body('message')
    .trim()
    .notEmpty().withMessage('Prosimo, vnesite vsebino vašega sporočila (Message is required).')
    .isLength({ min: 10 }).withMessage('Sporočilo mora vsebovati vsaj 10 znakov.')
    .isLength({ max: 3000 }).withMessage('Sporočilo ne sme presegati 3000 znakov.'),
];

/**
 * Middleware that inspects validation results.
 * If any rule fails, it stops execution and responds with a 400 Bad Request.
 */
const validateInquiry = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    // Collect error messages
    const formattedErrors = errors.array().map((err) => ({
      field: err.path,
      message: err.msg,
    }));

    return res.status(400).json({
      success: false,
      message: formattedErrors[0].message, // First user-friendly error message
      errors: formattedErrors,
    });
  }

  // If validation passes, move to the next handler (the controller)
  next();
};

module.exports = {
  inquiryValidationRules,
  validateInquiry,
};
