const Notification = require("../models/Notification");
const Product = require("../models/Product");
const Inventory = require("../models/Inventory");

// @desc    Get all notifications
// @route   GET /api/notifications
// @access  Public
const getNotifications = async (req, res, next) => {
  try {
    const notifications = await Notification.find()
      .populate("product", "name sku")
      .sort({ createdAt: -1 });

    res.json(notifications);
  } catch (error) {
    next(error);
  }
};

// @desc    Mark notification as read
// @route   PUT /api/notifications/:id/read
// @access  Public
const markNotificationRead = async (req, res, next) => {
  try {
    const notification = await Notification.findById(req.params.id);
    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }

    notification.readStatus = true;
    const updated = await notification.save();
    res.json(updated);
  } catch (error) {
    next(error);
  }
};

// @desc    Generate system notifications dynamically from inventory status
// @route   POST /api/notifications/generate
// @access  Private (Admin / Manager)
const generateNotifications = async (req, res, next) => {
  try {
    const products = await Product.find();
    const inventories = await Inventory.find();

    let generatedCount = 0;

    for (const prod of products) {
      const prodInvs = inventories.filter((i) => i.product && i.product.toString() === prod._id.toString());
      const totalQty = prodInvs.reduce((sum, i) => sum + i.quantity, 0);

      if (totalQty === 0) {
        const exists = await Notification.findOne({ product: prod._id, type: "out_of_stock", readStatus: false });
        if (!exists) {
          await Notification.create({
            title: `Out of Stock Alert: ${prod.name}`,
            message: `Product ${prod.name} (SKU: ${prod.sku}) has reached 0 units across all warehouses. Urgent reorder required.`,
            type: "out_of_stock",
            severity: "critical",
            product: prod._id
          });
          generatedCount++;
        }
      } else if (totalQty <= prod.minimumStockLevel) {
        const exists = await Notification.findOne({ product: prod._id, type: "low_stock", readStatus: false });
        if (!exists) {
          await Notification.create({
            title: `Low Stock Warning: ${prod.name}`,
            message: `Product ${prod.name} has ${totalQty} units left (Min threshold: ${prod.minimumStockLevel}). Reorder ${prod.reorderQuantity} units recommended.`,
            type: "low_stock",
            severity: "warning",
            product: prod._id
          });
          generatedCount++;
        }
      }
    }

    res.json({ message: `Scanned inventory and generated ${generatedCount} new notifications` });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getNotifications,
  markNotificationRead,
  generateNotifications
};
