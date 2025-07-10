const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  getUserInfo,
} = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

router.post("/register", upload.single("image"), registerUser);
router.post("/login", loginUser);
router.get("/getUser", protect, getUserInfo);

module.exports = router;
