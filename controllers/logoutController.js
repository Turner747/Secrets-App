const express = require('express');
const router = express.Router();

router.route('/')

.get((req, res) => {
    req.logout((err) => {
        if(err){
            console.log(err);
            return;
        }
        res.redirect('/');
    });
});

module.exports = router;