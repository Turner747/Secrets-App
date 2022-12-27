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

    res.render('login.ejs', {user: null});
})

.post((req, res) => {
    const user = new User({
        username: req.body.username,
        password: req.body.password
    });

    req.login(user, (err) => {
        if (err){
            console.log(err);
            redirect('/login');
            return;
        }

        passport.authenticate("local")(req, res, () => {
            res.redirect('/secrets');
        });
    });
});
// .post(passport.authenticate("local", {
//     successRedirect: "/secrets",
//     failureRedirect: "/login"
// }), (req, res) => {
//
// });


module.exports = router;