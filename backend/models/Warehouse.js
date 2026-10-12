const mongoose = require("mongoose");

const warehouseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Warehouse name is required"],
      trim: true
    },
    code: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true
    },
    address: {
      type: String,
      default: ""
    },
    city: {
      type: String,
      default: ""
    },
    contactPerson: {
      type: String,
      default: ""
    },
    phone: {
      type: String,
      default: ""
    },
    capacity: {
      type: Number,
      default: 10000
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Warehouse", warehouseSchema);
