const express = require("express");
const { protect } = require("../middleware/authMiddleware"); // Ensure this path is correct
const {
  registerUser,
  loginUser,
  getUserInfo,
} = require("../controllers/authController"); // Ensure this path is correct
const upload = require("../middleware/uploadMiddleware"); // Ensure this path is correct
const router = express.Router();

// Define routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/getUser", protect, getUserInfo);
router.post("/upload-image", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }
  const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${
    req.file.filename
  }`; // Construct the image URL
  res.status(200).json({ imageUrl });
}); // Added POST method for getUser

module.exports = router;
