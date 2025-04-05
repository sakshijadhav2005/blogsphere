const mongoose = require('mongoose');
const express = require('express');
const app = express();
const connectDB = require('../server/DB/index.js');

const blogPosts = require("../server/routes/blogPosts.js");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const cors = require("cors");
app.use(cors());
connectDB();

app.use("/api/auth", require("./routes/auth"));

// ✅ User Signup & Login

app.use("/api/posts", require("./routes/blogPosts"));

// ✅ Blog Posts

app.listen(5000 || process.env.PORT, () => {
  console.log('Server is running on port 5000');
});
