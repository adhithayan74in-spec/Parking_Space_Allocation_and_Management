import { useState, useEffect } from "react";
import api from "../api/axios";

export default function ManagePage() {
  const [slots, setSlots] = useState([]);
  const [newSlot, setNewSlot] = useState("");
  const [message, setMessage] = useState(null);
  const [inputFocused, setInputFocused] = useState(false);

  const fetchSlots = async () => {
    try {
      const res = await api.get("/parking");
      setSlots(res.data);
    } catch {}
  };

  useEffect(() => { fetchSlots(); }, []);

  const notify = (text, type = "success") => {
    setMessage({ text, type });
    setTimeout(() => setMessage(null), 3000);
  };

  const createSlot = async () => {
    if (!newSlot.trim()) { notify("Enter a slot name like A1 or B2", "error"); return; }
    try {
      await api.post("/parking", { slotNumber: newSlot.trim() });
      setNewSlot("");
      fetchSlots();
      notify(`Slot ${newSlot.trim()} added!`);
    } catch {
      notify("Failed to add slot. It may already exist.", "error");
    }
  };

  const deleteSlot = async (id, num) => {
    if (!window.confirm(`Delete slot ${num}?`)) return;
    try {
      await api.delete(`/parking/${id}`);
      fetchSlots();
      notify(`Slot ${num} deleted.`);
    } catch {
      notify("Cannot delete an occupied slot.", "error");
    }
  };

  const available = slots.filter(s => s.status === "available").length;
  const occupied = slots.length - available;

  return (
    <div style={styles.page}>
      {/* Header */}
      <div style={styles.header}>
        <div>
          <h2 style={styles.title}>⚙️ Manage Slots</h2>
          <p style={styles.sub}>Add or remove parking slots from the system.</p>
        </div>
        <div style={styles.statsRow}>
          <div style={styles.statBadge}>
            <span style={{ color: "#4ade80", fontWeight: 700 }}>{available}</span>
            <span style={styles.statLabel}>Available</span>
          </div>
          <div style={styles.statDivider} />
          <div style={styles.statBadge}>
            <span style={{ color: "#f87171", fontWeight: 700 }}>{occupied}</span>
            <span style={styles.statLabel}>Occupied</span>
          </div>
          <div style={styles.statDivider} />
          <div style={styles.statBadge}>
            <span style={{ color: "#93c5fd", fontWeight: 700 }}>{slots.length}</span>
            <span style={styles.statLabel}>Total</span>
          </div>
        </div>
      </div>

      {/* Toast */}
      {message && (
        <div style={{
          ...styles.toast,
          background: message.type === "error" ? "rgba(239,68,68,0.1)" : "rgba(74,222,128,0.1)",
          border: `1px solid ${message.type === "error" ? "rgba(239,68,68,0.3)" : "rgba(74,222,128,0.3)"}`,
          color: message.type === "error" ? "#f87171" : "#4ade80",
        }}>
          {message.type === "error" ? "❌" : "✅"} {message.text}
        </div>
      )}

      {/* Add Slot Card */}
      <div style={styles.addCard}>
        <h3 style={styles.cardTitle}>
          <span style={styles.cardTitleAccent}>+</span> Add New Slot
        </h3>
        <div style={styles.addRow}>
          <input
            style={{
              ...styles.input,
              border: inputFocused ? "1px solid #3b82f6" : "1px solid #334155",
              boxShadow: inputFocused ? "0 0 0 3px rgba(59,130,246,0.15)" : "none",
            }}
            placeholder="Slot name e.g. A1, B2, C3"
            value={newSlot}
            onChange={(e) => setNewSlot(e.target.value)}
            onFocus={() => setInputFocused(true)}
            onBlur={() => setInputFocused(false)}
            onKeyDown={(e) => e.key === "Enter" && createSlot()}
          />
          <button
            style={styles.addBtn}
            onClick={createSlot}
            onMouseEnter={e => e.target.style.background = "#2563eb"}
            onMouseLeave={e => e.target.style.background = "#3b82f6"}
          >
            + Add Slot
          </button>
        </div>
      </div>

      {/* Slots List Card */}
      <div style={styles.listCard}>
        <h3 style={styles.cardTitle}>
          <span style={styles.cardTitleAccent}>≡</span> All Slots
          <span style={styles.countBadge}>{slots.length}</span>
        </h3>
        {slots.length === 0 ? (
          <div style={styles.emptyState}>
            <div style={styles.emptyIcon}>🅿️</div>
            <p style={styles.emptyText}>No slots yet. Add one above.</p>
          </div>
        ) : (
          <div style={styles.table}>
            <div style={styles.tableHeader}>
              <span>Slot</span>
              <span>Status</span>
              <span>Vehicle</span>
              <span style={{ textAlign: "right" }}>Action</span>
            </div>
            {slots.map((slot, i) => (
              <div
                key={slot._id}
                style={{
                  ...styles.tableRow,
                  borderLeft: `3px solid ${slot.status === "occupied" ? "#ef4444" : "#22c55e"}`,
                  animationDelay: `${i * 30}ms`,
                }}
              >
                <span style={styles.slotNumber}>{slot.slotNumber}</span>
                <span style={{
                  ...styles.statusBadge,
                  background: slot.status === "occupied" ? "rgba(239,68,68,0.1)" : "rgba(34,197,94,0.1)",
                  color: slot.status === "occupied" ? "#f87171" : "#4ade80",
                  border: `1px solid ${slot.status === "occupied" ? "rgba(239,68,68,0.25)" : "rgba(34,197,94,0.25)"}`,
                }}>
                  {slot.status === "occupied" ? "🔴" : "🟢"} {slot.status}
                </span>
                <span style={styles.vehicleText}>{slot.vehicleNumber || "—"}</span>
                <div style={{ textAlign: "right" }}>
                  <button
                    style={{
                      ...styles.deleteBtn,
                      opacity: slot.status === "occupied" ? 0.35 : 1,
                      cursor: slot.status === "occupied" ? "not-allowed" : "pointer",
                    }}
                    onClick={() => deleteSlot(slot._id, slot.slotNumber)}
                    disabled={slot.status === "occupied"}
                    onMouseEnter={e => { if (slot.status !== "occupied") e.target.style.background = "rgba(239,68,68,0.2)"; }}
                    onMouseLeave={e => { e.target.style.background = "rgba(239,68,68,0.08)"; }}
                  >
                    🗑 Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  page: {
    padding: "36px 28px",
    fontFamily: "'Segoe UI', sans-serif",
    color: "#f1f5f9",
    maxWidth: "860px",
    margin: "0 auto",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    flexWrap: "wrap",
    gap: "16px",
    marginBottom: "28px",
  },
  title: { margin: "0 0 6px", fontSize: "1.9rem", fontWeight: 800, letterSpacing: "-0.02em" },
  sub: { margin: 0, color: "#64748b", fontSize: "0.9rem" },
  statsRow: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    background: "#1e293b",
    border: "1px solid #334155",
    borderRadius: "14px",
    padding: "12px 20px",
  },
  statBadge: { display: "flex", flexDirection: "column", alignItems: "center", gap: "2px", fontSize: "1.1rem" },
  statLabel: { fontSize: "0.7rem", color: "#64748b", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" },
  statDivider: { width: "1px", height: "28px", background: "#334155" },
  toast: {
    padding: "13px 18px",
    borderRadius: "12px",
    marginBottom: "20px",
    fontWeight: 600,
    fontSize: "0.9rem",
    backdropFilter: "blur(8px)",
  },
  addCard: {
    background: "linear-gradient(135deg, #1e293b 0%, #1a2540 100%)",
    border: "1px solid #334155",
    borderRadius: "18px",
    padding: "24px",
    marginBottom: "20px",
    boxShadow: "0 4px 24px rgba(0,0,0,0.2)",
  },
  cardTitle: {
    margin: "0 0 16px",
    fontSize: "0.95rem",
    fontWeight: 700,
    color: "#94a3b8",
    textTransform: "uppercase",
    letterSpacing: "0.06em",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  cardTitleAccent: { color: "#3b82f6", fontSize: "1.1rem" },
  countBadge: {
    marginLeft: "8px",
    background: "#3b82f620",
    color: "#93c5fd",
    border: "1px solid #3b82f640",
    borderRadius: "20px",
    padding: "1px 10px",
    fontSize: "0.8rem",
    fontWeight: 700,
  },
  addRow: { display: "flex", gap: "12px" },
  input: {
    flex: 1,
    padding: "12px 16px",
    borderRadius: "12px",
    border: "1px solid #334155",
    background: "#0f172a",
    color: "#f1f5f9",
    fontSize: "0.95rem",
    outline: "none",
    transition: "border 0.2s, box-shadow 0.2s",
  },
  addBtn: {
    padding: "12px 26px",
    background: "#3b82f6",
    color: "white",
    border: "none",
    borderRadius: "12px",
    fontWeight: 700,
    cursor: "pointer",
    whiteSpace: "nowrap",
    fontSize: "0.9rem",
    transition: "background 0.2s",
    letterSpacing: "0.02em",
  },
  listCard: {
    background: "linear-gradient(135deg, #1e293b 0%, #1a2540 100%)",
    border: "1px solid #334155",
    borderRadius: "18px",
    padding: "24px",
    boxShadow: "0 4px 24px rgba(0,0,0,0.2)",
  },
  emptyState: { textAlign: "center", padding: "48px 0" },
  emptyIcon: { fontSize: "2.5rem", marginBottom: "12px" },
  emptyText: { color: "#64748b", fontSize: "0.95rem" },
  table: { display: "flex", flexDirection: "column", gap: "6px" },
  tableHeader: {
    display: "grid",
    gridTemplateColumns: "1fr 1.2fr 1.2fr auto",
    padding: "10px 16px",
    color: "#475569",
    fontSize: "0.72rem",
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: "0.07em",
    borderBottom: "1px solid #1e293b",
    marginBottom: "4px",
  },
  tableRow: {
    display: "grid",
    gridTemplateColumns: "1fr 1.2fr 1.2fr auto",
    alignItems: "center",
    padding: "13px 16px",
    borderRadius: "12px",
    background: "#0f172a",
    transition: "background 0.15s",
  },
  slotNumber: { fontWeight: 800, color: "#e2e8f0", fontSize: "0.95rem", letterSpacing: "0.03em" },
  statusBadge: {
    display: "inline-flex",
    alignItems: "center",
    gap: "5px",
    padding: "4px 10px",
    borderRadius: "20px",
    fontSize: "0.75rem",
    fontWeight: 700,
    width: "fit-content",
    textTransform: "capitalize",
  },
  vehicleText: { color: "#64748b", fontSize: "0.85rem", fontFamily: "monospace" },
  deleteBtn: {
    padding: "6px 14px",
    background: "rgba(239,68,68,0.08)",
    color: "#f87171",
    border: "1px solid rgba(239,68,68,0.2)",
    borderRadius: "8px",
    fontSize: "0.78rem",
    fontWeight: 600,
    cursor: "pointer",
    transition: "background 0.2s",
  },
};