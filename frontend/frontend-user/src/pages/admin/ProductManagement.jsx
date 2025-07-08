import React, { useEffect, useState } from "react";
import { ChevronRight, Eye, Home } from "lucide-react";
import { Link } from "react-router";
import ProductAddForm from "../../components/admin/product/ProductAddForm.jsx";
import SearchBar from "../../components/SearchBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ProductList from "../../components/admin/product/ProductList.jsx";
// import Button from "../../components/ui/Button";
import Pagination from "../../components/common/Pagination.jsx";

import { toast } from "react-hot-toast";

import { useAddProduct } from "../../hooks/mutations/useProductMutations.js";
import { useFetchProducts } from "@/hooks/queries/useProductQueries";

// import { RotatingLines } from "react-loader-spinner";
// import { successToast, errorToast } from "../../components/toast/index.js"; // 🔗 API PLACEHOLDER

const ProductManagement = () => {
  const [isModalFormOpen, setIsModalFormOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
  const pageSize = 8;
  const [categoryFilter, setCategoryFilter] = useState("");
  const [serverError, setServerError] = useState("");

  const { mutate, isPending, error } = useAddProduct();

  const {
    data: productsData,
    isLoading,
    isError,
    error: fetchError,
  } = useFetchProducts({ page: currentPage,limit: pageSize,search: searchTerm,brand: "",isDeleted:filter, });

//   console.log('this is the raw', productsData)
  const products = productsData?.products || [];
  // const products = productsData?.products || [];
  const totalPages = productsData?.totalPages || 1;
  const currentPageFromApi = productsData?.currentPage || 1;

  // const totalCount = productsData?.totalCount || 0;

  useEffect(() => {
//   if (currentPageFromApi !== currentPage) {
    setCurrentPage(currentPageFromApi);
//   }
}, [currentPageFromApi]);

//   console.log(products);

  const totalCount = products.length;

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleAddProduct = async (formData) => {
    setServerError("");
    mutate(formData, {
      onSuccess: (data) => {
        // console.log(" Product Added Successfully:", data);
        toast.success("Product added successfully");
        setIsModalFormOpen(false);
      },
      onError: (err) => {
        
        const message =
          err?.response?.data?.message || err.message || "Something went wrong";
        console.error("Product Add Error:", message);
        toast.error(`Something went wrong!, ${message}`);

        setServerError(message);
      },
    });
  };

  // 🔍 Filter logic
  const displayedProduct =
    searchTerm.trim() === ""
      ? products || []
      : products?.filter((product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase())
        ) || [];

  return (
    <div className="p-4">
      {/* Breadcrumbs */}
      <div className="flex items-center mb-6 text-sm text-gray-500">
        <Link to="/admin" className="flex items-center hover:text-blue-600">
          <Home size={16} className="mr-2" />
          Dashboard
        </Link>
        <ChevronRight size={16} className="mx-2" />
        <span className="text-gray-700">Product Management</span>
      </div>

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 ">
          Product Management
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2">
          Manage and monitor your product inventory
        </p>
      </div>

      {/* Modal Form */}
      <ProductAddForm
        isModalFormOpen={isModalFormOpen}
        onClose={() => setIsModalFormOpen(false)}
        onSubmit={handleAddProduct}
        serverError={serverError}
      />

      <div className="mb-5">
        <SearchBar searchTerm={setSearchTerm} />
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-end mb-6 gap-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <select
            className="px-1 py-2 border border-gray-300 rounded-md dark:bg-darkBackground"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="null">All Products</option>
            <option value="false">Active Products</option>
            <option value="true">Inactive Products</option>
            {/* <option value="low stock">Low Stock</option> */}
          </select>

          {/* <select
            className="px-1 py-2 border border-gray-300 rounded-md dark:bg-darkBackground"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="">All</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select> */}

          <button
            onClick={() => setIsModalFormOpen(true)}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white shadow-md hover:bg-blue-700 flex items-center gap-2"
          >
            <FontAwesomeIcon icon="fa-solid fa-plus" />
            Add Product
          </button>
        </div>
      </div>

      {/* Product List */}
      <ProductList products={products} icon="fa-solid fa-box" />

      {/* Pagination */}
      <div className="flex justify-center mt-5">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>

      {/* Loader (can be removed if no API) */}
      {/* 
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
        <RotatingLines
          visible={true}
          height="50"
          width="50"
          color="grey"
          strokeColor="#fff"
          strokeWidth="2"
          animationDuration="8"
        />
      </div>
      */}
    </div>
  );
};

export default ProductManagement;
