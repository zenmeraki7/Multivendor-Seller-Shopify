import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Button, 
  Container, 
  Grid, 
  Chip,
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText,
  Alert,
  useTheme,
  useMediaQuery,
  alpha
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import LoyaltyIcon from '@mui/icons-material/Loyalty';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import StarIcon from '@mui/icons-material/Star';
import DiamondIcon from '@mui/icons-material/Diamond';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

const Subscription = () => {
  const [currentPlan, setCurrentPlan] = useState('free');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const plans = [
    {
      id: 'free',
      name: 'Free Version',
      price: 0,
      features: [
        '10 product edits monthly',
        'Scheduled edits for timed automation',
        'Quick undo for any edit',
      ],
      color: 'default',
      icon: <AutoAwesomeIcon />,
      gradient: 'linear-gradient(45deg, #e0e0e0 30%, #f5f5f5 90%)',
      textColor: '#424242'
    },
    {
      id: 'basic',
      name: 'Basic',
      suffix: '(Monthly)',
      price: 20,
      features: [
        'Unlimited products per task',
        'Limit of 2 concurrent edits',
        '1 daily inventory sync',
        'Scheduling for both edits and undo actions',
      ],
      color: 'primary',
      icon: <StarIcon />,
      highlight: true,
      gradient: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
      textColor: 'white'
    },
    {
      id: 'advanced',
      name: 'Advanced',
      suffix: '(Monthly)',
      price: 40,
      features: [
        '5 inventory syncs to keep stock updated',
        'Scheduled exports for seamless reporting',
        'Recurring edits to automate frequent tasks',
        '5 product rules that trigger automatically with each new product addition',
        'Limit of 5 concurrent edits',
        'Access to code snippets for custom functionality',
      ],
      color: 'secondary',
      icon: <DiamondIcon />,
      gradient: 'linear-gradient(45deg, #FF5722 30%, #FF9800 90%)',
      textColor: 'white'
    },
    {
      id: 'pro-monthly',
      name: 'Pro',
      suffix: '(Monthly)',
      price: 50,
      features: [
        'Customizable schedules for recurring edits',
        '20 product rules that trigger with any product addition or update',
        '10 inventory syncs for comprehensive tracking',
        'Limit of 20 concurrent edits',
        'Expanded code snippet library for advanced customizations',
      ],
      color: 'success',
      icon: <WorkspacePremiumIcon />,
      gradient: 'linear-gradient(45deg, #4CAF50 30%, #8BC34A 90%)',
      textColor: 'white'
    },
    {
      id: 'pro-yearly',
      name: 'Pro',
      suffix: '(Yearly)',
      price: 100,
      features: [
        'Unlimited products per task',
        'Limit of 2 concurrent edits',
        '1 daily inventory syncs',
        'Scheduling for both edits and undo actions',
      ],
      color: 'info',
      icon: <WorkspacePremiumIcon />,
      gradient: 'linear-gradient(45deg, #673AB7 30%, #3F51B5 90%)',
      textColor: 'white'
    },
  ];

  // Colorful background
  const pageBgGradient = 'linear-gradient(180deg, #f8f9fa 0%, #e9ecef 100%)';

  return (
    <Box sx={{ 
      background: pageBgGradient,
      minHeight: '100vh',
      pt: 4, 
      pb: 8 
    }}>
      <Container maxWidth="lg">
        <Alert 
          severity="success" 
          icon={<NotificationsActiveIcon sx={{ color: '#ff6b6b' }} />}
          sx={{ 
            mb: 4, 
            py: 2,
            backgroundImage: 'linear-gradient(45deg, #c3fae8 0%, #d3f9d8 100%)',
            border: '1px solid #63e6be',
            borderRadius: 3,
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)'
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Typography 
              variant="h6" 
              component="div" 
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 1,
                color: '#087f5b', 
                fontWeight: 'bold'
              }}
            >
              <LoyaltyIcon sx={{ color: '#fa5252' }} /> 
              Limited Time Offer! 
              <LoyaltyIcon sx={{ color: '#fa5252' }} />
            </Typography>
            <Typography 
              variant="body1" 
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 2, 
                flexWrap: 'wrap',
                color: '#212529',
                fontWeight: 500
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', color: '#e03131' }}>
                <NotificationsActiveIcon fontSize="small" sx={{ mr: 0.5 }} /> 
                Hurry! Offer Ends Soon
              </Box> | 
              <Box sx={{ display: 'flex', alignItems: 'center', color: '#2b8a3e' }}>
                <MonetizationOnIcon fontSize="small" sx={{ mr: 0.5 }} /> 
                Mega Discount Sale
              </Box> | 
              <Box sx={{ display: 'flex', alignItems: 'center', color: '#1864ab' }}>
                <LoyaltyIcon fontSize="small" sx={{ mr: 0.5 }} /> 
                Subscribe Now and Save Big!
              </Box>
            </Typography>

            <Box sx={{ mt: 1 }}>
              <Button 
                variant="contained"
                sx={{ 
                  backgroundImage: 'linear-gradient(45deg, #ff6b6b 30%, #ff8787 90%)',
                  color: 'white',
                  fontWeight: 'bold',
                  borderRadius: 2,
                  px: 3,
                  boxShadow: '0 4px 10px rgba(255, 107, 107, 0.3)',
                  '&:hover': {
                    backgroundImage: 'linear-gradient(45deg, #fa5252 30%, #ff6b6b 90%)',
                    boxShadow: '0 6px 15px rgba(255, 107, 107, 0.4)',
                  }
                }}
              >
                Subscribe Now
              </Button>
            </Box>
          </Box>
        </Alert>

        <Typography 
          variant="h3" 
          component="h1" 
          align="center" 
          gutterBottom
          sx={{ 
            fontWeight: 'bold',
            background: 'linear-gradient(45deg, #364fc7 30%, #4dabf7 90%)',
            backgroundClip: 'text',
            textFillColor: 'transparent',
            mb: 2
          }}
        >
          Choose Your Plan
        </Typography>
        <Typography 
          variant="subtitle1" 
          align="center" 
          sx={{ 
            color: '#495057', 
            maxWidth: '700px',
            mx: 'auto',
            mb: 5
          }}
        >
          Select a plan that fits your needs and unlock premium features. Manage or verify your subscription with ease.
        </Typography>

        <Grid container spacing={4} sx={{ mt: 2 }}>
          {plans.map((plan) => (
            <Grid item xs={12} md={6} key={plan.id}>
              <Paper 
                elevation={plan.highlight ? 8 : 4} 
                sx={{
                  p: 4,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                  backgroundImage: plan.gradient,
                  color: plan.textColor,
                  borderRadius: 3,
                  overflow: 'hidden',
                  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-10px)',
                    boxShadow: '0 12px 28px rgba(0, 0, 0, 0.2)',
                  },
                  '&::before': plan.highlight ? {
                    content: '""',
                    position: 'absolute',
                    top: -80,
                    right: -80,
                    width: 160,
                    height: 160,
                    background: alpha('#fff', 0.1),
                    transform: 'rotate(45deg)',
                    zIndex: 0
                  } : {}
                }}
              >
                {plan.highlight && (
                  <Chip 
                    label={`${plan.name} ${plan.suffix}`}
                    icon={<StarIcon />}
                    color="primary" 
                    size="small" 
                    sx={{ 
                      position: 'absolute',
                      top: 16,
                      right: 16,
                      fontWeight: 'bold',
                      background: 'white',
                      color: theme.palette.primary.main,
                      px: 1,
                      '& .MuiChip-icon': {
                        color: theme.palette.primary.main
                      }
                    }}
                  />
                )}

                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center',
                  gap: 2,
                  mb: 3
                }}>
                  <Box sx={{ 
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    p: 1.5,
                    borderRadius: '50%',
                    bgcolor: alpha('#fff', 0.15),
                    color: plan.textColor
                  }}>
                    {plan.icon}
                  </Box>
                  <Typography variant="h5" component="h2" fontWeight="bold">
                    {plan.name} {plan.suffix && (
                      <Typography 
                        component="span" 
                        variant="subtitle1" 
                        sx={{ 
                          opacity: 0.8,
                          ml: 0.5
                        }}
                      >
                        {plan.suffix}
                      </Typography>
                    )}
                  </Typography>
                </Box>

                <Typography 
                  variant="h2" 
                  component="p" 
                  gutterBottom 
                  fontWeight="bold"
                  sx={{ mb: 3 }}
                >
                  ${plan.price}
                  {plan.price > 0 && (
                    <Typography component="span" variant="body2" sx={{ opacity: 0.7, ml: 1 }}>
                      {plan.suffix === '(Monthly)' ? '/month' : '/year'}
                    </Typography>
                  )}
                </Typography>

                <List dense sx={{ mb: 3, flexGrow: 1 }}>
                  {plan.features.map((feature, index) => (
                    <ListItem key={index} disableGutters>
                      <ListItemIcon sx={{ minWidth: 32 }}>
                        <CheckCircleIcon sx={{ color: plan.id === 'free' ? '#4CAF50' : alpha('#fff', 0.9) }} />
                      </ListItemIcon>
                      <ListItemText 
                        primary={feature} 
                        primaryTypographyProps={{ 
                          fontWeight: 500,
                          fontSize: '0.95rem'
                        }}
                      />
                    </ListItem>
                  ))}
                </List>

                {currentPlan === plan.id ? (
                  <Button 
                    variant="outlined"
                    fullWidth
                    disabled
                    sx={{
                      borderColor: alpha('#fff', 0.5),
                      color: alpha('#fff', 0.7),
                      borderWidth: 2,
                      py: 1.5,
                      borderRadius: 2
                    }}
                  >
                    Current Plan
                  </Button>
                ) : (
                  <Button 
                    variant="contained"
                    fullWidth
                    sx={{ 
                      mt: 'auto',
                      py: 1.5,
                      borderRadius: 2,
                      fontWeight: 'bold',
                      backgroundColor: plan.id === 'free' ? theme.palette.primary.main : 'white',
                      color: plan.id === 'free' ? 'white' : theme.palette[plan.color]?.main || '#333',
                      '&:hover': {
                        backgroundColor: plan.id === 'free' ? theme.palette.primary.dark : alpha('#ffffff', 0.9),
                        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
                      }
                    }}
                  >
                    Subscribe Now
                  </Button>
                )}
              </Paper>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ position: 'fixed', bottom: 24, right: 24 }}>
          <Button
            variant="contained"
            sx={{ 
              borderRadius: '50%', 
              width: 64, 
              height: 64,
              minWidth: 'auto',
              background: 'linear-gradient(45deg, #11998e 30%, #38ef7d 90%)',
              boxShadow: '0 6px 20px rgba(56, 239, 125, 0.4)',
              '&:hover': {
                background: 'linear-gradient(45deg, #0d8b81 30%, #32d56c 90%)',
                boxShadow: '0 8px 25px rgba(56, 239, 125, 0.5)',
              }
            }}
          >
            <ChatBubbleIcon fontSize="medium" />
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default Subscription;