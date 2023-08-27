module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    // Define other fields if needed
  });

  Comment.associate = (models) => {
    // Associate with User model (comment creator)
    Comment.belongsTo(models.User, {
      foreignKey: {
        allowNull: false,
      },
    });

    // Associate with Post model (the post the comment belongs to)
    Comment.belongsTo(models.Post, {
      foreignKey: {
        allowNull: false,
      },
    });
  };

  return Comment;
};
