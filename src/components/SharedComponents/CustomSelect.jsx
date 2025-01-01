import React from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
function CustomSelect({
  id,
  value,
  onChange,
  label,
  name,
  required = true,
  MenuItems = [],
}) {
  return (
    <FormControl
      fullWidth
      variant="outlined"
      style={{ marginTop: "5px" }}
      required={required}
      sx={{
        marginTop: "5px",
        marginBottom: "15px",
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
    >
      <InputLabel>{label}</InputLabel>
      <Select
        name={name}
        id={id}
        value={value}
        onChange={onChange}
        label={label}
        fullWidth
      >
        {MenuItems.map((item, index) => (
          <MenuItem key={index} value={item}>
            {item}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default CustomSelect;
