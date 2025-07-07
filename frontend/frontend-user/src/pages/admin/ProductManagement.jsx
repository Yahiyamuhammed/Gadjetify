import React, { useEffect, useState } from "react";
import { ChevronRight, Eye, Home } from "lucide-react";
import { Link } from "react-router";
import ProductAddForm from "../../components/admin/product/ProductAddForm.jsx";
import SearchBar from "../../components/SearchBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ProductList from "../../components/admin/product/ProductList.jsx";
// import Button from "../../components/ui/Button";
import Pagination from "../../components/common/Pagination.jsx";
// import { RotatingLines } from "react-loader-spinner";
// import { successToast, errorToast } from "../../components/toast/index.js"; // 🔗 API PLACEHOLDER

const ProductManagement = () => {
  const [isModalFormOpen, setIsModalFormOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 8;
  const [categoryFilter, setCategoryFilter] = useState("");

  // 🔗 API PLACEHOLDER: Mock product data (replace this with fetched data later)
  const [products, setProducts] = useState([
    {
      _id: "1",
      name: "iPhone 15 Pro",
      model: "A3101",
      categoryDetails: { name: "Smartphones" },
      price: 129999,
      offerPercent: 10,
      stock: 15,
      isSoftDelete: false,
      images: [{ secure_url: "https://via.placeholder.com/100" }],
    },
    {
      _id: "2",
      name: "Samsung Galaxy S23",
      model: "SM-S911B",
      categoryDetails: { name: "Smartphones" },
      price: 109999,
      offerPercent: 15,
      stock: 7,
      isSoftDelete: false,
      images: [{ secure_url: "https://via.placeholder.com/100" }],
    },
    {
      _id: "3",
      name: "Redmi Note 13",
      model: "RN13",
      categoryDetails: { name: "Smartphones" },
      price: 17999,
      offerPercent: 5,
      stock: 0,
      isSoftDelete: true,
      images: [],
    },
  ]);

  // 🔗 API PLACEHOLDER: Mock category data
  const [categories] = useState([
    { _id: "c1", name: "Smartphones" },
    { _id: "c2", name: "Laptops" },
    { _id: "c3", name: "Accessories" },
  ]);

  const totalCount = products.length;

  useEffect(() => {
    if (totalCount) {
      setTotalPages(Math.ceil(totalCount / pageSize));
    }
  }, [totalCount]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // 🔗 API PLACEHOLDER: Replace this when connecting actual add product API
  const handleAddProduct = async (data) => {
    console.log('product adding');
    
    try {
      // await addProduct(data).unwrap(); 
      // successToast("Product added successfully");
      console.log("Product added:", data);
      setIsModalFormOpen(false);
    } catch (error) {
      // errorToast("Error adding product");
      console.error(error);
    }
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
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
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
            <option value="all">All Products</option>
            <option value="active">Active Products</option>
            <option value="inactive">Inactive Products</option>
            <option value="low stock">Low Stock</option>
          </select>

          <select
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
          </select>

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
      <ProductList products={displayedProduct} icon="fa-solid fa-box" />

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
