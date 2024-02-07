const { DataTypes } = require('sequelize');
const sequelize = require('../config');
const Country = require('./Country');

const Currency = sequelize.define('Currency', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  currencyCode: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  countryId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Country,
      key: 'id',
    },
  },
  conversionRate: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});

// Define the association
Currency.belongsTo(Country, { foreignKey: 'countryId' });

module.exports = Currency;
