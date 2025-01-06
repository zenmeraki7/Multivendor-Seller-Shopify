import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  IconButton,
  Box,
  useMediaQuery,
} from "@mui/material";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import LoginIcon from '@mui/icons-material/Login';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import HomeIcon from '@mui/icons-material/Home';
export default function Header() {
  const [openMenu, setOpenMenu] = useState(false);
  const isMobile = useMediaQuery("(max-width: 600px)");

  const toggleMenu = () => {
    setOpenMenu((prev) => !prev);
  };

  return (
    <AppBar position="sticky" sx={{ backgroundColor: "#1976d2" }}>
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          padding: "10px 20px",
        }}
      >
        {/* Logo */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <img
            src="https://cdn.pixabay.com/photo/2020/12/10/12/33/laptop-5820171_1280.png" // Replace with your logo URL
            alt="Logo"
            style={{ height: "40px", marginRight: "10px" }}
          />
          <Typography
            variant="h6"
            sx={{ fontWeight: "bold", fontSize: "24px", color: "white" }}
          >
            Vendor-Zen-Meraki
          </Typography>
        </Box>

        {/* Desktop Menu */}
        {!isMobile && (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Button
              component={Link}
              to="/login"
              sx={{ color: "white", marginRight: 3, fontWeight: "500" }}
            >
              <LoginIcon/>Login
            </Button>
            <Button
              component={Link}
              to="/register"
              sx={{ color: "white", fontWeight: "500" }}
            >
             <HowToRegIcon/> Register
            </Button>
            <Button
              component={Link}
              to="/"
              sx={{ color: "white", marginRight: 3, fontWeight: "500" }}
            >
              <HomeIcon/>Home
            </Button>
          </Box>
        )}

        {/* Mobile Menu Icon */}
        {isMobile && (
          <IconButton sx={{ color: "white" }} onClick={toggleMenu}>
            <MenuIcon />
          </IconButton>
        )}
      </Toolbar>

      {/* Mobile Menu (Drawer) */}
      {isMobile && openMenu && (
        <Box
          sx={{
            position: "absolute",
            top: "64px",
            right: "0",
            backgroundColor: "white",
            width: "100%",
            zIndex: 999,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              padding: "10px 20px",
            }}
          >
            <Button
              component={Link}
              to="/login"
              sx={{
                textAlign: "center",
                padding: "10px",
                fontWeight: "500",
                borderBottom: "1px solid #ccc",
              }}
              onClick={() => setOpenMenu(false)}
            >
             <LoginIcon/> Login
            </Button>
            <Button
              component={Link}
              to="/register"
              sx={{ textAlign: "center", padding: "10px", fontWeight: "500" }}
              onClick={() => setOpenMenu(false)}
            >
              <HowToRegIcon/> Register
            </Button>
            <Button
              component={Link}
              to="/"
              sx={{
                textAlign: "center",
                padding: "10px",
                fontWeight: "500",
                borderBottom: "1px solid #ccc",
              }}
              onClick={() => setOpenMenu(false)}
            >
             <HomeIcon/> Home
            </Button>
          </Box>
        </Box>
      )}
    </AppBar>
  );
}
