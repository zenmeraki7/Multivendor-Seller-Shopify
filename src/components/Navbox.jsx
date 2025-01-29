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
import WidgetsIcon from "@mui/icons-material/Widgets";
import AssignmentIcon from "@mui/icons-material/Assignment";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
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
          <React.Fragment key={item.text}>
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => {
                  setActiveItem(item.text); // Set the active item
                  if (item.path) navigate(item.path);
                }}
                sx={{
                  backgroundColor:
                    activeItem === item.text ? "#ffffff" : "inherit", // White background for the active item
                  "&:hover": {
                    backgroundColor: "#ffffff", // White background on hover
                  },
                  transition: "background-color 0.3s",
                }}
              >
                <ListItemIcon
                  sx={{
                    color: activeItem === item.text ? "#3a4b58" : "#556b78",
                  }}
                >
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
            {item.text === "Configuration" || item.text === "Sellers" ? (
              <Divider sx={{ marginY: 1 }} />
            ) : null}
          </React.Fragment>
        ))}

        {/* Products Accordion */}
        <Accordion
          elevation={0}
          expanded={expanded === "products"}
          onChange={handleAccordionChange("products")}
          sx={{
            backgroundColor: "#f0f4f8", // Grey background for the accordion
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            sx={{
              backgroundColor:
                activeItem === "Products" ? "#ffffff" : "inherit", // White background for the active accordion
            }}
          >
            <WidgetsIcon sx={{ marginRight: 2 }} />
            <Typography>Products</Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ backgroundColor: "#f0f4f8" }}>
            <List disablePadding>
              <ListItem disablePadding>
                <ListItemButton
                  onClick={() => {
                    setActiveItem("Add Products"); // Set the active item
                    navigate("/dashboard/add-product");
                  }}
                  sx={{
                    backgroundColor:
                      activeItem === "Add Products" ? "#ffffff" : "inherit", // White background for the active item
                    "&:hover": {
                      backgroundColor: "#ffffff", // White background on hover
                    },
                  }}
                >
                  <ListItemIcon>
                    <AddShoppingCartIcon />
                  </ListItemIcon>
                  <ListItemText primary="Add Products" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton
                  onClick={() => {
                    setActiveItem("Product Manage"); // Set the active item
                    navigate("/dashboard/product-list");
                  }}
                  sx={{
                    backgroundColor:
                      activeItem === "Product Manage" ? "#ffffff" : "inherit", // White background for the active item
                    "&:hover": {
                      backgroundColor: "#ffffff", // White background on hover
                    },
                  }}
                >
                  <ListItemIcon>
                    <WidgetsIcon />
                  </ListItemIcon>
                  <ListItemText primary="Product Manage" />
                </ListItemButton>
              </ListItem>
            </List>
          </AccordionDetails>
        </Accordion>

        {/* Settings Accordion */}
        <Accordion
          elevation={0}
          expanded={expanded === "settings"}
          onChange={handleAccordionChange("settings")}
          sx={{
            backgroundColor: "#f0f4f8", // Grey background for the accordion
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            sx={{
              backgroundColor:
                activeItem === "Settings" ? "#ffffff" : "inherit", // White background for the active accordion
            }}
          >
            <SettingsIcon sx={{ marginRight: 2 }} />
            <Typography>Settings</Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ backgroundColor: "#f0f4f8" }}>
            <List disablePadding>
              <ListItem disablePadding>
                <ListItemButton
                  onClick={() => {
                    setActiveItem("Account"); // Set the active item
                    navigate("/dashboard/sellers");
                  }}
                  sx={{
                    backgroundColor:
                      activeItem === "Account" ? "#ffffff" : "inherit", // White background for the active item
                    "&:hover": {
                      backgroundColor: "#ffffff", // White background on hover
                    },
                  }}
                >
                  <ListItemText primary="Account" sx={{ pl: 4 }} />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton
                  onClick={() => {
                    setActiveItem("Privacy"); // Set the active item
                    navigate("/dashboard/privacy");
                  }}
                  sx={{
                    backgroundColor:
                      activeItem === "Privacy" ? "#ffffff" : "inherit", // White background for the active item
                    "&:hover": {
                      backgroundColor: "#ffffff", // White background on hover
                    },
                  }}
                >
                  <ListItemText primary="Privacy" sx={{ pl: 4 }} />
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