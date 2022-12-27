const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require("bcrypt");
const saltRounds = 10;
const passport = require('passport');

router.route('/')

.get((req, res) => {
    if(req.isAuthenticated()){
        res.redirect('/secrets');
        return;
    }

    res.render('register.ejs', {user: null});
})

.post((req, res) => {

    const newUser = new User({
        name: req.body.name,
        username: req.body.username
    });

    User.register(newUser, req.body.password, (err, user) => {
        if(err){
            console.log(err);
            res.redirect("/register", {user: null});
            return;
        }
        passport.authenticate("local")(req, res, () => {
            res.redirect('/secrets');
        });
    });
});


module.exports = router;