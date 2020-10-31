const express = require('express');
const sequelize = require('./config/connection');
const exphbs = require('express-handlebars');
const path = require('path');
//const session = require('express-session');
//const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();

const hbs = exphbs.create({});

// Middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

// Template Engine
app.engine('handlebars', hbs.engine);

// Use defined routes
app.use(require('./controllers'));

// Define port
const PORT = process.env.PORT || 3001;

// Connect to server if valid db connection established
sequelize.sync({force: false}).then(() => {
    app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
});