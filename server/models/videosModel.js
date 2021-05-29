const mongoose = require("mongoose");

const videoSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      required: true,
    },
    video_file: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    publicDate: {
      type: Date,
      required: true,
    },
    view: {
      type: Number,
      required: true,
      default: 0,
    },
    like: {
      type: Number,
      required: true,
      default: 0,
    },
    dislike: {
      type: Number,
      required: true,
      default: 0,
    },
    rewardPoint: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true }
);

const Video = mongoose.model("Video", videoSchema);

module.exports = Video;
