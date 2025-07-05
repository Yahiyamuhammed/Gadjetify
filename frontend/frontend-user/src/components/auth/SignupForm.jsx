import React, { useState } from "react";
import Form from "@/components/common/Form";
import { signupSchema } from "@/utils/validation/signupSchema";
import { api } from "@/utils/api";

const SignupForm = () => {
  const [error, setError] = useState("");

  const formFields = [
    {
      name: "name",
      label: "Name",
      type: "text",
      placeholder: "Enter your name",
      required: true,
    },
    {
      name: "email",
      label: "Email",
      type: "email",
      placeholder: "Enter your email",
      required: true,
    },
    {
      name: "phone",
      label: "Phone",
      type: "text",
      placeholder: "Enter your phone number",
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

  const extraLinks = [
    {
      text: "Already have an account?",
      linkText: "Login",
      path: "/login",
    },
  ];

  const handleSignup = async (formData) => {
    try {
      setError("");
      const res = await api.post("/auth/signup", formData);
      console.log("✅ Signup Success:", res.data);

      // Redirect to OTP or next step if needed
      // navigate("/verify-otp");

    } catch (err) {
      console.error("❌ Signup Error:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen pt-20 flex items-center justify-center bg-white">


      <Form
        title="Sign up"
        fields={formFields}
        onSubmit={handleSignup}
        buttonText="Next"
        extraLinks={extraLinks}
        validationRules={signupSchema}
      />
      {error && (
        <p className="text-red-500 text-center mt-2 font-medium">{error}</p>
      )}
    </div>
  );
};

export default SignupForm;
