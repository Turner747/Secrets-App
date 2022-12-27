const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Secret = require('../models/secret');

router.route('/')

.get((req, res) => {
    if(!req.isAuthenticated()){
        res.redirect('/login');
        return;
    }
    const userId = req.session.passport.user;

    User.findById(userId, (err, foundUser) => {
        if (err) {
            console.log(err);
            return;
        }
        if(!foundUser){
            console.log("User not found");
            res.redirect("/logout");
            return;
        }

        res.render('submit.ejs', {user: foundUser});
    });
})

.post((req, res) => {
    if(!req.body.secret){
        res.redirect('/submit');
        return;
    }

    const userId = req.session.passport.user;
    const secret = new Secret({
        content: req.body.secret
    });

    User.findById(userId, (err, foundUser) => {
        if (err) {
            console.log(err);
            return;
        }
        if(!foundUser){
            console.log("User not found");
            res.redirect("/logout");
            return;
        }

        foundUser.secrets.push(secret);
        foundUser.save((err, user) => {
            if (err) {
                console.log(err);
                return;
            }
            res.redirect('/secrets');
        });
    });

});


module.exports = router;