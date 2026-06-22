import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function SlotCard({ slot, onRefresh }) {
  const navigate = useNavigate();

  const park = () => {
    navigate("/booking/" + slot._id, { state: { slot } });
  };

  const release = async () => {
    if (!window.confirm("Release slot " + slot.slotNumber + "?")) return;
    try {
      await api.post("/parking/release/" + slot._id);  // POST not PUT
      onRefresh();
    } catch (err) {
      alert(err.response?.data?.message || "Could not release slot.");
    }
  };

  const occupied = slot.status === "occupied";

  return (
    <div
      style={{
        ...styles.card,
        borderColor: occupied ? "rgba(239,68,68,0.25)" : "rgba(34,197,94,0.25)",
        boxShadow: occupied ? "0 4px 24px rgba(239,68,68,0.07)" : "0 4px 24px rgba(34,197,94,0.07)",
      }}
      onMouseEnter={function(e) { e.currentTarget.style.transform = "translateY(-3px)"; }}
      onMouseLeave={function(e) { e.currentTarget.style.transform = "translateY(0)"; }}
    >
      <div style={{
        ...styles.indicator,
        background: occupied
          ? "linear-gradient(90deg, #ef4444, #f87171)"
          : "linear-gradient(90deg, #22c55e, #4ade80)",
      }} />

      <div style={styles.slotNum}>
        <span style={{ fontSize: "0.7rem", color: "#64748b", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}>Slot</span>
        <br />
        {slot.slotNumber}
      </div>

      {slot.vehicleNumber ? (
        <div style={styles.vehicleBox}>
          <span style={styles.vehicleIcon}>🚗</span>
          <span style={styles.vehicleText}>{slot.vehicleNumber}</span>
        </div>
      ) : (
        <div style={styles.emptySlot}>
          <span style={{ fontSize: "1.6rem" }}>🅿️</span>
        </div>
      )}

      <div style={{
        ...styles.badge,
        background: occupied ? "rgba(239,68,68,0.1)" : "rgba(34,197,94,0.1)",
        color: occupied ? "#f87171" : "#4ade80",
        border: "1px solid " + (occupied ? "rgba(239,68,68,0.25)" : "rgba(34,197,94,0.25)"),
      }}>
        <span style={{
          display: "inline-block", width: "6px", height: "6px", borderRadius: "50%",
          background: occupied ? "#ef4444" : "#22c55e", marginRight: "6px",
          boxShadow: occupied ? "0 0 6px #ef4444" : "0 0 6px #22c55e",
        }} />
        {occupied ? "Occupied" : "Available"}
      </div>

      <button
        style={{
          ...styles.btn,
          background: occupied
            ? "linear-gradient(135deg, #ef4444, #dc2626)"
            : "linear-gradient(135deg, #22c55e, #16a34a)",
          boxShadow: occupied
            ? "0 4px 14px rgba(239,68,68,0.3)"
            : "0 4px 14px rgba(34,197,94,0.3)",
        }}
        onClick={occupied ? release : park}
        onMouseEnter={function(e) { e.currentTarget.style.opacity = "0.88"; }}
        onMouseLeave={function(e) { e.currentTarget.style.opacity = "1"; }}
      >
        {occupied ? "Release" : "Park Here"}
      </button>
    </div>
  );
}

const styles = {
  card: {
    background: "linear-gradient(145deg, #1e293b, #1a2540)", border: "1px solid",
    borderRadius: "18px", padding: "22px 16px 18px", display: "flex",
    flexDirection: "column", alignItems: "center", gap: "12px",
    position: "relative", overflow: "hidden",
    transition: "transform 0.2s ease, box-shadow 0.2s ease", cursor: "default",
  },
  indicator: { position: "absolute", top: 0, left: 0, right: 0, height: "4px", borderRadius: "18px 18px 0 0" },
  slotNum: {
    fontSize: "1.6rem", fontWeight: 800, color: "#f1f5f9",
    textAlign: "center", lineHeight: 1.2, letterSpacing: "-0.02em", marginTop: "4px",
  },
  vehicleBox: {
    display: "flex", alignItems: "center", gap: "6px", background: "#0f172a",
    borderRadius: "8px", padding: "6px 12px", width: "100%", justifyContent: "center",
  },
  vehicleIcon: { fontSize: "0.9rem" },
  vehicleText: { fontSize: "0.78rem", color: "#94a3b8", fontFamily: "monospace", fontWeight: 600 },
  emptySlot: {
    background: "#0f172a", borderRadius: "8px", padding: "8px",
    width: "100%", display: "flex", justifyContent: "center", opacity: 0.5,
  },
  badge: {
    padding: "5px 14px", borderRadius: "20px", fontSize: "0.72rem",
    fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em",
    display: "flex", alignItems: "center",
  },
  btn: {
    width: "100%", padding: "11px", border: "none", borderRadius: "12px",
    color: "white", fontWeight: 700, fontSize: "0.85rem", cursor: "pointer",
    marginTop: "2px", letterSpacing: "0.02em", transition: "opacity 0.15s",
  },
};