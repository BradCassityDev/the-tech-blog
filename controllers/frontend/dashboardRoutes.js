const router = require('express').Router();
const { User, Post, Comment } = require('../../models/index');

router.get('/', (req, res) => {
    res.render('dashboard');
});

module.exports = router;