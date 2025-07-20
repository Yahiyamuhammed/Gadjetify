import React, { useState } from "react";
import Form from "@/components/common/Form";
import { loginSchema } from "@/utils/validation/loginSchema";
import { api } from "@/utils/api";
import { useNavigate } from "react-router-dom";

import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import SpinningButton from "@/components/SpinningButton";
// import { useGoogleLogin } from '@react-oauth/google';
import { FcGoogle } from "react-icons/fc"; 
import { useQueryClient } from "@tanstack/react-query";

import { googleAuth } from "@/hooks/mutations/useGoogleAuthMutation";
// import { useQueryClient } from "@tanstack/react-query";


const Login = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
    const queryClient = useQueryClient();


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
      toast.success("Login Success:", res.data);

      localStorage.setItem("token", res.data.token);
      queryClient.invalidateQueries(['auth-user'])
      navigate("/products");
    } catch (err) {
      toast.error("Login Error:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Login failed");
    }
  };

  const newGoogleLogin = useGoogleLogin({
    onSuccess: async (response) => {
      console.log("Google token:", response);
      setLoading(true);
      googleLogin(response.access_token, {
        onSuccess: (res) => {
          toast.success(res.message || "Google login successful"),
          queryClient.invalidateQueries(['auth-user'])
            setLoading(false);

        },
        onError: (err) => {
          toast.error(err?.response?.data?.message || "Google login failed on mutate"),
            setLoading(false);
            queryClient.invalidateQueries(['auth-user'])
          setHasError(true);
        },
      });
    },
    onError: (error) => {
      console.error("Google Login Failed", error);
      toast.error("Google login failed");
      setHasError(true);
    },
  });

  const extraLinks = [
    {
      text: "Don't have an account?",
      linkText: "Sign Up",
      path: "/signup",
    },
  ];

  return (

    <div className="flex flex-col justify-center items-center h-screen bg-white px-4">
      <div className="w-full max-w-xl space-y-4">
        {" "}
        {/* shared container */}
        <Form
          title="Login"
          fields={fields}
          onSubmit={handleLogin}
          buttonText="Log In"
          extraLinks={extraLinks}
          validationRules={loginSchema}
          serverError={error}
        />
        <SpinningButton
          icon={FcGoogle}
          onClick={() => {
            setHasError(false);
            setLoading(true);
            newGoogleLogin();
          }}
          variant="outline"
          size="lg"
          className="max-w-lg mx-auto w-full h-14"
          loading={loading}
          hasError={hasError}
        >
          Sign in with Google
        </SpinningButton>
      </div>

    </div>
  );
};

export default Login;
