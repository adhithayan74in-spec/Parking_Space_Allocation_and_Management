const ParkingSpace = require("../models/ParkingSpace");
const ParkingHistory = require("../models/history");

const createSlot = async (req, res) => {
  try {
    const slot = await ParkingSpace.create(req.body);
    res.status(201).json({ message: "Slot created", data: slot });
  } catch (error) {
    res.status(500).json({
      message: "Error creating slot",
      error: error.message,
    });
  }
};

const getSlots = async (req, res) => {
  try {
    const slots = await ParkingSpace.find();
    res.status(200).json(slots);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching slots",
      error: error.message,
    });
  }
};

const updateSlot = async (req, res) => {
  try {
    const id = req.params.id;
    const { pricePerHour } = req.body;

    if (pricePerHour !== undefined && pricePerHour < 0) {
      return res.status(400).json({
        message: "Negative values are not allowed",
      });
    }

    const updated = await ParkingSpace.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updated) {
      return res.status(404).json({
        message: "Slot not found",
      });
    }

    res.status(200).json({
      message: "Slot updated",
      data: updated,
    });
  } catch (error) {
    res.status(500).json({
      message: "Update failed",
      error: error.message,
    });
  }
};

const deleteSlot = async (req, res) => {
  try {
    const deleted = await ParkingSpace.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({
        message: "Slot not found",
      });
    }

    res.status(200).json({
      message: "Slot deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: "Delete failed",
      error: error.message,
    });
  }
};

const searchSlots = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query || !query.trim()) {
      return res.status(400).json({
        message: "Please enter a pincode or address to search",
      });
    }

    const regex = new RegExp(query.trim(), "i");

    const matchingSlots = await ParkingSpace.find({
      status: "available",
      $or: [
        { pincode: regex },
        { address: regex },
        { locationName: regex },
      ],
    });

    const grouped = {};

    matchingSlots.forEach((slot) => {
      const key = `${slot.locationName}|${slot.address}|${slot.pincode}`;

      if (!grouped[key]) {
        grouped[key] = {
          locationName: slot.locationName,
          address: slot.address,
          pincode: slot.pincode,
          pricePerHour: slot.pricePerHour,
          availableCount: 0,
          slotIds: [],
        };
      }

      grouped[key].availableCount += 1;
      grouped[key].slotIds.push(slot._id);
    });

    res.status(200).json(Object.values(grouped));
  } catch (error) {
    res.status(500).json({
      message: "Search failed",
      error: error.message,
    });
  }
};

const bookSlot = async (req, res) => {
  try {
    const {
      slotId,
      vehicleNumber,
      vehicleType,
      arrivalTime,
      leavingTime,
    } = req.body;

    if (
      !slotId ||
      !vehicleNumber ||
      !vehicleType ||
      !arrivalTime ||
      !leavingTime
    ) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    // Convert HH:mm values into valid Date objects
    const today = new Date().toISOString().split("T")[0];

    const arrival = new Date(`${today}T${arrivalTime}`);
    const leaving = new Date(`${today}T${leavingTime}`);

    if (
      isNaN(arrival.getTime()) ||
      isNaN(leaving.getTime())
    ) {
      return res.status(400).json({
        message: "Invalid arrival or leaving time",
      });
    }

    if (leaving <= arrival) {
      return res.status(400).json({
        message: "Leaving time must be after arrival time",
      });
    }

    const slot = await ParkingSpace.findById(slotId);

    if (!slot) {
      return res.status(404).json({
        message: "Slot not found",
      });
    }

    if (slot.status === "occupied") {
      return res.status(400).json({
        message: "Slot already booked",
      });
    }

    slot.status = "occupied";
    slot.vehicleNumber = vehicleNumber;
    slot.vehicleType = vehicleType;
    slot.arrivalTime = arrival;
    slot.leavingTime = leaving;

    if (req.user) {
      slot.bookedBy = req.user.id;
    }

    await slot.save();

    res.status(200).json({
      message: "Slot booked successfully",
      data: slot,
    });
  } catch (error) {
    res.status(500).json({
      message: "Booking failed",
      error: error.message,
    });
  }
};

const releaseSlot = async (req, res) => {
  try {
    const slot = await ParkingSpace.findById(req.params.id);

    if (!slot) {
      return res.status(404).json({
        message: "Slot not found",
      });
    }

    if (slot.status === "available") {
      return res.status(400).json({
        message: "Slot is already available",
      });
    }

    if (slot.arrivalTime) {
      const exitTime = new Date();

      const durationHours = Math.max(
        0,
        (exitTime - slot.arrivalTime) / (1000 * 60 * 60)
      );

      const fee =
        Math.ceil(durationHours) *
        (slot.pricePerHour || 20);

      await ParkingHistory.create({
        vehicleNumber: slot.vehicleNumber,
        slotNumber: slot.slotNumber,
        entryTime: slot.arrivalTime,
        exitTime,
        durationHours: Number(durationHours.toFixed(2)),
        fee,
      });
    }

    slot.status = "available";
    slot.vehicleNumber = "";
    slot.vehicleType = "";
    slot.bookedBy = null;
    slot.arrivalTime = null;
    slot.leavingTime = null;

    await slot.save();

    res.status(200).json({
      message: "Slot released successfully",
      data: slot,
    });
  } catch (error) {
    res.status(500).json({
      message: "Release failed",
      error: error.message,
    });
  }
};

module.exports = {
  createSlot,
  getSlots,
  updateSlot,
  deleteSlot,
  searchSlots,
  bookSlot,
  releaseSlot,
};