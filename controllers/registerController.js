const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.route('/')

.get((req, res) => {
    res.render('register.ejs');
})

.post((req, res) => {
    const newUser = new User({
        email: req.body.username,
        password: req.body.password
    });

    newUser.save((err, user) => {
        if (err) {
            console.log(err);
            return;
        }
        req.session.userId = user.id;
        req.session.save((err) => {
            if(err){
                console.log(err);
                return;
            }
            res.redirect('/secrets');
        });
    });
});










module.exports = router;