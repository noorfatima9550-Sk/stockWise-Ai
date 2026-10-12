const mongoose = require("mongoose");

const supplierSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Supplier name is required"],
      trim: true
    },
    contactPerson: {
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
    paymentTerms: {
      type: String,
      default: "Net 30"
    },
    leadTimeDays: {
      type: Number,
      default: 7
    },
    categoriesSupplied: [
      {
        type: String
      }
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Supplier", supplierSchema);
