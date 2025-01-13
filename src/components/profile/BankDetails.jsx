import React, { useState, useEffect } from "react";
import { Box, Typography, Stack, TextField, Modal } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import CustomInput from "../SharedComponents/CustomInput";
import DeleteIcon from "@mui/icons-material/Delete";
import CustomButton from "../SharedComponents/CustomButton";
import CustomSelect from "../SharedComponents/CustomSelect";
import { BASE_URL } from "../../utils/baseUrl";
import axios from "axios";
import * as Yup from "yup";
import toast from "react-hot-toast";

const bankvalidationSchema = Yup.object({
  accountHolderName: Yup.string().required("Account Holder Name is required"),
  accountNumber: Yup.string()
    .required("Account Number is required")
    .matches(/^\d{9,18}$/, "Invalid Account Number format"),
  ifscCode: Yup.string()
    .required("IFSC Code is required")
    .matches(/^[A-Za-z]{4}[0][A-Za-z0-9]{6}$/, "Invalid IFSC Code format"),
  bankName: Yup.string().required("Bank Name is required"),
});

function BankDetails({ bankDetails }) {
  const [editedBankDetails, setEditedBankDetails] = useState(bankDetails);
  const [editable, setEditable] = useState(false);
  const [validationError, setValidationError] = useState({});
  const [banks, setBanks] = useState([]);
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(bankDetails?.documentUrl || "");
  // Fetch the banks on component mount
  useEffect(() => {
    const fetchBanks = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/banks`);
        setBanks(response.data); // Set the fetched banks to state
      } catch (error) {
        console.error("Error fetching banks:", error);
      }
    };

    fetchBanks();
  }, []);
  console.log(validationError);
  const handleSubmit = async () => {
    try {
      await bankvalidationSchema.validate(editedBankDetails, {
        abortEarly: false,
      });
      const formData = new FormData();
      formData.append("accountHolderName", editedBankDetails.accountHolderName);
      formData.append("accountNumber", editedBankDetails.accountNumber);
      formData.append("ifscCode", editedBankDetails.ifscCode);
      formData.append("bankName", editedBankDetails.bankName);
      if (image && image instanceof File) {
        formData.append("image", image);
      }
      const token = localStorage.getItem("token");
      toast.loading("Updating bank details...");
      const response = await axios.put(
        `${BASE_URL}/api/vendor/update-bank-details`,
        formData, // API endpoint
        {
          headers: {
            authorization: `Bearer ${token}`, // Include token for authentication
            "Content-Type": "multipart-form/data",
          },
        }
      );
      setValidationError({});
      console.log("bank details updated successfully:", response.data);
      toast.dismiss();
      toast.success("Bank details updated successfully");
      setEditable(false);
      setImage(null);
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

  const handleInputChange = (e) => {
    const { value, name } = e.target;
    setEditedBankDetails({ ...editedBankDetails, [name]: value });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const logoURL = URL.createObjectURL(file);
      setImageUrl(logoURL);
      setImage(file);
    }
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
                error={validationError.accountHolderName}
                label="Account Holder Name"
                value={editedBankDetails.accountHolderName}
                name={"accountHolderName"}
                readOnly={!editable}
                onChange={handleInputChange}
              />
              <CustomInput
                error={validationError.accountNumber}
                label="Account Number"
                value={editedBankDetails.accountNumber}
                name={"accountNumber"}
                readOnly={!editable}
                onChange={handleInputChange}
              />
            </Stack>
            <Stack spacing={2} flex={1}>
              <CustomInput
                error={validationError.ifscCode}
                label="IFSC Code"
                value={editedBankDetails.ifscCode}
                name={"ifscCode"}
                readOnly={!editable}
                onChange={handleInputChange}
              />
              <CustomSelect
                error={validationError.bankName}
                label={"Bank Name"}
                value={editedBankDetails.bankName}
                name={"bankName"}
                readOnly={!editable}
                onChange={handleInputChange}
                MenuItems={banks}
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
              imageUrl ||
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
          <Box sx={{ display: "flex", justifyContent: "center", gap: "10px" }}>
            <label>
              <input
                type="file"
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
              {editable && (
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
              )}
            </label>
            {image && (
              <>
                <DeleteIcon
                  onClick={() => {
                    setImageUrl(bankDetails.documentUrl || "");
                    setImage(null);
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
      </Stack>

      <Box
        sx={{
          textAlign: "right",
          marginTop: "20px",
          display: "flex",
          gap: "20px",
          justifyContent: "flex-end",
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
              onClick={handleSubmit}
              label="Save"
              icon={<SaveIcon sx={{ marginRight: "8px" }} />}
            />
            <CustomButton
              onClick={() => {
                setEditedBankDetails(bankDetails);
                setEditable(false);
                setValidationError({});
                setImageUrl(bankDetails.documentUrl || "");
                setImage(null);
              }}
              label="Cancel"
              variant="outlined"
            />
          </Stack>
        )}
      </Box>
    </Box>
  );
}

export default BankDetails;
