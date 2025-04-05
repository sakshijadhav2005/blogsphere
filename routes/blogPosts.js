const express = require("express");
const { createPost, getUserPosts , deletePost, updatePost,getPostsByUserId } = require("../Controller/blogPostController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();
router.post("/", authMiddleware, createPost);
// router.get("/", authMiddleware,getUserPosts);


// ✅ Corrected route for user posts
router.get("/user/:id", authMiddleware, getPostsByUserId); // ✅ Route should look like this
// ✅ Route should look like this
router.delete("/:id", authMiddleware, deletePost);
router.put("/:id", authMiddleware, updatePost);


module.exports = router;

