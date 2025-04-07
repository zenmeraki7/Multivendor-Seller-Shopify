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

const VariantDetailsPending = ({
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

  const generateCombinations = (variants) => {
    if (!variants || variants.length === 0) return [];
    
    const combine = (arrays, prefix = []) => {
      if (!arrays.length) return [prefix];
      return arrays[0].flatMap((option) =>
        combine(arrays.slice(1), [...prefix, option])
      );
    };

    const optionLists = variants.map((v) => v.values || []);
    
    if (optionLists.some(list => list.length === 0)) return [];
    
    return combine(optionLists).map((combination) => {
      const type = combination?.map((item) => {
        const op = variants.find((opt) => {
          return opt.values && opt.values.includes(item);
        });
        return {
          option: op.name,
          value: item,
        };
      });
      
      return {
        variant: combination.join(" / "),
        quantity: 0,
        barcode: "",
        sku: `SKU-${combination.join("-").toUpperCase()}`,
        price: productData?.price || 0,
        compareAtPrice: productData?.compareAtPrice || 0,
        variantTypes: type,
      };
    });
  };

  useEffect(() => {
    if (productData && productData.productOptions && productData.productOptions.length > 0) {
      console.log("Generating variants from product options:", productData.productOptions);
      
      if (variantsData && variantsData.length > 0) {
        const newCombinations = generateCombinations(productData.productOptions);
        
        const updatedVariants = newCombinations.map(newVar => {
          const existingVar = variantsData.find(v => v.variant === newVar.variant);
          if (existingVar) {
            return {
              ...newVar,
              quantity: existingVar.quantity || 0,
              barcode: existingVar.barcode || "",
              price: existingVar.price || productData.price || 0,
              compareAtPrice: existingVar.compareAtPrice || productData.compareAtPrice || 0,
            };
          }
          return newVar;
        });
        
        setVariantsData(updatedVariants);
      } else {
        setVariantsData(generateCombinations(productData.productOptions));
      }
    } else {
      setVariantsData([]);
    }
  }, [productData?.productOptions]);

  const handleChange = (index, field, value) => {
    const updatedCombinations = [...variantsData];
    updatedCombinations[index][field] = value;
    setVariantsData(updatedCombinations);
  };

  const handleDeleteVariant = (type) => {
    setProductData({
      ...productData,
      productOptions: productData?.productOptions?.filter(
        (variant) => variant.name !== type
      ),
    });
    toast.success(`Removed ${type} variant`);
  };

  const handleDeleteOption = (variantType, option) => {
    setProductData({
      ...productData,
      productOptions: productData?.productOptions?.map((variant) =>
        variant.name === variantType
          ? {
              ...variant,
              values: variant.values.filter((opt) => opt !== option),
            }
          : variant
      ),
    });
    toast.success(`Removed ${option} option`);
  };

  const handleUpdateVariant = (oldType, newType) => {
    if (!newType.trim()) {
      toast.error("Variant name cannot be empty");
      return;
    }

    if (productData?.productOptions?.some((item) => item.name === newType)) {
      toast.error("Variant already exists");
      return;
    }

    setProductData({
      ...productData,
      productOptions: productData?.productOptions?.map((variant) =>
        variant.name === oldType ? { ...variant, name: newType } : variant
      ),
    });
    toast.success("Variant updated");
  };

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

  const handleAddVariant = () => {
    if (!newVariantType.trim()) {
      toast.error("Variant type cannot be empty");
      return;
    }
    
    if (newVariantOptions.length === 0) {
      toast.error("At least one option is required");
      return;
    }
    
    if (productData?.productOptions?.some(item => item.name === newVariantType)) {
      toast.error("Variant type already exists");
      return;
    }
    
    const updatedOptions = [
      ...(productData?.productOptions || []),
      {
        name: newVariantType,
        values: newVariantOptions,
      },
    ];
    
    setProductData({
      ...productData,
      productOptions: updatedOptions,
    });
    
    setNewVariantType("");
    setNewVariantOptions([]);
    setIsVariantExpand(false);
    
    toast.success("Variant added successfully");
  };

  const handleSetAllPrices = (price) => {
    const updatedVariants = variantsData.map(variant => ({
      ...variant,
      price,
    }));
    setVariantsData(updatedVariants);
    toast.success("Updated all variant prices");
  };

  const handleSetAllCompareAtPrices = (compareAtPrice) => {
    const updatedVariants = variantsData.map(variant => ({
      ...variant,
      compareAtPrice,
    }));
    setVariantsData(updatedVariants);
    toast.success("Updated all variant compare-at prices");
  };

  if (!productData) {
    return (
      <Paper elevation={1} sx={{ p: 2, bgcolor: "#f2f2f270", mt: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
          <CircularProgress />
        </Box>
      </Paper>
    );
  }

  return (
    <>
      <Paper elevation={1} sx={{ p: 2, bgcolor: "#f2f2f270", mt: 3 }}>
        <Typography variant="h6" gutterBottom fontWeight="bold">
          Variants
        </Typography>
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
          {productData?.productOptions?.map((item) => (
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
                {item.values?.map((option) => (
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
        {productData?.productOptions?.length > 0 && variantsData?.length > 0 ? (
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
                {variantsData.map((variant, index) => (
                  <TableRow key={index}>
                    <TableCell>{variant.variant}</TableCell>
                    <TableCell>
                      <TextField
                        sx={{ width: "80px" }}
                        type="number"
                        value={variant.quantity}
                        onChange={(e) =>
                          handleChange(index, "quantity", e.target.value)
                        }
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        value={variant.barcode}
                        onChange={(e) =>
                          handleChange(index, "barcode", e.target.value)
                        }
                        size="small"
                      />
                    </TableCell>
                    <TableCell>{variant.sku}</TableCell>
                    <TableCell>
                      <TextField
                        sx={{ width: "80px" }}
                        type="number"
                        value={variant.price}
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
                        value={variant.compareAtPrice}
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
        ) : productData?.productOptions?.length > 0 ? (
          <Alert severity="warning" sx={{ mt: 2 }}>
            Variant options need values to generate combinations
          </Alert>
        ) : null}
      </Paper>
    </>
  );
};

export default VariantDetailsPending;