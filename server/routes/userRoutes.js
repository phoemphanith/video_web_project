const express = require("express");
const multer = require("multer");
const router = express.Router();
const User = require("../models/userModel");

const {
  userLogin,
  userRegister,
  getAllUser,
  getUserProfile,
  userBuyCoin,
  banUser,
} = require("../controllers/userControllers");
const protect = require("../middleware/authMiddleware");

// @desc     User update profile picture
// @route    POST /api/videos/upload
// @access   Public
//* Init directory to store video
const DIR = "./public/pictures";

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

router.patch("/:id/update", upload.single("file"), async (req, res, next) => {
  const url = req.protocol + "://" + req.get("host");
  const reqFiles = url + "/public/pictures/" + req.file.filename;
  try {
    await User.updateOne({ _id: req.params.id }, { img: reqFiles });
    res.json({ message: "Update profile successfully" });
  } catch (error) {
    res.status(404);
    throw new Error("User not found, cannot update");
  }
});

router.route("/").post(userRegister);
router.post("/login", userLogin);
router.patch("/:id", banUser);

router.route("/profile").get(protect, getUserProfile);

router.get("/", getAllUser);

router.route("/userbuy").patch(protect, userBuyCoin);

module.exports = router;
