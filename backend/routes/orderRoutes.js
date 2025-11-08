// backend/routes/orderRoutes.js
const express = require('express');
const router = express.Router();
const {
  addOrderItems,
  getOrderById,
  getMyOrders,
  getOrders,
  updateOrderToPaid,
  updateOrderToDelivered,
} = require('../controllers/orderController');
const { protect, admin } = require('../middleware/authMiddleware');

// User routes
router.post('/', protect, addOrderItems); // Create new order
router.get('/myorders', protect, getMyOrders); // Get logged-in user orders
router.get('/:id', protect, getOrderById); // Get single order

// Admin routes
router.get('/', protect, admin, getOrders); // Get all orders
router.put('/:id/pay', protect, updateOrderToPaid); // Mark as paid
router.put('/:id/deliver', protect, admin, updateOrderToDelivered); // Mark as delivered

module.exports = router;
