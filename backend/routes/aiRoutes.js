const express = require("express");
const router = express.Router();
const {
  getForecast,
  getTrends,
  getReorders,
  getPrediction
} = require("../controllers/aiController");

router.get("/forecast", getForecast);
router.get("/trends", getTrends);
router.get("/reorders", getReorders);
router.get("/prediction", getPrediction);

module.exports = router;
