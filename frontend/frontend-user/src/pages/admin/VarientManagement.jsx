import { useEffect, useState } from "react";
import axios from "axios";
import DataTableWrapper from "@/components/shared/DataTableWrapper";
import { getVariantColumns } from "@/components/admin/varient/variantColumns";
import { api } from "@/utils/api";

const VariantList = ({ productId='6887c86b42b36c7ee8a3c229' }) => {
  const [variants, setVariants] = useState([]);

  const fetchVariants = async () => {
    try {
      const res = await api.get(`/admin/variants/${productId}`);
      setVariants(res.data);
    } catch (err) {
      console.error(err);
    }
  };

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
    <DataTableWrapper
      title="Product Variants"
      columns={getVariantColumns({ onEdit: handleEdit, onDelete: handleDelete })}
      data={variants}
    />
  );
};

export default VariantList;
