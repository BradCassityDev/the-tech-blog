const express = require('express');
const sequelize = require('./config/connection');
const exphbs = require('express-handlebars');
const path = require('path');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const helpers = require('./utils/helpers');
const app = express();

app.use(session({
    secret: process.env.SessionSecret,
    cookie: {
        maxAge: 60000
    },
    rolling: true,
    resave: true,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
}));

const hbs = exphbs.create({helpers});

// Middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

// Template Engine
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Use defined routes
app.use(require('./controllers'));

// Define port
const PORT = process.env.PORT || 3001;

// Connect to server if valid db connection established
sequelize.sync({force: false}).then(() => {
    app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
});