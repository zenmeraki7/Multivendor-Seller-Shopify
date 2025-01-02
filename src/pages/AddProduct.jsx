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
  Button,
} from "@mui/material"; // Import MUI components for select fields
import { Switch, FormControlLabel } from "@mui/material";
import axios from "axios";
import CustomInput from "../components/SharedComponents/CustomInput";
import CustomSelect from "../components/SharedComponents/CustomSelect";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { Stack } from "react-bootstrap";
import { productCreationSchema } from "../utils/productValidationSchema";
import { BASE_URL } from "../utils/baseUrl";
import toast from "react-hot-toast";

function AddProduct() {
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [productImages, setProductImages] = useState([null, null, null, null]);
  const [productImagePreviews, setProductImagePreviews] = useState([
    null,
    null,
    null,
    null,
  ]);

  console.log(productImages);
  console.log(thumbnail);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    brand: "",
    category: "",
    categoryType: "",
    subcategory: "",
    price: null,
    discountedPrice: null,
    stock: null,
    tags: "",
    shippingDetails: {
      weight: "",
      freeShipping: false,
      shippingCharge: null,
    },
    returnPolicy: {
      isReturnable: true,
      returnWindow: 5,
    },
    meta: {
      title: "",
      description: "",
      keywords: "",
    },
  });
  const [errors, setErrors] = useState({}); // State to store validation errors
  const [features, setFeatures] = useState([{ key: "", value: "" }]);
  const [isFreeShipping, setIsFreeShipping] = useState(false);
  const [isReturnPolicyEnabled, setIsReturnPolicyEnabled] = useState(true);
  const [categoryTypes, setCategoryTypes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);

  const fetchActiveSubCategories = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/api/subcategory/all?id=${formData.category}`
      );

      setSubCategories(response.data.data || []);
    } catch (err) {
      console.log(
        err.response?.data?.message || "Failed to fetch sub categories."
      );
    }
  };

  // Trigger fetch when selectedCategoryId changes
  useEffect(() => {
    formData.category && fetchActiveSubCategories();
  }, [formData.category]);

  const fetchActiveCategories = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/api/category/all?id=${formData.categoryType}`
      );

      setCategories(response.data.data || []);
    } catch (err) {
      console.log(err.response?.data?.message || "Failed to fetch categories.");
    }
  };

  // Trigger fetch when selectedCategoryTypeId changes
  useEffect(() => {
    formData.categoryType && fetchActiveCategories();
  }, [formData.categoryType]);

  const fetchActiveCategoryTypes = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/category-type/all`);
      setCategoryTypes(response.data.data);
    } catch (err) {
      console.log(err.message || "Failed to fetch category types.");
    }
  };

  useEffect(() => {
    fetchActiveCategoryTypes();
  }, []);

  const handleThumbnailChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setThumbnail(file);
      setThumbnailPreview(URL.createObjectURL(file));
    }
  };

  const handleProductImageChange = (event, index) => {
    const file = event.target.files[0];
    if (file) {
      const updatedImages = [...productImages];
      updatedImages[index] = file;
      setProductImages(updatedImages);

      const updatedPreviews = [...productImagePreviews];
      updatedPreviews[index] = URL.createObjectURL(file);
      setProductImagePreviews(updatedPreviews);
    }
  };

  const handleAddImageField = () => {
    setProductImages([...productImages, null]);
    setProductImagePreviews([...productImagePreviews, null]);
  };

  // Handling form field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name == "price" || name == "discountedPrice" || name == "stock") {
      setFormData({ ...formData, [name]: Number(value) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Handling feature (specifications) changes
  const handleFeatureChange = (index, field, value) => {
    const updatedFeatures = [...features];
    updatedFeatures[index][field] = value;
    setFeatures(updatedFeatures);
  };
  console.log(features);
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
  console.log(errors);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validImageArr = productImages.filter((item) => item != null);

    try {
      // Validate form data using Yup schema
      await productCreationSchema.validate(
        {
          ...formData,
          specifications: features,
          thumbnail,
          images: validImageArr,
        },
        { abortEarly: false }
      );

      // Clear errors on successful validation
      setErrors({});

      // Create FormData object to send as multipart/form-data
      const formDataToSend = new FormData();

      // Append all form data to FormData object
      formDataToSend.append("title", formData.title);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("brand", formData.brand);
      formDataToSend.append("category", formData.category);
      formDataToSend.append("categoryType", formData.categoryType);
      formDataToSend.append("subcategory", formData.subcategory);
      formDataToSend.append("price", formData.price);
      formDataToSend.append("discountedPrice", formData.discountedPrice);
      formDataToSend.append("stock", formData.stock);
      formDataToSend.append("tags", JSON.stringify(formData.tags));
      formDataToSend.append(
        "shippingDetails",
        JSON.stringify(formData.shippingDetails)
      );
      formDataToSend.append(
        "returnPolicy",
        JSON.stringify(formData.returnPolicy)
      );
      formDataToSend.append("specifications", JSON.stringify(features));
      formDataToSend.append("meta", JSON.stringify(formData.meta));
      formDataToSend.append("thumbnail", thumbnail);

      // Append images only if they are valid (not null)
      validImageArr.forEach((img) => {
        formDataToSend.append("images", img);
      });

      // Show a toast notification while submitting
      toast.loading("Creating product...");

      // Make API call using FormData
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${BASE_URL}/api/product/create`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            authorization: `Bearer ${token}`,
          },
        }
      );

      // Handle successful product creation
      toast.dismiss();
      toast.success("Product created successfully!");
      console.log("Product created successfully:", response.data);
    } catch (error) {
      if (error.name === "ValidationError") {
        // Map Yup validation errors to state
        const validationErrors = {};
        error.inner.forEach((err) => {
          validationErrors[err.path] = err.message;
        });
        setErrors({ ...error, ...validationErrors });
        toast.dismiss();
        toast.error("Validation failed! Please check the errors.");
      } else {
        console.error("API error:", error.message);
        toast.dismiss();
        toast.error("An error occurred while creating the product.");
      }
    }
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
          <div>
            {/* Thumbnail Section */}
            <Box sx={{ marginBottom: 4 }}>
              <Typography variant="h6" gutterBottom>
                Product Thumbnail
              </Typography>
              <Card
                sx={{
                  width: 250,
                  height: 250,
                  mt: 2,
                }}
              >
                <input
                  type="file"
                  style={{ display: "none" }}
                  id="product-thumbnail"
                  onChange={handleThumbnailChange}
                />
                <label
                  htmlFor="product-thumbnail"
                  style={{ cursor: "pointer" }}
                >
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
              {errors.thumbnail && (
                <Typography mt={1} color="error" variant="body2">
                  {errors.thumbnail}
                </Typography>
              )}
            </Box>

            {/* Product Images Section */}
            <Box sx={{ marginY: 4 }}>
              <Typography variant="h6" gutterBottom>
                Product Images
              </Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mt: 2 }}>
                {productImages.map((_, index) => (
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
                          productImagePreviews[index] ||
                          "https://cdn.pixabay.com/photo/2017/11/10/04/47/image-2935360_1280.png"
                        }
                        alt={`Product Image ${index + 1}`}
                      />
                    </label>
                  </Card>
                ))}
              </Box>
              {errors.images && (
                <Typography mt={1} color="error" variant="body2">
                  {errors.images}
                </Typography>
              )}
            </Box>
          </div>

          {/* Product Description Section */}
          <Box>
            <Typography sx={{ my: 2 }} variant="h6" gutterBottom>
              Product Description
            </Typography>
            <JoditEditor
              value={formData.description}
              // config={{
              //   ...config,
              //   height: 400, // Specify the height in pixels
              // }}
              onChange={(newContent) =>
                setFormData({ ...formData, description: newContent })
              }
            />
            {errors.description && (
              <Typography color="error" variant="body2">
                {errors.description}
              </Typography>
            )}
          </Box>
        </Box>

        {/* Form Section */}
        <div style={{ flex: "1" }}>
          <form>
            <CustomInput
              id="title"
              name="title"
              label="Product Title"
              placeholder="Enter product title"
              value={formData.title}
              onChange={handleInputChange}
              error={errors.title}
            />
            <div style={{ display: "flex", gap: "20px" }}>
              <CustomInput
                id="brand"
                name="brand"
                label="Brand"
                placeholder="Enter brand name"
                value={formData.brand}
                onChange={handleInputChange}
                error={errors.brand}
              />
              <CustomSelect
                id="categoryType"
                label="Category Type"
                name="categoryType"
                MenuItems={categoryTypes}
                value={formData.categoryType}
                onChange={handleInputChange}
                error={errors.categoryType}
              />
            </div>
            <div style={{ display: "flex", gap: "20px" }}>
              {formData.categoryType && (
                <CustomSelect
                  id="category"
                  label="Category"
                  name="category"
                  MenuItems={categories}
                  value={formData.category}
                  onChange={handleInputChange}
                  error={errors.category}
                />
              )}
              {formData.category && (
                <CustomSelect
                  id="subcategories"
                  label="Subcategories"
                  name="subcategory"
                  MenuItems={subCategories}
                  value={formData.subcategory}
                  onChange={handleInputChange}
                  error={errors.subcategory}
                />
              )}
            </div>
            <div style={{ display: "flex", gap: "20px" }}>
              <CustomInput
                id="price"
                name="price"
                label="Original Price"
                placeholder="Enter original price"
                type="number"
                value={formData.price}
                onChange={(e) => handleInputChange(e)}
                error={errors.price}
              />
              <CustomInput
                id="discountedPrice"
                name="discountedPrice"
                label="Discounted Price"
                placeholder="Enter discounted price"
                type="number"
                value={formData.discountedPrice}
                onChange={handleInputChange}
                error={errors.discountedPrice}
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
                error={errors.stock}
              />
              <CustomInput
                id="tags"
                name="tags"
                label="Tags"
                placeholder="Enter tags separated by commas"
                value={formData.tags}
                onChange={handleInputChange}
                required={false}
                error={errors.tags}
              />
            </div>

            {/* Specifications */}
            <div style={{ margin: "20px 0px" }}>
              <h5>Specifications (if needed)</h5>
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
                      required={false}
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
                      required={false}
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
              <h5>Shipping Details (if needed)</h5>
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
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      shippingDetails: {
                        ...formData.shippingDetails,
                        weight: e.target.value,
                      },
                    })
                  }
                />
                <FormControlLabel
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
                  required={false}
                  id="shippingCharge"
                  name="shippingCharge"
                  label="Shipping Charge"
                  placeholder="Enter shipping charge"
                  value={formData.shippingDetails.shippingCharge}
                  type={"number"}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      shippingDetails: {
                        ...formData.shippingDetails,
                        shippingCharge: Number(e.target.value),
                      },
                    })
                  }
                />
              )}
            </div>

            {/* Return Policy */}
            <div style={{ marginTop: "10px" }}>
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
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      returnPolicy: {
                        ...formData.returnPolicy,
                        returnWindow: Number(e.target.value),
                      },
                    })
                  }
                />
              )}
            </div>
          </form>
        </div>
      </div>
      <div style={{ marginTop: "0px" }}>
        <h5> Meta Field (if needed)</h5>
        <CustomInput
          id="metaFieldTitle"
          name="MEta field"
          label="Meta field title"
          placeholder="Enter meta field title"
          required={false}
          value={formData.meta.title}
          onChange={(e) =>
            setFormData({
              ...formData,
              meta: {
                ...formData.meta,
                title: e.target.value,
              },
            })
          }
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
          required={false}
          id="metaFieldDesc"
          name="MEta field desc"
          label="Meta field description"
          placeholder="Enter meta field description"
          value={formData.meta.description}
          onChange={(e) =>
            setFormData({
              ...formData,
              meta: {
                ...formData.meta,
                description: e.target.value,
              },
            })
          }
        />
        <CustomInput
          required={false}
          id="metaFieldDesc"
          name="MEta field desc"
          label="Meta field keywords"
          placeholder="Enter seperated by comas"
          value={formData.meta.keywords}
          onChange={(e) =>
            setFormData({
              ...formData,
              meta: {
                ...formData.meta,
                keywords: e.target.value,
              },
            })
          }
        />
      </div>
      <Button variant="contained" onClick={handleSubmit}>
        Save
      </Button>
    </div>
  );
}

export default AddProduct;
