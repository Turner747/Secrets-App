const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.route('/')

.get((req, res) => {
    res.render('login.ejs');
})

.post((req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    User.findOne({email: username}, (err, foundUser) => {
        if(err){
            console.log(err);
            return;
        }

        if(foundUser.password !== password) {
            res.redirect('/login'); // todo: pass in login error bool
            return;
        }
        req.session.userId = foundUser.id;
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