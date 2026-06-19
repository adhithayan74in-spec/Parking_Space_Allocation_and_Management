import React from 'react'

const SlotCard = ({ slot, onSelect, onRelease}) => {
  return (
    <div>
        <h3>{slot.slotNumber}</h3>
        <p>Status: {slot.status}</p>
    </div>
  )
}

export default SlotCard