const express = require("express");
const router = express.Router();
const {
  getInventory,
  adjustInventory,
  getStockMovements,
  getLowStock,
  getOutOfStock
} = require("../controllers/inventoryController");
const { protect, authorize } = require("../middleware/authMiddleware");

router.get("/", getInventory);
router.post("/adjust", protect, authorize("admin", "manager"), adjustInventory);
router.get("/movements", getStockMovements);
router.get("/low-stock", getLowStock);
router.get("/out-of-stock", getOutOfStock);

module.exports = router;
