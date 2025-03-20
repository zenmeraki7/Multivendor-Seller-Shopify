import React, { useState } from "react";
import { Box, Button, Paper, Container, Grid } from "@mui/material";

import BasicDetails from "../../components/AddProduct/BasicDetails";
import MediaDetails from "../../components/AddProduct/MediaDetails";
import VariantDetails from "../../components/AddProduct/VariantDetails";
import SeoDetails from "../../components/AddProduct/SeoDetails";
import ProductOrganizationDetails from "../../components/AddProduct/ProductOrganizationDetails";

function AddShopifyProduct() {
  const [productData, setProductData] = useState({
    title: "",
    description: "",
    status: "ACTIVE",
    productType: "",
    price: null,
    compareAtPrice: null,
    tags: "",
    meta: {
      title: "",
      description: "",
    },
  });

  return (
    <Container maxWidth="xl" sx={{ py: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          {/* Basic Info Tab */}
          <Paper elevation={1} sx={{ p: 2, bgcolor: "#f2f2f270" }}>
            <BasicDetails />
            <MediaDetails />
          </Paper>
          <VariantDetails />
          <SeoDetails />
        </Grid>
        <Grid item xs={12} md={4}>
          <ProductOrganizationDetails />
        </Grid>
      </Grid>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          variant="contained"
          color="primary"
          // onClick={handleSubmit}
          sx={{ px: 4 }}
        >
          Publish
        </Button>
      </Box>
    </Container>
  );
}

export default AddShopifyProduct;
