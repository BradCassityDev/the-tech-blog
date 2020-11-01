const router = require('express').Router();
const { User, Post, Comment } = require('../../models/index');

// Render Home page - /
router.get('/', (req, res) => {
    Post.findAll({
        order: [['created_at', 'Desc']],
        include: [
            {
                model: User,
                attributes: ['id', 'username']
            },
            {
                model: Comment,
                attributes: ['id', 'comment', 'created_at', 'user_id', 'post_id'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            }
        ]
    })
    .then(postData => {
        const posts = postData.map(post => post.get({plain: true}));
        res.render('home', { posts });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// Render Login page - /login
router.get('/login', (req, res) => {
    if (req.session.isLoggedIn) {
        res.redirect('/');
        return;
    }
    res.render('login');
});

// Render Signout page - /signup
router.get('/signup', (req, res) => {
    if (req.session.isLoggedIn) {
        res.redirect('/');
        return;
    }
    res.render('signup');
});

module.exports = router;