import Form from "@/components/common/Form";
import { useForgotPassword } from "@/hooks/mutations/useUserAuth";
import { emailSchema } from "@/utils/validation/forgotOtpSchema";
import toast from "react-hot-toast";

const ForgotPassword = () => {
  const { mutate:requestPasswordReset, error } = useForgotPassword();

  const fields = [
    {
      name: "email",
      label: "Email",
      type: "email",
      placeholder: "Enter your registered email",
      required: true,
    },
  ];

  const handleSubmit = (values) => {
    requestPasswordReset(values, {
      onSuccess: () => toast.success("An otp is sent to you email"),
      onError: (err) =>
        toast.error(err.response.data.message || "an error occured"),
    });
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-white px-4">
      <div className="w-full max-w-xl space-y-4">
        <Form
          title="Forgot Password"
          fields={fields}
          onSubmit={handleSubmit}
          buttonText="Send OTP"
          validationRules={emailSchema}
        />
      </div>
    </div>
  );
};

export default ForgotPassword;
