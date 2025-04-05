
const express = require("express");
const { signup, login, forgotPassword, resetPassword,getAllUsers,deleteUser} = require("../Controller/authController");

const router = express.Router();
router.post("/signup", signup);
router.post("/login", login);

router.get("/getallusers", getAllUsers); // Get all users
router.delete("/deleteuser/:id", deleteUser); // Delete user by ID
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

module.exports = router;
