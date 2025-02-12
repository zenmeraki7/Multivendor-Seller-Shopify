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
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import WidgetsIcon from "@mui/icons-material/Widgets";
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
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import ReviewsIcon from '@mui/icons-material/Reviews';
import { useLocation, useNavigate } from "react-router-dom";

function Navbox() {
  const [expanded, setExpanded] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : "");
  };

  const menuItems = [
    { text: "Overview", icon: <DashboardIcon />, path: "/dashboard" },
    { text: "Orders", icon: <AssignmentIcon />, path: "/dashboard/orders" },
    {
      text: "Commission",
      icon: <MonetizationOnIcon />,
      path: "/dashboard/commission",
    },
    {
      text: "Manage Products",
      icon: <SettingsIcon />,
      subItems: [
        {
          text: "Product List",
          icon: <WidgetsIcon />,
          path: "/dashboard/product-list",
        },
        {
          text: "Add Product",
          icon: <AddShoppingCartIcon />,
          path: "/dashboard/add-product",
        },
      ],
    },
    { text: "Transcation", icon: <ReceiptLongIcon />, path: "/dashboard/transaction" },
    { text: "Review", icon: <ReviewsIcon />, path: "/dashboard/review" },
    {
      text: "Settings",
      icon: <SettingsIcon />,
      subItems: [
        {
          text: "Account",
          icon: <AccountCircleIcon />,
          path: "/dashboard/sellers",
        },
        { text: "Privacy", icon: <LockIcon />, path: "/dashboard/privacy" },
        { text: "Payment Details", icon: <PaymentIcon />, path: "/dashboard" },
        { text: "Feedback", icon: <FeedbackIcon />, path: "/dashboard" },
        {
          text: "Merchant Notifications",
          icon: <NotificationsActiveIcon />,
          path: "/dashboard",
        },
      ],
    },
  ];

  const renderMenuItems = (items, depth = 0) =>
    items.map((item) => (
      <React.Fragment key={item.text}>
        {item.subItems ? (
          <Accordion
            elevation={0}
            expanded={expanded === item.text}
            onChange={handleAccordionChange(item.text)}
            sx={{
              boxShadow: "none",
              "&:before": { display: "none" }, // Remove the default border
              color: "#000",
              background: "#e0e0e0",
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon sx={{ color: "#000" }} />}
              sx={{
                "&:hover": { backgroundColor: "#e0e0e0" }, // Hover effect
                borderRadius: 1, // Rounded corners
              }}
            >
              <ListItemIcon sx={{ minWidth: "40px" }}>{item.icon}</ListItemIcon>
              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                {item.text}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <List
                disablePadding
                sx={{ display: "flex", flexDirection: "column", gap: "10px" }}
              >
                {renderMenuItems(item.subItems, depth + 1)}
              </List>
            </AccordionDetails>
          </Accordion>
        ) : (
          <ListItem disablePadding sx={{}}>
            <ListItemButton
              onClick={() => item.path && navigate(item.path)}
              sx={{
                borderRadius: 1, // Rounded corners
                background:
                  location.pathname === item.path
                    ? "linear-gradient(45deg, #556cd6, #19857b)"
                    : "#e0e0e0", // Active item background
                "&:hover": { backgroundColor: "#e0e0e0" }, // Hover effect
                transition: "background-color 0.2s",
                color: location.pathname === item.path ? "#fff" : "#000",
              }}
            >
              <ListItemIcon sx={{ minWidth: "40px" }}>{item.icon}</ListItemIcon>
              <ListItemText
                primary={item.text}
                primaryTypographyProps={{
                  fontWeight: location.pathname === item.path ? 600 : 500, // Bold for active item
                }}
              />
            </ListItemButton>
          </ListItem>
        )}
      </React.Fragment>
    ));

  return (
    <Box
      sx={{
        width: 300,
        backgroundColor: "#f5f5f5",
        height: "91vh",
        boxShadow: "2px 0 5px rgba(0, 0, 0, 0.1)",
        display: "flex",
        flexDirection: "column",
        p: 0.5,
        overflowY: "auto",
        "&::-webkit-scrollbar": {
          width: "4px",
        },
        "&::-webkit-scrollbar-track": {
          backgroundColor: "#f5f5f5",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "#bdbdbd",
          borderRadius: "4px",
          "&:hover": {
            backgroundColor: "#9e9e9e",
          },
        },
      }}
    >
      <List sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {renderMenuItems(menuItems)}
      </List>
    </Box>
  );
}

export default Navbox;
