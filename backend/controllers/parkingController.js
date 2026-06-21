const ParkingSpace = require("../models/ParkingSpace");

// CREATE SLOT
const createSlot = async (req, res) => {
  try {
    const slot = await ParkingSpace.create(req.body);

    res.status(201).json({
      message: "Slot created",
      data: slot
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating slot",
      error: error.message
    });
  }
};

// GET ALL SLOTS
const getSlots = async (req, res) => {
  try {
    const slots = await ParkingSpace.find();

    res.status(200).json(slots);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching slots",
      error: error.message
    });
  }
};

// UPDATE SLOT (IMPORTANT FIX HERE)
const updateSlot = async (req, res) => {
  try {
    const id = req.params.id;

    const { fee } = req.body;

    // ❌ manual validation (important)
    if (fee !== undefined && fee < 0) {
      return res.status(400).json({
        message: "Negative values are not allowed"
      });
    }

    const updated = await ParkingSpace.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
        runValidators: true // ✅ REQUIRED for min/max to work
      }
    );

    if (!updated) {
      return res.status(404).json({
        message: "Slot not found"
      });
    }

    res.status(200).json({
      message: "Slot updated",
      data: updated
    });

  } catch (error) {
    res.status(500).json({
      message: "Update failed",
      error: error.message
    });
  }
};

module.exports = {
  createSlot,
  getSlots,
  updateSlot
};