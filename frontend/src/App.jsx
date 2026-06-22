import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import AllocatePage from "./pages/AllocatePage";
import ManagePage from "./pages/ManagePage";
import LoginPage from "./pages/LoginPage";
import Register from "./pages/Register";

const getUser = () => {
  try {
    return JSON.parse(localStorage.getItem("user"));
  } catch {
    return null;
  }
};

function ProtectedLayout({ children }) {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  if (!isLoggedIn) return <Navigate to="/login" />;
  return (
    <div style={{ minHeight: "100vh", background: "#0f172a" }}>
      <Navbar />
      {children}
    </div>
  );
}

function AdminRoute({ children }) {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const user = getUser();
  if (!isLoggedIn) return <Navigate to="/login" />;
  if (user?.role !== "admin") return <Navigate to="/" />;
  return (
    <div style={{ minHeight: "100vh", background: "#0f172a" }}>
      <Navbar />
      {children}
    </div>
  );
}

function App() {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={isLoggedIn ? <Navigate to="/" /> : <LoginPage />} />
        <Route path="/register" element={isLoggedIn ? <Navigate to="/" /> : <Register />} />

        <Route path="/" element={<ProtectedLayout><HomePage /></ProtectedLayout>} />
        <Route path="/allocate" element={<ProtectedLayout><AllocatePage /></ProtectedLayout>} />

        {/* Admin only */}
        <Route path="/manage" element={<AdminRoute><ManagePage /></AdminRoute>} />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;