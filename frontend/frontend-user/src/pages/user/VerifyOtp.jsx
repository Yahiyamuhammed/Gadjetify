import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Form from "@/components/common/Form";
import { otpValidationSchema } from "@/utils/validation/otpSchema";
import { api } from "@/utils/api";

const VerifyOtp = () => {
  const navigate = useNavigate();
  const { email } = useParams(); // email passed in route
  const [timeLeft, setTimeLeft] = useState(25); // 4 min 55 sec
  const [error, setError] = useState("");

  // Countdown timer
  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  // Format mm:ss
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  // Handle OTP verify
  const handleSubmit = async ({ otp }) => {
    try {
      setError("");

      const res = await api.post("/auth/verify-otp", { email, otp });

      // On success, go to homepage or login
      navigate("/");
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        "OTP verification failed";
      setError(msg);
    }
  };

  // Handle resend OTP
  const handleResend = async () => {
    try {
        console.log('entered resend');
        
      setError("");

      const res = await api.post("/auth/resend-otp", { email });

      setTimeLeft(295); // restart timer
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        "Failed to resend OTP";
      setError(msg);
    }
  };

  const formFields = [
    {
      name: "otp",
      label: "OTP",
      placeholder: "Enter the OTP sent to your email",
      type: "text",
      required: true,
    },
  ];

  const extraLinks = [
    {
      text:
        timeLeft > 0
          ? `OTP expires in ${formatTime(timeLeft)}`
          : "Didn't receive the OTP?",
      linkText: timeLeft === 0 ? "Resend OTP" : "",
      onClick: timeLeft === 0 ? handleResend : undefined,
    },
  ];
  

  return (
    <div className="h-screen flex justify-center items-center bg-white">
      <div className="w-full max-w-md">
        <Form
          title="Verify OTP"
          fields={formFields}
          onSubmit={handleSubmit}
          buttonText="Verify"
          extraLinks={extraLinks}
          validationRules={otpValidationSchema}
          serverError={error}
        />
      </div>
    </div>
  );
};

export default VerifyOtp;
