import { useState } from "react";
import DataTableWrapper from "@/components/admin/DataTableWrapper";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Pagination } from "@/components/ui/pagination";
import { useAdminFetchCoupons } from "@/hooks/queries/useAdminCouponQueries";
import { useCreateCoupon, useDisableCoupon } from "@/hooks/mutations/useAdminCouponMutations";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";

// Define table columns for coupons
const getAdminCouponColumns = (onDisable) => [
  {
    accessorKey: "code",
    header: "Code",
    cell: ({ row }) => row.original.code,
  },
  {
    accessorKey: "discountType",
    header: "Type",
    cell: ({ row }) => row.original.discountType,
  },
  {
    accessorKey: "discountValue",
    header: "Value",
    cell: ({ row }) =>
      row.original.discountType === "percentage"
        ? `${row.original.discountValue}%`
        : `₹${row.original.discountValue}`,
  },
  {
    accessorKey: "minPurchase",
    header: "Min Purchase",
    cell: ({ row }) => `₹${row.original.minPurchase}`,
  },
  {
    accessorKey: "expiryDate",
    header: "Expiry",
    cell: ({ row }) => new Date(row.original.expiryDate).toLocaleDateString(),
  },
  {
    accessorKey: "isActive",
    header: "Status",
    cell: ({ row }) => (row.original.isActive ? "Active" : "Disabled"),
  },
  {
    header: "Actions",
    cell: ({ row }) => {
      const coupon = row.original;
      return (
        <Button
          variant="outline"
          size="sm"
          disabled={!coupon.isActive}
          onClick={() => onDisable(coupon._id)}
        >
          Disable
        </Button>
      );
    },
  },
];

export default function AdminCoupons() {
  const queryClient = useQueryClient();

  // Dialog state
  const [showDialog, setShowDialog] = useState(false);

  // Form state
  const [form, setForm] = useState({
    code: "",
    discountType: "percentage",
    discountValue: "",
    minPurchase: "",
    expiryDate: "",
  });

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const { data, isLoading } = useAdminFetchCoupons({ page, limit: 10, search });
  const coupons = data?.data || [];
  const pagination = data?.pagination || { page: 1, pages: 1 };

  const { mutate: createCoupon } = useCreateCoupon();
  const { mutate: disableCoupon } = useDisableCoupon();

  const handleSearch = (value) => {
    setSearch(value.toLowerCase());
  };

  const handleDisable = (couponId) => {
    disableCoupon(couponId, {
      onSuccess: () => {
        toast.success("Coupon disabled");
        queryClient.invalidateQueries({ queryKey: ["admin-coupons"] });
      },
      onError: (err) => {
        toast.error(err.response?.data?.message || err.message);
      },
    });
  };

  const handleCreate = (e) => {
    e.preventDefault();
    createCoupon(form, {
      onSuccess: () => {
        toast.success("Coupon created");
        queryClient.invalidateQueries({ queryKey: ["admin-coupons"] });
        setShowDialog(false);
        setForm({
          code: "",
          discountType: "percentage",
          discountValue: "",
          minPurchase: "",
          expiryDate: "",
        });
      },
      onError: (err) => {
        toast.error(err.response?.data?.message || err.message);
      },
    });
  };

  return (
    <>
      <DataTableWrapper
        title="Coupons"
        data={coupons}
        columns={getAdminCouponColumns(handleDisable)}
        filterFn={handleSearch}
        addButton="Add Coupon"
        onAdd={() => setShowDialog(true)}
      />

      <Pagination
        currentPage={pagination.page}
        totalPages={pagination.pages}
        onPageChange={setPage}
      />

      {/* Add Coupon Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Coupon</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleCreate} className="space-y-4">
            <div>
              <Label>Coupon Code</Label>
              <Input
                value={form.code}
                onChange={(e) => setForm({ ...form, code: e.target.value })}
                required
              />
            </div>

            <div>
              <Label>Discount Type</Label>
              <select
                className="w-full border rounded p-2"
                value={form.discountType}
                onChange={(e) => setForm({ ...form, discountType: e.target.value })}
              >
                <option value="percentage">Percentage</option>
                <option value="fixed">Fixed</option>
              </select>
            </div>

            <div>
              <Label>Discount Value</Label>
              <Input
                type="number"
                value={form.discountValue}
                onChange={(e) => setForm({ ...form, discountValue: e.target.value })}
                required
              />
            </div>

            <div>
              <Label>Minimum Purchase</Label>
              <Input
                type="number"
                value={form.minPurchase}
                onChange={(e) => setForm({ ...form, minPurchase: e.target.value })}
              />
            </div>

            <div>
              <Label>Expiry Date</Label>
              <Input
                type="date"
                value={form.expiryDate}
                onChange={(e) => setForm({ ...form, expiryDate: e.target.value })}
                required
              />
            </div>

            <div className="flex justify-end">
              <Button type="submit">Create</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
