export const productColumns = [
  { accessorKey: "product", header: "Product" },
  { accessorKey: "variant", header: "Variant" },
  { accessorKey: "brand", header: "Brand" },
  { accessorKey: "unitsSold", header: "Units Sold" },
  { accessorKey: "revenue", header: "Revenue" },
  {
    accessorKey: "stockLeft",
    header: "Stock Left",
    cell: ({ row }) => row.getValue("stockLeft") ?? "N/A",
  },
];

export const brandColumns = [
  { accessorKey: "brandName", header: "Brand" },
  { accessorKey: "unitsSold", header: "Units Sold" },
  { accessorKey: "revenue", header: "Revenue" },
  { accessorKey: "numberOfProducts", header: "No. of Products" },
];
