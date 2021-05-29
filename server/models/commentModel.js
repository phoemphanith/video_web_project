const mongoose = require("mongoose");

const commentsSchema = mongoose.Schema(
  {
    video_entry_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Video",
    },
    comments: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        created_on: {
          type: Date,
        },
        comment: {
          type: String,
        },
      },
    ],
  },
  { timestamps: true }
);

const Comment = mongoose.model("Comment", commentsSchema);

module.exports = Comment;
