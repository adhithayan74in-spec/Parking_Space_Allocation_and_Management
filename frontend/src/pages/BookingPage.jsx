import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../api/axios";

export default function BookingPage() {
  const { id } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const slot = state?.slot;

  const [vehicleNumber, setVehicleNumber] = useState("");
  const [duration, setDuration] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleBook = async () => {
    if (!vehicleNumber.trim()) {
      setError("Please enter a vehicle number.");
      return;
    }
    setLoading(true);
    try {
      await api.put(`/parking/park/${id}`, { vehicleNumber, duration });
      navigate("/allocate");
    } catch (err) {
      setError("Booking failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!slot) {
    navigate("/allocate");
    return null;
  }

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.headerRow}>
          <button style={styles.backBtn} onClick={() => navigate(-1)}>← Back</button>
          <div style={styles.slotBadge}>Slot {slot.slotNumber}</div>
        </div>

        <h2 style={styles.title}>Book Parking Slot</h2>
        <p style={styles.subtitle}>Fill in the details below to confirm your booking</p>

        <div style={styles.field}>
          <label style={styles.label}>Vehicle Number</label>
          <input
            style={styles.input}
            placeholder="e.g. KL 07 AB 1234"
            value={vehicleNumber}
            onChange={(e) => {
              setVehicleNumber(e.target.value.toUpperCase());
              setError("");
            }}
          />
        </div>

        <div style={styles.field}>
          <label style={styles.label}>Duration (hours)</label>
          <div style={styles.durationRow}>
            <button style={styles.durationBtn} onClick={() => setDuration((d) => Math.max(1, d - 1))}>−</button>
            <span style={styles.durationValue}>{duration} hr{duration > 1 ? "s" : ""}</span>
            <button style={styles.durationBtn} onClick={() => setDuration((d) => Math.min(24, d + 1))}>+</button>
          </div>
        </div>

        <div style={styles.summary}>
          <div style={styles.summaryRow}>
            <span style={styles.summaryKey}>Slot</span>
            <span style={styles.summaryVal}>#{slot.slotNumber}</span>
          </div>
          <div style={styles.divider} />
          <div style={styles.summaryRow}>
            <span style={styles.summaryKey}>Duration</span>
            <span style={styles.summaryVal}>{duration} hr{duration > 1 ? "s" : ""}</span>
          </div>
          <div style={styles.divider} />
          <div style={styles.summaryRow}>
            <span style={styles.summaryKey}>Vehicle</span>
            <span style={styles.summaryVal}>{vehicleNumber || "—"}</span>
          </div>
        </div>

        {error && <p style={styles.error}>⚠ {error}</p>}

        <button
          style={{ ...styles.confirmBtn, opacity: loading ? 0.7 : 1, cursor: loading ? "not-allowed" : "pointer" }}
          onClick={handleBook}
          disabled={loading}
        >
          {loading ? "Booking..." : "✓ Confirm Booking"}
        </button>

        <button style={styles.cancelBtn} onClick={() => navigate(-1)}>Cancel</button>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh", background: "#0f172a", display: "flex",
    alignItems: "center", justifyContent: "center", padding: "24px",
    fontFamily: "'Segoe UI', sans-serif",
  },
  card: {
    background: "linear-gradient(145deg, #1e293b, #1a2540)", borderRadius: "20px",
    padding: "32px 28px", width: "100%", maxWidth: "420px",
    display: "flex", flexDirection: "column", gap: "16px",
    border: "1px solid rgba(99,102,241,0.2)", boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
  },
  headerRow: { display: "flex", justifyContent: "space-between", alignItems: "center" },
  backBtn: {
    background: "transparent", border: "none", color: "#94a3b8",
    fontSize: "0.85rem", cursor: "pointer", padding: "4px 0", fontWeight: 600,
  },
  slotBadge: {
    background: "rgba(99,102,241,0.15)", color: "#818cf8",
    border: "1px solid rgba(99,102,241,0.3)", borderRadius: "20px",
    padding: "4px 14px", fontSize: "0.8rem", fontWeight: 700,
  },
  title: { color: "#f1f5f9", fontSize: "1.4rem", fontWeight: 800, margin: 0, letterSpacing: "-0.02em" },
  subtitle: { color: "#64748b", fontSize: "0.85rem", margin: 0 },
  field: { display: "flex", flexDirection: "column", gap: "8px" },
  label: {
    color: "#94a3b8", fontSize: "0.78rem", fontWeight: 600,
    textTransform: "uppercase", letterSpacing: "0.06em",
  },
  input: {
    background: "#0f172a", border: "1px solid rgba(99,102,241,0.25)",
    borderRadius: "10px", padding: "12px 14px", color: "#f1f5f9",
    fontSize: "1rem", outline: "none", fontFamily: "monospace", letterSpacing: "0.05em",
  },
  durationRow: {
    display: "flex", alignItems: "center", gap: "16px", background: "#0f172a",
    border: "1px solid rgba(99,102,241,0.25)", borderRadius: "10px",
    padding: "8px 14px", width: "fit-content",
  },
  durationBtn: {
    background: "rgba(99,102,241,0.15)", border: "1px solid rgba(99,102,241,0.3)",
    borderRadius: "6px", color: "#818cf8", width: "30px", height: "30px",
    fontSize: "1.1rem", cursor: "pointer", fontWeight: 700,
    display: "flex", alignItems: "center", justifyContent: "center",
  },
  durationValue: {
    color: "#f1f5f9", fontWeight: 700, fontSize: "0.95rem",
    minWidth: "60px", textAlign: "center",
  },
  summary: {
    background: "#0f172a", borderRadius: "12px", padding: "16px 18px",
    border: "1px solid rgba(255,255,255,0.05)", display: "flex",
    flexDirection: "column", gap: "10px",
  },
  summaryRow: { display: "flex", justifyContent: "space-between", alignItems: "center" },
  summaryKey: { color: "#64748b", fontSize: "0.85rem" },
  summaryVal: { color: "#f1f5f9", fontWeight: 700, fontSize: "0.85rem", fontFamily: "monospace" },
  divider: { height: "1px", background: "rgba(255,255,255,0.05)" },
  error: {
    color: "#f87171", fontSize: "0.82rem", margin: 0,
    background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)",
    borderRadius: "8px", padding: "10px 14px",
  },
  confirmBtn: {
    background: "linear-gradient(135deg, #6366f1, #4f46e5)", border: "none",
    borderRadius: "12px", padding: "14px", color: "white", fontWeight: 700,
    fontSize: "1rem", boxShadow: "0 4px 14px rgba(99,102,241,0.35)", marginTop: "4px",
  },
  cancelBtn: {
    background: "transparent", border: "1px solid rgba(148,163,184,0.15)",
    borderRadius: "12px", padding: "12px", color: "#64748b",
    fontWeight: 600, fontSize: "0.9rem", cursor: "pointer",
  },
};