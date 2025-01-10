import React, { useState } from "react";
import { Box, Typography, Modal, Stack, TextField } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import CustomInput from "../SharedComponents/CustomInput";
import CustomButton from "../SharedComponents/CustomButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { BASE_URL } from "../../utils/baseUrl";
import axios from "axios";
import * as Yup from "yup";
import toast from "react-hot-toast";

const documentValidationSchema = Yup.object({
  gstinNumber: Yup.string()
    .required("GSTIN Document Number is required")
    .matches(/^[A-Z0-9]{15}$/, "Invalid GSTIN format"),
  panNumber: Yup.string()
    .required("PAN Card Document Number is required")
    .matches(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, "Invalid PAN format"),
  // gstinDocumentImage: Yup.mixed()
  //   .test(
  //     "fileSize",
  //     "File size is too large. Max 5MB",
  //     (value) => value && value.size <= 5242880 // Ensure `value` exists
  //   )
  //   .optional(),
  // panCardDocumentImage: Yup.mixed()
  //   .test(
  //     "fileSize",
  //     "File size is too large. Max 5MB",
  //     (value) => value && value.size <= 5242880 // Ensure `value` exists
  //   )
  //   .optional(

  //   ),
});

function Document({ document }) {
  const [documentDetails, setDocumentDetails] = useState({
    panNumber: document?.pan?.documentNumber || "",
    gstinNumber: document?.gstin?.documentNumber || "",
  });

  const [panDoc, setPanDoc] = useState(null);
  const [panDocUrl, setPanDocUrl] = useState(document?.pan?.documentUrl || "");
  const [gstinDoc, setGstinDoc] = useState(null);
  const [gstinDocUrl, setGstinDocUrl] = useState(
    document?.gstin?.documentUrl || ""
  );
  const [editable, setEditable] = useState(false);
  const [validationError, setValidationError] = useState({});

  const handleInputChange = (event) => {
    const { value, name } = event.target;
    setDocumentDetails({ ...documentDetails, [name]: value });
  };
  console.log(validationError);
  const handleSubmit = async () => {
    try {
      // if (panDoc) {
      //   documentDetails.panCardDocumentImage = panDoc;
      // }
      // if (gstinDoc) {
      //   documentDetails.gstinDocumentImage = gstinDoc;
      // }
      console.log(documentDetails);
      await documentValidationSchema.validate(documentDetails, {
        abortEarly: false,
      });
      const formData = new FormData();
      formData.append("panNumber", documentDetails.panNumber);
      formData.append("gstinNumber", documentDetails.gstinNumber);
      if (panDoc && panDoc instanceof File) {
        formData.append("PAN", panDoc);
      }
      if (gstinDoc && gstinDoc instanceof File) {
        formData.append("GSTIN", gstinDoc);
      }
      const token = localStorage.getItem("token");
      toast.loading("Updating document details...");
      const response = await axios.put(
        `${BASE_URL}/api/vendor/update-document`,
        formData, // API endpoint
        {
          headers: {
            authorization: `Bearer ${token}`, // Include token for authentication
            "Content-Type": "multipart-form/data",
          },
        }
      );
      setValidationError({});
      console.log("document details updated successfully:", response.data);
      toast.dismiss();
      toast.success("Document details updated successfully");
      setEditable(false);
      setPanDoc(null);
      setGstinDoc(null);
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
            error={validationError.panNumber}
            label="PAN Number"
            value={documentDetails.panNumber}
            name={"panNumber"}
            readOnly={!editable}
            onChange={handleInputChange}
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
                panDocUrl ||
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
            <Box
              sx={{ display: "flex", justifyContent: "center", gap: "10px" }}
            >
              <label>
                <input
                  type="file"
                  style={{ display: "none" }}
                  onChange={(event) => {
                    {
                      const file = event.target.files[0];
                      if (file) {
                        const logoURL = URL.createObjectURL(file);
                        setPanDocUrl(logoURL);
                        setPanDoc(file);
                      }
                    }
                  }}
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
              {panDoc && (
                <>
                  <DeleteIcon
                    onClick={() => {
                      setPanDocUrl(document?.pan?.documentUrl || "");
                      setPanDoc(null);
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
            error={validationError.gstinNumber}
            label="GSTIN Number"
            value={documentDetails.gstinNumber}
            name={"gstinNumber"}
            readOnly={!editable}
            onChange={handleInputChange}
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
                gstinDocUrl ||
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
            <Box
              sx={{ display: "flex", justifyContent: "center", gap: "10px" }}
            >
              <label>
                <input
                  type="file"
                  style={{ display: "none" }}
                  onChange={(event) => {
                    {
                      const file = event.target.files[0];
                      if (file) {
                        const logoURL = URL.createObjectURL(file);
                        setGstinDocUrl(logoURL);
                        setGstinDoc(file);
                      }
                    }
                  }}
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
              {gstinDoc && (
                <>
                  <DeleteIcon
                    onClick={() => {
                      setGstinDocUrl(document?.gstin?.documentUrl || "");
                      setGstinDoc(null);
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
                setDocumentDetails({
                  panNumber: document?.pan?.documentNumber || "",
                  gstinNumber: document?.gstin?.documentNumber || "",
                });
                setEditable(false);
                setValidationError({});
                setGstinDocUrl(document?.gstin?.documentUrl || "");
                setGstinDoc(null);
                setPanDocUrl(document?.pan?.documentUrl || "");
                setPanDoc(null);
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

export default Document;
