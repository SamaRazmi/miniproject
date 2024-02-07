require('dotenv').config();
const express = require('express');
const { json } = require('express');
const cors = require('cors');
const morgan = require('morgan');
const Currency = require('./config'); // Import the Currency model from config.js

const app = express();
// Setup for CORS, JSON parsing, and Morgan middleware
//app.use(cors());
//app.use(express.json());
//app.use(morgan('dev'));

// Morgan middleware for logging with custom format
app.use(
  morgan((tokens, req, res) => {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, 'content-length'),
      '-',
      tokens['response-time'](req, res),
      'ms',
      JSON.stringify(req.body),
    ].join(' ');
  })
);

// Setup for CORS, JSON parsing, and Morgan middleware
app.use(cors());
app.use(json());

// Import routes
const currencyRoutes = require('./routes/currencyRoutes');

// Use routes without repeating the base route
app.use('/api/currency', currencyRoutes);

// Server listening on port 3001
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});

// Unknown endpoint handling
app.use((request, response) => {
  response.status(404).json({ error: 'unknown endpoint' });
});
