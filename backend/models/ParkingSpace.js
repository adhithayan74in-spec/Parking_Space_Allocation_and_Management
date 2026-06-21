const mongoose = require("mongoose");

const parkingSpaceSchema = new mongoose.Schema({
  slotNumber: {
    type: String,
    required: true,
  },

  status: {
    type: String,
    enum: ["available", "occupied"],
    default: "available",
  },

  vehicleNumber: {
    type: String,
    default: "",
  },

  vehicleType: {
    type: String,
    default: "",
  },
});

module.exports = mongoose.model("ParkingSpace", parkingSpaceSchema);