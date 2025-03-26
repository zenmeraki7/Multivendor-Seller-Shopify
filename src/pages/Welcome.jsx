import React, { useState } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Grid,
  Card,
  CardContent,
  TextField,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import MenuIcon from "@mui/icons-material/Menu";
import {
  Tablet,
  Smartphone,
  Globe,
  Cloud,
  CreditCard,
  TrendingUp,
  Building2,
  Lightbulb,
  Users,
  ArrowUp,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

import "./Welcome.css";
import { Link } from "react-scroll";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/baseUrl";
import ShopNotFound from "../components/ShopNotFound";

function Welcome() {
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const { shop } = useParams();

  const handleClick = () => {
    navigate(`/auth/${shop}/register`);
  };

  const handleLogin = () => {
    navigate(`/auth/${shop}/login`);
  };

  React.useEffect(() => {
    const checkShopExist = async () => {
      setError(false);
      setLoading(true);
      try {
        const response = await axios.post(
          `${BASE_URL}/api/vendor/authenticate-shop`,
          { shop }
        );
        console.log(response.data);
        setError(false);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setError(true);
        setLoading(false);
      }
    };
    checkShopExist();
  }, []);

  const [mobileMenuAnchor, setMobileMenuAnchor] = React.useState(null);

  const openMobileMenu = (event) => {
    setMobileMenuAnchor(event.currentTarget);
  };

  const closeMobileMenu = () => {
    setMobileMenuAnchor(null);
  };

  const styles = {
    container: {
      maxWidth: "1400px",
      margin: "0 auto",
      padding: "64px 24px",
      backgroundColor: "#f8faf8",
    },
    header: {
      textAlign: "center",
      marginBottom: "64px",
    },
    title: {
      fontSize: window.innerWidth < 768 ? "2rem" : "2.5rem",
      fontWeight: "bold",
      marginBottom: "24px",
      background: "linear-gradient(45deg, #173B18, #2E7D32)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      fontFamily: '"Playfair Display", serif',
    },
    subtitle: {
      color: "#666",
      fontSize: window.innerWidth < 768 ? "1rem" : "1.25rem",
      maxWidth: "800px",
      margin: "0 auto",
      lineHeight: 1.6,
    },
    grid: {
      display: "grid",
      gridTemplateColumns: window.innerWidth < 768 ? "1fr" : "repeat(3, 1fr)",
      gap: "32px",
      padding: "0 16px",
    },
    card: {
      backgroundColor: "white",
      borderRadius: "12px",
      padding: "32px",
      textAlign: "center",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      transition: "all 0.3s ease",
      position: "relative",
      overflow: "hidden",
    },
    cardHover: {
      transform: "translateY(-10px)",
      boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
    },
    icon: {
      color: "#173B18",
      marginBottom: "16px",
    },
    cardTitle: {
      fontSize: "1.5rem",
      fontWeight: "bold",
      marginBottom: "16px",
      color: "#333",
    },
    cardDescription: {
      color: "#666",
      fontSize: "1rem",
      lineHeight: 1.6,
      marginBottom: "24px",
    },
    detailsContainer: {
      display: "flex",
      flexDirection: "column",
      gap: "8px",
    },
    detail: {
      backgroundColor: "#f5f5f5",
      padding: "8px 16px",
      borderRadius: "6px",
      fontSize: "0.9rem",
      color: "#555",
      transition: "all 0.3s ease",
    },
    detailHover: {
      backgroundColor: "#e8f5e9",
      color: "#173B18",
    },
    progressBar: {
      position: "absolute",
      top: 0,
      left: 0,
      height: "4px",
      backgroundColor: "#2E7D32",
      width: "0%",
      transition: "width 0.3s ease",
    },
  };

  const dashboardStyles = {
    container: {
      maxWidth: "1400px",
      margin: "0 auto",
      padding: "64px 24px",
      backgroundColor: "#f8faf8",
    },
    header: {
      textAlign: "center",
      marginBottom: "64px",
    },
    title: {
      fontSize: window.innerWidth < 768 ? "2rem" : "2.5rem",
      fontWeight: "bold",
      marginBottom: "24px",
      background: "linear-gradient(45deg, #173B18, #2E7D32)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      fontFamily: '"Playfair Display", serif',
    },
    subtitle: {
      color: "#666",
      fontSize: window.innerWidth < 768 ? "1rem" : "1.25rem",
      maxWidth: "800px",
      margin: "0 auto",
      lineHeight: 1.6,
    },

    grid: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-between",
      gap: "20px",
      padding: "0 16px",
    },
    card: {
      width: "calc(25% - 20px)",
      backgroundColor: "white",
      borderRadius: "12px",
      padding: "32px",
      textAlign: "center",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      transition: "all 0.3s ease",
      position: "relative",
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
    },
    iconContainer: {
      backgroundColor: "#f0f7ff",
      borderRadius: "12px",
      padding: "12px",
      width: "fit-content",
      margin: "0 auto 16px auto",
      transition: "all 0.3s ease",
    },
    iconContainerHover: {
      transform: "scale(1.1)",
      backgroundColor: "#e6f0ff",
    },
    cardTitle: {
      fontSize: "1.5rem",
      fontWeight: "bold",
      marginBottom: "16px",
      color: "#333",
      margin: 0,
    },
    cardDescription: {
      color: "#666",
      fontSize: "1rem",
      lineHeight: 1.6,
      margin: "0 0 24px 0",
      flex: "1",
    },
    button: {
      backgroundColor: "#173B18",
      color: "white",
      border: "none",
      borderRadius: "30px",
      padding: "12px 24px",
      fontSize: "1rem",
      fontWeight: "600",
      cursor: "pointer",
      transition: "all 0.3s ease",
      textTransform: "uppercase",
      letterSpacing: "0.5px",
    },
    buttonHover: {
      backgroundColor: "#2E7D32",
      transform: "translateY(-3px)",
      boxShadow: "0 10px 20px rgba(0,0,0,0.2)",
    },
    progressBar: {
      position: "absolute",
      top: 0,
      left: 0,
      height: "4px",
      backgroundColor: "#2E7D32",
      width: "0%",
      transition: "width 0.3s ease",
    },
    helperText: {
      fontSize: "12px",
      color: "#888",
      marginTop: "12px",
      fontStyle: "italic",
    },
  };

  const [hoveredCard, setHoveredCard] = React.useState(null);
  const [hoveredDetail, setHoveredDetail] = React.useState(null);
  const [hoveredButton, setHoveredButton] = React.useState(null);

  const features = [
    {
      icon: <Building2 size={48} />,
      title: "Our Mission",
      description:
        "To revolutionize the e-commerce landscape by providing innovative solutions that empower businesses to thrive in the digital age.",
      details: ["Market Analysis", "Growth Strategy", "Digital Innovation"],
    },
    {
      icon: <Lightbulb size={48} />,
      title: "Our Vision",
      description:
        "To create a world where every business, regardless of size, has the tools and platform to reach their full potential in the global marketplace.",
      details: ["Global Reach", "Equal Opportunity", "Digital Excellence"],
    },
    {
      icon: <Users size={48} />,
      title: "Our Values",
      description:
        "Built on the foundations of trust, innovation, and customer success, we prioritize long-term partnerships and sustainable growth for our clients.",
      details: ["Trust & Integrity", "Innovation", "Customer Success"],
    },
  ];

  const additionalFeatures = [
    {
      icon: <Tablet />,
      title: "Cross-Platform",
      description:
        "Manage your business seamlessly across all devices with our responsive platform optimized for desktop and mobile.",
    },
    {
      icon: <Globe />,
      title: "Global Reach",
      description:
        "Expand your business globally with multi-currency support and localized content delivery networks.",
    },
    {
      icon: <Cloud />,
      title: "Cloud Storage",
      description:
        "Secure cloud storage solution with automated backups and instant access to your business data anywhere.",
    },
    {
      icon: <Smartphone />,
      title: "Mobile App",
      description:
        "Stay connected on the go with our powerful mobile app featuring all essential business management tools.",
    },
    {
      icon: <CreditCard />,
      title: "Payment Solutions",
      description:
        "Accept payments worldwide with our integrated payment gateway supporting multiple payment methods.",
    },
    {
      icon: <TrendingUp />,
      title: "Growth Tools",
      description:
        "Access powerful marketing and SEO tools to grow your business and reach new customers effectively.",
    },
  ];

  const soldproducts = [
    {
      title: "Top Sold Products",
      description:
        "Track and analyze your best-performing products with detailed insights and sales metrics.",
      icon: "📈",
      buttonText: "VIEW ALL PRODUCTS",
    },
    {
      title: "Recent Registered Sellers",
      description:
        "Monitor new seller registrations and manage your growing marketplace community.",
      icon: "👥",
      buttonText: "VIEW ALL SELLERS",
    },
    {
      title: "Recent Orders",
      description:
        "Stay updated with real-time order notifications and comprehensive order management.",
      icon: "🛍️",
      buttonText: "VIEW ALL ORDERS",
    },
    {
      title: "Out of Stock Products",
      description:
        "Efficiently manage inventory with automated alerts for low-stock and out-of-stock items.",
      icon: "📦",
      buttonText: "VIEW ALL PRODUCTS",
    },
  ];

  const [expandedId, setExpandedId] = useState(null);
  const faqs = [
    {
      id: 1,
      question: "How can I install the app?",
      answer:
        "You can install the app from your device's app store. Search for 'Zen-Meraki' and click the install button. Follow the on-screen instructions to complete the installation.",
    },
    {
      id: 2,
      question: "How can I set the vendor (or sellers) commission?",
      answer:
        "Navigate to the Vendor Management section in your dashboard. Select the commission tab and set your desired percentage. You can set different rates for different product categories.",
    },
    {
      id: 3,
      question:
        "Do I need to approve each vendor request, every time a new vendor request arrives?",
      answer:
        "Yes, for security purposes, each new vendor request requires manual approval. You can find pending requests in the Vendor Approval section of your dashboard.",
    },
    {
      id: 4,
      question:
        "How can I view the total earnings of the vendor and the commission from vendor?",
      answer:
        "Access the Analytics dashboard and select 'Vendor Earnings' from the dropdown menu. You'll see a detailed breakdown of earnings and commissions for each vendor.",
    },
    {
      id: 5,
      question:
        "Can the merchant set individual commission for the vendors added to the store?",
      answer:
        "Yes, merchants can set custom commission rates for individual vendors. This can be done through the Vendor Settings page in your admin dashboard.",
    },
    {
      id: 6,
      question: "How can I add digital (downloadable) product to the store?",
      answer:
        "When creating a new product, select 'Digital Product' as the product type. You can then upload your digital files and set download limits and expiration dates.",
    },
    {
      id: 7,
      question: "Can I add more than one seller at a time?",
      answer:
        "Yes, you can bulk import sellers using our CSV template. Go to Vendor Management and select 'Bulk Import' to get started.",
    },
  ];

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!loading && error) return <ShopNotFound />;

  return loading ? (
    "Loading"
  ) : (
    <div>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: "rgba(23, 59, 24, 0.95)",
          backdropFilter: "blur(8px)",
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              component="a"
              href="#"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: '"Playfair Display", serif',
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "white",
                textDecoration: "none",
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "scale(1.05)",
                  textShadow: "0 0 10px rgba(255,255,255,0.5)",
                },
              }}
            >
              Zen-Meraki
            </Typography>

            <Box sx={{ display: { xs: "flex", md: "none" }, flexGrow: 1 }}>
              <IconButton
                size="large"
                onClick={openMobileMenu}
                color="inherit"
                sx={{
                  transition: "transform 0.2s",
                  "&:hover": { transform: "scale(1.1)" },
                }}
              >
                <MenuIcon />
              </IconButton>

              <Menu
                id="mobile-menu"
                anchorEl={mobileMenuAnchor}
                open={Boolean(mobileMenuAnchor)}
                onClose={closeMobileMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                  "& .MuiPaper-root": {
                    backgroundColor: "rgba(23, 59, 24, 0.95)",
                    backdropFilter: "blur(8px)",
                    boxShadow: "0 4px 30px rgba(0,0,0,0.1)",
                  },
                }}
              >
                {["Features", "About Us", "Contact"].map((page) => (
                  <MenuItem
                    key={page}
                    onClick={closeMobileMenu}
                    sx={{
                      color: "white",
                      "&:hover": { backgroundColor: "rgba(255,255,255,0.1)" },
                    }}
                  >
                    <Link
                      to={page.toLowerCase().replace(" ", "")}
                      smooth={true}
                      duration={500}
                    >
                      {page}
                    </Link>
                  </MenuItem>
                ))}
              </Menu>
            </Box>

            <Typography
              variant="h5"
              component="a"
              href="#"
              sx={{
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: '"Playfair Display", serif',
                fontWeight: 700,
                letterSpacing: { xs: ".1rem", sm: ".3rem" },
                color: "white",
                textDecoration: "none",
                fontSize: { xs: "1.2rem", sm: "1.5rem" },
              }}
            >
              Zen-Meraki
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {["Features", "About Us", "Contact"].map((page) => (
                <Button
                  key={page}
                  onClick={closeMobileMenu}
                  sx={{
                    color: "white",
                    mx: 2,
                    position: "relative",
                    "&::after": {
                      content: '""',
                      position: "absolute",
                      width: "0",
                      height: "2px",
                      bottom: 0,
                      left: "50%",
                      backgroundColor: "white",
                      transition: "all 0.3s ease",
                    },
                    "&:hover::after": {
                      width: "100%",
                      left: "0",
                    },
                  }}
                >
                  <Link
                    to={page.toLowerCase().replace(" ", "")}
                    smooth={true}
                    duration={500}
                  >
                    {page}
                  </Link>
                </Button>
              ))}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <Container maxWidth="xl" sx={{ pt: { xs: 8, md: 12 } }}>
        <Box
          sx={{
            minHeight: "90vh",
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
            px: { xs: 2, sm: 4, md: 5 },
            py: { xs: 4, md: 0 },
          }}
        >
          <Box
            sx={{
              flex: 1,
              textAlign: { xs: "center", md: "left" },
              mb: { xs: 4, md: 0 },
              animation: "fadeInLeft 1s ease-out",
            }}
          >
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: "2.5rem", sm: "3rem", md: "3.5rem" },
                fontWeight: "bold",
                marginBottom: "1.5rem",
                background: "linear-gradient(45deg, #173B18, #2E7D32)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Start Selling in Minutes
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: "1rem", sm: "1.25rem" },
                color: "#666",
                lineHeight: 1.6,
                maxWidth: "600px",
                marginBottom: "2rem",
                mx: { xs: "auto", md: 0 },
              }}
            >
              Empower Your Business and Reach New Heights Today
            </Typography>
            <Box
              sx={{
                display: "flex",
                gap: 2,
                justifyContent: { xs: "center", md: "flex-start" },
              }}
            >
              <Button
                variant="contained"
                onClick={handleLogin}
                sx={{
                  backgroundColor: "#173B18",
                  padding: { xs: "8px 20px", sm: "12px 30px" },
                  borderRadius: "30px",
                  textTransform: "none",
                  fontSize: { xs: "0.9rem", sm: "1.1rem" },
                  transition: "all 0.3s ease",
                  "&:hover": {
                    backgroundColor: "#2E7D32",
                    transform: "translateY(-3px)",
                    boxShadow: "0 10px 20px rgba(0,0,0,0.2)",
                  },
                }}
              >
                Login
              </Button>
              <Button
                variant="contained"
                onClick={handleClick}
                sx={{
                  backgroundColor: "#173B18",
                  padding: { xs: "8px 20px", sm: "12px 30px" },
                  borderRadius: "30px",
                  textTransform: "none",
                  fontSize: { xs: "0.9rem", sm: "1.1rem" },
                  transition: "all 0.3s ease",
                  "&:hover": {
                    backgroundColor: "#2E7D32",
                    transform: "translateY(-3px)",
                    boxShadow: "0 10px 20px rgba(0,0,0,0.2)",
                  },
                }}
              >
                Get Started
              </Button>
            </Box>
          </Box>
          <Box
            sx={{
              flex: 1,
              display: "flex",
              justifyContent: "center",
              animation: "fadeInRight 1s ease-out",
            }}
          >
            <img
              src="https://img.freepik.com/free-vector/online-shopping-abstract-concept-illustration_335657-3714.jpg"
              alt="Seller with laptop"
              style={{
                width: "100%",
                maxWidth: "650px",
                height: "auto",
                borderRadius: "20px",
                transition: "transform 0.3s ease",
              }}
            />
          </Box>
        </Box>
      </Container>

      {/* about us */}
      <div style={styles.container}>
        <div style={styles.header}>
          <h2 style={styles.title}>About Us</h2>
          <p style={styles.subtitle}>
            At Zen-Meraki, we combine innovation with simplicity to empower
            businesses worldwide. Our platform is designed to transform your
            entrepreneurial journey.
          </p>
        </div>

        <div style={styles.grid}>
          {features.map((feature, index) => (
            <div
              key={index}
              style={{
                ...styles.card,
                ...(hoveredCard === index && styles.cardHover),
              }}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div
                style={{
                  ...styles.progressBar,
                  width: hoveredCard === index ? "100%" : "0%",
                }}
              />

              <div style={styles.icon}>{feature.icon}</div>
              <h3 style={styles.cardTitle}>{feature.title}</h3>
              <p style={styles.cardDescription}>{feature.description}</p>

              <div style={styles.detailsContainer}>
                {feature.details.map((detail, idx) => (
                  <div
                    key={idx}
                    style={{
                      ...styles.detail,
                      ...(hoveredDetail === `${index}-${idx}` &&
                        styles.detailHover),
                    }}
                    onMouseEnter={() => setHoveredDetail(`${index}-${idx}`)}
                    onMouseLeave={() => setHoveredDetail(null)}
                  >
                    {detail}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Features Section -  */}
      <div style={styles.container}>
        <div style={styles.header}>
          <h2 style={styles.title}>Our Features</h2>
          <p style={styles.subtitle}>
            Discover the powerful features that help your business grow and
            succeed in the digital marketplace.
          </p>
        </div>

        <div style={styles.grid}>
          {additionalFeatures.map((feature, index) => (
            <div
              key={index}
              style={{
                ...styles.card,
                ...(hoveredCard === index && styles.cardHover),
              }}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div
                style={{
                  ...styles.iconContainer,
                  ...(hoveredCard === index && styles.iconContainerHover),
                }}
              >
                {React.cloneElement(feature.icon, {
                  size: 32,
                  color: "#2E7D32",
                })}
              </div>
              <h3 style={styles.cardTitle}>{feature.title}</h3>
              <p style={styles.cardDescription}>{feature.description}</p>
              <div
                style={{
                  ...styles.progressBar,
                  width: hoveredCard === index ? "100%" : "0%",
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* next section */}
      <div style={dashboardStyles.container}>
        <div style={dashboardStyles.header}>
          <h2 style={dashboardStyles.title}>Marketplace Dashboard</h2>
          <p style={dashboardStyles.subtitle}>
            Take control of your marketplace with our comprehensive dashboard
            featuring real-time analytics and management tools.
          </p>
        </div>

        <div style={dashboardStyles.grid}>
          {soldproducts.map((feature, index) => (
            <div
              key={index}
              style={{
                ...dashboardStyles.card,
                transform: hoveredCard === index ? "translateY(-10px)" : "none",
                boxShadow:
                  hoveredCard === index
                    ? "0 20px 40px rgba(0, 0, 0, 0.1)"
                    : "0 4px 6px rgba(0, 0, 0, 0.1)",
              }}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div
                style={{
                  ...dashboardStyles.progressBar,
                  width: hoveredCard === index ? "100%" : "0%",
                }}
              />

              <div
                style={{
                  ...dashboardStyles.iconContainer,
                  ...(hoveredCard === index
                    ? dashboardStyles.iconContainerHover
                    : {}),
                }}
              >
                <span style={{ fontSize: "32px" }}>{feature.icon}</span>
              </div>

              <h3 style={dashboardStyles.cardTitle}>{feature.title}</h3>
              <p style={dashboardStyles.cardDescription}>
                {feature.description}
              </p>

              <button
                style={{
                  ...dashboardStyles.button,
                  ...(hoveredButton === index
                    ? dashboardStyles.buttonHover
                    : {}),
                }}
                onMouseEnter={() => setHoveredButton(index)}
                onMouseLeave={() => setHoveredButton(null)}
              >
                {feature.buttonText}
              </button>

              <p style={dashboardStyles.helperText}>
                Click on the Button above to View all the Details for all{" "}
                {feature.title.includes("Products")
                  ? "Products"
                  : feature.title.includes("Sellers")
                  ? "Sellers"
                  : "Orders"}
                .
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* faq section */}
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "48px 16px",
          backgroundColor: "#f8faf8",
          borderRadius: "16px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div
          style={{
            backgroundColor: "#173B18",
            padding: "10px",
            borderRadius: "12px 12px 0 0",
            textAlign: "center",
          }}
        >
          <h2
            style={{
              fontSize: "2rem",
              fontWeight: "bold",
              color: "white",
              marginBottom: "8px",
            }}
          >
            Frequently Asked Questions
          </h2>
          <p
            style={{
              color: "#e0f2e9",
              fontSize: "1rem",
            }}
          >
            Find answers to common questions about our platform
          </p>
        </div>

        <div
          style={{
            padding: "24px",
            backgroundColor: "white",
            borderRadius: "0 0 12px 12px",
          }}
        >
          {faqs.map((faq) => (
            <div
              key={faq.id}
              style={{
                borderBottom: "1px solid #e0e0e0",
                transition: "all 0.3s ease",
                ":hover": { backgroundColor: "#f8faf8" },
              }}
            >
              <button
                onClick={() =>
                  setExpandedId(expandedId === faq.id ? null : faq.id)
                }
                style={{
                  width: "100%",
                  padding: "16px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  backgroundColor: "transparent",
                  border: "none",
                  cursor: "pointer",
                  outline: "none",
                }}
              >
                <div
                  style={{ display: "flex", alignItems: "center", gap: "16px" }}
                >
                  <span
                    style={{
                      fontSize: "1.25rem",
                      fontWeight: "bold",
                      color: "#173B18",
                    }}
                  >
                    {faq.id}
                  </span>
                  <h3
                    style={{
                      fontSize: "1.125rem",
                      fontWeight: "600",
                      color: "#333",
                      textAlign: "left",
                    }}
                  >
                    {faq.question}
                  </h3>
                </div>
                {expandedId === faq.id ? (
                  <ChevronUp style={{ color: "#173B18", fontSize: "1.5rem" }} />
                ) : (
                  <ChevronDown
                    style={{ color: "#173B18", fontSize: "1.5rem" }}
                  />
                )}
              </button>

              <div
                style={{
                  padding: "0 16px 16px 64px",
                  maxHeight: expandedId === faq.id ? "200px" : "0",
                  overflow: "hidden",
                  transition: "max-height 0.3s ease, opacity 0.3s ease",
                  opacity: expandedId === faq.id ? "1" : "0",
                }}
              >
                <p
                  style={{
                    color: "#666",
                    fontSize: "1rem",
                    lineHeight: "1.6",
                  }}
                >
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Section */}
      <Container
        style={{
          padding: "48px 16px",
          backgroundColor: "#fff",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
        id="contact"
      >
        <Box style={{ textAlign: "center", marginBottom: "48px" }}>
          <Typography
            variant="h2"
            style={{
              fontSize: window.innerWidth < 600 ? "2rem" : "2.5rem",
              fontWeight: "bold",
              marginBottom: "24px",
              background: "linear-gradient(45deg, #173B18, #2E7D32)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontFamily: '"Playfair Display", serif',
            }}
          >
            Contact Us
          </Typography>
          <Typography
            variant="h5"
            style={{
              color: "#666",
              maxWidth: "800px",
              margin: "0 auto",
              lineHeight: 1.6,
              marginBottom: "48px",
            }}
          >
            Have questions? We'd love to hear from you. Send us a message and
            we'll respond as soon as possible.
          </Typography>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: window.innerWidth < 960 ? "1fr" : "1fr 1fr",
              gap: "24px",
              width: "100%",
            }}
          >
            <div
              style={{
                backgroundColor: "rgba(245, 247, 250, 0.8)",
                padding: window.innerWidth < 960 ? "16px" : "32px",
                borderRadius: "8px",
              }}
            >
              <form noValidate>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="name"
                  label="Your Name"
                  name="name"
                  autoComplete="name"
                  style={{ marginBottom: "24px" }}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  style={{ marginBottom: "24px" }}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="message"
                  label="Your Message"
                  id="message"
                  multiline
                  rows={4}
                  style={{ marginBottom: "24px" }}
                />
                <button
                  style={{
                    width: "100%",
                    backgroundColor: "#173B18",
                    color: "white",
                    padding: window.innerWidth < 960 ? "8px 20px" : "12px 30px",
                    borderRadius: "30px",
                    border: "none",
                    fontSize: window.innerWidth < 960 ? "1rem" : "1.1rem",
                    transition: "all 0.3s ease",
                    cursor: "pointer",
                  }}
                  onMouseOver={(e) => {
                    e.target.style.backgroundColor = "#2E7D32";
                    e.target.style.transform = "translateY(-3px)";
                    e.target.style.boxShadow = "0 10px 20px rgba(0,0,0,0.2)";
                  }}
                  onMouseOut={(e) => {
                    e.target.style.backgroundColor = "#173B18";
                    e.target.style.transform = "translateY(0)";
                    e.target.style.boxShadow = "none";
                  }}
                >
                  Send Message
                </button>
              </form>
            </div>

            <div
              style={{
                backgroundColor: "rgba(245, 247, 250, 0.8)",
                padding: window.innerWidth < 960 ? "16px" : "32px",
                borderRadius: "8px",
              }}
            >
              <div style={{ marginBottom: "32px" }}>
                <Typography
                  variant="h5"
                  style={{
                    marginBottom: "32px",
                    fontWeight: "bold",
                    fontSize: window.innerWidth < 960 ? "1.25rem" : "1.5rem",
                  }}
                >
                  Get in Touch
                </Typography>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "16px",
                  }}
                >
                  <LocationOnIcon
                    style={{
                      color: "#173B18",
                      marginRight: "16px",
                      fontSize: window.innerWidth < 960 ? "24px" : "30px",
                    }}
                  />
                  <Typography
                    style={{
                      color: "#666",
                      fontSize: window.innerWidth < 960 ? "0.875rem" : "1rem",
                    }}
                  >
                    123 Business Avenue, Silicon Valley, CA 94043
                  </Typography>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "16px",
                  }}
                >
                  <EmailIcon
                    style={{
                      color: "#173B18",
                      marginRight: "16px",
                      fontSize: window.innerWidth < 960 ? "24px" : "30px",
                    }}
                  />
                  <Typography
                    style={{
                      color: "#666",
                      fontSize: window.innerWidth < 960 ? "0.875rem" : "1rem",
                    }}
                  >
                    contact@zen-meraki.com
                  </Typography>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "16px",
                  }}
                >
                  <PhoneIcon
                    style={{
                      color: "#173B18",
                      marginRight: "16px",
                      fontSize: window.innerWidth < 960 ? "24px" : "30px",
                    }}
                  />
                  <Typography
                    style={{
                      color: "#666",
                      fontSize: window.innerWidth < 960 ? "0.875rem" : "1rem",
                    }}
                  >
                    +1 (555) 123-4567
                  </Typography>
                </div>
              </div>

              <div>
                <Typography
                  variant="h6"
                  style={{
                    marginBottom: "16px",
                    fontWeight: "bold",
                    fontSize: window.innerWidth < 960 ? "1.1rem" : "1.25rem",
                  }}
                >
                  Business Hours
                </Typography>
                <Typography
                  style={{
                    color: "#666",
                    marginBottom: "8px",
                    fontSize: window.innerWidth < 960 ? "0.875rem" : "1rem",
                  }}
                >
                  Monday - Friday: 9:00 AM - 6:00 PM
                </Typography>
                <Typography
                  style={{
                    color: "#666",
                    fontSize: window.innerWidth < 960 ? "0.875rem" : "1rem",
                  }}
                >
                  Saturday - Sunday: Closed
                </Typography>
              </div>
            </div>
          </div>
        </Box>
      </Container>
    </div>
  );
}

export default Welcome;
