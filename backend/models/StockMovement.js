const mongoose = require("mongoose");

const stockMovementSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true
    },
    sourceWarehouse: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Warehouse",
      default: null
    },
    targetWarehouse: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Warehouse",
      default: null
    },
    movementType: {
      type: String,
      enum: ["IN", "OUT", "TRANSFER", "ADJUSTMENT"],
      required: true
    },
    quantity: {
      type: Number,
      required: true
    },
    reference: {
      type: String,
      default: ""
    },
    reason: {
      type: String,
      default: ""
    },
    performedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null
    },
    timestamp: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("StockMovement", stockMovementSchema);
