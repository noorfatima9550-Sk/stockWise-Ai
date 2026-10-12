const express = require("express");
const router = express.Router();
const {
  getOrders,
  getOrderById,
  createOrder,
  updateOrderStatus
} = require("../controllers/orderController");
const { protect, authorize } = require("../middleware/authMiddleware");

router.get("/", getOrders);
router.post("/", protect, createOrder);
router.get("/:id", getOrderById);
router.put("/:id/status", protect, authorize("admin", "manager"), updateOrderStatus);

module.exports = router;
