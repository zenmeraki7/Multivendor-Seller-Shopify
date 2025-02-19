import React, { useState } from "react";
import { Box, Typography, Link } from "@mui/material";
import OtpInput from "react-otp-input";
import CustomButton from "../../components/custmiseComponents/CustomButton";

const Verification = () => {
  // State to store OTP value
  const [otp, setOtp] = useState("");

  // Handle OTP change
  const handleOtpChange = (otp) => {
    setOtp(otp);
  };

  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
        background: "linear-gradient(20deg, #6a11cb, #2575fc)",
      }}
    >
      <Box
        sx={{
          display: "flex",
          width: "60%",
          height: "70%",
          background: "#fff",
          borderRadius: "20px",
          overflow: "hidden",
          backdropFilter: "blur(15px)",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
        }}
      >
        <Box
          sx={{
            width: "100%",
            backgroundImage:
              "url('https://tehran-assets.s3.amazonaws.com/static/hero-image.png')",
            backgroundSize: "contain",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        ></Box>

        <Box
          sx={{
            width: "50%",
            padding: 4,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "flex-start",
            zIndex: 1,
          }}
        >
          <Typography
            variant="h4"
            sx={{ textAlign: "center", fontWeight: "bold", marginBottom: 2 }}
          >
            Enter OTP
          </Typography>
          <Typography
            variant="body1"
            sx={{ textAlign: "center", marginBottom: 4 }}
          >
            A verification code has been sent to your email.
          </Typography>

          <OtpInput
            numInputs={6}
            separator={<span>-</span>}
            inputStyle={{
              width: "40px",
              height: "40px",
              margin: "0 10px",
              fontSize: "20px",
              textAlign: "center",
              borderRadius: "8px",
              border: "1px solid #ccc",
            }}
            containerStyle={{
              justifyContent: "center",
            }}
            isInputNum
            value={otp} // Bind OTP state value to the OTP input
            onChange={handleOtpChange} // Handle OTP input change
            renderInput={(props) => <input {...props} />} // Provide a default renderInput prop
          />
          
          <Box sx={{ textAlign: "center", marginTop: 3 }}>
            <CustomButton label="Register" />
          </Box>

          <Box sx={{ textAlign: "center", marginTop: 3 }}>
            <Typography variant="body2">
              Didn't receive the OTP?{" "}
              <Link
                href="#"
                variant="body2"
                sx={{ textDecoration: "none", color: "#6a11cb" }}
              >
                Resend
              </Link>
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Verification;
