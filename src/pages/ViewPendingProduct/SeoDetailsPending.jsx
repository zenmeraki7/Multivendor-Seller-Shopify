import React from "react";
import { Box, Typography, Paper, Grid, CircularProgress } from "@mui/material";
import CustomInput from "../../components/SharedComponents/CustomInput";

const SeoDetailsPending = ({ productData, setProductData }) => {
  // Handle changes to SEO fields
  const handleSeoChange = (e) => {
    const { name, value } = e.target;
    setProductData({
      ...productData,
      seo: { ...productData?.seo || {}, [name]: value },
    });
  };

  // Display loading state if productData is not yet loaded
  if (!productData) {
    return (
      <Paper elevation={1} sx={{ p: 2, bgcolor: "#f2f2f270", mt: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
          <CircularProgress />
        </Box>
      </Paper>
    );
  }

  // Ensure seo object exists to prevent errors
  const seo = productData.seo || {};

  return (
    <>
      <Paper elevation={1} sx={{ p: 2, bgcolor: "#f2f2f270", mt: 3 }}>
        <Box sx={{ mt: 2 }}>
          <Typography variant="h6" gutterBottom fontWeight={"bold"}>
            Search Engine Optimization
          </Typography>
          <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
            Improve your product's visibility in search results
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={12}>
              <CustomInput
                name="title"
                id="seoTitle"
                label="SEO Title"
                placeholder="Enter SEO title"
                value={seo.title || ""}
                onChange={handleSeoChange}
                fullWidth
                helperText="The title that appears in search engine results (recommended: 50-60 characters)"
              />
            </Grid>
            <Grid item xs={12}>
              <CustomInput
                name="description"
                id="seoDescription"
                label="SEO Description"
                placeholder="Enter SEO description"
                value={seo.description || ""}
                onChange={handleSeoChange}
                multiline
                rows={4}
                fullWidth
                helperText="A brief summary that appears in search results (recommended: 150-160 characters)"
              />
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </>
  );
};

export default SeoDetailsPending;