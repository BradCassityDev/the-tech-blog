const express = require('express');
const sequelize = require('./config/connection');
//const session = require('express-session');
//const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();

// Use defined routes
app.use(require('./controllers'));

// Define port
const PORT = process.env.PORT || 3001;

// Connect to DB and start server
sequelize.sync({force: false}).then(() => {
    app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
});