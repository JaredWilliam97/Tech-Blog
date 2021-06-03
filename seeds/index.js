const sequelize = require("../config/connection");
const seedUsers = require("./seedUser");
const seedPosts = require("./seedPost");
const seedComments = require("./seedComment");
// created the seed all function
const seedAll = async () => {
  await sequelize.sync({ force: true });
  // made seedUser, seedPost, and seedComments
  await seedUsers();
  await seedPosts();
  await seedComments();

  process.exit(0);
};

seedAll();
