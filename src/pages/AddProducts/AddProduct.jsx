import React, { useEffect, useState } from "react";
import { Box, Button, Paper, Container, Grid } from "@mui/material";

import BasicDetails from "../../components/AddProduct/BasicDetails";
import MediaDetails from "../../components/AddProduct/MediaDetails";
import VariantDetails from "../../components/AddProduct/VariantDetails";
import SeoDetails from "../../components/AddProduct/SeoDetails";
import ProductOrganizationDetails from "../../components/AddProduct/ProductOrganizationDetails";
import axios from "axios";
import { BASE_URL } from "../../utils/baseUrl";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function AddShopifyProduct() {
  const [productData, setProductData] = useState({
    title: "",
    description: "",
    status: "ACTIVE",
    productType: "",
    price: null,
    compareAtPrice: null,
    tags: [],
    seo: {
      title: "",
      description: "",
    },
    productOptions: [],
  });

  const [media, setMedia] = useState([]);
  const navigate = useNavigate();
  const [variantsData, setVariantsData] = useState([]);
  console.log(productData);
  console.log(variantsData);
  // console.log(productData);
  const handleChange = (e) => {
    const { value, name } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue =
        "Are you sure you want to leave? Your changes may not be saved.";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const createProduct = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }
    
    try {
      toast.loading();
      const response = await axios.post(
        `${BASE_URL}/api/product/create`,
        {
          ...productData,
          variants: variantsData,
          images: media.map((img) => img._id),
        },
        {
          headers: {
            "Content-Type": "application/json", // Ensure correct content type
            Authorization: `Bearer ${token}`, // If using authentication
          },
        }
      );
      toast.dismiss();
      toast.success("created");
      console.log("Product Created:", response.data);
    } catch (error) {
      toast.dismiss();
      toast.error("Something wen wrong");
      console.log(
        "Error creating product:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <Container maxWidth="xl" sx={{ py: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          {/* Basic Info Tab */}
          <Paper elevation={1} sx={{ p: 2, bgcolor: "#f2f2f270" }}>
            <BasicDetails
              handleChange={handleChange}
              productData={productData}
              setProductData={setProductData}
            />
            <MediaDetails setMedia={setMedia} media={media} />
          </Paper>
          <VariantDetails
            variantsData={variantsData}
            setVariantsData={setVariantsData}
            setProductData={setProductData}
            productData={productData}
          />
          <SeoDetails
            productData={productData}
            setProductData={setProductData}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <ProductOrganizationDetails
            handleChange={handleChange}
            productData={productData}
            setProductData={setProductData}
          />
        </Grid>
      </Grid>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          variant="contained"
          color="primary"
          onClick={createProduct}
          sx={{ px: 4 }}
        >
          Publish
        </Button>
      </Box>
    </Container>
  );
}

export default AddShopifyProduct;
