
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { variantSchema } from "@/utils/validation/variantSchema";
import { useEffect } from "react";

const VariantFormFields = ({ onSubmit, defaultValues }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(variantSchema),
    defaultValues,
  });

  // Reset when editing (edit mode)
  useEffect(() => {
    if (defaultValues) {
      reset(defaultValues);
    }
  }, [defaultValues, reset]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4"
      id="variant-form"
    >
      <div>
        <Label>Product ID</Label>
        <Input {...register("productId")} />
        {errors.productId && (
          <p className="text-red-500 text-sm">{errors.productId.message}</p>
        )}
      </div>

      <div>
        <Label>RAM (in GB)</Label>
        <Input type="number" placeholder="Enter RAM size" {...register("ram")} />
        {errors.ram && <p className="text-red-500 text-sm">{errors.ram.message}</p>}
      </div>

      <div>
        <Label>Storage (in GB)</Label>
        <Input
          type="number"
          placeholder="Enter storage size"
          {...register("storage")}
        />
        {errors.storage && (
          <p className="text-red-500 text-sm">{errors.storage.message}</p>
        )}
      </div>

      <div>
        <Label>Price</Label>
        <Input type="number" {...register("price")} />
        {errors.price && (
          <p className="text-red-500 text-sm">{errors.price.message}</p>
        )}
      </div>

      <div>
        <Label>Stock</Label>
        <Input type="number" {...register("stock")} />
        {errors.stock && (
          <p className="text-red-500 text-sm">{errors.stock.message}</p>
        )}
      </div>

      {/* hidden button so FormDialog can trigger submit */}
      <button type="submit" className="hidden" id="hidden-variant-submit"></button>
    </form>
  );
};

export default VariantFormFields;
