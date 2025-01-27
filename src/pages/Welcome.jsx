import * as React from "react";
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
} from "@mui/material";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import EmojiObjectsIcon from "@mui/icons-material/EmojiObjects";
import GroupsIcon from "@mui/icons-material/Groups";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import AutoGraphIcon from "@mui/icons-material/AutoGraph";
import SecurityIcon from "@mui/icons-material/Security";
import SpeedIcon from "@mui/icons-material/Speed";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import IntegrationInstructionsIcon from "@mui/icons-material/IntegrationInstructions";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import MenuIcon from "@mui/icons-material/Menu";

import "./Welcome.css";
const pages = ["Features", "About Us", "Contact" ,];
import { Link } from "react-scroll";
import { useNavigate } from "react-router-dom";
function Welcome() {

    const navigate = useNavigate(); 

    const handleClick = () => {
        navigate("/register"); 
      };
      const handleLogin = () => {
        navigate("/login");
      }

  const [mobileMenuAnchor, setMobileMenuAnchor] = React.useState(null);

  const openMobileMenu = (event) => {
    setMobileMenuAnchor(event.currentTarget);
  };

  const closeMobileMenu = () => {
    setMobileMenuAnchor(null);
  };

  return (
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
                {pages.map((page) => (
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
                letterSpacing: ".3rem",
                color: "white",
                textDecoration: "none",
              }}
            >
              Zen-Meraki
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              <Button
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
                <Link to="features" smooth={true} duration={500}>
                  Features
                </Link>
              </Button>

              <Button
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
                <Link to="about" smooth={true} duration={500}>
                  About Us
                </Link>
              </Button>

              <Button
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
                <Link to="contact" smooth={true} duration={500}>
                  Contact
                </Link>
              </Button>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <Container maxWidth="xl" sx={{ pt: 12 }}>
        <div
          className="row p-5"
          style={{
            minHeight: "90vh",
            display: "flex",
            alignItems: "center",
            marginLeft: "80px",
          }}
        >
          <div
            className="col"
            style={{
              animation: "fadeInLeft 1s ease-out",
            }}
          >
            <h1
              style={{
                fontSize: "3.5rem",
                fontWeight: "bold",
                marginBottom: "1.5rem",
                background: "linear-gradient(45deg, #173B18, #2E7D32)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Start Selling in Minutes
            </h1>
            <p
              style={{
                fontSize: "1.25rem",
                color: "#666",
                lineHeight: "1.6",
                maxWidth: "600px",
                marginBottom: "2rem",
              }}
            >
              Empower Your Business and Reach New Heights Today
            </p>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#173B18",
                padding: "12px 30px",
                borderRadius: "30px",
                textTransform: "none",
                fontSize: "1.1rem",
                transition: "all 0.3s ease",
                "&:hover": {
                  backgroundColor: "#2E7D32",
                  transform: "translateY(-3px)",
                  boxShadow: "0 10px 20px rgba(0,0,0,0.2)",
                },
              }}
              onClick={handleLogin}
            >
            Login
            </Button>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#173B18",
                padding: "12px 30px",
                borderRadius: "30px",
                textTransform: "none",
                fontSize: "1.1rem",
                transition: "all 0.3s ease",
              marginLeft: "10px",
                "&:hover": {
                  backgroundColor: "#2E7D32",
                  transform: "translateY(-3px)",
                  boxShadow: "0 10px 20px rgba(0,0,0,0.2)",
                },
              }}
              onClick={handleClick}
            >
              Get Started
            </Button>
          </div>
          <div
            className="col"
            style={{
              animation: "fadeInRight 1s ease-out",
            }}
          >
            <img
              src="https://img.freepik.com/free-vector/online-shopping-abstract-concept-illustration_335657-3714.jpg?t=st=1737969214~exp=1737972814~hmac=a9da301ec0dfb7e7eb791cb0798427d2e76e4fcf758b7b310c42e0b6941770f7&w=740"
              alt="Seller with laptop"
              style={{
                width: "650px",
                height: "650px",
                borderRadius: "20px",
                // boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                transition: "transform 0.3s ease",
                "&:hover": {
                  transform: "scale(1.02)",
                },
              }}
            />
          </div>
        </div>
      </Container>
      <Container
        maxWidth="xl"
        sx={{ py: 12, backgroundColor: "rgba(245, 247, 250, 0.8)" }}
        id="about"
      >
        <Box sx={{ textAlign: "center", mb: 8 }}>
          <Typography
            variant="h2"
            sx={{
              fontSize: "2.5rem",
              fontWeight: "bold",
              mb: 3,
              background: "linear-gradient(45deg, #173B18, #2E7D32)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontFamily: '"Playfair Display", serif',
            }}
          >
            About Us
          </Typography>
          <Typography
            variant="h5"
            sx={{
              color: "#666",
              maxWidth: "800px",
              margin: "0 auto",
              lineHeight: 1.6,
              mb: 6,
            }}
          >
            At Zen-Meraki, we combine innovation with simplicity to empower
            businesses worldwide.
          </Typography>

          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Card
                sx={{
                  height: "100%",
                  transition: "transform 0.3s ease-in-out",
                  "&:hover": {
                    transform: "translateY(-10px)",
                    boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                  },
                }}
              >
                <CardContent sx={{ p: 4, textAlign: "center" }}>
                  <BusinessCenterIcon
                    sx={{ fontSize: 60, color: "#173B18", mb: 2 }}
                  />
                  <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>
                    Our Mission
                  </Typography>
                  <Typography sx={{ color: "#666" }}>
                    To revolutionize the e-commerce landscape by providing
                    innovative solutions that empower businesses to thrive in
                    the digital age.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={4}>
              <Card
                sx={{
                  height: "100%",
                  transition: "transform 0.3s ease-in-out",
                  "&:hover": {
                    transform: "translateY(-10px)",
                    boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                  },
                }}
              >
                <CardContent sx={{ p: 4, textAlign: "center" }}>
                  <EmojiObjectsIcon
                    sx={{ fontSize: 60, color: "#173B18", mb: 2 }}
                  />
                  <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>
                    Our Vision
                  </Typography>
                  <Typography sx={{ color: "#666" }}>
                    To create a world where every business, regardless of size,
                    has the tools and platform to reach their full potential in
                    the global marketplace.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={4}>
              <Card
                sx={{
                  height: "100%",
                  transition: "transform 0.3s ease-in-out",
                  "&:hover": {
                    transform: "translateY(-10px)",
                    boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                  },
                }}
              >
                <CardContent sx={{ p: 4, textAlign: "center" }}>
                  <GroupsIcon sx={{ fontSize: 60, color: "#173B18", mb: 2 }} />
                  <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>
                    Our Values
                  </Typography>
                  <Typography sx={{ color: "#666" }}>
                    Built on the foundations of trust, innovation, and customer
                    success, we prioritize long-term partnerships and
                    sustainable growth for our clients.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Container>
      <Container
        maxWidth="xl"
        sx={{ py: 12, backgroundColor: "#fff" }}
        id="features"
      >
        <Box sx={{ textAlign: "center", mb: 8 }}>
          <Typography
            variant="h2"
            sx={{
              fontSize: "2.5rem",
              fontWeight: "bold",
              mb: 3,
              background: "linear-gradient(45deg, #173B18, #2E7D32)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontFamily: '"Playfair Display", serif',
            }}
          >
            Our Features
          </Typography>
          <Typography
            variant="h5"
            sx={{
              color: "#666",
              maxWidth: "800px",
              margin: "0 auto",
              lineHeight: 1.6,
              mb: 6,
            }}
          >
            Discover the powerful features that help your business grow and
            succeed in the digital marketplace.
          </Typography>

          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Card
                sx={{
                  height: "100%",
                  transition: "transform 0.3s ease-in-out",
                  "&:hover": {
                    transform: "translateY(-10px)",
                    boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                  },
                }}
              >
                <CardContent sx={{ p: 4, textAlign: "center" }}>
                  <AutoGraphIcon
                    sx={{ fontSize: 60, color: "#173B18", mb: 2 }}
                  />
                  <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>
                    Smart Analytics
                  </Typography>
                  <Typography sx={{ color: "#666" }}>
                    Gain valuable insights with our advanced analytics
                    dashboard. Track sales, monitor customer behavior, and make
                    data-driven decisions.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={4}>
              <Card
                sx={{
                  height: "100%",
                  transition: "transform 0.3s ease-in-out",
                  "&:hover": {
                    transform: "translateY(-10px)",
                    boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                  },
                }}
              >
                <CardContent sx={{ p: 4, textAlign: "center" }}>
                  <SecurityIcon
                    sx={{ fontSize: 60, color: "#173B18", mb: 2 }}
                  />
                  <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>
                    Secure Platform
                  </Typography>
                  <Typography sx={{ color: "#666" }}>
                    Enterprise-grade security with advanced encryption, fraud
                    detection, and secure payment processing to protect your
                    business.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={4}>
              <Card
                sx={{
                  height: "100%",
                  transition: "transform 0.3s ease-in-out",
                  "&:hover": {
                    transform: "translateY(-10px)",
                    boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                  },
                }}
              >
                <CardContent sx={{ p: 4, textAlign: "center" }}>
                  <SpeedIcon sx={{ fontSize: 60, color: "#173B18", mb: 2 }} />
                  <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>
                    Lightning Fast
                  </Typography>
                  <Typography sx={{ color: "#666" }}>
                    Optimized performance ensures quick loading times and smooth
                    operations, providing an excellent user experience.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={4}>
              <Card
                sx={{
                  height: "100%",
                  transition: "transform 0.3s ease-in-out",
                  "&:hover": {
                    transform: "translateY(-10px)",
                    boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                  },
                }}
              >
                <CardContent sx={{ p: 4, textAlign: "center" }}>
                  <SupportAgentIcon
                    sx={{ fontSize: 60, color: "#173B18", mb: 2 }}
                  />
                  <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>
                    24/7 Support
                  </Typography>
                  <Typography sx={{ color: "#666" }}>
                    Round-the-clock customer support to help you resolve issues
                    and maximize your business potential.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={4}>
              <Card
                sx={{
                  height: "100%",
                  transition: "transform 0.3s ease-in-out",
                  "&:hover": {
                    transform: "translateY(-10px)",
                    boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                  },
                }}
              >
                <CardContent sx={{ p: 4, textAlign: "center" }}>
                  <IntegrationInstructionsIcon
                    sx={{ fontSize: 60, color: "#173B18", mb: 2 }}
                  />
                  <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>
                    Easy Integration
                  </Typography>
                  <Typography sx={{ color: "#666" }}>
                    Seamlessly integrate with your existing tools and platforms
                    through our comprehensive API and plugins.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={4}>
              <Card
                sx={{
                  height: "100%",
                  transition: "transform 0.3s ease-in-out",
                  "&:hover": {
                    transform: "translateY(-10px)",
                    boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                  },
                }}
              >
                <CardContent sx={{ p: 4, textAlign: "center" }}>
                  <AnalyticsIcon
                    sx={{ fontSize: 60, color: "#173B18", mb: 2 }}
                  />
                  <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>
                    Custom Reports
                  </Typography>
                  <Typography sx={{ color: "#666" }}>
                    Generate detailed custom reports to track your business
                    metrics and measure success on your terms.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Container>
      <Container
        maxWidth="xl"
        sx={{ py: 12, backgroundColor: "#fff" }}
        id="contact"
      >
        <Box sx={{ textAlign: "center", mb: 8 }}>
          <Typography
            variant="h2"
            sx={{
              fontSize: "2.5rem",
              fontWeight: "bold",
              mb: 3,
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
            sx={{
              color: "#666",
              maxWidth: "800px",
              margin: "0 auto",
              lineHeight: 1.6,
              mb: 6,
            }}
          >
            Have questions? We'd love to hear from you. Send us a message and
            we'll respond as soon as possible.
          </Typography>

          <Grid container spacing={6}>
            <Grid item xs={12} md={6}>
              <Card
                sx={{
                  height: "100%",
                  p: 4,
                  boxShadow: "none",
                  backgroundColor: "rgba(245, 247, 250, 0.8)",
                }}
              >
                <Box component="form" noValidate sx={{ mt: 1 }}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="name"
                    label="Your Name"
                    name="name"
                    autoComplete="name"
                    sx={{ mb: 3 }}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    sx={{ mb: 3 }}
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
                    sx={{ mb: 3 }}
                  />
                  <Button
                    fullWidth
                    variant="contained"
                    sx={{
                      backgroundColor: "#173B18",
                      padding: "12px 30px",
                      borderRadius: "30px",
                      textTransform: "none",
                      fontSize: "1.1rem",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        backgroundColor: "#2E7D32",
                        transform: "translateY(-3px)",
                        boxShadow: "0 10px 20px rgba(0,0,0,0.2)",
                      },
                    }}
                  >
                    Send Message
                  </Button>
                </Box>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card
                sx={{
                  height: "100%",
                  p: 4,
                  boxShadow: "none",
                  backgroundColor: "rgba(245, 247, 250, 0.8)",
                }}
              >
                <Box sx={{ mb: 4 }}>
                  <Typography variant="h5" sx={{ mb: 4, fontWeight: "bold" }}>
                    Get in Touch
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                    <LocationOnIcon
                      sx={{ color: "#173B18", mr: 2, fontSize: 30 }}
                    />
                    <Typography sx={{ color: "#666" }}>
                      123 Business Avenue, Silicon Valley, CA 94043
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                    <EmailIcon sx={{ color: "#173B18", mr: 2, fontSize: 30 }} />
                    <Typography sx={{ color: "#666" }}>
                      contact@zen-meraki.com
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                    <PhoneIcon sx={{ color: "#173B18", mr: 2, fontSize: 30 }} />
                    <Typography sx={{ color: "#666" }}>
                      +1 (555) 123-4567
                    </Typography>
                  </Box>
                </Box>

                <Box>
                  <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
                    Business Hours
                  </Typography>
                  <Typography sx={{ color: "#666", mb: 1 }}>
                    Monday - Friday: 9:00 AM - 6:00 PM
                  </Typography>
                  <Typography sx={{ color: "#666" }}>
                    Saturday - Sunday: Closed
                  </Typography>
                </Box>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </div>
  );
}

export default Welcome;
