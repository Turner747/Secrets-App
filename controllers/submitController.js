const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Secret = require('../models/secret');

router.route('/')

.get((req, res) => {
    const userId = req.session.userId;
    console.log(userId);
    res.render('submit.ejs');
})

.post((req, res) => {
    const userId = req.session.userId;
    const secret = new Secret({
        content: req.body.secret
    });

    User.findById(userId, (err, user) => {
        if (err) {
            console.log(err);
            return;
        }
        user.secrets.push(secret);
        user.save((err, user) => {
            if (err) {
                console.log(err);
                return;
            }
            res.redirect('/secrets');
        });
    });

});











module.exports = router;