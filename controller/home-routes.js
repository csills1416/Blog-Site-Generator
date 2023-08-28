const express = require('express');
const db = require('../models');
const router = express.Router();

// Home route - display existing blog posts
router.get('/', async (req, res) => {
  try {
    const posts = await db.Post.findAll({
      include: [
        { model: db.User, attributes: ['name'] },
        { model: db.Comment, include: { model: db.User, attributes: ['name'] } },
      ],
      order: [['createdAt', 'DESC']],
    });

    res.render('homepage', { posts, user: req.user });
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred.');
  }
});

// View individual blog post
router.get('/post/:id', async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await db.Post.findByPk(postId, {
      include: [
        { model: db.User, attributes: ['name'] },
        { model: db.Comment, include: { model: db.User, attributes: ['name'] } },
      ],
    });

    if (!post) {
      return res.status(404).send('Post not found.');
    }

    res.render('post', { post, user: req.user });
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred.');
  }
});

router.get('/', (req, res) => {
  res.render('homepage');
});

// GET route for displaying the login form
router.get('/login', (req, res) => {
  res.render('login');
});

// GET route for displaying the signup form
router.get('/signup', (req, res) => {
  res.render('signup');
});

// POST route for handling signup form submission
router.post('/signup', async (req, res) => {
  try {
      const { username, password } = req.body;

      const newUser = await User.create({ username, password });

      res.redirect('/'); 
  } catch (error) {
      res.render('signup', { error: 'User creation failed' });
  }
});

module.exports = router;
