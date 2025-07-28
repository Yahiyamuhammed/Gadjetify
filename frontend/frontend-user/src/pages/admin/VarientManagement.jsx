import { useEffect, useState } from "react";
import axios from "axios";
import { getVariantColumns } from "@/components/admin/varient/variantColumns";
import { api } from "@/utils/api";
import DataTableWrapper from "@/components/admin/DataTableWrapper";

const VariantList = ({ productId='68820fe735353dc3039fb04b' }) => {
  const [variants, setVariants] = useState([]);

  const fetchVariants = async () => {
    try {
      const res = await api.get(`/admin/variants/${productId}`);
      setVariants(res.data);
      
    } catch (err) {
        console.error(err);
    }
};
// console.log(variants)

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
