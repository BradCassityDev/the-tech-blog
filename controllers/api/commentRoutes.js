const router = require('express').Router();
const { User, Post, Comment } = require('../../models/index');

// Get all comments - /api/comments/
router.get('/', (req, res) => {
    Comment.findAll()
    .then(commentData => res.json(commentData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

// Create a comment - /api/comments/
router.post('/', (req, res) => {
    Comment.create({
        comment: req.body.comment,
        post_id: req.body.post_id,
        user_id: req.body.user_id
    })
    .then(commentData => {
        res.json(commentData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

// Delete a comment - /api/comments/:id
router.delete('/:id', (req, res) => {
    Comment.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(commentData => {
        if (!commentData) {
            res.status(404).json({message: 'No comment was found with this id'});
            return;
        }
        res.json(commentData);
    })
    .catch(err => {
        console.log(err);
        res.status(500);
    });
});

module.exports = router;