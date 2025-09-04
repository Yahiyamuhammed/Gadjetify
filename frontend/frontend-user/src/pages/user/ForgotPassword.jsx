import Form from "@/components/common/Form";
import { useForgotPassword } from "@/mutations/auth";

const ForgotPassword = () => {
  const { mutate, error } = useForgotPassword();

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
    mutate(values);
  };

  return (
    <Form
      title="Forgot Password"
      fields={fields}
      onSubmit={handleSubmit}
      buttonText="Send OTP"
      validationRules={{}} // you can use yup schema here
      serverError={error?.message}
    />
  );
};

export default ForgotPassword;
