import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Modal,
  TextField,
  IconButton,
  Stack,
  Divider,
  Alert,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  InputAdornment,
  Tooltip
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  maxWidth: "95%",
  maxHeight: "90vh",
  overflow: "auto",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

function Variants({ open, onClose, onSaveVariants, existingVariants = null }) {
  const [optionName, setOptionName] = useState("");
  const [optionValues, setOptionValues] = useState("");
  const [errors, setErrors] = useState({});
  const [variantPreviews, setVariantPreviews] = useState([]);
  const [showPreview, setShowPreview] = useState(false);

  // Reset form when modal opens or closes
  useEffect(() => {
    if (open) {
      if (existingVariants) {
        setOptionName(existingVariants.name || "");
        setOptionValues(existingVariants.values ? existingVariants.values.join(", ") : "");
        generatePreview(existingVariants.name, existingVariants.values);
      } else {
        resetForm();
      }
    }
  }, [open, existingVariants]);

  const resetForm = () => {
    setOptionName("");
    setOptionValues("");
    setErrors({});
    setVariantPreviews([]);
    setShowPreview(false);
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!optionName.trim()) {
      newErrors.optionName = "Option name is required";
    }
    
    if (!optionValues.trim()) {
      newErrors.optionValues = "At least one value is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const generatePreview = (name, values) => {
    if (!name || !values || values.length === 0) return;
    
    const valueArray = Array.isArray(values) ? values : values.split(",").map(val => val.trim()).filter(Boolean);
    
    const previews = valueArray.map(value => ({
      name: value,
      price: "1,000.00",
      available: Math.floor(Math.random() * 50),
      sku: `${name.substring(0, 3).toUpperCase()}-${value.substring(0, 2).toUpperCase()}-${Math.floor(Math.random() * 1000)}`
    }));
    
    setVariantPreviews(previews);
    setShowPreview(true);
  };

  const handlePreview = () => {
    if (validateForm()) {
      generatePreview(optionName, optionValues);
    }
  };

  const handleSave = () => {
    if (validateForm()) {
      const values = optionValues.split(",").map(val => val.trim()).filter(Boolean);
      
      const variantsData = values.map(value => ({
        name: value,
        price: "1,000.00",
        available: Math.floor(Math.random() * 50),
        sku: `${optionName.substring(0, 3).toUpperCase()}-${value.substring(0, 2).toUpperCase()}-${Math.floor(Math.random() * 1000)}`
      }));
      
      onSaveVariants(optionName, variantsData);
      resetForm();
      onClose();
    }
  };

  const handleRemoveVariant = (index) => {
    const updatedPreviews = [...variantPreviews];
    updatedPreviews.splice(index, 1);
    setVariantPreviews(updatedPreviews);
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={modalStyle}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="h5" fontWeight="500">Product Variants</Typography>
          <IconButton onClick={onClose} aria-label="close">
            <CloseIcon />
          </IconButton>
        </Stack>
        
        <Divider sx={{ my: 2 }} />

        <Box sx={{ mt: 3 }}>
          <Typography variant="subtitle1" fontWeight="500" gutterBottom>
            Define Variant Options
          </Typography>
          
          <TextField
            fullWidth
            label="Option Name"
            placeholder="e.g., Size, Color, Material"
            sx={{ mb: 2 }}
            value={optionName}
            onChange={(e) => setOptionName(e.target.value)}
            error={!!errors.optionName}
            helperText={errors.optionName}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Tooltip title="Name your variant type (e.g., Size, Color)">
                    <InfoOutlinedIcon color="action" fontSize="small" />
                  </Tooltip>
                </InputAdornment>
              ),
            }}
          />
          
          <TextField
            fullWidth
            label="Option Values"
            placeholder="e.g., Small, Medium, Large (comma separated)"
            sx={{ mb: 2 }}
            value={optionValues}
            onChange={(e) => setOptionValues(e.target.value)}
            error={!!errors.optionValues}
            helperText={errors.optionValues || "Enter values separated by commas"}
            multiline
            rows={2}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Tooltip title="Enter each value separated by commas">
                    <InfoOutlinedIcon color="action" fontSize="small" />
                  </Tooltip>
                </InputAdornment>
              ),
            }}
          />
          
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
            <Button 
              variant="outlined" 
              onClick={handlePreview}
              sx={{ mr: 1 }}
            >
              Preview Variants
            </Button>
          </Box>
        </Box>

        {showPreview && variantPreviews.length > 0 && (
          <Box sx={{ mt: 4 }}>
            <Typography variant="subtitle1" fontWeight="500" gutterBottom>
              Variant Preview
            </Typography>
            
            <Alert severity="info" sx={{ mb: 2 }}>
              These variants will be created when you save. You can adjust details after creation.
            </Alert>
            
            <TableContainer component={Paper} sx={{ mt: 2 }}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell><strong>{optionName}</strong></TableCell>
                    <TableCell align="right"><strong>Price</strong></TableCell>
                    <TableCell align="right"><strong>Stock</strong></TableCell>
                    <TableCell align="right"><strong>SKU</strong></TableCell>
                    <TableCell align="center"><strong>Actions</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {variantPreviews.map((variant, index) => (
                    <TableRow key={index}>
                      <TableCell>{variant.name}</TableCell>
                      <TableCell align="right">${variant.price}</TableCell>
                      <TableCell align="right">{variant.available}</TableCell>
                      <TableCell align="right">{variant.sku}</TableCell>
                      <TableCell align="center">
                        <IconButton 
                          size="small" 
                          color="error"
                          onClick={() => handleRemoveVariant(index)}
                        >
                          <DeleteOutlineIcon fontSize="small" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        )}

        <Box sx={{ mt: 4, display: "flex", justifyContent: "flex-end" }}>
          <Button 
            variant="outlined" 
            color="inherit" 
            onClick={onClose}
            sx={{ mr: 2 }}
          >
            Cancel
          </Button>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={handleSave}
            disabled={variantPreviews.length === 0}
          >
            Save Variants
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default Variants;