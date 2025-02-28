import React, { useState } from "react";
import { Box, Typography, Link, Button } from "@mui/material";
import { keyframes } from "@emotion/react";
import axios from "axios";
import { BASE_URL } from "../../utils/baseUrl";

// Animation for the background gradient
const gradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  // Handle email input change
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        `${BASE_URL}/api/vendor/forgot-password`,
        { email }
      );
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  console.log(email);
  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
        background:
          "linear-gradient(-45deg, #f3e5f5, #fff3e0, #f3e5f5, #fff3e0)",
        backgroundSize: "400% 400%",
        animation: `${gradientAnimation} 10s ease infinite`,
      }}
    >
      <Box
        sx={{
          display: "flex",
          width: { xs: "90%", md: "60%" },
          height: { xs: "80%", md: "70%" },
          background: "rgba(255, 255, 255, 0.9)",
          borderRadius: "20px",
          overflow: "hidden",
          backdropFilter: "blur(15px)",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
        }}
      >
        {/* Image Section */}
        <Box
          sx={{
            width: { xs: "0%", md: "50%" },
            backgroundImage:
              "url('https://cdni.iconscout.com/illustration/premium/thumb/forgot-password-illustration-download-in-svg-png-gif-file-formats--security-access-lock-pin-user-interface-pack-design-development-illustrations-6430852.png?f=webp')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            display: { xs: "none", md: "block" },
          }}
        ></Box>

        {/* Form Section */}
        <Box
          sx={{
            width: { xs: "100%", md: "50%" },
            padding: { xs: 3, md: 4 },
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h4"
            sx={{
              textAlign: "center",
              fontWeight: "bold",
              marginBottom: 2,
              color: "#2c3e50",
            }}
          >
            Forgot Password
          </Typography>
          <Typography
            variant="body1"
            sx={{
              textAlign: "center",
              marginBottom: 4,
              color: "#7f8c8d",
            }}
          >
            Enter your email to receive password reset instructions.
          </Typography>

          <Box
            sx={{
              width: "100%",
              marginBottom: "24px",
              "& input:focus": {
                border: "2px solid transparent",
                backgroundImage: "linear-gradient(45deg, #6a11cb, #2575fc)",
                backgroundOrigin: "border-box",
                backgroundClip: "padding-box, border-box",
                boxShadow: "0 0 0 2px #fff, 0 0 0 4px #6a11cb",
              },
            }}
          >
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={handleEmailChange}
              style={{
                width: "100%",
                padding: "1rem",
                fontSize: "1rem",
                border: "1px solid #ddd",
                borderRadius: "8px",
                background: "#f9f9f9",
                outline: "none",
                transition: "all 0.3s ease",
                color: "#333",
              }}
              required
            />
          </Box>

          <Button
            variant="contained"
            sx={{
              width: "100%",
              padding: "12px",
              background: "linear-gradient(45deg, #6a11cb, #2575fc)",
              color: "#fff",
              fontWeight: "bold",
              borderRadius: "8px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              transition: "transform 0.2s, box-shadow 0.2s",
              marginBottom: "50px",
              "&:hover": {
                transform: "translateY(-2px)",
                boxShadow: "0 6px 12px rgba(0, 0, 0, 0.2)",
                background: "linear-gradient(45deg, #2575fc, #6a11cb)",
              },
            }}
            onClick={handleSubmit}
          >
            Send Reset Link
          </Button>

          {/* Back to Login Link */}
          <Box sx={{ textAlign: "center", marginTop: 3 }}>
            <Link
              href="/login"
              variant="body2"
              sx={{
                textDecoration: "none",
                color: "#6a11cb",
                fontWeight: "600",
                "&:hover": {
                  color: "#2575fc",
                },
              }}
            >
              Back to Login
            </Link>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ForgotPassword;
