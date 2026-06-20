import SlotCard from "../components/SlotCard";

const AllocatePage = ({ slots, onSelect, onRelease }) => {
  const available = slots.filter(s => s.status === "available").length;
  const occupied = slots.filter(s => s.status === "occupied").length;

  return (
    <div style={{ padding: "40px 32px" }}>
      <h2 style={{ fontSize: "2rem", fontWeight: "800", color: "#f1f5f9", marginBottom: "8px" }}>
        🅿️ Parking Slots
      </h2>

      <div style={{ display: "flex", gap: "20px", marginBottom: "32px" }}>
        <span style={{ background: "#0f2d1f", color: "#4ade80", padding: "6px 16px", borderRadius: "20px", fontWeight: "600", border: "1px solid #22c55e" }}>
          🟢 Available: {available}
        </span>
        <span style={{ background: "#2d1515", color: "#f87171", padding: "6px 16px", borderRadius: "20px", fontWeight: "600", border: "1px solid #ef4444" }}>
          🔴 Occupied: {occupied}
        </span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: "20px" }}>
        {slots.map(slot => (
          <SlotCard key={slot._id} slot={slot} onSelect={onSelect} onRelease={onRelease} />
        ))}
      </div>
    </div>
  );
};

export default AllocatePage;