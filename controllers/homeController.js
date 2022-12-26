const express = require('express');
const router = express.Router();

router.route('/')

.get((req, res) => {
    if(req.session.userId){
        res.redirect('/secrets');
    }
    else {
        res.render('home.ejs');
    }
});









module.exports = router;