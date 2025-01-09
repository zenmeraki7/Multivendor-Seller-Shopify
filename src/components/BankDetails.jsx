import React, { useState, useEffect } from "react";
import { Box, Typography, Stack, TextField, Modal } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import CustomInput from "./SharedComponents/CustomInput";
import CustomButton from "./SharedComponents/CustomButton";

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
    <Box
      sx={{
        borderRadius: "0.5rem",
        boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
        backgroundColor: "#f9f9f9",
        border: "1px solid #e0e0e0",
        padding: "20px",
      }}
    >
      <Typography
        variant="h6"
        sx={{
          marginBottom: "1.5rem",
          textAlign: "center",
          fontWeight: "bold",
        }}
      >
        Bank Details
      </Typography>

      <Stack spacing={3}>
        {/* Account Holder Details */}
        <Box
          sx={{
            border: "1px solid #e0e0e0",
            borderRadius: "0.5rem",
            padding: "1rem",
            backgroundColor: "#fafafa",
          }}
        >
          <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 2 }}>
            Account Holder Details
          </Typography>
          <Stack direction={"row"} spacing={2}>
            <Stack spacing={1.5} flex={1}>
              <CustomInput
                label="Account Holder Name"
                value={editedBankDetails.accountHolderName}
                onChange={(e) => handleInputChange(e, "accountHolderName")}
              />
              <CustomInput
                label="Account Number"
                value={editedBankDetails.accountNumber}
                onChange={(e) => handleInputChange(e, "accountNumber")}
              />
            </Stack>
            <Stack spacing={1.5} flex={1}>
              <CustomInput
                label="IFSC Code"
                value={editedBankDetails.ifscCode}
                onChange={(e) => handleInputChange(e, "ifscCode")}
              />
              <CustomInput
                label="Bank Name"
                value={editedBankDetails.bankName.name}
                onChange={(e) => handleInputChange(e, "bankName")}
              />
            </Stack>
          </Stack>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            marginTop: "1rem",
            gap: "1rem",
          }}
        >
          <img
            src={
              editedBankDetails.documentUrl ||
              "https://cdn.pixabay.com/photo/2016/03/31/14/48/sheet-1292828_960_720.png"
            }
            alt="Bank Document"
            style={{
              width: "250px",
              height: "200px",
              objectFit: "contain",
              borderRadius: "8px",
              border: "1px solid #ccc",
            }}
          />
          <label htmlFor="upload-button">
            <input
              id="upload-button"
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
            <CustomButton
              label="Upload Document"
              icon={<DriveFolderUploadIcon />}
            />
          </label>
        </Box>
      </Stack>

      {/* Edit & Save Actions */}
      <Stack
        direction="row"
        justifyContent="flex-end"
        alignItems="center"
        marginTop="2rem"
      >
        <CustomButton
          onClick={() => setIsModalOpen(true)}
          label="Edit Details"
          icon={<ModeEditIcon sx={{ marginRight: "8px" }} />}
        />
      </Stack>

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
          <Stack spacing={2} marginTop={2}>
            <CustomInput
              label="Account Holder Name"
              value={editedBankDetails.accountHolderName}
              onChange={(e) => handleInputChange(e, "accountHolderName")}
            />
            <CustomInput
              label="Account Number"
              value={editedBankDetails.accountNumber}
              onChange={(e) => handleInputChange(e, "accountNumber")}
            />
            <CustomInput
              label="IFSC Code"
              value={editedBankDetails.ifscCode}
              onChange={(e) => handleInputChange(e, "ifscCode")}
            />
            <CustomInput
              label="Bank Name"
              value={editedBankDetails.bankName}
              onChange={(e) => handleInputChange(e, "bankName")}
            />
          </Stack>
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
            <CustomButton
              onClick={() => setIsModalOpen(false)}
              label="Cancel"
              variant="outlined"
              sx={{ marginRight: "10px" }}
            />
            <CustomButton
              onClick={handleSaveClick}
              label="Save"
              variant="contained"
              icon={<SaveIcon />}
            />
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}

export default BankDetails;
