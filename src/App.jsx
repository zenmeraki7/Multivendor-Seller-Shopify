import "./App.css";
import { Route, Routes } from "react-router-dom";
import Layout from "./layout/Layout";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./routes/PrivateRoute";
import Login from "./pages/Auth/Login/Login";
import Register from "./pages/Auth/Register/Register";
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
import ForgotPassword from "./pages/Auth/ForgotPassword";
import ResetPassword from "./pages/Auth/ResetPassword";
import TransactionPage from "./pages/Transaction/transaction";
import ReviewPage from "./pages/Review/Review";
import Verification from "./pages/Verification/Verification";
import PaymentDetails from "./pages/Payment/PaymentDetails";
import MerchantNotification from "./pages/MerchantNotifications/MerchantNotification";
import Feedback from "./pages/Feedback/Feedback";
import Subscription from "./pages/Subscription/Subcription";
import AddShopifyProduct from "./pages/AddShopifyProduct";
import Pending from "./pages/Pending";
import AuthRoutes from "./routes/AuthRoutes";
function App() {
  return (
    <>
      <Toaster />
      <Routes>
        <Route path="/auth/:shop">
          <Route path="login" element={<AuthRoutes component={<Login />} />} />
          <Route
            path="register"
            element={<AuthRoutes component={<Register />} />}
          />

          <Route
            path="verification"
            element={
              <PrivateRoute
                component={<AuthRoutes component={<Verification />} />}
              />
            }
          />
          <Route
            path="forgot-password"
            element={<AuthRoutes component={<ForgotPassword />} />}
          />
          <Route
            path="reset-password/:token"
            element={<AuthRoutes component={<ResetPassword />} />}
          />
        </Route>
        <Route
          path="/:shop"
          element={
            <>
              <Welcome />
              <Footer />
            </>
          }
        />
        <Route
          path="/dashboard"
          element={<PrivateRoute component={<Layout />} />}
        >
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
          {/* <Route path="pending" element={<Pending />} /> */}
          <Route
            path="sellers"
            element={<PrivateRoute component={<SellerPro />} />}
          />
          <Route
            path="commission"
            element={<PrivateRoute component={<Commission />} />}
          />
          <Route
            path="privacy"
            element={<PrivateRoute component={<Privacy />} />}
          />
          <Route
            path="subscription"
            element={<PrivateRoute component={<Subscription />} />}
          />
          <Route
            path="transaction"
            element={<PrivateRoute component={<TransactionPage />} />}
          />
          <Route
            path="review"
            element={<PrivateRoute component={<ReviewPage />} />}
          />
          <Route path="payment" element={<PaymentDetails />} />
          <Route
            path="merchant-notification"
            element={<MerchantNotification />}
          />
          <Route path="feedback" element={<Feedback />} />
          <Route path="pending" element={<Pending />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
