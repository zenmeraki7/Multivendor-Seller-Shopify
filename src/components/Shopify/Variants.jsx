import React from "react";
import {
  Box,
  Typography,
  Button,
  Modal,
  TextField,
  IconButton,
  Stack,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

function Variants({ open, onClose }) {
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">Manage Variants</Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Stack>

        <Box sx={{ mt: 3 }}>
          <Typography variant="subtitle1" gutterBottom>
            Add Variant Options (e.g., Size, Color)
          </Typography>
          <TextField
            fullWidth
            label="Option Name"
            placeholder="e.g., Size, Color"
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Values"
            placeholder="e.g., Small, Medium, Large"
            sx={{ mb: 2 }}
          />
        </Box>

        <Box sx={{ mt: 3 }}>
          <Typography variant="subtitle1" gutterBottom>
            Variant Details
          </Typography>
          <TextField
            fullWidth
            label="Price"
            type="number"
            placeholder="0.00"
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="SKU"
            placeholder="Enter SKU"
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Inventory"
            type="number"
            placeholder="0"
            sx={{ mb: 2 }}
          />
        </Box>

        <Box sx={{ mt: 3, textAlign: "right" }}>
          <Button variant="contained" color="primary">
            Save Variants
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default Variants;