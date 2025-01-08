import React, { useState } from "react";
import { Box, Typography, Button, Modal, TextField, Grid } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";

function Document({ document }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [documentDetails, setDocumentDetails] = useState({
    panNumber: document?.pan?.documentNumber || "",
    gstinNumber: document?.gstin?.documentNumber || "",
    panImageUrl: document?.pan?.documentUrl || "",
    gstinImageUrl: document?.gstin?.documentUrl || "",
  });

  const handleDocumentDetailsChange = (event, key) => {
    const value = event.target.value;
    setDocumentDetails((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleFileChange = (event, key) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setDocumentDetails((prev) => ({
          ...prev,
          [key]: reader.result, // Use base64 for simplicity
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveClick = () => {
    // Save updated document details (send to backend or parent)
    console.log("Document details saved:", documentDetails);
    setIsModalOpen(false); // Close the modal after saving
  };

  return (
    <Box
      sx={{
        display: "flex",
        gap: "20px",
        backgroundColor: "#fff",
        borderRadius: "0.5rem",
        boxShadow: "1px 1px 3px 0 black, 0 1px 2px -1px rgb(0 0 0 / 0.1)",
        padding: "1.5rem",
        marginTop: "20px",
      }}
    >
      <Box sx={{ flex: 1 }}>
        <Typography variant="h6">Documents</Typography>
        <Box className="info-content">
          <Typography>
            <strong>PAN Number:</strong> {documentDetails.panNumber}
          </Typography>
          <Typography>
            <strong>GSTIN Number:</strong> {documentDetails.gstinNumber}
          </Typography>
          <Box display="flex" alignItems="center" gap="20px" marginTop="10px">
            <img
              src={
                documentDetails.panImageUrl ||
                "https://cdn.pixabay.com/photo/2016/03/31/14/48/sheet-1292828_960_720.png"
              }
              alt="PAN"
              height="100px"
              width="90px"
            />
            <img
              src={
                documentDetails.gstinImageUrl ||
                "https://cdn.pixabay.com/photo/2016/03/31/14/48/sheet-1292828_960_720.png"
              }
              alt="GSTIN"
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
              borderRadius: "10px",
            }}
          >
            <ModeEditIcon />
          </Button>
        </Box>
      </Box>

      {/* Modal for editing document details */}
      <Modal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            borderRadius: "10px",
            p: 4,
          }}
        >
          <Typography id="modal-title" variant="h6" component="h2">
            Edit Document Details
          </Typography>
          {/* Fields in Two Columns */}
          <Grid container spacing={2} marginTop={1}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="PAN Number"
                value={documentDetails.panNumber}
                onChange={(e) => handleDocumentDetailsChange(e, "panNumber")}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="GSTIN Number"
                value={documentDetails.gstinNumber}
                onChange={(e) => handleDocumentDetailsChange(e, "gstinNumber")}
                variant="outlined"
              />
            </Grid>
          </Grid>
          {/* Images in Two Columns */}
<Grid container spacing={2} marginTop={2} alignItems="center">
  <Grid item xs={6} textAlign="center">
    <Typography variant="subtitle1">PAN Image:</Typography>
    <Box display="flex" flexDirection="column" alignItems="center" gap={1}>
      <img
        src={
          documentDetails.panImageUrl ||
          "https://cdn.pixabay.com/photo/2016/03/31/14/48/sheet-1292828_960_720.png"
        }
        alt="PAN"
        height="100px"
        width="90px"
      />
      <label>
        <DriveFolderUploadIcon
          style={{
            background:
              "linear-gradient(90deg, rgb(47, 40, 162) 0%, rgb(104, 104, 163) 56%, rgb(84, 171, 189) 100%)",
            fontSize: "40px",
            cursor: "pointer",
          }}
        />
        <input
          type="file"
          hidden
          accept="image/*"
          onChange={(e) => handleFileChange(e, "panImageUrl")}
        />
      </label>
    </Box>
  </Grid>
  <Grid item xs={6} textAlign="center">
    <Typography variant="subtitle1">GSTIN Image:</Typography>
    <Box display="flex" flexDirection="column" alignItems="center" gap={1}>
      <img
        src={
          documentDetails.gstinImageUrl ||
          "https://cdn.pixabay.com/photo/2016/03/31/14/48/sheet-1292828_960_720.png"
        }
        alt="GSTIN"
        height="100px"
        width="90px"
      />
      <label>
        <DriveFolderUploadIcon
          style={{
            background:
            "linear-gradient(90deg, rgb(47, 40, 162) 0%, rgb(104, 104, 163) 56%, rgb(84, 171, 189) 100%)",
            fontSize: "40px",
            cursor: "pointer",
          }}
        />
        <input
          type="file"
          hidden
          accept="image/*"
          onChange={(e) => handleFileChange(e, "gstinImageUrl")}
        />
      </label>
    </Box>
  </Grid>
</Grid>

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

export default Document;
