import "./App.css";
import { Route, Routes } from "react-router-dom";
import Layout from "./layout/Layout";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./routes/PrivateRoute";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import "bootstrap/dist/css/bootstrap.min.css";
import SellerPro from "./pages/SellerProfile/SellerPro";
import ProductList from "./pages/ProductList";
import { Toaster } from "react-hot-toast";
import EditProduct from "./pages/EditProducts/EditProduct";
import AddProduct from "./pages/AddProducts/AddProduct";
import ManageVariants from "./pages/ManageVariants/ManageVariants";
import ManageOffers from "./pages/ManageOffers/ManageOffers";
import OrderDetails from "./pages/OrderDetails";
import Welcome from "./pages/Welcome";
import Footer from "./components/Footer";
import Commission from "./pages/Commission/Commission";
import Privacy from "./pages/Privacy/Privacy";

function App() {
  return (
    <>
      <Toaster />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/"
          element={
            <>
              <Welcome />
              <Footer />
            </>
          }
        />
        {/* Wrap all pages inside Layout to ensure header/footer are present */}
        <Route path="/dashboard" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="orders" element={<OrderDetails />} />
          <Route
            path="add-product"
            element={<PrivateRoute component={<AddProduct />} />}
          />
          <Route
            path="manage-variant/:id/:title"
            element={<PrivateRoute component={<ManageVariants />} />}
          />
          <Route
            path="manage-offers/:id/:title"
            element={<PrivateRoute component={<ManageOffers />} />}
          />
          <Route
            path="view-product/:id"
            element={<PrivateRoute component={<EditProduct />} />}
          />
          <Route path="product-list" element={<ProductList />} />
          <Route
            path="sellers"
            element={<PrivateRoute component={<SellerPro />} />}
          />
          <Route
           path='commission' 
           element={<PrivateRoute component={<Commission/>} />} />
           <Route
           path='privacy'
           element={<PrivateRoute component={<Privacy/>} />}

           />
        </Route>
      </Routes>
    </>
  );
}

export default App;
