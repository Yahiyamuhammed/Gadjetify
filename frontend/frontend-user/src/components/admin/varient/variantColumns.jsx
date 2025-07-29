import ConfirmAlertDialog from "@/components/common/ConfirmDialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const getVariantColumns = ({ onEdit, onDelete }) => [
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
          <Button variant="outline" size="sm" onClick={() => onEdit({variant:variant})}>
            Edit
          </Button>
          {/* <Button variant="outline" size="sm" onClick={() => onDelete(variant._id)}>
            Delete
          </Button> */}
          <ConfirmAlertDialog
            trigger={
              <Button size="sm" variant="outline">
                Delete
              </Button>
            }
            title="Delete Variant"
            description="Are you sure you want to delete this variant? This action cannot be undone."
            confirmText="Yes, Delete"
            onConfirm={() => onDelete(variant._id)} // Pass variant id to delete
          />
        </div>
      );
    }
  }
];
