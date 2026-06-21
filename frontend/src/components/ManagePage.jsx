import React, { useState } from "react";
import "./manage.css";

const Manage = () => {
  const [slots, setSlots] = useState(4);
  const [inputValue, setInputValue] = useState("");
  const [message, setMessage] = useState("");

  const updateSlots = () => {
    if (!inputValue || Number(inputValue) < 0) {
      setMessage("❌ Enter a valid number");
      return;
    }

    setSlots(Number(inputValue));
    setInputValue("");
    setMessage("✅ Slots updated successfully!");

    setTimeout(() => {
      setMessage("");
    }, 3000);
  };

  return (
    <div className="manage-container">
      <div className="manage-card">
        <h2>⚙️ Manage Parking Slots</h2>

        <p className="current-slots">
          Current Total Slots: <span>{slots}</span>
        </p>

        <input
          type="number"
          min="0"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter new slot count"
        />

        <button onClick={updateSlots}>
          Update Slots
        </button>

        {message && (
          <p
            className="message"
            style={{
              color: message.includes("❌") ? "red" : "green",
            }}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default Manage;