import { Route, Routes } from "react-router-dom";
import Login from '../pages/Login.jsx'
import Navbar from "../components/navbar.jsx";
import Signup from "../pages/user/SignUp.jsx";
import Products from "../pages/user/products.jsx";
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
// import TestGoogleLogin from "../pages/user/TestGoogle.jsx";

const MainLayout = ({ children }) => {
  return (
    <>
      <div className="mb-18">
        <Navbar />
      </div>
      {children}
    </>
  );
};

const UserRoutes=()=>(
<Routes>
    {/* <Route path="/" element={<Home />} /> */}
    <Route path="/login" element={
        <MainLayout>
            <Login />
        </MainLayout>
    } />
    {/* <Route path="/login" element={<Login />} /> */}
    <Route path="/signup" element={
        <MainLayout>
            <Signup />
        </MainLayout>
        } />
    <Route path="/verify-otp/:email" element={
        <MainLayout>
            <VerifyOtp />
        </MainLayout>
        } />
    <Route path="/" element={
        <MainLayout>
            <HomePage />
        </MainLayout>
        } />
    <Route path="/products" element={
        <MainLayout>
            <Products />
        </MainLayout>
        } />
    <Route path="/products/:id/:brand" element={
        <MainLayout>
            <ProductDetails />
        </MainLayout>
        } />
    <Route path="/profile" element={
        <MainLayout>
            <UserProfile />
        </MainLayout>
        } />
    <Route path="/wishlist" element={
        <MainLayout>
            <WishlistScreen />
        </MainLayout>
        } />
    <Route path="/cart" element={
        <MainLayout>
            <CartPage />
        </MainLayout>
        } />
    <Route path="/checkout" element={
        <MainLayout>
            <CheckoutPage />
        </MainLayout>
        } />
    <Route path="/orderSuccess" element={
        <MainLayout>
            <OrderSuccessPage />
        </MainLayout>
        } />
    <Route path="/orderFailed/:orderId" element={
        <MainLayout>
            <OrderFailurePage />
        </MainLayout>
        } />
    <Route path="/orders" element={
        <MainLayout>
            <Orders />
        </MainLayout>
        } />
    <Route path="/wallet" element={
        <MainLayout>
            <WalletPage />
        </MainLayout>
        } />
    <Route path="/forgot-password" element={
        <MainLayout>
            <ForgotPassword />
        </MainLayout>
        } />
</Routes>
)
export default UserRoutes