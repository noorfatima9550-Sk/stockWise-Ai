const Warehouse = require("../models/Warehouse");
const Inventory = require("../models/Inventory");
const { transferStock } = require("../services/stockService");

// @desc    Get all warehouses
// @route   GET /api/warehouses
// @access  Public
const getWarehouses = async (req, res, next) => {
  try {
    const warehouses = await Warehouse.find().sort({ createdAt: -1 });

    const warehousesWithStats = await Promise.all(
      warehouses.map(async (wh) => {
        const inventories = await Inventory.find({ warehouse: wh._id });
        const totalItems = inventories.reduce((sum, i) => sum + i.quantity, 0);
        const uniqueProducts = inventories.length;

        const whObj = wh.toObject();
        whObj.totalItems = totalItems;
        whObj.uniqueProducts = uniqueProducts;
        whObj.occupancyRate = Math.min(100, Math.round((totalItems / (wh.capacity || 10000)) * 100));

        return whObj;
      })
    );

    res.json(warehousesWithStats);
  } catch (error) {
    next(error);
  }
};

// @desc    Get warehouse by ID
// @route   GET /api/warehouses/:id
// @access  Public
const getWarehouseById = async (req, res, next) => {
  try {
    const warehouse = await Warehouse.findById(req.params.id);
    if (!warehouse) {
      return res.status(404).json({ message: "Warehouse not found" });
    }

    const inventories = await Inventory.find({ warehouse: warehouse._id }).populate("product");
    const whObj = warehouse.toObject();
    whObj.inventories = inventories;

    res.json(whObj);
  } catch (error) {
    next(error);
  }
};

// @desc    Create warehouse
// @route   POST /api/warehouses
// @access  Private (Admin / Manager)
const createWarehouse = async (req, res, next) => {
  try {
    const { name, code, address, city, contactPerson, phone, capacity } = req.body;

    const exists = await Warehouse.findOne({ code: code.toUpperCase() });
    if (exists) {
      return res.status(400).json({ message: `Warehouse with code ${code} already exists` });
    }

    const warehouse = await Warehouse.create({
      name,
      code: code.toUpperCase(),
      address,
      city,
      contactPerson,
      phone,
      capacity: capacity || 10000
    });

    res.status(201).json(warehouse);
  } catch (error) {
    next(error);
  }
};

// @desc    Update warehouse
// @route   PUT /api/warehouses/:id
// @access  Private (Admin / Manager)
const updateWarehouse = async (req, res, next) => {
  try {
    const warehouse = await Warehouse.findById(req.params.id);
    if (!warehouse) {
      return res.status(404).json({ message: "Warehouse not found" });
    }

    Object.assign(warehouse, req.body);
    if (req.body.code) warehouse.code = req.body.code.toUpperCase();

    const updated = await warehouse.save();
    res.json(updated);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete warehouse
// @route   DELETE /api/warehouses/:id
// @access  Private (Admin)
const deleteWarehouse = async (req, res, next) => {
  try {
    const warehouse = await Warehouse.findById(req.params.id);
    if (!warehouse) {
      return res.status(404).json({ message: "Warehouse not found" });
    }

    await Warehouse.deleteOne({ _id: warehouse._id });
    await Inventory.deleteMany({ warehouse: warehouse._id });

    res.json({ message: "Warehouse deleted successfully" });
  } catch (error) {
    next(error);
  }
};

// @desc    Get stock for specific warehouse
// @route   GET /api/warehouses/:id/stock
// @access  Public
const getWarehouseStock = async (req, res, next) => {
  try {
    const inventories = await Inventory.find({ warehouse: req.params.id }).populate({
      path: "product",
      populate: { path: "category", select: "name" }
    });

    res.json(inventories);
  } catch (error) {
    next(error);
  }
};

// @desc    Transfer stock between warehouses
// @route   POST /api/warehouses/transfer
// @access  Private (Admin / Manager)
const transferWarehouseStock = async (req, res, next) => {
  try {
    const { productId, sourceWarehouseId, targetWarehouseId, quantity, reason } = req.body;

    if (!productId || !sourceWarehouseId || !targetWarehouseId || !quantity) {
      return res.status(400).json({ message: "Please provide productId, sourceWarehouseId, targetWarehouseId, and quantity" });
    }

    const result = await transferStock({
      productId,
      sourceWarehouseId,
      targetWarehouseId,
      quantity: Number(quantity),
      reason: reason || "Inter-warehouse stock transfer",
      performedBy: req.user ? req.user._id : null
    });

    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getWarehouses,
  getWarehouseById,
  createWarehouse,
  updateWarehouse,
  deleteWarehouse,
  getWarehouseStock,
  transferWarehouseStock
};
