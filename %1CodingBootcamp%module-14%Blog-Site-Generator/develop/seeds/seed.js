const { BlogPost, sequelize } = require('../models'); 

const samplePosts = [
  {
    title: 'Sample Post 1',
    contents: 'This is the contents of the first sample post.',
  },
  {
    title: 'Sample Post 2',
    contents: 'This is the contents of the second sample post.',
  },
];

async function seedDatabase() {
  try {
    await sequelize.sync({ force: true }); 
    await BlogPost.bulkCreate(samplePosts); 
    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Error seeding database', error);
  } finally {
    sequelize.close();
  }
}

seedDatabase();
