import React, { useState } from 'react';
import {
  Box,
  Button,
  Checkbox,
  Container,
  Divider,
  FormControlLabel,
  Grid,
  Link,
  Paper,
  TextField,
  Typography,
  useTheme,
  InputAdornment,
  IconButton,
  createTheme,
  ThemeProvider,
  alpha
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import StoreIcon from '@mui/icons-material/Store';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import AppleIcon from '@mui/icons-material/Apple';

// Custom theme
const customTheme = createTheme({
  palette: {
    primary: {
      main: '#3f51b5',
      light: '#757de8',
      dark: '#002984',
      contrastText: '#fff',
    },
    secondary: {
      main: '#f50057',
      light: '#ff4081',
      dark: '#c51162',
      contrastText: '#fff',
    },
    background: {
      default: '#f5f7ff'
    }
  },
  typography: {
    fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 700,
    },
    h5: {
      fontWeight: 600,
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 12,
  },
  shadows: [
    'none',
    '0px 2px 1px -1px rgba(0,0,0,0.05),0px 1px 1px 0px rgba(0,0,0,0.03),0px 1px 3px 0px rgba(0,0,0,0.05)',
    '0px 3px 3px -2px rgba(0,0,0,0.06),0px 3px 4px 0px rgba(0,0,0,0.04),0px 1px 8px 0px rgba(0,0,0,0.06)',
    '0px 3px 5px -1px rgba(0,0,0,0.06),0px 5px 8px 0px rgba(0,0,0,0.05),0px 1px 14px 0px rgba(0,0,0,0.04)',
    '0px 4px 5px -2px rgba(0,0,0,0.06),0px 7px 10px 1px rgba(0,0,0,0.05),0px 2px 16px 1px rgba(0,0,0,0.04)',
    // ... rest of the shadows array remains unchanged
  ],
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '10px 20px',
          fontSize: '0.95rem',
        },
        containedPrimary: {
          boxShadow: '0 4px 10px rgba(63, 81, 181, 0.25)',
          '&:hover': {
            boxShadow: '0 6px 15px rgba(63, 81, 181, 0.35)',
          },
        },
        outlinedPrimary: {
          borderWidth: 1.5,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
          },
          '& .MuiInputLabel-outlined': {
            // Custom label styling
          },
        },
      },
    },
  },
});

