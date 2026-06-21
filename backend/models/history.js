const mongoose = require("mongoose");

const historySchema = new mongoose.Schema({
  vehicleNumber: String,
  slotNumber: String,
  entryTime: Date,
  exitTime: Date,
  durationHours: Number,
  fee: Number,
});

module.exports = mongoose.model("ParkingHistory", historySchema);