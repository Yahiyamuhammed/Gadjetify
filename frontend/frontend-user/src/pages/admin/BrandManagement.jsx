import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import Modal from "../../components/admin/Modal";
import BrandList from "../../components/admin/brand/BrandList.jsx";
import BrandForm from "../../components/admin/brand/BrandAddForm.jsx";
import SearchBar from "../../components/SearchBar.jsx";
import { Ban, ChevronRight, DatabaseBackup, Home } from "lucide-react";
import { Link } from "react-router";
import { useFetchBrands } from "@/hooks/queries/useBrandQueries";


const BrandManagement = () => {
  const [isModalFormOpen, setIsModalFormOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");


  const {
  data: brands = [],
  isLoading: isBrandLoading,
  isError: isBrandError,
  error: brandError,
} = useFetchBrands();

//   const [brands, setBrands] = useState([
//     {
//       _id: "1",
//       name: "Apple",
//       website: "https://apple.com",
//       isSoftDeleted: false,
//     },
//     {
//       _id: "2",
//       name: "Samsung",
//       website: "https://samsung.com",
//       isSoftDeleted: false,
//     },
//     {
//       _id: "3",
//       name: "OnePlus",
//       website: "https://oneplus.com",
//       isSoftDeleted: true,
//     },
//   ]);

  const displayedBrands =
    searchTerm.trim() === ""
      ? brands
      : brands.filter(
          (brand) =>
            brand.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            brand.website.toLowerCase().includes(searchTerm.toLowerCase())
        );

  const handleAddBrand = (data) => {
    const newBrand = {
      _id: Date.now().toString(),
      ...data,
      isSoftDeleted: false,
    };
    setBrands((prev) => [...prev, newBrand]);
    setIsModalFormOpen(false);
  };

  const handleDeleteBrand = () => {
    if (selectedBrand) {
      const updated = brands.map((b) =>
        b._id === selectedBrand._id
          ? { ...b, isSoftDeleted: !b.isSoftDeleted }
          : b
      );
      setBrands(updated);
      setIsModalOpen(false);
      setSelectedBrand(null);
    }
  };

  const getBrandControles = (brand) => [
    {
      action: () => {
        setSelectedBrand(brand);
        setIsModalOpen(true);
      },
      style: "",
      icon: brand.isSoftDeleted ? (
        <DatabaseBackup
          className="text-gray-500 hover:text-green-600"
          size={20}
        />
      ) : (
        <Ban className="text-gray-500 hover:text-red-600" size={20} />
      ),
    },
  ];

  const modalControles = [
    {
      text: "Cancel",
      action: () => setIsModalOpen(false),
      style:
        "text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700",
    },
    {
      text: selectedBrand?.isSoftDeleted ? "Restore" : "Delete",
      action: handleDeleteBrand,
      style: selectedBrand?.isSoftDeleted
        ? "text-white bg-green-600 hover:bg-green-800"
        : "text-white bg-red-600 hover:bg-red-800",
    },
  ];

  return (
    <div className="p-4">
      <div className="flex items-center mb-6 text-sm text-gray-500">
        <Link to="/admin" className="flex items-center hover:text-blue-600">
          <Home size={16} className="mr-2" />
          Dashboard
        </Link>
        <ChevronRight size={16} className="mx-2" />
        <span className="text-gray-700">Brand Management</span>
      </div>

      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          Brand Management
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2">
          Manage and monitor all brands
        </p>
      </div>

      {isModalOpen && (
        <Modal
          title="Are you sure?"
          description="You should be very careful while handling this kind of deleting"
          controles={modalControles}
        />
      )}

      <BrandForm
        isModalFormOpen={isModalFormOpen}
        onClose={() => setIsModalFormOpen(false)}
        onSubmit={handleAddBrand}
      />

      <SearchBar searchTerm={setSearchTerm} />

      <div className="flex justify-end">
        <button
          onClick={() => setIsModalFormOpen(true)}
          className="px-4 py-2 rounded-lg bg-blue-600 text-white shadow-md hover:bg-blue-700 hover:shadow-lg flex items-center gap-2 transition duration-200"
        >
          <FontAwesomeIcon icon="fa-solid fa-plus" />
          Add Brand
        </button>
      </div>

      <div className="mt-4">
        <BrandList
          brands={displayedBrands}
          getBrandControles={getBrandControles}
          icon="fa-solid fa-copyright"
        />
      </div>
    </div>
  );
};

export default BrandManagement;
