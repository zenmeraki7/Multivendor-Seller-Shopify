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
import MediaDetailsApproved from "./MediaDetailsApproved";
import ProductOrganizationDetailsApproved from "./ProductOrganizationDetailsApproved";
import SeoDetailsApproved from "./SeoDetailsApproved";
import VariantDetailsApproved from "./VariantDetailsApproved";
import BasicDetailsApproved from "./BasicDetailsApproved";

function ViewApprovedProduct() {
  // State for product data
  const [productData, setProductData] = useState(null);
  const [media, setMedia] = useState([]);
  const [variantsData, setVariantsData] = useState([]);
  
  // Loading and error states
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState("");
  
  const navigate = useNavigate();
  const { id } = useParams(); // Get the product ID from URL params
  
  console.log("ViewApprovedProduct component rendering with ID:", id);
  console.log("Current BASE_URL:", BASE_URL);
  
  // Fetch product data when component mounts
  useEffect(() => {
    // Clear any previous errors
    setError("");
    
    if (id) {
      fetchProductData();
    } else {
      setError("No product ID provided");
      setLoading(false);
    }
    
    // Warn user about unsaved changes when leaving page
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = "Are you sure you want to leave? Your changes may not be saved.";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [id]);

  // Handle input changes
  const handleChange = (e) => {
    const { value, name } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  // Fetch product data from backend with better error handling and debugging
  const fetchProductData = async () => {
    try {
      setLoading(true);
      console.log("Fetching approved product data for ID:", id);
      
      // Check the token first
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No authentication token found");
        navigate("/login");
        return;
      }
      
      const endpoint = `${BASE_URL}/api/vendor/get-one-approved-product/${id}`;
      console.log("Using API endpoint:", endpoint);
      
      // Add timeout to API request to avoid hanging
      const response = await axios.get(
        endpoint,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          timeout: 15000 // 15 second timeout
        }
      );
      
      // Log the full response for debugging
      console.log("Full API response:", response);
      
      if (!response.data) {
        throw new Error("Empty response from server");
      }
      
      if (!response.data.data) {
        console.warn("Response missing data property:", response.data);
        
        // Try to handle alternate response formats
        if (response.data.product) {
          console.log("Found product data in alternate format");
          setProductData(response.data.product);
          
          // Handle media and variants from this format if available
          if (response.data.product.media) {
            setMedia(response.data.product.media);
          }
          
          if (response.data.product.variants) {
            setVariantsData(response.data.product.variants);
          }
          
          toast.success("Product data loaded successfully");
          setLoading(false);
          return;
        } else {
          throw new Error("Invalid response format: missing data property");
        }
      }
      
      const data = response.data.data;
      console.log("Product data successfully extracted:", data);
      
      // Set product data
      setProductData(data);
      
      // Initialize media if it exists in response
      if (data.media && Array.isArray(data.media)) {
        console.log("Media data found in product response:", data.media);
        
        // Validate media data
        const validMedia = data.media.filter(item => item && (item._id || item.id) && item.url);
        console.log("Valid media items:", validMedia);
        
        if (validMedia.length > 0) {
          setMedia(validMedia);
        } else {
          console.warn("Media data exists but has invalid format, fetching separately");
          // fetchProductMedia(id);
        }
      } else {
        console.log("No media data found in product response, fetching separately");
        // fetchProductMedia(id);
      }
      
      // Initialize variants if they exist
      if (data.variants && Array.isArray(data.variants)) {
        console.log("Variants data found:", data.variants.length, "variants");
        setVariantsData(data.variants);
      } else if (data.productOptions && Array.isArray(data.productOptions) && data.productOptions.length > 0) {
        console.log("Product options found, but no variants. Will be generated by child component.");
      } else {
        console.log("No variants or product options found in response");
      }
      
      toast.success("Product data loaded successfully");
    } catch (err) {
      console.error("Error fetching product:", err);
      
      // Log detailed error information
      if (err.response) {
        console.error("Response error details:", {
          status: err.response.status,
          statusText: err.response.statusText,
          data: err.response.data
        });
        
        if (err.response.status === 404) {
          toast.error("Product not found");
          setError("Product not found or may have been deleted");
        } else if (err.response.status === 401 || err.response.status === 403) {
          localStorage.removeItem("token");
          toast.error("Session expired. Please login again.");
          navigate("/login");
        } else {
          setError(`Server error: ${err.response.data?.message || err.response.statusText || "Unknown error"}`);
          toast.error("Failed to load product data");
        }
      } else if (err.code === 'ECONNABORTED') {
        // Handle timeout
        setError("Request timed out. Server may be unavailable.");
        toast.error("Server request timed out");
      } else {
        setError(`Error fetching product data: ${err.message || "Unknown error"}`);
        toast.error("Failed to load product data");
      }
    } finally {
      setLoading(false);
    }
  };

  // Fetch product media separately if needed with better logging
  // const fetchProductMedia = async (productId) => {
  //   try {
  //     console.log("Fetching media separately for approved product ID:", productId);
      
  //     const token = localStorage.getItem("token");
  //     if (!token) {
  //       console.error("No authentication token found for media fetch");
  //       return;
  //     }
      
  //     // Try the approved product media endpoint first
  //     const mediaEndpoint = `${BASE_URL}/api/product/get-approved-product-media/${productId}`;
  //     console.log("Using media API endpoint:", mediaEndpoint);
      
  //     const response = await axios.get(
  //       mediaEndpoint,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //           'Content-Type': 'application/json'
  //         },
  //         timeout: 10000 // 10 second timeout
  //       }
  //     );
      
  //     console.log("Media API response:", response);
      
  //     if (response.data && response.data.data) {
  //       console.log("Media fetched separately:", response.data.data);
        
  //       // Validate media data
  //       const validMedia = response.data.data.filter(item => item && (item._id || item.id) && item.url);
        
  //       if (validMedia.length > 0) {
  //         setMedia(validMedia);
  //       } else {
  //         console.warn("Media response contains invalid data format");
  //         setMedia([]);
  //       }
  //     } else if (response.data && Array.isArray(response.data)) {
  //       // Handle direct array response
  //       console.log("Media returned as direct array");
  //       setMedia(response.data);
  //     } else {
  //       console.log("No valid media returned from dedicated endpoint");
  //       setMedia([]);
  //     }
  //   } catch (err) {
  //     console.error("Error fetching product media:", err);
      
  //     // Try general product media endpoint as fallback
  //     try {
  //       console.log("Trying fallback media endpoint");
  //       const fallbackEndpoint = `${BASE_URL}/api/product/get-product-media/${productId}`;
        
  //       const fallbackResponse = await axios.get(
  //         fallbackEndpoint,
  //         {
  //           headers: {
  //             Authorization: `Bearer ${localStorage.getItem("token")}`,
  //             'Content-Type': 'application/json'
  //           },
  //           timeout: 10000
  //         }
  //       );
        
  //       if (fallbackResponse.data && fallbackResponse.data.data) {
  //         console.log("Media fetched from fallback endpoint:", fallbackResponse.data.data);
  //         setMedia(fallbackResponse.data.data);
  //       } else if (fallbackResponse.data && Array.isArray(fallbackResponse.data)) {
  //         console.log("Media returned as direct array from fallback");
  //         setMedia(fallbackResponse.data);
  //       } else {
  //         console.log("No media from fallback endpoint either");
  //         setMedia([]);
  //       }
  //     } catch (fallbackErr) {
  //       console.error("Fallback media fetch also failed:", fallbackErr);
  //       setMedia([]);
  //     }
  //   }
  // };

  // Retry API call function
  const retryFetch = () => {
    setError("");
    setLoading(true);
    fetchProductData();
  };

  // Update product data with correct endpoint
  const handleUpdateProduct = async () => {
    try {
      setUpdating(true);
      
      // Prepare the payload with all the updated data
      const payload = {
        ...productData,
        media: media.map(item => item._id || item.id), // Handle both _id and id formats
        variants: variantsData,
      };
      
      console.log("Updating approved product with payload:", payload);
      
      // Use the correct endpoint for approved products
      const updateEndpoint = `${BASE_URL}/api/product/update-approved-product/${id}`;
      console.log("Using update endpoint:", updateEndpoint);
      
      const response = await axios.put(
        updateEndpoint,
        payload,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            'Content-Type': 'application/json'
          },
          timeout: 15000
        }
      );
      
      console.log("Update response:", response);
      toast.success("Product updated successfully");
    } catch (err) {
      console.error("Error updating product:", err);
      
      if (err.response) {
        console.error("Update error details:", {
          status: err.response.status,
          statusText: err.response.statusText,
          data: err.response.data
        });
        
        if (err.response.status === 401 || err.response.status === 403) {
          localStorage.removeItem("token");
          toast.error("Session expired. Please login again.");
          navigate("/login");
          return;
        }
      }
      
      toast.error("Failed to update product: " + (err.response?.data?.message || err.message || "Unknown error"));
      setError(`Error updating product: ${err.response?.data?.message || err.message || "Unknown error"}`);
    } finally {
      setUpdating(false);
    }
  };

  // Loading state
  if (loading && !productData) {
    return (
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="50vh">
          <CircularProgress />
          <Typography variant="h6" sx={{ mt: 2 }}>
            Loading approved product data...
          </Typography>
        </Box>
      </Container>
    );
  }

  // Error state
  if (error && !productData) {
    return (
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="50vh">
          <Typography variant="h6" color="error">
            {error}
          </Typography>
          <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
            <Button 
              variant="contained" 
              color="primary" 
              onClick={retryFetch}
            >
              Retry
            </Button>
            <Button 
              variant="outlined" 
              color="primary" 
              onClick={() => navigate("/approved-products")}
            >
              Back to Products
            </Button>
          </Box>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5">
          View/Edit Approved Product
        </Typography>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => navigate("/approved-products")}
        >
          Back to List
        </Button>
      </Box>
      
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
          <Button 
            size="small" 
            sx={{ ml: 2 }} 
            onClick={retryFetch}
          >
            Retry
          </Button>
        </Alert>
      )}
      
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          {/* Basic Info Tab */}
          <Paper elevation={1} sx={{ p: 2, bgcolor: "#f2f2f270", mb: 2 }}>
            <BasicDetailsApproved
              handleChange={handleChange}
              productData={productData}
              setProductData={setProductData}
            />
          </Paper>
          
          {/* Media */}
          <Paper elevation={1} sx={{ p: 2, bgcolor: "#f2f2f270", mb: 2 }}>
            <MediaDetailsApproved
              setMedia={setMedia} 
              media={media} 
              productId={id}
            />
          </Paper>
          
          {/* Variants */}
          <Paper elevation={1} sx={{ p: 2, bgcolor: "#f2f2f270", mb: 2 }}>
            <VariantDetailsApproved
              variantsData={variantsData}
              setVariantsData={setVariantsData}
              setProductData={setProductData}
              productData={productData}
            />
          </Paper>
          
          {/* SEO */}
          <Paper elevation={1} sx={{ p: 2, bgcolor: "#f2f2f270", mb: 2 }}>
            <SeoDetailsApproved
              productData={productData}
              setProductData={setProductData}
            />
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          {/* Product Organization */}
          <ProductOrganizationDetailsApproved
            handleChange={handleChange}
            productData={productData}
            setProductData={setProductData}
          />
          
          {/* Action button */}
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleUpdateProduct}
              disabled={updating}
              fullWidth
            >
              {updating ? <><CircularProgress size={24} sx={{ mr: 1 }} color="inherit" /> Updating...</> : "Update Product"}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

export default ViewApprovedProduct;