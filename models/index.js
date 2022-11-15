// this is where foreign key relationships will go

// imports all three model types 
const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

// posts belong to users
Post.belongsTo(User, {
    foreignKey: 'userId',
    onDelete: 'CASCADE'
});

// comments belong to users
Comment.belongsTo(User, {
    foreignKey: 'userId',
    onDelete: 'CASCADE'
});

// posts have comments
Post.hasMany(Comment, {
    foreignKey: 'postId',
    onDelete: 'CASCADE'
});

// exports updated model relationships
module.exports = {
    User,
    Post,
    Comment
};