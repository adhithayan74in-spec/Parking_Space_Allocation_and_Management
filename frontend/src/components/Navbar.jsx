import { Link, useLocation } from "react-router-dom";

const getUser = () => {
  try {
    return JSON.parse(localStorage.getItem("user"));
  } catch {
    return null;
  }
};

export default function Navbar() {
  const location = useLocation();
  const user = getUser();
  const isAdmin = user?.role === "admin";

  const links = [
    { to: "/", label: "🏠 Home" },
    { to: "/allocate", label: "🅿️ Slots" },
    ...(isAdmin ? [{ to: "/manage", label: "⚙️ Manage" }] : []),
  ];

  return (
    <nav style={styles.nav}>
      <span style={styles.brand}>ParkSpace</span>
      <div style={styles.links}>
        {links.map((l) => (
          <Link
            key={l.to}
            to={l.to}
            style={{
              ...styles.link,
              ...(location.pathname === l.to ? styles.activeLink : {}),
            }}
          >
            {l.label}
          </Link>
        ))}
      </div>
      <span style={styles.userBadge}>
        {user?.name || ""}
        {isAdmin && <span style={styles.adminTag}>admin</span>}
      </span>
      <button
        style={styles.logout}
        onClick={() => {
          localStorage.removeItem("isLoggedIn");
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          window.location.href = "/login";
        }}
      >
        Logout
      </button>
    </nav>
  );
}

const styles = {
  nav: {
    background: "#0f172a",
    borderBottom: "1px solid #1e293b",
    padding: "0 28px",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    height: "60px",
    fontFamily: "'Segoe UI', sans-serif",
  },
  brand: { color: "#60a5fa", fontWeight: 800, fontSize: "1.1rem", marginRight: "16px", letterSpacing: "-0.3px" },
  links: { display: "flex", gap: "4px", flex: 1 },
  link: {
    color: "#64748b", textDecoration: "none", padding: "8px 14px",
    borderRadius: "8px", fontSize: "0.9rem", fontWeight: 600, transition: "all 0.15s",
  },
  activeLink: { color: "#f1f5f9", background: "#1e293b" },
  userBadge: {
    marginLeft: "auto",
    color: "#94a3b8",
    fontSize: "0.85rem",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  adminTag: {
    background: "#7c3aed20",
    color: "#a78bfa",
    border: "1px solid #7c3aed40",
    borderRadius: "20px",
    padding: "2px 8px",
    fontSize: "0.7rem",
    fontWeight: 700,
    textTransform: "uppercase",
  },
  logout: {
    marginLeft: "12px", padding: "8px 16px", background: "#ef444420",
    color: "#f87171", border: "1px solid #ef444440", borderRadius: "8px",
    fontSize: "0.85rem", fontWeight: 600, cursor: "pointer",
  },
};