const mongoose = require("mongoose");
const connectDB = require("./config/db");
const users = require("./data/users");
const videos = require("./data/videos");
const categories = require("./data/categories");
const rewards = require("./data/rewards");
const User = require("./models/userModel");
const Video = require("./models/videosModel");
const Category = require("./models/categoryModel");
const Reward = require("./models/rewardModel");
const Comment = require("./models/commentModel");

connectDB();

const importData = async () => {
  try {
    await User.deleteMany();
    await Video.deleteMany();
    await Category.deleteMany();
    await Reward.deleteMany();
    await Comment.deleteMany();

    const createUsers = await User.insertMany(users);

    const adminUser = createUsers[0]._id;

    const sampleVideos = videos.map((video) => {
      return { ...video, user: adminUser };
    });

    await Video.insertMany(sampleVideos);
    await Category.insertMany(categories);
    await Reward.insertMany(rewards);

    console.log("Data Imported");
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await User.deleteMany();
    await Video.deleteMany();
    await Category.deleteMany();
    await Reward.deleteMany();
    await Comment.deleteMany();

    console.log("Data Destroy");
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
