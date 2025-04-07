import React, { useEffect } from "react";
import { Typography, Paper, Grid, Box, CircularProgress } from "@mui/material";
import CustomInput from "../../components/SharedComponents/CustomInput";
import ReactQuill from "react-quill";

const BasicDetailsApproved = ({ handleChange, productData, setProductData }) => {
  useEffect(() => {
    if (productData) {
      let needsUpdate = false;
      const updatedData = { ...productData };
      
      if (!productData.title && productData.name) {
        updatedData.title = productData.name;
        needsUpdate = true;
      }
      
      if (!productData.name && productData.title) {
        updatedData.name = productData.title;
        needsUpdate = true;
      }
      
      if (needsUpdate) {
        setProductData(updatedData);
      }
    }
  }, [productData, setProductData]);

  const handleDescriptionChange = (content) => {
    console.log("Description changed:", content);
    setProductData({ 
      ...productData, 
      description: content,
      descriptionHtml: content 
    });
  };

  if (!productData) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "200px" }}>
        <CircularProgress />
      </Box>
    );
  }

  const productTitle = productData.title || productData.name || "";
  const productDescription = productData.description || productData.descriptionHtml || "";

  return (
    <>
      <Typography variant="h6" gutterBottom fontWeight="bold">
        Basic Details
      </Typography>
      
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <CustomInput
            name="title"
            id="title"
            label="Product Title"
            placeholder="Enter product title"
            value={productTitle}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body2" gutterBottom>
            Product Description
          </Typography>
          <ReactQuill
            value={productDescription}
            onChange={handleDescriptionChange}
            placeholder="Enter product description"
            style={{ height: '200px', marginBottom: '50px' }}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default BasicDetailsApproved;