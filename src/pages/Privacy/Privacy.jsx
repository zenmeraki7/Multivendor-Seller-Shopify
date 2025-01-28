import React, { useState } from "react";
import { Box, Typography, Divider, Modal } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import CustomButton from "../../components/SharedComponents/CustomButton";
import CustomInput from "../../components/SharedComponents/CustomInput";
function Privacy() {
  const [openEmailModal, setOpenEmailModal] = useState(false);
  const [openPasswordModal, setOpenPasswordModal] = useState(false);

  const [newEmail, setNewEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [currentPasswordForChange, setCurrentPasswordForChange] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleEmailModalOpen = () => setOpenEmailModal(true);
  const handleEmailModalClose = () => setOpenEmailModal(false);

  const handlePasswordModalOpen = () => setOpenPasswordModal(true);
  const handlePasswordModalClose = () => setOpenPasswordModal(false);

  const handleSaveEmail = () => {
    console.log("New Email:", newEmail);
    console.log("Current Password:", currentPassword);
    handleEmailModalClose(); // Close the modal after action
  };

  const handleSavePassword = () => {
    console.log("Current Password:", currentPasswordForChange);
    console.log("New Password:", newPassword);
    console.log("Confirm Password:", confirmPassword);
    handlePasswordModalClose(); // Close the modal after action
  };

  return (
    <Box sx={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <Typography
        variant="h3"
        sx={{
          fontWeight: "bold",
          color: "black",
          textAlign: "center",
          marginBottom: "35px",
        }}
      >
        Settings <SettingsIcon className="fs-2"/>
      </Typography>
 

      <Box>
        <Typography variant="h5" sx={{ marginBottom: "20px", fontWeight: "bold", marginTop:"60px" }}>
          Login Details
        </Typography>

        {/* Email Section */}
        <Box sx={{ marginBottom: "30px" }}>
          <Typography variant="body1" sx={{ marginBottom: "15px", fontWeight: "bold" }}>
            Email
          </Typography>
          <CustomInput
            value="zenmerakihelp@gmail.com"
            readOnly={true} // Mark as read-only
            onChange={() => {}}
          />
          <CustomButton
            label="Change email"
            variant="outlined"
            onClick={handleEmailModalOpen} // Open the email modal
            sx={{
              marginTop: "10px",
            }}
          />
        </Box>

        <Divider />

        {/* Password Section */}
        <Box sx={{ marginTop: "30px" }}>
          <Typography variant="body1" sx={{ marginBottom: "15px", fontWeight: "bold" }}>
            Password
          </Typography>
          <CustomInput
            value="•••••••••••••••"
            readOnly={true} // Mark as read-only
            onChange={() => {}}
          />
          <CustomButton
            label="Change password"
            variant="outlined"
            onClick={handlePasswordModalOpen} // Open the password modal
            sx={{
              marginTop: "10px",
            }}
          />
        </Box>
      </Box>

      {/* Modal for Changing Email */}
      <Modal open={openEmailModal} onClose={handleEmailModalClose} aria-labelledby="change-email-modal">
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: "8px",
          }}
        >
          <Typography
            id="change-email-modal"
            variant="h6"
            sx={{ fontWeight: "bold", marginBottom: "20px" }}
          >
            Change Email
          </Typography>
          <CustomInput
            label="New Email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            sx={{ marginBottom: "20px" }}
          />
          <CustomInput
            label="Current Password"
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            sx={{ marginBottom: "20px" }}
          />
          <Box sx={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
            <CustomButton
              label="Cancel"
              variant="outlined"
              onClick={handleEmailModalClose}
              sx={{ color: "gray" }}
            />
            <CustomButton
              label="Save"
              variant="contained"
              onClick={handleSaveEmail} // Trigger save action
            />
          </Box>
        </Box>
      </Modal>

      {/* Modal for Changing Password */}
      <Modal open={openPasswordModal} onClose={handlePasswordModalClose} aria-labelledby="change-password-modal">
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: "8px",
          }}
        >
          <Typography
            id="change-password-modal"
            variant="h6"
            sx={{ fontWeight: "bold", marginBottom: "20px" }}
          >
            Change Password
          </Typography>
          <CustomInput
            label="Current Password"
            type="password"
            value={currentPasswordForChange}
            onChange={(e) => setCurrentPasswordForChange(e.target.value)}
            sx={{ marginBottom: "20px" }}
          />
          <CustomInput
            label="New Password"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            sx={{ marginBottom: "20px" }}
          />
          <CustomInput
            label="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            sx={{ marginBottom: "20px" }}
          />
          <Box sx={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
            <CustomButton
              label="Cancel"
              variant="outlined"
              onClick={handlePasswordModalClose}
              sx={{ color: "gray" }}
            />
            <CustomButton
              label="Save"
              variant="contained"
              onClick={handleSavePassword} // Trigger save action
            />
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}

export default Privacy;
