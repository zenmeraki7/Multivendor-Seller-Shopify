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
  Paper,
  Container,
  Grid,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import AddIcon from "@mui/icons-material/Add";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import SyncAltIcon from "@mui/icons-material/SyncAlt";
import JoditEditor from "jodit-react";
import CustomInput from "../../components/SharedComponents/CustomInput";
import CustomSelect from "../../components/SharedComponents/CustomSelect";
import Variants from "../../components/Shopify/Variants";
import ReactQuill from "react-quill";

function AddShopifyProduct() {
  const [activeTab, setActiveTab] = useState(0);
  const [media, setMedia] = useState({
    thumbnail: null,
    productImages: [],
    existingImages: [],
  });

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "draft",
    type: "",
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
  const [variantsModalOpen, setVariantsModalOpen] = useState(false);
  const [variants, setVariants] = useState([]);
  const [variantOptions, setVariantOptions] = useState([]); // Store option types (e.g., "Size", "Color")
  const [expandedVariants, setExpandedVariants] = useState({}); // Track which parent variants are expanded
  const [showVariantsTable, setShowVariantsTable] = useState(false);
  const [totalInventory, setTotalInventory] = useState(0);

  // Handle image upload
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

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target || e;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle SEO field changes
  const handleSeoChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      seo: {
        ...prevData.seo,
        [name]: value,
      },
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    console.log("Variants:", variants);
  };

  // Handle tab change
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  // Remove image
  const handleRemoveImage = (index) => {
    setMedia((prevMedia) => ({
      ...prevMedia,
      productImages: prevMedia.productImages.filter((_, i) => i !== index),
    }));
  };

  // Handle save variants
  const handleSaveVariants = (optionName, variantsData) => {
    console.log("Saving variants:", optionName, variantsData);

    // Calculate total inventory
    const total = variantsData.reduce(
      (sum, variant) => sum + parseInt(variant.available || 0),
      0
    );

    // Make sure each variant has the proper options structure
    const formattedVariants = variantsData.map((variant) => ({
      ...variant,
      options: [
        {
          name: optionName,
          value: variant.value || variant.name || "Unknown", // Make sure value is included
        },
      ],
    }));

    setVariantOptions([...variantOptions, optionName]);
    setVariants(formattedVariants);
    setTotalInventory(total);
    setShowVariantsTable(true);
  };

  // Handle adding a new variant option type and its values
  const handleAddVariantOption = (optionName, optionValues) => {
    const newVariantOptions = [
      ...variantOptions,
      { name: optionName, values: optionValues },
    ];
    setVariantOptions(newVariantOptions);

    // Generate new variant combinations
    generateVariantCombinations(newVariantOptions);
  };

  // Generate all possible combinations of variants
  const generateVariantCombinations = (options) => {
    if (!options.length) return;

    let newVariants = [];

    // If this is the first option type
    if (options.length === 1) {
      newVariants = options[0].values.map((value) => ({
        options: [{ name: options[0].name, value }],
        price: "1,000.00",
        available: "0",
        isNew: true,
      }));
    } else {
      // For additional option types, create combinations with existing variants
      const existingVariants = [...variants];
      const newOption = options[options.length - 1];

      existingVariants.forEach((existingVariant) => {
        // Only use parent variants for combining
        if (existingVariant.options.length === options.length - 1) {
          newOption.values.forEach((value) => {
            newVariants.push({
              options: [
                ...existingVariant.options,
                { name: newOption.name, value },
              ],
              price: existingVariant.price || "1,000.00",
              available: "0",
              isNew: true,
            });
          });
        }
      });
    }

    setVariants([...variants, ...newVariants]);

    // Set default expanded state for new parent variants
    const expanded = { ...expandedVariants };
    newVariants.forEach((variant) => {
      if (variant.options.length === 1) {
        const key = `${variant.options[0].name}-${variant.options[0].value}`;
        expanded[key] = true;
      }
    });
    setExpandedVariants(expanded);

    // Recalculate total inventory
    calculateTotalInventory([...variants, ...newVariants]);
  };

  // Toggle expand/collapse for parent variants
  const toggleVariantExpand = (parentKey) => {
    setExpandedVariants({
      ...expandedVariants,
      [parentKey]: !expandedVariants[parentKey],
    });
  };

  // Handle changes to variant price or available fields
  const handleVariantChange = (variantIndex, field, value) => {
    const updatedVariants = [...variants];
    updatedVariants[variantIndex][field] = value;
    setVariants(updatedVariants);

    // Recalculate total if availability changed
    if (field === "available") {
      calculateTotalInventory(updatedVariants);
    }
  };

  // Calculate total inventory across all variants
  const calculateTotalInventory = (variantList) => {
    // Only count the most granular variants (those with the maximum number of options)
    const maxOptionsLength = Math.max(
      ...variantList.map((v) => v.options.length),
      0
    );

    const total = variantList
      .filter((v) => v.options.length === maxOptionsLength)
      .reduce((sum, v) => sum + (parseInt(v.available) || 0), 0);

    setTotalInventory(total);
  };

  // Determine if a variant is a parent (has children)
  const isParentVariant = (variant) => {
    // Check if variants array exists and has items
    if (!variants || variants.length === 0) return false;

    // Safely get the maximum number of options
    const maxOptionsLength = Math.max(
      ...variants.map((v) => (v.options && v.options.length) || 0),
      0
    );

    // Check if this variant has fewer options than the maximum
    return (
      variant.options &&
      variant.options.length < maxOptionsLength &&
      variant.options.length > 0
    );
  };

  // Get parent key for a variant
  const getParentKey = (variant) => {
    if (!variant.options || !variant.options.length) return null;
    return `${variant.options[0].name}-${variant.options[0].value}`;
  };

  // Get child variants for a parent
  const getChildVariants = (parentVariant) => {
    const parentKey = getParentKey(parentVariant);
    if (!parentKey) return [];

    return variants.filter((v) => {
      if (!v.options || v.options.length <= parentVariant.options.length)
        return false;

      // Check if this variant has the parent variant's options as a prefix
      return parentVariant.options.every(
        (option, index) =>
          v.options[index] &&
          v.options[index].name === option.name &&
          v.options[index].value === option.value
      );
    });
  };

  return (
    <Container maxWidth="xl" sx={{ py: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          {/* Basic Info Tab */}
          <Paper elevation={1} sx={{ p: 2, bgcolor: "#f2f2f270" }}>
            <Box>
              <Grid container>
                <Grid item xs={12}>
                  <CustomInput
                    name="title"
                    id="title"
                    label="Product Title"
                    placeholder="Enter product title"
                    value={formData.title}
                    onChange={handleInputChange}
                    fullWidth
                  />
                </Grid>
              </Grid>
            </Box>
            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle1" gutterBottom>
                Product Description
              </Typography>
              <ReactQuill
                value={"Somehting"}
                // onChange={setPolicy}
                // readOnly={!isEditing}
                style={{
                  height: "180px",
                  // background: "#f5f5f5",
                }}
              />
            </Box>
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
                <Typography
                  variant="body2"
                  color="textSecondary"
                  sx={{ mb: 2 }}
                >
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
                    onClick={() =>
                      document.getElementById("upload-new").click()
                    }
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
          </Paper>
          <Paper elevation={1} sx={{ p: 2, bgcolor: "#f2f2f270", mt: 3 }}>
            <Box sx={{ mt: 2 }}>
              <Button size="small">
                <AddCircleIcon /> Variants
              </Button>
            </Box>
          </Paper>
          <Paper elevation={1} sx={{ p: 2, bgcolor: "#f2f2f270", mt: 3 }}>
            <Box sx={{ mt: 2 }}>
              <Typography gutterBottom fontWeight={"bold"}>
                Search Engine Optimization
              </Typography>
              <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
                Improve your product's visibility in search results
              </Typography>

              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <CustomInput
                    name="title"
                    id="seoTitle"
                    label="SEO Title"
                    placeholder="Enter SEO title"
                    value={formData.seo.title}
                    onChange={handleSeoChange}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <CustomInput
                    name="description"
                    id="seoDescription"
                    label="SEO Description"
                    placeholder="Enter SEO description"
                    value={formData.seo.description}
                    onChange={handleSeoChange}
                    multiline
                    rows={4}
                    fullWidth
                  />
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Grid container>
            <Grid item xs={12}>
              <Paper elevation={1} sx={{ p: 2, bgcolor: "#f2f2f270" }}>
                <CustomSelect
                  name="status"
                  id="status"
                  label="Status"
                  value={formData.status}
                  onChange={handleInputChange}
                  MenuItems={[
                    { value: "draft", label: "Draft" },
                    { value: "active", label: "Active" },
                    { value: "archived", label: "Archived" },
                  ]}
                  fullWidth
                />
              </Paper>
            </Grid>
            <Paper
              elevation={1}
              sx={{ p: 2, bgcolor: "#f2f2f270", width: "100%", mt: 2 }}
            >
              <Typography gutterBottom fontWeight={"bold"}>
                Product organization
              </Typography>
              <Grid item xs={12}>
                <CustomInput
                  name="type"
                  id="type"
                  label="Product Type"
                  placeholder="e.g., T-Shirt, Electronics"
                  value={formData.type}
                  onChange={handleInputChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <CustomInput
                  name="tag"
                  id="tag"
                  label="Tags"
                  placeholder="Enter tags (comma-separated)"
                  value={formData.tag}
                  onChange={handleInputChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <CustomSelect
                  name="category"
                  id="category"
                  label="Category"
                  value={formData.category}
                  onChange={handleInputChange}
                  MenuItems={[
                    { value: "electronics", label: "Electronics" },
                    { value: "fashion", label: "Fashion" },
                  ]}
                  fullWidth
                />
              </Grid>
            </Paper>
            <Paper
              elevation={1}
              sx={{ p: 2, bgcolor: "#f2f2f270", width: "100%", mt: 2 }}
            >
              <Typography gutterBottom fontWeight={"bold"}>
                Pricing
              </Typography>

              <Grid container>
                <Grid item xs={12}>
                  <CustomInput
                    name="price"
                    id="price"
                    label="Sale Price"
                    type="number"
                    placeholder="0.00"
                    value={formData.price}
                    onChange={handleInputChange}
                    fullWidth
                    InputProps={{
                      startAdornment: <Typography sx={{ mr: 1 }}>$</Typography>,
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <CustomInput
                    name="compareAtPrice"
                    id="compareAtPrice"
                    label="Compare at Price"
                    type="number"
                    placeholder="0.00"
                    value={formData.compareAtPrice}
                    onChange={handleInputChange}
                    fullWidth
                    InputProps={{
                      startAdornment: <Typography sx={{ mr: 1 }}>$</Typography>,
                    }}
                  />
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          sx={{ px: 4 }}
        >
          Publish
        </Button>
      </Box>
    </Container>
  );
}

export default AddShopifyProduct;
