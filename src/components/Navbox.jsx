import React, { useState } from "react";
import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SettingsIcon from "@mui/icons-material/Settings";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LockIcon from "@mui/icons-material/Lock";
import AssignmentIcon from "@mui/icons-material/Assignment";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import FeedbackIcon from "@mui/icons-material/Feedback";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import PaymentIcon from "@mui/icons-material/Payment";
import { useNavigate } from "react-router-dom";

function Navbox() {
  const [activeItem, setActiveItem] = useState("");
  const [expanded, setExpanded] = useState(false);

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const navigate = useNavigate();

  const menuItems = [
    { text: "Overview", icon: <DashboardIcon />, path: "/dashboard" },
    { text: "Orders", icon: <AssignmentIcon />, path: "/dashboard/orders" },
    { text: "Commission", icon: <MonetizationOnIcon />, path: "/dashboard/commission" },
  ];

  return (
    <Box
      sx={{
        width: 300,
        backgroundColor: "#f0f4f8", // Grey background for the entire Navbox
        height: "100vh",
        boxShadow: "2px 0 5px rgba(0, 0, 0, 0.1)",
        display: "flex",
        flexDirection: "column",
        pt: 2,
      }}
    >
      <List>
        {menuItems.map((item) => (
          <ListItem disablePadding key={item.text}>
            <ListItemButton
              onClick={() => {
                setActiveItem(item.text);
                navigate(item.path);
              }}
              sx={{
                backgroundColor: activeItem === item.text ? "#ffffff" : "inherit",
                "&:hover": { backgroundColor: "#ffffff" },
                transition: "background-color 0.3s",
              }}
            >
              <ListItemIcon sx={{ color: activeItem === item.text ? "#3a4b58" : "#556b78" }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.text}
                primaryTypographyProps={{
                  fontWeight: activeItem === item.text ? "bold" : "normal",
                  color: activeItem === item.text ? "#3a4b58" : "#556b78",
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}

        {/* Settings Accordion */}
        <Accordion
          elevation={0}
          expanded={expanded === "settings"}
          onChange={handleAccordionChange("settings")}
          sx={{ backgroundColor: "#f0f4f8" }}
        >
        <AccordionSummary
  expandIcon={<ExpandMoreIcon />}
  sx={{
    backgroundColor: activeItem === "Settings" ? "#ffffff" : "inherit",
  }}
>
  <SettingsIcon sx={{ marginRight: 2, color: "#556b78" }} />
  <Typography sx={{ color: "#556b78", fontWeight: "normal" }}>Settings</Typography>
</AccordionSummary>

          <AccordionDetails sx={{ backgroundColor: "#f0f4f8" }}>
            <List disablePadding>
            <ListItem disablePadding>
  <ListItemButton
    onClick={() => {
      setActiveItem("Account");
      navigate("/dashboard/sellers");
    }}
    sx={{
      backgroundColor: activeItem === "Account" ? "#ffffff" : "inherit",
      "&:hover": { backgroundColor: "#ffffff" },
    }}
  >
    <ListItemIcon>
      <AccountCircleIcon />
    </ListItemIcon>
    <ListItemText primary="Account" />
  </ListItemButton>
</ListItem>

<ListItem disablePadding>
  <ListItemButton
    onClick={() => {
      setActiveItem("Privacy");
      navigate("/dashboard/privacy");
    }}
    sx={{
      backgroundColor: activeItem === "Privacy" ? "#ffffff" : "inherit",
      "&:hover": { backgroundColor: "#ffffff" },
    }}
  >
    <ListItemIcon>
      <LockIcon />
    </ListItemIcon>
    <ListItemText primary="Privacy" />
  </ListItemButton>
</ListItem>


              {/* Payment Details */}
              <ListItem disablePadding>
                <ListItemButton
                  onClick={() => {
                    setActiveItem("Payment Details");
                    navigate("/dashboard/payment-details");
                  }}
                  sx={{
                    backgroundColor: activeItem === "Payment Details" ? "#ffffff" : "inherit",
                    "&:hover": { backgroundColor: "#ffffff" },
                  }}
                >
                  <ListItemIcon>
                    <PaymentIcon />
                  </ListItemIcon>
                  <ListItemText primary="Payment Details" />
                </ListItemButton>
              </ListItem>

              {/* Feedback */}
              <ListItem disablePadding>
                <ListItemButton
                  onClick={() => {
                    setActiveItem("Feedback");
                    navigate("/dashboard/feedback");
                  }}
                  sx={{
                    backgroundColor: activeItem === "Feedback" ? "#ffffff" : "inherit",
                    "&:hover": { backgroundColor: "#ffffff" },
                  }}
                >
                  <ListItemIcon>
                    <FeedbackIcon />
                  </ListItemIcon>
                  <ListItemText primary="Feedback" />
                </ListItemButton>
              </ListItem>

              {/* Merchant Notifications */}
              <ListItem disablePadding>
                <ListItemButton
                  onClick={() => {
                    setActiveItem("Merchant Notifications");
                    navigate("/dashboard/merchant-notifications");
                  }}
                  sx={{
                    backgroundColor: activeItem === "Merchant Notifications" ? "#ffffff" : "inherit",
                    "&:hover": { backgroundColor: "#ffffff" },
                  }}
                >
                  <ListItemIcon>
                    <NotificationsActiveIcon />
                  </ListItemIcon>
                  <ListItemText primary="Merchant Notifications" />
                </ListItemButton>
              </ListItem>

            </List>
          </AccordionDetails>
        </Accordion>
      </List>
    </Box>
  );
}

export default Navbox;
