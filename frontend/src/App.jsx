import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import HomePage from "./components/HomePage";
import AllocatePage from "./components/AllocatePage";
import ManagePage from "./components/ManagePage";
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <nav style={{ background: "#1e293b", padding: "12px 24px", display: "flex", gap: "20px" }}>
        <Link to="/" style={{ color: "white", textDecoration: "none", fontWeight: "bold" }}>🏠 Home</Link>
        <Link to="/allocate" style={{ color: "white", textDecoration: "none" }}>🅿️ Slots</Link>
        <Link to="/manage" style={{ color: "white", textDecoration: "none" }}>⚙️ Manage</Link>
      </nav>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/allocate" element={<AllocatePage />} />
        <Route path="/manage" element={<ManagePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;