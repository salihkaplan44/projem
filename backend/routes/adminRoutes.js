const express = require('express');
const router = express.Router();
const {
  getDashboardStats,
  getAllUsers,
  getAllOrders,
  getSettings,
  updateSettings,
  updateUserRole
} = require('../controllers/adminController');
const { authMiddleware, adminMiddleware } = require('../middlewares/authMiddleware');
const upload = require('../middlewares/uploadMiddleware');

// Tüm rotalar admin yetkisi gerektirir
router.use(authMiddleware, adminMiddleware);

// Dashboard
router.get('/dashboard', getDashboardStats);

// Kullanıcı yönetimi
router.get('/users', getAllUsers);
router.put('/users/:id/role', updateUserRole);

// Sipariş yönetimi
router.get('/orders', getAllOrders);

// Site ayarları
router.get('/settings', getSettings);
router.put('/settings', upload.single('logo'), updateSettings);

module.exports = router; 