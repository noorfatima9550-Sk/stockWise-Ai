const express = require("express");
const router = express.Router();
const {
  getCustomers,
  getCustomerById,
  createCustomer,
  updateCustomer,
  deleteCustomer,
  getCustomerOrders
} = require("../controllers/customerController");
const { protect, authorize } = require("../middleware/authMiddleware");

router.get("/", getCustomers);
router.post("/", protect, authorize("admin", "manager"), createCustomer);
router.get("/:id", getCustomerById);
router.put("/:id", protect, authorize("admin", "manager"), updateCustomer);
router.delete("/:id", protect, authorize("admin"), deleteCustomer);
router.get("/:id/orders", getCustomerOrders);

module.exports = router;
