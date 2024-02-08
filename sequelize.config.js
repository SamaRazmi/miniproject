require('dotenv').config(); // Load environment variables from .env file
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true, // Force SSL/TLS
        rejectUnauthorized: false, // Allow self-signed certificates, disable in production
      },
    },
    logging: false, // Set to true if you want to log SQL queries
  }
);

module.exports = sequelize;
