import React, { useState } from 'react';
import {
  Box,
  Typography,
  Container,
  Paper,
  Tabs,
  Tab,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Card,
  CardContent,
  Chip,
  Button,
  InputAdornment,
  Divider,
  Grid,
  IconButton,
  Rating,
  Avatar,
  Tooltip,
  Badge,
  useTheme,
  useMediaQuery,
  Pagination
} from '@mui/material';

import {
  Search,
  Flag,
  ThumbUp,
  Message,
  ExpandMore,
  FilterList,
  VerifiedUser,
  Sort
} from '@mui/icons-material';

const ReviewPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [activeTab, setActiveTab] = useState(0);
  const [selectedRating, setSelectedRating] = useState('all');
  const [page, setPage] = useState(1);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  // Sample review data
  const reviews = [
    {
      id: 1,
      username: "Sarah M.",
      rating: 5,
      date: "Feb 10, 2025",
      content: "Excellent product quality and fast shipping. The seller was very responsive to my questions.",
      productName: "Wireless Headphones",
      seller: "TechHub Store",
      helpful: 24,
      replies: 3,
      verified: true,
      avatar: "S"
    },
    {
      id: 2,
      username: "John D.",
      rating: 4,
      date: "Feb 9, 2025",
      content: "Good product overall, but the delivery took a bit longer than expected. Still, the seller kept me updated throughout.",
      productName: "Smart Watch Pro",
      seller: "Electronics Plus",
      helpful: 15,
      replies: 1,
      verified: true,
      avatar: "J"
    }
  ];

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: theme.palette.background.default, py: 4 }}>
      <Container maxWidth="lg">
        <Paper 
          elevation={2} 
          sx={{ 
            p: { xs: 2, md: 4 }, 
            borderRadius: 2,
            border: `1px solid ${theme.palette.divider}`
          }}
        >
          {/* Header */}
          <Box sx={{ mb: 4 }}>
            <Typography 
              variant="h4" 
              component="h1" 
              fontWeight={600} 
              mb={2}
              color="primary.main"
            >
              Reviews & Ratings
            </Typography>
            
            <Tabs
  value={activeTab}
  onChange={handleTabChange}
  sx={{ 
    mt: 2,
    '& .MuiTab-root': {
      fontWeight: 500,
      minHeight: 48
    }
  }}
  indicatorColor="primary"
  textColor="primary"
  variant={isMobile ? "fullWidth" : "standard"}
>
  <Tab 
    label={
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        {!isMobile && (
          <Badge 
            badgeContent={reviews.length} 
            color="primary" 
            sx={{ mr: 2 }} // Increased margin here to create the gap
          />
        )}
        <Typography>Product Reviews</Typography>
      </Box>
    } 
  />
  <Tab label="Seller Ratings" />
