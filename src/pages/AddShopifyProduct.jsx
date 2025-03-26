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
import AddIcon from "@mui/icons-material/Add";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import SyncAltIcon from "@mui/icons-material/SyncAlt";
import JoditEditor from "jodit-react";
import CustomInput from "../components/SharedComponents/CustomInput";
import CustomSelect from "../components/SharedComponents/CustomSelect";
import Variants from "../components/Shopify/Variants";

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
    const formattedVariants = variantsData.map(variant => ({
      ...variant,
      options: [{ 
        name: optionName, 
        value: variant.value || variant.name || "Unknown" // Make sure value is included
      }]
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
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header with Save Button */}
      <Paper
        elevation={0}
        sx={{
          p: 3,
          mb: 3,
          borderRadius: 2,
          backgroundColor: "#fff",
          borderBottom: "1px solid #e0e0e0",
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h4" fontWeight="500">
            Add Product
          </Typography>
          <Box>
            <Button variant="outlined" color="primary" sx={{ mr: 2 }}>
              Save as Draft
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              sx={{ px: 4 }}
            >
              Publish
            </Button>
          </Box>
        </Stack>
      </Paper>

      <Grid container spacing={3}>
        {/* Left Section - 8/12 width */}
        <Grid item xs={12} md={8}>
          {/* Content Tabs */}
          <Paper
            elevation={0}
            sx={{ mb: 3, borderRadius: 2, overflow: "hidden" }}
          >
            <Tabs
              value={activeTab}
              onChange={handleTabChange}
              sx={{
                borderBottom: 1,
                borderColor: "divider",
                "& .MuiTabs-indicator": {
                  backgroundColor: "#1976d2",
                  height: 3,
                },
              }}
            >
              <Tab label="Basic Info" />
              <Tab label="Media" />
              <Tab label="Description" />
              <Tab label="SEO" />
            </Tabs>

            {/* Basic Info Tab */}
            {activeTab === 0 && (
              <Box sx={{ p: 3 }}>
                <Grid container spacing={3}>
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
                  <Grid item xs={12} sm={6}>
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
                  </Grid>
                  <Grid item xs={12} sm={6}>
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
                  <Grid item xs={12} sm={6}>
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
                  <Grid item xs={12} sm={6}>
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
                </Grid>

                {!showVariantsTable ? (
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    sx={{ mt: 2 }}
                  >
                    Add variants like size, color, material, etc.
                  </Typography>
                ) : (
                  <Box sx={{ mt: 2 }}>
                    <TableContainer>
                      <Table size="small" aria-label="variants table">
                        <TableHead>
                          <TableRow>
                            <TableCell padding="checkbox">
                              <Checkbox />
                            </TableCell>
                            <TableCell>Variant</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell>Available</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {variants.map((variant, index) => {
                            const isParent = isParentVariant(variant);
                            const parentKey = getParentKey(variant);
                            const childVariants = isParent
                              ? getChildVariants(variant)
                              : [];
                            const childCount = childVariants.length;

                            return (
                              <TableRow key={index}>
                                <TableCell padding="checkbox">
                                  <Checkbox />
                                </TableCell>
                                <TableCell>
                                  <Stack
                                    direction="row"
                                    alignItems="center"
                                    spacing={1}
                                  >
                                    <IconButton
                                      size="small"
                                      sx={{ color: "#1976d2" }}
                                    >
                                      <SyncAltIcon fontSize="small" />
                                    </IconButton>

                                    {/* Display the variant name with option name and value */}
                                    {variant.options &&
                                      variant.options.map((option, i) => (
                                        <React.Fragment key={i}>
                                          {i > 0 && " • "}
                                          <Typography
                                            component="span"
                                            sx={{ fontWeight: "medium" }}
                                          >
                                            {option.name}: {option.value}
                                          </Typography>
                                          {option.isNew && (
                                            <Box
                                              component="span"
                                              sx={{
                                                ml: 1,
                                                bgcolor: "#e3f2fd",
                                                px: 1,
                                                py: 0.5,
                                                borderRadius: 1,
                                                fontSize: "0.75rem",
                                              }}
                                            >
                                              New
                                            </Box>
                                          )}
                                        </React.Fragment>
                                      ))}

                                    {isParent && childCount > 0 && (
                                      <Button
                                        size="small"
                                        onClick={() =>
                                          toggleVariantExpand(parentKey)
                                        }
                                        sx={{ ml: 1 }}
                                        endIcon={
                                          expandedVariants[parentKey]
                                            ? "▼"
                                            : "▶"
                                        }
                                      >
                                        {childCount} variants
                                      </Button>
                                    )}
                                  </Stack>
                                </TableCell>
                                <TableCell>
                                  <Box
                                    sx={{
                                      display: "flex",
                                      alignItems: "center",
                                    }}
                                  >
                                    <Typography sx={{ mr: 0.5 }}>₹</Typography>
                                    <CustomInput
                                      type="text"
                                      value={variant.price}
                                      onChange={(e) =>
                                        handleVariantChange(
                                          index,
                                          "price",
                                          e.target.value
                                        )
                                      }
                                      size="small"
                                      sx={{
                                        width: "120px",
                                        bgcolor: isParent ? "#f5f5f5" : "white",
                                      }}
                                    />
                                  </Box>
                                </TableCell>
                                <TableCell>
                                  <CustomInput
                                    type="text"
                                    value={variant.available}
                                    onChange={(e) =>
                                      handleVariantChange(
                                        index,
                                        "available",
                                        e.target.value
                                      )
                                    }
                                    size="small"
                                    sx={{
                                      width: "80px",
                                      bgcolor: isParent ? "#f5f5f5" : "white",
                                    }}
                                    // Only allow editing for the most granular variants
                                    disabled={isParent}
                                  />
                                </TableCell>
                              </TableRow>
                            );
                          })}
                        </TableBody>
                      </Table>
                    </TableContainer>
                    {/* Total inventory display */}
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      sx={{ mt: 2, textAlign: "center" }}
                    >
                      Total inventory at Shop location: {totalInventory}{" "}
                      available
                    </Typography>
                  </Box>
                )}
              </Box>
            )}

            {/* Media Tab */}
            {activeTab === 1 && (
              <Box sx={{ p: 3 }}>
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
                                height={index === 0 ? "200" : "150"}
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
            )}

            {/* Description Tab */}
            {activeTab === 2 && (
              <Box sx={{ p: 3 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Product Description
                </Typography>
                <Box
                  sx={{ border: "1px solid #e0e0e0", borderRadius: 1, mb: 2 }}
                >
                  <JoditEditor
                    value={formData.description}
                    onChange={(content) =>
                      setFormData({ ...formData, description: content })
                    }
                    config={{
                      height: 400,
                      placeholder: "Write a detailed product description...",
                      buttons: [
                        "bold",
                        "italic",
                        "underline",
                        "|",
                        "ul",
                        "ol",
                        "|",
                        "link",
                        "image",
                        "|",
                        "undo",
                        "redo",
                      ],
                    }}
                  />
                </Box>
              </Box>
            )}

            {/* SEO Tab */}
            {activeTab === 3 && (
              <Box sx={{ p: 3 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Search Engine Optimization
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  sx={{ mb: 3 }}
                >
                  Improve your product's visibility in search results
                </Typography>

                <Grid container spacing={3}>
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
                  <Grid item xs={12}>
                    <CustomInput
                      name="keywords"
                      id="seoKeywords"
                      label="SEO Keywords"
                      placeholder="Enter SEO keywords (separated by commas)"
                      value={formData.seo.keywords}
                      onChange={handleSeoChange}
                      fullWidth
                    />
                  </Grid>
                </Grid>
              </Box>
            )}
          </Paper>
        </Grid>

        {/* Right Section - 4/12 width */}
        <Grid item xs={12} md={4}>
          {/* Pricing Card */}
          <Paper elevation={0} sx={{ p: 3, mb: 3, borderRadius: 2 }}>
            <Typography variant="h6" gutterBottom>
              Pricing
            </Typography>
            <Divider sx={{ mb: 2 }} />

            <Grid container spacing={2}>
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

          {/* Variants Card */}
          <Paper elevation={0} sx={{ p: 3, mb: 3, borderRadius: 2 }}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              sx={{ mb: 2 }}
            >
              <Typography variant="h6">Product Variants</Typography>
              <Button
                variant="text"
                startIcon={<AddIcon />}
                onClick={() => setVariantsModalOpen(true)}
              >
                Add Variants
              </Button>
            </Stack>
            <Divider sx={{ mb: 2 }} />

            {/* Variants Modal */}
            <Variants
              open={variantsModalOpen}
              onClose={() => setVariantsModalOpen(false)}
              onSaveVariants={handleSaveVariants}
            />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default AddShopifyProduct;
