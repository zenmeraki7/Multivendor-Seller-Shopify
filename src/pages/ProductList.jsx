import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  CircularProgress,
  Alert,
  Pagination,
  Chip,
} from "@mui/material";
import { Search, Refresh, Edit } from "@mui/icons-material";
import axios from "axios"; // Alternatively, use your axiosInstance
import { BASE_URL } from "../utils/baseUrl";
import { useNavigate } from "react-router-dom";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({
    inStock: "",
    price: "",
    isActive: "",
    category: "",
    subcategory: "",
    categoryType: "",
  });

  const [filterOptions, setFilterOptions] = useState({
    categoryTypes: [],
    categories: [],
    subcategories: [],
  });

  const itemsPerPage = 10; // Adjust items per page as needed

  // Fetch products from the API
  const fetchProducts = async (page = 1) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `${BASE_URL}/api/product/all-seller-product`,
        {
          params: {
            page,
            limit: itemsPerPage,
            ...filters, // Spread the filters
          },
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const { data, totalPages } = response.data;
      setProducts(data);
      setFilteredProducts(data);
      setTotalPages(totalPages);
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.message || "Error fetching products");
      setLoading(false);
    }
  };

  // Add function to fetch filter options
  const fetchFilterOptions = async () => {
    try {
      const [categoryTypesRes, categoriesRes, subcategoriesRes] =
        await Promise.all([
          axios.get(`${BASE_URL}/api/category-type/all`, {
            headers: {
              authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }),
          axios.get(`${BASE_URL}/api/category/all`, {
            headers: {
              authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }),
          axios.get(`${BASE_URL}/api/subcategory/all`, {
            headers: {
              authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }),
        ]);

      setFilterOptions({
        categoryTypes: categoryTypesRes.data?.data || [],
        categories: categoriesRes.data?.data || [],
        subcategories: subcategoriesRes.data?.data || [],
      });
    } catch (err) {
      console.error("Error fetching filter options:", err);
    }
  };

  useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage, filters]);

  useEffect(() => {
    fetchFilterOptions();
  }, []);

  // Handle Search
  useEffect(() => {
    if (searchTerm === "") {
      setFilteredProducts(products);
    } else {
      const lowercasedTerm = searchTerm.toLowerCase();
      const filtered = products.filter((product) =>
        product.title.toLowerCase().includes(lowercasedTerm)
      );
      setFilteredProducts(filtered);
    }
  }, [searchTerm, products]);

  // Handle Page Change
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box padding={2}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Box padding={2}>
      {/* Header Section */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h5">Products Management</Typography>
        <Box display="flex" alignItems="center" gap={1}>
          <Typography color="primary">DATA REFRESH</Typography>
          <IconButton color="primary">
            <Refresh />
          </IconButton>
          <Typography fontWeight="bold">
            {new Date().toLocaleString()}
          </Typography>
        </Box>
      </Box>

      {/* Search Bar */}
      <Box display="flex" justifyContent="flex-end" alignItems="center" mb={2}>
        <TextField
          placeholder="Search Product"
          size="small"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Search />
              </InputAdornment>
            ),
          }}
          sx={{ width: "300px" }}
        />
      </Box>

      {/* Filters and Actions */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography>
          Products: <strong>{products.length}</strong> |{" "}
          <Typography
            component="span"
            color="error"
            sx={{ textDecoration: "underline" }}
          >
            Trash: 0
          </Typography>
        </Typography>
        <Box display="flex" gap={1}>
          <Select
            size="small"
            value={filters.inStock}
            onChange={(e) =>
              setFilters({ ...filters, inStock: e.target.value })
            }
            displayEmpty
          >
            <MenuItem value="">
              <em>Stock</em>
            </MenuItem>
            <MenuItem value="true">In Stock</MenuItem>
            <MenuItem value="false">Out of Stock</MenuItem>
          </Select>

          <Select
            size="small"
            value={filters.categoryType}
            onChange={(e) =>
              setFilters({ ...filters, categoryType: e.target.value })
            }
            displayEmpty
          >
            <MenuItem value="">
              <em>Category-Type</em>
            </MenuItem>
            {filterOptions.categoryTypes.map((type) => (
              <MenuItem key={type._id} value={type._id}>
                {type.name}
              </MenuItem>
            ))}
          </Select>

          <Select
            size="small"
            value={filters.category}
            onChange={(e) =>
              setFilters({ ...filters, category: e.target.value })
            }
            displayEmpty
          >
            <MenuItem value="">
              <em>Category</em>
            </MenuItem>
            {filterOptions.categories.map((category) => (
              <MenuItem key={category._id} value={category._id}>
                {category.name}
              </MenuItem>
            ))}
          </Select>

          <Select
            size="small"
            value={filters.subcategory}
            onChange={(e) =>
              setFilters({ ...filters, subcategory: e.target.value })
            }
            displayEmpty
          >
            <MenuItem value="">
              <em>Sub-Category</em>
            </MenuItem>
            {filterOptions.subcategories.map((subcategory) => (
              <MenuItem key={subcategory._id} value={subcategory._id}>
                {subcategory.name}
              </MenuItem>
            ))}
          </Select>

          <Select
            size="small"
            value={filters.isActive}
            onChange={(e) =>
              setFilters({ ...filters, isActive: e.target.value })
            }
            displayEmpty
          >
            <MenuItem value="">
              <em>Status</em>
            </MenuItem>
            <MenuItem value="true">Active</MenuItem>
            <MenuItem value="false">Inactive</MenuItem>
          </Select>

          {/* <Button
            variant="contained"
            color="primary"
            onClick={() => {
              setCurrentPage(1);
              fetchProducts(1);
            }}
          >
            APPLY
          </Button> */}

          <Button
            variant="outlined"
            color="secondary"
            onClick={() => {
              setFilters({
                inStock: "",
                price: "",
                isActive: "",
                category: "",
                subcategory: "",
                categoryType: "",
              });
              setCurrentPage(1);
              fetchProducts(1);
            }}
          >
            CLEAR
          </Button>
        </Box>
      </Box>

      {/* Product Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell sx={{ color: "primary.main" }}>PRODUCT NAME</TableCell>
              <TableCell sx={{ color: "primary.main" }}>STOCK</TableCell>
              <TableCell sx={{ color: "primary.main" }}>PRICE</TableCell>
              <TableCell sx={{ color: "primary.main" }}>
                CATEGORY TYPE
              </TableCell>
              <TableCell sx={{ color: "primary.main" }}>STATUS</TableCell>
              <TableCell sx={{ color: "primary.main" }}>
                LAST MODIFIED
              </TableCell>
              <TableCell sx={{ color: "primary.main" }}>ACTIONS</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Avatar
                      variant="rounded"
                      src={product.thumbnail.url}
                      alt={product.title}
                      sx={{ width: 60, height: 60 }}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/fallback-image.png";
                      }}
                    />
                  </TableCell>
                  <TableCell>{product.title}</TableCell>
                  <TableCell>
                    {product.stock > 0
                      ? `In stock (${product.stock})`
                      : "Out of stock"}
                  </TableCell>
                  <TableCell>₹{product.discountedPrice}</TableCell>
                  <TableCell>
                    {product?.categoryType?.name || "Unavailable"}
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={product.isApproved ? "Approved" : "Pending"}
                      color={product.isApproved ? "success" : "error"}
                      variant="outlined"
                      sx={{
                        fontWeight: "bold",
                        textTransform: "uppercase",
                        borderWidth: 2,
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    {new Date(product.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      color="primary"
                      size="small"
                      onClick={() =>
                        navigate(`/dashboard/view-product/${product._id}`)
                      } // Replace with your logic
                    >
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} style={{ textAlign: "center" }}>
                  No products available.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {/* Pagination */}
      <Box display="flex" justifyContent="center" mt={3}>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>
    </Box>
  );
};

export default ProductList;
