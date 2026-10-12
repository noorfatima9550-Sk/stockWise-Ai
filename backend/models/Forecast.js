const mongoose = require("mongoose");

const forecastSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true
    },
    historicalSalesCount: {
      type: Number,
      default: 0
    },
    predictedDemandNextMonth: {
      type: Number,
      required: true
    },
    recommendedReorderQuantity: {
      type: Number,
      required: true
    },
    confidenceScore: {
      type: Number,
      default: 0.85
    },
    modelInformation: {
      type: String,
      default: "Historical Exponential Smoothing Service v1.0"
    },
    computedAt: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Forecast", forecastSchema);
