import { useState } from "react";
import DataTableWrapper from "@/components/admin/DataTableWrapper";
import { Pagination } from "@/components/ui/pagination";
import { useAdminFetchCoupons } from "@/hooks/queries/useAdminCouponQueries";
import {
  useCreateCoupon,
  useUpdateCoupon,
  useToggleCoupon,
} from "@/hooks/mutations/useAdminCouponMutations";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { getCouponColumns } from "@/components/admin/coupon/CouponColumns";
import FormDialog from "@/components/common/FormDialog";
import CouponFormFields from "@/components/admin/coupon/CouponFormFields";
import { useDebouncedQueryParams } from "@/hooks/useDebouncedQueryParams";

export default function AdminCoupons() {
  const queryClient = useQueryClient();

  const [showDialog, setShowDialog] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  const [defaultValues, setDefaultValues] = useState({
    code: "",
    discountType: "percentage",
    discountValue: "",
    minPurchase: "",
    expiryDate: "",
  });

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const { data } = useAdminFetchCoupons({
    page,
    limit: 10,
    search: useDebouncedQueryParams(searchTerm),
  });
  const coupons = data?.data || [];
  const pagination = data?.pagination || { page: 1, pages: 1 };

  const { mutate: createCoupon } = useCreateCoupon();
  const { mutate: updateCoupon } = useUpdateCoupon();
  const { mutate: toggleCoupon } = useToggleCoupon();

  const handleSearch = (value) => {
    setSearch(value.toLowerCase());
  };

  const handleToggle = (couponId) => {
    toggleCoupon(couponId, {
      onSuccess: () => {
        toast.success("Coupon status updated");
        queryClient.invalidateQueries({ queryKey: ["admin-coupons"] });
      },
      onError: (err) => {
        toast.error(err.response?.data?.message || err.message);
      },
    });
  };

  const handleEdit = (coupon) => {
    setDefaultValues({
      code: coupon.code,
      discountType: coupon.discountType,
      discountValue: coupon.discountValue,
      minPurchase: coupon.minPurchase,
      expiryDate: coupon.expiryDate?.split("T")[0],
    });
    setEditId(coupon._id);
    setEditMode(true);
    setShowDialog(true);
  };

  const handleFormSubmit = (formData) => {
    if (editMode) {
      updateCoupon(
        { id: editId, data: formData },
        {
          onSuccess: () => {
            toast.success("Coupon updated");
            queryClient.invalidateQueries({ queryKey: ["admin-coupons"] });
            resetForm();
          },
          onError: (err) => {
            toast.error(err.response?.data?.message || err.message);
          },
        }
      );
    } else {
      createCoupon(formData, {
        onSuccess: () => {
          toast.success("Coupon created");
          queryClient.invalidateQueries({ queryKey: ["admin-coupons"] });
          resetForm();
        },
        onError: (err) => {
          toast.error(err.response?.data?.message || err.message);
        },
      });
    }
  };

  const handleDialogSubmit = () => {
    const submitButton = document.getElementById("hidden-submit");
    if (submitButton) {
      submitButton.click();
    }
  };

  const resetForm = () => {
    setDefaultValues({
      code: "",
      discountType: "percentage",
      discountValue: "",
      minPurchase: "",
      expiryDate: "",
    });
    setEditId(null);
    setEditMode(false);
    setShowDialog(false);
  };

  const handleAddNew = () => {
    setDefaultValues({
      code: "",
      discountType: "percentage",
      discountValue: "",
      minPurchase: "",
      expiryDate: "",
    });
    setEditMode(false);
    setShowDialog(true);
  };

  return (
    <>
      <DataTableWrapper
        title="Coupons"
        data={coupons}
        columns={getCouponColumns({
          onEdit: handleEdit,
          onToggle: handleToggle,
        })}
        filterFn={handleSearch}
        addButton="Add Coupon"
        onAdd={handleAddNew}
      />

      <Pagination
        currentPage={pagination.page}
        totalPages={pagination.pages}
        onPageChange={setPage}
      />

      <FormDialog
        open={showDialog}
        setOpen={setShowDialog}
        title={editMode ? "Edit Coupon" : "Add Coupon"}
        onSubmit={handleDialogSubmit}
      >
        <CouponFormFields
          onSubmit={handleFormSubmit}
          defaultValues={defaultValues}
        />
      </FormDialog>
    </>
  );
}
