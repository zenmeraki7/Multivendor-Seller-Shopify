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
} from "@mui/material";

import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import toast from "react-hot-toast";
import axios from "axios";
import { BASE_URL } from "../../utils/baseUrl";

const MediaDetails = ({ setMedia, media }) => {
  const [open, setOpen] = React.useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  // const [selectedImageIds, setSelectedImageIds] = useState([]);
  // const [selectedExistingUrls, setSelectedExistingUrls] = useState([]);

  useEffect(() => {
    console.log("Media:", media);
    console.log("Selected Images:", selectedImages);
  }, [media, selectedImages]); // Runs whenever these states change

  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/images/getall`)
      .then((res) => setExistingImages(res.data.data))
      .catch((err) => console.log(err));
  }, []);

  const handleSelect = (item) => {
    setSelectedImages(
      (prevSelected) =>
        prevSelected.includes(item)
          ? prevSelected.filter((i) => i._id !== item._id) // Unselect
          : [...prevSelected, item] // Select
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
      (item) => !media.some((img) => img._id == item._id)
    );

    setMedia((prevMedia) => [...prevMedia, ...imgs]);
    setOpen(false);
    setSelectedImages([]);
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formdata = new FormData();
    formdata.append("image", file);
    // const imageUrl = URL.createObjectURL(file);
    try {
      toast.loading();
      const response = await axios.post(
        `${BASE_URL}/api/images/create`,
        formdata,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.dismiss();
      console.log("image Created:", response.data.data);
      setMedia((prevMedia) => [...prevMedia, response.data?.data]);
      // setSelectedImageIds([...selectedImageIds, response.data.data._id]);
    } catch (error) {
      console.log(
        "Error uploading image:",
        error.response?.data || error.message
      );
    }
  };

  const handleRemoveImage = (id) => {
    const updatedMedias = media.filter((item) => item._id !== id);
    setMedia(updatedMedias);
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

          {media.length > 0 && (
            <Box sx={{ mt: 3 }}>
              <Typography variant="subtitle1" gutterBottom align="left">
                Product Images
              </Typography>
              <Divider sx={{ mb: 2 }} />

              <Grid container spacing={2}>
                {media?.map((image, index) => (
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
                        image={image.url}
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
          )}
        </Box>
      </Box>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Your uploaded image files"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Grid container spacing={1} width={"100%"} height={"400px"}>
              {existingImages.length > 0 ? (
                existingImages?.map((item, index) => (
                  <Grid item xs={3} key={index}>
                    <Box
                      sx={{
                        position: "relative",
                        width: "100%",
                        height: "100px",
                      }}
                    >
                      {/* Checkbox Positioned at the Top-Left */}
                      <Checkbox
                        size="small"
                        checked={selectedImages.includes(item)}
                        onChange={() => handleSelect(item)}
                        sx={{
                          position: "absolute",
                          top: 5,
                          left: 5,
                          bgcolor: "rgba(255, 255, 255, 0.8)", // Light background for visibility
                          borderRadius: "4px",
                          zIndex: 99,
                        }}
                      />
                      {/* Image */}
                      <Avatar
                        sx={{
                          width: "100%",
                          height: "100px",
                          borderRadius: "8px",
                        }}
                        src={item.url}
                        variant="rounded"
                      />
                    </Box>
                  </Grid>
                ))
              ) : (
                <Typography>Existing files note found!</Typography>
              )}
            </Grid>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSaveExistingImages} autoFocus>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default MediaDetails;
