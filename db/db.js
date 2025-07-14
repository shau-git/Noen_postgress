const { Sequelize } = require('sequelize');
require('dotenv').config()

const sequelize = new Sequelize(`${process.env.DB_DATABASE}`, `${process.env.DB_USER}`,  `${process.env.DB_PASSWORD}`, {
  host: 'localhost',
  dialect: 'mssql',
  dialectOptions: {
    options: {
      encrypt: true, // For Azure or secure connection
      trustServerCertificate: true // If using self-signed certs
    }
  },
  logging: false
});

module.exports = sequelize;
