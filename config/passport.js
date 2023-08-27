const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const db = require('../models');
const bcrypt = require('bcrypt');

passport.use(
  new LocalStrategy(
    {
      usernameField: 'username', // Field name for the username in the form
      passwordField: 'password', // Field name for the password in the form
    },
    async (username, password, done) => {
      try {
        // Find the user by their username
        const user = await db.User.findOne({ where: { username } });

        // If user doesn't exist or password is incorrect
        if (!user || !bcrypt.compareSync(password, user.password)) {
          return done(null, false, { message: 'Incorrect username or password' });
        }

        // Successful authentication
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

// Serialize user information for storing in session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user by finding user using stored id
passport.deserializeUser(async (id, done) => {
  try {
    const user = await db.User.findByPk(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

module.exports = passport;
