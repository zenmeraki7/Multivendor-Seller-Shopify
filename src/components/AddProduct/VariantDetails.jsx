import React, { useState } from "react";
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
} from "@mui/material";

import AddCircleIcon from "@mui/icons-material/AddCircle";
import CustomInput from "../../components/SharedComponents/CustomInput";
import toast from "react-hot-toast";
import DeleteIcon from "@mui/icons-material/Delete";

const VariantDetails = ({
  variantsData,
  setVariantsData,
  productData,
  setProductData,
}) => {
  const [variantTypes, setVariantTypes] = useState([]);
  const [isVariantExpand, setIsVariantExpand] = useState(false);
  const [newVariantType, setNewVariantType] = useState("");
  const [newOption, setNewOption] = useState([]);
  const [newVariantOptions, setNewVariantOptions] = useState([]);

  // Function to generate all possible combinations
  const generateCombinations = (variants) => {
    const combine = (arrays, prefix = []) => {
      if (!arrays.length) return [prefix];
      return arrays[0].flatMap((option) =>
        combine(arrays.slice(1), [...prefix, option])
      );
    };

    const optionLists = variants.map((v) => v.values);
    return combine(optionLists).map((combination) => {
      const type = combination?.map((item) => {
        const op = variants.find((opt) => {
          return opt.values.includes(item);
        });
        return {
          option: op.name,
          value: item,
        };
      });
      // console.log(type);
      return {
        variant: combination.join(" / "),
        quantity: 0,
        barcode: "",
        sku: `SKU-${combination.join("-").toUpperCase()}`,
        price: 0,
        compareAtPrice: 0,
        variantTypes: type,
      };
    });
  };

  React.useEffect(() => {
    productData.productOptions?.length &&
      setVariantsData(generateCombinations(productData?.productOptions));
  }, [productData?.productOptions]);

  // Update field values
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
    // toast.success("Variant deleted");
  };

  // Delete a single option inside a variant
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
    // toast.success("Option removed");
  };

  // Update a variant name
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
  return (
    <>
      <Paper elevation={1} sx={{ p: 2, bgcolor: "#f2f2f270", mt: 3 }}>
        <Box sx={{ mt: 2 }}>
          <Button onClick={() => setIsVariantExpand(true)} size="small">
            <AddCircleIcon /> Variants
          </Button>

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
              <Stack spacing={1} direction="row">
                {item.values.map((option) => (
                  <Chip
                    key={option}
                    label={option}
                    onDelete={() => handleDeleteOption(item.name, option)}
                  />
                ))}
              </Stack>
              {/* <IconButton
                    onClick={() => {
                      const newName = prompt(
                        "Enter new variant name",
                        item.type
                      );
                      if (newName) handleUpdateVariant(item.type, newName);
                    }}
                  >
                    <EditIcon />
                  </IconButton> */}
              <IconButton onClick={() => handleDeleteVariant(item.name)}>
                <DeleteIcon />
              </IconButton>
            </Stack>
          ))}

          {isVariantExpand && (
            <Stack width="300px" spacing={1} sx={{ mt: 2 }}>
              <CustomInput
                name="option"
                id="option"
                label="Option Name"
                placeholder="Eg:- Color"
                value={newVariantType}
                onChange={(e) => setNewVariantType(e.target.value)}
                fullWidth
              />
              <Stack direction="row" spacing={1}>
                {newVariantOptions.map((item) => (
                  <Chip
                    key={item}
                    label={item}
                    onDelete={() => {
                      setNewVariantOptions(
                        newVariantOptions.filter((option) => option !== item)
                      );
                    }}
                  />
                ))}
              </Stack>
              {newVariantType && (
                <Stack alignItems="flex-end" direction="row">
                  <CustomInput
                    name="value"
                    id="value"
                    label="Option Value"
                    placeholder="Eg:- Red"
                    value={newOption}
                    onChange={(e) => setNewOption(e.target.value)}
                    fullWidth
                  />
                  <IconButton
                    disabled={!newOption}
                    onClick={() => {
                      if (newVariantOptions.includes(newOption)) {
                        toast.error("Option already exists");
                        return;
                      }
                      setNewVariantOptions([...newVariantOptions, newOption]);
                      setNewOption("");
                    }}
                  >
                    <AddCircleIcon />
                  </IconButton>
                </Stack>
              )}
              <Stack direction="row" spacing={2}>
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
                  onClick={() => {
                    if (
                      productData?.productOptions?.some(
                        (item) => item.name === newVariantType
                      )
                    ) {
                      toast.error("Variant already exists");
                      return;
                    }
                    setProductData({
                      ...productData,
                      productOptions: [
                        ...productData?.productOptions,
                        {
                          name: newVariantType,
                          values: newVariantOptions,
                        },
                      ],
                    });
                    setNewVariantType("");
                    setNewVariantOptions([]);
                    setIsVariantExpand(false);
                  }}
                  fullWidth
                  variant="contained"
                  size="small"
                >
                  Add
                </Button>
              </Stack>
            </Stack>
          )}
        </Box>
        {productData?.productOptions?.length > 0 && (
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
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Paper>
    </>
  );
};

export default VariantDetails;
