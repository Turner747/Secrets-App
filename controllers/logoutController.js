const express = require('express');
const router = express.Router();

router.route('/')

.get((req, res) => {
    req.session.destroy();
    res.redirect("/");
});









module.exports = router;