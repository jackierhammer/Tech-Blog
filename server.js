// the server will be started from this file

// imports npm modules
const path = require("path");
const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");

// imports date format helper
const helpers = require('./utils/helpers');

// initializes app
const app = express();
// opens a port different from server port
const PORT = process.env.PORT || 3001;

// sequelize imports
const sequelize = require("./config/connection.js");
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// session info
const sess = {
    secret: "Super secret secret",
    cookie: {
        maxAge: 300000,
        httpOnly: true,
        secure: false,
        sameSite: 'strict',
    },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

// connect app to session
app.use(session(sess));

// express handlebars
// set us Handlebars.js engine 
const hbs = exphbs.create({ helpers });

// handlebars connection
// commented out until database is done and debugged
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// once controllers are set up, this will connect them to the app
app.use(require('./controllers/'));

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
    sequelize.sync({ force: false });
});