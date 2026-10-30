// server.js
// Main entry point for William Cleaning Services Backend API.

const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const inquiryRoutes = require('./routes/inquiryRoutes');
const errorHandler = require('./middleware/errorHandler');
const { verifyMailConnection } = require('./config/mailConfig');

// 1. Initialize Express App
const app = express();
const PORT = process.env.PORT || 5000;

// 2. HTTP Security Headers with Helmet
app.use(helmet());

// 3. CORS Configuration
// Restrict API access only to allowed frontend origins
const configuredOrigins = process.env.FRONTEND_URL
  ? process.env.FRONTEND_URL.split(',').map((url) => url.trim())
  : ['http://localhost:5173'];

const corsOptions = {
  origin: (origin, callback) => {
    // Allow server-to-server requests or tools like Postman/curl without an origin header
    if (!origin || configuredOrigins.includes(origin) || configuredOrigins.includes('*')) {
      return callback(null, true);
    }
    return callback(new Error(`CORS policy blocked access from origin: ${origin}`));
  },
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

app.use(cors(corsOptions));

// 4. Request Body Parsers with safe size limits (prevents payload attacks)
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// 5. Global API Rate Limiter (Prevents DoS and brute-force across all endpoints)
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes window
  max: 100, // Limit each IP to 100 requests per window
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Preveč zahtev. Prosimo, poskusite kasneje (Too many requests, please try again later).',
  },
});
app.use('/api', globalLimiter);

// 6. Basic Health-Check Endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    service: 'William Cleaning Services Backend API',
    status: 'UP',
    uptime: `${Math.floor(process.uptime())}s`,
    timestamp: new Date().toISOString(),
  });
});

// Welcome / API root
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'William Cleaning Services Backend is running.',
    healthCheck: '/api/health',
    inquiryEndpoint: 'POST /api/inquiry/send',
  });
});

// 7. Register Inquiry Routes
app.use('/api/inquiry', inquiryRoutes);

// 8. 404 Route Handler for undefined routes
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Pot ${req.originalUrl} ne obstaja (Endpoint not found).`,
  });
});

// 9. Centralized Error Handler Middleware
app.use(errorHandler);

// 10. Start Server
app.listen(PORT, async () => {
  console.log(`=======================================================`);
  console.log(`🚀 William Cleaning Services Backend running on port ${PORT}`);
  console.log(`📡 URL: http://localhost:${PORT}`);
  console.log(`🌐 Allowed Frontend: ${configuredOrigins.join(', ')}`);
  console.log(`=======================================================`);

  // Verify SMTP connection on server startup
  await verifyMailConnection();
});
