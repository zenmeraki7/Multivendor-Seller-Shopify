import { Button } from "@mui/material";
import React from "react";

const CustomButton = ({ onClick, icon, label }) => {
  return (
    <Button
      onClick={onClick}
      variant="contained"
      sx={{
        background: "linear-gradient(45deg, #556cd6, #19857b)",
        color: "#fff",
        borderRadius: "8px",
        textTransform: "none",
        padding: "8px 16px",
        marginTop: "1rem",
        alignSelf: "flex-start",
      }}
    >
      {icon}
      {label}
    </Button>
  );
};

export default CustomButton;
