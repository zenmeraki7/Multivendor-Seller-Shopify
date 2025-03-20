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
  type = "text",
  readOnly,
}) {
  return (
    <Stack width={"100%"} mt={1}>
      <Typography gutterBottom>{label}</Typography>
      <TextField
        id={id}
        size="small"
        name={name}
        placeholder={placeholder}
        readOnly={readOnly}
        fullWidth
        variant="outlined"
        value={value}
        onChange={onChange}
        type={type}
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: "8px",
            "& fieldset": {
              borderColor: "#1976d2",
              borderRadius: "8px",
            },
            "&:hover fieldset": {
              borderColor: "#1976d2",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#1976d2",
            },
          },
        }}
      />
    </Stack>
  );
}

export default CustomInput;
