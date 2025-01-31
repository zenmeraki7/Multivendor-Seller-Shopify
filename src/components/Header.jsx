import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

import NotificationsIcon from "@mui/icons-material/Notifications";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear token
    navigate("/login"); // Redirect to login page
  };

  return (
    <>
      <AppBar position="sticky" sx={{ backgroundColor: "#405D72" }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, ml: 3 }}>
            Demo-Zen-Meraki
          </Typography>

          <IconButton color="inherit" sx={{ mr: 3 }}>
            <NotificationsIcon />
          </IconButton>

          <Button
            color="inherit"
            sx={{ mr: 3, textTransform: "none" }}
            onClick={() => setOpen(true)}
          >
            <LogoutIcon /> Logout
          </Button>

          <Button
            color="inherit"
            className="fs-1"
            sx={{ mr: 3 }}
            onClick={() => navigate("/dashboard/sellers")}
          >
            <PersonIcon />
          </Button>
        </Toolbar>
      </AppBar>

      {/* Logout Confirmation Modal */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Confirm Logout</DialogTitle>
        <DialogContent>Are you sure you want to log out?</DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleLogout} color="error">
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default Header;
