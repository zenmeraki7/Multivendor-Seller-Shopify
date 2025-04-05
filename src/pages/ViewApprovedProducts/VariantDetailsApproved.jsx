import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Stack,
  IconButton,
  Paper,
  Chip,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TextField,
  CircularProgress,
  Alert,
} from "@mui/material";

import AddCircleIcon from "@mui/icons-material/AddCircle";
import CustomInput from "../../components/SharedComponents/CustomInput";
import toast from "react-hot-toast";
import DeleteIcon from "@mui/icons-material/Delete";

const VariantDetailsApproved = ({
  variantsData,
  setVariantsData,
  productData,
  setProductData,
}) => {
  const [isVariantExpand, setIsVariantExpand] = useState(false);
  const [newVariantType, setNewVariantType] = useState("");
  const [newOption, setNewOption] = useState("");
  const [newVariantOptions, setNewVariantOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  // Debug logging for initial data
  useEffect(() => {
    console.log("VariantDetailsApproved - Initial productData:", productData);
    console.log("VariantDetailsApproved - Initial variantsData:", variantsData);
  }, []);

  // Generate all possible combinations of variants
  const generateCombinations = (variants) => {
    if (!variants || !Array.isArray(variants) || variants.length === 0) {
      console.log("No valid variants array to generate combinations");
      return [];
    }
    
    console.log("Generating combinations from variants:", variants);
    
    const combine = (arrays, prefix = []) => {
      if (!arrays.length) return [prefix];
      return arrays[0].flatMap((option) =>
        combine(arrays.slice(1), [...prefix, option])
      );
    };

    const optionLists = variants.map((v) => Array.isArray(v.values) ? v.values : []);
    console.log("Option lists:", optionLists);
    
    // If any variant has no values, return empty array
    if (optionLists.some(list => list.length === 0)) {
      console.log("Some variant has no values, returning empty array");
      return [];
    }
    
    const combinations = combine(optionLists);
    console.log("Raw combinations:", combinations);
    
    return combinations.map((combination) => {
      const type = combination.map((item, index) => {
        return {
          option: variants[index].name,
          value: item,
        };
      });
      
      // Get default price and compareAtPrice from productData if available
      const defaultPrice = productData?.price !== undefined ? 
        Number(productData.price) : 0;
      
      const defaultCompareAtPrice = productData?.compareAtPrice !== undefined ? 
        Number(productData.compareAtPrice) : 0;
      
      return {
        variant: combination.join(" / "),
        quantity: 0,
        barcode: "",
        sku: `SKU-${combination.join("-").toUpperCase()}`,
        price: defaultPrice,
        compareAtPrice: defaultCompareAtPrice,
        variantTypes: type,
      };
    });
  };

  // Initialize or update variants when product options change
  useEffect(() => {
    if (!productData) {
      console.log("No productData available");
      return;
    }
    
    console.log("Product options change detected, productData:", productData);
    
    // Check for product options in a safe way
    const hasProductOptions = 
      productData.productOptions && 
      Array.isArray(productData.productOptions) && 
      productData.productOptions.length > 0;
    
    console.log("Has product options:", hasProductOptions);
    
    if (hasProductOptions) {
      console.log("Generating variants from product options:", productData.productOptions);
      
      // Check if we already have variants data
      const hasExistingVariants = 
        Array.isArray(variantsData) && 
        variantsData.length > 0;
      
      console.log("Has existing variants:", hasExistingVariants);
      
      if (hasExistingVariants) {
        // Get newly generated combinations
        const newCombinations = generateCombinations(productData.productOptions);
        console.log("New combinations generated:", newCombinations);
        
        // Preserve existing data for matching variants
        const updatedVariants = newCombinations.map(newVar => {
          const existingVar = variantsData.find(v => v.variant === newVar.variant);
          if (existingVar) {
            console.log("Found existing variant for:", newVar.variant);
            return {
              ...newVar,
              quantity: existingVar.quantity || 0,
              barcode: existingVar.barcode || "",
              price: existingVar.price !== undefined ? existingVar.price : (productData.price || 0),
              compareAtPrice: existingVar.compareAtPrice !== undefined ? 
                existingVar.compareAtPrice : (productData.compareAtPrice || 0),
            };
          }
          return newVar;
        });
        
        console.log("Setting updated variants with preserved data:", updatedVariants);
        setVariantsData(updatedVariants);
      } else {
        // No existing variants, generate fresh
        const freshVariants = generateCombinations(productData.productOptions);
        console.log("Setting fresh variants:", freshVariants);
        setVariantsData(freshVariants);
      }
    } else if (productData.variants && Array.isArray(productData.variants) && productData.variants.length > 0) {
      // If productOptions isn't available but variants is, use that
      console.log("No product options but found variants in product data, using those");
      setVariantsData(productData.variants);
    } else {
      // No product options or variants, clear variantsData
      console.log("No product options or variants found, clearing variants data");
      setVariantsData([]);
    }
  }, [productData?.productOptions]);

  // Update field values for a variant
  const handleChange = (index, field, value) => {
    if (!Array.isArray(variantsData)) {
      console.error("variantsData is not an array");
      setVariantsData([]);
      return;
    }
    
    const updatedCombinations = [...variantsData];
    if (updatedCombinations[index]) {
      updatedCombinations[index][field] = value;
      setVariantsData(updatedCombinations);
    }
  };

  // Delete a variant type
  const handleDeleteVariant = (type) => {
    if (!productData || !productData.productOptions || !Array.isArray(productData.productOptions)) {
      toast.error("Product options data is not valid");
      return;
    }
    
    setProductData({
      ...productData,
      productOptions: productData.productOptions.filter(
        (variant) => variant.name !== type
      ),
    });
    toast.success(`Removed ${type} variant`);
  };

  // Delete a single option inside a variant
  const handleDeleteOption = (variantType, option) => {
    if (!productData || !productData.productOptions || !Array.isArray(productData.productOptions)) {
      toast.error("Product options data is not valid");
      return;
    }
    
    setProductData({
      ...productData,
      productOptions: productData.productOptions.map((variant) =>
        variant.name === variantType
          ? {
              ...variant,
              values: Array.isArray(variant.values) 
                ? variant.values.filter((opt) => opt !== option)
                : []
            }
          : variant
      ),
    });
    toast.success(`Removed ${option} option`);
  };

  // Update a variant name
  const handleUpdateVariant = (oldType, newType) => {
    if (!newType.trim()) {
      toast.error("Variant name cannot be empty");
      return;
    }

    if (!productData || !productData.productOptions || !Array.isArray(productData.productOptions)) {
      toast.error("Product options data is not valid");
      return;
    }

    if (productData.productOptions.some((item) => item.name === newType)) {
      toast.error("Variant already exists");
      return;
    }

    setProductData({
      ...productData,
      productOptions: productData.productOptions.map((variant) =>
        variant.name === oldType ? { ...variant, name: newType } : variant
      ),
    });
    toast.success("Variant updated");
  };

  // Add a new option to a variant type
  const handleAddOption = () => {
    if (!newOption.trim()) {
      toast.error("Option cannot be empty");
      return;
    }
    
    if (newVariantOptions.includes(newOption)) {
      toast.error("Option already exists");
      return;
    }
    
    setNewVariantOptions([...newVariantOptions, newOption]);
    setNewOption("");
  };

  // Add the new variant type with options
  const handleAddVariant = () => {
    if (!newVariantType.trim()) {
      toast.error("Variant type cannot be empty");
      return;
    }
    
    if (newVariantOptions.length === 0) {
      toast.error("At least one option is required");
      return;
    }
    
    if (!productData) {
      toast.error("Product data is not available");
      return;
    }
    
    // Safely check if productOptions exists and is an array
    const currentProductOptions = Array.isArray(productData.productOptions) 
      ? productData.productOptions 
      : [];
    
    if (currentProductOptions.some(item => item.name === newVariantType)) {
      toast.error("Variant type already exists");
      return;
    }
    
    const updatedOptions = [
      ...currentProductOptions,
      {
        name: newVariantType,
        values: newVariantOptions,
      },
    ];
    
    setProductData({
      ...productData,
      productOptions: updatedOptions,
    });
    
    // Reset form
    setNewVariantType("");
    setNewVariantOptions([]);
    setIsVariantExpand(false);
    
    toast.success("Variant added successfully");
  };

  // Set all variant prices at once
  const handleSetAllPrices = (price) => {
    if (!Array.isArray(variantsData)) {
      toast.error("Variants data is not valid");
      return;
    }
    
    const updatedVariants = variantsData.map(variant => ({
      ...variant,
      price: Number(price) || 0,
    }));
    setVariantsData(updatedVariants);
    toast.success("Updated all variant prices");
  };

  // Set all compare-at prices at once
  const handleSetAllCompareAtPrices = (compareAtPrice) => {
    if (!Array.isArray(variantsData)) {
      toast.error("Variants data is not valid");
      return;
    }
    
    const updatedVariants = variantsData.map(variant => ({
      ...variant,
      compareAtPrice: Number(compareAtPrice) || 0,
    }));
    setVariantsData(updatedVariants);
    toast.success("Updated all variant compare-at prices");
  };

  // Loading state when productData is not available
  if (!productData) {
    return (
      <Paper elevation={1} sx={{ p: 2, bgcolor: "#f2f2f270", mt: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
          <CircularProgress />
        </Box>
      </Paper>
    );
  }

  // Ensure productOptions is always an array
  const productOptions = Array.isArray(productData.productOptions) 
    ? productData.productOptions 
    : [];
  
  // Ensure variantsData is always an array
  const safeVariantsData = Array.isArray(variantsData) ? variantsData : [];

  return (
    <>
      <Paper elevation={1} sx={{ p: 2, bgcolor: "#f2f2f270", mt: 3 }}>
        <Typography variant="h6" gutterBottom fontWeight="bold">
          Variants
        </Typography>
        
        {/* Debug info - can be removed in production */}
        <Alert severity="info" sx={{ mb: 2 }}>
          <Typography variant="caption">
            Product has {productOptions.length} variant types and {safeVariantsData.length} variant combinations
          </Typography>
        </Alert>
        
        <Box sx={{ mt: 2 }}>
          {!isVariantExpand && (
            <Button 
              onClick={() => setIsVariantExpand(true)} 
              size="small" 
              variant="outlined" 
              startIcon={<AddCircleIcon />}
            >
              Add Variant
            </Button>
          )}

          {/* Display existing variant types and their options */}
          {productOptions.map((item) => (
            <Stack
              key={item.name}
              p={1}
              px={2}
              direction="row"
              alignItems="center"
              spacing={1}
              component={Paper}
              sx={{ mt: 2 }}
            >
              <Typography fontWeight="bold">{item.name} :</Typography>
              <Stack spacing={1} direction="row" flexWrap="wrap" sx={{ flex: 1 }}>
                {Array.isArray(item.values) && item.values.map((option) => (
                  <Chip
                    key={option}
                    label={option}
                    onDelete={() => handleDeleteOption(item.name, option)}
                    sx={{ m: 0.25 }}
                  />
                ))}
              </Stack>
              <IconButton onClick={() => handleDeleteVariant(item.name)}>
                <DeleteIcon />
              </IconButton>
            </Stack>
          ))}

          {/* Form to add new variant type */}
          {isVariantExpand && (
            <Paper elevation={2} sx={{ p: 2, mt: 2 }}>
              <Typography variant="subtitle1" gutterBottom>
                Add New Variant
              </Typography>
              <Stack width="100%" spacing={1} sx={{ mt: 2 }}>
                <CustomInput
                  name="option"
                  id="option"
                  label="Option Name"
                  placeholder="Eg:- Color"
                  value={newVariantType}
                  onChange={(e) => setNewVariantType(e.target.value)}
                  fullWidth
                />
                
                {/* Display selected options for new variant */}
                {newVariantOptions.length > 0 && (
                  <Box sx={{ p: 1, border: '1px solid #e0e0e0', borderRadius: 1, mt: 1 }}>
                    <Typography variant="caption" color="text.secondary" gutterBottom>
                      Selected Options:
                    </Typography>
                    <Stack direction="row" spacing={1} flexWrap="wrap">
                      {newVariantOptions.map((item) => (
                        <Chip
                          key={item}
                          label={item}
                          size="small"
                          onDelete={() => {
                            setNewVariantOptions(
                              newVariantOptions.filter((option) => option !== item)
                            );
                          }}
                          sx={{ m: 0.25 }}
                        />
                      ))}
                    </Stack>
                  </Box>
                )}
                
                {/* Input for adding options to the new variant */}
                {newVariantType && (
                  <Stack alignItems="flex-end" direction="row" spacing={1}>
                    <CustomInput
                      name="value"
                      id="value"
                      label="Option Value"
                      placeholder="Eg:- Red"
                      value={newOption}
                      onChange={(e) => setNewOption(e.target.value)}
                      fullWidth
                      onKeyPress={(e) => {
                        if (e.key === 'Enter' && newOption) {
                          e.preventDefault();
                          handleAddOption();
                        }
                      }}
                    />
                    <IconButton
                      disabled={!newOption}
                      onClick={handleAddOption}
                      color="primary"
                    >
                      <AddCircleIcon />
                    </IconButton>
                  </Stack>
                )}
                
                {/* Buttons for adding or canceling new variant */}
                <Stack direction="row" spacing={2} sx={{ mt: 1 }}>
                  <Button
                    onClick={() => {
                      setNewVariantType("");
                      setNewVariantOptions([]);
                      setNewOption("");
                      setIsVariantExpand(false);
                    }}
                    fullWidth
                    size="small"
                  >
                    Cancel
                  </Button>
                  <Button
                    disabled={newVariantOptions.length === 0 || !newVariantType}
                    onClick={handleAddVariant}
                    fullWidth
                    variant="contained"
                    size="small"
                  >
                    Add Variant
                  </Button>
                </Stack>
              </Stack>
            </Paper>
          )}
        </Box>
        
        {/* Variant combinations table */}
        {productOptions.length > 0 && safeVariantsData.length > 0 ? (
          <Box sx={{ mt: 3, overflowX: 'auto' }}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2, gap: 2 }}>
              <Button 
                size="small"
                variant="outlined"
                onClick={() => handleSetAllPrices(productData.price || 0)}
              >
                Set All Prices
              </Button>
              <Button 
                size="small"
                variant="outlined"
                onClick={() => handleSetAllCompareAtPrices(productData.compareAtPrice || 0)}
              >
                Set All Compare Prices
              </Button>
            </Box>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Variant</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>Barcode</TableCell>
                  <TableCell>SKU</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Compare at Price</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {safeVariantsData.map((variant, index) => (
                  <TableRow key={index}>
                    <TableCell>{variant.variant}</TableCell>
                    <TableCell>
                      <TextField
                        sx={{ width: "80px" }}
                        type="number"
                        value={variant.quantity || 0}
                        onChange={(e) =>
                          handleChange(index, "quantity", e.target.value)
                        }
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        value={variant.barcode || ""}
                        onChange={(e) =>
                          handleChange(index, "barcode", e.target.value)
                        }
                        size="small"
                      />
                    </TableCell>
                    <TableCell>{variant.sku || ""}</TableCell>
                    <TableCell>
                      <TextField
                        sx={{ width: "80px" }}
                        type="number"
                        value={variant.price !== undefined ? variant.price : (productData.price || 0)}
                        onChange={(e) =>
                          handleChange(index, "price", e.target.value)
                        }
                        size="small"
                        InputProps={{
                          startAdornment: <Typography sx={{ mr: 0.5 }}>$</Typography>,
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        sx={{ width: "80px" }}
                        type="number"
                        value={variant.compareAtPrice !== undefined ? variant.compareAtPrice : (productData.compareAtPrice || 0)}
                        onChange={(e) =>
                          handleChange(index, "compareAtPrice", e.target.value)
                        }
                        size="small"
                        InputProps={{
                          startAdornment: <Typography sx={{ mr: 0.5 }}>$</Typography>,
                        }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        ) : productOptions.length > 0 ? (
          <Alert severity="warning" sx={{ mt: 2 }}>
            Variant options need values to generate combinations
          </Alert>
        ) : null}
      </Paper>
    </>
  );
};

export default VariantDetailsApproved;