const LoginPage = () => {
  const theme = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log({ email, password, rememberMe });
    // Handle login logic here
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <ThemeProvider theme={customTheme}>
      <Box
        sx={{
          minHeight: '100vh',
          backgroundColor: 'background.default',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          py: 4,
        }}
      >
        <Container maxWidth="lg">
          <Paper
            elevation={4}
            sx={{
              overflow: 'hidden',
              borderRadius: 3,
              position: 'relative',
            }}
          >
            <Grid container>
              {/* Left side - banner with gradient and image */}
              <Grid
                item
                xs={false}
                sm={false}
                md={5}
                sx={{
                  position: 'relative',
                  background: 'linear-gradient(135deg, #4e54c8 0%, #8f94fb 100%)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  display: { xs: 'none', md: 'block' }
                }}
              >
                <Box
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 4,
                    background: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
                    backgroundSize: '200px',
                    zIndex: 1,
                  }}
                >
                  <Box sx={{ mb: 2, position: 'relative' }}>
                    <Box
                      sx={{
                        width: 80,
                        height: 80,
                        borderRadius: '50%',
                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mb: 3,
                        mx: 'auto',
                      }}
                    >
                      <StoreIcon sx={{ fontSize: 40, color: 'white' }} />
                    </Box>
                    <Typography 
                      variant="h4" 
                      color="white" 
                      fontWeight="bold" 
                      sx={{ 
                        textAlign: 'center',
                        textShadow: '0 2px 10px rgba(0,0,0,0.2)'
                      }}
                    >
                      VendorHub
                    </Typography>
                  </Box>
                  <Typography 
                    variant="h6" 
                    color="white" 
                    align="center" 
                    gutterBottom
                    sx={{ 
                      mb: 4,
                      fontWeight: 500,
                      textShadow: '0 2px 10px rgba(0,0,0,0.2)'
                    }}
                  >
                    Your Multi-Vendor Marketplace Solution
                  </Typography>
                  
                  <Box 
                    sx={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.15)',
                      borderRadius: 2,
                      p: 3,
                      backdropFilter: 'blur(10px)',
                      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                      width: '90%',
                      mt: 3
                    }}
                  >
                    <Typography 
                      variant="body1" 
                      color="white" 
                      align="center" 
                      sx={{ fontWeight: 500, mb: 2 }}
                    >
                      Join thousands of sellers who have grown their business with us
                    </Typography>
                    <Box 
                      sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'space-between',
                        mt: 2 
                      }}
                    >
                      <Box sx={{ textAlign: 'center', flex: 1 }}>
                        <Typography variant="h5" color="white" fontWeight="bold">5K+</Typography>
                        <Typography variant="body2" color="white" opacity={0.8}>Vendors</Typography>
                      </Box>
                      <Box sx={{ textAlign: 'center', flex: 1 }}>
                        <Typography variant="h5" color="white" fontWeight="bold">1M+</Typography>
                        <Typography variant="body2" color="white" opacity={0.8}>Products</Typography>
                      </Box>
                      <Box sx={{ textAlign: 'center', flex: 1 }}>
                        <Typography variant="h5" color="white" fontWeight="bold">60+</Typography>
                        <Typography variant="body2" color="white" opacity={0.8}>Countries</Typography>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Grid>

              {/* Right side - login form with enhanced styling */}
              <Grid item xs={12} sm={12} md={7}>
                <Box
                  sx={{
                    py: 8,
                    px: { xs: 4, sm: 6, md: 8 },
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                  }}
                >
                  <Box sx={{ mb: 4, textAlign: { xs: 'center', sm: 'left' } }}>
                    <Typography 
                      component="h1" 
                      variant="h4" 
                      gutterBottom 
                      color="primary.main"
                    >
                      Welcome Back!
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      Sign in to your seller account to manage your products
                    </Typography>
                  </Box>

                  <Box 
                    component="form" 
                    noValidate 
                    onSubmit={handleSubmit} 
                    sx={{ 
                      width: '100%', 
                      maxWidth: { sm: '450px', xs: '100%' },
                      mx: { xs: 'auto', sm: 0 }
                    }}
                  >
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      autoFocus
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      sx={{ mb: 3 }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <EmailOutlinedIcon color="action" />
                          </InputAdornment>
                        ),
                      }}
                    />
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type={showPassword ? "text" : "password"}
                      id="password"
                      autoComplete="current-password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      sx={{ mb: 2 }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <LockOutlinedIcon color="action" />
                          </InputAdornment>
                        ),
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={toggleShowPassword}
                              edge="end"
                            >
                              {showPassword ? <VisibilityOffOutlinedIcon /> : <VisibilityOutlinedIcon />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                    
                    <Box sx={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center', 
                      mt: 1,
                      flexDirection: { xs: 'column', sm: 'row' },
                      gap: { xs: 1, sm: 0 }
                    }}>
                      <FormControlLabel
                        control={
                          <Checkbox 
                            value="remember" 
                            color="primary" 
                            checked={rememberMe}
                            onChange={(e) => setRememberMe(e.target.checked)}
                            sx={{ '& .MuiSvgIcon-root': { fontSize: 22 } }}
                          />
                        }
                        label="Remember me"
                      />
                      <Link 
                        href="#" 
                        variant="body2" 
                        underline="hover"
                        sx={{ 
                          color: 'primary.main',
                          fontWeight: 500,
                          '&:hover': { color: 'primary.dark' }
                        }}
                      >
                        Forgot password?
                      </Link>
                    </Box>
                    
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                      sx={{ 
                        mt: 4, 
                        mb: 3, 
                        py: 1.5,
                        fontSize: '1rem',
                        fontWeight: 600
                      }}
                    >
                      Sign In
                    </Button>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', my: 3 }}>
                      <Divider sx={{ flexGrow: 1 }} />
                      <Typography variant="body2" color="text.secondary" sx={{ mx: 2 }}>
                        OR CONTINUE WITH
                      </Typography>
                      <Divider sx={{ flexGrow: 1 }} />
                    </Box>
                    
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={4}>
                        <Button
                          fullWidth
                          variant="outlined"
                          color="inherit"
                          sx={{ 
                            py: 1.2,
                            border: '1.5px solid',
                            borderColor: 'divider',
                            color: 'text.secondary',
                            '&:hover': {
                              backgroundColor: alpha('#000', 0.04)
                            }
                          }}
                        >
                          <GoogleIcon sx={{ mr: 1, color: '#DB4437' }} />
                          Google
                        </Button>
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <Button
                          fullWidth
                          variant="outlined"
                          color="inherit"
                          sx={{ 
                            py: 1.2,
                            border: '1.5px solid',
                            borderColor: 'divider',
                            color: 'text.secondary',
                            '&:hover': {
                              backgroundColor: alpha('#000', 0.04)
                            }
                          }}
                        >
                          <FacebookIcon sx={{ mr: 1, color: '#4267B2' }} />
                          Facebook
                        </Button>
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <Button
                          fullWidth
                          variant="outlined"
                          color="inherit"
                          sx={{ 
                            py: 1.2,
                            border: '1.5px solid',
                            borderColor: 'divider',
                            color: 'text.secondary',
                            '&:hover': {
                              backgroundColor: alpha('#000', 0.04)
                            }
                          }}
                        >
                          <AppleIcon sx={{ mr: 1 }} />
                          Apple
                        </Button>
                      </Grid>
                    </Grid>
                    
                    <Box sx={{ mt: 4, textAlign: 'center' }}>
                      <Typography variant="body1">
                        Don't have an account?{' '}
                        <Link 
                          href="#" 
                          underline="hover"
                          sx={{ 
                            color: 'primary.main',
                            fontWeight: 600,
                            '&:hover': { color: 'primary.dark' }
                          }}
                        >
                          Register as Seller
                        </Link>
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default LoginPage;