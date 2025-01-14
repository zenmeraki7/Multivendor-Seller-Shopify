import React, { useState } from "react";
import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Modal,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import {
  ArrowBack as ArrowBackIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const ManageOffers = () => {
  const navigate = useNavigate();
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState({
    title: "",
    description: "",
    discountPercentage: 0,
    validUntil: "",
  });
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [isActionAdd, setIsActionAdd] = useState(false);

  // Dummy Data
  const [offers, setOffers] = useState([
    {
      _id: "1",
      title: "10% off on HDFC cards",
      description: "Get a 10% discount when you pay using HDFC Bank cards.",
      discountPercentage: 10,
      validUntil: new Date(new Date().setDate(new Date().getDate() + 7)), // 7 days from now
    },
    {
      _id: "2",
      title: "15% off for new customers",
      description: "Welcome offer for all new users!",
      discountPercentage: 15,
      validUntil: new Date(new Date().setDate(new Date().getDate() - 3)), // 3 days ago
    },
    {
      _id: "3",
      title: "Buy 1 Get 1 Free",
      description: "BOGO offer on selected products.",
      discountPercentage: 50,
      validUntil: new Date(new Date().setDate(new Date().getDate() + 10)), // 10 days from now
    },
  ]);

  const handleEdit = (offer) => {
    setSelectedOffer(offer);
    setIsActionAdd(false);
    setOpenEditModal(true);
  };

  const handleDelete = (offer) => {
    setSelectedOffer(offer);
    setDeleteDialogOpen(true);
  };

  const handleSubmit = (action) => {
    // Add logic for submitting offer changes
    console.log(action === "edit" ? "Edit Offer" : "Add Offer", selectedOffer);
    setOpenEditModal(false);
    setSelectedOffer({
      title: "",
      description: "",
      discountPercentage: 0,
      validUntil: "",
    });
    setValidationErrors({});
  };

  const confirmDelete = () => {
    // Add logic for deleting the offer
    console.log("Delete Offer", selectedOffer);
    setDeleteDialogOpen(false);
  };

  const getChipLabel = (validUntil) => {
    const currentDate = new Date();
    return validUntil < currentDate ? "Expired" : "Active";
  };

  const getChipColor = (validUntil) => {
    const currentDate = new Date();
    return validUntil < currentDate ? "error" : "success";
  };

  return (
    <div style={{ padding: "20px" }}>
      <IconButton onClick={() => navigate("/products")} aria-label="back">
        <ArrowBackIcon />
      </IconButton>

      {/* Header Section */}
      <Box mb={3}>
        <Typography variant="h4" gutterBottom>
          Manage Offers
        </Typography>
        <Typography variant="body1">
          Add, edit, or remove promotional offers for your products.
        </Typography>
      </Box>

      {/* Add Offer Button */}
      <Stack direction={"row"} justifyContent={"flex-end"} mb={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            setOpenEditModal(true);
            setIsActionAdd(true);
          }}
        >
          Add Offer
        </Button>
      </Stack>

      {/* Offers Table */}
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Discount (%)</TableCell>
              <TableCell>Valid Until</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {offers?.length > 0 ? (
              offers.map((offer) => (
                <TableRow key={offer._id}>
                  <TableCell>{offer.title}</TableCell>
                  <TableCell>{offer.description}</TableCell>
                  <TableCell>{offer.discountPercentage}</TableCell>
                  <TableCell>
                    {new Date(offer.validUntil).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={getChipLabel(offer.validUntil)}
                      color={getChipColor(offer.validUntil)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <IconButton
                      color="primary"
                      onClick={() => handleEdit(offer)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => handleDelete(offer)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} style={{ textAlign: "center" }}>
                  No offers available.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Edit/Add Modal */}
      <Modal
        open={openEditModal}
        onClose={() => {
          setOpenEditModal(false);
          setSelectedOffer({
            title: "",
            description: "",
            discountPercentage: 0,
            validUntil: "",
          });
          setValidationErrors({});
        }}
      >
        <Box
          sx={{
            maxWidth: 500,
            margin: "auto",
            mt: 5,
            p: 3,
            bgcolor: "white",
            borderRadius: 1,
          }}
        >
          <Typography variant="h6" gutterBottom>
            {isActionAdd ? "Add Offer" : "Edit Offer"}
          </Typography>

          <TextField
            label="Title"
            fullWidth
            margin="normal"
            value={selectedOffer.title}
            onChange={(e) =>
              setSelectedOffer({ ...selectedOffer, title: e.target.value })
            }
            error={!!validationErrors.title}
            helperText={validationErrors.title}
          />
          <TextField
            label="Description"
            fullWidth
            margin="normal"
            value={selectedOffer.description}
            onChange={(e) =>
              setSelectedOffer({
                ...selectedOffer,
                description: e.target.value,
              })
            }
          />
          <TextField
            label="Discount Percentage"
            type="number"
            fullWidth
            margin="normal"
            value={selectedOffer.discountPercentage}
            onChange={(e) =>
              setSelectedOffer({
                ...selectedOffer,
                discountPercentage: Number(e.target.value),
              })
            }
            error={!!validationErrors.discountPercentage}
            helperText={validationErrors.discountPercentage}
          />
          <TextField
            label="Valid Until"
            type="date"
            fullWidth
            margin="normal"
            value={selectedOffer.validUntil}
            onChange={(e) =>
              setSelectedOffer({ ...selectedOffer, validUntil: e.target.value })
            }
            error={!!validationErrors.validUntil}
            helperText={validationErrors.validUntil}
          />

          {/* Action Buttons */}
          <Stack direction={"row"} spacing={2} mt={2}>
            <Button
              variant="contained"
              color="error"
              onClick={() => {
                setOpenEditModal(false);
                setSelectedOffer({
                  title: "",
                  description: "",
                  discountPercentage: 0,
                  validUntil: "",
                });
                setValidationErrors({});
              }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleSubmit(isActionAdd ? "add" : "edit")}
            >
              {isActionAdd ? "Add Offer" : "Save Changes"}
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
            Are you sure you want to delete this offer?
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

export default ManageOffers;
