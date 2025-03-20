import React, { useState } from "react";
import { Box, Typography, Paper, Grid } from "@mui/material";

import CustomInput from "../../components/SharedComponents/CustomInput";

const SeoDetails = () => {
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
  // Handle SEO field changes
  const handleSeoChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      seo: {
        ...prevData.seo,
        [name]: value,
      },
    }));
  };
  return (
    <>
      <Paper elevation={1} sx={{ p: 2, bgcolor: "#f2f2f270", mt: 3 }}>
        <Box sx={{ mt: 2 }}>
          <Typography gutterBottom fontWeight={"bold"}>
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
                value={formData.seo.title}
                onChange={handleSeoChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <CustomInput
                name="description"
                id="seoDescription"
                label="SEO Description"
                placeholder="Enter SEO description"
                value={formData.seo.description}
                onChange={handleSeoChange}
                multiline
                rows={4}
                fullWidth
              />
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </>
  );
};

export default SeoDetails;
