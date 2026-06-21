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
const { protect } = require("../middleware/auth");

router.get("/search", searchSlots);
router.post("/book", protect, bookSlot);
router.post("/release/:id", protect, releaseSlot);

router.get("/", getSlots);
router.post("/", createSlot);
router.put("/:id", updateSlot);
router.delete("/:id", deleteSlot);

module.exports = router;