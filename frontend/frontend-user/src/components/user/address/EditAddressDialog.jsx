import React from "react";
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
import addressFields from "@/constants/addressFields";

const EditAddressDialog = ({ address = {}, onSubmit, trigger }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const updatedAddress = {};
    addressFields.forEach((field) => {
      updatedAddress[field.name] = formData.get(field.name);
    });
    onSubmit(updatedAddress);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px] max-h-[90vh] overflow-y-auto">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>
              {address?.id ? "Edit Address" : "Add Address"}
            </DialogTitle>
            <DialogDescription>
              {address?.id
                ? "Update the address information."
                : "Fill in the details to add a new address."}
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            {addressFields.map((field) => (
              <div key={field.name} className="grid gap-3">
                <Label htmlFor={field.name}>{field.label}</Label>

                {field.type === "select" ? (
                  <select
                    id={field.name}
                    name={field.name}
                    defaultValue={address?.[field.name] || ""}
                    className="border border-gray-300 rounded-md p-2"
                    required
                  >
                    <option value="">Select {field.label}</option>
                    {field.options.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                ) : (
                  <Input
                    id={field.name}
                    name={field.name}
                    defaultValue={address?.[field.name] || ""}
                    required
                  />
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
