const express = require('express');
const cors = require('cors');
const app = express();

// Setup for CORS and JSON parsing
app.use(cors());
app.use(express.json());

// Initial data storage
let currencies = [
  {
    id: 1,
    currencyCode: 'CDN',
    country: 'Canada',
    conversionRate: 1,
  },
  {
    id: 2,
    currencyCode: 'USD',
    country: 'United States of America',
    conversionRate: 0.75,
  },
];

// Testing endpoint
app.get('/', (request, response) => {
  response.send('Hello World!');
});

// TODO: GET Endpoint
app.get('/api/currency/', (request, response) => {
  response.json(currencies);
});

// TODO: GET:id Endpoint
app.get('/api/currency/:id', (request, response) => {
  const id = parseInt(request.params.id);
  const currency = currencies.find((c) => c.id === id);
  if (currency) {
    response.json(currency);
  } else {
    response.status(404).send('Currency not found');
  }
});

// TODO: POST Endpoint
app.post('/api/currency', (request, response) => {
  const newCurrency = request.body;
  if (
    !newCurrency ||
    !newCurrency.id ||
    !newCurrency.currencyCode ||
    !newCurrency.country ||
    !newCurrency.conversionRate
  ) {
    response.status(400).json({ error: 'content missing' });
  } else {
    currencies.push(newCurrency);
    response.json(newCurrency);
  }
});

// TODO: PUT:id endpoint
app.put('/api/currency/:id/:newRate', (request, response) => {
  const id = parseInt(request.params.id);
  const newRate = parseFloat(request.params.newRate);
  const currency = currencies.find((c) => c.id === id);
  if (currency) {
    currency.conversionRate = newRate;
    response.json(currency);
  } else {
    response.status(404).send('Currency not found');
  }
});

// TODO: DELETE:id Endpoint
app.delete('/api/currency/:id', (request, response) => {
  const id = parseInt(request.params.id);
  const index = currencies.findIndex((c) => c.id === id);
  if (index !== -1) {
    currencies.splice(index, 1);
    response.sendStatus(204);
  } else {
    response.status(404).send('Currency not found');
  }
});

// Server listening on port 3001
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});

// Unknown endpoint handling
app.use((request, response) => {
  response.status(404).json({ error: 'unknown endpoint' });
});
