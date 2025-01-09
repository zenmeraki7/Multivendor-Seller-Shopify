import { Button } from "@mui/material";
import React from "react";

const CustomButton = ({ onClick, icon, label, variant = "contained" }) => {
  return (
    <Button
      onClick={onClick}
      variant={variant}
      sx={{
        background:
          variant == "contained" && "linear-gradient(45deg, #556cd6, #19857b)",
        color: variant == "contained" && "#fff",
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
