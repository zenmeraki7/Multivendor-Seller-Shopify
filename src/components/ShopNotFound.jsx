import React from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Paper,
  Grid,
  useTheme,
  useMediaQuery,
  Stack,
} from "@mui/material";
// import StorefrontOffIcon from "@mui/icons-material/StorefrontOff";
import SearchIcon from "@mui/icons-material/Search";
import HomeIcon from "@mui/icons-material/Home";
import { motion } from "framer-motion";

const ShopNotFound = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Container maxWidth="md">
      <Box
        component={Paper}
        elevation={3}
        sx={{
          mt: 8,
          p: { xs: 3, sm: 6 },
          borderRadius: 2,
          textAlign: "center",
          backgroundColor: "background.paper",
          overflow: "hidden",
          position: "relative",
        }}
      >
        {/* Decorative background elements */}
        <Box
          sx={{
            position: "absolute",
            top: -10,
            right: -10,
            width: 120,
            height: 120,
            borderRadius: "50%",
            bgcolor: "primary.light",
            opacity: 0.1,
            zIndex: 0,
          }}
        />
        <Box
          sx={{
            position: "absolute",
            bottom: -20,
            left: -20,
            width: 150,
            height: 150,
            borderRadius: "50%",
            bgcolor: "secondary.light",
            opacity: 0.1,
            zIndex: 0,
          }}
        />

        <Box
          component={motion.div}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          sx={{ position: "relative", zIndex: 1 }}
        >
          {/* <StorefrontOffIcon
            sx={{
              fontSize: { xs: 80, sm: 120 },
              color: "primary.main",
              mb: 2,
            }}
          /> */}

          <Typography
            variant={isMobile ? "h4" : "h3"}
            component="h1"
            gutterBottom
            fontWeight="bold"
            sx={{ color: "text.primary" }}
          >
            Shop Not Found
          </Typography>

          <Typography
            variant="body1"
            color="text.secondary"
            paragraph
            sx={{ maxWidth: "600px", mx: "auto" }}
          >
            We couldn't find the shop you're looking for. It might have been
            moved, renamed, or doesn't exist. Please check the URL or try one of
            the options below.
          </Typography>
          <Stack justifyContent={"center"} alignItems={"center"}>
            <img
              style={{ width: "300px" }}
              src="/public/Gemini_Generated_Image_wvgxjlwvgxjlwvgx.jpeg"
              alt=""
            />
          </Stack>
        </Box>
      </Box>

      {/* Help text */}
      <Box sx={{ mt: 4, textAlign: "center" }}>
        <Typography variant="body2" color="text.secondary">
          Need help?{" "}
          <Button color="primary" size="small" sx={{ textTransform: "none" }}>
            Contact Support
          </Button>
        </Typography>
      </Box>
    </Container>
  );
};

export default ShopNotFound;