</Tabs>
          </Box>

          {/* Filters */}
          <Paper 
            variant="outlined" 
            sx={{ 
              p: { xs: 2, md: 3 }, 
              mb: 4, 
              borderRadius: 2, 
              bgcolor: theme.palette.background.default,
              boxShadow: 'none'
            }}
          >
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  placeholder="Search reviews..."
                  variant="outlined"
                  size="small"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Search color="action" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              
              <Grid item xs={6} md={3}>
                <FormControl fullWidth size="small">
                  <InputLabel>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <FilterList fontSize="small" sx={{ mr: 0.5 }} />
                      Rating
                    </Box>
                  </InputLabel>
                  <Select
                    value={selectedRating}
                    onChange={(e) => setSelectedRating(e.target.value)}
                    label={
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <FilterList fontSize="small" sx={{ mr: 0.5 }} />
                        Rating
                      </Box>
                    }
                  >
                    <MenuItem value="all">All Ratings</MenuItem>
                    <MenuItem value="5">
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Rating value={5} readOnly size="small" sx={{ mr: 1 }} />
                        <Typography variant="body2">(5 Stars)</Typography>
                      </Box>
                    </MenuItem>
                    <MenuItem value="4">
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Rating value={4} readOnly size="small" sx={{ mr: 1 }} />
                        <Typography variant="body2">(4 Stars)</Typography>
                      </Box>
                    </MenuItem>
                    <MenuItem value="3">
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Rating value={3} readOnly size="small" sx={{ mr: 1 }} />
                        <Typography variant="body2">(3 Stars)</Typography>
                      </Box>
                    </MenuItem>
                    <MenuItem value="2">
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Rating value={2} readOnly size="small" sx={{ mr: 1 }} />
                        <Typography variant="body2">(2 Stars)</Typography>
                      </Box>
                    </MenuItem>
                    <MenuItem value="1">
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Rating value={1} readOnly size="small" sx={{ mr: 1 }} />
                        <Typography variant="body2">(1 Star)</Typography>
                      </Box>
                    </MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              
              <Grid item xs={6} md={3}>
                <FormControl fullWidth size="small">
                  <InputLabel>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Sort fontSize="small" sx={{ mr: 0.5 }} />
                      Sort By
                    </Box>
                  </InputLabel>
                  <Select
                    defaultValue="recent"
                    label={
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Sort fontSize="small" sx={{ mr: 0.5 }} />
                        Sort By
                      </Box>
                    }
                  >
                    <MenuItem value="recent">Most Recent</MenuItem>
                    <MenuItem value="highest">Highest Rated</MenuItem>
                    <MenuItem value="lowest">Lowest Rated</MenuItem>
                    <MenuItem value="helpful">Most Helpful</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Paper>

          {/* Summary Stats */}
          <Box sx={{ mb: 4, px: 2, py: 2, bgcolor: 'primary.50', borderRadius: 2, display: { xs: 'none', md: 'block' } }}>
            <Grid container spacing={3}>
              <Grid item xs={4}>
                <Typography variant="subtitle2" color="primary.main" gutterBottom>
                  Average Rating
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography variant="h4" fontWeight={600}>4.5</Typography>
                  <Rating value={4.5} readOnly precision={0.5} />
                </Box>
              </Grid>
              <Grid item xs={4}>
                <Typography variant="subtitle2" color="primary.main" gutterBottom>
                  Total Reviews
                </Typography>
                <Typography variant="h4" fontWeight={600}>{reviews.length}</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography variant="subtitle2" color="primary.main" gutterBottom>
                  Verified Purchases
                </Typography>
                <Typography variant="h4" fontWeight={600}>100%</Typography>
              </Grid>
            </Grid>
          </Box>

          {/* Reviews List */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {reviews.map((review) => (
              <Card 
                key={review.id} 
                variant="outlined" 
                sx={{ 
                  borderRadius: 2,
                  transition: 'all 0.2s ease-in-out',
                  '&:hover': {
                    boxShadow: 3,
                    transform: 'translateY(-2px)'
                  }
                }}
              >
                <CardContent sx={{ p: { xs: 2, md: 3 } }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar 
                        sx={{ 
                          bgcolor: 'primary.main', 
                          width: 40, 
                          height: 40,
                          mr: 1.5,
                          fontWeight: 600 
                        }}
                      >
                        {review.avatar}
                      </Avatar>
                      <Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Typography variant="subtitle1" fontWeight={600}>
                            {review.username}
                          </Typography>
                          {review.verified && (
                            <Tooltip title="Verified Purchase">
                              <Chip
                                icon={<VerifiedUser fontSize="small" />}
                                label="Verified"
                                size="small"
                                color="success"
                                variant="outlined"
                              />
                            </Tooltip>
                          )}
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Rating value={review.rating} readOnly size="small" precision={0.5} />
                          <Typography variant="caption" color="text.secondary">
                            {review.date}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                    <Tooltip title="Report">
                      <IconButton size="small">
                        <Flag fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Box>

                  <Box sx={{ mb: 2, ml: { xs: 0, md: 7 } }}>
                    <Typography variant="subtitle2" fontWeight={600} color="primary.dark">
                      {review.productName}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Sold by: {review.seller}
                    </Typography>
                  </Box>

                  <Typography 
                    variant="body2" 
                    sx={{ 
                      mb: 2, 
                      lineHeight: 1.6,
                      ml: { xs: 0, md: 7 }
                    }}
                  >
                    {review.content}
                  </Typography>

                  <Divider sx={{ my: 2 }} />

                  <Box sx={{ display: 'flex', gap: 2, ml: { xs: 0, md: 7 } }}>
                    <Button
                      variant="outlined"
                      size="small"
                      color="primary"
                      startIcon={<ThumbUp fontSize="small" />}
                      sx={{ borderRadius: 6 }}
                    >
                      Helpful ({review.helpful})
                    </Button>
                    <Button
                      variant="outlined"
                      size="small"
                      color="primary"
                      startIcon={<Message fontSize="small" />}
                      sx={{ borderRadius: 6 }}
                    >
                      Reply ({review.replies})
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Box>

          {/* Pagination */}
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <Pagination 
              count={3} 
              page={page} 
              onChange={handlePageChange} 
              color="primary" 
              showFirstButton 
              showLastButton
              size={isMobile ? "small" : "medium"}
            />  
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default ReviewPage;