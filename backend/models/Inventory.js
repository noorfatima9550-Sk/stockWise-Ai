const mongoose = require("mongoose");

const inventorySchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true
    },
    warehouse: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Warehouse",
      required: true
    },
    quantity: {
      type: Number,
      default: 0,
      min: 0
    },
    rackBinLocation: {
      type: String,
      default: "A-01"
    }
  },
  { timestamps: true }
);

inventorySchema.index({ product: 1, warehouse: 1 }, { unique: true });

module.exports = mongoose.model("Inventory", inventorySchema);
