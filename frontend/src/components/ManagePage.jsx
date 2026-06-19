import { useState } from "react";

const ManagePage = () => {
  const [totalSlots, setTotalSlots] = useState(4);
  const [input, setInput] = useState("");
  const [message, setMessage] = useState("");

  const handleUpdate = () => {
    const num = parseInt(input);
    if (!num || num < 1) return setMessage("Enter a valid number!");
    setTotalSlots(num);
    setMessage(`✅ Slot count updated to ${num}`);
    // 🔴 Later: call backend API to update slot count in MongoDB
  };

  return (
    <div style={{ padding: "30px", fontFamily: "sans-serif" }}>
      <h2>⚙️ Manage Parking Slots</h2>
      <p>Current total slots: <strong>{totalSlots}</strong></p>

      <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
        <input
          type="number"
          placeholder="Set new total slots"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{ padding: "8px 12px", borderRadius: "8px", border: "1px solid #ccc", fontSize: "1rem" }}
        />
        <button
          onClick={handleUpdate}
          style={{ padding: "8px 20px", background: "#6366f1", color: "white", border: "none", borderRadius: "8px", cursor: "pointer" }}
        >
          Update
        </button>
      </div>
      {message && <p style={{ marginTop: "16px", color: "green" }}>{message}</p>}
    </div>
  );
};

export default ManagePage;