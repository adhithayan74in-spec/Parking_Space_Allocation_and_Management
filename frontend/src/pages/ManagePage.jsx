import { useState, useEffect } from "react";
import api from "../api/axios";

export default function ManagePage() {
  const [slots, setSlots] = useState([]);
  const [newSlot, setNewSlot] = useState("");
  const [message, setMessage] = useState(null);

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

  return (
    <div style={styles.page}>
      <h2 style={styles.title}>⚙️ Manage Slots</h2>
      <p style={styles.sub}>Add or remove parking slots from the system.</p>

      {message && (
        <div style={{ ...styles.toast, background: message.type === "error" ? "#fee2e2" : "#dcfce7", color: message.type === "error" ? "#b91c1c" : "#166534" }}>
          {message.type === "error" ? "❌" : "✅"} {message.text}
        </div>
      )}

      <div style={styles.addCard}>
        <h3 style={styles.cardTitle}>Add New Slot</h3>
        <div style={styles.addRow}>
          <input
            style={styles.input}
            placeholder="Slot name e.g. A1, B2, C3"
            value={newSlot}
            onChange={(e) => setNewSlot(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && createSlot()}
          />
          <button style={styles.addBtn} onClick={createSlot}>+ Add Slot</button>
        </div>
      </div>

      <div style={styles.listCard}>
        <h3 style={styles.cardTitle}>All Slots ({slots.length})</h3>
        {slots.length === 0 ? (
          <p style={styles.empty}>No slots yet. Add one above.</p>
        ) : (
          <div style={styles.table}>
            <div style={styles.tableHeader}>
              <span>Slot</span><span>Status</span><span>Vehicle</span><span>Action</span>
            </div>
            {slots.map((slot) => (
              <div key={slot._id} style={styles.tableRow}>
                <span style={{ fontWeight: 700, color: "#f1f5f9" }}>{slot.slotNumber}</span>
                <span style={{ color: slot.status === "occupied" ? "#f87171" : "#4ade80", fontWeight: 600, fontSize: "0.85rem" }}>
                  {slot.status}
                </span>
                <span style={{ color: "#94a3b8", fontSize: "0.85rem" }}>{slot.vehicleNumber || "—"}</span>
                <button
                  style={{ ...styles.deleteBtn, opacity: slot.status === "occupied" ? 0.4 : 1 }}
                  onClick={() => deleteSlot(slot._id, slot.slotNumber)}
                  disabled={slot.status === "occupied"}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  page: { padding: "32px 28px", fontFamily: "'Segoe UI', sans-serif", color: "#f1f5f9", maxWidth: "860px", margin: "0 auto" },
  title: { margin: "0 0 6px", fontSize: "1.8rem", fontWeight: 800 },
  sub: { margin: "0 0 24px", color: "#64748b", fontSize: "0.9rem" },
  toast: { padding: "12px 18px", borderRadius: "10px", marginBottom: "20px", fontWeight: 600, fontSize: "0.9rem" },
  addCard: { background: "#1e293b", border: "1px solid #334155", borderRadius: "16px", padding: "24px", marginBottom: "20px" },
  cardTitle: { margin: "0 0 16px", fontSize: "1rem", fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.05em" },
  addRow: { display: "flex", gap: "12px" },
  input: {
    flex: 1, padding: "12px 14px", borderRadius: "10px", border: "1px solid #334155",
    background: "#0f172a", color: "#f1f5f9", fontSize: "0.95rem", outline: "none",
  },
  addBtn: {
    padding: "12px 24px", background: "#3b82f6", color: "white",
    border: "none", borderRadius: "10px", fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap",
  },
  listCard: { background: "#1e293b", border: "1px solid #334155", borderRadius: "16px", padding: "24px" },
  empty: { color: "#64748b", textAlign: "center", padding: "32px 0" },
  table: { display: "flex", flexDirection: "column", gap: "2px" },
  tableHeader: {
    display: "grid", gridTemplateColumns: "1fr 1fr 1fr auto",
    padding: "10px 14px", color: "#64748b", fontSize: "0.75rem",
    fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em",
  },
  tableRow: {
    display: "grid", gridTemplateColumns: "1fr 1fr 1fr auto",
    alignItems: "center", padding: "12px 14px",
    borderRadius: "10px", background: "#0f172a",
    marginBottom: "6px",
  },
  deleteBtn: {
    padding: "6px 14px", background: "#ef444420", color: "#f87171",
    border: "1px solid #ef444440", borderRadius: "8px",
    fontSize: "0.8rem", fontWeight: 600, cursor: "pointer",
  },
};
