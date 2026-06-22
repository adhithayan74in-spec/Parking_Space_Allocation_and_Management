import { useEffect, useState } from "react";
import api from "../api/axios";
import SlotCard from "../components/SlotCard";

export default function AllocatePage() {
  const [slots, setSlots] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  const fetchSlots = async () => {
    try {
      const res = await api.get("/parking");
      setSlots(res.data);
    } catch {
      console.error("Failed to fetch slots");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchSlots(); }, []);

  const filtered = filter === "all" ? slots
    : slots.filter((s) => s.status === filter);

  const available = slots.filter((s) => s.status === "available").length;
  const occupied = slots.length - available;
  const occupancyPct = slots.length > 0 ? Math.round((occupied / slots.length) * 100) : 0;

  const filterConfig = [
    { key: "all", label: "All", count: slots.length, color: "#93c5fd" },
    { key: "available", label: "Available", count: available, color: "#4ade80" },
    { key: "occupied", label: "Occupied", count: occupied, color: "#f87171" },
  ];

  return (
    <div style={styles.page}>
      {/* Header */}
      <div style={styles.header}>
        <div>
          <h2 style={styles.title}>🅿️ Parking Slots</h2>
          <p style={styles.subtitle}>
            <span style={{ color: "#93c5fd" }}>{slots.length} total</span>
            {" · "}
            <span style={{ color: "#4ade80" }}>{available} available</span>
            {" · "}
            <span style={{ color: "#f87171" }}>{occupied} occupied</span>
          </p>
        </div>

        {/* Filter buttons */}
        <div style={styles.filters}>
          {filterConfig.map(({ key, label, count, color }) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              style={{
                ...styles.filterBtn,
                ...(filter === key ? {
                  background: `${color}18`,
                  color: color,
                  border: `1px solid ${color}50`,
                  boxShadow: `0 0 12px ${color}20`,
                } : {}),
              }}
            >
              {label}
              <span style={{
                ...styles.filterCount,
                background: filter === key ? `${color}25` : "#334155",
                color: filter === key ? color : "#64748b",
              }}>
                {count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Occupancy bar */}
      {slots.length > 0 && (
        <div style={styles.progressWrap}>
          <div style={styles.progressBar}>
            <div style={{
              ...styles.progressFill,
              width: `${occupancyPct}%`,
              background: occupancyPct > 75
                ? "linear-gradient(90deg, #ef4444, #f87171)"
                : occupancyPct > 40
                ? "linear-gradient(90deg, #f59e0b, #fbbf24)"
                : "linear-gradient(90deg, #22c55e, #4ade80)",
            }} />
          </div>
          <span style={styles.progressLabel}>{occupancyPct}% occupied</span>
        </div>
      )}

      {/* Slot grid */}
      {loading ? (
        <div style={styles.loadingWrap}>
          <div style={styles.spinner} />
          <p style={styles.loadingText}>Loading slots...</p>
        </div>
      ) : filtered.length === 0 ? (
        <div style={styles.emptyWrap}>
          <span style={{ fontSize: "2.5rem" }}>🔍</span>
          <p style={styles.loadingText}>No {filter !== "all" ? filter : ""} slots found.</p>
        </div>
      ) : (
        <div style={styles.grid}>
          {filtered.map((slot) => (
            <SlotCard key={slot._id} slot={slot} onRefresh={fetchSlots} />
          ))}
        </div>
      )}
    </div>
  );
}

const styles = {
  page: {
    padding: "36px 28px",
    fontFamily: "'Segoe UI', sans-serif",
    color: "#f1f5f9",
    maxWidth: "1100px",
    margin: "0 auto",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    flexWrap: "wrap",
    gap: "16px",
    marginBottom: "20px",
  },
  title: { margin: "0 0 6px", fontSize: "1.9rem", fontWeight: 800, letterSpacing: "-0.02em" },
  subtitle: { margin: 0, fontSize: "0.9rem" },
  filters: { display: "flex", gap: "8px", flexWrap: "wrap" },
  filterBtn: {
    display: "flex", alignItems: "center", gap: "7px",
    padding: "8px 16px", borderRadius: "20px",
    border: "1px solid #334155", background: "transparent",
    color: "#94a3b8", cursor: "pointer", fontSize: "0.85rem",
    fontWeight: 600, transition: "all 0.2s",
  },
  filterCount: {
    padding: "1px 7px", borderRadius: "10px",
    fontSize: "0.72rem", fontWeight: 700,
  },
  progressWrap: {
    display: "flex", alignItems: "center", gap: "12px",
    marginBottom: "28px",
  },
  progressBar: {
    flex: 1, height: "6px", background: "#1e293b",
    borderRadius: "10px", overflow: "hidden",
    border: "1px solid #334155",
  },
  progressFill: {
    height: "100%", borderRadius: "10px",
    transition: "width 0.5s ease",
  },
  progressLabel: { fontSize: "0.75rem", color: "#64748b", fontWeight: 600, whiteSpace: "nowrap" },
  loadingWrap: { textAlign: "center", marginTop: "80px" },
  emptyWrap: { textAlign: "center", marginTop: "80px" },
  spinner: {
    width: "36px", height: "36px", borderRadius: "50%",
    border: "3px solid #1e293b", borderTop: "3px solid #3b82f6",
    animation: "spin 0.8s linear infinite", margin: "0 auto 16px",
  },
  loadingText: { color: "#64748b", fontSize: "0.95rem" },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(165px, 1fr))",
    gap: "16px",
  },
};