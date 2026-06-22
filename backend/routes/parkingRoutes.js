const express = require("express");
const router = express.Router();
const ParkingSpace = require("../models/ParkingSpace");

// GET ALL SLOTS
router.get("/", async (req, res) => {
  try {
    const slots = await ParkingSpace.find().sort({ slotNumber: 1 });
    res.status(200).json(slots);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// CREATE A SINGLE SLOT
router.post("/", async (req, res) => {
  try {
    const { slotNumber, vehicleType } = req.body;

    if (!slotNumber) {
      return res.status(400).json({ message: "Slot number is required" });
    }

    const existing = await ParkingSpace.findOne({ slotNumber });
    if (existing) {
      return res.status(400).json({ message: "Slot number already exists" });
    }

    const slot = await ParkingSpace.create({
      slotNumber,
      vehicleType: vehicleType || "",
      status: "available",
      vehicleNumber: "",
    });

    res.status(201).json({ message: "Slot created", slot });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// SEED MULTIPLE SLOTS AT ONCE (e.g. POST /parking/seed { count: 20 })
router.post("/seed", async (req, res) => {
  try {
    const count = req.body.count || 10;

    // Clear existing slots first for a clean seed
    await ParkingSpace.deleteMany({});

    const slots = [];
    const sampleVehicles = ["KL01AB1234", "KL07CD5678", "KL10EF9012", "KL45GH3456"];

    for (let i = 1; i <= count; i++) {
      const slotNumber = `A${String(i).padStart(2, "0")}`;
      const isOccupied = i % 3 === 0; // every 3rd slot is occupied

      slots.push({
        slotNumber,
        status: isOccupied ? "occupied" : "available",
        vehicleNumber: isOccupied ? sampleVehicles[i % sampleVehicles.length] : "",
        vehicleType: isOccupied ? "Car" : "",
      });
    }

    await ParkingSpace.insertMany(slots);
    res.status(201).json({ message: `${slots.length} slots created successfully` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PARK A VEHICLE
router.put("/park/:id", async (req, res) => {
  try {
    const { vehicleNumber, vehicleType } = req.body;

    if (!vehicleNumber) {
      return res.status(400).json({ message: "Vehicle number is required" });
    }

    const slot = await ParkingSpace.findById(req.params.id);
    if (!slot) return res.status(404).json({ message: "Slot not found" });
    if (slot.status === "occupied") {
      return res.status(400).json({ message: "Slot already occupied" });
    }

    slot.status = "occupied";
    slot.vehicleNumber = vehicleNumber;
    slot.vehicleType = vehicleType || "";
    await slot.save();

    res.json({ message: "Vehicle parked successfully", slot });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// RELEASE A SLOT
router.put("/release/:id", async (req, res) => {
  try {
    const slot = await ParkingSpace.findById(req.params.id);
    if (!slot) return res.status(404).json({ message: "Slot not found" });
    if (slot.status === "available") {
      return res.status(400).json({ message: "Slot is already available" });
    }

    slot.status = "available";
    slot.vehicleNumber = "";
    slot.vehicleType = "";
    await slot.save();

    res.json({ message: "Slot released successfully", slot });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE A SLOT
router.delete("/:id", async (req, res) => {
  try {
    const slot = await ParkingSpace.findByIdAndDelete(req.params.id);
    if (!slot) return res.status(404).json({ message: "Slot not found" });
    res.json({ message: "Slot deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;