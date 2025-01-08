import React, { useState, useEffect } from "react";
import { Box, Typography, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";
import Grid from "@mui/material/Grid";  // Ensure Grid is imported correctly

function PersonalDetails({ personalData }) {
  const [isEditing, setIsEditing] = useState(false);
  const [personalInfo, setPersonalInfo] = useState({
    firstName: personalData?.fullName || "",
    email: personalData?.email || "",
    phone: personalData?.phoneNum || "",
    address: personalData?.address || "",
  });
  const [companyDetails, setCompanyDetails] = useState({
    companyName: personalData?.companyName || "",
    companyAddress: personalData?.address || "",
  });
  const [logo, setLogo] = useState(null);

  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    setPersonalInfo({
      firstName: personalData?.fullName || "",
      email: personalData?.email || "",
      phone: personalData?.phoneNum || "",
      address: personalData?.address || "",
    });
    setCompanyDetails({
      companyName: personalData?.companyName || "",
      companyAddress: personalData?.address || "",
    });
  }, [personalData]);

  const handleInputChange = (e, stateObj, field, setStateObj) => {
    setStateObj({ ...stateObj, [field]: e.target.value });
  };

  const handleLogoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const logoURL = URL.createObjectURL(file);
      setLogo(logoURL);
    }
  };

  const handleSaveLogo = () => {
    if (logo) {
      console.log("Logo saved:", logo);
    } else {
      console.error("No logo to save!");
    }
  };

  const handleDeleteLogo = () => {
    setLogo(null);
    console.log("Logo deleted!");
  };

  const handleToggleEdit = () => {
    setOpenModal(true);
  };

  const handleSaveDetails = () => {
    console.log("Personal Info saved:", personalInfo);
    console.log("Company Details saved:", companyDetails);
    setOpenModal(false);
  };

  return (
    <Box 
      sx={{ 
        backgroundColor: '#fff',
        borderRadius: '0.5rem',
        boxShadow: '0 1px 3px 0 black, 0 1px 2px -1px rgb(0 0 0 / 0.1)',
        padding: '1.5rem',
        marginTop: '20px'
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-evenly", gap: "20px" }}>
        {/* Logo Section */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            border: "1px solid #ccc",
            borderRadius: "8px",
            padding: "20px",
          }}
        >
          <Box
            sx={{
              width: "300px",
              height: "300px",
              border: "1px solid gray",
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#f9f9f9",
            }}
          >
            {logo ? (
              <img
                src={logo}
                alt="Logo"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            ) : (
              <Typography variant="body2" color="gray">
                No Image
              </Typography>
            )}
          </Box>
          <Box sx={{ display: "flex", gap: "20px", marginTop: "10px" }}>
            <label style={{ cursor: "pointer" }}>
              <input
                type="file"
                style={{ display: "none" }}
                onChange={handleLogoUpload}
              />
              <DriveFolderUploadIcon
                style={{
                  fontSize: "40px",
                  color: "white",
                  cursor: "pointer",
                  background:
                    "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(85,85,197,1) 56%, rgba(0,212,255,1) 100%)",
                  borderRadius: "10px",
                }}
              />
            </label>
            {logo && (
              <>
                <SaveIcon
                  onClick={handleSaveLogo}
                  style={{
                    fontSize: "40px",
                    color: "white",
                    cursor: "pointer",
                    background:
                      "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(85,85,197,1) 56%, rgba(0,212,255,1) 100%)",
                    borderRadius: "10px",
                  }}
                />
                <DeleteIcon
                  onClick={handleDeleteLogo}
                  style={{
                    fontSize: "40px",
                    background:
                      "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(85,85,197,1) 56%, rgba(0,212,255,1) 100%)",
                    color: "white",
                    cursor: "pointer",
                    borderRadius: "10px",
                  }}
                />
              </>
            )}
          </Box>
        </Box>

        {/* Company and Personal Details Section */}
        <Box
          sx={{
            flex: 2,
            display: "flex",
            flexDirection: "column",
            padding: "20px",
            border: "1px solid #ccc",
            borderRadius: "8px",
          }}
        >
          <Typography variant="h6" style={{ textAlign: "center", marginBottom: '1rem' }}>
            Company Information
          </Typography>
          <Typography variant="h6">Company Name:</Typography>
          <Typography sx={{ marginBottom: '1rem' }}>{companyDetails.companyName}</Typography>

          <Typography variant="h6">Company Address:</Typography>
          <Typography sx={{ marginBottom: '1rem' }}>{companyDetails.companyAddress}</Typography>

          <Typography variant="h6" style={{ textAlign: "center", marginTop: '1rem', marginBottom: '1rem' }}>
            Personal Information
          </Typography>
          <Typography sx={{ marginBottom: '0.5rem' }}>
            <strong>First Name:</strong> {personalInfo.firstName}
          </Typography>
          <Typography sx={{ marginBottom: '0.5rem' }}>
            <strong>Email Address:</strong> {personalInfo.email}
          </Typography>
          <Typography sx={{ marginBottom: '0.5rem' }}>
            <strong>Phone:</strong> {personalInfo.phone}
          </Typography>
          <Typography sx={{ marginBottom: '0.5rem' }}>
            <strong>Address:</strong> {personalInfo.address}
          </Typography>

          {/* Edit Button */}
          <Button
            onClick={handleToggleEdit}
            variant="contained"
            sx={{
              alignSelf: 'flex-start',
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

      {/* Modal for Editing Details */}
      <Dialog open={openModal} onClose={() => setOpenModal(false)} style={{width:'100%'}}>
        <DialogTitle>Edit Details</DialogTitle>
        <DialogContent>
        <Grid container spacing={2}>
            {/* Company Name and Company Address in a row */}
            <Grid item xs={12} sm={6}>
              <Typography variant="h6">Company Name:</Typography>
              <TextField
                fullWidth
                value={companyDetails.companyName}
                onChange={(e) =>
                  handleInputChange(e, companyDetails, "companyName", setCompanyDetails)
                }
                sx={{ marginBottom: '1rem' }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6">Company Address:</Typography>
              <TextField
                fullWidth
                value={companyDetails.companyAddress}
                onChange={(e) =>
                  handleInputChange(e, companyDetails, "companyAddress", setCompanyDetails)
                }
                sx={{ marginBottom: '1rem' }}
              />
            </Grid>

            {/* First Name and Email in a row */}
            <Grid item xs={12} sm={6}>
              <Typography variant="h6">First Name:</Typography>
              <TextField
                fullWidth
                value={personalInfo.firstName}
                onChange={(e) =>
                  handleInputChange(e, personalInfo, "firstName", setPersonalInfo)
                }
                sx={{ marginBottom: '1rem' }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6">Email:</Typography>
              <TextField
                fullWidth
                value={personalInfo.email}
                onChange={(e) =>
                  handleInputChange(e, personalInfo, "email", setPersonalInfo)
                }
                sx={{ marginBottom: '1rem' }}
              />
            </Grid>

            {/* Phone Number and Address in a row */}
            <Grid item xs={12} sm={6}>
              <Typography variant="h6">Phone:</Typography>
              <TextField
                fullWidth
                value={personalInfo.phone}
                onChange={(e) =>
                  handleInputChange(e, personalInfo, "phone", setPersonalInfo)
                }
                sx={{ marginBottom: '1rem' }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6">Address:</Typography>
              <TextField
                fullWidth
                value={personalInfo.address}
                onChange={(e) =>
                  handleInputChange(e, personalInfo, "address", setPersonalInfo)
                }
                sx={{ marginBottom: '1rem' }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenModal(false)} color="primary">
            Cancel
          </Button>
          <Button
              onClick={handleSaveDetails}
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
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default PersonalDetails;
