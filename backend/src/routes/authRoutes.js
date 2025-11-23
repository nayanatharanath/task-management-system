const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const validate = require("../middleware/validate");

// Register a new user (POST - /api/auth/register)
router.post("/register", validate("register"), authController.register);

// Login a user (POST - /api/auth/login)
router.post("/login", validate("login"), authController.login);

module.exports = router;
