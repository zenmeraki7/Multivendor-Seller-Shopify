import React from "react";
import { Typography, Paper, Grid, CircularProgress, Box, Alert } from "@mui/material";
import CustomInput from "../../components/SharedComponents/CustomInput";
import CustomSelect from "../../components/SharedComponents/CustomSelect";

const ProductOrganizationDetailsApproved = ({
  handleChange,
  productData,
  setProductData,
}) => {
  const handleTagChange = (e) => {
    const { value } = e.target;
    setProductData({ ...productData, tags: value ? value.split(",") : [] });
  };

  // If productData is not yet loaded, show loading indicator
  if (!productData) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '200px' }}>
        <CircularProgress />
      </Box>
    );
  }

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
            value={productData.status || "DRAFT"}
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
            value={Array.isArray(productData.tags) ? productData.tags.join(",") : ""}
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
              value={productData.price || ""}
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
              value={productData.compareAtPrice || ""}
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