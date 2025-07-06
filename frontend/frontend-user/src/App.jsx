// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Routes, Route } from "react-router-dom";

import Login from "@/pages/Login";
import SignUp from "@/pages/user/SignUp";
import VerifyOtp from "@/pages/user/VerifyOtp";
import UserRoutes from "./routes/userRoutes"
import AdminRoutes from "./routes/adminRoutes";



function App() {
  return (
    
   
      <Routes>
        {/* <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/verify-otp/:email" element={<VerifyOtp />} />. */}

        <Route path="/*" element={<UserRoutes />} />
        <Route path="/admin/*" element={<AdminRoutes />} />

        {/* Add signup, homepage, etc. later */}
      </Routes>
       
   
  );
}

export default App;
