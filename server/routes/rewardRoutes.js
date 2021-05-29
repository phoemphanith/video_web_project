const express = require("express");
const asyncHandler = require("express-async-handler");

const Reward = require("../models/rewardModel");

const router = express.Router();

// @desc     fetch all users
// @route    PATCH /api/user
// @access   Public
router.get(
  "/",
  asyncHandler(async (req, res) => {
    try {
      const response = await Reward.find({});
      res.json(response);
    } catch (error) {
      throw new Error(`Someting wrong: ${error}`);
    }
  })
);

router.post(
  "/",
  asyncHandler(async (req, res) => {
    const newReward = new Reward({
      name: req.body.name,
      border_color: req.body.color,
      price: req.body.coin * 0.05,
      rewardPoint: req.body.coin,
    });

    if (newReward) {
      try {
        await newReward.save();
        res.send({ message: "Upload new reward successfully" });
      } catch (error) {
        throw new Error(`Something wrong ${error}`);
      }
    } else {
      throw new Error("It is empty object");
    }
  })
);

router.delete(
  "/:id",
  asyncHandler(async (req, res) => {
    try {
      await Reward.findByIdAndDelete(req.params.id);
      res.json({ message: "Reward deleted" });
    } catch (error) {
      throw new Error(`Can't delete: ${error}`);
    }
  })
);

module.exports = router;
