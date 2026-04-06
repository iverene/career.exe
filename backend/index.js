const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const app = express();

app.set('trust proxy', 1); 
app.use(express.json());

// CORS configuration
const allowedOrigins = [
  'https://career-exe.vercel.app', // Your production frontend
  'http://localhost:5173',        // Your local development frontend (usually 5173 for Vite)
  'http://localhost:3000'         // Your local development frontend (usually 3000 for CRA)
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.options('*', cors());

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