const BlogPost = require("../Model/BlogPost");

const createPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const post = new BlogPost({ title, content, author: req.user._id });
    await post.save();
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

//get user all posts

const getUserPosts = async (req, res) => {
  try { 
    const post = await BlogPost.find({ author: req.user._id });
    res.json(post);  
  }
  catch (error) {
    console.error("Error fetching posts:", error.message);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

//delete post by id
const deletePost = async (req, res) => {
  try {
    const post = await BlogPost.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // ✅ Only allow the author to delete the post
    // if (post.author.toString() !== req.user._id.toString()) {
    //   return res.status(403).json({ message: "Unauthorized to delete this post" });
    // }

    await BlogPost.findByIdAndDelete(req.params.id);
    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error("Error deleting post:", error.message);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};



const getPostsByUserId = async (req, res) => {
  try {
    const userId = req.params.id;
    console.log("Fetching posts for user:", userId); // ✅ Debugging log

    const posts = await BlogPost.find({ author: userId }); // ✅ Ensure field name matches database 
    // if (!posts || posts.length === 0) {
    //   return res.status(404).json({ message: "No posts found for this user" });
    // }

    res.json(posts);
  } catch (error) {
    console.error("Error fetching user posts:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};





//update post by id

const updatePost = async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: "Title and content are required." });
    }

    const post = await BlogPost.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // ✅ Only allow the author to update the post
    if (post.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized to update this post" });
    }

    post.title = title;
    post.content = content;
    await post.save();
    
    res.json(post);
  } catch (error) {
    console.error("Error updating post:", error.message);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};


module.exports = { createPost, deletePost, updatePost,getPostsByUserId};
