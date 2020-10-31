const User = require('./User');
const Post = require('./Post');

// User can have zero or many blog posts
User.hasMany(Post, {
    foreignKey: 'user_id'
});

// Post can have one and only one user
Post.belongsTo(User, {
    foreignKey: 'user_id'
});

module.exports = { User, Post };