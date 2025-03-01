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
import TableInput from "../components/SharedComponents/TableButton/TableInput";
import TableSelect from "../components/SharedComponents/TableButton/TableSelect";
import TableButton from "../components/SharedComponents/TableButton/TableButton";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchQuery, setSearchQuery] = useState(""); // Separate state for actual search query
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
            search: searchQuery, // Use the committed search term
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
              authorization: ` Bearer ${localStorage.getItem("token")}`,
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
  }, [currentPage, filters, searchQuery]); // Only depend on searchQuery, not searchTerm


  useEffect(() => {
    fetchFilterOptions();
  }, []);

  useEffect(() => {
    fetchFilterOptions();
  }, []);

  // Handle search submission
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchQuery(searchTerm);
    setCurrentPage(1); // Reset to first page when searching
  };

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
      <Box
        display="flex"
        justifyContent="flex-end"
        alignItems="center"
        mb={2}
        width="100%"
        pr={0} // Ensures no extra padding at the right
      >
        <form
          onSubmit={handleSearchSubmit}
          style={{ width: "300px", display: "flex", justifyContent: "flex-end" }}
        >
          <TableInput
            id="search-category"
            name="search"
            placeholder="Search Category Type"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            label="Search"
            type="text"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Search />
                </InputAdornment>
              ),
            }}
            sx={{ width: "100%", marginRight: 0 }} // Ensures no extra space
          />
        </form>
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
          <TableSelect
            id="stock-filter"
            name="Stock"
            value={filters.inStock}
            onChange={(e) =>
              setFilters({ ...filters, inStock: e.target.value })
            }
            displayEmpty
            label="Stock"
            MenuItems={[
              { value: "", label: "All" },
              { value: "true", label: "In Stock" },
              { value: "false", label: "Out of Stock" },
              // { value: "pending", label: "Pending" },
            ]}
          />


          <TableSelect
            id="category-type-filter"
            name="Category Type"
            value={filters.categoryType}
            onChange={(e) =>
              setFilters({ ...filters, categoryType: e.target.value })
            }
            displayEmpty
            label="Category Type"
            MenuItems={[
              { value: "", label: "All" }, // First option as "All"
              ...filterOptions.categoryTypes.map((type) => ({
                value: type._id,
                label: type.name,
              })),
            ]}
          />

          <TableSelect
            id="category-filter"
            name="Category"
            value={filters.category}
            onChange={(e) =>
              setFilters({ ...filters, categoryType: e.target.value })
            }
            displayEmpty
            label="Category "
            MenuItems={[
              { value: "", label: "All" }, // First option as "All"
              ...filterOptions.categories.map((category) => ({
                value: category._id,
                label: category.name,
              })),
            ]}

          />

          <TableSelect
            id="subcategory-filter"
            name="Sub-category"
            value={filters.subcategory}
            onChange={(e) =>
              setFilters({ ...filters, subcategory: e.target.value })
            }
            displayEmpty
            label="Sub-category Type"
            MenuItems={[
              { value: "", label: "All" }, // First option as "All"
              ...filterOptions.subcategories.map((subcategory) => ({
                value: subcategory._id,
                label: subcategory.name,
              })),
            ]}

          />

          <TableSelect
            id="status-filter"
            name="Status"
            value={filters.isActive}
            onChange={(e) =>
              setFilters({ ...filters, isActive: e.target.value })
            }
            displayEmpty
            label="Status"
            MenuItems={[
              { value: "", label: "Status" },
              { value: "true", label: "Active" },
              { value: "false", label: "Inactive" },

            ]}
          />

          

          <TableButton
            variant="outlined"
            onClick={() => {
              setFilters({
                inStock: "",
                price: "",
                isActive: "",
                category: "",
                subcategory: "",
                categoryType: "",
              });
              setSearchTerm("");
              setSearchQuery("");
              setCurrentPage(1);
              fetchProducts(1);
            }}
            style={{ height: "56px" }}
          >
            Clear
          </TableButton>

          
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
              <TableCell sx={{ color: "primary.main" }}>
                CATEGORY
              </TableCell>
              {/* <TableCell sx={{ color: "primary.main" }}>
                SUB-CATEGORY TYPE
              </TableCell> */}
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
                  <TableCell>
                    {product.title.length > 20 ? `${product.title.slice(0, 20)}...` : product.title}
                  </TableCell>
                  <TableCell>
                    {product.stock > 0
                      ? `In stock (${product.stock})`
                      : "Out of stock"}
                  </TableCell>
                  <TableCell>₹{product.discountedPrice}</TableCell>
                  <TableCell>
                    {product?.categoryType?.name || "Unavailable"}
                  </TableCell>
                  <TableCell>{product?.category?.name || "Unavailable"}</TableCell>
                  {/* <TableCell>{product?.subcategory?.name || "Unavailable"}</TableCell> */}
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
                    <TableButton
                      isSmall
                      variant="contained"
                      onClick={() =>
                        navigate(`/dashboard/view-product/${product._id}`)
                      } // Replace with your logic
                    >
                      View
                    </TableButton>
                  </TableCell>


                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} style={{ textAlign: "center" }}>
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