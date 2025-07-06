// src/pages/admin/AdminLogin.jsx
import React, { useState } from "react";
import Form from "@/components/common/Form";
import { adminLoginSchema } from "@/utils/validation/adminLoginSchema";
import { api } from "@/utils/api"; // Your axios instance
import { useNavigate } from "react-router-dom";
// import {} from "../hooks/mutation/useAdminMutation"
import { useAdminLogin } from "@/hooks/mutations/useAdminMutations";

const AdminLogin = () => {
    const {mutate,ispending,error}=useAdminLogin()
//   const [error, setError] = useState("");
  const navigate = useNavigate();

  const fields = [
    {
      name: "email",
      label: "Admin Email",
      type: "email",
      placeholder: "Enter your admin email",
      required: true,
    },
    {
      name: "password",
      label: "Password",
      type: "password",
      placeholder: "Enter your password",
      required: true,
    },
  ];

  const handleLogin = async (formData) => {
    try {
     mutate(formData, {
      onSuccess: (data) => {
        console.log("Admin Login Success:", data);
        localStorage.setItem("adminToken", data.token);
        navigate("/admin/dashboard");
      }
    })
    //   console.log(" Admin Login Success:", res.data);


    } catch (err) {
      console.error("Admin Login Error:", err.response?.data || err.message);
     

    }
  };

  const errorMessage =
    error?.response?.data?.message || error?.message || "";

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Form
        title="Admin Login"
        fields={fields}
        onSubmit={handleLogin}
        buttonText="Log In"
        validationRules={adminLoginSchema}
        serverError={errorMessage}
      />
    </div>
  );
};

export default AdminLogin;
