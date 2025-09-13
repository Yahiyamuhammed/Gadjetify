import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { Controller } from "react-hook-form";
import { useFetchProductsForVariantAdding } from "@/hooks/queries/useProductQueries";

const ProductSelect = ({ control, name }) => {
  const [search, setSearch] = useState("");

  const { data, isLoading } = useFetchProductsForVariantAdding({ search, page: 1, limit: 10 });

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <Select
          value={field.value}
          onValueChange={field.onChange}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a product..." />
          </SelectTrigger>
          <SelectContent>
            <input
              type="text"
              placeholder="Search product..."
              value={search}
              onChange={(e) => setSearch(e.target.value.trim())}
              className="w-full p-2 border-b border-gray-200"
            />
            {isLoading ? (
              <SelectItem disabled>Loading...</SelectItem>
            ) : (
              data?.products.map((product) => (
                <SelectItem key={product._id} value={product._id}>
                  {product.name}
                </SelectItem>
              ))
            )}
          </SelectContent>
        </Select>
      )}
    />
  );
};

export default ProductSelect;
