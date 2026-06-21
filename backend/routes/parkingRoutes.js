const express = require("express");
const router = express.Router();
const ParkingSpace = require("../models/ParkingSpace");

// CREATE / ALLOCATE SLOT
router.post("/allocate", async (req, res) => {
  try {
    const { slotNumber, vehicleNumber, vehicleType } = req.body;

    // ❌ BLOCK EMPTY OR INVALID INPUT
    if (!slotNumber || !vehicleNumber || !vehicleType) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // ❌ BLOCK NEGATIVE / INVALID STRINGS LIKE "-2"
    if (typeof slotNumber === "number" && slotNumber < 0) {
      return res.status(400).json({ message: "Invalid slot number" });
    }

    if (String(slotNumber).includes("-")) {
      return res.status(400).json({ message: "Slot number cannot be negative" });
    }

    const slot = await ParkingSpace.findOne({ slotNumber });

    if (!slot) {
      return res.status(404).json({ message: "Slot not found" });
    }

    if (slot.status === "occupied") {
      return res.status(400).json({ message: "Slot already occupied" });
    }

    slot.status = "occupied";
    slot.vehicleNumber = vehicleNumber;
    slot.vehicleType = vehicleType;

    await slot.save();

    res.json({ message: "Slot allocated successfully", slot });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;