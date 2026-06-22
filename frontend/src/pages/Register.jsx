import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!name || !email || !password) { setError("Please fill in all fields."); return; }
    if (password.length < 6) { setError("Password must be at least 6 characters."); return; }
    setLoading(true);
    try {
      await api.post("/auth/signup", { name, email, password });
      alert("Account created! Please sign in.");
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Try a different email.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.iconWrap}>🅿️</div>
        <h1 style={styles.title}>Create Account</h1>
        <p style={styles.sub}>Join ParkSpace today</p>

        {error && <p style={styles.error}>{error}</p>}

        <input style={styles.input} placeholder="Full Name" value={name}
          onChange={(e) => { setName(e.target.value); setError(""); }} />
        <input style={styles.input} placeholder="Email address" value={email}
          onChange={(e) => { setEmail(e.target.value); setError(""); }} />
        <input style={styles.input} type="password" placeholder="Password (min. 6 chars)" value={password}
          onChange={(e) => { setPassword(e.target.value); setError(""); }} />

        <button style={styles.btn} onClick={handleRegister} disabled={loading}>
          {loading ? "Creating account..." : "Create Account"}
        </button>

        <p style={styles.loginText}>
          Already have an account?{" "}
          <Link to="/login" style={styles.link}>Sign in</Link>
        </p>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontFamily: "'Segoe UI', sans-serif",
  },
  card: {
    background: "#1e293b", border: "1px solid #334155", borderRadius: "20px",
    padding: "48px 40px", width: "100%", maxWidth: "380px",
    display: "flex", flexDirection: "column", gap: "14px",
    boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
  },
  iconWrap: { fontSize: "2.4rem", textAlign: "center" },
  title: { margin: 0, color: "#f1f5f9", fontSize: "1.8rem", fontWeight: 800, textAlign: "center" },
  sub: { margin: 0, color: "#64748b", fontSize: "0.9rem", textAlign: "center" },
  error: { margin: 0, color: "#f87171", fontSize: "0.85rem", background: "#fee2e215", padding: "10px", borderRadius: "8px" },
  input: {
    padding: "12px 14px", borderRadius: "10px", border: "1px solid #334155",
    background: "#0f172a", color: "#f1f5f9", fontSize: "0.95rem", outline: "none",
  },
  btn: {
    padding: "13px", background: "#6366f1", color: "white", border: "none",
    borderRadius: "10px", fontSize: "1rem", fontWeight: 600, cursor: "pointer", marginTop: "4px",
  },
  loginText: { color: "#64748b", fontSize: "0.85rem", textAlign: "center", margin: 0 },
  link: { color: "#60a5fa", textDecoration: "none", fontWeight: 600 },
};