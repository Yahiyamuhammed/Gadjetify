import { Route, Routes } from "react-router-dom";
import AdminLogin from "../pages/admin/AdminLogin";
import Sidebar from "../pages/admin/sideBar";
import ProductManagement from "../pages/admin/ProductManagement";
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
    </Routes>
)

export default AdminRoutes