const mongoose = require("mongoose");

const reportSchema = mongoose.Schema(
  {
    videoId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Video",
    },
    reports: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        video_problem: {
          type: Boolean,
          required: true,
          default: false,
        },
        sound_problem: {
          type: Boolean,
          required: true,
          default: false,
        },
        other_problem: {
          type: String,
        },
      },
    ],
  },
  { timestamps: true }
);

const Report = mongoose.model("Report", reportSchema);

module.exports = Report;
