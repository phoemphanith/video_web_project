const express = require("express");
const asyncHandler = require("express-async-handler");

const User = require("../models/userModel");

const router = express.Router();

// @desc     fetch all users
// @route    PATCH /api/user
// @access   Public
router.get(
  "/",
  asyncHandler(async (req, res) => {
    try {
      const response = await User.find({});
      res.json(response);
    } catch (error) {
      throw new Error(`Someting wrong: ${error}`);
    }
  })
);

module.exports = router;
