import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardMedia,
  Button,
  Stack,
  IconButton,
  Divider,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Avatar,
  Checkbox,
  CircularProgress,
} from "@mui/material";

import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import toast from "react-hot-toast";
import axios from "axios";
import { BASE_URL } from "../../utils/baseUrl";

const MediaDetailsPending = ({ setMedia, media, productId }) => {
  const [open, setOpen] = React.useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    console.log("Media:", media);
    console.log("Selected Images:", selectedImages);
    
    if (productId && (!media || media.length === 0)) {
      fetchShopifyMedia(productId);
    }
  }, [productId]);

  useEffect(() => {
    fetchExistingImages();
  }, []);

  const fetchExistingImages = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/images/getall`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      
      if (response.data && response.data.success && response.data.data) {
        setExistingImages(response.data.data);
      }
    } catch (err) {
      console.error("Error fetching existing images:", err);
      toast.error("Failed to load image library");
    }
  };

  const fetchShopifyMedia = async (id) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${BASE_URL}/api/product/get-shopify-product/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      
      if (response.data && response.data.success && response.data.data) {
        const shopifyData = response.data.data;
        console.log("Shopify data:", shopifyData);
        
        const transformedMedia = [];
        
        
        if (shopifyData.media && shopifyData.media.edges) {
          shopifyData.media.edges.forEach(edge => {
            if (edge.node && edge.node.preview && edge.node.preview.image) {
              transformedMedia.push({
                _id: `media-${transformedMedia.length + 1}`,
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
              _id: `media-featured`,
              url: featuredUrl,
              alt: shopifyData.featuredMedia.alt || ""
            });
          }
        }
        
        if (shopifyData.images && Array.isArray(shopifyData.images)) {
          shopifyData.images.forEach((image, index) => {
            if (image.url && !transformedMedia.some(m => m.url === image.url)) {
              transformedMedia.push({
                _id: image._id || `image-${index}`,
                url: image.url,
                alt: image.alt || ""
              });
            }
          });
        }
        
        console.log("Transformed media:", transformedMedia);
        
        if (transformedMedia.length > 0) {
          setMedia(transformedMedia);
          toast.success("Media loaded from Shopify");
        }
      }
    } catch (err) {
      console.error("Error fetching Shopify media:", err);
      toast.error("Failed to load media from Shopify");
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (item) => {
    setSelectedImages(
      (prevSelected) =>
        prevSelected.some(img => img._id === item._id)
          ? prevSelected.filter((i) => i._id !== item._id) 
          : [...prevSelected, item] 
    );
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedImages([]);
  };

  const handleSaveExistingImages = () => {
    const imgs = selectedImages.filter(
      (item) => !media.some((img) => img._id === item._id)
    );

    setMedia((prevMedia) => [...prevMedia, ...imgs]);
    toast.success(`Added ${imgs.length} image(s) to product`);
    setOpen(false);
    setSelectedImages([]);
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formdata = new FormData();
    formdata.append("image", file);
    
    try {
      toast.loading("Uploading image...");
      const response = await axios.post(
        `${BASE_URL}/api/images/create`,
        formdata,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      
      toast.dismiss();
      
      if (response.data && response.data.success && response.data.data) {
        console.log("Image Created:", response.data.data);
        setMedia((prevMedia) => [...prevMedia, response.data.data]);
        toast.success("Image uploaded successfully");
        
        fetchExistingImages();
      } else {
        throw new Error(response.data?.message || "Upload failed");
      }
    } catch (error) {
      toast.dismiss();
      toast.error(error.response?.data?.message || "Error uploading image");
      console.log(
        "Error uploading image:",
        error.response?.data || error.message
      );
    }
  };

  const handleRemoveImage = (id) => {
    const updatedMedias = media.filter((item) => item._id !== id);
    setMedia(updatedMedias);
    toast.success("Image removed");
  };

  return (
    <>
      <Box sx={{ mt: 2 }}>
        <Typography gutterBottom fontWeight={"bold"}>
          Media
        </Typography>
        <Box
          sx={{
            border: "2px dashed #e0e0e0",
            p: 4,
            borderRadius: 2,
            backgroundColor: "#f9f9f9",
            textAlign: "center",
          }}
        >
          <Typography variant="h6" gutterBottom>
            Product Media
          </Typography>
          <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
            Drag and drop your images here or use the buttons below
          </Typography>

          <Stack
            direction="row"
            spacing={2}
            justifyContent="center"
            sx={{ mb: 3 }}
          >
            <Button
              variant="contained"
              size="small"
              onClick={() => document.getElementById("upload-new").click()}
              sx={{ px: 3 }}
            >
              Upload New
            </Button>
            <Button variant="outlined" size="small" onClick={handleClickOpen}>
              Select From Library
            </Button>
          </Stack>

          <input
            type="file"
            id="upload-new"
            style={{ display: "none" }}
            onChange={(e) => handleImageUpload(e)}
            accept="image/*"
          />

          {loading ? (
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', my: 4 }}>
              <CircularProgress size={40} />
              <Typography variant="body2" sx={{ mt: 2 }}>Loading media from Shopify...</Typography>
            </Box>
          ) : media && media.length > 0 ? (
            <Box sx={{ mt: 3 }}>
              <Typography variant="subtitle1" gutterBottom align="left">
                Product Images ({media.length})
              </Typography>
              <Divider sx={{ mb: 2 }} />

              <Grid container spacing={2}>
                {media.map((image, index) => (
                  <Grid item xs={6} sm={4} md={3} key={image._id || index}>
                    <Card
                      sx={{
                        position: "relative",
                        "&:hover .delete-icon": {
                          opacity: 1,
                        },
                      }}
                    >
                      <CardMedia
                        component="img"
                        height={index === 0 ? "200" : "150"}
                        image={image.url}
                        alt={image.alt || `Image ${index + 1}`}
                        sx={{ borderRadius: 1 }}
                      />
                      <IconButton
                        size="small"
                        className="delete-icon"
                        sx={{
                          position: "absolute",
                          top: 8,
                          right: 8,
                          bgcolor: "rgba(255, 255, 255, 0.9)",
                          opacity: 0,
                          transition: "opacity 0.2s",
                        }}
                        onClick={() => handleRemoveImage(image._id)}
                      >
                        <DeleteOutlineIcon fontSize="small" />
                      </IconButton>
                      {index === 0 && (
                        <Typography
                          variant="caption"
                          sx={{
                            position: "absolute",
                            bottom: 0,
                            left: 0,
                            right: 0,
                            bgcolor: "rgba(0, 0, 0, 0.6)",
                            color: "white",
                            p: 0.5,
                            textAlign: "center",
                          }}
                        >
                          Main Photo
                        </Typography>
                      )}
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
          ) : (
            <Box sx={{ py: 4, bgcolor: '#f0f0f0', borderRadius: 1 }}>
              <Typography variant="body2" color="textSecondary">
                No images added yet. Upload or select from library.
              </Typography>
            </Box>
          )}
        </Box>
      </Box>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="md"
        fullWidth
      >
        <DialogTitle id="alert-dialog-title">
          {"Your uploaded image files"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Grid container spacing={1} width={"100%"} sx={{ maxHeight: "400px", overflow: "auto" }}>
              {existingImages.length > 0 ? (
                existingImages.map((item, index) => (
                  <Grid item xs={6} sm={4} md={3} key={index}>
                    <Box
                      sx={{
                        position: "relative",
                        width: "100%",
                        height: "100px",
                        cursor: "pointer",
                        border: selectedImages.some(img => img._id === item._id) 
                          ? "2px solid #1976d2" 
                          : "1px solid #e0e0e0",
                        borderRadius: "8px",
                        overflow: "hidden",
                      }}
                      onClick={() => handleSelect(item)}
                    >
                      <Checkbox
                        size="small"
                        checked={selectedImages.some(img => img._id === item._id)}
                        onChange={() => handleSelect(item)}
                        sx={{
                          position: "absolute",
                          top: 5,
                          left: 5,
                          bgcolor: "rgba(255, 255, 255, 0.8)",
                          borderRadius: "4px",
                          zIndex: 99,
                        }}
                      />
                      <Avatar
                        sx={{
                          width: "100%",
                          height: "100px",
                        }}
                        src={item.url}
                        variant="square"
                      />
                    </Box>
                  </Grid>
                ))
              ) : (
                <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', py: 4 }}>
                  <Typography>No images available in library</Typography>
                </Box>
              )}
            </Grid>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button 
            onClick={handleSaveExistingImages} 
            disabled={selectedImages.length === 0}
            variant="contained"
            color="primary"
          >
            Add Selected ({selectedImages.length})
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default MediaDetailsPending;