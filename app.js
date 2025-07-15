const express = require('express');
const sequelize = require('./db/db');
const userRoutes = require('./routes/users');
require('dotenv').config(); // Load environment variables from .env file
const PORT = process.env.PORT || 3012; // Use PORT from .env or default to 3012

const app = express();
app.use(express.json());
app.use('/users', userRoutes);

(async () => {
  try {
    await sequelize.authenticate();
    console.log('DB connected');
    console.log(new Date())
    // dont use if you already has the table in your db
    // await sequelize.sync(); // Optional: creates tables automatically (Create the table in the MSSQL database if it doesn’t exist)
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`) );
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1); // Exit on database connection failure
  }
})();

// It can also alter or drop tables if you use options like:
// sequelize.sync({ alter: true }); // sync changes in model with DB
// sequelize.sync({ force: true }); // WARNING: drops & recreates tables
//