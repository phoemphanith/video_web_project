const express = require("express");

const router = express.Router();

const {
  userLogin,
  userRegister,
  getAllUser,
  getUserProfile,
} = require("../controllers/userControllers");
const protect = require("../middleware/authMiddleware");

router.route("/").post(userRegister);
router.post("/login", userLogin);

router.route("/profile").get(protect, getUserProfile);
router.get("/", getAllUser);

module.exports = router;
