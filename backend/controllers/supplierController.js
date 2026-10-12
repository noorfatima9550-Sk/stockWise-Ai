const Supplier = require("../models/Supplier");
const Product = require("../models/Product");
const PurchaseOrder = require("../models/PurchaseOrder");

// @desc    Get all suppliers
// @route   GET /api/suppliers
// @access  Public
const getSuppliers = async (req, res, next) => {
  try {
    const suppliers = await Supplier.find().sort({ createdAt: -1 });
    res.json(suppliers);
  } catch (error) {
    next(error);
  }
};

// @desc    Get supplier by ID
// @route   GET /api/suppliers/:id
// @access  Public
const getSupplierById = async (req, res, next) => {
  try {
    const supplier = await Supplier.findById(req.params.id);
    if (!supplier) {
      return res.status(404).json({ message: "Supplier not found" });
    }
    res.json(supplier);
  } catch (error) {
    next(error);
  }
};

// @desc    Create supplier
// @route   POST /api/suppliers
// @access  Private (Admin / Manager)
const createSupplier = async (req, res, next) => {
  try {
    const { name, contactPerson, email, phone, address, paymentTerms, leadTimeDays, categoriesSupplied } = req.body;

    const supplier = await Supplier.create({
      name,
      contactPerson,
      email,
      phone,
      address,
      paymentTerms: paymentTerms || "Net 30",
      leadTimeDays: leadTimeDays || 7,
      categoriesSupplied: categoriesSupplied || []
    });

    res.status(201).json(supplier);
  } catch (error) {
    next(error);
  }
};

// @desc    Update supplier
// @route   PUT /api/suppliers/:id
// @access  Private (Admin / Manager)
const updateSupplier = async (req, res, next) => {
  try {
    const supplier = await Supplier.findById(req.params.id);
    if (!supplier) {
      return res.status(404).json({ message: "Supplier not found" });
    }

    Object.assign(supplier, req.body);
    const updated = await supplier.save();
    res.json(updated);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete supplier
// @route   DELETE /api/suppliers/:id
// @access  Private (Admin)
const deleteSupplier = async (req, res, next) => {
  try {
    const supplier = await Supplier.findById(req.params.id);
    if (!supplier) {
      return res.status(404).json({ message: "Supplier not found" });
    }

    await Supplier.deleteOne({ _id: supplier._id });
    res.json({ message: "Supplier deleted successfully" });
  } catch (error) {
    next(error);
  }
};

// @desc    Get products supplied by supplier
// @route   GET /api/suppliers/:id/products
// @access  Public
const getSupplierProducts = async (req, res, next) => {
  try {
    const products = await Product.find({ supplier: req.params.id }).populate("category", "name");
    res.json(products);
  } catch (error) {
    next(error);
  }
};

// @desc    Get purchase orders for supplier
// @route   GET /api/suppliers/:id/purchase-orders
// @access  Public
const getSupplierPurchaseOrders = async (req, res, next) => {
  try {
    const orders = await PurchaseOrder.find({ supplier: req.params.id })
      .populate("items.product", "name sku")
      .populate("warehouse", "name code")
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getSuppliers,
  getSupplierById,
  createSupplier,
  updateSupplier,
  deleteSupplier,
  getSupplierProducts,
  getSupplierPurchaseOrders
};
