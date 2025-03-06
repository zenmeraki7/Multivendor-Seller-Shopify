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
  Stack,
} from "@mui/material";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";
import Grid from "@mui/material/Grid"; // Ensure Grid is imported correctly
import CustomInput from "../SharedComponents/CustomInput";
import CustomButton from "../SharedComponents/CustomButton";
import CustomSelect from "../SharedComponents/CustomSelect";
import axios from "axios";
import { BASE_URL } from "../../utils/baseUrl";
import { vendorUpdateSchema } from "../../utils/vendorUpdateValidation";
import toast from "react-hot-toast";

function PersonalDetails({ personalData }) {
  // const [isEditing, setIsEditing] = useState(false);
  const [personalInfo, setPersonalInfo] = useState(personalData);
  const [editable, setEditable] = useState(false);
  const [supportData, setSupportData] = useState(personalData.supportContact);
  const [logo, setLogo] = useState(null);
  const [logoUrl, setLogoUrl] = useState(personalInfo?.companyIcon || "");
  console.log(logoUrl, "lgogo");
  const [states, setStates] = useState([]);
  const [countries, setCountries] = useState([]);
  const [businessTypes, setBusinessTypes] = useState([]);
  const [validationError, setValidationError] = useState({});
  console.log(validationError);
  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/countries`)
      .then((response) => {
        console.log("Fetched Countries:", response.data);
        setCountries(response.data);
      })
      .catch((err) => console.error("Error fetching countries:", err));

    axios
      .get(`${BASE_URL}/api/states?country=India`)
      .then((response) => {
        console.log("Fetched States:", response.data);
        setStates(response.data);
      })
      .catch((err) => console.error("Error fetching states:", err));

    axios
      .get(`${BASE_URL}/api/business-type/all`)
      .then((response) => {
        console.log("Fetched Business Types:", response.data);
        const businessTypesData = response.data?.data || [];
        const formattedData = businessTypesData.map((type) => ({
          _id: type._id || type.id,
          name: type.name || type.businessTypeName || type.type,
        }));
        console.log("Formatted Business Types:", formattedData);
        setBusinessTypes(formattedData);
      })
      .catch((err) => {
        console.error("Error fetching business types:", err);
        setBusinessTypes([]);
      });
  }, []);

  const handleLogoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const logoURL = URL.createObjectURL(file);
      setLogoUrl(logoURL);
      setLogo(file);
    }
  };

  const uploadCompanyIcon = async () => {
    if (logo && logo instanceof File) {
      const formData = new FormData();
      if (logo) {
        formData.append("image", logo);
      }
      const token = localStorage.getItem("token");
      try {
        toast.loading("updating logo");
        const response = await axios.put(
          `${BASE_URL}/api/vendor/update-company-logo`,
          formData, // API endpoint
          {
            headers: {
              authorization: `Bearer ${token}`, // Include token for authentication
              "Content-Type": "multipart-form/data",
            },
          }
        );
        console.log(response.data);
        console.log("company logo updated successfully:", response.data);
        toast.dismiss();
        setLogo(null);
        toast.success("Company logo updated successfully");
      } catch (err) {
        console.log(err);
        toast.dismiss();
        toast.error(err.response?.data?.message || "An error occurred.");
      }
    } else {
      toast.error("please upload logo");
    }
  };

  const handleeditVendor = async () => {
    try {
      if (supportData.email || supportData.phone) {
        personalInfo.supportContact = supportData;
      } else {
        delete personalInfo.supportContact;
      }
      // Validate the data
      await vendorUpdateSchema.validate(personalInfo, { abortEarly: false });
      const {
        PAN,
        GSTIN,
        bankDetails,
        salesData,
        _id,
        KycProvidedDetails,
        isBlocked,
        isVerified,
        createdAt,
        updatedAt,
        isEmailVerified,
        __v,
        companyIcon,
        verificationRemarks,
        ...others
      } = personalInfo;
      const token = localStorage.getItem("token");
      toast.loading("Updating profile");
      const response = await axios.put(
        `${BASE_URL}/api/vendor/update-details`,
        others, // API endpoint
        {
          headers: {
            authorization: `Bearer ${token}`, // Include token for authentication
            "Content-Type": "application/json",
          },
        }
      );
      setValidationError({});
      console.log("Vendor updated successfully:", response.data);
      toast.dismiss();
      toast.success("Profile updated successfully");
      setEditable(false);
    } catch (err) {
      toast.dismiss();
      if (err.name === "ValidationError") {
        const errorMessages = err.inner.reduce((acc, curr) => {
          acc[curr.path] = curr.message;
          return acc;
        }, {});
        setValidationError(errorMessages);
      } else {
        toast.error(err.response?.data?.message || "An error occurred.");
      }
    }
  };

  console.log(personalInfo);
  const handleChange = (e, isQuill = false) => {
    if (isQuill) {
      const { name, value } = e; // Quill sends { name, value } instead of an event
      setPersonalInfo((prev) => ({ ...prev, [name]: value }));
    } else {
      const { name, value } = e.target;
      setPersonalInfo((prev) => ({ ...prev, [name]: value }));
    }
  };

  console.log(supportData);
  const handleChangeSupport = (e) => {
    console.log("first");
    const { value, name } = e.target;
    console.log(value, name);
    setSupportData({ ...supportData, [name]: value });
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
            padding: "1.5rem",
            textAlign: "center",
            boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
            backgroundColor: "#f9f9f9",
            border: "1px solid #e0e0e0",
            borderRadius: "12px",
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
            }}
          >
            {logoUrl ? (
              <img
                src={logoUrl}
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
                  backgroundColor: "#2563EB",
                  padding: "8px",
                  borderRadius: "50%",
                }}
              />
            </label>
            {logo && (
              <>
                <SaveIcon
                  onClick={uploadCompanyIcon}
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
                  onClick={() => {
                    setLogoUrl(personalData.companyIcon || "");
                    setLogo(null);
                  }}
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
              {
                label: "Full Name",
                value: personalInfo.fullName,
                name: "fullName",
                handleChange,
                editable,
                error: validationError.fullName,
              },
              {
                label: "Company Name",
                value: personalInfo.companyName,
                name: "companyName",
                handleChange,
                editable,
                error: validationError.companyName,
              },

              {
                label: "Email",
                value: personalInfo.email,
                name: "email",
                handleChange,
                editable: false,
                error: validationError.email,
              },
              {
                label: "Phone Number",
                value: personalInfo.phoneNum,
                name: "phoneNum",
                handleChange,
                editable,
                type: "number",
                error: validationError.phoneNum,
              },
              {
                label: "Address",
                value: personalInfo.address,
                name: "address",
                handleChange,
                editable,
                error: validationError.address,
              },
              {
                label: "Zip Code",
                value: personalInfo.zipCode,
                name: "zipCode",
                handleChange,
                editable,
                type: "number",
                error: validationError.zipCode,
              },
              {
                label: "Website",
                value: personalInfo.website || "",
                name: "website",
                handleChange,
                editable,
                error: validationError.website,
              },
              {
                label: "Support mail",
                value: supportData.email || "",
                name: "email",
                handleChange: handleChangeSupport,
                editable,
                error: validationError["supportContact.email"],
              },
              {
                label: "Support phone number",
                value: supportData.phone || "",
                name: "phone",
                handleChange: handleChangeSupport,
                editable,
                type: "number",
                error: validationError["supportContact.phone"],
              },
              {
                label: "City",
                value: personalInfo.city,
                name: "city",
                handleChange,
                editable,
                error: validationError.city,
              },
            ].map((field) => (
              <CustomInput
                error={field.error}
                key={field.label}
                small={true}
                label={field.label}
                value={field.value}
                name={field.name}
                readOnly={!field.editable}
                onChange={field.handleChange}
                type={field.type}
              />
            ))}
            {[
              {
                label: "Country",
                value: personalInfo.country,
                name: "country",
                handleChange,
                editable,
                MenuItems: countries || [], // Ensure not null
                error: validationError.country,
              },
              {
                label: "State",
                value: personalInfo.state,
                name: "state",
                handleChange,
                editable,
                MenuItems: states || [], // Ensure not null
                error: validationError.state,
              },
              {
                label: "Business Type",
                value: personalInfo.businessType || "",
                name: "businessType",
                handleChange,
                editable,
                MenuItems: businessTypes || [],
                error: validationError.businessType,
              },
            ].map((field) => (
              <CustomSelect
                key={field.label}
                label={field.label}
                value={field.value}
                name={field.name}
                onChange={field.handleChange}
                MenuItems={field.MenuItems}
                readOnly={!field.editable}
                error={field.error}
              />
            ))}
            {/* Store & Seller Description - Two Column Layout */}
            <Box
              sx={{
                gridColumn: "span 2", // Ensures it spans the full width of the grid
                display: "flex",
                justifyContent: "space-between",
                gap: "2rem",
                marginTop: "2rem",
              }}
            >
              {[
                {
                  label: "Store Description",
                  value: personalInfo.storeDescription || "",
                  name: "storeDescription",
                  error: validationError.storeDescription,
                },
                {
                  label: "Seller Description",
                  value: personalInfo.sellerDescription || "",
                  name: "sellerDescription",
                  error: validationError.sellerDescription,
                },
              ].map((field) => (
                <Box
                  key={field.name}
                  sx={{
                    flex: 1, // Equal width for both editors
                    minWidth: 0, // Prevents overflow
                    border: "1px solid #e0e0e0",
                    borderRadius: "8px",
                    padding: "15px",
                    backgroundColor: "#fff",
                    boxShadow: "0px 2px 5px rgba(11, 11, 12, 0.1)",
                  }}
                >
                  <Typography sx={{ marginBottom: "8px", fontWeight: "bold" }}>
                    {field.label}
                  </Typography>
                  <ReactQuill
                    value={field.value}
                    onChange={(content) =>
                      handleChange({ name: field.name, value: content }, true)
                    }
                    readOnly={!editable}
                    theme="snow"
                    style={{
                      background: "#fff",
                      height: "150px",
                      border: "none",
                      borderRadius: "0",
                      overflow: "hidden",
                    }}
                  />
                  {field.error && (
                    <Typography
                      color="error"
                      variant="body2"
                      sx={{ mt: "8px" }}
                    >
                      {field.error}
                    </Typography>
                  )}
                </Box>
              ))}
            </Box>
          </Box>
          <Box
            sx={{
              textAlign: "right",
              marginTop: "50px",
              display: "flex",
              gap: "20px",
            }}
          >
            {!editable && (
              <CustomButton
                onClick={() => setEditable(true)}
                label="Edit Details"
                icon={<ModeEditIcon sx={{ marginRight: "8px" }} />}
              />
            )}
            {editable && (
              <Stack direction={"row"} spacing={2}>
                <CustomButton
                  onClick={handleeditVendor}
                  label="Save"
                  icon={<SaveIcon sx={{ marginRight: "8px" }} />}
                />
                <CustomButton
                  onClick={() => {
                    setPersonalInfo(personalData);
                    setSupportData(personalData.supportContact);
                    setEditable(false);
                    setValidationError({});
                  }}
                  label="Cancel"
                  variant="outlined"
                />
              </Stack>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default PersonalDetails;
