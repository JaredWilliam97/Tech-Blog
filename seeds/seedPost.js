const { Post } = require("../models");
const { update } = require("../models/user");
const postData = [
  {
    // the titles for postSeed
    title: "Test post 1 for user 1",
    content: "Content for post 1",
    user_id: 1,
  },
  {
    title: "Test post 2 for user 1",
    content: "Content for post 2",
    user_id: 1,
  },
  {
    title: "Test post 1 for user 2",
    content: "Content for post 2",
    user_id: 2,
  },
  {
    title: "Test post 2 for user 2",
    content: "Content for post 2",
    user_id: 2,
  },
  {
    title: "How long of a post can it be?",
    content:
      "How long is a string of 255 bytes? I know that it is not necessarily 255 characters because not every character is exactly 1 byte.",
    user_id: 1,
    created_at: new Date(2021, 3, 26, 13, 03, 14, 0),
    updated_at: new Date(2021, 3, 29, 6, 12, 13, 0),
  },
];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;
