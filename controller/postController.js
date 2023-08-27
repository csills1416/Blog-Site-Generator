const express = require('express');
const db = require('../models');
const router = express.Router();

// Route to create a new post
router.post('/create', async (req, res) => {
  try {
    const { title, content, userId } = req.body;

    const newPost = await db.Post.create({
      title,
      content,
      userId, // Make sure to pass the correct user ID
    });

    res.status(201).json(newPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while creating the post.' });
  }
});

// Route to get all posts
router.get('/all', async (req, res) => {
  try {
    const posts = await db.Post.findAll({
      include: [
        { model: db.User, attributes: ['username'] }, // Include user information
        { model: db.Comment }, // Include comments
      ],
    });

    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while retrieving posts.' });
  }
});

// Route to get a single post by ID
router.get('/:id', async (req, res) => {
  try {
    const postId = req.params.id;

    const post = await db.Post.findOne({
      where: { id: postId },
      include: [
        { model: db.User, attributes: ['username'] },
        { model: db.Comment, include: { model: db.User, attributes: ['username'] } },
      ],
    });

    if (!post) {
      return res.status(404).json({ message: 'Post not found.' });
    }

    res.status(200).json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while retrieving the post.' });
  }
});

// Add more routes as needed, e.g., update and delete

module.exports = router;
