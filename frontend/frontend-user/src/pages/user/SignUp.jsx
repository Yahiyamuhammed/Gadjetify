import React, { useState } from "react";
import Form from "@/components/common/Form";
import { signupSchema } from "@/utils/validation/signupSchema";
import { api } from "@/utils/api";
import { useNavigate } from "react-router-dom";
import SpinningButton from "@/components/SpinningButton";
import { googleAuth } from "@/hooks/mutations/useGoogleAuthMutation";
import { FcGoogle } from "react-icons/fc";
import toast from "react-hot-toast";
import { useGoogleLogin } from "@react-oauth/google";
import { useQueryClient } from "@tanstack/react-query";

const SignUp = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const { mutate: googleLogin, error: onErr } = googleAuth();
  const queryClient = useQueryClient();

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
      toast.success(res.message || "Signup successful"),
        navigate(`/verify-otp/${email}`);
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        err?.message ||
        "Signup failed. Please try again.";
      setError(message);
      toast.error(message || "Signup failed");
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
          toast.error(err?.response?.data?.message || "Google login failed"),
          queryClient.invalidateQueries(['auth-user'])
            setLoading(false);
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

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-white px-4">
      <div className="w-full max-w-xl space-y-4">
        {" "}
        {/* shared container */}
        <Form
          title="Signup"
          fields={formFields}
          onSubmit={handleSignup}
          buttonText="Log In"
          extraLinks={extraLinks}
          validationRules={signupSchema}
          // serverError={error}
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
          Sign up with Google
        </SpinningButton>
      </div>
    </div>
  );
};

export default SignUp;
