const express = require('express');
const { registerUser, authUser, updateUserPreferences } = require('../controllers/userController');
const { protect } = require('../middlewares/authMiddleware'); // JWT verification middleware

const router = express.Router();

// Routes for registration and login
router.post('/register', registerUser); // User registration
router.post('/login', authUser); // User login
router.put('/preferences', protect, updateUserPreferences); // Update preferences

module.exports = router;
