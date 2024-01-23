const express = require('express');
const router = express.Router();

// Import middleware and controller functions
const {
  getCurrencies,
  getCurrencyById,
  createCurrency,
  updateCurrency,
  deleteCurrency,
} = require('../utils/currencyMiddleware');

// Define routes without repeating the base route
router.get('/', getCurrencies);
router.get('/:id', getCurrencyById);
router.post('/', createCurrency);
router.put('/:id/:newRate', updateCurrency);
router.delete('/:id', deleteCurrency);

module.exports = router;
