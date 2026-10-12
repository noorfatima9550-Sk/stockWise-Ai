const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true
    },
    sku: {
      type: String,
      required: [true, "SKU is required"],
      unique: true,
      uppercase: true,
      trim: true
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true
    },
    description: {
      type: String,
      default: ""
    },
    brand: {
      type: String,
      default: "Generic"
    },
    unit: {
      type: String,
      default: "Pcs"
    },
    packSize: {
      type: Number,
      default: 1
    },
    sellingPrice: {
      type: Number,
      required: true,
      min: 0
    },
    costPrice: {
      type: Number,
      required: true,
      min: 0
    },
    minimumStockLevel: {
      type: Number,
      default: 10
    },
    reorderQuantity: {
      type: Number,
      default: 50
    },
    supplier: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Supplier"
    },
    status: {
      type: String,
      enum: ["Active", "Discontinued", "Draft"],
      default: "Active"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
