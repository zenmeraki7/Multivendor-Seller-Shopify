import React, { useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardMedia,
  Button,
  Stack,
  IconButton,
  TextField,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import JoditEditor from "jodit-react";
import CustomInput from "../components/SharedComponents/CustomInput";
import CustomSelect from "../components/SharedComponents/CustomSelect";

function AddShopifyProduct() {
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [productImagePreviews, setProductImagePreviews] = useState([
    null,
    null,
    null,
    null,
  ]);
  const [variants, setVariants] = useState([
    { option: "", price: "", sku: "", inventory: "" },
  ]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "draft", // Default status
    type: "",
    vendor: "",
    collection: "",
    tag: "",
    category: "",
    price: 0,
    compareAtPrice: 0,
    inventory: 0,
    sku: "",
    barcode: "",
    weightUnit: "kg",
    seo: {
      title: "",
      description: "",
      keywords: "",
    },
  });

  const [errors, setErrors] = useState({});

  // Handle media upload
  const handleThumbnailChange = (event) => {
    const file = event.target.files[0];
    if (file) setThumbnailPreview(URL.createObjectURL(file));
  };

  const handleProductImageChange = (event, index) => {
    const file = event.target.files[0];
    if (file) {
      const updatedPreviews = [...productImagePreviews];
      updatedPreviews[index] = URL.createObjectURL(file);
      setProductImagePreviews(updatedPreviews);
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle SEO field changes
  const handleSeoChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      seo: { ...formData.seo, [name]: value },
    });
  };

  // Handle adding a new variant
  const handleAddVariant = () => {
    setVariants([...variants, { option: "", price: "", sku: "", inventory: "" }]);
  };

  // Handle removing a variant
  const handleRemoveVariant = (index) => {
    setVariants(variants.filter((_, i) => i !== index));
  };

  // Handle variant field changes
  const handleVariantChange = (index, field, value) => {
    const updatedVariants = [...variants];
    updatedVariants[index][field] = value;
    setVariants(updatedVariants);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    console.log("Variants:", variants);
  };

  return (
    <div style={{ maxWidth: "1200px", margin: "20px auto" }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h4">Add Product</Typography>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Save
        </Button>
      </Stack>

      <div style={{ display: "flex", gap: "20px" }}>
        {/* Left Section: Media and Description */}
        <Box sx={{ flex: 1, padding: 2 }}>
          <Typography variant="h6" gutterBottom>
            Media
          </Typography>
          <Box sx={{ mb: 4 }}>
            <Typography variant="subtitle1">Product Thumbnail</Typography>
            <Card sx={{ width: 250, height: 250, mt: 1 }}>
              <input
                type="file"
                style={{ display: "none" }}
                id="thumbnail"
                onChange={handleThumbnailChange}
              />
              <label htmlFor="thumbnail" style={{ cursor: "pointer" }}>
                <CardMedia
                  component="img"
                  height="250"
                  image={
                    thumbnailPreview ||
                    "https://cdn.pixabay.com/photo/2017/11/10/04/47/image-2935360_1280.png"
                  }
                  alt="Thumbnail"
                />
              </label>
            </Card>
          </Box>

          <Box sx={{ mb: 4 }}>
            <Typography variant="subtitle1">Product Images</Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mt: 1 }}>
              {productImagePreviews.map((preview, index) => (
                <Card key={index} sx={{ width: 120, height: 120 }}>
                  <input
                    type="file"
                    style={{ display: "none" }}
                    id={`image-${index}`}
                    onChange={(e) => handleProductImageChange(e, index)}
                  />
                  <label htmlFor={`image-${index}`} style={{ cursor: "pointer" }}>
                    <CardMedia
                      component="img"
                      height="120"
                      image={
                        preview ||
                        "https://cdn.pixabay.com/photo/2017/11/10/04/47/image-2935360_1280.png"
                      }
                      alt={`Image ${index + 1}`}
                    />
                  </label>
                </Card>
              ))}
            </Box>
          </Box>

          <Box>
            <Typography variant="h6" gutterBottom>
              Description
            </Typography>
            <JoditEditor
              value={formData.description}
              onChange={(content) =>
                setFormData({ ...formData, description: content })
              }
            />
          </Box>
        </Box>

        {/* Right Section: Product Details */}
        <Box sx={{ flex: 1, padding: 2 }}>
          <form>
            <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
              <CustomInput
                id="title"
                label="Title"
                placeholder="Enter product title"
                value={formData.title}
                onChange={handleInputChange}
                sx={{ flex: 1 }}
              />
              <CustomInput
                id="vendor"
                label="Vendor"
                placeholder="Enter vendor name"
                value={formData.vendor}
                onChange={handleInputChange}
                sx={{ flex: 1 }}
              />
            </Box>

            {/* Status Field */}
            <Box sx={{ mb: 2 }}>
              <CustomSelect
                id="status"
                label="Status"
                value={formData.status}
                onChange={handleInputChange}
                MenuItems={[
                  { value: "draft", label: "Draft" },
                  { value: "active", label: "Active" },
                  { value: "archived", label: "Archived" },
                ]}
              />
            </Box>

            <Box sx={{ mb: 2 }}>
              <CustomInput
                id="type"
                label="Product Type"
                placeholder="e.g., T-Shirt, Electronics"
                value={formData.type}
                onChange={handleInputChange}
              />
            </Box>

            <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
              <CustomInput
                id="collection"
                label="Collection"
                placeholder="Enter collection name"
                value={formData.collection}
                onChange={handleInputChange}
                sx={{ flex: 1 }}
              />
              <CustomInput
                id="tag"
                label="Tag"
                placeholder="Enter tags (comma-separated)"
                value={formData.tag}
                onChange={handleInputChange}
                sx={{ flex: 1 }}
              />
            </Box>

            <Box sx={{ mb: 2 }}>
              <CustomSelect
                id="category"
                label="Category"
                placeholder="Enter product category"
                value={formData.category}
                onChange={handleInputChange}
              />
            </Box>

            {/* Pricing */}
            <Typography variant="h6" gutterBottom>
              Pricing
            </Typography>
            <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
              <CustomInput
                id="price"
                label="Price"
                type="number"
                placeholder="0.00"
                value={formData.price}
                onChange={handleInputChange}
                sx={{ flex: 1 }}
              />
              <CustomInput
                id="compareAtPrice"
                label="Compare at Price"
                type="number"
                placeholder="0.00"
                value={formData.compareAtPrice}
                onChange={handleInputChange}
                sx={{ flex: 1 }}
              />
            </Box>

            {/* Inventory */}
            <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
              Inventory
            </Typography>
            <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
              <CustomInput
                id="sku"
                label="SKU"
                placeholder="Enter SKU"
                value={formData.sku}
                onChange={handleInputChange}
                sx={{ flex: 1 }}
              />
              <CustomInput
                id="barcode"
                label="Barcode"
                placeholder="Enter barcode"
                value={formData.barcode}
                onChange={handleInputChange}
                sx={{ flex: 1 }}
              />
            </Box>
            <CustomInput
              id="inventory"
              label="Inventory"
              type="number"
              placeholder="0"
              value={formData.inventory}
              onChange={handleInputChange}
            />

            {/* Variants */}
            <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
              Variants
            </Typography>
            {variants.map((variant, index) => (
              <Box key={index} sx={{ display: "flex", gap: 2, mb: 2 }}>
                <TextField
                  label="Option"
                  value={variant.option}
                  onChange={(e) =>
                    handleVariantChange(index, "option", e.target.value)
                  }
                  sx={{ flex: 1 }}
                />
                <TextField
                  label="Price"
                  type="number"
                  value={variant.price}
                  onChange={(e) =>
                    handleVariantChange(index, "price", e.target.value)
                  }
                  sx={{ flex: 1 }}
                />
                <TextField
                  label="SKU"
                  value={variant.sku}
                  onChange={(e) =>
                    handleVariantChange(index, "sku", e.target.value)
                  }
                  sx={{ flex: 1 }}
                />
                <TextField
                  label="Inventory"
                  type="number"
                  value={variant.inventory}
                  onChange={(e) =>
                    handleVariantChange(index, "inventory", e.target.value)
                  }
                  sx={{ flex: 1 }}
                />
                <IconButton onClick={() => handleRemoveVariant(index)}>
                  <DeleteIcon color="error" />
                </IconButton>
              </Box>
            ))}
            <Button onClick={handleAddVariant} startIcon={<AddIcon />}>
              Add Variant
            </Button>

            {/* SEO */}
      {/* SEO */}
<Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
  SEO
</Typography>

<Box sx={{ mt: 2 }}>
  <CustomInput
    id="seoTitle"
    label="SEO Title"
    placeholder="Enter SEO title"
    value={formData.seo.title}
    onChange={handleSeoChange}
  />
</Box>

<Box sx={{ mt: 2 }}>
  <CustomInput
    id="seoDescription"
    label="SEO Description"
    placeholder="Enter SEO description"
    value={formData.seo.description}
    onChange={handleSeoChange}
    multiline
    rows={3}
  />
</Box>

<Box sx={{ mt: 2 }}>
  <CustomInput
    id="seoKeywords"
    label="SEO Keywords"
    placeholder="Enter SEO keywords"
    value={formData.seo.keywords}
    onChange={handleSeoChange}
  />
</Box>

          </form>
        </Box>
      </div>
    </div>
  );
}

export default AddShopifyProduct;