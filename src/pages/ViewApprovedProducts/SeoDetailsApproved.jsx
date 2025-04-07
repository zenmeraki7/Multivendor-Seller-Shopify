import React, { useEffect } from "react";
import { Box, Typography, Paper, Grid, CircularProgress, Alert } from "@mui/material";
import CustomInput from "../../components/SharedComponents/CustomInput";

const SeoDetailsApproved = ({ productData, setProductData }) => {
  useEffect(() => {
    console.log("SeoDetailsApproved component productData:", productData);
    console.log("SEO data:", productData?.seo);
    console.log("seoTitle:", productData?.seoTitle);
    console.log("seoDescription:", productData?.seoDescription);
    console.log("handle:", productData?.handle);
  }, [productData]);

  const handleSeoChange = (e) => {
    const { name, value } = e.target;
    
    if (productData.seo) {
      setProductData({
        ...productData,
        seo: { ...productData.seo, [name]: value },
        [`seo${name.charAt(0).toUpperCase() + name.slice(1)}`]: value
      });
    } else {
      setProductData({
        ...productData,
        [`seo${name.charAt(0).toUpperCase() + name.slice(1)}`]: value,
        seo: { ...productData.seo || {}, [name]: value }
      });
    }
  };

  if (!productData) {
    return (
      <Paper elevation={1} sx={{ p: 2, bgcolor: "#f2f2f270", mt: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
          <CircularProgress />
        </Box>
      </Paper>
    );
  }

  const seoTitle = 
    (productData.seo && productData.seo.title) || 
    productData.seoTitle || 
    productData.title || 
    productData.name || 
    "";
    
  const seoDescription = 
    (productData.seo && productData.seo.description) || 
    productData.seoDescription || 
    productData.description || 
    "";
    
  const handle = productData.handle || "";

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
                value={seoTitle}
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
                value={seoDescription}
                onChange={handleSeoChange}
                multiline
                rows={4}
                fullWidth
                helperText="A brief summary that appears in search results (recommended: 150-160 characters)"
              />
            </Grid>
            <Grid item xs={12}>
              <CustomInput
                name="handle"
                id="handle"
                label="URL Handle"
                placeholder="product-url-handle"
                value={handle}
                onChange={(e) => setProductData({ ...productData, handle: e.target.value })}
                fullWidth
                helperText="The unique part of the URL for this product"
              />
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </>
  );
};

export default SeoDetailsApproved;