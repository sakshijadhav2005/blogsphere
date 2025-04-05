const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/sakshi_blog");

    console.log("MongoDB Connected");
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1); 
  }
};
module.exports = connectDB;
