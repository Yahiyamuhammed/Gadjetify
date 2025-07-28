import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const FormDialog = ({ title, triggerLabel, onSubmit, children }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="ml-auto">{triggerLabel}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        <div className="mt-4">{children}</div>

        <div className="mt-6 flex justify-end">
          <Button onClick={onSubmit}>Submit</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FormDialog;
