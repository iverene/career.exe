const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const app = express();

app.set('trust proxy', 1); 
app.use(express.json());

// CORS configuration
app.use(cors({
  origin: ["https://career-exe.vercel.app", "http://localhost:5173"],
  methods: ["GET", "POST", "OPTIONS"],
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// Explicitly handle preflight requests
app.options('/*', cors());

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

if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Local server on ${PORT}`));
}

module.exports = app;