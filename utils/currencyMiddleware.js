const Currency = require('../models/Currency');
const Country = require('../models/Country');

// GET Endpoint to retrieve all currencies
const getCurrencies = async (request, response) => {
  try {
    const currencies = await Currency.findAll({ include: Country });
    response.json(currencies);
  } catch (error) {
    console.error('Error fetching currencies:', error);
    response.status(500).json({ error: 'Internal Server Error' });
  }
};

// GET:id Endpoint to retrieve a specific currency by ID
const getCurrencyById = async (request, response) => {
  const id = parseInt(request.params.id);
  try {
    const currency = await Currency.findByPk(id, { include: Country });
    if (currency) {
      response.json(currency);
    } else {
      response.status(404).send('Currency not found');
    }
  } catch (error) {
    console.error('Error fetching currency by ID:', error);
    response.status(500).json({ error: 'Internal Server Error' });
  }
};

// POST Endpoint to create a new currency
const createCurrency = async (request, response) => {
  const newCurrency = request.body;
  try {
    const createdCurrency = await Currency.create(newCurrency);
    response.json(createdCurrency);
  } catch (error) {
    console.error('Error creating currency:', error);
    response.status(400).json({ error: 'Bad Request' });
  }
};

// PUT:id Endpoint to update the conversion rate of a currency
const updateCurrency = async (request, response) => {
  const id = parseInt(request.params.id);
  const newRate = parseFloat(request.params.newRate);
  try {
    const currency = await Currency.findByPk(id);
    if (currency) {
      currency.conversionRate = newRate;
      await currency.save();
      response.json(currency);
    } else {
      response.status(404).send('Currency not found');
    }
  } catch (error) {
    console.error('Error updating currency:', error);
    response.status(500).json({ error: 'Internal Server Error' });
  }
};

// DELETE:id Endpoint to delete a currency by ID
const deleteCurrency = async (request, response) => {
  const id = parseInt(request.params.id);
  try {
    const currency = await Currency.findByPk(id);
    if (currency) {
      await currency.destroy();
      response.sendStatus(204);
    } else {
      response.status(404).send('Currency not found');
    }
  } catch (error) {
    console.error('Error deleting currency:', error);
    response.status(500).json({ error: 'Internal Server Error' });
  }
};

// Export the middleware functions
module.exports = {
  getCurrencies,
  getCurrencyById,
  createCurrency,
  updateCurrency,
  deleteCurrency,
};
