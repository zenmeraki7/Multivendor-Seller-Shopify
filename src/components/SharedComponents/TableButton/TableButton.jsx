import React from "react";
import { Button } from "@mui/material";

function TableButton({ onClick, children, isActive = false, isSmall = false, variant = "contained", color = "primary", icon: Icon, style = {}, ...props }) {
  return (
    <Button
      onClick={onClick}
      variant={variant}
      color={color}
      sx={{
        backgroundColor: isActive ? "#2563EB" : variant === "contained" ? "#2563EB" : "transparent",
        color: isActive || variant === "contained" ? "#ffffff" : "#2563EB",
        fontWeight: isActive ? 600 : 500,
        borderRadius: "10px",
        padding: isSmall ? "6px 12px" : "12px 16px",
        fontSize: isSmall ? "12px" : "14px",
        minWidth: isSmall ? "80px" : "auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "8px", // Space between icon and text
        transition: "all 0.2s ease",
        "&:hover": {
          backgroundColor: isActive ? "#1E40AF" : variant === "contained" ? "#1E40AF" : "#E3E8EF",
        },
        ...style, 
      }}
      {...props}
    >
      {Icon && <Icon style={{ fontSize: isSmall ? "14px" : "18px" }} />} {/* Render icon if provided */}
      {children}
    </Button>
  );
}

export default TableButton;

