import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: "center", marginTop: "80px", fontFamily: "sans-serif" }}>
      <h1 style={{ fontSize: "2.5rem" }}>🚗 Parking Space Manager</h1>
      <p style={{ color: "#555", fontSize: "1.1rem" }}>
        Easily allocate and manage parking slots in real time.
      </p>
      <div style={{ marginTop: "40px", display: "flex", justifyContent: "center", gap: "20px" }}>
        <button
          onClick={() => navigate("/allocate")}
          style={{ padding: "12px 28px", fontSize: "1rem", background: "#3b82f6", color: "white", border: "none", borderRadius: "10px", cursor: "pointer" }}
        >
          View Slots
        </button>
        <button
          onClick={() => navigate("/manage")}
          style={{ padding: "12px 28px", fontSize: "1rem", background: "#6366f1", color: "white", border: "none", borderRadius: "10px", cursor: "pointer" }}
        >
          Manage Slots
        </button>
      </div>
    </div>
  );
};

export default HomePage;