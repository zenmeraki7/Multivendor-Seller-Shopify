import React, { useState } from "react";
import { Typography, Paper, Grid } from "@mui/material";

import CustomInput from "../../components/SharedComponents/CustomInput";
import CustomSelect from "../../components/SharedComponents/CustomSelect";

const ProductOrganizationDetails = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "draft",
    type: "",
    tag: "",
    category: "",
    price: 0,
    compareAtPrice: 0,
    inventory: 0,
    sku: "",
    barcode: "",
    weightUnit: "kg",
    seo: {
      title: "",
      description: "",
      keywords: "",
    },
  });

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target || e;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  return (
    <Grid container>
      <Grid item xs={12}>
        <Paper elevation={1} sx={{ p: 2, bgcolor: "#f2f2f270" }}>
          <CustomSelect
            name="status"
            id="status"
            label="Status"
            value={formData.status}
            onChange={handleInputChange}
            MenuItems={[
              { value: "draft", label: "Draft" },
              { value: "active", label: "Active" },
              { value: "archived", label: "Archived" },
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
            name="type"
            id="type"
            label="Product Type"
            placeholder="e.g., T-Shirt, Electronics"
            value={formData.type}
            onChange={handleInputChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <CustomInput
            name="tag"
            id="tag"
            label="Tags"
            placeholder="Enter tags (comma-separated)"
            value={formData.tag}
            onChange={handleInputChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <CustomSelect
            name="category"
            id="category"
            label="Category"
            value={formData.category}
            onChange={handleInputChange}
            MenuItems={[
              { value: "electronics", label: "Electronics" },
              { value: "fashion", label: "Fashion" },
            ]}
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

        <Grid container>
          <Grid item xs={12}>
            <CustomInput
              name="price"
              id="price"
              label="Sale Price"
              type="number"
              placeholder="0.00"
              value={formData.price}
              onChange={handleInputChange}
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
              value={formData.compareAtPrice}
              onChange={handleInputChange}
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
