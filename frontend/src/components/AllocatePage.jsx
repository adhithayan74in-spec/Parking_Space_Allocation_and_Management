import { useState, useEffect } from "react";
import SlotCard from "../components/SlotCard";

const AllocatePage = () => {
  const [slots, setSlots] = useState([]);

  // 🔴 Replace this dummy data later with: fetch("http://localhost:5000/api/slots")
  useEffect(() => {
    setSlots([
      { _id: "1", slotNumber: 1, status: "available" },
      { _id: "2", slotNumber: 2, status: "occupied" },
      { _id: "3", slotNumber: 3, status: "available" },
      { _id: "4", slotNumber: 4, status: "occupied" },
    ]);
  }, []);

  const handleSelect = (id) => {
    setSlots(slots.map(s => s._id === id ? { ...s, status: "occupied" } : s));
    // 🔴 Later: await fetch(`http://localhost:5000/api/slots/${id}/allocate`, { method: "PUT" })
  };

  const handleRelease = (id) => {
    setSlots(slots.map(s => s._id === id ? { ...s, status: "available" } : s));
    // 🔴 Later: await fetch(`http://localhost:5000/api/slots/${id}/release`, { method: "PUT" })
  };

  return (
    <div style={{ padding: "30px", fontFamily: "sans-serif" }}>
      <h2>🅿️ Parking Slots</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", marginTop: "20px" }}>
        {slots.map(slot => (
          <SlotCard key={slot._id} slot={slot} onSelect={handleSelect} onRelease={handleRelease} />
        ))}
      </div>
    </div>
  );
};

export default AllocatePage;