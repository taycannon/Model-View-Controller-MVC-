//Index

const User = require('./user');
const Post = require('./posts');
const Comment = require('./comments');

User.hasMany(post, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Post.belongsTo(user, {
  foreignKey: 'user_id'
});

Post.hasMany(comment,{
  foreignKey: 'post_id'
})

Comment.belongsTo(Post, {
    foreignKey: 'post_id',
})

module.exports = { User, Post, Comment };