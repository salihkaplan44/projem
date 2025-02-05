const express = require('express');
const router = express.Router();
const {
  register,
  login,
  forgotPassword,
  resetPassword
} = require('../controllers/authController');
const { authMiddleware } = require('../middlewares/authMiddleware');

// Public routes
router.post('/register', register);
router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.put('/reset-password/:token', resetPassword);

// Protected routes
router.get('/me', authMiddleware, (req, res) => {
  res.json({
    _id: req.user._id,
    name: req.user.name,
    email: req.user.email,
    isAdmin: req.user.isAdmin
  });
});

module.exports = router; 