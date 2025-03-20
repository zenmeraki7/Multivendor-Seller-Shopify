import React, { useState } from "react";
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
} from "@mui/material";

import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

const MediaDetails = () => {
  const [media, setMedia] = useState({
    thumbnail: null,
    productImages: [],
    existingImages: [],
  });
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);

    setMedia((prevMedia) => ({
      ...prevMedia,
      productImages: [...prevMedia.productImages, imageUrl],
    }));
  };

  // Simulate fetching existing images
  const fetchExistingImages = () => {
    const sampleImages = [
      "https://variety.com/wp-content/uploads/2013/05/minion-biz-featured.jpg?w=1000&h=667&crop=1",
      "https://images7.alphacoders.com/677/thumb-1920-677436.jpg",
      "https://images6.alphacoders.com/138/1388945.png",
    ];

    setMedia((prevMedia) => ({
      ...prevMedia,
      productImages: [...prevMedia.productImages, ...sampleImages],
    }));
  };
  return (
    <>
      <Box sx={{ mt: 9 }}>
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
              onClick={() => document.getElementById("upload-new").click()}
              sx={{ px: 3 }}
            >
              Upload New
            </Button>
            <Button variant="outlined" onClick={fetchExistingImages}>
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

          {media.productImages.length > 0 && (
            <Box sx={{ mt: 3 }}>
              <Typography variant="subtitle1" gutterBottom align="left">
                Product Images
              </Typography>
              <Divider sx={{ mb: 2 }} />

              <Grid container spacing={2}>
                {media.productImages.map((image, index) => (
                  <Grid item xs={6} sm={4} md={3} key={index}>
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
                        height={index === 0 ? "200" : "100"}
                        image={image}
                        alt={`Image ${index + 1}`}
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
                        onClick={() => handleRemoveImage(index)}
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
          )}
        </Box>
      </Box>
    </>
  );
};

export default MediaDetails;
