const express = require('express');
const sequelize = require('./db/db');
const userRoutes = require('./routes/users');

const app = express();
app.use(express.json());
app.use('/users', userRoutes);

(async () => {
  try {
    await sequelize.authenticate();
    console.log('DB connected');

    // dont use if you already has the table in your db
    // await sequelize.sync(); // Optional: creates tables automatically (Create the table in the MSSQL database if it doesn’t exist)
    app.listen(3001, () => console.log('Server started on port 3001'));
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

// It can also alter or drop tables if you use options like:
// sequelize.sync({ alter: true }); // sync changes in model with DB
// sequelize.sync({ force: true }); // WARNING: drops & recreates tables
