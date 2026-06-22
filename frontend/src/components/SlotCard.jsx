import api from "../api/axios";

export default function SlotCard({ slot, onRefresh }) {
  const park = async () => {
    const vehicleNumber = prompt("Enter vehicle number:");
    if (!vehicleNumber) return;
    await api.put(`/parking/park/${slot._id}`, { vehicleNumber });
    onRefresh();
  };

  const release = async () => {
    if (!window.confirm(`Release slot ${slot.slotNumber}?`)) return;
    await api.put(`/parking/release/${slot._id}`);
    onRefresh();
  };

  const occupied = slot.status === "occupied";

  return (
    <div style={{ ...styles.card, borderColor: occupied ? "#ef444440" : "#22c55e40" }}>
      <div style={{ ...styles.indicator, background: occupied ? "#ef4444" : "#22c55e" }} />
      <div style={styles.slotNum}>Slot {slot.slotNumber}</div>
      {slot.vehicleNumber && (
        <div style={styles.vehicle}>🚗 {slot.vehicleNumber}</div>
      )}
      <div style={{ ...styles.badge, background: occupied ? "#fee2e215" : "#dcfce715", color: occupied ? "#f87171" : "#4ade80" }}>
        {occupied ? "Occupied" : "Available"}
      </div>
      <button
        style={{ ...styles.btn, background: occupied ? "#ef4444" : "#22c55e" }}
        onClick={occupied ? release : park}
      >
        {occupied ? "Release" : "Park Here"}
      </button>
    </div>
  );
}

const styles = {
  card: {
    background: "#1e293b", border: "1px solid #334155", borderRadius: "16px",
    padding: "20px 16px", display: "flex", flexDirection: "column",
    alignItems: "center", gap: "10px", position: "relative", overflow: "hidden",
    transition: "transform 0.15s",
  },
  indicator: {
    position: "absolute", top: 0, left: 0, right: 0, height: "3px",
    borderRadius: "16px 16px 0 0",
  },
  slotNum: { fontSize: "1.3rem", fontWeight: 700, color: "#f1f5f9" },
  vehicle: { fontSize: "0.8rem", color: "#94a3b8" },
  badge: {
    padding: "4px 12px", borderRadius: "20px", fontSize: "0.75rem",
    fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em",
  },
  btn: {
    width: "100%", padding: "10px", border: "none", borderRadius: "10px",
    color: "white", fontWeight: 600, fontSize: "0.85rem", cursor: "pointer", marginTop: "4px",
  },
};
