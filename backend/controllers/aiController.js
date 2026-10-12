const {
  generateAllForecasts,
  generateProductForecast,
  getReorderRecommendations,
  getSalesTrends
} = require("../services/aiService");

// @desc    Get AI Forecasts for all products
// @route   GET /api/ai/forecast
// @access  Public
const getForecast = async (req, res, next) => {
  try {
    const forecasts = await generateAllForecasts();
    res.json(forecasts);
  } catch (error) {
    next(error);
  }
};

// @desc    Get AI Sales Trends
// @route   GET /api/ai/trends
// @access  Public
const getTrends = async (req, res, next) => {
  try {
    const trends = await getSalesTrends();
    res.json(trends);
  } catch (error) {
    next(error);
  }
};

// @desc    Get AI Reorder Suggestions
// @route   GET /api/ai/reorders
// @access  Public
const getReorders = async (req, res, next) => {
  try {
    const reorders = await getReorderRecommendations();
    res.json(reorders);
  } catch (error) {
    next(error);
  }
};

// @desc    Get AI Prediction for a specific product
// @route   GET /api/ai/prediction
// @access  Public
const getPrediction = async (req, res, next) => {
  try {
    const { productId } = req.query;
    if (!productId) {
      return res.status(400).json({ message: "productId query parameter is required" });
    }

    const prediction = await generateProductForecast(productId);
    res.json(prediction);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getForecast,
  getTrends,
  getReorders,
  getPrediction
};
