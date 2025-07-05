import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const successToast = (msg) =>
  toast.success(msg, {
    position: "top-center",
    autoClose: 2000,
  });

export const errorToast = (msg) =>
  toast.error(msg, {
    position: "top-center",
    autoClose: 2000,
  });
