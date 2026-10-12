const express = require("express");
const router = express.Router();
const {
  getWarehouses,
  getWarehouseById,
  createWarehouse,
  updateWarehouse,
  deleteWarehouse,
  getWarehouseStock,
  transferWarehouseStock
} = require("../controllers/warehouseController");
const { protect, authorize } = require("../middleware/authMiddleware");

router.get("/", getWarehouses);
router.post("/", protect, authorize("admin", "manager"), createWarehouse);
router.post("/transfer", protect, authorize("admin", "manager"), transferWarehouseStock);
router.get("/:id", getWarehouseById);
router.put("/:id", protect, authorize("admin", "manager"), updateWarehouse);
router.delete("/:id", protect, authorize("admin"), deleteWarehouse);
router.get("/:id/stock", getWarehouseStock);

module.exports = router;
