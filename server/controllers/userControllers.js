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
    throw new Error(`Someting wrong: ${error}`);
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
    throw new Error("User already exits");
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
    });
  } else {
    res.status(401);
    throw new Error("User not found");
  }
});

module.exports = {
  userLogin,
  userRegister,
  getAllUser,
  getUserProfile,
};
