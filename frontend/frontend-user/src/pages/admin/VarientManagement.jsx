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

const VariantList = ({ productId = "68820fe735353dc3039fb04b" }) => {
  const queryClient = useQueryClient();

  const { mutate: addVariant, error: adderror } = useAddVarient();
  const { mutate: editVariant, error: editError } = useEditVarient();
  const { mutate: deleteVarient } = useDeleteVarient();
  const { data: variants, isError, error } = useFetchVarients();

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

  //   console.log('this sis the data',variants)

  const handleEdit = ({ formData, variant }) => {
    const productId = variant.productId?._id;

    console.log("this is variant", variant, productId);
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

  const handleEditSubmit = (formData) => {
    console.log("this is the datain submit", formData.formData);

    //   console.log("Edit:", formData);
    editVariant(
      { data: formData.formData, id: formData.formData._id },
      {
        onSuccess: () => {
          toast.success("address updated");
          setOpenDialog(false);
          setEditMode(false);
        },
      }
    );
  };
  const handleAdd = (data) => {
    console.log("variant added", data.formData);

    const newVariant = { ...formData };

    
    if (!newVariant._id) {
      delete newVariant._id;
    }

    console.log(newVariant,'new varient')

    addVariant(newVariant, {
      onSuccess: () => {
        queryClient.invalidateQueries(["variants"]);
        console.log("variant added");
        setOpenDialog(false);
      },
      onError: (err) => {
        console.log(err);
      },
    });
  };

  const handleDelete = async (id) => {
    console.log(id, "this is the id");
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
        data={variants ?? []}
        onAdd={() => setOpenDialog(true)}
        addButton="Add Variant"
      />
      <FormDialog
        open={openDialog}
        setOpen={setOpenDialog}
        title="Add Variant"
        onSubmit={editMode ? handleEditSubmit : handleAdd}
        formData={formData}
      >
        <VariantFormFields formData={formData} setFormData={setFormData} />
      </FormDialog>
    </>
  );
};

export default VariantList;
