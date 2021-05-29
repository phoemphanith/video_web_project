const express = require("express");
const asyncHandler = require("express-async-handler");
const router = express.Router();

const Category = require("../models/categoryModel");

// @desc     Fetch all Categories
// @route    GET /api/videos
// @access   Public
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const categories = await Category.find({});
    res.json(categories);
  })
);

// @desc     Add a Category
// @route    Post /api/categories/add-new-category
// @access   Public
router.post("/add-new-category", async (req, res) => {
  const today = new Date();
  const newCategory = new Category({
    name: req.body.name,
    created_on: today,
  });
  await newCategory.save();
});

router.delete("/:id", async (req, res) => {
  await Category.deleteOne({ _id: req.params.id }, function (err) {
    if (!err) {
      res.send("Successfully Delete");
    }
  });
});

module.exports = router;
