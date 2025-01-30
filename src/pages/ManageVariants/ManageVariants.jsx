
import React, { useEffect, useState } from "react";
import {
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Modal,
  Box,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
} from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import axios from "axios";
import { BASE_URL } from "../../utils/baseUrl";
import toast from "react-hot-toast";

const validationSchema = Yup.object().shape({
  attribute: Yup.string()
    .required("Attribute is required")
    .min(3, "Attribute must be at least 3 characters long")
    .max(50, "Attribute must not exceed 50 characters"),

  value: Yup.string()
    .required("Value is required")
    .min(3, "Value must be at least 3 characters long")
    .max(50, "Value must not exceed 50 characters"),

  additionalPrice: Yup.number()
    .required("Additional Price is required")
    .min(0, "Additional Price must be a positive number")
    .typeError("Additional Price must be a valid number"),

  stock: Yup.number()
    .required("Stock is required")
    .min(0, "Stock cannot be negative")
    .typeError("Stock must be a valid number"),

  // image: Yup.mixed()
  //   .test("fileSize", "Image is required", (value) => value !== null) // Check if file exists
  //   .test(
  //     "fileType",
  //     "Supported formats are JPG, JPEG, PNG, or GIF",
  //     (value) =>
  //       value &&
  //       [
  //         "image/jpeg",
  //         "image/png",
  //         "image/gif",
  //         "image/webp",
  //         "image/jpg",
  //       ].includes(value.type)
  //   )
  //   .test("fileSize", "File size must be less than 5MB", (value) =>
  //     value ? value.size <= 5 * 1024 * 1024 : true
  //   ),
});

