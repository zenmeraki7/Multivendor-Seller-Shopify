import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Paper,
  Container,
  Grid,
  CircularProgress,
  Typography,
  Alert,
} from "@mui/material";
import axios from "axios";
import { BASE_URL } from "../../utils/baseUrl";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

import ProductOrganizationDetailsPending from "./ProductOrganizationDetailsPending";
import SeoDetailsPending from "./SeoDetailsPending";
import VariantDetailsPending from "./VariantDetailsPending";
import BasicDetailsPending from "./BasicDetailsPending";
import MediaDetailsPending from "./MediaDetailsPending";

function ViewPendingProduct() {
  const [productData, setProductData] = useState(null);
  const [media, setMedia] = useState([]);
  const [variantsData, setVariantsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState("");
  
  const navigate = useNavigate();
  const { id } = useParams(); 
  
  useEffect(() => {
    if (id) {
      fetchProductData();
    } else {
      setError("No product ID provided");
      setLoading(false);
    }
    
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = "Are you sure you want to leave? Your changes may not be saved.";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [id]);

  const handleChange = (e) => {
    const { value, name } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  const fetchProductData = async () => {
    try {
      setLoading(true);
      console.log("Fetching product data for ID:", id);
      
      const response = await axios.get(
        `${BASE_URL}/api/product/get-one-pending-product/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      
      if (!response.data || !response.data.data) {
        throw new Error("Invalid response format");
      }
      
      const data = response.data.data;
      console.log("Product data received:", data);
      
      setProductData(data);
      
      if (data.images && Array.isArray(data.images)) {
        console.log("Media data found:", data.images);
        const processedMedia = data.images.map((img, index) => ({
          _id: img._id || `image-${index}`,
          url: img.url,
          alt: img.alt || ""
        }));
        setMedia(processedMedia);
      } else {
        console.log("No media data found in response");
        setMedia([]);
      }
      
      if (data.variants && Array.isArray(data.variants)) {
        console.log("Variants data found:", data.variants);
        setVariantsData(data.variants);
      } else {
        console.log("No variants data found in response");
        setVariantsData([]);
      }
      
      toast.success("Product data loaded successfully");
    } catch (err) {
      console.error("Error fetching product:", err);
      
      if (err.response) {
        if (err.response.status === 401) {
          localStorage.removeItem("token");
          navigate("/login");
          toast.error("Session expired. Please login again.");
        } else if (err.response.status === 404) {
          toast.error("Product not found");
        } else {
          setError(`Error fetching product data: ${err.response.data?.message || 'Unknown error'}`);
          toast.error("Failed to load product data");
        }
      } else {
        setError("Network error. Please check your connection and try again.");
        toast.error("Connection error");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProduct = async () => {
    try {
      setUpdating(true);
      
      const payload = {
        ...productData,
        images: media.map(item => ({
          _id: item._id,
          url: item.url,
          alt: item.alt || ""
        })),
        variants: variantsData,
      };
      
      console.log("Updating product with payload:", payload);
      
      const response = await axios.put(
        `${BASE_URL}/api/product/update-pending-product/${id}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      
      if (response.data && response.data.success) {
        toast.success("Product updated successfully");
        fetchProductData();
      } else {
        throw new Error(response.data?.message || "Update failed");
      }
    } catch (err) {
      console.error("Error updating product:", err);
      toast.error(err.response?.data?.message || "Failed to update product");
      setError("Error updating product. Please try again.");
    } finally {
      setUpdating(false);
    }
  };

  if (loading && !productData) {
    return (
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="50vh">
          <CircularProgress />
          <Typography variant="h6" sx={{ mt: 2 }}>
            Loading product data...
          </Typography>
        </Box>
      </Container>
    );
  }

  if (error && !productData) {
    return (
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="50vh">
          <Typography variant="h6" color="error">
            {error}
          </Typography>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={() => navigate("/pending-products")}
            sx={{ mt: 2 }}
          >
            Back to Products
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5">
          View/Edit Pending Product
        </Typography>
        <Button 
          variant="outlined" 
          color="primary" 
          onClick={() => navigate("/pending-products")}
        >
          Back to Products
        </Button>
      </Box>
      
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          {/* Basic Info Tab */}
          <Paper elevation={1} sx={{ p: 2, bgcolor: "#f2f2f270", mb: 2, height: 'auto', minHeight: '500px' }}>
            <BasicDetailsPending
              handleChange={handleChange}
              productData={productData}
              setProductData={setProductData}
            />
          </Paper>
          
          {/* Media */}
          <Paper elevation={1} sx={{ p: 2, bgcolor: "#f2f2f270", mb: 2 }}>
            <MediaDetailsPending 
              setMedia={setMedia} 
              media={media} 
              productId={id}
            />
          </Paper>
          
          {/* Variants */}
          <Paper elevation={1} sx={{ p: 2, bgcolor: "#f2f2f270", mb: 2 }}>
            <VariantDetailsPending
              variantsData={variantsData}
              setVariantsData={setVariantsData}
              setProductData={setProductData}
              productData={productData}
            />
          </Paper>
          
          {/* SEO */}
          <Paper elevation={1} sx={{ p: 2, bgcolor: "#f2f2f270", mb: 2 }}>
            <SeoDetailsPending
              productData={productData}
              setProductData={setProductData}
            />
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          {/* Product Organization */}
          <Paper elevation={1} sx={{ p: 2, bgcolor: "#f2f2f270", mb: 2 }}>
            <ProductOrganizationDetailsPending
              handleChange={handleChange}
              productData={productData}
              setProductData={setProductData}
            />
          </Paper>
          
          {/* Action buttons */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 3 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleUpdateProduct}
              disabled={updating}
              fullWidth
              sx={{ py: 1.5 }}
            >
              {updating ? (
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <CircularProgress size={20} color="inherit" sx={{ mr: 1 }} />
                  Updating...
                </Box>
              ) : (
                "Update Product"
              )}
            </Button>
            
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => navigate("/pending-products")}
              fullWidth
              sx={{ py: 1.5 }}
            >
              Cancel
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

export default ViewPendingProduct;