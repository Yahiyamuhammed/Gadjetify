import React, { useState } from "react";
import Form from "@/components/common/Form";
import { loginSchema } from "@/utils/validation/loginSchema";
import { api } from "@/utils/api";
const LoginForm = () => {
    const [error, setError] = useState("");

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
      setError(""); // reset
      const res = await api.post("/auth/login", formData);
      console.log("Login Success:", res.data);

      

      // optionally store token, redirect user, etc.
      localStorage.setItem("token", res.data.token);
    //   navigate("/dashboard");

    } catch (err) {
      console.error("Login Error:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Login failed");
    }
  };

  const extraLinks = [
    {
      text: "Don't have an account?",
      linkText: "Sign Up",
      path: "/signup",
    },
  ];

  return (
    <Form
      title="Login"
      fields={fields}
      onSubmit={handleLogin}
      buttonText="Log In"
      extraLinks={extraLinks}
      validationRules={loginSchema}
    />
  );
};

export default LoginForm;
