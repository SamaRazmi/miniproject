const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config(); // Load environment variables from .env file

const sequelize = new Sequelize(
  process.env.DB_NAME, // Database name
  process.env.DB_USER, // Database user
  process.env.DB_PASSWORD, // Database password
  {
    host: process.env.DB_HOST, // Database host
    port: process.env.DB_PORT, // Database port
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true, // Require SSL/TLS
        rejectUnauthorized: false, // Accept self-signed certificates (if applicable)
      },
    },
  }
);

const Currency = sequelize.define('Currency', {
  currencyCode: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  country: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  conversionRate: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});

// Sync the model with the database
(async () => {
  try {
    await sequelize.authenticate();
    console.log(
      'Connection to the database has been established successfully.'
    );
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

module.exports = Currency;
