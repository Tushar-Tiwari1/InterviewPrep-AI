const express = require("express");
const multer = require("multer");  // <-- ADD THIS
const { registerUser, loginUser, getUserProfile } = require("../controllers/authController");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

/* ------------------ MULTER STORAGE CONFIG ------------------ */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Make sure this folder exists
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });   // <-- DEFINE upload

/* ------------------ ROUTES ------------------ */

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", protect, getUserProfile);

/* ------------ FIXED IMAGE UPLOAD ROUTE ---------------- */
router.post("/upload-image", upload.single("image"), (req, res) => {  // FIX PATH
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
  
  res.status(200).json({ imageUrl });
});

/* ------------------------------------------------------- */

module.exports = router;
