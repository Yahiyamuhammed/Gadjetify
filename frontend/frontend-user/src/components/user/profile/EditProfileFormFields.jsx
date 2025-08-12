import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const EditProfileFormFields = ({
  formData,
  setFormData,
  originalEmail,
  onEmailChange
}) => {
  return (
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
          onChange={(e) => {
            const newEmail = e.target.value;
            setFormData((prev) => ({ ...prev, email: newEmail }));
            onEmailChange(newEmail !== originalEmail); 
          }}
        />
      </div>
    </div>
  );
};

export default EditProfileFormFields;
