import { useEffect, useState } from "react";
import axios from "axios";
import { getVariantColumns } from "@/components/admin/varient/variantColumns";
import { api } from "@/utils/api";
import DataTableWrapper from "@/components/admin/DataTableWrapper";
import FormDialog from "@/components/common/FormDialog";
import VariantFormFields from "@/components/admin/varient/VariantFormFields";

const VariantList = ({ productId = "68820fe735353dc3039fb04b" }) => {
  const [variants, setVariants] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [formData, setFormData] = useState({
    productId,
    ram: "",
    storage: "",
    price: "",
    stock: "",
  });

  const fetchVariants = async () => {
    try {
      const res = await api.get(`/admin/variants`);
      setVariants(res.data);

    } catch (err) {
      console.error(err);
    }
  };
  console.log(variants)

  const handleEdit = (variant) => {
    console.log("Edit:", variant);
  };

  const handleDelete = async (id) => {
    try {
      await axios.patch(`/api/variants/${id}/delete`);
      fetchVariants();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchVariants();
  }, [productId]);

  return (
    <>
      <DataTableWrapper
        title="Product Variants"
        columns={getVariantColumns({
          onEdit: handleEdit,
          onDelete: handleDelete,
        })}
        data={variants}
        onAdd={() => setOpenDialog(true)}
      />
      <FormDialog
        open={openDialog}
        setOpen={setOpenDialog}
        title="Add Variant"
        onSubmit={0}
      >
        <VariantFormFields formData={formData} setFormData={setFormData} />
      </FormDialog>
    </>
  );
};

export default VariantList;
