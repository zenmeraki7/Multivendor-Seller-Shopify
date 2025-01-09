import React, { useState } from "react";
import { Box, Typography, Modal, Stack, TextField } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import CustomInput from "./SharedComponents/CustomInput";
import CustomButton from "./SharedComponents/CustomButton";
import DeleteIcon from "@mui/icons-material/Delete";

function Document({ document }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [documentDetails, setDocumentDetails] = useState({
    panNumber: document?.pan?.documentNumber || "",
    gstinNumber: document?.gstin?.documentNumber || "",
    panImageUrl: document?.pan?.documentUrl || "",
    gstinImageUrl: document?.gstin?.documentUrl || "",
  });

  const handleInputChange = (event, key) => {
    const value = event.target.value;
    setDocumentDetails((prev) => ({ ...prev, [key]: value }));
  };

  const handleFileUpload = (event, key) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setDocumentDetails((prev) => ({ ...prev, [key]: reader.result })); // Base64 encoding
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveDetails = () => {
    console.log("Updated Document Details:", documentDetails);
    setIsModalOpen(false);
    // Add backend integration here
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
        Documents
      </Typography>
      <Stack spacing={3} direction={"row"}>
        {/* PAN Details */}
        <Box
          flex={1}
          sx={{
            border: "1px solid #e0e0e0",
            borderRadius: "0.5rem",
            padding: "1rem",
            backgroundColor: "#fafafa",
          }}
        >
          <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
            PAN Details
          </Typography>
          <CustomInput
            label="PAN Number"
            value={documentDetails.panNumber}
            onChange={(e) => handleInputChange(e, "panNumber")}
          />
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
                documentDetails.panImageUrl ||
                "https://cdn.pixabay.com/photo/2016/03/31/14/48/sheet-1292828_960_720.png"
              }
              alt="PAN"
              style={{
                width: "150px",
                height: "100px",
                objectFit: "contain",
                borderRadius: "8px",
                border: "1px solid #ccc",
              }}
            />
            <label htmlFor="pan-upload">
              <input
                id="pan-upload"
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={(e) => handleFileUpload(e, "panImageUrl")}
              />
              <CustomButton
                label="Upload PAN"
                icon={<DriveFolderUploadIcon />}
              />
            </label>
          </Box>
        </Box>

        {/* GSTIN Details */}
        <Box
          flex={1}
          sx={{
            border: "1px solid #e0e0e0",
            borderRadius: "0.5rem",
            padding: "1rem",
            backgroundColor: "#fafafa",
          }}
        >
          <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
            GSTIN Details
          </Typography>
          <CustomInput
            label="GSTIN Number"
            value={documentDetails.gstinNumber}
            onChange={(e) => handleInputChange(e, "gstinNumber")}
          />
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
                documentDetails.gstinImageUrl ||
                "https://cdn.pixabay.com/photo/2016/03/31/14/48/sheet-1292828_960_720.png"
              }
              alt="GSTIN"
              style={{
                width: "150px",
                height: "100px",
                objectFit: "contain",
                borderRadius: "8px",
                border: "1px solid #ccc",
              }}
            />
            <label htmlFor="gstin-upload">
              <input
                id="gstin-upload"
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={(e) => handleFileUpload(e, "gstinImageUrl")}
              />
              <>
                <SaveIcon
                  onClick={handleSaveLogo}
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
                  onClick={handleDeleteLogo}
                  sx={{
                    fontSize: "36px",
                    color: "#fff",
                    cursor: "pointer",
                    background: "linear-gradient(45deg, #d32f2f, #ff5252)",
                    padding: "8px",
                    borderRadius: "50%",
                  }}
                />
              </>
            </label>
          </Box>
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

export default Document;
