const express = require("express");
const asyncHandler = require("express-async-handler");
const router = express.Router();

const Comment = require("../models/commentModel");

// @desc     Fetch all comments
// @route    GET /api/videos
// @access   Public
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const comments = await Comment.find({});
    res.json(comments);
  })
);

// @desc     Find comment by videos id
// @route    GET /api/comments/:id
// @access   Public
router.get(
  "/:videoId",
  asyncHandler(async (req, res) => {
    const comments = await Comment.findOne({
      video_entry_id: req.params.videoId,
    });
    res.json(comments);
  })
);

module.exports = router;
