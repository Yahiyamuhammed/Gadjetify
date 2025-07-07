import React, { useState } from "react";
import Table from "../ListItem.jsx";
import { useNavigate } from "react-router";
import noImage from "@/assets/noImage.png";
// import Logo from "../assets/react.svg";
import { Pencil, Ban, DatabaseBackup } from "lucide-react";
import Modal from "@/components/admin/Modal";
import {
  useAddProduct,
  useUpdateProduct,
  useUnlistProduct,
  useRestoreProduct,
} from "@/hooks/mutations/useProductMutations";
import { toast } from "react-hot-toast";
import ProductAddForm from "./ProductAddForm.jsx";

const ProductList = ({ products }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const navigate = useNavigate();
  const [editingProduct, setEditingProduct] = useState("");
  const [isModalFormOpen, setIsModalFormOpen] = useState(false);
    const [serverError, setServerError] = useState("");
  

  const { mutate: unlistProduct } = useUnlistProduct();
  const { mutate: updateProduct } = useUpdateProduct();
  const { mutate: restoreProduct } = useRestoreProduct();

//   console.log("this is inside list ", products);

  const productColumns = [
    {
      key: "images",
      label: "Image",
      render: (img) => (
        <img
          src={img[0]?.secure_url || noImage}
          alt="Product"
          className="w-12 h-12 rounded-full object-cover"
        />
      ),
    },
    { key: "name", label: "Name" },
    { key: "model", label: "Model" },
    {
      key: "brand",
      label: "brand",
      render: (value) => value?.name || "Not Available",
    },
    // {
    //   key: "price",
    //   label: "Original Price",
    //   render: (value) => `₹${value.toLocaleString("en-IN")}`,
    // },
    {
      key: "offerPercentage",
      label: "Offer",
      render: (value) => `${value}%`,
    },
    {
      key: "codAvailable",
      label: "COD",
      render: (value) => (
        <span
          className={`px-2 py-1 rounded-full text-sm ${
            value ? "bg-green-100 text-green-700" : "bg-gray-200 text-gray-700"
          }`}
        >
          {value ? "Yes" : "No"}
        </span>
      ),
    },
    {
      key: "isListed",
      label: "Status",
      render: (value) => (
        <span
          className={`px-2 py-1 rounded-full text-sm ${
            value ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"
          }`}
        >
          {value ? "Active" : "Inactive"}
        </span>
      ),
    },
  ];

  const handleUnlistProduct = () => {
    console.log("thisis the selected product", selectedProduct);
    if (!selectedProduct) return;

    unlistProduct(selectedProduct._id, {
      onSuccess: () => {
        toast.success("Product status updated");
        setSelectedProduct(null);
        setIsModalOpen(false);
      },
      onError: (err) => {
        toast.error(err?.response?.data?.message || "Failed to update status");
      },
    });
  };

  const handleRestoreProduct = () => {
    if (!selectedProduct) return;

    restoreProduct(selectedProduct._id, {
      onSuccess: () => {
        toast.success("Product restored successfully");
        setSelectedProduct(null);
        setIsModalOpen(false);
      },
      onError: (err) => {
        toast.error(
          err?.response?.data?.message || " Failed to restore product"
        );
      },
    });
  };

  const handleEditProduct = (formData) => {
    if (!editingProduct) return;

    updateProduct(
      { id: editingProduct._id, updatedData: formData },
      {
        onSuccess: () => {
          toast.success("Product updated");
          setIsModalFormOpen(false);
          setEditingProduct(null);
        },
        onError: (err) => {
          toast.error(
            err?.response?.data?.message || "Failed to update product"
          );
        },
      }
    );
  };

  const getProductControls = (product) => [
    {
      action: () => {
        setSelectedProduct(product);
        setIsModalOpen(true);
      },
      style: "",
      icon: !product.isListed ? (
        <DatabaseBackup
          className="text-gray-500 hover:text-green-600"
          size={20}
        />
      ) : (
        <Ban className="text-gray-500 hover:text-red-600" size={20} />
      ),
    },
    {
      action: () => {
        setEditingProduct(product);
        setIsModalFormOpen(true);
        handleEditProduct;
      },
      style: "",
      icon: <Pencil className="text-gray-500 hover:text-blue-600" size={20} />,
    },
  ];

  return (
    <div className="w-full">
      {isModalOpen && (
        <Modal
          title="Are you sure?"
          description="This process cannot be undone..."
          controles={[
            {
              text: "Cancel",
              action: () => setIsModalOpen(false),
              style:
                "text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700",
            },
            {
              //   text: "Delete",
              //   action: handleUnlistProduct,
              //   style:
              //     "text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800",

              text: !selectedProduct?.isListed ? "Restore" : "Delete",
              action: !selectedProduct?.isListed
                ? handleRestoreProduct
                : handleUnlistProduct,
              style: !selectedProduct?.isListed
                ? "text-white bg-green-600 hover:bg-green-800"
                : "text-white bg-red-600 hover:bg-red-800",
            },
          ]}
        />
      )}
      <ProductAddForm
  isModalFormOpen={isModalFormOpen}
  onClose={() => {
    setIsModalFormOpen(false);
    setEditingProduct(null);
  }}
  onSubmit={handleEditProduct }
  serverError={serverError}
  initialValues={editingProduct}         // ✅ pass selected product
  mode={editingProduct ? "edit" : "add"} // ✅ for dynamic title/button
/>

      <Table
        items={products || []}
        columns={productColumns}
        textColor="text-skyBlue"
        className="w-full"
        controles={getProductControls}
      />
    </div>
  );
};

export default ProductList;
