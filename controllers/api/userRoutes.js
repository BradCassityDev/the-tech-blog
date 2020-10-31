const router = require('express').Router();
const { User, Post } = require('../../models/index');

// Get all users - /api/users/
router.get('/', (req, res) => {
    User.findAll({
        attributes: {exclude: ['password']}
    })
    .then(userData => {
        res.json({userData});
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({err});
    });
});

// Get single user - /api/users/:id
router.get('/:id', (req, res) => {
    User.findOne({
        where: {
            id: req.params.id
        },
        attributes: {exclude: ['password']}
    })
    .then(userData => {
        if(!userData) {
            res.status(404).json({message: 'No user found with that id'});
            return;
        }
        res.json(userData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({err});
    });
});

// Create new user - /api/users/
router.post('/', (req, res) => {
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })
    .then(userData => {
        res.json(userData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// Delete a user - /api/users/:id
router.delete('/:id', (req, res) => {
    User.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(userData => {
        if (!userData) {
            res.status(404).json({message: 'No user found with this id'});
            return;
        }
        res.json(userData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;