const express = require('express');
const session = require('express-session');
const path = require('path');
const exphbs = require('express-handlebars'); 

const app = express();
const PORT = process.env.PORT || 3001;

const sequelize = require('./config/connection'); 
const routes = require('./controllers'); 

// Set up Handlebars as the view engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Set up session middleware
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true,
}));

// Use routes
app.use(routes);

// Start the server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
