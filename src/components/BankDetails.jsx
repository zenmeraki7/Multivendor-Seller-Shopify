import React, { useState, useEffect } from "react";
import { Box, Typography, Stack, TextField, Modal } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import CustomInput from "./SharedComponents/CustomInput";
import DeleteIcon from "@mui/icons-material/Delete";
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
            <>
              <Stack direction={"row"} spacing={1}>
                <DriveFolderUploadIcon
                  sx={{
                    fontSize: "36px",
                    color: "#fff",
                    cursor: "pointer",
                    background: "linear-gradient(45deg, #556cd6, #19857b)",
                    padding: "8px",
                    borderRadius: "50%",
                  }}
                />
                <SaveIcon
                  sx={{
                    fontSize: "36px",
                    color: "#fff",
                    cursor: "pointer",
                    background: "linear-gradient(45deg, #556cd6, #19857b)",
                    padding: "8px",
                    borderRadius: "50%",
                  }}
                />
                <DeleteIcon
                  sx={{
                    fontSize: "36px",
                    color: "#fff",
                    cursor: "pointer",
                    background: "linear-gradient(45deg, #d32f2f, #ff5252)",
                    padding: "8px",
                    borderRadius: "50%",
                  }}
                />
              </Stack>
            </>
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
    </Box>
  );
}

export default BankDetails;
