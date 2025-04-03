const express = require('express');
const router = express.Router();
const { login, register, refreshToken, logout } = require('../controllers/authController');

// Auth routes
router.post('/register', register);
router.post('/login', login);
router.post('/refresh', refreshToken);
router.post('/logout', logout);

module.exports = router; 