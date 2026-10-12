const Inventory = require("../models/Inventory");
const Product = require("../models/Product");
const StockMovement = require("../models/StockMovement");
const { adjustStock } = require("../services/stockService");

// @desc    Get all inventory items across warehouses
// @route   GET /api/inventory
// @access  Public
const getInventory = async (req, res, next) => {
  try {
    const inventories = await Inventory.find()
      .populate({
        path: "product",
        populate: [
          { path: "category", select: "name" },
          { path: "supplier", select: "name" }
        ]
      })
      .populate("warehouse", "name code city");

    const formatted = inventories.map((inv) => {
      const prod = inv.product || {};
      let status = "Healthy";
      if (inv.quantity === 0) status = "Out of Stock";
      else if (inv.quantity <= (prod.minimumStockLevel || 10)) status = "Low Stock";

      return {
        _id: inv._id,
        name: prod.name || "Unknown",
        sku: prod.sku || "",
        category: prod.category ? prod.category.name : "Uncategorized",
        warehouse: inv.warehouse ? inv.warehouse.name : "Unassigned",
        stock: inv.quantity,
        minimum: prod.minimumStockLevel || 10,
        price: `₹${prod.sellingPrice || 0}`,
        status,
        rackBinLocation: inv.rackBinLocation,
        productId: prod._id,
        warehouseId: inv.warehouse ? inv.warehouse._id : null
      };
    });

    res.json(formatted);
  } catch (error) {
    next(error);
  }
};

// @desc    Adjust inventory level
// @route   POST /api/inventory/adjust
// @access  Private (Admin / Manager)
const adjustInventory = async (req, res, next) => {
  try {
    const { productId, warehouseId, quantityChange, movementType, reason } = req.body;

    if (!productId || !warehouseId || quantityChange === undefined) {
      return res.status(400).json({ message: "Please provide productId, warehouseId, and quantityChange" });
    }

    const result = await adjustStock({
      productId,
      warehouseId,
      quantityChange: Number(quantityChange),
      movementType: movementType || "ADJUSTMENT",
      reason: reason || "Manual adjustment",
      performedBy: req.user ? req.user._id : null
    });

    res.json({
      message: "Inventory updated successfully",
      inventory: result.inventory,
      movement: result.movement
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get stock movement history
// @route   GET /api/inventory/movements
// @access  Public
const getStockMovements = async (req, res, next) => {
  try {
    const movements = await StockMovement.find()
      .populate("product", "name sku")
      .populate("sourceWarehouse", "name code")
      .populate("targetWarehouse", "name code")
      .populate("performedBy", "name email")
      .sort({ timestamp: -1 })
      .limit(100);

    res.json(movements);
  } catch (error) {
    next(error);
  }
};

// @desc    Get low stock products
// @route   GET /api/inventory/low-stock
// @access  Public
const getLowStock = async (req, res, next) => {
  try {
    const products = await Product.find().populate("category", "name");
    const inventories = await Inventory.find().populate("warehouse", "name");

    const lowStockItems = [];

    for (const prod of products) {
      const prodInvs = inventories.filter((i) => i.product && i.product.toString() === prod._id.toString());
      const totalStock = prodInvs.reduce((sum, i) => sum + i.quantity, 0);

      if (totalStock > 0 && totalStock <= prod.minimumStockLevel) {
        lowStockItems.push({
          _id: prod._id,
          name: prod.name,
          sku: prod.sku,
          category: prod.category ? prod.category.name : "",
          currentStock: totalStock,
          minimumStock: prod.minimumStockLevel,
          reorderQuantity: prod.reorderQuantity,
          status: "Low Stock"
        });
      }
    }

    res.json(lowStockItems);
  } catch (error) {
    next(error);
  }
};

// @desc    Get out of stock products
// @route   GET /api/inventory/out-of-stock
// @access  Public
const getOutOfStock = async (req, res, next) => {
  try {
    const products = await Product.find().populate("category", "name");
    const inventories = await Inventory.find();

    const outOfStockItems = [];

    for (const prod of products) {
      const prodInvs = inventories.filter((i) => i.product && i.product.toString() === prod._id.toString());
      const totalStock = prodInvs.reduce((sum, i) => sum + i.quantity, 0);

      if (totalStock === 0) {
        outOfStockItems.push({
          _id: prod._id,
          name: prod.name,
          sku: prod.sku,
          category: prod.category ? prod.category.name : "",
          currentStock: 0,
          minimumStock: prod.minimumStockLevel,
          reorderQuantity: prod.reorderQuantity,
          status: "Out of Stock"
        });
      }
    }

    res.json(outOfStockItems);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getInventory,
  adjustInventory,
  getStockMovements,
  getLowStock,
  getOutOfStock
};
