const express = require('express');
const router = express.Router();
const homeRoutes = require('./home-routes');
const userRoutes = require('./api/user-routes');

router.use('/', homeRoutes);
router.use('/api/user', userRoutes);

module.exports = router;
