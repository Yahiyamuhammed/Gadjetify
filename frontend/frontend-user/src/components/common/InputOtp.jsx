import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

const schema = yup.object().shape({
  pin: yup
    .string()
    .required("OTP is required")
    .length(6, "Your one-time password must be 6 characters."),
});

export function InputOTPForm({ onSubmit, formData, setFormData }) {

  
  const form = useForm({
    resolver: yupResolver(schema),
    defaultValues: formData || {
      pin: "",
    },
  });

  return (
     <div className="flex justify-center">
        <InputOTP maxLength={6} value={formData} onChange={setFormData}>
          <InputOTPGroup>
            {[...Array(6)].map((_, i) => (
              <InputOTPSlot key={i} index={i} />
            ))}
          </InputOTPGroup>
        </InputOTP>
      </div>
  );
}
