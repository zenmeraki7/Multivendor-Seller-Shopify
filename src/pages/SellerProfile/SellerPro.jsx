import React, { useEffect, useState } from "react";
import "./SellerPro.css";
import {
  Box,
  Typography,
  Tabs,
  Tab,
  Alert,
  AlertTitle,
  CircularProgress,
  Container,
  Paper,
  Divider,
} from "@mui/material";
import axios from "axios";
import PersonalDetails from "../../components/profile/PersonalDetails";
import Document from "../../components/profile/Document";
import BankDetails from "../../components/profile/BankDetails";
import { BASE_URL } from "../../utils/baseUrl";
import SellerPolicy from "../../components/profile/SellerPolicy";

function SellerPro() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  useEffect(() => {
    const fetchProfileData = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("Authentication required. Please log in again.");
        return;
      }

      setLoading(true);

      try {
        const response = await axios.get(`${BASE_URL}/api/vendor/auth-token`, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });

        setData(response.data);
      } catch (err) {
        const errorMessage =
          err.response?.data?.message || "Failed to load profile data.";
        setError(errorMessage);

        if (err.response?.status === 401 || err.response?.status === 404) {
          localStorage.removeItem("token");
          window.location.reload();
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  // Loading state
  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <CircularProgress size={60} thickness={4} />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Loading your profile...
        </Typography>
      </Box>
    );
  }

  // Error state
  if (error) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Alert severity="error" variant="filled" sx={{ borderRadius: 2 }}>
          <AlertTitle>Error</AlertTitle>
          {error}
        </Alert>
      </Container>
    );
  }

  const showVerificationAlert = data && !data.user.isVerified;
  const showBankDetailsAlert =
    data && !data?.user?.KycProvidedDetails?.bankDetails;
  const showDocumentAlert = data && !data?.user?.KycProvidedDetails?.PAN;

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper
        elevation={3}
        sx={{
          borderRadius: 3,
          overflow: "hidden",
          border: "1px solid #e0e0e0",
        }}
      >
        {/* Header */}
        <Box
          sx={{
            p: 4,
            background: "linear-gradient(120deg, #2563eb 0%, #3b82f6 100%)",
            color: "white",
          }}
        >
          <Typography variant="h4" fontWeight="700" gutterBottom>
            Seller Dashboard
          </Typography>
          <Typography variant="body1">
            Manage your business details, documents, and banking information
            from this central dashboard.
          </Typography>
        </Box>

        {/* Alerts */}
        {(showVerificationAlert ||
          showBankDetailsAlert ||
          showDocumentAlert) && (
          <Box sx={{ p: 3, bgcolor: "#f8fafc" }}>
            {showVerificationAlert && (
              <Alert
                severity="info"
                sx={{ mb: 2, borderRadius: 1 }}
                variant="outlined"
              >
                <AlertTitle>Verification Pending</AlertTitle>
                Thank you for your registration! Your account is currently under
                review. We will notify you once your profile has been approved
                by our team.
              </Alert>
            )}

            {showBankDetailsAlert && (
              <Alert
                severity="warning"
                sx={{ mb: showDocumentAlert ? 2 : 0, borderRadius: 1 }}
                variant="outlined"
              >
                <AlertTitle>Bank Details Required</AlertTitle>
                Please add your banking information to complete your
                registration and proceed with verification.
              </Alert>
            )}

            {showDocumentAlert && (
              <Alert
                severity="warning"
                sx={{ borderRadius: 1 }}
                variant="outlined"
              >
                <AlertTitle>Documents Required</AlertTitle>
                Please upload your PAN and GSTIN documents to complete your
                registration and proceed with verification.
              </Alert>
            )}
          </Box>
        )}

        <Divider />

        {/* Tabs */}
        <Box sx={{ width: "100%" }}>
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            sx={{
              bgcolor: "#f9fafb",
              "& .MuiTab-root": {
                fontWeight: 600,
                py: 2,
              },
            }}
          >
            <Tab label="Business Profile" />
            <Tab label="Documents" />
            <Tab label="Banking Information" />
            <Tab label="Seller Policy" />
          </Tabs>

          <Box sx={{ p: 3 }}>
            {activeTab === 0 &&
              (data && data.user ? (
                <PersonalDetails personalData={data.user} />
              ) : (
                <Typography
                  sx={{ textAlign: "center", color: "text.secondary" }}
                >
                  No profile data available.
                </Typography>
              ))}

            {activeTab === 1 &&
              (data && data.user ? (
                <Document
                  document={{
                    pan: data.user.PAN,
                    gstin: data.user.GSTIN,
                  }}
                />
              ) : (
                <Typography
                  sx={{ textAlign: "center", color: "text.secondary" }}
                >
                  No document data available.
                </Typography>
              ))}

            {activeTab === 2 &&
              (data && data.user ? (
                <BankDetails bankDetails={data.user.bankDetails} />
              ) : (
                <Typography
                  sx={{ textAlign: "center", color: "text.secondary" }}
                >
                  No banking information available.
                </Typography>
              ))}
            {activeTab === 3 && (
              <SellerPolicy
                initialPolicy={data?.user?.sellerPolicy || ""}
                token={localStorage.getItem("token")}
              />
            )}
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}

export default SellerPro;
