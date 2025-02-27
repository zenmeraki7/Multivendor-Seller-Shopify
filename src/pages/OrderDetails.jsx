import React, { useState } from "react";
import {
  Search,
  Download,
  Refresh,
} from "@mui/icons-material";
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  TextField,
  Box,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Pagination,
  InputAdornment,
} from "@mui/material";
import TableInput from "../components/SharedComponents/TableButton/TableInput";
import TableButton from "../components/SharedComponents/TableButton/TableButton";
import TableSelect from "../components/SharedComponents/TableButton/TableSelect";
function OrderDetails() {
  const [orders, setOrders] = useState([
    {
      orderId: "12345",
      productName: "Product A",
      productImage: "https://via.placeholder.com/50",
      category: "Electronics",
      regularPrice: 250,
      salePrice: 230,
      finalAmount: 180,
      status: "Shipped",
      paymentStatus: "Completed",
      shipmentStatus: "Delivered",
      delivery: "15/12/2024",
      orderedAt: "12/12/2024",
      user: { fullName: "John Smith" },
    },
    {
      orderId: "12346",
      productName: "Product B",
      productImage: "https://via.placeholder.com/50",
      category: "Clothing",
      regularPrice: 100,
      salePrice: 90,
      finalAmount: 85,
      status: "Pending",
      paymentStatus: "Pending",
      shipmentStatus: "Pending",
      delivery: "16/12/2024",
      orderedAt: "13/12/2024",
      user: { fullName: "Emma Wilson" },
    },
  ]);

  const summary = {
    ordered: 28,
    confirmed: 3,
    canceled: 16,
    completed: 2,
  };

  const [filters, setFilters] = useState({
    order: "",
    payment: "",
    shipment: "",
  });

  const handleFilterChange = (setter) => (event) => {
    setter(event.target.value);
    setPage(1); // Reset to first page on filter change
  };

  const handleApplyFilters = () => {
    const filteredOrders = orders.filter((order) => {
      return (
        (filters.order ? order.status === filters.order : true) &&
        (filters.payment ? order.paymentStatus === filters.payment : true) &&
        (filters.shipment ? order.shipmentStatus === filters.shipment : true)
      );
    });
    setOrders(filteredOrders);
  };

  const handleExport = () => {
    console.log("Exporting data...");
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("");
  const [payment, setPayment] = useState("");
  const [shipments, setShipments] = useState("");

  const itemsPerPage = 5; // Number of orders per page

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedOrders = orders.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div style={{ padding: "20px", maxWidth: "1200px", margin: "auto" }}>
      {/* Header Section */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 2,
        }}
      >
        <Typography variant="h4" component="h1">
          Order Management
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Typography
            variant="body1"
            color="primary"
            sx={{ display: "flex", alignItems: "center" }}
          >
            DATA REFRESH
            <Refresh sx={{ ml: 1, cursor: "pointer" }} />
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ ml: 2 }}>
            01/01/2025, 14:40:50 pm
          </Typography>
        </Box>
      </Box>

      {/* Summary Cards Section */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 3,
        }}
      >
        <Card sx={{ flex: 1, marginRight: 2, backgroundColor: "#e3f2fd" }}>
          <CardContent>
            <Typography variant="subtitle1">Ordered</Typography>
            <Typography variant="h4">{summary.ordered}</Typography>
          </CardContent>
        </Card>
        <Card sx={{ flex: 1, marginRight: 2, backgroundColor: "#d4edda" }}>
          <CardContent>
            <Typography variant="subtitle1">Orders Confirmed</Typography>
            <Typography variant="h4">{summary.confirmed}</Typography>
          </CardContent>
        </Card>
        <Card sx={{ flex: 1, marginRight: 2, backgroundColor: "#f8d7da" }}>
          <CardContent>
            <Typography variant="subtitle1">Orders Canceled</Typography>
            <Typography variant="h4">{summary.canceled}</Typography>
          </CardContent>
        </Card>
        <Card sx={{ flex: 1, backgroundColor: "#cce5ff" }}>
          <CardContent>
            <Typography variant="subtitle1">Orders Completed</Typography>
            <Typography variant="h4">{summary.completed}</Typography>
          </CardContent>
        </Card>
      </Box>

      {/* Filters and Table Section */}
      <Card>
        <CardHeader
          action={
            <Box sx={{ display: "flex", gap: 1 }}>

              <TableButton
                variant="outlined"
                onClick={handleExport}
                startIcon={<Download />}
                style={{ height: "56px", marginRight: 50 }}
              >
                Export
              </TableButton>

              {/* <Button
                variant="outlined"
                startIcon={<Download />}
                onClick={handleExport}
                sx={{ width: 150, marginRight: 50 }}
              >
                Export
              </Button> */}


              <TableSelect
                id="order-filter"
                name="Orders"
                value={filter}
                onChange={handleFilterChange(setFilter)}
                label="Orders"
                MenuItems={[
                  { value: "all", label: "All" },
                  { value: "shipped", label: "Shipped" },
                  { value: "pending", label: "Pending" },
                ]}
              />

              <TableSelect
                id="payment-filter"
                name="Payment"
                value={payment}
                onChange={handleFilterChange(setPayment)}
                label="Payment"
                MenuItems={[
                  { value: "all", label: "All" },
                  { value: "completed", label: "Completed" },
                  { value: "pending", label: "Pending" },
                ]}
              />

              <TableSelect
                id="shipments-filter"
                name="Shipments"
                value={shipments}
                onChange={handleFilterChange(setShipments)}
                label="Shipments"
                MenuItems={[
                  { value: "all", label: "All" },
                  { value: "delivered", label: "Delivered" },
                  { value: "pending", label: "Pending" },
                ]}
              />



              

              <TableButton
                variant="outlined"
                onClick={handleApplyFilters}
                style={{ height: "56px" }}
              >
                Apply
              </TableButton>



              <TableButton
                variant="outlined"
                onClick={() =>
                  setFilters({
                    order: "",
                    payment: "",
                    shipment: "",
                  })
                }
                style={{ height: "56px" }}
              >
                Clear
              </TableButton>



            </Box>
          }
        />
        <CardContent>
          {/* Search Bar */}
          <Box sx={{ display: "flex", gap: 2, marginBottom: 2, width: "400px" }}>
            <Box sx={{ position: "relative", flex: 1 }}>
              <TableInput
                id="search-category"
                name="search"
                placeholder="Search Category Type"
                value={searchTerm}
                onChange={handleSearch}
                label="Search"
                type="text"
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
          </Box>

          {/* Orders Table */}
          <TableContainer sx={{ marginTop: '40px' }}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: "primary.main" }}>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>Product</TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>User</TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>Category</TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>Price</TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>Order Delivery</TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>Order Date</TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>Order Status</TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedOrders.map((order, index) => (
                  <TableRow key={index}>
                    {/* Product Column */}
                    <TableCell>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <img
                          src={order.productImage}
                          alt={order.productName}
                          style={{ width: 50, height: 50, marginRight: 10 }}
                        />
                        <Typography variant="subtitle1" fontWeight="bold">
                          {order.productName}
                        </Typography>
                      </Box>
                    </TableCell>

                    {/* User Column */}
                    <TableCell>
                      <Typography variant="subtitle2" fontWeight="medium">
                        {order.user.fullName}
                      </Typography>
                    </TableCell>

                    {/* Category Column */}
                    <TableCell>{order.category}</TableCell>

                    {/* Price Column */}
                    <TableCell>${order.finalAmount}</TableCell>

                    {/* Order Delivery Column */}
                    <TableCell>{order.delivery}</TableCell>

                    {/* Order Date Column */}
                    <TableCell>{order.orderedAt}</TableCell>

                    {/* Order Status Column */}
                    <TableCell>
                      <Typography
                        sx={{
                          padding: "4px 8px",
                          borderRadius: "4px",
                          backgroundColor:
                            order.status === "Canceled"
                              ? "#f8d7da"
                              : order.status === "Shipped"
                                ? "#d1ecf1"
                                : "#ffeeba",
                          color:
                            order.status === "Canceled"
                              ? "#721c24"
                              : order.status === "Shipped"
                                ? "#0c5460"
                                : "#856404",
                        }}
                      >
                        {order.status}
                      </Typography>
                    </TableCell>

                    {/* Action Column */}
                    <TableButton 
                        isSmall
                          variant="contained"
                          onClick={() =>
                            handleView(vendor.isVerified, vendor._id)
                          }
                        >
                          View
                        </TableButton>
                    {/* <TableCell>
                      <Button variant="contained" color="primary">
                        View
                      </Button>
                    </TableCell> */}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          {/* Pagination */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              marginTop: 3,
            }}
          >
            <Pagination
              count={Math.ceil(orders.length / itemsPerPage)}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
            />
          </Box>
        </CardContent>
      </Card>
    </div>
  );
}

export default OrderDetails;
