import React, { useState, useCallback, useEffect } from "react";
import JoditEditor from "jodit-react";
import AddVariant from "../components/AddVariant";
import TextField from "@mui/material/TextField";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import {
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Divider,
  Box,
  Typography,
  Card,
  CardMedia,
} from "@mui/material"; // Import MUI components for select fields
import { Switch, FormControlLabel } from "@mui/material";
import axios from "axios";
import CustomInput from "../components/SharedComponents/CustomInput";
import CustomSelect from "../components/SharedComponents/CustomSelect";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { Stack } from "react-bootstrap";

function AddProduct() {
  const [productImages, setProductImages] = useState([null, null, null, null]);
  const [thumbnail, setThumbnail] = useState(null);
  console.log(productImages)
  console.log(thumbnail)
  const [description, setDescription] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    brand: "",
    category: "",
    categoryType: "",
    subcategories: "",
    price: 0,
    discountedPrice: 0,
    stock: 0,
    tags: "",
    specifications: [{ key: "", value: "" }],
    shippingDetails: {
      weight: "",
      freeShipping: true,
      shippingCharge: 0,
    },
    returnPolicy: {
      isReturnable: true,
      returnWindow: 30,
    },
    meta: {
      title: "",
      description: "",
      keywords: "",
    },
  });

  const [features, setFeatures] = useState([{ key: "", value: "" }]);
  const [isFreeShipping, setIsFreeShipping] = useState(true);
  const [isReturnPolicyEnabled, setIsReturnPolicyEnabled] = useState(true);

  // Handling form field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handling feature (specifications) changes
  const handleFeatureChange = (index, field, value) => {
    const updatedFeatures = [...features];
    updatedFeatures[index][field] = value;
    setFeatures(updatedFeatures);
  };

  // Handling the toggle of Free Shipping
  const handleFreeShippingToggle = () => {
    setIsFreeShipping(!isFreeShipping);
    setFormData({
      ...formData,
      shippingDetails: {
        ...formData.shippingDetails,
        freeShipping: !isFreeShipping,
      },
    });
  };

  // Handling the return policy switch
  const handleSwitchChange = () => {
    setIsReturnPolicyEnabled(!isReturnPolicyEnabled);
    setFormData({
      ...formData,
      returnPolicy: {
        ...formData.returnPolicy,
        isReturnable: !isReturnPolicyEnabled,
      },
    });
  };
  console.log(formData);
  // Handle adding a new specification
  const handleAddFeature = () => {
    setFeatures([...features, { key: "", value: "" }]);
  };

  // Handle removing a specification
  const handleRemoveFeature = (index) => {
    const updatedFeatures = features.filter((_, i) => i !== index);
    setFeatures(updatedFeatures);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send form data to the API
      const response = await axios.post("/api/products", formData); // Adjust the API endpoint
      console.log("Product added successfully:", response.data);
      // Optionally reset form data or show success message
      setFormData({
        title: "",
        description: "",
        brand: "",
        category: "",
        categoryType: "",
        subcategories: "",
        price: 0,
        discountedPrice: 0,
        stock: 0,
        tags: "",
        specifications: [{ key: "", value: "" }],
        shippingDetails: {
          weight: "",
          freeShipping: true,
          shippingCharge: 0,
        },
        returnPolicy: {
          isReturnable: true,
          returnWindow: 30,
        },
        meta: {
          title: "",
          description: "",
          keywords: "",
        },
      });
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  // Debounce function for handling onChange efficiently
  const debouncedSetDescription = useCallback(
    debounce((newContent) => setDescription(newContent), 300),
    []
  );

  const config = {
    readonly: false,
  };

  // Handle image upload for individual image slots
  const handleProductImageChange = (e, index) => {
    const file = e.target.files[0];
    const newImageURL = URL.createObjectURL(file);
    const updatedProductImages = [...productImages];
    updatedProductImages[index] = newImageURL;
    setProductImages(updatedProductImages);
  };

  // Handle thumbnail upload
  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    const newThumbnailURL = URL.createObjectURL(file);
    setThumbnail(newThumbnailURL);
  };

  return (
    <div
      className="container"
      style={{ maxWidth: "1200px", margin: "10px auto" }}
    >
      <h3>Add Product</h3>
      <br />
      <div style={{ display: "flex", gap: "10px" }}>
        <Box sx={{ flex: 1, padding: 2 }}>
          {/* Thumbnail Section */}
          <Box sx={{ marginBottom: 4 }}>
            <Typography variant="h6" gutterBottom>
              Product Thumbnail
            </Typography>
            <Card
              sx={{
                width: 250, // Increased width
                height: 250, // Increased height
                mt: 2,
              }}
            >
              <input
                type="file"
                style={{ display: "none" }}
                id="product-thumbnail"
                onChange={handleThumbnailChange}
              />
              <label htmlFor="product-thumbnail" style={{ cursor: "pointer" }}>
                <CardMedia
                  component="img"
                  height="250"
                  image={
                    thumbnail ||
                    "https://cdn.pixabay.com/photo/2017/11/10/04/47/image-2935360_1280.png"
                  }
                  alt="Thumbnail"
                />
              </label>
            </Card>
          </Box>

          {/* Product Images Section */}
          <Box sx={{ marginY: 4 }}>
            <Typography variant="h6" gutterBottom>
              Product Images
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mt: 2 }}>
              {productImages.map((image, index) => (
                <Card
                  key={index}
                  sx={{
                    width: 120,
                    height: 120,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    position: "relative",
                    cursor: "pointer",
                    overflow: "hidden",
                  }}
                >
                  <input
                    type="file"
                    style={{ display: "none" }}
                    id={`product-image-${index}`}
                    onChange={(e) => handleProductImageChange(e, index)}
                  />
                  <label
                    htmlFor={`product-image-${index}`}
                    style={{ cursor: "pointer" }}
                  >
                    <CardMedia
                      component="img"
                      height="120"
                      image={
                        image ||
                        "https://cdn.pixabay.com/photo/2017/11/10/04/47/image-2935360_1280.png"
                      }
                      alt={`Product Image ${index + 1}`}
                    />
                  </label>
                </Card>
              ))}
            </Box>
          </Box>

          {/* Product Description Section */}
          <Box>
            <Typography sx={{ my: 2 }} variant="h6" gutterBottom>
              Product Description
            </Typography>
            <JoditEditor
              value={description}
              config={{
                ...config,
                height: 400, // Specify the height in pixels
              }}
              onChange={debouncedSetDescription}
            />
          </Box>
        </Box>

        {/* Form Section */}
        <div style={{ flex: "1" }}>
          <form onSubmit={handleSubmit}>
            {/* Form Fields */}
            <CustomInput
              id="title"
              name="title"
              label="Product Title"
              placeholder="Enter product title"
              value={formData.title}
              onChange={handleInputChange}
            />
            <div style={{ display: "flex", gap: "20px" }}>
              <CustomInput
                id="brand"
                name="brand"
                label="Brand"
                placeholder="Enter brand name"
                value={formData.brand}
                onChange={handleInputChange}
              />
              <CustomSelect
                id="categoryType"
                label="Category Type"
                name="categoryType"
                MenuItems={["Electronics", "Fashion", "Home"]}
                value={formData.categoryType}
                onChange={handleInputChange}
              />
            </div>
            <div style={{ display: "flex", gap: "20px" }}>
              <CustomSelect
                id="category"
                label="Category"
                name="Category"
                MenuItems={["Electronics", "Fashion", "Home"]}
                value={formData.category}
                onChange={handleInputChange}
              />
              <CustomSelect
                id="subcategories"
                label="Subcategories"
                name="subcategory"
                MenuItems={["Audio", "Clothes", "Footwear"]}
                value={formData.subcategories}
                onChange={handleInputChange}
              />
            </div>
            <div style={{ display: "flex", gap: "20px" }}>
              <CustomInput
                id="price"
                name="price"
                label="Original Price"
                placeholder="Enter original price"
                type="number"
                value={formData.price}
                onChange={handleInputChange}
              />
              <CustomInput
                id="discountedPrice"
                name="discountedPrice"
                label="Discounted Price"
                placeholder="Enter discounted price"
                type="number"
                value={formData.discountedPrice}
                onChange={handleInputChange}
              />
            </div>
            <div style={{ display: "flex", gap: "20px" }}>
              <CustomInput
                id="stock"
                name="stock"
                label="Stock Quantity"
                placeholder="Enter stock quantity"
                type="number"
                value={formData.stock}
                onChange={handleInputChange}
              />
              <CustomInput
                id="tags"
                name="tags"
                label="Tags"
                placeholder="Enter tags separated by commas"
                value={formData.tags}
                onChange={handleInputChange}
              />
            </div>

            {/* Specifications */}
            <div style={{ margin: "20px 0px" }}>
              <h5>Specifications</h5>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                {features.map((feature, index) => (
                  <div
                    key={index}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <CustomInput
                      id="specificationsKey"
                      name={`specifications[${index}].key`}
                      label="Specification Key"
                      placeholder="Enter specification key"
                      value={feature.key}
                      onChange={(e) =>
                        handleFeatureChange(index, "key", e.target.value)
                      }
                    />
                    <CustomInput
                      id="specificationsValue"
                      name={`specifications[${index}].value`}
                      label="Specification Value"
                      placeholder="Enter specification value"
                      value={feature.value}
                      onChange={(e) =>
                        handleFeatureChange(index, "value", e.target.value)
                      }
                    />
                    <IconButton
                      sx={{ backgroundColor: "#f2f2f2" }}
                      onClick={() => handleRemoveFeature(index)}
                    >
                      <DeleteIcon color="error" fontSize="small" />
                    </IconButton>
                  </div>
                ))}
              </div>
              <div
                style={{
                  marginTop: "10px",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <IconButton
                  onClick={handleAddFeature}
                  style={{
                    backgroundColor: "#f2f2f2",
                  }}
                >
                  <AddIcon fontSize="small" />
                </IconButton>
              </div>
            </div>

            {/* Shipping Details */}
            <div style={{ marginTop: "40px" }}>
              <h5>Shipping Details</h5>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                }}
              >
                <CustomInput
                  id="weight"
                  name="weight"
                  label="Weight"
                  placeholder="Enter product weight"
                  value={formData.shippingDetails.weight}
                  onChange={handleInputChange}
                />
                <FormControlLabel
                  sx={{ marginBottom: "15px" }}
                  control={
                    <Switch
                      checked={isFreeShipping}
                      onChange={handleFreeShippingToggle}
                      name="freeShipping"
                      color="primary"
                    />
                  }
                  label="Free Shipping"
                />
              </div>
              {!isFreeShipping && (
                <CustomInput
                  id="shippingCharge"
                  name="shippingCharge"
                  label="Shipping Charge"
                  placeholder="Enter shipping charge"
                  value={formData.shippingDetails.shippingCharge}
                  onChange={handleInputChange}
                />
              )}
            </div>

            {/* Return Policy */}
            <div style={{ marginTop: "40px" }}>
              <h5>Return Policy</h5>
              <FormControlLabel
                sx={{ marginy: 2 }}
                control={
                  <Switch
                    checked={isReturnPolicyEnabled}
                    onChange={handleSwitchChange}
                    name="isReturnable"
                    color="primary"
                  />
                }
                label="Enable Return Policy"
              />
              {isReturnPolicyEnabled && (
                <CustomInput
                  id="returnWindow"
                  name="returnWindow"
                  label="Return Window (Days)"
                  placeholder="Enter return window in days"
                  type="number"
                  value={formData.returnPolicy.returnWindow}
                  onChange={handleInputChange}
                />
              )}
            </div>

            {/* Submit Button */}
            <button type="submit">Submit Product</button>
          </form>
        </div>
      </div>
      <div style={{ marginTop: "0px" }}>
        <h5> Meta Field</h5>
        <CustomInput
          id="metaFieldTitle"
          name="MEta field"
          label="Meta field title"
          placeholder="Enter meta field title"
        />
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "20px",
          marginBottom: "20px",
        }}
      >
        {/* Input Fields */}
        <CustomInput
          id="metaFieldDesc"
          name="MEta field desc"
          label="Meta field description"
          placeholder="Enter meta field description"
        />
        <CustomInput
          id="metaFieldDesc"
          name="MEta field desc"
          label="Meta field keywords"
          placeholder="Enter seperated by comas"
        />
      </div>
    </div>
  );
}

// Debounce function to avoid too frequent updates
function debounce(func, wait) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

export default AddProduct;
