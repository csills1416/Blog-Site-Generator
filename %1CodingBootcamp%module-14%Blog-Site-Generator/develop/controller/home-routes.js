const express = require('express');
const router = express.Router();
const { BlogPost } = require('../models'); // Import your BlogPost model

// Get existing blog posts for the homepage
router.get('/', async (req, res) => {
  try {
    const existingPosts = await BlogPost.findAll({
      order: [['createdAt', 'DESC']] // Order by createdAt in descending order
    });
    res.json(existingPosts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching blog posts', error });
  }
});

// Other route handlers for viewing individual blog posts, leaving comments, etc.

module.exports = router;
