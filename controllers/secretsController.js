const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.route('/')

.get((req, res) => {
    const userId = req.session.userId;

    User.findById(userId, (err, foundUser) => {
        if (err) {
            console.log(err);
            return;
        }
        res.render('secrets.ejs', {user: foundUser});
    });
});










module.exports = router;