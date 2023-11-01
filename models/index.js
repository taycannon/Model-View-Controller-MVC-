//Index

const user = require('./user');
const post = require('./posts');
const comment = require('./comments');

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

module.exports = { User, Posts, Comment };