const bcrypt = require("bcryptjs");

const users = [
  {
    name: "Admin User",
    email: "admin@example.com",
    password: bcrypt.hashSync("123456", 10),
    rewardPoint: 100,
    isAdmin: true,
  },
  {
    name: "Jonh Doe",
    email: "john@example.com",
    password: bcrypt.hashSync("123456", 10),
    rewardPoint: 1000,
  },
  {
    name: "Jane Dara",
    email: "jane@example.com",
    password: bcrypt.hashSync("123456", 10),
    rewardPoint: 500,
  },
];

module.exports = users;
