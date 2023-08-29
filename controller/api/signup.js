const express = require('express');
const router = express.Router();

// Import any necessary middleware or functions

// Define the route handler for user signup
router.post('/signup', (req, res) => {
    const {User, password} = req.body;
    const newUser = new User({
        username: User,
        password: password
    });
});

module.exports = router;