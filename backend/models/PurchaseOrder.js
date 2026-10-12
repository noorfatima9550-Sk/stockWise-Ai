const mongoose = require("mongoose");

const purchaseOrderItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true
  },
  orderedQuantity: {
    type: Number,
    required: true,
    min: 1
  },
  receivedQuantity: {
    type: Number,
    default: 0
  },
  unitCost: {
    type: Number,
    required: true,
    min: 0
  },
  total: {
    type: Number,
    required: true
  }
});

const purchaseOrderSchema = new mongoose.Schema(
  {
    poNumber: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true
    },
    supplier: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Supplier",
      required: true
    },
    items: [purchaseOrderItemSchema],
    total: {
      type: Number,
      required: true,
      default: 0
    },
    status: {
      type: String,
      enum: ["Draft", "Ordered", "Received", "Cancelled"],
      default: "Ordered"
    },
    expectedDeliveryDate: {
      type: Date
    },
    warehouse: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Warehouse",
      required: true
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("PurchaseOrder", purchaseOrderSchema);
