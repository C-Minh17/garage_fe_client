import React, { useState } from "react"

interface IButtonProps {
  type?: "primary" | "default" | "dashed" | "text" | "link" | "error",
  children: React.ReactNode,
  onClick?: () => void,
  disabled?: boolean,
  style?: React.CSSProperties,
  htmlType?: "button" | "submit" | "reset"
}

const Button = ({
  type = "default",
  children,
  onClick,
  disabled = false,
  style,
  htmlType = "button",
}: IButtonProps) => {
  const [isHovered, setIsHovered] = useState(false)
  const [isPressed, setIsPressed] = useState(false)

  const colors = {
    primary: {
      bg: "#1677ff",
      hover: "#4096ff",
      active: "#0958d9",
      color: "#fff",
      border: "none",
    },
    default: {
      bg: "#fff",
      hover: "#f0f0f0",
      active: "#d9d9d9",
      color: "#000",
      border: "1px solid #d9d9d9",
    },
    dashed: {
      bg: "#fff",
      hover: "#f0f0f0",
      active: "#d9d9d9",
      color: "#000",
      border: "1px dashed #d9d9d9",
    },
    text: {
      bg: "transparent",
      hover: "rgba(0,0,0,0.03)",
      active: "rgba(0,0,0,0.1)",
      color: "#000",
      border: "none",
    },
    link: {
      bg: "transparent",
      hover: "transparent",
      active: "transparent",
      color: "#1677ff",
      border: "none",
    },
    error: {
      bg: "#ff4d4f",
      hover: "#ff7875",
      active: "#d9363e",
      color: "#fff",
      border: "none",
    },
  }[type]

  const getBackground = () => {
    if (disabled) return "#f5f5f5"
    if (isPressed) return colors.active
    if (isHovered) return colors.hover
    return colors.bg
  }

  return (
    <button
      onClick={!disabled ? onClick : undefined}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false)
        setIsPressed(false)
      }}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      style={{
        background: getBackground(),
        color: disabled ? "rgba(0,0,0,0.25)" : colors.color,
        border: colors.border,
        borderRadius: 6,
        padding: "6px 15px",
        fontSize: 14,
        fontWeight: 500,
        cursor: disabled ? "not-allowed" : "pointer",
        transition: "all 0.2s cubic-bezier(0.4, 0, 0.23, 1)",
        userSelect: "none",
        boxShadow:
          isPressed && !disabled
            ? "inset 0 2px 4px rgba(0,0,0,0.15)"
            : "0 2px 0 rgba(0,0,0,0.02)",
        ...style,
      }}
      type={htmlType}
    >
      {children}
    </button>
  )
}

export default Button
