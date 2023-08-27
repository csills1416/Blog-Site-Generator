const sequelize = require('./config/connection');
const models = require('./models'); // Make sure to update the path as needed

async function syncDatabase() {
  try {
    await sequelize.sync({ force: true });
    console.log('Database tables created successfully');
  } catch (error) {
    console.error('Error creating database tables', error);
  } finally {
    sequelize.close();
  }
}

syncDatabase();
