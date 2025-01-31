import React, { useState } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import PaymentIcon from "@mui/icons-material/Payment";
import WidgetsIcon from "@mui/icons-material/Widgets";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  Paper,
  Box,
} from "@mui/material";
import "./Dashboard.css";
// Data for Recharts chart
const popularProducts = [
  {
    name: "CHANELL GABRIELLE SPRAY",
    img: "https://m.media-amazon.com/images/I/61t+UHcrOrL._SX522_.jpg",
    earnings: "$5461",
  },
  {
    name: "Canon EOS R50",
    img: "https://m.media-amazon.com/images/I/81LskAU5h1L._AC_UL480_FMwebp_QL65_.jpg",
    earnings: "$5461",
  },
  {
    name: "Apple iPad Air 11",
    img: "https://m.media-amazon.com/images/I/71qlYpwQTxL._SX679_.jpg",
    earnings: "$5461",
  },
  {
    name: "Blaupunkt Atomik PS30",
    img: "https://m.media-amazon.com/images/I/41Fz1tPJkHL._SX300_SY300_QL70_FMwebp_.jpg",
    earnings: "$5461",
  },
];

// Data for Recharts chart
const rechartsData = [
  { name: "January", uv: 4000, pv: 2400, amt: 2400, year: "2023" },
  { name: "February", uv: 3000, pv: 1398, amt: 2210, year: "2023" },
  { name: "March", uv: 2000, pv: 9800, amt: 2290, year: "2023" },
  { name: "April", uv: 2780, pv: 3908, amt: 2000, year: "2023" },
  { name: "May", uv: 1890, pv: 4800, amt: 2181, year: "2023" },
  { name: "June", uv: 2390, pv: 3800, amt: 2500, year: "2023" },
  { name: "July", uv: 3490, pv: 4300, amt: 2100, year: "2023" },
  { name: "August", uv: 2000, pv: 4300, amt: 2100, year: "2023" },
  { name: "September", uv: 2500, pv: 4300, amt: 2100, year: "2023" },
  { name: "October", uv: 2100, pv: 4300, amt: 2100, year: "2023" },
  { name: "November", uv: 1500, pv: 4300, amt: 2100, year: "2023" },
  { name: "December", uv: 1234, pv: 4300, amt: 2100, year: "2023" },
];

const Dashboard = () => {
  const [selectedMonth, setSelectedMonth] = useState("");

  // Filter data based on selected month
  const filteredData = rechartsData.filter(
    (data) => data.name === selectedMonth
  )[0];

  const [selectedYear, setSelectedYear] = useState("2023");

  // Filter data based on selected year
  const filteredChartData = rechartsData.filter(
    (data) => data.year === selectedYear
  );
  return (
    <div className="container py-5">
      <Grid container spacing={3} mb={2}>
        {/* Left Section */}
        <Grid item xs={12} md={7.5}>
          {/* Dropdown */}
          <Card sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6">View Monthly Data</Typography>
            <FormControl fullWidth sx={{ mt: 2 }}>
              <InputLabel>Select a month</InputLabel>
              <Select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
              >
                {rechartsData.map((data) => (
                  <MenuItem key={data.name} value={data.name}>
                    {data.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Card>

          {/* Stats Cards */}
          <Grid container spacing={2}>
            {[
              {
                title: "Total Revenue",
                value: filteredData?.uv || "0",
                icon: <MonetizationOnIcon fontSize="large" color="primary" />,
                change: "+12% vs previous 28 days",
                changeColor: "success.main",
              },
              {
                title: "Total Visitors",
                value: filteredData?.pv || "0",
                icon: <Diversity3Icon fontSize="large" color="error" />,
                change: "+4% vs previous 28 days",
                changeColor: "success.main",
              },
              {
                title: "Total Transactions",
                value: filteredData?.amt || "0",
                icon: <PaymentIcon size={30} color="green" />,
                change: "-0.89% vs previous 28 days",
                changeColor: "error.main",
              },
              {
                title: "Total Product",
                value: filteredData?.amt || "0",
                icon: <WidgetsIcon size={30} color="blue" />,
                change: "+2% vs previous 28 days",
                changeColor: "success.main",
              },
            ].map((item, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <Card sx={{ textAlign: "center", p: 3, boxShadow: 3 }}>
                  {item.icon}
                  <Typography variant="body2" color="text.secondary" mt={1}>
                    {item.title}
                  </Typography>
                  <Typography variant="h4" fontWeight="bold">
                    {item.value}
                  </Typography>
                  <Typography variant="caption" color={item.changeColor}>
                    {item.change}
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>

        {/* Right Section - Popular Products */}
        <Grid item xs={12} md={4.5}>
          <Card sx={{ height: "100%", p: 3, boxShadow: 3 }}>
            <Typography variant="h5" gutterBottom>
              Popular Products
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Product</TableCell>
                    <TableCell align="right">Earnings</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {popularProducts.map((product, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <Grid container alignItems="center" spacing={2}>
                          <Grid item>
                            <Avatar
                              src={product.img}
                              sx={{ width: 40, height: 40 }}
                            />
                          </Grid>
                          <Grid item>
                            <Typography variant="body1">
                              {product.name.slice(0, 15)}
                            </Typography>
                          </Grid>
                        </Grid>
                      </TableCell>
                      <TableCell align="right">{product.earnings}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Card>
        </Grid>
      </Grid>

      {/* Recharts Section */}
      <Box sx={{ mb: 4 }}>
        <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
          <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
            Yearly Data Overview (2023)
          </Typography>

          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={rechartsData} barSize={20}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis
                dataKey="name"
                tick={{ fontSize: 14 }}
                angle={-45}
                textAnchor="end"
                height={60}
              />
              <YAxis tick={{ fontSize: 14 }} />
              <Tooltip
                contentStyle={{
                  background: "#ffffff",
                  borderRadius: "8px",
                  border: "1px solid #ddd",
                  padding: "10px",
                }}
              />
              <Legend />
              <Bar
                dataKey="uv"
                fill="url(#colorUv)"
                name="Total Orders"
                radius={[8, 8, 0, 0]}
              />
              <Bar
                dataKey="pv"
                fill="url(#colorPv)"
                name="Cancelled Orders"
                radius={[8, 8, 0, 0]}
              />

              {/* Gradient Colors */}
              <defs>
                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4C8BF5" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#4C8BF5" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#E57373" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#E57373" stopOpacity={0} />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </Paper>
      </Box>
    </div>
  );
};

export default Dashboard;
