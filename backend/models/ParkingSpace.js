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

  locationName: {
    type: String,
    default: "Main Lot",
  },

  address: {
    type: String,
    default: "",
  },

  pincode: {
    type: String,
    default: "",
  },

  pricePerHour: {
    type: Number,
    default: 20,
  },

  bookedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },

  arrivalTime: {
    type: Date,
    default: null,
  },

  leavingTime: {
    type: Date,
    default: null,
  },
});

module.exports = mongoose.model("ParkingSpace", parkingSpaceSchema);