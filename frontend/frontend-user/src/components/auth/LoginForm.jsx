import React from "react";
import Form from "@/components/common/Form";
import { loginSchema } from "@/utils/validation/loginSchema";

const LoginForm = () => {
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

  const handleLogin = (data) => {
    console.log("Login Data:", data);
    // You can call your backend API here
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
