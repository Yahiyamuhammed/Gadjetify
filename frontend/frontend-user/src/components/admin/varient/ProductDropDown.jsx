import { useState } from "react";
import { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from "@/components/ui/command";
import { Controller } from "react-hook-form";
import { useFetchProductsForVariantAdding } from "@/hooks/queries/useProductQueries";

const ProductDropdown = ({ control, name }) => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const { data, isLoading } = useFetchProductsForVariantAdding({ search, page, limit: 10 });

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <Command>
          <CommandInput
            placeholder="Search product..."
            value={search}
            onValueChange={(value) => setSearch(value)}
          />
          <CommandList>
            <CommandEmpty>No product found.</CommandEmpty>
            <CommandGroup>
              {isLoading ? (
                <CommandItem disabled>Loading...</CommandItem>
              ) : (
                data?.data.map((product) => (
                  <CommandItem
                    key={product._id}
                    onSelect={() => field.onChange(product._id)}
                  >
                    {product.name}
                  </CommandItem>
                ))
              )}
            </CommandGroup>
          </CommandList>
        </Command>
      )}
    />
  );
};

export default ProductDropdown;
