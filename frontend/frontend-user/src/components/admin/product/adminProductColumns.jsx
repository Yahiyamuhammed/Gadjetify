import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import noImage from "@/assets/noImage.png";

export const getAdminProductColumns = (onStatusChange, onEdit) => [
  {
    accessorKey: "images",
    header: "Image",
    cell: ({ row }) => {
      const imgArr = row.original.images;
      const imageUrl = imgArr?.[0]
        ? `http://localhost:5000/products/${imgArr[0]}`
        : noImage;
      return (
        <img
          src={imageUrl}
          alt="Product"
          className="w-12 h-12 rounded-full object-cover"
        />
      );
    },
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "model",
    header: "Model",
  },
  {
    accessorKey: "brand.name",
    header: "Brand",
    cell: ({ row }) => row.original.brand?.name || "Not Available",
  },
  {
    accessorKey: "offerPercentage",
    header: "Offer",
    cell: ({ row }) => `${row.original.offerPercentage}%`,
  },
  {
    accessorKey: "codAvailable",
    header: "COD",
    cell: ({ row }) =>
      row.original.codAvailable ? (
        <span className="px-2 py-1 rounded-full text-sm bg-green-100 text-green-700">
          Yes
        </span>
      ) : (
        <span className="px-2 py-1 rounded-full text-sm bg-gray-200 text-gray-700">
          No
        </span>
      ),
  },
  {
    accessorKey: "isListed",
    header: "Status",
    cell: ({ row }) =>
      row.original.isListed ? (
        <span className="px-2 py-1 rounded-full text-sm bg-green-200 text-green-800">
          Active
        </span>
      ) : (
        <span className="px-2 py-1 rounded-full text-sm bg-red-200 text-red-800">
          Inactive
        </span>
      ),
  },
  {
    header: "Actions",
    cell: ({ row }) => {
      const product = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              Actions
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => onEdit(product)}>
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onStatusChange(product)}>
              {product.isListed ? "Unlist" : "Restore"}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
