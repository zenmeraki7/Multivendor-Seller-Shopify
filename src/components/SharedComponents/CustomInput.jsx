import React from "react";
import TextField from "@mui/material/TextField";
import { Stack, Typography } from "@mui/material";
function CustomInput({
  id,
  name,
  label,
  placeholder,
  value,
  onChange,
  type,
  required = true,
  error,
}) {
  return (
    <Stack sx={{ marginBottom: "15px", flex: 1 }}>
      <TextField
        id={id}
        name={name}
        label={label}
        placeholder={placeholder}
        fullWidth
        variant="outlined"
        value={value}
        onChange={(e) => onChange(e)}
        type={type}
        required={required}
        sx={{
          marginTop: "5px",
          marginBottom: "10px",
          "& .MuiOutlinedInput-root": {
            borderRadius: "12px",
            transition: "border 0.3s ease, background 0.3s ease",
          },
          "& .MuiOutlinedInput-root.Mui-focused": {
            backgroundColor: "#e3f2fd",
            borderColor: "#1e88e5",
          },
          "& .MuiInputLabel-root.Mui-focused": {
            color: "#1e88e5",
          },
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#bbdefb",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#1e88e5",
          },
          "& .MuiSelect-icon": {
            color: "#1e88e5", // Change the dropdown icon color
          },
        }}
      />
      <Typography color="error" variant="body2">
        {error}
      </Typography>
    </Stack>
  );
}

export default CustomInput;
