import React, { useState } from "react";
import Form from "@/components/common/Form";
import { loginSchema } from "@/utils/validation/loginSchema";
import { api } from "@/utils/api";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import {jwtDecode} from 'jwt-decode';
import {googleAuth } from "@/hooks/mutations/useGoogleAuthMutation"
import toast from 'react-hot-toast';



const Login = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const{mutate:googleLogin, error:onErr} =googleAuth()

  console.log(window.location.origin);

  const fields = [
    {
      name: "email",
      label: "Email",
      type: "email",
      placeholder: "Enter your email",
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
      setError("");
      const res = await api.post("/auth/login", formData);
      console.log("Login Success:", res.data);

      localStorage.setItem("token", res.data.token);
      navigate("/products");
    } catch (err) {
      console.error("Login Error:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Login failed");
    }
  };

  const handleGoogleLogin=(data)=>{
    googleLogin(data.credential,{
      onSuccess:res=>toast.success(res.message || 'Google login successful'),
      onError:err=>toast.error(err?.response?.data?.message || 'Google login failed')

    })
  }

  const extraLinks = [
    {
      text: "Don't have an account?",
      linkText: "Sign Up",
      path: "/signup",
    },
  ];

  return (
    <div className="flex justify-center items-center h-screen bg-white">
      <Form
        title="Login"
        fields={fields}
        onSubmit={handleLogin}
        buttonText="Log In"
        extraLinks={extraLinks}
        validationRules={loginSchema}
        serverError={error}
      />
      <button >login with google</button>
      <GoogleLogin
      
        onSuccess={handleGoogleLogin}
        onError={(err)=> console.log('login failed')}
          
      />
    </div>
  );
};

export default Login;
