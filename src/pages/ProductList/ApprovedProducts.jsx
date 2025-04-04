import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  InputAdornment,
  IconButton,
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
import { Search, Refresh, CheckCircle } from "@mui/icons-material";
import axios from "axios"; // Alternatively, use your axiosInstance
import { BASE_URL } from "../../utils/baseUrl";
import { useNavigate } from "react-router-dom";
import TableSelect from "../../components/SharedComponents/TableButton/TableSelect";
import TableInput from "../../components/SharedComponents/TableButton/TableInput";
import TableButton from "../../components/SharedComponents/TableButton/TableButton";

const ApprovedProducts = () => {
  const navigate = useNavigate();

  // Common states
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const [priceRange, setPriceRange] = useState("all");
  const [isShopifyFormat, setIsShopifyFormat] = useState(false);

  const [filters, setFilters] = useState({
    inStock: "",
    categoryType: "",
    category: "",
    subcategory: "",
    isActive: "",
    price: "",
  });

  const [filterOptions, setFilterOptions] = useState({
    categoryTypes: [],
    categories: [],
    subcategories: [],
  });

  const itemsPerPage = 10;

  // Extract filter options from the Shopify data
  const extractFilterOptions = () => {
    // Extract unique product types for category type filter
    const types = [...new Set(products.map(p => 
      isShopifyFormat ? p.node?.productType : p.categoryType?.name).filter(Boolean))];
    const categoryTypes = types.map(type => ({ _id: type, name: type }));
    
    // Extract unique tags for category filter
    const cats = [...new Set(products.map(p => 
      isShopifyFormat ? (p.node?.tags ? p.node?.tags[0] : null) : p.category?.name).filter(Boolean))];
    const categories = cats.map(cat => ({ _id: cat, name: cat }));
    
    setFilterOptions({
      categoryTypes,
      categories,
      subcategories: [], // Not used in this example
    });
  };

  // Fixed price range parsing function
  const getPriceRangeValues = (range) => {
    if (range === "all" || !range)
      return { minPrice: undefined, maxPrice: undefined };
    if (range === "10000+") return { minPrice: "10000", maxPrice: undefined };

    const [min, max] = range.split("-");
    return { minPrice: min, maxPrice: max };
  };

  const fetchApprovedProducts = async (page = 1) => {
    console.log(`Fetching approved products...`);

    setLoading(true);
    setError(null);

    try {
      const { minPrice, maxPrice } = getPriceRangeValues(priceRange);

      const cleanFilters = {};
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== "" && value !== "all") {
          cleanFilters[key] = value;
        }
      });

      const response = await axios.get(
        `${BASE_URL}/api/product/all-seller-approved-products`,
        {
          params: {
            page,
            limit: itemsPerPage,
            ...cleanFilters,
            search: searchQuery,
            minPrice,
            maxPrice,
          },
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          withCredentials: true,
        }
      );

      console.log("API Response:", response.data);

      let productsData = [];
      let totalItemsCount = 0;
      let totalPagesCount = 1;

      if (response.data?.data?.products?.edges) {
        setIsShopifyFormat(true);
        productsData = response.data.data.products.edges.filter(
          (item) => item.node.status === "ACTIVE"
        );
        totalItemsCount = productsData.length;
        totalPagesCount = Math.ceil(totalItemsCount / itemsPerPage);
      } else {
        setIsShopifyFormat(false);
        productsData = (response.data.data || []).filter(
          (item) => item.isActive === true || item.status === "ACTIVE"
        );
        totalItemsCount = productsData.length;
        totalPagesCount = Math.ceil(totalItemsCount / itemsPerPage);
      }

      setProducts(productsData);
      setFilteredProducts(productsData);
      setTotalPages(totalPagesCount);
      setTotalProducts(totalItemsCount);
      setLoading(false);
      
      // Extract filter options
      if (productsData.length > 0) {
        extractFilterOptions();
      }
    } catch (err) {
      console.error("Fetch products error:", err);
      setError(err.response?.data?.message || "Error fetching products");
      setLoading(false);
    }
  };

  // Initial data load
  useEffect(() => {
    fetchApprovedProducts(currentPage);
  }, [currentPage, searchQuery, filters, priceRange]);

  // Apply search 
  useEffect(() => {
    if (searchTerm === "") {
      setFilteredProducts(products);
    } else {
      const lowercasedTerm = searchTerm.toLowerCase();
      const filtered = products.filter((product) => {
        const title = isShopifyFormat ? product.node?.title : product.title;
        const titleMatches = title?.toLowerCase().includes(lowercasedTerm);
        return titleMatches;
      });

      setFilteredProducts(filtered);
    }
  }, [searchTerm, products, isShopifyFormat]);

  const handleSearchSubmit = (e) => {
    if (e) e.preventDefault();
    setSearchQuery(searchTerm);
    setCurrentPage(1);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const applyFilters = () => {
    setCurrentPage(1);
    fetchApprovedProducts(1);
  };

  const clearFilters = () => {
    setFilters({
      inStock: "",
      categoryType: "",
      category: "",
      subcategory: "",
      isActive: "",
      price: "",
    });
    setPriceRange("all");
    setSearchTerm("");
    setSearchQuery("");
    setCurrentPage(1);
    fetchApprovedProducts(1);
  };

  const priceOptions = [
    { value: "all", label: "All Prices" },
    { value: "0-500", label: "0 - 500" },
    { value: "500-1000", label: "500 - 1,000" },
    { value: "1000-5000", label: "1,000 - 5,000" },
    { value: "5000-10000", label: "5,000 - 10,000" },
    { value: "10000+", label: "10,000+" },
  ];

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  // Helper function to extract product data regardless of format
  const getProductData = (product, field) => {
    if (isShopifyFormat) {
      const node = product.node;
      switch (field) {
        case "id":
          return node?.id;
        case "title":
          return node?.title;
        case "imageUrl":
          return node?.featuredMedia?.preview?.image?.url;
        case "totalInventory":
          return node?.totalInventory;
        case "price":
          return node?.variants?.edges?.[0]?.node?.price;
        case "productType":
          return node?.productType;
        case "category":
          return node?.tags ? node?.tags[0] : "Uncategorized";
        case "vendor":
          return node?.metafield?.value || node.vendor;
        case "status":
          return node?.status;
        case "createdAt":
          return node?.createdAt;
        default:
          return null;
      }
    } else {
      switch (field) {
        case "id":
          return product._id || product.id;
        case "title":
          return product.title;
        case "imageUrl":
          return product.images?.[0]?.url || product.image;
        case "totalInventory":
          return product.stock || product.totalInventory;
        case "price":
          return product.discountedPrice || product.price;
        case "productType":
          return product.categoryType?.name || product.productType;
        case "category":
          return product.category?.name || "Uncategorized";
        case "vendor":
          return product.vendor?.companyName || product.vendor;
        case "status":
          return product.isApproved || product.isActive ? "ACTIVE" : "INACTIVE";
        case "createdAt":
          return product.createdAt;
        default:
          return null;
      }
    }
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

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalProducts);

  return (
    <Box padding={2}>
      {/* Enhanced Header with Gradient Background */}
      <Paper elevation={2} sx={{ p: 2, mb: 3, borderRadius: '8px', background: 'linear-gradient(145deg, #ffffff, #f5f5f5)' }}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box display="flex" alignItems="center">
            <CheckCircle color="success" sx={{ mr: 1, fontSize: 28 }} />
            <Typography variant="h5" sx={{ fontWeight: 600, color: '#2c3e50' }}>
              Approved Products
            </Typography>
          </Box>
          <Box display="flex" alignItems="center" gap={1}>
            <Chip
              label={`Total: ${totalProducts}`}
              color="success"
              variant="outlined"
              sx={{ fontWeight: 'bold', mr: 1 }}
            />
            <IconButton
              color="primary"
              onClick={() => fetchApprovedProducts(currentPage)}
              sx={{
                backgroundColor: 'rgba(25, 118, 210, 0.08)',
                transition: 'all 0.3s',
                '&:hover': {
                  backgroundColor: 'rgba(25, 118, 210, 0.12)',
                }
              }}
            >
              <Refresh />
            </IconButton>
            <Typography fontWeight="bold" sx={{ ml: 1, color: '#546e7a' }}>
              {new Date().toLocaleString()}
            </Typography>
          </Box>
        </Box>
      </Paper>

      {/* Search Bar */}
      <Box display="flex" justifyContent="flex-end" alignItems="center" mb={2}>
        <form onSubmit={handleSearchSubmit} style={{ width: "215px" }}>
          <TableInput
            id="search-product"
            name="searchTerm"
            placeholder="Search Product"
            value={searchTerm}
            onChange={handleSearchChange}
            label="Search"
            type="text"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton type="submit">
                    <Search />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{ width: "100%" }}
          />
        </form>
      </Box>

      {/* Filters and Summary Section */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography>
          Showing:{" "}
          <strong>{totalProducts > 0 ? `${startItem}-${endItem}` : "0"}</strong>
          |{" "}
          <Typography component="span" sx={{ fontWeight: "medium" }}>
            Total Products: <strong>{totalProducts}</strong>
          </Typography>
        </Typography>
        <Box display="flex" gap={1}>
          <TableSelect
            id="stock-filter"
            name="inStock"
            value={filters.inStock}
            onChange={(e) =>
              setFilters({ ...filters, inStock: e.target.value })
            }
            label="Stock"
            MenuItems={[
              { value: "", label: "All" },
              { value: "true", label: "In Stock" },
              { value: "false", label: "Out of Stock" },
            ]}
          />
          <TableSelect
            id="product-category-filter"
            name="categoryType"
            value={filters.categoryType}
            onChange={(e) =>
              setFilters({ ...filters, categoryType: e.target.value })
            }
            label="Category-Type"
            MenuItems={[
              { value: "", label: "All" },
              ...filterOptions.categoryTypes.map((type) => ({
                value: type._id,
                label: type.name,
              })),
            ]}
          />
          <TableSelect
            id="price-range-filter"
            name="priceRange"
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
            label="Price"
            MenuItems={priceOptions.map((option) => ({
              value: option.value,
              label: option.label,
            }))}
          />
          <TableSelect
            id="status-filter"
            name="isActive"
            value={filters.isActive}
            onChange={(e) =>
              setFilters({ ...filters, isActive: e.target.value })
            }
            label="Status"
            MenuItems={[
              { value: "", label: "All" },
              { value: "false", label: "Pending" },
              { value: "true", label: "Approved" },
            ]}
          />
          <TableButton
            variant="contained"
            color="primary"
            onClick={applyFilters}
            sx={{
              borderRadius: '8px',
              boxShadow: '0 4px 10px rgba(25, 118, 210, 0.25)',
              transition: 'all 0.3s',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 6px 15px rgba(25, 118, 210, 0.35)',
              }
            }}
          >
            APPLY
          </TableButton>
          <TableButton
            variant="outlined"
            color="secondary"
            onClick={clearFilters}
            sx={{
              borderRadius: '8px',
              borderWidth: '2px',
              transition: 'all 0.3s',
              '&:hover': {
                borderWidth: '2px',
                backgroundColor: 'rgba(156, 39, 176, 0.04)'
              }
            }}
          >
            CLEAR
          </TableButton>
          <TableButton
            variant="contained"
            color="primary"
            sx={{
              borderRadius: '8px',
              boxShadow: '0 4px 10px rgba(25, 118, 210, 0.25)',
              transition: 'all 0.3s',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 6px 15px rgba(25, 118, 210, 0.35)',
              }
            }}
          >
            EXPORT
          </TableButton>
        </Box>
      </Box>

      {/* Products Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "primary.main" }}>
              <TableCell></TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                PRODUCT NAME
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                STOCK
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                PRICE
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                TYPE
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                CATEGORY
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                STATUS
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                CREATED AT
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                ACTIONS
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredProducts.length > 0 ? (
              filteredProducts
                .map((product, index) => {
                  const status = getProductData(product, "status");
                  if (status !== "ACTIVE") {
                    return null; 
                  }

                  return (
                    <TableRow key={getProductData(product, "id") || index}>
                      <TableCell>
                        <Avatar
                          variant="rounded"
                          src={
                            getProductData(product, "imageUrl") ||
                            "/placeholder-image.jpg"
                          }
                          alt={getProductData(product, "title")}
                          sx={{ width: 60, height: 60 }}
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "/fallback-image.png";
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        {(() => {
                          const title = getProductData(product, "title");
                          return title && title.length > 20
                            ? `${title.slice(0, 20)}...`
                            : title || "Untitled";
                        })()}
                      </TableCell>
                      <TableCell>
                        {(() => {
                          const inventory = getProductData(
                            product,
                            "totalInventory"
                          );
                          return inventory > 0
                            ? `In stock (${inventory})`
                            : "Out of stock";
                        })()}
                      </TableCell>
                      <TableCell>
                        ₹{getProductData(product, "price") || "N/A"}
                      </TableCell>
                      <TableCell>
                        {getProductData(product, "productType") ||
                          "Unavailable"}
                      </TableCell>
                      <TableCell>
                        {getProductData(product, "category") || "Unavailable"}
                      </TableCell>
                      <TableCell>
                        <Chip
                          label="ACTIVE"
                          color="success"
                          sx={{
                            fontWeight: "bold",
                            textTransform: "uppercase",
                            borderWidth: 2,
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        {(() => {
                          const date = getProductData(product, "createdAt");
                          return date
                            ? new Date(date).toLocaleDateString()
                            : "N/A";
                        })()}
                      </TableCell>
                      <TableCell>
                        <TableButton
                          isSmall
                          variant="contained"
                          color="primary"
                          onClick={() =>
                            navigate(
                              `/dashboard/view-approved-products/${product.node.id?.split("/")?.pop()}`
                            )
                          }
                        >
                          View
                        </TableButton>
                      </TableCell>
                    </TableRow>
                  );
                })
                .filter((item) => item !== null)
            ) : (
              <TableRow>
                <TableCell colSpan={9} style={{ textAlign: "center" }}>
                  No products available.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Enhanced Pagination */}
      <Box display="flex" justifyContent="center" mt={4} mb={2}>
        <Paper elevation={2} sx={{ borderRadius: '30px', padding: '8px 16px', display: 'inline-block' }}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
            size="large"
            showFirstButton
            showLastButton
            sx={{
              '& .MuiPaginationItem-root': {
                fontWeight: 'bold',
                mx: 0.5
              }
            }}
          />
        </Paper>
      </Box>
    </Box>
  );
};

export default ApprovedProducts;