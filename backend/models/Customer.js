const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Customer name is required"],
      trim: true
    },
    company: {
      type: String,
      default: ""
    },
    email: {
      type: String,
      default: "",
      lowercase: true,
      trim: true
    },
    phone: {
      type: String,
      default: ""
    },
    address: {
      type: String,
      default: ""
    },
    taxId: {
      type: String,
      default: ""
    },
    customerType: {
      type: String,
      enum: ["Wholesale", "Retailer", "Distributor"],
      default: "Wholesale"
    },
    creditLimit: {
      type: Number,
      default: 50000
    },
    orderStats: {
      totalOrders: { type: Number, default: 0 },
      totalSpent: { type: Number, default: 0 }
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Customer", customerSchema);
