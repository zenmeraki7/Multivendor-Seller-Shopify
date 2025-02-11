import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { 
  DollarSign, 
  Package, 
  ShoppingCart, 
  TrendingUp,
  AlertCircle,
  Users,
  TrendingDown
} from 'lucide-react';
import './Dashboard.css';

// Sample data (same as before)
const salesData = [
  { name: 'Jan', sales: 4000, visitors: 2400 },
  { name: 'Feb', sales: 3000, visitors: 1398 },
  { name: 'Mar', sales: 5000, visitors: 3800 },
  { name: 'Apr', sales: 4500, visitors: 3908 },
  { name: 'May', sales: 6000, visitors: 4800 },
  { name: 'Jun', sales: 5500, visitors: 3800 },
];

const pieData = [
  { name: 'Electronics', value: 400 },
  { name: 'Fashion', value: 300 },
  { name: 'Home', value: 200 },
  { name: 'Books', value: 100 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const recentOrders = [
  { id: '#1234', product: 'Wireless Headphones', status: 'Pending', amount: '$129.99', customer: 'John Doe' },
  { id: '#1235', product: 'Smart Watch', status: 'Shipped', amount: '$199.99', customer: 'Jane Smith' },
  { id: '#1236', product: 'Bluetooth Speaker', status: 'Delivered', amount: '$79.99', customer: 'Mike Johnson' },
];

const topProducts = [
  { name: 'Wireless Headphones', sales: 123, revenue: '$15,990', stock: 45 },
  { name: 'Smart Watch', sales: 98, revenue: '$19,600', stock: 32 },
  { name: 'Bluetooth Speaker', sales: 87, revenue: '$6,960', stock: 56 },
];

const Card = ({ title, children }) => (
  <div className="card">
    {title && <div className="card-header">
      <h2 className="card-title">{title}</h2>
    </div>}
    {children}
  </div>
);

const StatCard = ({ icon, title, value, trend, trendUp }) => (
  <div className="card stat-card">
    <div className="stat-card-header">
      <div className="stat-card-icon">
        {icon}
      </div>
      <div>
        <p className="stat-card-title">{title}</p>
        <h3 className="stat-card-value">{value}</h3>
      </div>
    </div>
    <div className={`stat-card-trend ${trendUp ? 'trend-up' : 'trend-down'}`}>
      {trendUp ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
      <span>{trend}</span>
    </div>
  </div>
);

const Alert = ({ type, message, description }) => (
  <div className={`alert alert-${type}`}>
    <div className="flex items-center">
      <AlertCircle className="w-5 h-5 mr-2" />
      <h4 className="font-medium">{message}</h4>
    </div>
    {description && <p className="mt-1 text-sm">{description}</p>}
  </div>
);

const SellerDashboard = () => {
  const [timeFilter, setTimeFilter] = useState('This Month');

  return (
    <div className="dashboard-container">
      {/* Header Section */}
      <Card>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 className="card-title">Seller Dashboard</h1>
            <p>Welcome back! Here's what's happening with your store today.</p>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {['Today', 'This Week', 'This Month', 'This Year'].map((filter) => (
              <button
                key={filter}
                onClick={() => setTimeFilter(filter)}
                className={`filter-button ${
                  timeFilter === filter ? 'filter-button-active' : 'filter-button-inactive'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </Card>

      {/* Stats Grid */}
      <div className="grid-container grid-cols-4 mt-5">
        <StatCard
          icon={<DollarSign size={24} color="#2563eb" />}
          title="Total Revenue"
          value="$24,560"
          trend="+12.5%"
          trendUp={true}
        />
        <StatCard
          icon={<ShoppingCart size={24} color="#16a34a" />}
          title="Total Orders"
          value="145"
          trend="+8.2%"
          trendUp={true}
        />
        <StatCard
          icon={<Users size={24} color="#ca8a04" />}
          title="Total Customers"
          value="1,245"
          trend="+18.7%"
          trendUp={true}
        />
        <StatCard
          icon={<Package size={24} color="#dc2626" />}
          title="Total Products"
          value="48"
          trend="-2.4%"
          trendUp={false}
        />
      </div>

      {/* Charts Section */}
      <div className="grid-container grid-cols-2">
        <Card title="Sales & Visitors Overview">
          <div className="chart-container">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Line yAxisId="left" type="monotone" dataKey="sales" stroke="#2563eb" strokeWidth={2} />
                <Line yAxisId="right" type="monotone" dataKey="visitors" stroke="#16a34a" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card title="Sales by Category">
          <div className="chart-container">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={150}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Tables Section */}
      <div className="grid-container grid-cols-2">
        <Card title="Recent Orders">
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Product</th>
                  <th>Customer</th>
                  <th>Status</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order.id}>
                    <td>{order.id}</td>
                    <td>{order.product}</td>
                    <td>{order.customer}</td>
                    <td>
                      <span className={`status-badge status-${order.status.toLowerCase()}`}>
                        {order.status}
                      </span>
                    </td>
                    <td>{order.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card title="Top Performing Products">
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Sales</th>
                  <th>Revenue</th>
                  <th>Stock</th>
                </tr>
              </thead>
              <tbody>
                {topProducts.map((product, index) => (
                  <tr key={index}>
                    <td>{product.name}</td>
                    <td>{product.sales}</td>
                    <td>{product.revenue}</td>
                    <td>
                      <span className={`status-badge ${
                        product.stock < 30 ? 'status-pending' : 'status-delivered'
                      }`}>
                        {product.stock}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      {/* Alerts Section */}
      <Card title="Recent Alerts">
        <Alert
          type="warning"
          message="Low Stock Alert"
          description="Product 'Wireless Headphones' is running low on stock (2 items remaining)"
        />
        <Alert
          type="success"
          message="Sales Milestone"
          description="Congratulations! You've reached 1000 sales this month"
        />
        <Alert
          type="info"
          message="New Feature Available"
          description="Try our new analytics dashboard for better insights"
        />
      </Card>
    </div>
  );
};

export default SellerDashboard;