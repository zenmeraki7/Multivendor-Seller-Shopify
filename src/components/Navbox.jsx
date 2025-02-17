import React, { useState } from "react";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Typography,
  alpha,
} from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import WidgetsIcon from "@mui/icons-material/Widgets";
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
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useLocation, useNavigate } from "react-router-dom";

function Navbox() {
  const [expanded, setExpanded] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleExpand = (panel) => {
    setExpanded(expanded === panel ? "" : panel);
  };

  const menuItems = [
    { text: "Overview", icon: <DashboardIcon />, path: "/dashboard" },
    { text: "Orders", icon: <AssignmentIcon />, path: "/dashboard/orders" },
    { text: "Commission", icon: <MonetizationOnIcon />, path: "/dashboard/commission" },
    {
      text: "Manage Products",
      icon: <SettingsIcon />,
      subItems: [
        { text: "Product List", icon: <WidgetsIcon />, path: "/dashboard/product-list" },
        { text: "Add Product", icon: <AddShoppingCartIcon />, path: "/dashboard/add-product" },
      ],
    },
    { text: "Transaction", icon: <ReceiptLongIcon />, path: "/dashboard/transaction" },
    { text: "Review", icon: <ReviewsIcon />, path: "/dashboard/review" },
    {
      text: "Settings",
      icon: <SettingsIcon />,
      subItems: [
        { text: "Account", icon: <AccountCircleIcon />, path: "/dashboard/sellers" },
        { text: "Privacy", icon: <LockIcon />, path: "/dashboard/privacy" },
        { text: "Payment Details", icon: <PaymentIcon />, path: "/dashboard" },
        { text: "Feedback", icon: <FeedbackIcon />, path: "/dashboard" },
        { text: "Merchant Notifications", icon: <NotificationsActiveIcon />, path: "/dashboard" },
      ],
    },
  ];

  const renderMenuItems = (items, depth = 0) =>
    items.map((item) => {
      const isActive = location.pathname === item.path;
      const isExpanded = expanded === item.text;

      return (
        <React.Fragment key={item.text}>
          <ListItem
            disablePadding
            sx={{
              mb: 0.5,
              pl: depth * 2,
            }}
          >
            <ListItemButton
              onClick={() => item.subItems ? handleExpand(item.text) : navigate(item.path)}
              sx={{
                borderRadius: 2,
                backgroundColor: isActive 
                  ? (theme) => alpha(theme.palette.primary.main, 0.1)
                  : 'transparent',
                color: isActive 
                  ? (theme) => theme.palette.primary.main
                  : (theme) => theme.palette.text.primary,
                '&:hover': {
                  backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.08),
                },
                transition: 'all 0.2s ease-in-out',
                position: 'relative',
                py: 1.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 40,
                  color: isActive 
                    ? (theme) => theme.palette.primary.main
                    : (theme) => theme.palette.text.secondary,
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: isActive || isExpanded ? 600 : 500,
                      fontSize: '0.875rem',
                    }}
                  >
                    {item.text}
                  </Typography>
                }
              />
              {item.subItems && (
                isExpanded ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />
              )}
            </ListItemButton>
          </ListItem>
          {item.subItems && (
            <Collapse in={isExpanded} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {renderMenuItems(item.subItems, depth + 1)}
              </List>
            </Collapse>
          )}
        </React.Fragment>
      );
    });

  return (
    <Box
      sx={{
        width: 280,
        height: '100vh',
        backgroundColor: (theme) => theme.palette.background.paper,
        borderRight: (theme) => `1px solid ${theme.palette.divider}`,
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'auto',
        '&::-webkit-scrollbar': {
          width: 6,
        },
        '&::-webkit-scrollbar-track': {
          backgroundColor: 'transparent',
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.1),
          borderRadius: 3,
          '&:hover': {
            backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.2),
          },
        },
      }}
    >
      <List sx={{ p: 2 }}>
        {renderMenuItems(menuItems)}
      </List>
    </Box>
  );
}

export default Navbox;