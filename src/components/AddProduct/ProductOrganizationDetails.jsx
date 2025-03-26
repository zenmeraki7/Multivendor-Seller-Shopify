import React, { useState } from "react";
import { Typography, Paper, Grid } from "@mui/material";

import CustomInput from "../../components/SharedComponents/CustomInput";
import CustomSelect from "../../components/SharedComponents/CustomSelect";

const ProductOrganizationDetails = ({
  handleChange,
  productData,
  setProductData,
}) => {
  const handleTagChange = (e) => {
    const { value } = e.target;
    setProductData({ ...productData, tags: value?.split(",") });
  };
  return (
    <Grid container>
      <Grid item xs={12}>
        <Paper elevation={1} sx={{ p: 2, bgcolor: "#f2f2f270" }}>
          <CustomSelect
            name="status"
            id="status"
            label="Status"
            value={productData.status}
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
          Product organization
        </Typography>
        <Grid item xs={12}>
          <CustomInput
            name="productType"
            id="type"
            label="Product Type"
            placeholder="e.g., T-Shirt, Electronics"
            value={productData.productType}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <CustomInput
            name="tags"
            id="tag"
            label="Tags"
            placeholder="Enter tags (comma-separated)"
            value={productData.tags?.join(",")}
            onChange={handleTagChange}
            fullWidth
          />
        </Grid>
        {/* <Grid item xs={12}>
          <CustomSelect
            name="category"
            id="category"
            label="Category"
            value={productData.category}
            onChange={handleInputChange}
            MenuItems={[
              { value: "electronics", label: "Electronics" },
              { value: "fashion", label: "Fashion" },
            ]}
            fullWidth
          />
        </Grid> */}
      </Paper>
      <Paper
        elevation={1}
        sx={{ p: 2, bgcolor: "#f2f2f270", width: "100%", mt: 2 }}
      >
        <Typography gutterBottom fontWeight={"bold"}>
          Pricing
        </Typography>

        <Grid container>
          <Grid item xs={12}>
            <CustomInput
              name="price"
              id="price"
              label="Sale Price"
              type="number"
              placeholder="0.00"
              value={productData.price}
              onChange={handleChange}
              fullWidth
              InputProps={{
                startAdornment: <Typography sx={{ mr: 1 }}>$</Typography>,
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <CustomInput
              name="compareAtPrice"
              id="compareAtPrice"
              label="Compare at Price"
              type="number"
              placeholder="0.00"
              value={productData.compareAtPrice}
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

export default ProductOrganizationDetails;
