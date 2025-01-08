import React, { useEffect, useState } from "react";
import "./SellerPro.css";
import { Box, Typography, Grid } from "@mui/material";
import axios from "axios";
import { BASE_URL } from "../utils/baseUrl";
import PersonalDetails from "../components/PersonalDetails";
import Document from "../components/Document";
import BankDetails from "../components/BankDetails";

function SellerPro() {
  const [data, setData] = useState(null); // State to store API response
  const [error, setError] = useState(null); // State to store any error
  const [loading, setLoading] = useState(false); // State to show loading status

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
      <Box sx={{ flex: 1, padding: "20px" }}>
        {/* Profile Header */}
        <Box className="profile-container" sx={{ paddingLeft: "20px" }}>
          <Typography
            variant="h4"
            sx={{
              color: "rgba(37,89,222,1)",
              WebkitBackgroundClip: "text",
              textAlign: "center",
            }}
          >
            <b>Seller Profile</b>
          </Typography>
        </Box>

        {/* Personal Information Section */}
        {data && data.user ? (
          <PersonalDetails personalData={data.user} />
        ) : (
          <Typography>No user data available.</Typography>
        )}

        {/* Document and Bank Details Section in Grid Layout */}
        {data && data.user && (
          <Grid container spacing={3} sx={{ marginTop: "20px" }}>
            <Grid
              item
              xs={12}
              sm={6}
              sx={{ display: "flex", flexDirection: "column", height: "100%" }}
            >
              <Box sx={{ flexGrow: 1, minHeight: "200px" }}>
                <Document
                  document={{
                    pan: data.user.PAN,
                    gstin: data.user.GSTIN,
                  }}
                />
              </Box>
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              sx={{ display: "flex", flexDirection: "column", height: "100%" }}
            >
              <Box sx={{ flexGrow: 1, minHeight: "200px" }}>
                {/* Pass bankDetails data as props */}
                <BankDetails bankDetails={data.user.bankDetails} />
              </Box>
            </Grid>
          </Grid>
        )}
      </Box>
    </Box>
  );
}

export default SellerPro;
