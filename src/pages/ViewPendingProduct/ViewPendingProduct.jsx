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

// Import child components
import ProductOrganizationDetailsPending from "./ProductOrganizationDetailsPending";
import SeoDetailsPending from "./SeoDetailsPending";
import VariantDetailsPending from "./VariantDetails";
import BasicDetailsPending from "./BasicDetailsPending";
import MediaDetailsPending from "./MediaDetailsPending";

function ViewPendingProduct() {
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
  
  // Fetch product data when component mounts
  useEffect(() => {
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

  // Fetch product data from backend
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
      
      // Set product data
      setProductData(data);
      
      // Initialize media if it exists in response
      if (data.media && Array.isArray(data.media)) {
        console.log("Media data found:", data.media);
        setMedia(data.media);
      } else {
        console.log("No media data found in response");
        // Attempt to fetch media separately
        fetchProductMedia(id);
      }
      
      // Initialize variants if they exist
      if (data.variants && Array.isArray(data.variants)) {
        console.log("Variants data found:", data.variants);
        setVariantsData(data.variants);
      } else {
        console.log("No variants data found in response");
      }
      
      toast.success("Product data loaded successfully");
    } catch (err) {
      console.error("Error fetching product:", err);
      
      if (
        err.response &&
        (err.response.status === 404 || err.response.status === 401)
      ) {
        if (err.response.status === 401) {
          localStorage.removeItem("token");
          navigate("/login");
          toast.error("Session expired. Please login again.");
        } else {
          toast.error("Product not found");
        }
      } else {
        setError("Error fetching product data. Please try again.");
        toast.error("Failed to load product data");
      }
    } finally {
      setLoading(false);
    }
  };

  // Fetch product media separately if needed
  const fetchProductMedia = async (productId) => {
    try {
      console.log("Fetching media for product ID:", productId);
      
      const response = await axios.get(
        `${BASE_URL}/api/product/get-product-media/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      
      if (response.data && response.data.data) {
        console.log("Media fetched separately:", response.data.data);
        setMedia(response.data.data);
      } else {
        console.log("No media returned from dedicated endpoint");
      }
    } catch (err) {
      console.error("Error fetching product media:", err);
      console.log("Will continue with empty media array");
      setMedia([]);
    }
  };

  // Update product data
//   const handleUpdateProduct = async () => {
//     try {
//       setUpdating(true);
      
//       // Prepare the payload with all the updated data
//       const payload = {
//         ...productData,
//         media: media.map(item => item._id), // Only send the IDs
//         variants: variantsData,
//       };
      
//       console.log("Updating product with payload:", payload);
      
//       await axios.put(
//         `${BASE_URL}/api/product/update-pending-product/${id}`,
//         payload,
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         }
//       );
      
//       toast.success("Product updated successfully");
//     } catch (err) {
//       console.error("Error updating product:", err);
//       toast.error("Failed to update product");
//       setError("Error updating product. Please try again.");
//     } finally {
//       setUpdating(false);
//     }
//   };

  // Loading state
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

  // Error state
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
          Back to List
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
          <Paper elevation={1} sx={{ p: 2, bgcolor: "#f2f2f270", mb: 2,height:'500px' }}>
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
          <ProductOrganizationDetailsPending
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
              {updating ? "Updating..." : "Update Product"}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

export default ViewPendingProduct;