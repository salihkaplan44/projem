const express = require('express');
const router = express.Router();
const {
  createOrder,
  getMyOrders,
  getOrderById,
  updateOrderStatus,
  addOrderMessage
} = require('../controllers/orderController');
const { authMiddleware, adminMiddleware } = require('../middlewares/authMiddleware');

// Protected routes
router.post('/', authMiddleware, createOrder);
router.get('/my-orders', authMiddleware, getMyOrders);
router.get('/:id', authMiddleware, getOrderById);
router.post('/:id/messages', authMiddleware, addOrderMessage);

// Admin routes
router.put('/:id/status', authMiddleware, adminMiddleware, updateOrderStatus);

module.exports = router; 