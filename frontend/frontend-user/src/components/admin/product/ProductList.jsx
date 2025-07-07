import React, { useState } from "react";
import Table from "../ListItem.jsx";
import { useNavigate } from "react-router";
import noImage from "@/assets/noImage.png";
// import Logo from "../assets/react.svg";
import { Eye } from "lucide-react";

const ProductList = ({  products}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const navigate = useNavigate();

  console.log('this is inside list ', products);
  
   
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
      key: "isDeleted",
      label: "Status",
      render: (value) => (
        <span
          className={`px-2 py-1 rounded-full text-sm ${
            !value ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"
          }`}
        >
          {!value ? "Active" : "Inactive"}
        </span>
      ),
    },
  ];

  const getProductControls = (product) => {
    return [
      {
        action: () => {
          navigate(`/admin/product/${product._id}`);
        },
        style: "",
        icon: <Eye className="text-gray-500 hover:text-blue-600" />,
      },
    ];
  };

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
              text: "Delete",
              action: handleDeleteProduct,
              style:
                "text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800",
            },
          ]}
        />
      )}
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
