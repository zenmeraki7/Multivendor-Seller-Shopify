import React, { useState } from 'react';
import { 
  Typography, 
  Box, 
  Card, 
  CardContent, 
  Container, 
  Rating, 
  TextField, 
  Button, 
  Divider, 
  Avatar, 
  Paper, 
  Grid,
  Chip,
  Stack
} from '@mui/material';
import {
  ThumbUp,
  Star,
  EmojiEvents,
  CalendarToday,
  Person,
  Message,
  CheckCircle
} from '@mui/icons-material';

const Feedback = () => {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [helpfulReviews, setHelpfulReviews] = useState({});

  // Seller data
  const seller = {
    name: "Multi-vendor Seller",
    id: "SE123",
    averageRating: 4.5,
    totalReviews: 128
  };

  // Previous reviews
  const previousReviews = [
    {
      id: 1,
      userName: "Sarah M.",
      rating: 5,
      date: "2025-02-15",
      feedback: "Excellent service! The product arrived earlier than expected and was exactly as described. The seller was very responsive to all my inquiries throughout the process.",
      helpful: 24
    },
    {
      id: 2,
      userName: "Michael R.",
      rating: 4,
      date: "2025-02-10",
      feedback: "Professional experience overall. The item was in perfect condition and well-packaged. Would have given 5 stars but shipping took slightly longer than the estimated delivery window.",
      helpful: 12
    },
    {
      id: 3,
      userName: "Emily K.",
      rating: 5,
      date: "2025-02-05",
      feedback: "Outstanding customer service! Had a minor issue with my order and the seller resolved it immediately. Their attention to detail and commitment to customer satisfaction is commendable.",
      helpful: 31
    }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      sellerId: seller.id,
      rating,
      feedback,
      timestamp: new Date().toISOString()
    });
    setSubmitted(true);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const markHelpful = (reviewId) => {
    setHelpfulReviews({
      ...helpfulReviews,
      [reviewId]: !helpfulReviews[reviewId]
    });
  };

  const getColorFromRating = (rating) => {
    if (rating >= 4.5) return 'success';
    if (rating >= 3.5) return 'primary';
    if (rating >= 2.5) return 'warning';
    return 'error';
  };

  return (
    <Box sx={{ bgcolor: '#f8f9fa', minHeight: '100vh', py: 5 }}>
      <Container maxWidth="md">
        {/* Seller Overview Card */}
        <Card sx={{ mb: 4, borderRadius: 2, boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
          <CardContent sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Avatar sx={{ bgcolor: '#e3f2fd', color: 'primary.main', width: 48, height: 48 }}>
                  <Person fontSize="medium" />
                </Avatar>
                <Box>
                  <Typography variant="h6" fontWeight="600">
                    {seller.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Seller ID: {seller.id}
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ textAlign: 'right' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 1 }}>
                  <Star fontSize="small" style={{ color: '#faaf00' }} />
                  <Typography variant="h6" fontWeight="600" component="span">
                    {seller.averageRating}
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  Based on {seller.totalReviews} reviews
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>

        {/* Feedback Form */}
        <Card sx={{ mb: 4, borderRadius: 2, boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
          <CardContent sx={{ p: 4 }}>
            <Typography variant="h5" component="h2" gutterBottom fontWeight="600" color="primary.dark">
              Provide Your Feedback
            </Typography>
            
            {!submitted ? (
              <Box component="form" onSubmit={handleSubmit}>
                <Box sx={{ mb: 4 }}>
                  <Typography 
                    variant="subtitle1" 
                    component="label"
                    sx={{ display: 'block', color: 'text.primary', mb: 1, fontWeight: 500 }}
                  >
                    Rate Your Experience
                  </Typography>
                  <Rating
                    name="rating"
                    size="large"
                    value={rating}
                    onChange={(_, newValue) => {
                      setRating(newValue);
                    }}
                    sx={{ color: '#faaf00' }}
                  />
                </Box>

                <TextField
                  fullWidth
                  label="Your Feedback"
                  multiline
                  rows={4}
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="Share details about your experience with this seller..."
                  required
                  variant="outlined"
                  sx={{ 
                    mb: 4,
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 1.5
                    }
                  }}
                />

                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  size="large"
                  disabled={!rating || !feedback}
                  sx={{ 
                    py: 1.5,
                    textTransform: 'none',
                    fontWeight: 600,
                    fontSize: '1rem',
                    borderRadius: 1.5
                  }}
                >
                  Submit Feedback
                </Button>
              </Box>
            ) : (
              <Box sx={{ textAlign: 'center', py: 6 }}>
                <Avatar sx={{ bgcolor: '#e8f5e9', width: 64, height: 64, mx: 'auto', mb: 3 }}>
                  <CheckCircle fontSize="large" style={{ color: '#2e7d32' }} />
                </Avatar>
                <Typography variant="h6" color="success.main" gutterBottom fontWeight="600">
                  Thank you for your feedback
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ maxWidth: '80%', mx: 'auto', mb: 3 }}>
                  Your review helps us maintain the quality of our marketplace and assists other customers in making informed decisions.
                </Typography>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => {
                    setSubmitted(false);
                    setRating(0);
                    setFeedback('');
                  }}
                  sx={{ 
                    textTransform: 'none',
                    borderRadius: 1.5
                  }}
                >
                  Submit Another Review
                </Button>
              </Box>
            )}
          </CardContent>
        </Card>

        {/* Previous Reviews */}
        <Card sx={{ borderRadius: 2, boxShadow: '0 2px 12px rgba(0,0,0,0.06)', mb: 4 }}>
          <CardContent sx={{ p: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
              <Typography variant="h5" component="h2" fontWeight="600" color="primary.dark">
                Customer Reviews
              </Typography>
              <Chip 
                icon={<Star fontSize="small" />}
                label={`${seller.averageRating} / 5`}
                color={getColorFromRating(seller.averageRating)} 
                variant="outlined"
                sx={{ fontWeight: 500 }}
              />
            </Box>
            
            <Stack spacing={4}>
              {previousReviews.map((review, index) => (
                <React.Fragment key={review.id}>
                  {index > 0 && <Divider sx={{ my: 1 }} />}
                  <Paper elevation={0} sx={{ p: 0 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                      <Box sx={{ display: 'flex', gap: 2 }}>
                        <Avatar sx={{ bgcolor: 'primary.light', color: 'primary.contrastText' }}>
                          {review.userName.charAt(0)}
                        </Avatar>
                        <Box>
                          <Typography variant="subtitle1" fontWeight="500">
                            {review.userName}
                          </Typography>
                          <Rating 
                            value={review.rating} 
                            readOnly 
                            size="small" 
                            sx={{ color: '#faaf00', mt: 0.5 }}
                          />
                        </Box>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: 'text.secondary' }}>
                        <CalendarToday fontSize="small" />
                        <Typography variant="caption" sx={{ fontWeight: 500 }}>
                          {formatDate(review.date)}
                        </Typography>
                      </Box>
                    </Box>
                    <Typography variant="body1" paragraph sx={{ color: 'text.primary', lineHeight: 1.7, mb: 3 }}>
                      {review.feedback}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Button
                        startIcon={<ThumbUp fontSize="small" />}
                        size="small"
                        variant={helpfulReviews[review.id] ? "contained" : "outlined"}
                        color={helpfulReviews[review.id] ? "primary" : "primary"}
                        onClick={() => markHelpful(review.id)}
                        sx={{ 
                          borderRadius: 6, 
                          textTransform: 'none',
                          px: 2,
                          fontWeight: 500
                        }}
                      >
                        Helpful
                      </Button>
                      <Divider orientation="vertical" flexItem sx={{ mx: 2 }} />
                      <Typography variant="body2" color="text.secondary">
                        {review.helpful + (helpfulReviews[review.id] ? 1 : 0)} people found this review helpful
                      </Typography>
                    </Box>
                  </Paper>
                </React.Fragment>
              ))}
            </Stack>
          </CardContent>
        </Card>
        
        {/* Stats Cards */}
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <Card sx={{ borderRadius: 2, boxShadow: '0 2px 12px rgba(0,0,0,0.04)', height: '100%' }}>
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar sx={{ bgcolor: 'primary.light', width: 40, height: 40, mr: 2 }}>
                    <Person fontSize="small" style={{ color: '#fff' }} />
                  </Avatar>
                  <Typography color="text.secondary" variant="subtitle2" fontWeight="500">
                    Total Reviews
                  </Typography>
                </Box>
                <Typography variant="h4" fontWeight="600" color="text.primary">
                  {seller.totalReviews}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} sm={4}>
            <Card sx={{ borderRadius: 2, boxShadow: '0 2px 12px rgba(0,0,0,0.04)', height: '100%' }}>
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar sx={{ bgcolor: 'primary.light', width: 40, height: 40, mr: 2 }}>
                    <Star fontSize="small" style={{ color: '#fff' }} />
                  </Avatar>
                  <Typography color="text.secondary" variant="subtitle2" fontWeight="500">
                    Average Rating
                  </Typography>
                </Box>
                <Typography variant="h4" fontWeight="600" color="text.primary">
                  {seller.averageRating}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} sm={4}>
            <Card sx={{ borderRadius: 2, boxShadow: '0 2px 12px rgba(0,0,0,0.04)', height: '100%' }}>
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar sx={{ bgcolor: 'primary.light', width: 40, height: 40, mr: 2 }}>
                    <Message fontSize="small" style={{ color: '#fff' }} />
                  </Avatar>
                  <Typography color="text.secondary" variant="subtitle2" fontWeight="500">
                    Response Rate
                  </Typography>
                </Box>
                <Typography variant="h4" fontWeight="600" color="text.primary">
                  98%
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Feedback;