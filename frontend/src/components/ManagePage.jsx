import React, { useState } from "react";
import "./manage.css";

const Manage = () => {
  const [slots, setSlots] = useState(4);
  const [inputValue, setInputValue] = useState("");

  const updateSlots = () => {
    if (!inputValue) return;
    setSlots(Number(inputValue));
    setInputValue("");
  };

  return (
    <div className="manage-page">
      <div className="manage-card">
        <h2 className="title">⚙️ Manage Parking Slots</h2>

        <p className="subtitle">
          Current total slots: <b>{slots}</b>
        </p>

        <div className="form">
          <input
            type="number"
            placeholder="Set new total slots"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />

          <button onClick={updateSlots}>Update</button>
        </div>
      </div>
    </div>
  );
};

export default Manage;