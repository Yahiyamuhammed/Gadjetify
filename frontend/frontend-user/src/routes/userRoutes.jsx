import { Route, Routes } from "react-router-dom";
import Login from '../pages/Login.jsx'
import Navbar from "../components/navbar.jsx";
import Signup from "../pages/Signup.jsx";
import Products from "../pages/user/products.jsx";

const MainLayout = ({ children }) => {
  return (
    <>
      <div className="">
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
    <Route path="/" element={
        <MainLayout>
            <Signup />
        </MainLayout>
        } />
    <Route path="/products" element={
        <MainLayout>
            <Products />
        </MainLayout>
        } />
</Routes>
)
export default UserRoutes