const sequelize = require('../config/connection');
console.log('sequelize instance:', sequelize);

const User = require('./User');
const { Post } = require('./Post');
const { Comment } = require('./Comment');

// Set up associations
User.hasMany(Post, {
  onDelete: 'cascade',
  onUpdate: 'cascade',
  foreignKey: 'user_id',
});

Post.belongsTo(User, {
  onDelete: 'cascade',
  onUpdate: 'cascade',
  foreignKey: 'user_id',
});

Post.hasMany(Comment, {
  onDelete: 'cascade',
  onUpdate: 'cascade',
  foreignKey: 'post_id',
});

Comment.belongsTo(Post, {
  onDelete: 'cascade',
  onUpdate: 'cascade',
  foreignKey: 'post_id',
});

module.exports = { User, Post, Comment };
