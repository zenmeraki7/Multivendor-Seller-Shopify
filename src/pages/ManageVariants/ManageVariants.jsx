import React, { useState } from "react";
import {
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Modal,
  Box,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useLocation, useParams } from "react-router-dom";

const dummyVariants = [
  {
    id: 1,
    attribute: "Color",
    value: "Red",
    additionalPrice: 10,
    stock: 50,
    image: "https://via.placeholder.com/50",
  },
  {
    id: 2,
    attribute: "Storage",
    value: "128GB",
    additionalPrice: 20,
    stock: 30,
    image: "https://via.placeholder.com/50",
  },
];
const ManageVariants = () => {
  const { state } = useLocation();
  const { id, title } = useParams();

  const [variants, setVariants] = useState(state);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [variantToDelete, setVariantToDelete] = useState(null);
  // Initialize state to manage input fields
  const [selectedVariant, setSelectedVariant] = useState({
    attribute: "",
    value: "",
    additionalPrice: 0,
    stock: 0,
    image: "", // This will store the base64 image or file URL
  });
  console.log(selectedVariant)

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedVariant({
      ...selectedVariant,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedVariant({
          ...selectedVariant,
          image: reader.result, // Base64 encoded image
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };

  // Handle Edit Modal
  const handleEdit = (variant) => {
    setSelectedVariant(variant);
    setOpenEditModal(true);
  };

  const handleSaveEdit = () => {
    setVariants((prevVariants) =>
      prevVariants.map((variant) =>
        variant.id === selectedVariant.id ? selectedVariant : variant
      )
    );
    setOpenEditModal(false);
  };
  console.log(id, title, state);
  // Handle Delete Dialog
  const handleDelete = (variant) => {
    setVariantToDelete(variant);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    setVariants((prevVariants) =>
      prevVariants.filter((variant) => variant.id !== variantToDelete.id)
    );
    setDeleteDialogOpen(false);
  };

  return (
    <div style={{ padding: "20px" }}>
      {/* Header Section */}
      <Box mb={3}>
        <Typography variant="h4" gutterBottom>
          {title}
        </Typography>
        <Typography variant="body1">
          Manage the variants for this {title}. You can add, edit, or view
          details of each variant.
        </Typography>
      </Box>

      {/* Add Variant Button */}
      <Stack direction={"row"} justifyContent={"flex-end"} mb={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setOpenEditModal(true)}
        >
          Add Variant
        </Button>
      </Stack>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Attribute</TableCell>
              <TableCell>Value</TableCell>
              <TableCell>Additional Price</TableCell>
              <TableCell>Stock</TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {variants.length > 0 ? (
              variants.map((variant) => (
                <TableRow key={variant._id}>
                  <TableCell>{variant.attribute}</TableCell>
                  <TableCell>{variant.value}</TableCell>
                  <TableCell>${variant.additionalPrice}</TableCell>
                  <TableCell>{variant.stock}</TableCell>
                  <TableCell>
                    <img
                      src={variant.image.url}
                      alt={variant.attribute}
                      style={{ width: "50px", height: "50px" }}
                    />
                  </TableCell>
                  <TableCell>
                    <IconButton
                      color="primary"
                      onClick={() => handleEdit(variant)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => handleDelete(variant)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} style={{ textAlign: "center" }}>
                  No variants available.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Edit Modal */}
      <Modal open={openEditModal} onClose={() => setOpenEditModal(false)}>
        <Box sx={modalStyle}>
          <Typography variant="h6" gutterBottom>
            Edit Variant
          </Typography>

          {/* Attribute Input */}
          <TextField
            label="Attribute"
            fullWidth
            margin="normal"
            name="attribute"
            value={selectedVariant.attribute}
            onChange={handleInputChange}
          />

          {/* Value Input */}
          <TextField
            label="Value"
            fullWidth
            margin="normal"
            name="value"
            value={selectedVariant.value}
            onChange={handleInputChange}
          />

          {/* Additional Price Input */}
          <TextField
            label="Additional Price"
            fullWidth
            margin="normal"
            name="additionalPrice"
            type="number"
            value={selectedVariant.additionalPrice}
            onChange={handleInputChange}
          />

          {/* Stock Input */}
          <TextField
            label="Stock"
            fullWidth
            margin="normal"
            name="stock"
            type="number"
            value={selectedVariant.stock}
            onChange={handleInputChange}
          />

          {/* File Input with Icon Button */}
          <Typography variant="subtitle1" gutterBottom>
            Upload Image
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <IconButton
              color="primary"
              component="label"
              sx={{
                border: "1px solid #ccc",
                borderRadius: "8px",
                padding: 1,
              }}
            >
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={handleImageChange}
              />
              <EditIcon /> {/* Icon representing the action */}
            </IconButton>
            {selectedVariant.image && (
              <img
                src={selectedVariant.image}
                alt="Preview"
                style={{
                  maxWidth: "100px",
                  height: "100px",
                  objectFit: "contain",
                  border: "1px solid #ccc",
                  borderRadius: "8px",
                }}
              />
            )}
          </Box>

          {/* Save Changes Button */}
          <Stack direction={"row"} spacing={2}>
            <Button
              variant="contained"
              color="error"
              onClick={() => {
                setSelectedVariant({
                  attribute: "",
                  value: "",
                  additionalPrice: 0,
                  stock: 0,
                  image: "", // This will store the base64 image or file URL
                });
                setOpenEditModal(false);
              }}
              sx={{ mt: 2 }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleSaveEdit(selectedVariant)}
              sx={{ mt: 2 }}
            >
              Save Changes
            </Button>
          </Stack>
        </Box>
      </Modal>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this variant?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={confirmDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ManageVariants;
