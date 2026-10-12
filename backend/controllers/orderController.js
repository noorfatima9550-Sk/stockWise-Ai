const SalesOrder = require("../models/SalesOrder");
const Customer = require("../models/Customer");
const Inventory = require("../models/Inventory");
const { adjustStock } = require("../services/stockService");

// @desc    Get all sales orders
// @route   GET /api/orders
// @access  Public
const getOrders = async (req, res, next) => {
  try {
    const orders = await SalesOrder.find()
      .populate("customer", "name company email phone")
      .populate("warehouse", "name code")
      .populate("items.product", "name sku sellingPrice")
      .sort({ createdAt: -1 });

    const formatted = orders.map((o) => ({
      _id: o._id,
      id: o.orderNumber,
      orderNumber: o.orderNumber,
      customer: o.customer ? o.customer.name : "Walk-in Customer",
      customerId: o.customer ? o.customer._id : null,
      company: o.customer ? o.customer.company : "",
      amount: `₹${o.total.toLocaleString("en-IN")}`,
      total: o.total,
      subtotal: o.subtotal,
      status: o.status,
      paymentStatus: o.paymentStatus,
      warehouse: o.warehouse ? o.warehouse.name : "",
      items: o.items,
      createdAt: o.createdAt
    }));

    res.json(formatted);
  } catch (error) {
    next(error);
  }
};

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Public
const getOrderById = async (req, res, next) => {
  try {
    const order = await SalesOrder.findById(req.params.id)
      .populate("customer")
      .populate("warehouse")
      .populate("items.product");

    if (!order) {
      return res.status(404).json({ message: "Sales order not found" });
    }

    res.json(order);
  } catch (error) {
    next(error);
  }
};

// @desc    Create sales order
// @route   POST /api/orders
// @access  Private (Admin / Manager / Staff)
const createOrder = async (req, res, next) => {
  try {
    const { customerId, items, warehouseId, paymentStatus, tax = 0, discount = 0 } = req.body;

    if (!customerId || !items || !items.length || !warehouseId) {
      return res.status(400).json({ message: "Customer, items, and warehouse are required" });
    }

    const orderCount = await SalesOrder.countDocuments();
    const orderNumber = `#SO-${1024 + orderCount}`;

    let subtotal = 0;
    const formattedItems = items.map((item) => {
      const itemTotal = (item.quantity || 1) * (item.unitPrice || 0);
      subtotal += itemTotal;
      return {
        product: item.productId,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        total: itemTotal
      };
    });

    const total = Math.max(0, subtotal + tax - discount);

    const order = await SalesOrder.create({
      orderNumber,
      customer: customerId,
      items: formattedItems,
      subtotal,
      tax,
      discount,
      total,
      status: "Pending",
      paymentStatus: paymentStatus || "Pending",
      warehouse: warehouseId,
      createdBy: req.user ? req.user._id : null
    });

    // Update customer stats
    await Customer.findByIdAndUpdate(customerId, {
      $inc: { "orderStats.totalOrders": 1, "orderStats.totalSpent": total }
    });

    res.status(201).json(order);
  } catch (error) {
    next(error);
  }
};

// @desc    Update sales order status
// @route   PUT /api/orders/:id/status
// @access  Private (Admin / Manager)
const updateOrderStatus = async (req, res, next) => {
  try {
    const { status, paymentStatus } = req.body;
    const order = await SalesOrder.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Sales order not found" });
    }

    const oldStatus = order.status;

    // If order transitions to Confirmed/Processing/Shipped for the first time, check stock & deduct
    if (
      ["Confirmed", "Processing", "Shipped"].includes(status) &&
      !["Confirmed", "Processing", "Shipped", "Delivered"].includes(oldStatus)
    ) {
      // 1. Verify sufficient stock for all items
      for (const item of order.items) {
        const inventory = await Inventory.findOne({
          product: item.product,
          warehouse: order.warehouse
        });

        const currentQty = inventory ? inventory.quantity : 0;
        if (currentQty < item.quantity) {
          return res.status(400).json({
            message: `Insufficient stock for product. Required: ${item.quantity}, Available in warehouse: ${currentQty}`
          });
        }
      }

      // 2. Deduct stock & create stock movement
      for (const item of order.items) {
        await adjustStock({
          productId: item.product,
          warehouseId: order.warehouse,
          quantityChange: -item.quantity,
          movementType: "OUT",
          reason: `Sales Order ${order.orderNumber} confirmed`,
          reference: order.orderNumber,
          performedBy: req.user ? req.user._id : null
        });
      }
    }

    order.status = status || order.status;
    if (paymentStatus) order.paymentStatus = paymentStatus;

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getOrders,
  getOrderById,
  createOrder,
  updateOrderStatus
};
