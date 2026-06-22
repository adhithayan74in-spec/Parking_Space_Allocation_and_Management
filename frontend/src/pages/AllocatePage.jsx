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

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <div>
          <h2 style={styles.title}>🅿️ Parking Slots</h2>
          <p style={styles.subtitle}>{slots.length} total · {available} available · {occupied} occupied</p>
        </div>
        <div style={styles.filters}>
          {["all", "available", "occupied"].map((f) => (
            <button key={f} onClick={() => setFilter(f)}
              style={{ ...styles.filterBtn, ...(filter === f ? styles.filterActive : {}) }}>
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <p style={styles.loading}>Loading slots...</p>
      ) : filtered.length === 0 ? (
        <p style={styles.loading}>No {filter !== "all" ? filter : ""} slots found.</p>
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
  page: { padding: "32px 28px", fontFamily: "'Segoe UI', sans-serif", color: "#f1f5f9" },
  header: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "16px", marginBottom: "28px" },
  title: { margin: 0, fontSize: "1.8rem", fontWeight: 800 },
  subtitle: { margin: "6px 0 0", color: "#64748b", fontSize: "0.9rem" },
  filters: { display: "flex", gap: "8px" },
  filterBtn: {
    padding: "8px 18px", borderRadius: "20px", border: "1px solid #334155",
    background: "transparent", color: "#94a3b8", cursor: "pointer", fontSize: "0.85rem", fontWeight: 600,
  },
  filterActive: { background: "#3b82f6", color: "white", border: "1px solid #3b82f6" },
  loading: { color: "#64748b", textAlign: "center", marginTop: "60px" },
  grid: {
    display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: "16px",
  },
};
