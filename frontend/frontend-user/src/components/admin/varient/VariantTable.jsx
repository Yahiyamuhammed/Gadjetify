import { DataTable } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const columns = [
  {
    accessorKey: "storage",
    header: "Storage"
  },
  {
    accessorKey: "ram",
    header: "RAM"
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => `₹${row.original.price}`
  },
  {
    accessorKey: "stock",
    header: "Stock"
  },
  {
    accessorKey: "isDefault",
    header: "Default",
    cell: ({ row }) =>
      row.original.isDefault ? (
        <Badge variant="success">Default</Badge>
      ) : (
        <Badge variant="outline">-</Badge>
      )
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const variant = row.original;

      return (
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => handleEdit(variant)}>
            Edit
          </Button>
          <Button variant="destructive" size="sm" onClick={() => handleDelete(variant._id)}>
            Delete
          </Button>
        </div>
      );
    }
  }
];

const handleEdit = (variant) => {
  // Implement edit logic or open edit dialog
  console.log("Edit:", variant);
};

const handleDelete = (variantId) => {
  // Implement delete logic (call PATCH /variants/:id/delete)
  console.log("Delete:", variantId);
};

export const VariantTable = ({ data }) => {
  return (
    <div className="p-4">
      <DataTable columns={columns} data={data} />
    </div>
  );
};
