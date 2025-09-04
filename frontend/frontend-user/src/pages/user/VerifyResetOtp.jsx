import { useLocation, useNavigate } from "react-router-dom";
import Form from "@/components/common/Form";
import { useVerifyForgotOtp } from "@/hooks/mutations/useUserAuth";
import { otpSchema } from "@/utils/validation/forgotOtpSchema";
import toast from "react-hot-toast";

const VerifyResetOtp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email; 

  const { mutate: verifyOtp } = useVerifyForgotOtp();

  const fields = [
    {
      name: "otp",
      label: "OTP",
      type: "text",
      placeholder: "Enter the OTP sent to your email",
      required: true,
    },
  ];

  const handleSubmit = (values) => {
    verifyOtp(
      { ...values, email },
      {
        onSuccess: () => {
          toast.success("OTP verified successfully");
          navigate("/forgot-password-otp", { state: { email } });
        },
        onError: (err) =>
          toast.error(err.response?.data?.message || "An error occurred"),
      }
    );
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-white px-4">
      <div className="w-full max-w-xl space-y-4">
        <Form
          title="Verify OTP"
          fields={fields}
          onSubmit={handleSubmit}
          buttonText="Verify OTP"
          validationRules={otpSchema}
        />
      </div>
    </div>
  );
};

export default VerifyResetOtp;
