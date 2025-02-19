import { Button, CircularProgress } from "@mui/material";
import React from "react";

const CustomButton = ({ variant, label, onClick, disabled, loading }) => {
  return (
    <Button
      variant={variant || "contained"}
      sx={{
        background: "linear-gradient(45deg, #6a11cb, #2575fc)",        color: "white",
        borderRadius: "50px",
        fontWeight: "bold",
        "&:hover": {
          background: "linear-gradient(45deg, #2575fc 30%, #6a11cb 100%)",
        },
      }}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
      {loading && <CircularProgress sx={{ml:1}} size={"30px"} color="inherit" />}
    </Button>
  );
};

export default CustomButton;
