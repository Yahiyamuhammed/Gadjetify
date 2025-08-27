import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const FormDialog = ({
  title,
  open,
  setOpen,
  formData,
  submitLabel = "Submit",
  onSubmit,
  schema, // optional yup schema
  children,
}) => {
  const [errors, setErrors] = useState({});

  const handleSubmit = async () => {
    if (schema) {
      try {
        const validatedData = await schema.validate(formData, {
          abortEarly: false,
        });
        setErrors({}); // clear errors if valid
        onSubmit(validatedData);
        setOpen(false);
      } catch (validationError) {
        const formattedErrors = {};
        validationError.inner.forEach((err) => {
          if (err.path) {
            formattedErrors[err.path] = err.message;
          }
        });
        setErrors(formattedErrors);
      }
    } else {
      onSubmit(formData);
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        <div className="mt-4">
          {typeof children === "function" ? children(errors) : children}
        </div>

        <div className="mt-6 flex justify-end gap-2">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>{submitLabel}</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FormDialog;
