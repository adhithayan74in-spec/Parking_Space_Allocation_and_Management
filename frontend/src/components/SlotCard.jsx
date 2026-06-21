const SlotCard = ({ slot, onSelect, onRelease }) => {
  const isOccupied = slot.status === "occupied";

  return (
    <div
      style={{
        background: isOccupied ? "#fee2e2" : "#dcfce7",
        border: `2px solid ${isOccupied ? "#ef4444" : "#22c55e"}`,
        borderRadius: "12px",
        padding: "16px",
        textAlign: "center",
        minWidth: "120px",
      }}
    >
    <h3
  style={{
    margin: 0,
    fontSize: "1.2rem",
    color: isOccupied ? "#dc2626" : "#16a34a"
  }}
>
  🅿️ Slot {slot.slotNumber}
</h3>
      <p style={{ margin: "8px 0", fontWeight: "bold", color: isOccupied ? "#dc2626" : "#16a34a" }}>
        {isOccupied ? "Occupied" : "Available"}
      </p>
      {!isOccupied ? (
        <button
          onClick={() => onSelect(slot._id)}
          style={{ background: "#3b82f6", color: "white", border: "none", padding: "6px 14px", borderRadius: "8px", cursor: "pointer" }}
        >
          Allocate
        </button>
      ) : (
        <button
          onClick={() => onRelease(slot._id)}
          style={{ background: "#ef4444", color: "white", border: "none", padding: "6px 14px", borderRadius: "8px", cursor: "pointer" }}
        >
          Release
        </button>
      )}
    </div>
  );
};

export default SlotCard;