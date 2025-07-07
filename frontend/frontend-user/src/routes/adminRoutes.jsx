import { Route, Routes } from "react-router-dom";
import AdminLogin from "../pages/admin/AdminLogin";
import Sidebar from "../pages/admin/sideBar";
import ProductManagement from "../pages/admin/ProductManagement";
import BrandManagement from "../pages/admin/BrandManagement";
import UserManagement from "../pages/admin/UserManagement";
// import { Sidebar } from "lucide-react";

const AdminLayout = ({ children }) => {
  return (
    <>
      <Sidebar />
      <div className="ms-64 p-0">{children}</div>
    </>
  );
};


const AdminRoutes=()=>(
    <Routes>
        <Route path="/" element={
            <AdminLayout>
                <AdminLogin />

            </AdminLayout>
            }/>
        <Route path="/manage-products" element={
            <AdminLayout>
                <ProductManagement />

            </AdminLayout>
            }/>
        <Route path="/manage-brands" element={
            <AdminLayout>
                <BrandManagement />

            </AdminLayout>
            }/>
        <Route path="/manage-users" element={
            <AdminLayout>
                <UserManagement />

            </AdminLayout>
            }/>
    </Routes>
)

export default AdminRoutes