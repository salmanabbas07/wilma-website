// middleware/errorHandler.js
// Centralized error handling middleware for the Express application.

/**
 * Express error handling middleware.
 * Intercepts all errors, logs them securely on the server,
 * and sends back a clean, safe JSON response to the client.
 */
const errorHandler = (err, req, res, next) => {
  // Always log the error details to the server console for debugging
  console.error('🚨 [Server Error]:', {
    message: err.message,
    code: err.code,
    status: err.status || 500,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
  });

  // Handle JSON parse errors from invalid request bodies
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({
      success: false,
      message: 'Neveljavna oblika JSON podatkov (Invalid JSON format).',
    });
  }

  // Handle Nodemailer SMTP Authentication or Connection errors
  if (err.code === 'EAUTH' || err.command === 'AUTH') {
    return res.status(502).json({
      success: false,
      message: 'Napaka pri povezavi z e-poštnim strežnikom (SMTP Authentication failed). Prosimo, preverite SMTP nastavitve v .env.',
    });
  }

  if (err.code === 'ESOCKET' || err.code === 'ECONNECTION' || err.code === 'ETIMEDOUT') {
    return res.status(504).json({
      success: false,
      message: 'Povezava z e-poštnim strežnikom je potekla (SMTP Connection timeout). Prosimo, poskusite kasneje.',
    });
  }

  // Handle generic / unexpected internal errors
  const statusCode = err.statusCode || err.status || 500;
  const clientMessage =
    statusCode === 500
      ? 'Unable to send your inquiry. Please try again.'
      : err.message || 'Prišlo je do nepričakovane napake.';

  return res.status(statusCode).json({
    success: false,
    message: clientMessage,
  });
};

module.exports = errorHandler;
