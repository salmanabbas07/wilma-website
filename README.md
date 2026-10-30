# William Cleaning Services – Fullstack Project

This repository contains the complete frontend and backend for the **William Cleaning Services** website.

---

## 📁 Project Architecture

```text
cleanup/
│
├── frontend/                     # React + Vite frontend application
│   ├── public/                   # Static assets & icons
│   ├── src/                      # React components, pages, styles
│   ├── .env.example              # Frontend environment variables example
│   ├── package.json              # Frontend dependencies
│   ├── vite.config.js            # Vite build configuration
│   └── index.html                # HTML entry point
│
├── backend/                      # Node.js + Express backend service
│   ├── config/
│   │   └── mailConfig.js         # Nodemailer Gmail SMTP setup
│   │
│   ├── controllers/
│   │   └── inquiryController.js  # Email generation & business logic
│   │
│   ├── routes/
│   │   └── inquiryRoutes.js      # API route definitions & rate limiting
│   │
│   ├── validators/
│   │   └── inquiryValidator.js   # Server-side input validation
│   │
│   ├── middleware/
│   │   └── errorHandler.js       # Centralized error handler
│   │
│   ├── .env                      # Environment credentials (ignored in Git)
│   ├── .env.example              # Environment variables template
│   ├── .gitignore                # Git ignore rules
│   ├── package.json              # Backend dependencies & scripts
│   └── server.js                 # Express server entry point
│
└── README.md                     # Documentation & setup guide
```

---

## 🚀 Quick Start Guide

Follow these steps to run the backend and frontend on your local machine:

### 1. Backend Setup

Open your terminal, navigate to the `backend` folder, install the packages, and configure `.env`:

```bash
cd backend
npm install
```

#### Configure `.env`
Open `backend/.env` and enter your Gmail address and **Google App Password**:

```env
PORT=5000
FRONTEND_URL=http://localhost:5173
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USER=yourbusiness@gmail.com
SMTP_PASS=your_16_digit_app_password
RECEIVER_EMAIL=yourbusiness@gmail.com
```

#### Run the Backend
- Development mode (auto-reload on save):
  ```bash
  npm run dev
  ```
- Production mode:
  ```bash
  npm start
  ```
The backend server runs at `http://localhost:5000`.

---

### 2. Frontend Setup

In a new terminal window, navigate to the `frontend` folder and start the dev server:

```bash
cd frontend
npm install
npm run dev
```

The website will be available at `http://localhost:5173`.

---

## 📧 How to Generate a Google App Password for Gmail SMTP

Standard Gmail passwords do not work with SMTP. You must create a dedicated 16-character **Google App Password**:

1. Go to your Google Account security settings: [https://myaccount.google.com/security](https://myaccount.google.com/security)
2. Ensure **2-Step Verification** is turned **ON**.
3. In the search box at the top, type **"App passwords"** and click on it.
4. Enter an app name (e.g. `William Cleaning Website`) and click **Create**.
5. Google will generate a **16-letter password** (e.g. `abcd efgh ijkl mnop`).
6. Copy this 16-letter password (without spaces) and paste it into `backend/.env` as `SMTP_PASS`.

---

## 🧪 Testing the API & Email

### Option 1: Using the Website
1. Open `http://localhost:5173/kontakt`.
2. Fill out the inquiry form and click **"Pošljite povpraševanje"**.
3. You should see a green success message, and the inquiry email will arrive in `RECEIVER_EMAIL`.

### Option 2: Health Check
Open your browser or run:
```bash
curl http://localhost:5000/api/health
```
Response:
```json
{
  "success": true,
  "service": "William Cleaning Services Backend API",
  "status": "UP"
}
```

### Option 3: Direct API Request (cURL or Postman)
```bash
curl -X POST http://localhost:5000/api/inquiry/send \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Janez Novak",
    "email": "janez@primer.si",
    "phone": "+386 69 803 622",
    "subject": "hotel-housekeeping",
    "message": "Pozdravljeni, zanimamo se za čiščenje hotelskih prostorov za prihajajočo sezono."
  }'
```

---

## 🔒 Security Features

1. **Helmet**: Secures HTTP response headers against clickjacking, sniffing, and XSS.
2. **Restricted CORS**: Limits API requests only to the designated frontend origin.
3. **Double Rate Limiting**:
   - Global rate limiter (100 requests per 15 min across API).
   - Strict inquiry limiter (5 submissions per 15 min per IP) to prevent spam.
4. **HTML Escaping**: User input is sanitized before embedding into HTML emails to prevent script/injection attacks in email clients.
5. **Payload Size Limits**: Request bodies are capped at 10KB to protect against buffer overflow/DoS attacks.
6. **Input Validation**: Backend validation with `express-validator` verifies all fields independently of frontend validations.
