const PurchaseOrder = require("../models/PurchaseOrder");
const { adjustStock } = require("../services/stockService");

// @desc    Get all purchase orders
// @route   GET /api/purchase-orders
// @access  Public
const getPurchaseOrders = async (req, res, next) => {
  try {
    const orders = await PurchaseOrder.find()
      .populate("supplier", "name contactPerson email phone")
      .populate("warehouse", "name code")
      .populate("items.product", "name sku costPrice")
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    next(error);
  }
};

// @desc    Get purchase order by ID
// @route   GET /api/purchase-orders/:id
// @access  Public
const getPurchaseOrderById = async (req, res, next) => {
  try {
    const order = await PurchaseOrder.findById(req.params.id)
      .populate("supplier")
      .populate("warehouse")
      .populate("items.product");

    if (!order) {
      return res.status(404).json({ message: "Purchase order not found" });
    }

    res.json(order);
  } catch (error) {
    next(error);
  }
};

// @desc    Create purchase order
// @route   POST /api/purchase-orders
// @access  Private (Admin / Manager)
const createPurchaseOrder = async (req, res, next) => {
  try {
    const { supplierId, items, warehouseId, expectedDeliveryDate } = req.body;

    if (!supplierId || !items || !items.length || !warehouseId) {
      return res.status(400).json({ message: "Supplier, items, and warehouse are required" });
    }

    const count = await PurchaseOrder.countDocuments();
    const poNumber = `PO-${5000 + count}`;

    let total = 0;
    const formattedItems = items.map((item) => {
      const itemTotal = (item.orderedQuantity || 1) * (item.unitCost || 0);
      total += itemTotal;
      return {
        product: item.productId,
        orderedQuantity: item.orderedQuantity,
        receivedQuantity: 0,
        unitCost: item.unitCost,
        total: itemTotal
      };
    });

    const po = await PurchaseOrder.create({
      poNumber,
      supplier: supplierId,
      items: formattedItems,
      total,
      status: "Ordered",
      expectedDeliveryDate: expectedDeliveryDate || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      warehouse: warehouseId,
      createdBy: req.user ? req.user._id : null
    });

    res.status(201).json(po);
  } catch (error) {
    next(error);
  }
};

// @desc    Update purchase order status (Receiving inventory)
// @route   PUT /api/purchase-orders/:id/status
// @access  Private (Admin / Manager)
const updatePurchaseOrderStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const po = await PurchaseOrder.findById(req.params.id);

    if (!po) {
      return res.status(404).json({ message: "Purchase order not found" });
    }

    const oldStatus = po.status;

    // When status transitions to "Received", increase inventory & record StockMovement
    if (status === "Received" && oldStatus !== "Received") {
      for (const item of po.items) {
        item.receivedQuantity = item.orderedQuantity;

        await adjustStock({
          productId: item.product,
          warehouseId: po.warehouse,
          quantityChange: item.orderedQuantity,
          movementType: "IN",
          reason: `Purchase Order ${po.poNumber} received`,
          reference: po.poNumber,
          performedBy: req.user ? req.user._id : null
        });
      }
    }

    po.status = status || po.status;
    const updatedPo = await po.save();

    res.json(updatedPo);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getPurchaseOrders,
  getPurchaseOrderById,
  createPurchaseOrder,
  updatePurchaseOrderStatus
};
