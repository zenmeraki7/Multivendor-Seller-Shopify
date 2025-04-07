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
  const [productData, setProductData] = useState(null);
  const [media, setMedia] = useState([]);
  const [variantsData, setVariantsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState("");
  
  const navigate = useNavigate();
  const { id } = useParams(); 
  
  console.log("ViewApprovedProduct component rendering with ID:", id);
  
  useEffect(() => {
    setError("");
    
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
    
    console.log(`Changing ${name} to:`, value);
    
    if (name === 'title' || name === 'name') {
      setProductData({ 
        ...productData, 
        [name]: value,
        [name === 'title' ? 'name' : 'title']: value 
      });
    }
    else if (name === 'price' || name === 'compareAtPrice') {
      const numValue = value === '' ? '' : Number(value);
      setProductData({ ...productData, [name]: numValue });
    } else {
      setProductData({ ...productData, [name]: value });
    }
  };

  const fetchProductData = async () => {
    try {
      setLoading(true);
      console.log("Fetching approved product data for ID:", id);
      
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No authentication token found");
        navigate("/login");
        return;
      }
      
      const endpoint = `${BASE_URL}/api/vendor/get-one-approved-product/${id}`;
      console.log("Using API endpoint:", endpoint);
      
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
      
      console.log("Full API response:", response);
      
      if (!response.data) {
        throw new Error("Empty response from server");
      }
      
      if (response.data.data && response.data.data.variants && response.data.data.variants.edges) {
        console.log("Detected Shopify API response format");
        const shopifyData = response.data.data;
        
        const transformedData = {
          id: shopifyData.id,
          name: shopifyData.title || "", 
          title: shopifyData.title || "", 
          description: shopifyData.description,
          descriptionHtml: shopifyData.descriptionHtml,
          productType: shopifyData.productType,
          status: shopifyData.status,
          tags: shopifyData.tags || [],
          price: shopifyData.variants.edges[0]?.node?.price ? 
            Number(shopifyData.variants.edges[0].node.price) : 0,
          compareAtPrice: shopifyData.variants.edges[0]?.node?.compareAtPrice ? 
            Number(shopifyData.variants.edges[0].node.compareAtPrice) : 
            Number(shopifyData.compareAtPriceRange?.maxVariantCompareAtPrice?.amount || 0),
          seoTitle: shopifyData.seo?.title || shopifyData.title || "",
          seoDescription: shopifyData.seo?.description || shopifyData.description || "",
          handle: shopifyData.handle,
          vendor: shopifyData.vendor,
          category: shopifyData.category,
          totalInventory: shopifyData.totalInventory
        };
        
        console.log("Transformed product data:", transformedData);
        setProductData(transformedData);
        
        const transformedMedia = [];
        if (shopifyData.media && shopifyData.media.edges) {
          shopifyData.media.edges.forEach(edge => {
            if (edge.node && edge.node.preview && edge.node.preview.image) {
              transformedMedia.push({
                id: `media-${transformedMedia.length + 1}`,
                url: edge.node.preview.image.url,
                alt: edge.node.preview.image.altText || ""
              });
            }
          });
        }
        
        if (shopifyData.featuredMedia && 
            shopifyData.featuredMedia.preview && 
            shopifyData.featuredMedia.preview.image) {
          const featuredUrl = shopifyData.featuredMedia.preview.image.url;
          if (!transformedMedia.some(m => m.url === featuredUrl)) {
            transformedMedia.unshift({
              id: `media-featured`,
              url: featuredUrl,
              alt: shopifyData.featuredMedia.alt || ""
            });
          }
        }
        
        console.log("Transformed media:", transformedMedia);
        setMedia(transformedMedia);
        
        const transformedVariants = [];
        if (shopifyData.variants && shopifyData.variants.edges) {
          shopifyData.variants.edges.forEach(edge => {
            if (edge.node) {
              const variant = edge.node;
              transformedVariants.push({
                id: variant.id,
                variant: variant.title,
                price: Number(variant.price),
                compareAtPrice: Number(variant.compareAtPrice),
                quantity: variant.inventoryQuantity || 0,
                sku: variant.sku || "",
                barcode: variant.barcode || "",
                variantTypes: [
                  { option: "Color/Style", value: variant.title }
                ]
              });
            }
          });
        }
        
        console.log("Transformed variants:", transformedVariants);
        setVariantsData(transformedVariants);
        
        const variantTitles = new Set(transformedVariants.map(v => v.variant));
        const productOptions = [{
          name: "Color/Style",
          values: Array.from(variantTitles)
        }];
        
        setProductData(prevData => ({
          ...prevData,
          productOptions
        }));
        
        toast.success("Product data loaded successfully");
      } else {
        console.log("Using standard API response format");
        
        let productDataFromResponse;
        
        if (response.data.data) {
          console.log("Using standard response format with .data property");
          productDataFromResponse = response.data.data;
        } else if (response.data.product) {
          console.log("Using alternate response format with .product property");
          productDataFromResponse = response.data.product;
        } else {
          console.log("Using direct response data");
          productDataFromResponse = response.data;
        }
        
        console.log("Extracted product data:", productDataFromResponse);
        
        if (productDataFromResponse) {
          if (productDataFromResponse.title && !productDataFromResponse.name) {
            productDataFromResponse.name = productDataFromResponse.title;
          } else if (productDataFromResponse.name && !productDataFromResponse.title) {
            productDataFromResponse.title = productDataFromResponse.name;
          }
          
        
          if (productDataFromResponse.price !== undefined) {
            productDataFromResponse.price = Number(productDataFromResponse.price);
          }
          
          if (productDataFromResponse.compareAtPrice !== undefined) {
            productDataFromResponse.compareAtPrice = Number(productDataFromResponse.compareAtPrice);
          }
          
          
          if (productDataFromResponse.price === undefined && productDataFromResponse.salePrice !== undefined) {
            productDataFromResponse.price = Number(productDataFromResponse.salePrice);
          }
          
          if (productDataFromResponse.compareAtPrice === undefined && productDataFromResponse.comparePrice !== undefined) {
            productDataFromResponse.compareAtPrice = Number(productDataFromResponse.comparePrice);
          }
        }
        
        // Set product data
        setProductData(productDataFromResponse);
        
        // Handle media
        if (productDataFromResponse.media && Array.isArray(productDataFromResponse.media)) {
          const validMedia = productDataFromResponse.media.filter(item => item && (item._id || item.id) && item.url);
          setMedia(validMedia);
        } else {
          setMedia([]);
        }
        
        // Handle variants
        if (productDataFromResponse.variants && Array.isArray(productDataFromResponse.variants)) {
          const processedVariants = productDataFromResponse.variants.map(variant => ({
            ...variant,
            price: variant.price !== undefined ? Number(variant.price) : productDataFromResponse.price || 0,
            compareAtPrice: variant.compareAtPrice !== undefined ? 
              Number(variant.compareAtPrice) : productDataFromResponse.compareAtPrice || 0
          }));
          
          setVariantsData(processedVariants);
        } else {
          setVariantsData([]);
        }
        
        toast.success("Product data loaded successfully");
      }
    } catch (err) {
      console.error("Error fetching product:", err);
      
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
      
      
      const payload = {
        ...productData,
        media: media.map(item => item._id || item.id), 
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