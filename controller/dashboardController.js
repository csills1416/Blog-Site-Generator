const express = require('express');
const db = require('../models');
const router = express.Router();

// Route to display the user's posts in the dashboard
router.get('/', async (req, res) => {
  try {
    const userId = req.user.id; // Assuming you're using passport.js and the user is authenticated

    const userPosts = await db.Post.findAll({
      where: { userId },
      include: [{ model: db.User, attributes: ['username'] }, { model: db.Comment }],
    });

    res.render('dashboard', { userPosts }); // Render a dashboard view
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while retrieving user posts.' });
  }
});

// Route to add a new post from the dashboard
router.post('/create', async (req, res) => {
  try {
    const { title, content } = req.body;
    const userId = req.user.id; // Assuming you're using passport.js and the user is authenticated

    const newPost = await db.Post.create({
      title,
      content,
      userId,
    });

    res.status(201).json(newPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while creating the post.' });
  }
});

// Add more routes as needed for updating and deleting posts from the dashboard

module.exports = router;
