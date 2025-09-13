import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { editProfileSchema } from "@/utils/validation/editProfileSchema";

const EditProfileFormFields = ({ onSubmit, defaultValues, formId }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: yupResolver(editProfileSchema),
    defaultValues,
  });

  const email = watch("email");

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" id={formId}>
      <div>
        <Label htmlFor="name">Name</Label>
        <Input id="name" {...register("name")} />
        {errors.name && (
          <p className="text-red-500 text-sm">{errors.name.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="email">Email</Label>
        <Input id="email" {...register("email")} />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}
      </div>

      {/* hidden button so FormDialog can trigger submit */}
      <button type="submit" className="hidden" id={formId}></button>
    </form>
  );
};

export default EditProfileFormFields;
