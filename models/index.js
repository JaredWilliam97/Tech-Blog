const User = require("./user");
const Post = require("./post");
const Comment = require("./comment");

User.hasMany(Post, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

User.hasMany(Comment, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

Post.hasMany(Comment, {
  foreignKey: "post_id",
  onDelete: "CASCADE",
});

Comment.belongsTo(User);
Comment.belongsTo(Post);
Post.belongsTo(User);
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

module.exports = { User, Post, Comment };
