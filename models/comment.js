const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
// created my variables for data types and require

class Comment extends Model {}
// created my table for comment
Comment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,

      allowNull: true,
      defaultValue: null,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id",
      },
    },
    post_id: {
      type: DataTypes.INTEGER,

      references: {
        model: "post",
        key: "id",
      },
    },
  },

  {
    sequelize,
    underscored: true,
    timestamps: false, // not necessary since I am handling this manually
    modelName: "comment",
  }
);
// module exports
module.exports = Comment;

/* User.hasMany(Comment, {
foreignKey: "user_id",
onDelete: "CASCADE",
}

Comment.belongsTo(User);

Post.hasMany(Comment, {
foreignKey: "post_id",
onDelete: "CASCADE",

})
Comment.belongsTo(Post);
*/
