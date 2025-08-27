import { Button } from "@/components/ui/button";

export const getCouponColumns = ({ onEdit, onToggle }) => [
  { accessorKey: "code", header: "Code" },
  { accessorKey: "discountType", header: "Type" },
  {
    accessorKey: "discountValue",
    header: "Value",
    cell: ({ row }) =>
      row.original.discountType === "percentage"
        ? `${row.original.discountValue}%`
        : `₹${row.original.discountValue}`,
  },
  { accessorKey: "minPurchase", header: "Min Purchase" },
  {
    accessorKey: "expiryDate",
    header: "Expiry",
    cell: ({ row }) => new Date(row.original.expiryDate).toLocaleDateString(),
  },
  {
    accessorKey: "isActive",
    header: "Status",
    cell: ({ row }) => (row.original.isActive ? "Active" : "Inactive"),
  },
  {
    header: "Actions",
    cell: ({ row }) => {
      const coupon = row.original;
      return (
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => onEdit(coupon)}>Edit</Button>
          <Button variant="outline" size="sm" onClick={() => onToggle(coupon._id)}>
            {coupon.isActive ? "Disable" : "Activate"}
          </Button>
        </div>
      );
    },
  },
];
