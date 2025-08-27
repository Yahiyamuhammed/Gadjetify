// CouponFormFields.jsx
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { couponSchema } from "@/utils/validation/couponSchema";
import { useEffect } from "react";

const CouponFormFields = ({ onSubmit, defaultValues }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(couponSchema),
    defaultValues,
  });

  // Reset form when defaultValues change (for edit mode)
  useEffect(() => {
    if (defaultValues) {
      reset(defaultValues);
    }
  }, [defaultValues, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" id="coupon-form">
      <div>
        <Label>Coupon Code</Label>
        <Input {...register("code")} />
        {errors.code && <p className="text-red-500 text-sm">{errors.code.message}</p>}
      </div>
      
      <div>
        <Label>Discount Type</Label>
        <select {...register("discountType")} className="w-full border rounded p-2">
          <option value="percentage">Percentage</option>
          <option value="fixed">Fixed</option>
        </select>
        {errors.discountType && (
          <p className="text-red-500 text-sm">{errors.discountType.message}</p>
        )}
      </div>
      
      <div>
        <Label>Discount Value</Label>
        <Input type="number" {...register("discountValue")} />
        {errors.discountValue && (
          <p className="text-red-500 text-sm">{errors.discountValue.message}</p>
        )}
      </div>
      
      <div>
        <Label>Minimum Purchase</Label>
        <Input type="number" {...register("minPurchase")} />
        {errors.minPurchase && (
          <p className="text-red-500 text-sm">{errors.minPurchase.message}</p>
        )}
      </div>
      
      <div>
        <Label>Expiry Date</Label>
        <Input type="date" {...register("expiryDate")} />
        {errors.expiryDate && (
          <p className="text-red-500 text-sm">{errors.expiryDate.message}</p>
        )}
      </div>
      
      {/* Hidden submit button that FormDialog can trigger */}
      <button type="submit" className="hidden" id="hidden-submit"></button>
    </form>
  );
};

export default CouponFormFields;