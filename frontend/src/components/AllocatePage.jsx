import { useState, useEffect } from "react";
import SlotCard from "../components/SlotCard";

const AllocatePage = () => {
  const [slots, setSlots] = useState([]);

  useEffect(() => {
    setSlots([
      { _id: "1", slotNumber: 1, status: "available" },
      { _id: "2", slotNumber: 2, status: "occupied" },
      { _id: "3", slotNumber: 3, status: "available" },
      { _id: "4", slotNumber: 4, status: "occupied" },
      { _id: "5", slotNumber: 5, status: "available" },
      { _id: "6", slotNumber: 6, status: "available" },
      { _id: "7", slotNumber: 7, status: "occupied" },
      { _id: "8", slotNumber: 8, status: "available" },
      { _id: "9", slotNumber: 9, status: "occupied" },
      { _id: "10", slotNumber: 10, status: "available" },
      { _id: "11", slotNumber: 11, status: "available" },
      { _id: "12", slotNumber: 12, status: "occupied" },
    ]);
  }, []);

  const handleSelect = (id) => {
    setSlots(slots.map(s => s._id === id ? { ...s, status: "occupied" } : s));
  };

  const handleRelease = (id) => {
    setSlots(slots.map(s => s._id === id ? { ...s, status: "available" } : s));
  };

  const available = slots.filter(s => s.status === "available").length;
  const occupied = slots.filter(s => s.status === "occupied").length;

  return (
    <div style={{ padding: "40px 32px" }}>

      <h2 style={{ fontSize: "2rem", fontWeight: "800", color: "#f1f5f9", marginBottom: "8px" }}>
        🅿️ Parking Slots
      </h2>

      {/* Stats bar */}
      <div style={{ display: "flex", gap: "20px", marginBottom: "32px" }}>
        <span style={{
          background: "#0f2d1f", color: "#4ade80",
          padding: "6px 16px", borderRadius: "20px",
          fontWeight: "600", border: "1px solid #22c55e"
        }}>
          🟢 Available: {available}
        </span>
        <span style={{
          background: "#2d1515", color: "#f87171",
          padding: "6px 16px", borderRadius: "20px",
          fontWeight: "600", border: "1px solid #ef4444"
        }}>
          🔴 Occupied: {occupied}
        </span>
      </div>

      {/* Grid — fills the full width */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
        gap: "20px",
      }}>
        {slots.map(slot => (
          <SlotCard
            key={slot._id}
            slot={slot}
            onSelect={handleSelect}
            onRelease={handleRelease}
          />
        ))}
      </div>
    </div>
  );
};

export default AllocatePage;