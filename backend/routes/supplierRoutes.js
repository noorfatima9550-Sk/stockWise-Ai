const express = require("express");
const router = express.Router();
const {
  getSuppliers,
  getSupplierById,
  createSupplier,
  updateSupplier,
  deleteSupplier,
  getSupplierProducts,
  getSupplierPurchaseOrders
} = require("../controllers/supplierController");
const { protect, authorize } = require("../middleware/authMiddleware");

router.get("/", getSuppliers);
router.post("/", protect, authorize("admin", "manager"), createSupplier);
router.get("/:id", getSupplierById);
router.put("/:id", protect, authorize("admin", "manager"), updateSupplier);
router.delete("/:id", protect, authorize("admin"), deleteSupplier);
router.get("/:id/products", getSupplierProducts);
router.get("/:id/purchase-orders", getSupplierPurchaseOrders);

module.exports = router;
