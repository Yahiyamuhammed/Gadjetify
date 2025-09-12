import { useEffect, useState } from "react";
import axios from "axios";
import { getVariantColumns } from "@/components/admin/varient/variantColumns";
import { api } from "@/utils/api";
import DataTableWrapper from "@/components/admin/DataTableWrapper";
import FormDialog from "@/components/common/FormDialog";
import VariantFormFields from "@/components/admin/varient/VariantFormFields";
import { useFetchVarients } from "@/hooks/queries/useVarientQueries";
import {
  useAddVarient,
  useDeleteVarient,
  useEditVarient,
} from "@/hooks/mutations/useVarientMutations";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import LoadingSpinner from "@/components/common/LoadingSpinner";

const VariantList = ({ productId = "68820fe735353dc3039fb04b" }) => {
  const queryClient = useQueryClient();

  const { mutate: addVariant, error: adderror } = useAddVarient();
  const { mutate: editVariant, error: editError } = useEditVarient();
  const { mutate: deleteVarient } = useDeleteVarient();

  //   const [variants, setVariants] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [formData, setFormData] = useState({
    productId: "",
    ram: "",
    storage: "",
    price: "",
    stock: "",
    _id: "",
  });
  const [editMode, setEditMode] = useState(false); // track if we're editing
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const {
    data: variants,
    isError,
    error,
    isLoading: varientsLoading,
  } = useFetchVarients({ page, limit: 10, search });

  if (varientsLoading) return <LoadingSpinner fullscreen />;

  const pagination = variants?.pagination || { page: 1, pages: 1 };

  const handleEdit = ({ formData, variant }) => {
    const productId = variant.productId?._id;

    setFormData({
      productId: productId,
      ram: variant.ram,
      storage: variant.storage,
      price: variant.price,
      stock: variant.stock,
      _id: variant._id,
    });
    setEditMode(true);
    setOpenDialog(true);
  };
  const handleSearch = (value) => {
    setSearch(value.toLowerCase());
  };

  const handleEditSubmit = (formData) => {
    //   console.log("Edit:", formData);
    editVariant(
      { data: formData, id: formData._id },
      {
        onSuccess: () => {
          toast.success("Variant updated");
          setOpenDialog(false);
          setEditMode(false);
        },
      }
    );
  };
  const handleAdd = (data) => {
    const newVariant = { ...data };

    if (!newVariant._id) {
      delete newVariant._id;
    }

    addVariant(newVariant, {
      onSuccess: () => {
        queryClient.invalidateQueries(["variants"]);
        toast.success("variant added");
        setOpenDialog(false);
      },
      onError: (err) => {
        toast.error(
          err.response.data.message || err.message || "failed to add variant"
        );
        console.log(err);
      },
    });
  };

  const handleDelete = async (id) => {
    deleteVarient(id, {
      onSuccess: () => {
        toast.success("varient deleted");
        queryClient.invalidateQueries(["variants"]);
      },
    });
  };
  //   console.log(variants,isError,error)

  return (
    <>
      <DataTableWrapper
        title="Product Variants"
        columns={getVariantColumns({
          onEdit: handleEdit,
          onDelete: handleDelete,
        })}
        data={variants?.data ?? []}
        onAdd={() => {
          setFormData("");
          setOpenDialog(true);
          setEditMode(false);
        }}
        addButton="Add Variant"
        pagination={pagination}
        onPageChange={(newPage) => {
          setPage(newPage);
        }}
        filterFn={handleSearch}
      />
      <FormDialog
        open={openDialog}
        setOpen={setOpenDialog}
        title="Add Variant"
        formData={formData}
      >
        <VariantFormFields
          defaultValues={editMode ? formData : {}}
          onSubmit={editMode ? handleEditSubmit : handleAdd}
        />
      </FormDialog>
    </>
  );
};

export default VariantList;
