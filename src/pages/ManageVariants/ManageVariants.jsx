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
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

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
  const [variants, setVariants] = useState(dummyVariants);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [variantToDelete, setVariantToDelete] = useState(null);

  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
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
          Product Title
        </Typography>
        <Typography variant="body1">
          Manage the variants for this product below. You can add, edit, or view
          details of each variant.
        </Typography>
      </Box>

      {/* Add Variant Button */}
      <Box mb={2}>
        <Button variant="contained" color="primary">
          Add Variant
        </Button>
      </Box>

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
                <TableRow key={variant.id}>
                  <TableCell>{variant.attribute}</TableCell>
                  <TableCell>{variant.value}</TableCell>
                  <TableCell>${variant.additionalPrice}</TableCell>
                  <TableCell>{variant.stock}</TableCell>
                  <TableCell>
                    <img
                      src={variant.image}
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
          <TextField
            label="Attribute"
            fullWidth
            margin="normal"
            value={selectedVariant?.attribute || ""}
            onChange={(e) =>
              setSelectedVariant({
                ...selectedVariant,
                attribute: e.target.value,
              })
            }
          />
          <TextField
            label="Value"
            fullWidth
            margin="normal"
            value={selectedVariant?.value || ""}
            onChange={(e) =>
              setSelectedVariant({ ...selectedVariant, value: e.target.value })
            }
          />
          <TextField
            label="Additional Price"
            fullWidth
            margin="normal"
            value={selectedVariant?.additionalPrice || ""}
            onChange={(e) =>
              setSelectedVariant({
                ...selectedVariant,
                additionalPrice: Number(e.target.value),
              })
            }
          />
          <TextField
            label="Stock"
            fullWidth
            margin="normal"
            value={selectedVariant?.stock || ""}
            onChange={(e) =>
              setSelectedVariant({
                ...selectedVariant,
                stock: Number(e.target.value),
              })
            }
          />
          <TextField
            label="Image URL"
            fullWidth
            margin="normal"
            value={selectedVariant?.image || ""}
            onChange={(e) =>
              setSelectedVariant({ ...selectedVariant, image: e.target.value })
            }
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSaveEdit}
            sx={{ mt: 2 }}
          >
            Save Changes
          </Button>
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
