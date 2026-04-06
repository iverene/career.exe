const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const app = express();

app.set('trust proxy', 1); 
app.use(express.json());

// CORS configuration
// backend/index.js
app.use(cors({
  origin: ['https://career-exe.vercel.app', 'http://localhost:5173'],
  credentials: true
}));

// Rate limiting to prevent API abuse
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
    max: 20, 
    message: { error: "Too many requests, please try again later." },
    standardHeaders: true,
    legacyHeaders: false,
});

const careerRoutes = require('./routes/careerRoutes');
app.use('/api/career/analyze', limiter, careerRoutes); // Apply limiter to AI route

app.use('/', (req, res) => {
    res.send('career.exe Backend Running');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

module.exports = app;