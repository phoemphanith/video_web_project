const mongoose = require("mongoose");

const rewardSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    border_color: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    rewardPoint: {
      type: Number,
      require: true,
    },
  },
  { timestamps: true }
);

const Reward = mongoose.model("Reward", rewardSchema);

module.exports = Reward;
