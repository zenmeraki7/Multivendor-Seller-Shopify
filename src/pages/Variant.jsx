import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  Button,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Divider,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

const ProductVariantsManager = () => {
  // State for variant types (e.g. Color, Size)
  const [variantTypes, setVariantTypes] = useState([]);

  // State for new variant type inputs
  const [newVariantType, setNewVariantType] = useState("");
  const [newVariantOption, setNewVariantOption] = useState("");
  const [selectedVariantTypeIndex, setSelectedVariantTypeIndex] = useState(0);

  // State for generated combinations
  const [variantCombinations, setVariantCombinations] = useState([]);
  console.log("Variant Types:", variantTypes);
  console.log("New Variant Type:", newVariantType);
  console.log("New Variant Option:", newVariantOption);
  console.log("Selected Variant Type Index:", selectedVariantTypeIndex);
  console.log("Variant Combinations:", variantCombinations);

  // Generate all possible combinations of variants
  useEffect(() => {
    if (variantTypes.length === 0) {
      setVariantCombinations([]);
      return;
    }

    const generateCombinations = (
      types,
      currentIndex = 0,
      currentCombination = {}
    ) => {
      if (currentIndex === types.length) {
        // Create a default price and inventory for each combination
        return [
          {
            ...currentCombination,
            price: 0,
            inventory: 0,
            sku: generateSku(currentCombination),
          },
        ];
      }

      const currentType = types[currentIndex];
      const results = [];

      for (const option of currentType.options) {
        const newCombination = {
          ...currentCombination,
          [currentType.name]: option,
        };

        results.push(
          ...generateCombinations(types, currentIndex + 1, newCombination)
        );
      }

      return results;
    };

    const newCombinations = generateCombinations(variantTypes);
    setVariantCombinations(newCombinations);
  }, [variantTypes]);

  // Generate a SKU based on variant combination
  const generateSku = (combination) => {
    return Object.values(combination).join("-").toUpperCase();
  };

  // Add a new variant type
  const addVariantType = () => {
    if (newVariantType.trim() === "") return;

    setVariantTypes([...variantTypes, { name: newVariantType, options: [] }]);
    setNewVariantType("");
  };

  // Add a new option to a variant type
  const addVariantOption = () => {
    if (newVariantOption.trim() === "") return;

    const updatedVariantTypes = [...variantTypes];
    updatedVariantTypes[selectedVariantTypeIndex].options.push(
      newVariantOption
    );
    setVariantTypes(updatedVariantTypes);
    setNewVariantOption("");
  };

  // Remove a variant type
  const removeVariantType = (index) => {
    const updatedVariantTypes = [...variantTypes];
    updatedVariantTypes.splice(index, 1);
    setVariantTypes(updatedVariantTypes);
  };

  // Remove a variant option
  const removeVariantOption = (typeIndex, optionIndex) => {
    const updatedVariantTypes = [...variantTypes];
    updatedVariantTypes[typeIndex].options.splice(optionIndex, 1);
    setVariantTypes(updatedVariantTypes);
  };

  // Update variant combination price
  const updatePrice = (index, value) => {
    const updatedCombinations = [...variantCombinations];
    updatedCombinations[index].price = value;
    setVariantCombinations(updatedCombinations);
  };

  // Update variant combination inventory
  const updateInventory = (index, value) => {
    const updatedCombinations = [...variantCombinations];
    updatedCombinations[index].inventory = value;
    setVariantCombinations(updatedCombinations);
  };

  return (
    <Box sx={{ maxWidth: 1200, margin: "0 auto", p: 2 }}>
      <Typography variant="h4" gutterBottom>
        Product Variants Manager
      </Typography>

      {/* Variant Types Accordion */}
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Variant Types</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box sx={{ mb: 2, display: "flex", gap: 2 }}>
            <TextField
              label="New Variant Type"
              value={newVariantType}
              onChange={(e) => setNewVariantType(e.target.value)}
              size="small"
            />
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={addVariantType}
            >
              Add Type
            </Button>
          </Box>

          {variantTypes.map((variantType, typeIndex) => (
            <Accordion key={typeIndex} sx={{ mb: 1 }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                >
                  <Typography>{variantType.name}</Typography>
                  <Chip
                    label={`${variantType.options.length} options`}
                    size="small"
                    sx={{ ml: 2 }}
                  />
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                <Box sx={{ mb: 2, display: "flex", gap: 2 }}>
                  <TextField
                    label={`Add option to ${variantType.name}`}
                    value={
                      selectedVariantTypeIndex === typeIndex
                        ? newVariantOption
                        : ""
                    }
                    onChange={(e) => {
                      setSelectedVariantTypeIndex(typeIndex);
                      setNewVariantOption(e.target.value);
                    }}
                    size="small"
                    fullWidth
                  />
                  <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={addVariantOption}
                  >
                    Add
                  </Button>
                </Box>

                <Box sx={{ mb: 2, display: "flex", flexWrap: "wrap", gap: 1 }}>
                  {variantType.options.map((option, optionIndex) => (
                    <Chip
                      key={optionIndex}
                      label={option}
                      onDelete={() =>
                        removeVariantOption(typeIndex, optionIndex)
                      }
                      sx={{ m: 0.5 }}
                    />
                  ))}
                </Box>

                <Box
                  sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}
                >
                  <Button
                    color="error"
                    startIcon={<DeleteIcon />}
                    onClick={() => removeVariantType(typeIndex)}
                  >
                    Remove Variant Type
                  </Button>
                </Box>
              </AccordionDetails>
            </Accordion>
          ))}
        </AccordionDetails>
      </Accordion>

      {/* Variant Combinations Accordion */}
      <Accordion defaultExpanded sx={{ mt: 2 }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">
            Variant Combinations ({variantCombinations.length})
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          {variantCombinations.length > 0 ? (
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    {variantTypes.map((type, index) => (
                      <TableCell key={index}>{type.name}</TableCell>
                    ))}
                    <TableCell>SKU</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell>Inventory</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {variantCombinations.map((combination, index) => (
                    <TableRow key={index}>
                      {variantTypes.map((type, typeIndex) => (
                        <TableCell key={typeIndex}>
                          {combination[type.name]}
                        </TableCell>
                      ))}
                      <TableCell>{combination.sku}</TableCell>
                      <TableCell>
                        <TextField
                          type="number"
                          size="small"
                          InputProps={{ startAdornment: "$" }}
                          value={combination.price}
                          onChange={(e) => updatePrice(index, e.target.value)}
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          type="number"
                          size="small"
                          value={combination.inventory}
                          onChange={(e) =>
                            updateInventory(index, e.target.value)
                          }
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <Typography variant="body1" sx={{ my: 2 }}>
              No variant combinations yet. Add variant types and options to
              generate combinations.
            </Typography>
          )}
        </AccordionDetails>
      </Accordion>

      {/* Bulk Actions Section */}
      <Box sx={{ mt: 3 }}>
        <Typography variant="h6" gutterBottom>
          Bulk Actions
        </Typography>
        <Box sx={{ display: "flex", gap: 2 }}>
          <TextField
            label="Set price for all variants"
            type="number"
            size="small"
            InputProps={{ startAdornment: "$" }}
          />
          <Button variant="outlined">Apply Price</Button>
          <TextField
            label="Set inventory for all variants"
            type="number"
            size="small"
          />
          <Button variant="outlined">Apply Inventory</Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ProductVariantsManager;
