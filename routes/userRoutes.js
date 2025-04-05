const express = require("express");
const { authMiddleware } = require("../middleware/authMiddleware");
const User = require("../models/User");
const BlogPost = require("../models/BlogPost");

const router = express.Router();

/** 
 * @desc    Get user profile and their posts
 * @route   GET /api/users/profile
 * @access  Private
 */
router.get("/profile", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    const posts = await BlogPost.find({ author: req.user.id }).sort({ createdAt: -1 });
    res.json({ user, posts });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
