const express = require("express");
const router = express.Router();
const {
  getPurchaseOrders,
  getPurchaseOrderById,
  createPurchaseOrder,
  updatePurchaseOrderStatus
} = require("../controllers/purchaseOrderController");
const { protect, authorize } = require("../middleware/authMiddleware");

router.get("/", getPurchaseOrders);
router.post("/", protect, authorize("admin", "manager"), createPurchaseOrder);
router.get("/:id", getPurchaseOrderById);
router.put("/:id/status", protect, authorize("admin", "manager"), updatePurchaseOrderStatus);

module.exports = router;
