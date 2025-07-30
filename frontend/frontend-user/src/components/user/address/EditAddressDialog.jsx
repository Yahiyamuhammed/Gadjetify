import React, { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import addressFields from "./addressFields";
import { Checkbox } from "@/components/ui/checkbox";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const EditAddressDialog = ({
  address = {},
  onSubmit,
  trigger,
  open,
  setOpen,
  validationSchema = {},
}) => {
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });
  // onSubmit(updatedAddress);


useEffect(() => {
  if (open) {
    if (address && Object.keys(address).length > 0) {
      reset({
        ...address,
        addressType: address.addressType || "home",
      });
    } else {
      reset({
        name: "",
        street: "",
        city: "",
        state: "",
        pincode: "",
        phone: "",
        addressType: "home",
      });
    }
  }
}, [open, address, reset]);


  const onFormSubmit = (data) => {
    onSubmit(data);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px] max-h-[90vh] overflow-y-auto">
        <form onSubmit={handleSubmit(onFormSubmit)}>
          <DialogHeader>
            <DialogTitle>
              {address?._id ? "Edit Address" : "Add Address"}
            </DialogTitle>
            <DialogDescription>
              {address?._id
                ? "Update the address information."
                : "Fill in the details to add a new address."}
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            {addressFields.map((field) => (
              <div key={field.name} className="grid gap-3">
                <Label htmlFor={field.name}>{field.label}</Label>

                <Controller
                  name={field.name}
                  control={control}
                  render={({ field: controlledField }) =>
                    field.type === "select" ? (
                      <select
                        {...controlledField}
                        id={field.name}
                        className="w-full px-4 py-2 border rounded-md"
                      >
                        <option value="">{`Select ${field.label}`}</option>
                        {field.options.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    ) : field.type === "checkbox" ? (
                      <input
                        type="checkbox"
                        id={field.name}
                        {...controlledField}
                        checked={controlledField.value ?? false}
                        onChange={(e) =>
                          controlledField.onChange(e.target.checked)
                        }
                        className="h-4 w-4"
                      />
                    ) : (
                      <input
                        type={field.type}
                        id={field.name}
                        placeholder={field.placeholder}
                        {...controlledField}
                        className="w-full px-4 py-2 border rounded-md"
                      />
                    )
                  }
                />

                {errors[field.name] && (
                  <p className="text-red-500 text-sm">
                    {errors[field.name].message}
                  </p>
                )}
              </div>
            ))}
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" type="button">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit">Save</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditAddressDialog;
