import { Route, Routes, Navigate } from "react-router-dom";
import Login from "../pages/Login.jsx";
import Navbar from "../components/navbar.jsx";
import Signup from "../pages/user/SignUp.jsx";
import Products from "../pages/user/Products.jsx";
import ProductDetails from "../pages/user/ProductDetails.jsx";
import VerifyOtp from "../pages/user/VerifyOtp.jsx";
import HomePage from "@/pages/user/HomePage.jsx";
import UserProfile from "@/pages/user/UserProfile,.jsx";
import WishlistScreen from "@/pages/user/Wishlist.jsx";
import CartPage from "@/pages/user/CartPage.jsx";
import CheckoutPage from "@/pages/user/CheckoutPage.jsx";
import OrderSuccessPage from "@/pages/user/OrderSuccessPage.jsx";
import Orders from "@/pages/user/Orders.jsx";
import WalletPage from "@/pages/user/WalletPage.jsx";
import OrderFailurePage from "@/pages/user/OrderFailurePage.jsx";
import ForgotPassword from "@/pages/user/ForgotPassword.jsx";
import VerifyResetOtp from "@/pages/user/VerifyResetOtp.jsx";
import ResetPassword from "@/pages/user/ResetPassword.jsx";
import { useAuthUser } from "@/hooks/useAuthUser.js";

const MainLayout = ({ children }) => (
  <>
    <div className="mb-18">
      <Navbar />
    </div>
    {children}
  </>
);

const ProtectedRoute = ({ children, user, loading }) => {
  if (loading) return null;
  if (!user) return <Navigate to="/login" replace />;
  return children;
};

const PublicRoute = ({ children, user, loading }) => {
  if (loading) return null;
  if (user) return <Navigate to="/" replace />;
  return children;
};

const UserRoutes = () => {
  const { data: user, isLoading: userLoading } = useAuthUser();

  return (
    <Routes>
      {/* Public routes */}
      <Route
        path="/login"
        element={
          <PublicRoute user={user} loading={userLoading}>
            <MainLayout>
              <Login />
            </MainLayout>
          </PublicRoute>
        }
      />
      <Route
        path="/signup"
        element={
          <PublicRoute user={user} loading={userLoading}>
            <MainLayout>
              <Signup />
            </MainLayout>
          </PublicRoute>
        }
      />
      <Route
        path="/verify-otp/:email"
        element={
          <PublicRoute user={user} loading={userLoading}>
            <MainLayout>
              <VerifyOtp />
            </MainLayout>
          </PublicRoute>
        }
      />

      {/* Always accessible */}
      <Route
        path="/"
        element={
          <MainLayout>
            <HomePage />
          </MainLayout>
        }
      />
      <Route
        path="/products"
        element={
          <MainLayout>
            <Products />
          </MainLayout>
        }
      />
      <Route
        path="/products/:id/:brand"
        element={
          <MainLayout>
            <ProductDetails />
          </MainLayout>
        }
      />

      {/* Protected routes */}
      <Route
        path="/profile"
        element={
          <ProtectedRoute user={user} loading={userLoading}>
            <MainLayout>
              <UserProfile />
            </MainLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/wishlist"
        element={
          <ProtectedRoute user={user} loading={userLoading}>
            <MainLayout>
              <WishlistScreen />
            </MainLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/cart"
        element={
          <ProtectedRoute user={user} loading={userLoading}>
            <MainLayout>
              <CartPage />
            </MainLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/checkout"
        element={
          <ProtectedRoute user={user} loading={userLoading}>
            <MainLayout>
              <CheckoutPage />
            </MainLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/orderSuccess"
        element={
          <ProtectedRoute user={user} loading={userLoading}>
            <MainLayout>
              <OrderSuccessPage />
            </MainLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/orders"
        element={
          <ProtectedRoute user={user} loading={userLoading}>
            <MainLayout>
              <Orders />
            </MainLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/wallet"
        element={
          <ProtectedRoute user={user} loading={userLoading}>
            <MainLayout>
              <WalletPage />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      {/* Always accessible */}
      <Route
        path="/orderFailed/:orderId"
        element={
          <MainLayout>
            <OrderFailurePage />
          </MainLayout>
        }
      />
      <Route
        path="/forgot-password"
        element={
          <MainLayout>
            <ForgotPassword />
          </MainLayout>
        }
      />
      <Route
        path="/forgot-password-otp"
        element={
          <MainLayout>
            <VerifyResetOtp />
          </MainLayout>
        }
      />
      <Route
        path="/reset-password"
        element={
          <MainLayout>
            <ResetPassword />
          </MainLayout>
        }
      />
    </Routes>
  );
};

export default UserRoutes;
