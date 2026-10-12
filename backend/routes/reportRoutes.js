const express = require("express");
const router = express.Router();
const {
  getSalesReport,
  getInventoryReport,
  getProductPerformanceReport,
  getWarehousePerformanceReport,
  getSalesTrendsReport
} = require("../controllers/reportController");

router.get("/sales", getSalesReport);
router.get("/inventory", getInventoryReport);
router.get("/product-performance", getProductPerformanceReport);
router.get("/warehouse-performance", getWarehousePerformanceReport);
router.get("/sales-trends", getSalesTrendsReport);

module.exports = router;
