const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const parkingRoutes = require("./routes/parkingRoutes");

const app = express();

connectDB();

app.use(cors({
  origin: ["https://parking-space-allocation-and-manage.vercel.app", "http://localhost:5173"],
  credentials: true,
}));
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/parking", parkingRoutes);

app.get("/", (req, res) => {
  res.send("Parking Management Backend Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});