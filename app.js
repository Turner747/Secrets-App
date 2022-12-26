require("dotenv").config();
const express = require('express');
const bodyParser = require("body-parser");
const ejs = require("ejs");
const connection = require("./mongoose");
const session = require('express-session');
const cookieParser = require('cookie-parser');

// controllers
const homeController = require('./controllers/homeController');
const loginController = require('./controllers/loginController');
const registerController = require('./controllers/registerController');
const secretsController = require('./controllers/secretsController');
const submitController = require('./controllers/submitController');
const logoutController = require('./controllers/logoutController');

const app = express();
const port = process.env.PORT || 3000;
const oneDay = 1000 * 60 * 60 * 24;
//let session;

// middleware
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(session({
    secret: process.env.SECRET,
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
    resave: false
}));
app.use(cookieParser());

// routes
app.use('/', homeController);
app.use('/login', loginController);
app.use('/register', registerController);
app.use('/secrets', secretsController);
app.use('/submit', submitController);
app.use('/logout', logoutController);

app.listen(port, () => {
    console.log("Server started on port " + port);
});

module.exports = app;