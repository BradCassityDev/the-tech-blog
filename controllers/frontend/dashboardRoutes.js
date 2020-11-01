const router = require('express').Router();
const { User, Post, Comment } = require('../../models/index');

router.get('/', (req, res) => {
    Post.findAll({
        where: {
          user_id: req.session.user_id
        },
        include: [
          {
            model: Comment,
            include: {
              model: User,
              attributes: ['username']
            }
          },
          {
            model: User,
            attributes: ['username']
          }
        ]
      })
        .then(postData => {
          const posts = postData.map(post => post.get({ plain: true }));
          res.render('dashboard', { posts, loggedIn: true });
        })
        .catch(err => {
          console.log(err);
          res.status(500).json(err);
        });
});

module.exports = router;