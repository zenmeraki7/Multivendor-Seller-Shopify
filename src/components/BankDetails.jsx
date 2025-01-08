import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Grid,
  Modal,
  TextField,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";

function BankDetails({ bankDetails }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedBankDetails, setEditedBankDetails] = useState(bankDetails);

  useEffect(() => {
    setEditedBankDetails(bankDetails); // Update state when bankDetails prop changes
  }, [bankDetails]);

  const handleInputChange = (e, field) => {
    setEditedBankDetails({ ...editedBankDetails, [field]: e.target.value });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setEditedBankDetails((prev) => ({
          ...prev,
          documentUrl: reader.result, // Save base64 image
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveClick = () => {
    console.log("Updated bank details:", editedBankDetails);
    setIsModalOpen(false); // Close the modal
  };

  return (
    <Box className="bank-details-container" sx={{ flex: 1 }}>
      <Typography variant="h6">Bank Details</Typography>
      <Box className="info-content">
        <Typography>
          <strong>Account Holder Name:</strong> {editedBankDetails.accountHolderName}
        </Typography>
        <Typography>
          <strong>Account Number:</strong> {editedBankDetails.accountNumber}
        </Typography>
        <Typography>
          <strong>IFSC Code:</strong> {editedBankDetails.ifscCode}
        </Typography>
        <Typography>
          <strong>Bank Name:</strong> {editedBankDetails.bankName}
        </Typography>
        <Box display="flex" alignItems="center" marginTop={2}>
          <img
            src={
              editedBankDetails.documentUrl ||
              "https://cdn.pixabay.com/photo/2016/03/31/14/48/sheet-1292828_960_720.png"
            }
            alt="Bank Document"
            height="100px"
            width="90px"
          />
        </Box>
        <Button
          onClick={() => setIsModalOpen(true)}
          variant="contained"
          sx={{
            marginTop: "10px",
            background:
              "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(85,85,197,1) 56%, rgba(0,212,255,1) 100%)",
            color: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "10px",
          }}
        >
          <ModeEditIcon />
        </Button>
      </Box>

      {/* Modal for editing bank details */}
      <Modal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        aria-labelledby="edit-bank-modal-title"
        aria-describedby="edit-bank-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 500,
            bgcolor: "background.paper",
            boxShadow: 24,
            borderRadius: "10px",
            p: 4,
          }}
        >
          <Typography id="edit-bank-modal-title" variant="h6" component="h2">
            Edit Bank Details
          </Typography>
          <Grid container spacing={2} marginTop={2}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Account Holder Name"
                value={editedBankDetails.accountHolderName}
                onChange={(e) => handleInputChange(e, "accountHolderName")}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Account Number"
                value={editedBankDetails.accountNumber}
                onChange={(e) => handleInputChange(e, "accountNumber")}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="IFSC Code"
                value={editedBankDetails.ifscCode}
                onChange={(e) => handleInputChange(e, "ifscCode")}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Bank Name"
                value={editedBankDetails.bankName}
                onChange={(e) => handleInputChange(e, "bankName")}
                variant="outlined"
              />
            </Grid>
          </Grid>
          <Box marginTop={3} textAlign="center">
            <Typography variant="subtitle1">Upload Bank Document:</Typography>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              marginTop={1}
            >
              <img
                src={
                  editedBankDetails.documentUrl ||
                  "https://cdn.pixabay.com/photo/2016/03/31/14/48/sheet-1292828_960_720.png"
                }
                alt="Bank Document"
                height="100px"
                width="90px"
              />
              <label htmlFor="upload-button" style={{ cursor: "pointer" }}>
                <DriveFolderUploadIcon
                  sx={{
                    background:
            "linear-gradient(90deg, rgb(113, 109, 200) 0%, rgb(151, 151, 205) 56%, rgb(84, 171, 189) 100%)",
                    fontSize: "40px",
                    color: "black",
                    marginTop: "10px",
                  }}
                />
                <input
                  type="file"
                  id="upload-button"
                  hidden
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </label>
            </Box>
          </Box>
          <Box display="flex" justifyContent="flex-end" marginTop={3}>
            <Button
              onClick={() => setIsModalOpen(false)}
              variant="outlined"
              sx={{ marginRight: "10px" }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSaveClick}
              variant="contained"
              sx={{
                background:
                  "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(85,85,197,1) 56%, rgba(0,212,255,1) 100%)",
                color: "white",
                borderRadius: "10px",
              }}
            >
              <SaveIcon />
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}

export default BankDetails;
