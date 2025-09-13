import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import LoadingSpinner from "./LoadingSpinner";

const FormDialog = ({
  title,
  open,
  setOpen,
  formData,
  submitLabel = "Submit",
  onSubmit,
  formId,
  children,
  loading,
}) => {
  const handleSubmitClick = () => {
    if (onSubmit) onSubmit({ formData: formData });
    else {
      const form = document.getElementById(formId || "variant-form");
      if (form) {
        form.requestSubmit();
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[500px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        <div className="mt-4">{children}</div>

        <div className="mt-6 flex justify-end">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>

          <Button
            disabled={loading}
            className={"ml-4"}
            onClick={handleSubmitClick}
          >
            {loading ? <LoadingSpinner /> : submitLabel}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FormDialog;
