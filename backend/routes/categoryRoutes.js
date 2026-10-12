const express = require("express");
const router = express.Router();
const Category = require("../models/Category");
const { protect, authorize } = require("../middleware/authMiddleware");

router.get("/", async (req, res, next) => {
  try {
    const categories = await Category.find().sort({ name: 1 });
    res.json(categories);
  } catch (error) {
    next(error);
  }
});

router.post("/", protect, authorize("admin", "manager"), async (req, res, next) => {
  try {
    const { name, code, description } = req.body;
    const category = await Category.create({ name, code: code.toUpperCase(), description });
    res.status(201).json(category);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