const ManageVariants = () => {
  const { id, title } = useParams();

  const [variants, setVariants] = useState();
  const [openEditModal, setOpenEditModal] = useState(false);
  const [isActionAdd, setIsActionAdd] = useState(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [variantToDelete, setVariantToDelete] = useState(null);
  // State for the form fields (attribute, value, etc.)
  const [selectedVariant, setSelectedVariant] = useState({
    attribute: "",
    value: "",
    additionalPrice: 0,
    stock: 0,
  });
  console.log(selectedVariant);
  // State for the actual image file
  const [imageFile, setImageFile] = useState(null);
  console.log(imageFile);

  // State for the image preview URL
  const [imagePreview, setImagePreview] = useState("");
  const [validationErrors, setValidationErrors] = useState({}); // Store validation errors
  const navigate = useNavigate();

  const fetchProductData = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/api/product/get-one/${id}?fields=variants`,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`, // Assuming the token is stored in localStorage
          },
        }
      );
      console.log(response);
      const { data } = response.data;
      setVariants(data.variants);
    } catch (err) {
      console.log(err);
      toast.error("Error fetching product data");
      //   setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductData();
  }, [id]);

  // Handle the image file input change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file); // Store the actual file

      // Create a preview URL for the image
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result); // Set the preview URL
      };
      reader.readAsDataURL(file);
    }
  };
  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };

  const handleSubmit = async (action) => {
    const formData = new FormData();

    // Append the form data to FormData
    formData.append("attribute", selectedVariant?.attribute);
    formData.append("value", selectedVariant?.value);
    formData.append("additionalPrice", selectedVariant?.additionalPrice);
    formData.append("stock", selectedVariant?.stock);
    if (imageFile) {
      formData.append("image", imageFile);
    }
    try {
      const validationData = {
        attribute: selectedVariant?.attribute,
        value: selectedVariant?.value,
        additionalPrice: selectedVariant?.additionalPrice,
        stock: selectedVariant?.stock,
      };
      if (action == "add") {
        validationData.image = imageFile;
      }

      await validationSchema.validate(validationData, { abortEarly: false }); // Validate the entire form
      setValidationErrors({});
      toast.loading("Adding variant...");
      const apiUrl =
        action == "add"
          ? `${BASE_URL}/api/product/product-variant/${id}`
          : `${BASE_URL}/api/product/product-variant/${id}/${selectedVariant._id}`;
      const response = await axios.post(apiUrl, formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Ensure content-type is set for file upload
          authorization: `Bearer ${localStorage.getItem("token")}`, // Replace 'token' with your actual token storage
        },
      });
      toast.dismiss();
      toast.success("Variant updated successfully!"); // Show success toast
      console.log("Variant updated:", response.data);
      setOpenEditModal(false); // Close the modal on success
      fetchProductData();
    } catch (error) {
      toast.dismiss();
      const errors = {};

      if (error.name === "ValidationError") {
        // Handle validation errors
        error.inner.forEach((err) => {
          errors[err.path] = err.message;
        });
        setValidationErrors(errors); // Set validation errors
      } else {
        // Handle API errors
        toast.error("Error updating variant. Please try again.");
        console.error(
          "Error adding/updating variant:",
          error.response?.data || error.message
        );
      }
    }
  };
  // Handle Edit Modal
  const handleEdit = (variant) => {
    setSelectedVariant(variant);
    console.log(variant);
    setImagePreview(variant.image?.url || "");
    setIsActionAdd(false);
    setOpenEditModal(true);
  };

  const handleSaveEdit = () => {
    setVariants((prevVariants) =>
      prevVariants.map((variant) =>
        variant.id === selectedVariant.id ? selectedVariant : variant
      )
    );
    setOpenEditModal(false);
  };
  // Handle Delete Dialog
  const handleDelete = (variant) => {
    setVariantToDelete(variant);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    setVariants((prevVariants) =>
      prevVariants.filter((variant) => variant.id !== variantToDelete.id)
    );
    setDeleteDialogOpen(false);
  };

  return (
    <div style={{ padding: "20px" }}>
      <IconButton
        onClick={() => navigate(`/view-product/${id}`)}
        aria-label="back"
      >
        <ArrowBackIcon />
      </IconButton>
      {/* Header Section */}
      <Box mb={3}>
          <Typography variant="h4" gutterBottom>
            {title}
          </Typography>
        <Typography variant="body1">
          Manage the variants for this {title}. You can add, edit, or view
          details of each variant.
        </Typography>
      </Box>

      {/* Add Variant Button */}
      <Stack direction={"row"} justifyContent={"flex-end"} mb={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            setOpenEditModal(true);
            setIsActionAdd(true);
          }}
        >
          Add Variant
        </Button>
      </Stack>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Attribute</TableCell>
              <TableCell>Value</TableCell>
              <TableCell>Additional Price</TableCell>
              <TableCell>Stock</TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {variants?.length > 0 ? (
              variants.map((variant) => (
                <TableRow key={variant._id}>
                  <TableCell>{variant.attribute}</TableCell>
                  <TableCell>{variant.value}</TableCell>
                  <TableCell> ₹{variant.additionalPrice}</TableCell>
                  <TableCell>{variant.stock}</TableCell>
                  <TableCell>
                    <img
                      src={variant.image.url}
                      alt={variant.attribute}
                      style={{ width: "50px", height: "50px" }}
                    />
                  </TableCell>
                  <TableCell>
                    <IconButton
                      color="primary"
                      onClick={() => handleEdit(variant)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => handleDelete(variant)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} style={{ textAlign: "center" }}>
                  No variants available.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Edit Modal */}
      <Modal
        open={openEditModal}
        onClose={() => {
          setOpenEditModal(false);
          setSelectedVariant({
            attribute: "",
            value: "",
            additionalPrice: 0,
            stock: 0,
          });
          setImagePreview(null);
          setImageFile(null);
          setValidationErrors({});
        }}
      >
        <Box sx={modalStyle}>
          <Typography variant="h6" gutterBottom>
            Edit Variant
          </Typography>

          <TextField
            label="Attribute"
            fullWidth
            margin="normal"
            value={selectedVariant?.attribute || ""}
            onChange={(e) =>
              setSelectedVariant({
                ...selectedVariant,
                attribute: e.target.value,
              })
            }
            error={!!validationErrors.attribute}
            helperText={validationErrors.attribute}
          />
          <TextField
            label="Value"
            fullWidth
            margin="normal"
            value={selectedVariant?.value || ""}
            onChange={(e) =>
              setSelectedVariant({ ...selectedVariant, value: e.target.value })
            }
            error={!!validationErrors.value}
            helperText={validationErrors.value}
          />
          <TextField
            label="Additional Price"
            fullWidth
            margin="normal"
            value={selectedVariant?.additionalPrice}
            onChange={(e) =>
              setSelectedVariant({
                ...selectedVariant,
                additionalPrice: Number(e.target.value),
              })
            }
            error={!!validationErrors.additionalPrice}
            helperText={validationErrors.additionalPrice}
          />
          <TextField
            label="Stock"
            fullWidth
            margin="normal"
            value={selectedVariant?.stock}
            onChange={(e) =>
              setSelectedVariant({
                ...selectedVariant,
                stock: Number(e.target.value),
              })
            }
            error={!!validationErrors.stock}
            helperText={validationErrors.stock}
          />

          <div>
            <input
              accept="image/*"
              id="image-upload"
              type="file"
              hidden
              onChange={handleImageChange}
            />
            <label htmlFor="image-upload">
              <IconButton component="span">
                <PhotoCamera />
              </IconButton>
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Image preview"
                  style={{ width: "100px", height: "100px", marginTop: 10 }}
                />
              )}
            </label>
            {validationErrors.image && (
              <Typography color="error">{validationErrors.image}</Typography>
            )}
          </div>

          {/* Save Changes Button */}
          <Stack direction={"row"} spacing={2}>
            <Button
              variant="contained"
              color="error"
              onClick={() => {
                setOpenEditModal(false);
                setSelectedVariant({
                  attribute: "",
                  value: "",
                  additionalPrice: 0,
                  stock: 0,
                });
                setImagePreview(null);
                setImageFile(null);
                setValidationErrors({});
              }} // Pass the file and variant data
              sx={{ mt: 2 }}
            >
              Cancel
            </Button>
            {!isActionAdd ? (
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleSubmit("edit")} // Pass the file and variant data
                sx={{ mt: 2 }}
              >
                Save Changes
              </Button>
            ) : (
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleSubmit("add")} // Pass the file and variant data
                sx={{ mt: 2 }}
              >
                Add
              </Button>
            )}
          </Stack>
        </Box>
      </Modal>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this variant?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={confirmDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ManageVariants;
