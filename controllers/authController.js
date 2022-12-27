const express = require('express');
const router = express.Router();
const passport = require('passport');

// google auth
router.route('/google')

    .get(passport.authenticate('google', { scope: ['profile', 'email'] }));

router.route('/google/secrets')

    .get(passport.authenticate('google', { failureRedirect: '/login' }), (req, res) => {
        res.redirect('/secrets');
    });


// facebook auth
router.route('/facebook')

    .get(passport.authenticate('facebook', { scope: ['email'] }));

router.route('/facebook/secrets')

    .get(passport.authenticate('facebook', { failureRedirect: '/login' }), (req, res) => {
        res.redirect('/secrets');
    });



module.exports = router;