import React, { useState } from "react"
import { ColorStyle } from "../../styles/colors"

interface IButtonProps {
  type?: "primary" | "default" | "dashed" | "text" | "link" | "gradientPrimary" | "error" | "viewDetail" | "success" | "orangeStyle",
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
    gradientPrimary: {
      bg: ColorStyle.GradientPrimary,
      hover: "linear-gradient(135deg, hsl(221 83% 40%), hsl(189 94% 50%))",
      active: "linear-gradient(135deg, hsl(221 83% 30%), hsl(189 94% 38%))",
      color: "#fff",
      border: "none",
    },
    error: {
      bg: "#ff4d4f",
      hover: "#ff7875",
      active: "#d9363e",
      color: "#fff",
      border: "none",
    },
    viewDetail: {
      bg: "#f5f8ff",
      hover: "#dce7ff",
      active: "#b7ccff",
      color: "#3b6ff5",
      border: "1px solid #d0ddff",
    },
    success: {
      bg: "#52c41a",
      hover: "#73d13d",
      active: "#389e0d",
      color: "#fff",
      border: "none",
    },
    orangeStyle: {
      bg: "hsl(25 95% 53%)",
      hover: "hsl(25 95% 48%)",
      active: "hsl(25 95% 43%)",
      color: "#fff",
      border: "1px solid hsl(25 95% 53%)",
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
