"use client"
import React, { useState } from 'react'

interface ButtonGroupItem {
  name: string,
  value: string
}

interface ButtonGroupProps {
  buttons: ButtonGroupItem[],
  onClick: (btnValue:string) => void
}

const ButtonGroup = ({buttons, onClick}:ButtonGroupProps) => {
  const [btnActive, setBtnActive] = useState(buttons[0].value);

  const handleClick = (btnValue:string) => {
    onClick(btnValue)
    setBtnActive(btnValue)
  }

  return (
    <div className="flex border-purple-500 border-solid border-2 rounded-[15px]">
      {buttons?.map((btn:ButtonGroupItem) => (
        <button 
          key={btn.value}
          className={`py-1 px-2 rounded-[11px] ${btnActive === btn.value ? "bg-purple-500 text-white" : ""}`}
          onClick={() => handleClick(btn.value)}
        >
          {btn.name}
        </button>
      ))}
    </div>
  )
}

export default ButtonGroup