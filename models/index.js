//Index

const user = require('./user');
const post = require('./posts');
const comment = require('./comments');

user.hasMany(post, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

post.belongsTo(user, {
  foreignKey: 'user_id'
});

post.hasMany(comment,{
  foreignKey: 'post_id'
})

comment.belongsTo(user, {
    foreignKey: 'user_id',
})

module.exports = { user, posts, comment };