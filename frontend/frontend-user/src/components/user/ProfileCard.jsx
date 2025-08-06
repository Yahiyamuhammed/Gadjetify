import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import toast from "react-hot-toast";
import FormDialog from "../common/FormDialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useUpdateProfile } from "@/hooks/mutations/useUpdateProfile";

const ProfileCard = ({ user }) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
  });

  const { mutate } = useUpdateProfile();

  const handleSubmit = ({ formData }) => {
    mutate(formData, {
      onSuccess: (data) => {
        toast.success("Profile updated:", data);
        setOpen(false);
      },
      onError: (err) => {
        toast.error(err.response?.data?.message || "Something went wrong");
      },
    });
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
            src={user.avatarUrl}
            alt={user.name}
          />
        </div>

        {/* User Info */}
        <div className="text-center mt-4">
          <h1 className="text-xl font-semibold dark:text-neutral-200">
            {user.name}
          </h1>
          <p className="text-sm text-gray-500 dark:text-neutral-400">
            {user.email}
          </p>
        </div>
      </div>

      {/* Action Buttons and Tabs */}
      <div className="mt-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <Button variant="secondary" size="sm" onClick={() => setOpen(true)}>
          Edit
        </Button>

        <Tabs defaultValue="profile">
          <TabsList className="flex space-x-4 overflow-x-auto">
            <TabsTrigger value="profile">My Profile</TabsTrigger>
            <TabsTrigger value="teams">Teams</TabsTrigger>
            <TabsTrigger value="files">Files</TabsTrigger>
            <TabsTrigger value="connections">Connections</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      <FormDialog
        title="Edit Profile"
        open={open}
        setOpen={setOpen}
        triggerLabel="Edit"
        formData={formData}
        onSubmit={handleSubmit}
      >
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, name: e.target.value }))
              }
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              value={formData.email}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, email: e.target.value }))
              }
            />
          </div>
        </div>
      </FormDialog>
    </Card>
  );
};

export default ProfileCard;
