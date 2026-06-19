import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "88vh",
      textAlign: "center",
      padding: "20px",
    }}>
      <div style={{
        background: "#1e293b",
        border: "1px solid #334155",
        borderRadius: "20px",
        padding: "60px 80px",
        boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
        maxWidth: "600px",
        width: "100%",
      }}>
        <div style={{ fontSize: "3rem", marginBottom: "16px" }}>🚗</div>

        <h1 style={{
          fontSize: "2.8rem",
          fontWeight: "800",
          color: "#f1f5f9",
          letterSpacing: "-0.5px",
          marginBottom: "12px",
          lineHeight: 1.2,
        }}>
          Parking Space
          <span style={{ color: "#60a5fa", display: "block" }}>
            Manager
          </span>
        </h1>

        <p style={{
          color: "#94a3b8",
          fontSize: "1.05rem",
          marginBottom: "40px",
          lineHeight: 1.6,
        }}>
          Allocate and manage parking slots in real time.
        </p>

        <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
          <button
            onClick={() => navigate("/allocate")}
            style={{
              padding: "14px 32px",
              fontSize: "1rem",
              fontWeight: "600",
              background: "#3b82f6",
              color: "white",
              border: "none",
              borderRadius: "10px",
              cursor: "pointer",
              transition: "background 0.2s",
            }}
            onMouseOver={e => e.target.style.background = "#2563eb"}
            onMouseOut={e => e.target.style.background = "#3b82f6"}
          >
            🅿️ View Slots
          </button>
          <button
            onClick={() => navigate("/manage")}
            style={{
              padding: "14px 32px",
              fontSize: "1rem",
              fontWeight: "600",
              background: "#6366f1",
              color: "white",
              border: "none",
              borderRadius: "10px",
              cursor: "pointer",
            }}
            onMouseOver={e => e.target.style.background = "#4f46e5"}
            onMouseOut={e => e.target.style.background = "#6366f1"}
          >
            ⚙️ Manage Slots
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;