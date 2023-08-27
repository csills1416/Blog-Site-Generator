const express = require('express');
const router = express.Router();
const db = require('../models');

// Middleware to check if user is authenticated
const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
};

// Home route
router.get('/', async (req, res) => {
  try {
    const blogPosts = await db.Post.findAll({ include: db.User });
    res.render('home', { blogPosts, user: req.user });
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while retrieving blog posts.');
  }
});

// View a specific blog post
router.get('/post/:id', async (req, res) => {
  try {
    const postId = req.params.id;
    const blogPost = await db.Post.findByPk(postId, { include: [db.User, db.Comment] });
    res.render('post', { blogPost, user: req.user });
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while retrieving the blog post.');
  }
});

module.exports = router;
