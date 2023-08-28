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

module.exports = router;
