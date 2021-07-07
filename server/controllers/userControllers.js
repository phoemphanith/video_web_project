const asyncHandler = require("express-async-handler");
const generateToken = require("../utils/generateToken");
const User = require("../models/userModel");

//TODO: Protect data route
// @desc     fetch all users
// @route    GET /api/user
// @access   Private
const getAllUser = asyncHandler(async (req, res) => {
  try {
    const response = await User.find({});
    res.json(response);
  } catch (error) {
    throw new Error(`Not Authorization: ${error}`);
  }
});

// @desc    Auth user & get token
// @route   POST /api/user/login
// @access  Public
const userLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      rewardPoint: user.rewardPoint,
      img: user.img,
      isActive: user.isActive,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email and password");
  }
});

// @desc    User register
// @route   POST /api/user/login
// @access  Public
const userRegister = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExit = await User.findOne({ email });
  if (userExit) {
    res.status(400);
    throw new Error("Email already exits");
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      img: user.img,
      isActive: user.isActive,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc   Get user profile
// @route   GET /api/user/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      img: user.img,
      isActive: user.isActive,
      rewardPoint: user.rewardPoint,
    });
  } else {
    res.status(401);
    throw new Error("User not found");
  }
});
// @desc     user buy coin
// @route    PATCH /api/user
// @access   Private
const userBuyCoin = asyncHandler(async (req, res) => {
  const { rewardPoint } = req.body;
  const userId = req.params.id;
  try {
    await User.updateOne({ _id: userId }, { rewardPoint: rewardPoint });
    res.json({ message: "User by coin complete" });
  } catch (error) {
    throw new Error("Cannot buy");
  }
});

// @desc     Banned user
// @route    PATCH /api/user
// @access   Private
const banUser = asyncHandler(async (req, res) => {
  const status = req.body.status;
  const userId = req.params.id;
  try {
    console.log(status);
    await User.updateOne({ _id: userId }, { isActive: status });
    res.json({ message: `Success ${status ? "Active" : "Banned"}` });
  } catch (error) {
    res.status(404);
    throw new Error("User not found");
  }
});

module.exports = {
  userLogin,
  userRegister,
  getAllUser,
  getUserProfile,
  userBuyCoin,
  banUser,
};
