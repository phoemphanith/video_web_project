const express = require("express");
const asyncHandler = require("express-async-handler");
const multer = require("multer");

const router = express.Router();

const Video = require("../models/videosModel");
const Comment = require("../models/commentModel");
const User = require("../models/userModel");

// @desc     Fetch all videos
// @route    GET /api/videos
// @access   Public
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const videos = await Video.find({});
    res.json(videos);
  })
);

// @desc     Fetch single video
// @route    GET /api/videos/:id
// @access   Public
router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const video = await Video.findById(req.params.id);
    if (video) {
      res.json(video);
    } else {
      res.status(404);
      throw new Error("Video not found");
    }
  })
);

// @desc     Update single video
// @route    PATHCH /api/videos/:id
// @access   Public
router.patch(
  "/:id",
  asyncHandler(async (req, res) => {
    try {
      await Video.updateOne({ _id: req.params.id }, { $set: req.body });
      res.json({ message: "Updated Success" });
    } catch (error) {
      throw new Error(`Video not found ${error}`);
    }
  })
);

// @desc     Delete single video
// @route    PATHCH /api/videos/:id
// @access   Public
router.delete(
  "/:id",
  asyncHandler(async (req, res) => {
    try {
      await Video.findByIdAndDelete(req.params.id);
      res.json({ message: "Deleted Successfully" });
    } catch (error) {
      throw new Error(`Video not found ${error}`);
    }
  })
);

// @desc     Filter video
// @route    PATHCH /api/videos/category/:name
// @access   Public
router.get(
  "/category/:name",
  asyncHandler(async (req, res) => {
    try {
      const filterVideo = await Video.find({ category: req.params.name });
      res.json(filterVideo);
    } catch (error) {
      throw new Error(`Video not found ${error}`);
    }
  })
);

// @desc     Upload single video
// @route    POST /api/videos/upload
// @access   Public
//* Init directory to store video
const DIR = "./public/";

//* Create storage and name file with extention
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(" ").join("-");
    cb(null, fileName);
  },
});

//* create multer
var upload = multer({
  storage: storage,
});

router.post("/upload", upload.single("file"), async (req, res, next) => {
  const url = req.protocol + "://" + req.get("host");
  const reqFiles = url + "/public/" + req.file.filename;
  const today = new Date();

  const newVideo = new Video({
    user: req.body.adminUser,
    name: req.body.title,
    video_file: reqFiles,
    description: req.body.description,
    category: req.body.category,
    publicDate: today,
  });
  await newVideo.save();
});

// @desc     Video like
// @route    PATCH /api/videos/:id/like
// @access   Public
router.patch(
  "/:id/like",
  asyncHandler(async (req, res) => {
    try {
      const videoId = req.params.id;
      const response = await Video.findById(videoId);

      response.like = response.like + 1;
      await Video.updateOne({ _id: req.params.id }, { like: response.like });

      res.json({ message: "Video like +1 Success" });
    } catch (error) {
      throw new Error(`Video not found ${error}`);
    }
  })
);

// @desc     Video dislike
// @route    PATCH /api/videos/:id/dislike
// @access   Public
router.patch(
  "/:id/dislike",
  asyncHandler(async (req, res) => {
    try {
      const videoId = req.params.id;
      const response = await Video.findById(videoId);

      response.dislike = response.dislike + 1;
      await Video.updateOne(
        { _id: req.params.id },
        { dislike: response.dislike }
      );

      res.json({ message: "Video dislike +1 Success" });
    } catch (error) {
      throw new Error(`Video not found ${error}`);
    }
  })
);

// @desc     Video get reward
// @route    PATCH /api/videos/:id/reward
// @access   Public
router.patch(
  "/:id/reward",
  asyncHandler(async (req, res) => {
    try {
      const videoId = req.params.id;
      const userId = req.body.userId;

      const response = await Video.findById(videoId);
      const user = await User.findById(userId);

      response.rewardPoint =
        parseInt(response.rewardPoint) + parseInt(req.body.reward);

      await Video.updateOne(
        { _id: req.params.id },
        { rewardPoint: response.rewardPoint }
      );
      await User.updateOne(
        { _id: userId },
        { rewardPoint: parseInt(user.rewardPoint) - parseInt(req.body.reward) }
      );

      res.json({ message: `Now,video has ${response.rewardPoint} coins.` });
    } catch (error) {
      throw new Error(`Video not found ${error}`);
    }
  })
);

// @desc     Comment on video
// @route    PATCH /api/videos/:id/comment
// @access   Public
router.patch(
  "/:id/comment",
  asyncHandler(async (req, res) => {
    const videoId = req.params.id;
    const commentNew = req.body.comment;
    const userId = req.body.userid;
    const today = new Date();

    const response = await Comment.find({ video_entry_id: videoId });

    if (response === undefined || response.length === 0) {
      const newComment = new Comment({
        video_entry_id: videoId,
        comments: [
          {
            user: userId,
            created_on: today,
            comment: commentNew,
          },
        ],
      });
      try {
        await newComment.save();
        res.json({ message: "Comment is completed" });
      } catch (error) {
        throw new Error(`Created comment fail: ${error}`);
      }
    } else {
      response[0].comments = response[0].comments.push({
        user: userId,
        created_on: today,
        comment: commentNew,
      });

      try {
        await Comment.updateOne(
          { _id: response[0]._id },
          { comments: response[0].comments }
        );
        res.json({ message: "Comment is completed" });
      } catch (error) {
        throw new Error(error);
      }
    }
  })
);

// @desc     Fetch video by user
// @route    PATCH /api/user/:idt
// @access   Public
router.get(
  "/user/:id",
  asyncHandler(async (req, res) => {
    try {
      const userId = req.params.id;
      const response = await Video.find({ user: userId });

      res.json(response);
    } catch (error) {
      throw new Error(`Video not found ${error}`);
    }
  })
);

module.exports = router;
