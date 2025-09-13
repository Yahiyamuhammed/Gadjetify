import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import toast from "react-hot-toast";
import FormDialog from "../../common/FormDialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import {
  useUpdateProfile,
  useVerifyEmailOtp,
} from "@/hooks/mutations/useUpdateProfile";
import EditProfileFormFields from "./EditProfileFormFields";
import { InputOTPForm } from "../../common/InputOtp";
import { useFetchUserDetail } from "@/hooks/queries/useProfileQueries";
import { useQueryClient } from "@tanstack/react-query";
import {
  useForgotPassword,
  useResetPassword,
  useVerifyForgotOtp,
} from "@/hooks/mutations/useUserAuth";
import ConfirmAlertDialog from "@/components/common/ExternalConfirmDialog";
import ResetPasswordFormFields from "./ResetPasswordFormFields";

const ProfileCard = () => {
  const { mutate } = useUpdateProfile();
  const { mutate: verifyOtp } = useVerifyEmailOtp();
  const { data: userDetail } = useFetchUserDetail();

  const { mutate: requestPasswordReset } = useForgotPassword();
  const { mutate: verifyPasswordOtp } = useVerifyForgotOtp();
  const { mutate: resetPassword } = useResetPassword();

  const useQuery = useQueryClient();

  const [open, setOpen] = useState(false);
  const [openOtp, setOpenOtp] = useState(false);
  const [otp, setOtp] = useState(null);
  const [formData, setFormData] = useState({
    name: userDetail?.name || "",
    email: userDetail?.email || "",
    pin: "",
  });
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [openResetForm, setOpenResetForm] = useState(false);
  const [openResetOtp, setOpenResetOtp] = useState(false);
  const [resetForm, setResetForm] = useState({
    password: "",
    confirmPassword: "",
  });

  const avatarUrl =
    "https://cdn.flyonui.com/fy-assets/avatar/avatar-1.png";

  const handleSubmit = ({ formData }) => {
    console.log(formData);
    mutate(formData, {
      onSuccess: (data) => {
        toast.success("Profile updated:", data);
        if (data?.otp) {
          setOpenOtp(true);
        }
        useQuery.invalidateQueries(["userProfile"]);

        setOpen(false);
      },
      onError: (err) => {
        console.log(err);
        toast.error(err.response?.data?.message || "Something went wrong");
      },
    });
  };

  const handleOtpSubmit = ({ formData }) => {
    // You can use mutate or a different API call here to verify OTP
    // toast.success("OTP verified: " + formData);
    verifyOtp(
      { otp: formData },
      {
        onSuccess: () => {
          toast.success("success fully changed the email");
          useQuery.invalidateQueries(["userProfile"]);
          setOpenOtp(false);
        },
        onError: (err) => {
          toast.error(err?.response?.data?.message || "some error occured");
        },
      }
    );
  };

  const handleOpenEdit = () => {
    if (userDetail) {
      setFormData({
        name: userDetail.name || "",
        email: userDetail.email || "",
        pin: "",
      });
    }
    setOpen(true);
  };

  const handlePasswordResetRequest = () => {
    toast.success("Your otp is being sent");
    requestPasswordReset(
      { email: userDetail?.email },
      {
        onSuccess: () => {
          toast.success("OTP sent to your email");
          setOpenResetOtp(true);
        },
        onError: (err) =>
          toast.error(err.response?.data?.message || "Failed to send OTP"),
      }
    );
    setShowResetConfirm(false);
  };

  const handleVerifyPasswordOtp = ({ formData }) => {
    verifyPasswordOtp(
      { email: userDetail?.email, otp: formData },
      {
        onSuccess: () => {
          toast.success("OTP verified");
          setOpenResetOtp(false);
          setOpenResetForm(true);
          setOtp("");
          setResetForm("");
        },
        onError: (err) => {
          toast.error(err.response?.data?.message || "Invalid OTP"), setOtp("");
        },
      }
    );
  };

  const handleResetPassword = ({ formData }) => {
    resetPassword(
      { email: userDetail?.email, password: formData.password },
      {
        onSuccess: () => {
          toast.success("Password reset successfully");
          setOpenResetForm(false);
          setResetForm("");
        },
        onError: (err) =>
          toast.error(err.response?.data?.message || "Reset failed"),
      }
    );
  };

  return (
    <Card className="p-6">
      <figure>
        <svg
          className="w-full h-40"
          preserveAspectRatio="none"
          viewBox="0 0 1113 161"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0)">
            <rect x="0.5" width="1112" height="161" rx="12" fill="white" />
            <rect x="1" width="1112" height="348" fill="#D9DEEA" />
            <path
              d="M512.694 359.31C547.444 172.086 469.835 34.2204 426.688 -11.3096H1144.27V359.31H512.694Z"
              fill="#C0CBDD"
            />
            <path
              d="M818.885 185.745C703.515 143.985 709.036 24.7949 726.218 -29.5801H1118.31V331.905C1024.49 260.565 963.098 237.945 818.885 185.745Z"
              fill="#8192B0"
            />
          </g>
          <defs>
            <clipPath id="clip0">
              <rect x="0.5" width="1112" height="161" rx="12" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </figure>

      {/* Avatar Section */}
      <div className="-mt-24 flex flex-col items-center">
        <div className="relative">
          <img
            className="w-32 h-32 rounded-full border-4 border-white dark:border-neutral-800 shadow-lg object-cover"
            src={avatarUrl}
            alt={userDetail?.name}
          />
        </div>

        {/* User Info */}
        <div className="text-center mt-4">
          <h1 className="text-xl font-semibold dark:text-neutral-200">
            {userDetail?.name}
          </h1>
          <p className="text-sm text-gray-500 dark:text-neutral-400">
            {userDetail?.email}
          </p>
          <p className="text-sm text-gray-500 dark:text-neutral-400">
            referral code: {userDetail?.referralCode}
          </p>
        </div>
      </div>

      <div className="mt-6 flex flex-col text- md:flex-row md:items-center justify-end gap-4">
        <div>
          <Button variant="secondary" size="sm" onClick={handleOpenEdit}>
            Edit
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setShowResetConfirm(true)}
            className={"ml-4"}
          >
            Reset Password
          </Button>
        </div>
      </div>
      <FormDialog
        title="Edit Profile"
        open={open}
        setOpen={setOpen}
        triggerLabel="Edit"
        formData={formData}
        onSubmit={handleSubmit}
        formId={'editProfile'}
      >
        <EditProfileFormFields defaultValues={formData} onSubmit={setFormData} formId={'editProfile'}/>
      </FormDialog>

      <FormDialog
        title="Enter OTP"
        open={openOtp}
        setOpen={setOpenOtp}
        onSubmit={handleOtpSubmit}
        triggerLabel="Verify OTP"
        formData={otp}
      >
        <InputOTPForm
          formData={otp}
          setFormData={setOtp}
          onSubmit={handleOtpSubmit}
        />
      </FormDialog>
      <ConfirmAlertDialog
        open={showResetConfirm}
        onOpenChange={setShowResetConfirm}
        title="Reset Password"
        description="Are you sure you want to reset your password? An OTP will be sent to your registered email."
        confirmText="Yes, Send OTP"
        cancelText="Cancel"
        onConfirm={handlePasswordResetRequest}
      />

      <FormDialog
        title="Enter OTP"
        open={openResetOtp}
        setOpen={setOpenResetOtp}
        // onSubmit={() => {}} // handled inside form
        onSubmit={handleVerifyPasswordOtp}
        triggerLabel="Verify OTP"
        formData={otp}
      >
        <InputOTPForm formData={otp} setFormData={setOtp} />
      </FormDialog>

      <FormDialog
        title="Reset Password"
        open={openResetForm}
        setOpen={setOpenResetForm}
        onSubmit={handleResetPassword}
        triggerLabel="Reset"
        formData={resetForm}
      >
        <ResetPasswordFormFields
          formData={resetForm}
          setFormData={setResetForm}
        />
      </FormDialog>
    </Card>
  );
};

export default ProfileCard;
