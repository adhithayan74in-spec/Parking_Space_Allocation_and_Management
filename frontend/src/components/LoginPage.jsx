import React, { useState } from "react";
import "./login.css";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (username === "admin" && password === "1234") {
      localStorage.setItem("isLoggedIn", "true");
      window.location.href = "/";
    } else {
      alert("Invalid Username or Password");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Parking Management System</h2>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleLogin}>
          Login
        </button>
      </div>
    </div>
  );
};

export default LoginPage;