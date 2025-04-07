import React, { useEffect } from "react";
import { Typography, Paper, Grid, CircularProgress, Box, Alert } from "@mui/material";
import CustomInput from "../../components/SharedComponents/CustomInput";
import CustomSelect from "../../components/SharedComponents/CustomSelect";

const ProductOrganizationDetailsApproved = ({
  handleChange,
  productData,
  setProductData,
}) => {
  useEffect(() => {
    console.log("ProductOrganizationDetails - productData:", productData);
    console.log("ProductOrganizationDetails - price value:", productData?.price);
    console.log("ProductOrganizationDetails - compareAtPrice value:", productData?.compareAtPrice);
    
    if (productData) {
      const possiblePriceFields = Object.keys(productData).filter(key => 
        key.toLowerCase().includes('price') || 
        key.toLowerCase().includes('cost') || 
        key.toLowerCase().includes('amount')
      );
      
      console.log("Possible price-related fields:", possiblePriceFields);
      
      possiblePriceFields.forEach(field => {
        console.log(`Field ${field}:`, productData[field]);
      });
    }
  }, [productData]);

  const handleTagChange = (e) => {
    const { value } = e.target;
    setProductData({ ...productData, tags: value ? value.split(",") : [] });
  };

  if (!productData) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '200px' }}>
        <CircularProgress />
      </Box>
    );
  }

  const tagsString = Array.isArray(productData.tags) 
    ? productData.tags.join(",") 
    : productData.tags || "";

  const status = productData.status || "DRAFT";
  
  const price = 
    (productData.price !== undefined && productData.price !== null) ? productData.price :
    (productData.variants && productData.variants[0]?.price) ? productData.variants[0].price :
    (productData.variants?.edges && productData.variants.edges[0]?.node?.price) ? 
      Number(productData.variants.edges[0].node.price) : 
    "";
  
  const compareAtPrice = 
    (productData.compareAtPrice !== undefined && productData.compareAtPrice !== null) ? productData.compareAtPrice :
    (productData.variants && productData.variants[0]?.compareAtPrice) ? productData.variants[0].compareAtPrice : 
    (productData.variants?.edges && productData.variants.edges[0]?.node?.compareAtPrice) ? 
      Number(productData.variants.edges[0].node.compareAtPrice) :
    (productData.compareAtPriceRange?.maxVariantCompareAtPrice?.amount) ?
      Number(productData.compareAtPriceRange.maxVariantCompareAtPrice.amount) :
    "";

  console.log("Final calculated price:", price);
  console.log("Final calculated compareAtPrice:", compareAtPrice);

  return (
    <Grid container>
      
      
      <Grid item xs={12}>
        <Paper elevation={1} sx={{ p: 2, bgcolor: "#f2f2f270" }}>
          <Typography variant="h6" gutterBottom fontWeight="bold">
            Product Status
          </Typography>
          <CustomSelect
            name="status"
            id="status"
            label="Status"
            value={status}
            onChange={handleChange}
            MenuItems={[
              { value: "DRAFT", label: "Draft" },
              { value: "ACTIVE", label: "Active" },
              { value: "ARCHIVED", label: "Archived" },
            ]}
            fullWidth
          />
        </Paper>
      </Grid>
      <Paper
        elevation={1}
        sx={{ p: 2, bgcolor: "#f2f2f270", width: "100%", mt: 2 }}
      >
        <Typography gutterBottom fontWeight={"bold"}>
          Product Organization
        </Typography>
        <Grid item xs={12}>
          <CustomInput
            name="productType"
            id="type"
            label="Product Type"
            placeholder="e.g., T-Shirt, Electronics"
            value={productData.productType || ""}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sx={{ mt: 2 }}>
          <CustomInput
            name="tags"
            id="tag"
            label="Tags"
            placeholder="Enter tags (comma-separated)"
            value={tagsString}
            onChange={handleTagChange}
            fullWidth
          />
        </Grid>
      </Paper>
      <Paper
        elevation={1}
        sx={{ p: 2, bgcolor: "#f2f2f270", width: "100%", mt: 2 }}
      >
        <Typography gutterBottom fontWeight={"bold"}>
          Pricing
        </Typography>
                
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <CustomInput
              name="price"
              id="price"
              label="Sale Price"
              type="number"
              placeholder="0.00"
              value={price}
              onChange={handleChange}
              fullWidth
              InputProps={{
                startAdornment: <Typography sx={{ mr: 1 }}>$</Typography>,
              }}
            />
          </Grid>
          <Grid item xs={12} sx={{ mt: 1 }}>
            <CustomInput
              name="compareAtPrice"
              id="compareAtPrice"
              label="Compare at Price"
              type="number"
              placeholder="0.00"
              value={compareAtPrice}
              onChange={handleChange}
              fullWidth
              InputProps={{
                startAdornment: <Typography sx={{ mr: 1 }}>$</Typography>,
              }}
            />
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
};

export default ProductOrganizationDetailsApproved;