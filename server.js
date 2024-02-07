require('dotenv').config();
const express = require('express');
const { json } = require('express');
const cors = require('cors');
const morgan = require('morgan');
const sequelize = require('./config'); // Import the Sequelize instance
const Currency = require('./models/Currency'); // Import the Currency model
const Country = require('./models/Country'); // Import the Country model
const currencyRoutes = require('./routes/currencyRoutes'); // Import currency routes

const app = express();
app.use(cors());
app.use(json());
app.use(morgan('dev'));

// Sync Sequelize models with the database
(async () => {
  try {
    await sequelize.authenticate();
    console.log(
      'Connection to the database has been established successfully.'
    );
    await sequelize.sync(); // This will create tables if they do not exist
    console.log('All models were synchronized successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

// Use currency routes
app.use('/api/currency', currencyRoutes);

// Unknown endpoint handling
app.use((request, response) => {
  response.status(404).json({ error: 'Unknown endpoint' });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
