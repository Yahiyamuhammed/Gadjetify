import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const getAdminOrderColumns = (
  onStatusChange,
  onViewDetails,
  onApproveReturn
) => [
  {
    accessorKey: "customer.name",
    header: "Customer",
    cell: ({ row }) => row.original.customer.name,
  },
  {
    accessorKey: "totalAmount",
    header: "Total",
    cell: ({ row }) => `₹${row.original.totalAmount}`,
  },
  {
    accessorKey: "Payment mode",
    header: "Payment mode",
    cell: ({ row }) => `${row.original.paymentMethod}`,
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => new Date(row.original.date).toLocaleDateString(),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const order = row.original;
      const isFinalStatus =
        order.status === "Cancelled" || order.status === "Delivered";

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild disabled={isFinalStatus}>
            <Button
              variant="outline"
              className={
                isFinalStatus ? "cursor-not-allowed" : "cursor-pointer"
              }
            >
              {order.status}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {["Placed", "Shipped", "Delivered", "Cancelled"].map((status) => (
              <DropdownMenuItem
                key={status}
                onClick={() => onStatusChange(order._id, status)}
              >
                {status}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
  {
    header: "Actions",
    cell: ({ row }) => {
      const order = row.original;
      return (
        <div className="flex gap-2">
          <Button
            className="cursor-pointer"
            variant="outline"
            onClick={() => onViewDetails(order)}
          >
            View
          </Button>
        </div>
      );
    },
  },
];
