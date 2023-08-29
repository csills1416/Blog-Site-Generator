const sequelize = require('./connection');
const { User, Post, Comment } = require('./models'); // Update the path as needed
const fs = require('fs/promises'); // Import the filesystem module

async function seedDatabase() {
  try {
    await sequelize.sync({ force: true });

    const usersData = await fs.readFile('users.json', 'utf-8');
    const users = JSON.parse(usersData);
    const createdUsers = await User.bulkCreate(users, { individualHooks: true });
    console.log('Users seeded successfully:', createdUsers.map(user => user.get({ plain: true })));

    const blogsData = await fs.readFile('blogs.json', 'utf-8');
    const blogs = JSON.parse(blogsData);
    const createdBlogs = await Post.bulkCreate(blogs);
    console.log('Posts seeded successfully:', createdBlogs.map(blog => blog.get({ plain: true })));

    const commentsData = await fs.readFile('comments.json', 'utf-8');
    const comments = JSON.parse(commentsData);
    const createdComments = await Comment.bulkCreate(comments);
    console.log('Comments seeded successfully:', createdComments.map(comment => comment.get({ plain: true })));
  } catch (error) {
    console.error('Error seeding database', error);
  } finally {
    sequelize.close();
  }
}

seedDatabase();
