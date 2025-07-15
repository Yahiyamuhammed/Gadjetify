import React, { useState } from "react";
import Form from "@/components/common/Form";
import { loginSchema } from "@/utils/validation/loginSchema";
import { api } from "@/utils/api";
import { useNavigate } from "react-router-dom";
import { GoogleLogin,useGoogleLogin  } from "@react-oauth/google";
import {jwtDecode} from 'jwt-decode';
import {googleAuth } from "@/hooks/mutations/useGoogleAuthMutation"
import toast from 'react-hot-toast';
<<<<<<< Updated upstream
=======
import { Button } from "@/components/ui/button"
import SpinningButton from "@/components/SpinningButton";
// import { useGoogleLogin } from '@react-oauth/google';
import { FcGoogle } from "react-icons/fc"; // Google logo


>>>>>>> Stashed changes



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

  const newGoogleLogin = useGoogleLogin({
  onSuccess: async (response) => {
    console.log("Google token:", response);
    // await handleGoogleLogin(response); 
    googleLogin(response.access_token,{
      onSuccess:res=>toast.success(res.message || 'Google login successful'),
      onError:err=>toast.error(err?.response?.data?.message || 'Google login failed')

    })
  },
  onError: (error) => {
    console.error("Google Login Failed", error);
    toast.error("Google login failed");
  },
});
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
<<<<<<< Updated upstream
      <button >login with google</button>
      <GoogleLogin
      
        onSuccess={handleGoogleLogin}
        onError={(err)=> console.log('login failed')}
          
      />
=======
        <div className=" text-center">
        
        <GoogleLogin
          onSuccess={handleGoogleLogin}
          onError={() => console.log('Login failed')}
        />
        <Button variant="outline">Button</Button>
        <Button variant="destructive">Destructive</Button>
        <SpinningButton onClick={()=>toast.success('button clicked')} className="w-full bg-indigo-600 text-white font-semibold py-2 px-4 rounded-md shadow hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-400">testing</SpinningButton>
        <SpinningButton
  icon={FcGoogle}
  onClick={newGoogleLogin}
  variant="outline"
  size="lg"
>
  Sign in with Google
</SpinningButton>

      </div>
    </div>
>>>>>>> Stashed changes
    </div>
  );
};

export default Login;
