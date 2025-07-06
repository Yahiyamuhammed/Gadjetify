import { Route, Routes } from "react-router-dom";
import AdminLogin from "../pages/admin/AdminLogin";

const AdminRoutes=()=>(
    <Routes>
        <Route path="/" element={<AdminLogin />}/>
    </Routes>
)

export default AdminRoutes