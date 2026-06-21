import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import HomePage from "./components/HomePage";
import AllocatePage from "./components/AllocatePage";
import ManagePage from "./components/ManagePage";
import LoginPage from "./components/LoginPage";
import "./App.css";
import { useState } from "react";

function App() {
const [slots, setSlots] = useState([
{ _id: "1", slotNumber: 1, status: "available" },
{ _id: "2", slotNumber: 2, status: "occupied" },
{ _id: "3", slotNumber: 3, status: "available" },
{ _id: "4", slotNumber: 4, status: "occupied" },
{ _id: "5", slotNumber: 5, status: "available" },
{ _id: "6", slotNumber: 6, status: "available" },
{ _id: "7", slotNumber: 7, status: "occupied" },
{ _id: "8", slotNumber: 8, status: "available" },
{ _id: "9", slotNumber: 9, status: "occupied" },
{ _id: "10", slotNumber: 10, status: "available" },
{ _id: "11", slotNumber: 11, status: "available" },
{ _id: "12", slotNumber: 12, status: "occupied" },
]);

const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

const handleSelect = (id) => {
setSlots(
slots.map((s) =>
s._id === id ? { ...s, status: "occupied" } : s
)
);
};

const handleRelease = (id) => {
setSlots(
slots.map((s) =>
s._id === id ? { ...s, status: "available" } : s
)
);
};

return (
<BrowserRouter>
{!isLoggedIn ? (
<LoginPage />
) : (
<>
<nav
style={{
background: "#1e293b",
padding: "12px 24px",
display: "flex",
gap: "20px",
alignItems: "center",
}}
>
<Link
to="/"
style={{
color: "white",
textDecoration: "none",
fontWeight: "bold",
}}
>
🏠 Home
</Link>

        <Link
          to="/allocate"
          style={{
            color: "white",
            textDecoration: "none",
          }}
        >
          🅿️ Slots
        </Link>

        <Link
          to="/manage"
          style={{
            color: "white",
            textDecoration: "none",
          }}
        >
          ⚙️ Manage
        </Link>

        <button
          onClick={() => {
            localStorage.removeItem("isLoggedIn");
            window.location.reload();
          }}
          style={{
            marginLeft: "auto",
            padding: "8px 15px",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </nav>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/allocate"
          element={
            <AllocatePage
              slots={slots}
              onSelect={handleSelect}
              onRelease={handleRelease}
            />
          }
        />
        <Route path="/manage" element={<ManagePage />} />
      </Routes>
    </>
  )}
</BrowserRouter>

);
}

export default App;