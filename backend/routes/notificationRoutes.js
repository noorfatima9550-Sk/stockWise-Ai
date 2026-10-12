const express = require("express");
const router = express.Router();
const {
  getNotifications,
  markNotificationRead,
  generateNotifications
} = require("../controllers/notificationController");
const { protect, authorize } = require("../middleware/authMiddleware");

router.get("/", getNotifications);
router.put("/:id/read", markNotificationRead);
router.post("/generate", protect, authorize("admin", "manager"), generateNotifications);

module.exports = router;
