import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/axios";

export default function HomePage() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({ total: 0, available: 0, occupied: 0 });

  useEffect(() => {
    api.get("/parking").then((res) => {
      const slots = res.data;
      const occupied = slots.filter((s) => s.status === "occupied").length;
      setStats({ total: slots.length, available: slots.length - occupied, occupied });
    }).catch(() => {});
  }, []);

  return (
    <div style={styles.page}>
      <div style={styles.hero}>
        <div style={styles.badge}>🚗 Live Parking Dashboard</div>
        <h1 style={styles.heading}>
          Parking Space<br />
          <span style={styles.accent}>Manager</span>
        </h1>
        <p style={styles.desc}>
          Real-time allocation and management of parking slots.<br />
          Park, release, and track with ease.
        </p>

        <div style={styles.statsRow}>
          <div style={styles.statCard}>
            <span style={styles.statNum}>{stats.total}</span>
            <span style={styles.statLabel}>Total Slots</span>
          </div>
          <div style={{ ...styles.statCard, borderColor: "#22c55e" }}>
            <span style={{ ...styles.statNum, color: "#4ade80" }}>{stats.available}</span>
            <span style={styles.statLabel}>Available</span>
          </div>
          <div style={{ ...styles.statCard, borderColor: "#ef4444" }}>
            <span style={{ ...styles.statNum, color: "#f87171" }}>{stats.occupied}</span>
            <span style={styles.statLabel}>Occupied</span>
          </div>
        </div>

        <div style={styles.btnRow}>
          <button style={styles.primaryBtn} onClick={() => navigate("/allocate")}>
            🅿️ View Slots
          </button>
          <button style={styles.secondaryBtn} onClick={() => navigate("/manage")}>
            ⚙️ Manage Slots
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "88vh", display: "flex", alignItems: "center",
    justifyContent: "center", padding: "40px 20px",
    fontFamily: "'Segoe UI', sans-serif",
  },
  hero: {
    maxWidth: "620px", width: "100%", textAlign: "center",
    background: "#1e293b", border: "1px solid #334155",
    borderRadius: "24px", padding: "60px 50px",
    boxShadow: "0 8px 40px rgba(0,0,0,0.4)",
  },
  badge: {
    display: "inline-block", background: "#1d4ed820", border: "1px solid #3b82f640",
    color: "#60a5fa", borderRadius: "50px", padding: "6px 16px",
    fontSize: "0.8rem", fontWeight: 600, marginBottom: "24px",
  },
  heading: {
    margin: "0 0 16px", fontSize: "3rem", fontWeight: 800,
    color: "#f1f5f9", lineHeight: 1.15,
  },
  accent: { color: "#60a5fa" },
  desc: { color: "#94a3b8", fontSize: "1rem", lineHeight: 1.7, margin: "0 0 32px" },
  statsRow: { display: "flex", gap: "16px", justifyContent: "center", marginBottom: "36px", flexWrap: "wrap" },
  statCard: {
    flex: 1, minWidth: "100px", background: "#0f172a",
    border: "1px solid #334155", borderRadius: "14px",
    padding: "18px 10px", display: "flex", flexDirection: "column", gap: "4px",
  },
  statNum: { fontSize: "2rem", fontWeight: 800, color: "#f1f5f9" },
  statLabel: { fontSize: "0.75rem", color: "#64748b", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" },
  btnRow: { display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" },
  primaryBtn: {
    padding: "14px 32px", background: "#3b82f6", color: "white",
    border: "none", borderRadius: "12px", fontSize: "1rem",
    fontWeight: 600, cursor: "pointer",
  },
  secondaryBtn: {
    padding: "14px 32px", background: "#6366f1", color: "white",
    border: "none", borderRadius: "12px", fontSize: "1rem",
    fontWeight: 600, cursor: "pointer",
  },
};
