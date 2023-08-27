const Sequelize = require('sequelize');
const config = require('./config/config.json'); // Update the path accordingly

// Create a Sequelize instance with your database configuration
const sequelize = new Sequelize(config.development);

// Test the connection
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection to the database has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = sequelize;
