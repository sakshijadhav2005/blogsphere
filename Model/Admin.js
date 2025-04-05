//schema for admin

const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["user", "admin"], default: "admin" }, 
  resetToken: { type: String },
  tokenExpiry: { type: Date ,expires: 3600}
}, { timestamps: true });

const  Admin= mongoose.model("admin", AdminSchema);
module.exports = Admin;
