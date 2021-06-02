const { Comment } = require("../models");
// created commentData
const commentData = [
  {
    comment: "Test comment 2 for post 1",
    created_at: new Date(2021, 3, 34, 17, 09, 12, 0),
    updated_at: new Date(2021, 3, 39, 7, 14, 17, 0),
    user_id: 1,
    post_id: 1,
  },
  {
    // comment: test comment 3 for post 1
    comment: "Test comment 3 for post 1",
    user_id: 1,
    post_id: 1,
  },
  {
    //comment: test comment 2 for past
    comment: "Test comment 2 for past",
    created_at: new Date(2021, 2, 34, 12, 09, 17, 0),
    user_id: 1,
    post_id: 2,
  },
  {
    // comment: test comment 2 for updated
    comment: "Test comment 2 for updated",
    created_at: new Date(2021, 3, 26, 13, 03, 14, 0),
    updated_at: new Date(2021, 5, 29, 6, 12, 13, 0),
    user_id: 2,
    post_id: 2,
  },
  {
    // made some tweaking to this
    comment: "Comment.",
    user_id: 1,
    post_id: 1,
  },
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;
