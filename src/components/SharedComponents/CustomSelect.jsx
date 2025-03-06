import React from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
function CustomSelect({
  id,
  value,
  onChange,
  label,
  name,
  required = true,
  MenuItems = [],
  error,
  small,
  readOnly = false,
}) {
  return (
    <Stack sx={{ marginY: "5px", flex: 1 }}>
      <FormControl
        fullWidth
        size={small && "small"}
        variant="outlined"
        required={required}
        sx={{
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
          readOnly={readOnly}
          name={name}
          id={id}
          value={value}
          onChange={onChange}
          label={label}
          fullWidth
        >
          {MenuItems.map((item, index) => (
           <MenuItem key={index} value={item.value}>  
           {item.label}  
         </MenuItem>
         
          ))}
        </Select>
      </FormControl>
      <Typography color="error" variant="body2">
        {error}
      </Typography>
    </Stack>
  );
}

export default CustomSelect;
