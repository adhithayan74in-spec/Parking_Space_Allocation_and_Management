import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();

  const links = [
    { to: "/", label: "🏠 Home" },
    { to: "/allocate", label: "🅿️ Slots" },
    { to: "/manage", label: "⚙️ Manage" },
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
      <button
        style={styles.logout}
        onClick={() => {
          localStorage.removeItem("isLoggedIn");
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
  logout: {
    marginLeft: "auto", padding: "8px 16px", background: "#ef444420",
    color: "#f87171", border: "1px solid #ef444440", borderRadius: "8px",
    fontSize: "0.85rem", fontWeight: 600, cursor: "pointer",
  },
};
