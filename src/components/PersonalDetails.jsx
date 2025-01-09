import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  TextField,
} from "@mui/material";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";
import Grid from "@mui/material/Grid"; // Ensure Grid is imported correctly
import CustomInput from "./SharedComponents/CustomInput";
import CustomButton from "./SharedComponents/CustomButton";

function PersonalDetails({ personalData }) {
  // const [isEditing, setIsEditing] = useState(false);
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
  const [logo, setLogo] = useState(personalData?.companyIcon);

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
        // backgroundColor: "#fff",
        borderRadius: "12px",
        marginTop: "30px",
        // padding: "2rem",
        // boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
        // maxWidth: "1000px",
        margin: "auto",
      }}
    >
      <Box sx={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
        {/* Logo Section */}
        <Box
          sx={{
            flex: "1 1 300px",
            border: "1px solid #e0e0e0",
            borderRadius: "12px",
            padding: "1.5rem",
            boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
            backgroundColor: "#f9f9f9",
            textAlign: "center",
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
            Company Logo
          </Typography>
          <Box
            sx={{
              width: "200px",
              height: "200px",
              border: "2px dashed #ccc",
              borderRadius: "12px",
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 15px",
              backgroundColor: "#f5f5f5",
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
                No Image Available
              </Typography>
            )}
          </Box>
          <Typography
            variant="body2"
            sx={{ marginBottom: "10px", color: "#666" }}
          >
            Upload a high-quality logo.
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "center", gap: "10px" }}>
            <label>
              <input
                type="file"
                style={{ display: "none" }}
                onChange={handleLogoUpload}
              />
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
            </label>
            {logo && (
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
            )}
          </Box>
        </Box>

        {/* Details Section */}
        <Box
          sx={{
            flex: "2 1 600px",
            border: "1px solid #e0e0e0",
            borderRadius: "12px",
            padding: "2rem",
            boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
            backgroundColor: "#f9f9f9",
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
            Company and Personal Details
          </Typography>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "1rem",
            }}
          >
            {[
              { label: "Company Name", value: personalData.companyName },
              { label: "Full Name", value: personalData.fullName },
              { label: "Email", value: personalData.email },
              { label: "Phone Number", value: personalData.phoneNum },
              { label: "Address", value: personalData.address },
              { label: "Zip Code", value: personalData.zipCode },
              { label: "City", value: personalData.city },
              { label: "State", value: personalData.state.name },
              { label: "Country", value: personalData.country.name },
            ].map((field) => (
              <CustomInput key={field.label} small={true} {...field} />
            ))}
          </Box>
          <Box sx={{ textAlign: "right", marginTop: "20px" }}>
            <CustomButton
              onClick={handleToggleEdit}
              label="Edit Details"
              icon={<ModeEditIcon sx={{ marginRight: "8px" }} />}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default PersonalDetails;
