const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.route('/')

.get((req, res) => {
    if(!req.isAuthenticated()){
        res.redirect("/login");
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

        res.render('secrets.ejs', {user: foundUser});
    });
});


module.exports = router;