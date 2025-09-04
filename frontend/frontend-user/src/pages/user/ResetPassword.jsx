import { useLocation, useNavigate } from "react-router-dom";
import Form from "@/components/common/Form";
import { useResetPassword } from "@/hooks/mutations/useUserAuth";
import { resetPasswordSchema } from "@/utils/validation/resetPasswordSchema";
import toast from "react-hot-toast";

const ResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  const { mutate: resetPassword } = useResetPassword();

  const fields = [
    {
      name: "password",
      label: "New Password",
      type: "password",
      placeholder: "Enter your new password",
      required: true,
    },
    {
      name: "confirmPassword",
      label: "Confirm Password",
      type: "password",
      placeholder: "Re-enter your new password",
      required: true,
    },
  ];

  const handleSubmit = (values) => {
    resetPassword(
      { email, password: values.password },
      {
        onSuccess: () => {
          toast.success("Password reset successful");
          navigate("/login");
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
          title="Reset Password"
          fields={fields}
          onSubmit={handleSubmit}
          buttonText="Reset Password"
          validationRules={resetPasswordSchema}
        />
      </div>
    </div>
  );
};

export default ResetPassword;
