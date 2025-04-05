import { Box, Grid, Typography, CircularProgress, Alert } from "@mui/material";
import React, { useEffect, useState } from "react";
import CustomInput from "../../components/SharedComponents/CustomInput";
import ReactQuill from "react-quill";
import axios from "axios";
import { BASE_URL } from "../../utils/baseUrl";
import toast from "react-hot-toast";

const BasicDetailsApproved = ({ handleChange, productData, setProductData }) => {
  const [loading, setLoading] = useState(!productData);
  const [error, setError] = useState("");
  
  // If productId is not passed through productData, 
  // we can get it from the URL params
  const getProductIdFromUrl = () => {
    const urlParts = window.location.pathname.split("/");
    return urlParts[urlParts.length - 1];
  };
  
  // Fetch product data if not provided through props
  useEffect(() => {
    if (!productData) {
      fetchProductData();
    }
  }, [productData]);
  
  const fetchProductData = async () => {
    try {
      setLoading(true);
      const productId = getProductIdFromUrl();
      
      if (!productId) {
        setError("No product ID found");
        setLoading(false);
        return;
      }
      
      console.log("Fetching data for product ID:", productId);
      
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Authentication required");
        setLoading(false);
        return;
      }
      
      const endpoint = `${BASE_URL}/api/vendor/get-one-approved-product/${productId}`;
      
      const response = await axios.get(
        endpoint,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          timeout: 15000
        }
      );
      
      if (!response.data) {
        throw new Error("Empty response from server");
      }
      
      let productDetails;
      
      if (response.data.data) {
        productDetails = response.data.data;
      } else if (response.data.product) {
        productDetails = response.data.product;
      } else {
        throw new Error("Invalid response format");
      }
      
      console.log("Product data fetched successfully:", productDetails);
      
      // Update the parent component state
      if (setProductData) {
        setProductData(productDetails);
      }
      
      toast.success("Product details loaded");
    } catch (err) {
      console.error("Error fetching product details:", err);
      
      const errorMessage = err.response?.data?.message || err.message || "Failed to fetch product details";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };
  
  const handleChangeQuill = (value) => {
    setProductData({ ...productData, description: value });
  };
  
  // Retry if data fetch failed
  const handleRetry = () => {
    setError("");
    fetchProductData();
  };

  return (
    <>
      <Box>
        <Typography variant="h6" gutterBottom>
          Basic Details
        </Typography>
        
        {error && (
          <Alert 
            severity="error" 
            sx={{ mb: 2 }}
            action={
              <Typography 
                variant="button" 
                sx={{ cursor: 'pointer', ml: 2 }} 
                onClick={handleRetry}
              >
                Retry
              </Typography>
            }
          >
            {error}
          </Alert>
        )}
        
        {loading ? (
          <Box display="flex" justifyContent="center" my={4}>
            <CircularProgress />
          </Box>
        ) : productData ? (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <CustomInput
                name="title"
                id="title"
                label="Product Title"
                placeholder="Enter product title"
                value={productData.title || ""}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            
            
          </Grid>
        ) : (
          <Typography color="text.secondary">
            No product data available
          </Typography>
        )}
      </Box>
      
      {productData && (
        <Box sx={{ mt: 3 }}>
          <Typography variant="subtitle1" gutterBottom>
            Product Description
          </Typography>
          <ReactQuill
            value={productData.description || ""}
            onChange={handleChangeQuill}
            style={{
              height: "200px",
              marginBottom: "40px" // Add space for the editor controls
            }}
          />
        </Box>
      )}
    </>
  );
};

export default BasicDetailsApproved;