const express = require('express');
const session = require('express-session');
const passport = require('passport');
const db = require('./models');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware setup

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

const exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(session({ secret: 'your-secret-key', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Routes setup

const homeRoutes = require('./controllers/home-routes');
const authRoutes = require('./controllers/homeController');
const dashboardRoutes = require('./controllers/dashboardController');
const postRoutes = require('./controllers/postController');

app.use('/', homeRoutes);
app.use('/', authRoutes);
app.use('/', dashboardRoutes);
app.use('/', postRoutes);

db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
});
