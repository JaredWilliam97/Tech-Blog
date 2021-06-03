const { User } = require("../models");

const users = [
  {
    name: "user1",
    password: "pass0001",
  },
  {
    name: "user2",
    password: "pass0002",
  },
];

const seedUsers = () =>
  User.bulkCreate(users, {
    individualHooks: true,
  });

module.exports = seedUsers;
