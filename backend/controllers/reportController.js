const SalesOrder = require("../models/SalesOrder");
const Product = require("../models/Product");
const Inventory = require("../models/Inventory");
const Warehouse = require("../models/Warehouse");

// @desc    Get Sales Report
// @route   GET /api/reports/sales
// @access  Public
const getSalesReport = async (req, res, next) => {
  try {
    const orders = await SalesOrder.find({ status: { $ne: "Cancelled" } })
      .populate("customer", "name")
      .populate("items.product", "name category");

    const totalSalesRevenue = orders.reduce((sum, o) => sum + (o.total || 0), 0);
    const totalOrdersCount = orders.length;

    res.json({
      summary: {
        totalRevenue: totalSalesRevenue,
        totalOrders: totalOrdersCount,
        averageOrderValue: totalOrdersCount > 0 ? Math.round(totalSalesRevenue / totalOrdersCount) : 0
      },
      orders
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get Inventory Report
// @route   GET /api/reports/inventory
// @access  Public
const getInventoryReport = async (req, res, next) => {
  try {
    const products = await Product.find().populate("category", "name");
    const inventories = await Inventory.find().populate("warehouse", "name");

    let totalValuation = 0;
    let healthyCount = 0;
    let lowStockCount = 0;
    let outOfStockCount = 0;

    const breakdown = products.map((p) => {
      const pInvs = inventories.filter((i) => i.product && i.product.toString() === p._id.toString());
      const qty = pInvs.reduce((sum, i) => sum + i.quantity, 0);
      const val = qty * p.costPrice;
      totalValuation += val;

      if (qty === 0) outOfStockCount++;
      else if (qty <= p.minimumStockLevel) lowStockCount++;
      else healthyCount++;

      return {
        product: p.name,
        sku: p.sku,
        category: p.category ? p.category.name : "",
        stock: qty,
        costPrice: p.costPrice,
        sellingPrice: p.sellingPrice,
        valuation: val
      };
    });

    res.json({
      summary: {
        totalProducts: products.length,
        totalValuation,
        healthyCount,
        lowStockCount,
        outOfStockCount
      },
      breakdown
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get Product Performance Report
// @route   GET /api/reports/product-performance
// @access  Public
const getProductPerformanceReport = async (req, res, next) => {
  try {
    const orders = await SalesOrder.find({ status: { $ne: "Cancelled" } });
    const productStats = {};

    orders.forEach((o) => {
      o.items.forEach((item) => {
        const pid = item.product ? item.product.toString() : null;
        if (!pid) return;

        if (!productStats[pid]) {
          productStats[pid] = { unitsSold: 0, revenue: 0 };
        }
        productStats[pid].unitsSold += item.quantity;
        productStats[pid].revenue += item.total;
      });
    });

    const products = await Product.find().populate("category", "name");
    const performance = products.map((p) => {
      const stats = productStats[p._id.toString()] || { unitsSold: 0, revenue: 0 };
      return {
        _id: p._id,
        name: p.name,
        sku: p.sku,
        category: p.category ? p.category.name : "",
        unitsSold: stats.unitsSold,
        revenue: stats.revenue
      };
    });

    performance.sort((a, b) => b.revenue - a.revenue);
    res.json(performance);
  } catch (error) {
    next(error);
  }
};

// @desc    Get Warehouse Performance Report
// @route   GET /api/reports/warehouse-performance
// @access  Public
const getWarehousePerformanceReport = async (req, res, next) => {
  try {
    const warehouses = await Warehouse.find();
    const result = await Promise.all(
      warehouses.map(async (wh) => {
        const inventories = await Inventory.find({ warehouse: wh._id });
        const totalQty = inventories.reduce((sum, i) => sum + i.quantity, 0);

        return {
          warehouse: wh.name,
          code: wh.code,
          city: wh.city,
          capacity: wh.capacity,
          currentStock: totalQty,
          utilizationPercentage: Math.min(100, Math.round((totalQty / wh.capacity) * 100))
        };
      })
    );

    res.json(result);
  } catch (error) {
    next(error);
  }
};

// @desc    Get Sales Trends Report
// @route   GET /api/reports/sales-trends
// @access  Public
const getSalesTrendsReport = async (req, res, next) => {
  try {
    const orders = await SalesOrder.find().sort({ createdAt: 1 });
    const trends = {};

    orders.forEach((o) => {
      const month = o.createdAt.toISOString().substring(0, 7); // YYYY-MM
      if (!trends[month]) {
        trends[month] = { revenue: 0, orderCount: 0 };
      }
      trends[month].revenue += o.total;
      trends[month].orderCount += 1;
    });

    res.json(trends);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getSalesReport,
  getInventoryReport,
  getProductPerformanceReport,
  getWarehousePerformanceReport,
  getSalesTrendsReport
};
