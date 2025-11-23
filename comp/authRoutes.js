const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const validate = require('../middleware/validate');

// POST /api/auth/register - Register a new user
router.post('/register', validate('register'), authController.register);

// POST /api/auth/login - Login user
router.post('/login', validate('login'), authController.login);

module.exports = router;
