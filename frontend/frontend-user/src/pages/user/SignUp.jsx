import React, { useState } from "react";
import Form from "@/components/common/Form";
import { signupSchema } from "@/utils/validation/signupSchema";
import { api } from "@/utils/api";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const formFields = [
    {
      name: "name",
      label: "Name",
      placeholder: "Enter your name",
      type: "text",
      required: true,
    },
    {
      name: "email",
      label: "Email",
      placeholder: "Enter your email",
      type: "email",
      required: true,
    },
    {
      name: "password",
      label: "Password",
      placeholder: "Enter your password",
      type: "password",
      required: true,
    },
    {
      name: "confirmPassword",
      label: "Confirm Password",
      placeholder: "Confirm your password",
      type: "password",
      required: true,
    },
  ];

  const extraLinks = [
    {
      text: "Already have an account?",
      linkText: "Sign In",
      path: "/login",
    },
  ];

  const handleSignup = async ({ name, email, password }) => {
    try {
      setError(""); // reset error
      const res = await api.post("/auth/signup", { name, email, password });

      // On success: redirect or go to OTP
    //   navigate("/login");
    navigate(`/verify-otp/${email}`);
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        err?.message ||
        "Signup failed. Please try again.";
      setError(message);
    }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-white">
      <div className="w-full max-w-md">
        <Form
          title="Sign up"
          fields={formFields}
          onSubmit={handleSignup}
          buttonText="Next"
          extraLinks={extraLinks}
          validationRules={signupSchema}
            serverError={error}

        />
        {/* {error && (
          <p className="text-red-500 text-center mt-2 font-medium">{error}</p>
        )} */}
      </div>
    </div>
  );
};

export default SignUp;
