const express = require("express");
const cors = require("cors");

const parkingRoutes = require("./routes/parkingRoutes");

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// routes
app.use("/api/parking", parkingRoutes);

module.exports = app;