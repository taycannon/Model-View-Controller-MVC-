//Index

const User = require('./user');
const Post = require('./posts');
const Comment = require('./comments');

User.hasMany(Post, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Post.belongsTo(User, {
  foreignKey: 'user_id'
});

Post.hasMany(Comment,{
  foreignKey: 'post_id'
})

Comment.belongsTo(Post, {
    foreignKey: 'post_id',
})

module.exports = { User, Post, Comment };