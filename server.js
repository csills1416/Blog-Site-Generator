const express = require('express');
const session = require('express-session');
const passport = require('passport');
const db = require('./models');
const app = express();
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const PORT = process.env.PORT || 3000;

const sess = {
  secret: 'Super secret secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

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

const homeRoutes = require('./controller/home-routes');
const dashboardRoutes = require('./controller/dashboardController');
const postRoutes = require('./controller/postController');

app.use('/', homeRoutes);
app.use('/', dashboardRoutes);
app.use('/', postRoutes);


  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });

