const sequelize = require('./connection');
const { User, Post, Comment } = require('./models'); // Update the path as needed

const sampleUsers = [
  {
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password123',
  },
  {
    name: 'Jane Smith',
    email: 'jane@example.com',
    password: 'securepassword',
  },
];

const samplePosts = [
  {
    title: 'Sample Post 1',
    content: 'This is the content of the first sample post.',
    user_id: 1,
  },
  {
    title: 'Sample Post 2',
    content: 'This is the content of the second sample post.',
    user_id: 2,
  },
];

const sampleComments = [
  {
    content: 'Great post!',
    user_id: 1,
    post_id: 1,
  },
  {
    content: 'I enjoyed reading this.',
    user_id: 2,
    post_id: 2,
  },
];

async function seedDatabase() {
  try {
    await sequelize.sync({ force: true });

    const users = await User.bulkCreate(sampleUsers, { individualHooks: true });
    console.log('Users seeded successfully:', users.map(user => user.get({ plain: true })));

    const posts = await Post.bulkCreate(samplePosts);
    console.log('Posts seeded successfully:', posts.map(post => post.get({ plain: true })));

    const comments = await Comment.bulkCreate(sampleComments);
    console.log('Comments seeded successfully:', comments.map(comment => comment.get({ plain: true })));
  } catch (error) {
    console.error('Error seeding database', error);
  } finally {
    sequelize.close();
  }
}

seedDatabase();
