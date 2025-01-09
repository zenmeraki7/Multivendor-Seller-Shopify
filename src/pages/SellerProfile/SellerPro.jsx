import React, { useEffect, useState } from "react";
import "./SellerPro.css";
import { Box, Typography, Grid, Tabs, Tab, Alert } from "@mui/material";
import axios from "axios";
import PersonalDetails from "../../components/PersonalDetails";
import Document from "../../components/Document";
import BankDetails from "../../components/BankDetails";
import { BASE_URL } from "../../utils/baseUrl";

function SellerPro() {
  const [data, setData] = useState(null); // State to store API response
  const [error, setError] = useState(null); // State to store any error
  const [loading, setLoading] = useState(false); // State to show loading status
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token"); // Retrieve token
      console.log("Retrieved Token:", token);

      if (!token) {
        console.error("No token found in localStorage");
        setError("Authentication token is missing.");
        return;
      }
      setLoading(true); // Set loading to true before the API call
      try {
        const response = await axios.get(`${BASE_URL}/api/vendor/auth-token`, {
          headers: {
            authorization: `Bearer ${token}`, // Add Bearer token to headers
          },
        });
        setData(response.data); // Store the response data in state
        console.log("API Response:", response.data);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(
          err.response?.data?.message ||
            "An error occurred while fetching data."
        ); // Store error message
      } finally {
        setLoading(false); // Set loading to false after API call
      }
    };
    fetchData(); // Call the fetchData function
  }, []); // Dependency array

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography>Error: {error}</Typography>;

  // Add a check to ensure data is not null before trying to render child components
  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <Box sx={{ flex: 1, padding: "10px" }}>
        {/* Profile Header */}
        <Box
          className="profile-container"
          sx={{
            padding: "10px",
            backgroundColor: "#f4f7fc",
            borderRadius: "12px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
            border: "1px solid #e0e0e0",
          }}
        >
          {/* Title */}
          {/* <Typography
            variant="h4"
            sx={{
              fontWeight: "bold",
              // textAlign: "center",
              marginBottom: "10px",
              color: "rgba(37, 89, 222, 1)",
              background:
                "linear-gradient(90deg, rgba(37,89,222,1) 0%, rgba(0,212,255,1) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Seller Profile
          </Typography> */}

          {/* Subtitle */}
          <Typography
            variant="body1"
            sx={{
              textAlign: "center",
              color: "#6b7280",
              fontSize: "16px",
              maxWidth: "600px",
            }}
          >
            Welcome to your profile page! Manage your business details, contact
            information, and more from here.
          </Typography>
        </Box>
        {!loading && !data?.user.isVerified && (
          <Box sx={{ width: "100%", marginY: 2 }}>
            <Alert severity="info" sx={{ borderRadius: 2 }}>
              <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                Thank you for your registration! Your request is currently under
                review. Please note that your registration has not been approved
                yet. We will notify you once your profile has been reviewed and
                approved by our admin team. We appreciate your patience and
                understanding.
              </Typography>
            </Alert>
          </Box>
        )}
        {!loading && !data?.user?.KycProvidedDetails?.bankDetails && (
          <Box sx={{ width: "100%", marginBottom: 2 }}>
            <Alert severity="warning" sx={{ borderRadius: 2 }}>
              <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                Please provide your bank information to complete your
                registration and await admin approval.
              </Typography>
            </Alert>
          </Box>
        )}
        {!loading && !data?.user?.KycProvidedDetails?.PAN && (
          <Box sx={{ width: "100%", marginBottom: 2 }}>
            <Alert severity="warning" sx={{ borderRadius: 2 }}>
              <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                Please provide your PAN and GSTIN information to complete your
                registration and await admin approval.
              </Typography>
            </Alert>
          </Box>
        )}

        <Box sx={{ width: "100%" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="inherit"
            centered
            sx={{ backgroundColor: "#f0f0f0", borderRadius: "8px" }}
          >
            <Tab label="Personal Details" />
            <Tab label="Documents" />
            <Tab label="Bank details" />
          </Tabs>
          <Box sx={{ paddingY: 3 }}>
            {value === 0 &&
              (data && data.user ? (
                <PersonalDetails personalData={data.user} />
              ) : (
                <Typography>No user data available.</Typography>
              ))}
            {value === 1 &&
              (data && data.user ? (
                <Document
                  document={{
                    pan: data.user.PAN,
                    gstin: data.user.GSTIN,
                  }}
                />
              ) : (
                <Typography>No Document data available.</Typography>
              ))}
            {value === 2 &&
              (data && data.user ? (
                <BankDetails bankDetails={data.user.bankDetails} />
              ) : (
                <Typography>No Document data available.</Typography>
              ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default SellerPro;
