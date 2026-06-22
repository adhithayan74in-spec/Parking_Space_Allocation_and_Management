const express = require("express");
const router = express.Router();
const {
  createSlot,
  getSlots,
  updateSlot,
  deleteSlot,
  searchSlots,
  bookSlot,
  releaseSlot,
} = require("../controllers/parkingController");
const { protect, adminOnly } = require("../middleware/auth");

// Public: search
router.get("/search", searchSlots);

// Any logged-in user: view, book, release (user marks when they leave)
router.get("/", protect, getSlots);
router.post("/book", protect, bookSlot);
router.post("/release/:id", protect, releaseSlot);

// Admin only: add, update, delete slots
router.post("/", protect, adminOnly, createSlot);
router.put("/:id", protect, adminOnly, updateSlot);
router.delete("/:id", protect, adminOnly, deleteSlot);

module.exports = router;