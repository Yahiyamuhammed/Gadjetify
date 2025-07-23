import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import Modal from "../../components/admin/Modal";
import BrandList from "../../components/admin/brand/BrandList.jsx";
import BrandForm from "../../components/admin/brand/BrandAddForm.jsx";
import SearchBar from "../../components/SearchBar.jsx";
import { Pencil, Ban, ChevronRight, DatabaseBackup, Home } from "lucide-react";
import { Link } from "react-router";
import { useFetchBrands } from "@/hooks/queries/useBrandQueries";
import {useAddBrand,useDeleteBrand,useRestoreBrand,useEditBrand,} from "@/hooks/mutations/useBrandMutations";
import { toast } from "react-hot-toast";
import Pagination from "../../components/common/Pagination.jsx";

const BrandManagement = () => {
  const [isModalFormOpen, setIsModalFormOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [serverError, setServerError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  //   const [totalPages, setTotalPages] = useState(1);
  const [editingBrand, setEditingBrand] = useState(null);

  const pageSize = 10;

  const { mutate, isPending, error } = useAddBrand();
  const {
    mutate: deleteBrand,
    isPending: isDeletePending,
    error: errorDelete,
  } = useDeleteBrand();
  const { mutate: restoreBrand, isPending: isRestoring } = useRestoreBrand();
  const { mutate: editBrand, isPending: isEditing } = useEditBrand();


  const {
    data: brands = [],
    isLoading: isBrandLoading,
    isError: isBrandError,
    error: brandError,
  } = useFetchBrands({
    search: searchTerm,
    page: currentPage,
    limit: pageSize,
  });

  const brandList = brands?.brands || [];
  const totalPages = brands?.totalPages || 1;

  // console.log(' this inside the brand list', brands,searchTerm)


  const handleAddBrand = async (formData) => {
  mutate(formData, {
    onSuccess: () => {
      toast.success("Brand added successfully");
      setIsModalFormOpen(false);
    },
    onError: (err) => {
      const message = err?.response?.data?.error || "Failed to add brand";
      setServerError(message);
      toast.error(message);
    },
  });
};


 const handleEditBrand = async (formData) => {
    
  if (!editingBrand?._id) return;

  editBrand(
    {
      id: editingBrand._id,
      updatedData: formData,
    },
    {
      onSuccess: () => {
        toast.success("Brand updated successfully");
        setIsModalFormOpen(false);
        setEditingBrand(null);
      },
      onError: (err) => {
        const message = err?.response?.data?.error || "Update failed";
        setServerError(message);
        toast.error(message,error);

      },
    }
  );
};


  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleDeleteBrand = () => {
    if (!selectedBrand) return;

    deleteBrand(selectedBrand._id, {
      onSuccess: () => {
        toast.success("Brand status updated successfully");
        setIsModalOpen(false);
        setSelectedBrand(null);
      },
      onError: (err) => {
        const msg = err?.response?.data?.message || "Error updating brand";
        toast.error(msg);
      },
    });
  };

  const handleRestoreBrand = () => {
    if (!selectedBrand) return;
    // console.log('brand is restoring');

    restoreBrand(selectedBrand._id, {
      onSuccess: () => {
        toast.success("Brand restored successfully");
        setIsModalOpen(false);
        setSelectedBrand(null);
      },
      onError: (err) => {
        const msg = err?.response?.data?.message || "Failed to restore brand";
        toast.error(msg);
      },
    });
  };

  const getBrandControles = (brand) => [
    {
      action: () => {
        setSelectedBrand(brand);
        setIsModalOpen(true);
      },
      style: "",
      icon: brand.isDeleted ? (
        <DatabaseBackup
          className="text-gray-500 hover:text-green-600"
          size={20}
        />
      ) : (
        <Ban className="text-gray-500 hover:text-red-600" size={20} />
      ),
    },
    ,
    {
      action: () => {
        setEditingBrand(brand); // new state for edit
        setIsModalFormOpen(true); // open form modal for editing
      },
      style: "",
      icon: <Pencil className="text-gray-500 hover:text-blue-600" size={20} />,
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
      text: selectedBrand?.isDeleted ? "Restore" : "Delete",
      action: selectedBrand?.isDeleted ? handleRestoreBrand : handleDeleteBrand,
      style: selectedBrand?.isDeleted
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
        <h1 className="text-2xl font-bold text-gray-800 ">
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
        onClose={() => {
          setIsModalFormOpen(false);
          setEditingBrand(null); 
        }}
        onSubmit={editingBrand ? handleEditBrand:handleAddBrand  }
        serverError={serverError}
        initialValues={editingBrand || {}}
        mode={editingBrand ? "edit" : "add"}
      />

      <SearchBar searchTerm={setSearchTerm} />

      <div className="flex justify-end">
        <button
          onClick={() => setIsModalFormOpen(true)}
          className="px-4 py-2 rounded-lg bg-blue-600 text-white shadow-md hover:bg-blue-700 hover:shadow-lg flex items-center gap-2 transition duration-200"
        >
          {/* <FontAwesomeIcon icon="fa-solid fa-plus" /> */}
          Add Brand
        </button>
      </div>

      <div className="mt-4">
        <BrandList
          brands={brandList}
          getBrandControles={getBrandControles}
          icon="fa-solid fa-copyright"
        />
      </div>
      {/* Pagination */}
      <div className="flex justify-center mt-5">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default BrandManagement;
