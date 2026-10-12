const Product = require("../models/Product");
const Category = require("../models/Category");
const Inventory = require("../models/Inventory");

// @desc    Get all products with search, filter, pagination
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res, next) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 50;
    const skip = (page - 1) * limit;

    const { search, category, status } = req.query;

    let query = {};

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { sku: { $regex: search, $options: "i" } },
        { brand: { $regex: search, $options: "i" } }
      ];
    }

    if (category) {
      // Find category by name or ID
      const catObj = await Category.findOne({
        $or: [{ _id: category.match(/^[0-9a-fA-F]{24}$/) ? category : null }, { name: category }]
      });
      if (catObj) {
        query.category = catObj._id;
      }
    }

    if (status) {
      query.status = status;
    }

    const total = await Product.countDocuments(query);
    const products = await Product.find(query)
      .populate("category", "name code")
      .populate("supplier", "name email phone")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    // Calculate overall stock per product
    const productIds = products.map((p) => p._id);
    const inventories = await Inventory.find({ product: { $in: productIds } });

    const productsWithStock = products.map((prod) => {
      const prodObj = prod.toObject();
      const prodInvs = inventories.filter((inv) => inv.product.toString() === prod._id.toString());
      const totalStock = prodInvs.reduce((sum, i) => sum + i.quantity, 0);
      
      let stockStatus = "Healthy";
      if (totalStock === 0) stockStatus = "Out of Stock";
      else if (totalStock <= prod.minimumStockLevel) stockStatus = "Low Stock";

      prodObj.stock = totalStock;
      prodObj.statusLabel = stockStatus;
      return prodObj;
    });

    res.json({
      products: productsWithStock,
      page,
      pages: Math.ceil(total / limit),
      total
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate("category", "name code")
      .populate("supplier", "name email phone");

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const inventories = await Inventory.find({ product: product._id }).populate("warehouse", "name code");
    const totalStock = inventories.reduce((sum, i) => sum + i.quantity, 0);

    const prodObj = product.toObject();
    prodObj.stock = totalStock;
    prodObj.warehouseBreakdown = inventories;

    res.json(prodObj);
  } catch (error) {
    next(error);
  }
};

// @desc    Create product
// @route   POST /api/products
// @access  Private (Admin / Manager)
const createProduct = async (req, res, next) => {
  try {
    const {
      name,
      sku,
      category,
      description,
      brand,
      unit,
      packSize,
      sellingPrice,
      costPrice,
      minimumStockLevel,
      reorderQuantity,
      supplier,
      status
    } = req.body;

    const productExists = await Product.findOne({ sku: sku.toUpperCase() });
    if (productExists) {
      return res.status(400).json({ message: `Product with SKU ${sku} already exists` });
    }

    const product = await Product.create({
      name,
      sku: sku.toUpperCase(),
      category,
      description,
      brand,
      unit,
      packSize,
      sellingPrice,
      costPrice,
      minimumStockLevel,
      reorderQuantity,
      supplier,
      status: status || "Active"
    });

    res.status(201).json(product);
  } catch (error) {
    next(error);
  }
};

// @desc    Update product
// @route   PUT /api/products/:id
// @access  Private (Admin / Manager)
const updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    Object.assign(product, req.body);
    if (req.body.sku) product.sku = req.body.sku.toUpperCase();

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete product
// @route   DELETE /api/products/:id
// @access  Private (Admin)
const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    await Product.deleteOne({ _id: product._id });
    await Inventory.deleteMany({ product: product._id });

    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};
