const express = require('express');
const router = express.Router();

router.route('/')

.get((req, res) => {
    if(req.isAuthenticated()){
        res.redirect('/secrets');
    }
    else {
        res.render('home.ejs', {user: null});
    }
});


module.exports = router;