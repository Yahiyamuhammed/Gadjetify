import React, { useState } from "react";
import { Ban, ChevronRight, DatabaseBackup, Eye, Home } from "lucide-react";
import SearchBar from "../../components/SearchBar";
import ListItem from "../../components/admin/ListItem";
import Modal from "../../components/admin/Modal";
import noImage from "../../assets/noImage.png";
import { Link } from "react-router";

import { useFetchUsers } from "@/hooks/queries/useUserQueries";
import { useToggleUserBlock } from "@/hooks/mutations/useUserMutations";
import toast from "react-hot-toast";
import Pagination from "../../components/common/Pagination";

const UserManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [serverError, setServerError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, isError, } = useFetchUsers({
    search: searchTerm,
    page: currentPage,
    limit: 5,
  });
  const { mutate: toggleBlock } = useToggleUserBlock();
const totalPages = data?.totalPages || 1;
  

  const users = data?.users || [];


  
  
const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
  const handleToggleBlock = () => {
    if (!selectedUser) return;

    

    toggleBlock(selectedUser._id, {
      onSuccess: (data) => {
        toast.success(data.message, data.error);
        setSelectedUser(null);
        setIsModalOpen(false);
        // queryClient.invalidateQueries(["users"]);
      },
      onError: (err) => {
        toast.error(err?.response?.data?.message || "Block/Unblock failed");
      },
    });
  };

  const getUserControls = (user) => [
    // {
    //   action: () => setSelectedUser(user),
    //   style: "",
    //   icon: <Eye className="text-gray-500 hover:text-blue-600" />,
    // },
    {
      action: () => {
        setSelectedUser(user);
        setIsModalOpen(true);
      },
      style: "",
      icon: user.isBlocked ? (
        <DatabaseBackup
          className="text-gray-500 hover:text-green-600"
          size={20}
        />
      ) : (
        <Ban className="text-gray-500 hover:text-red-600" size={20} />
      ),
    },
  ];

  const userColumns = [
    {
      label: "Image",
      key: "picture",
      render: (img) => (
        <img
          src={img?.secure_url || noImage}
          alt="User"
          className="w-12 h-12 rounded-full object-cover"
        />
      ),
    },
    {
      key: "name",
      label: "Name",
      render: (value) => value,
    },
    {
      key: "email",
      label: "Email",
      render: (value) => value,
    },
    {
      key: "createdAt",
      label: "Join date",
      render: (value) => {
        const date = new Date(value);
        return date.toLocaleString();
      },
    },
    {
      key: "isVerified",
      label: "Email Verified",
      render: (value) => (
        <span
          className={`px-2 py-1 rounded-full text-sm ${
            value ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"
          }`}
        >
          {value ? "Verified" : "Unverified "}
        </span>
      ),
    },
    {
      key: "isBlocked",
      label: "Block status",
      render: (value) => (
        <span
          className={`px-2 py-1 rounded-full text-sm ${
            !value ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"
          }`}
        >
          {!value ? "Active " : "Blocked"}
        </span>
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
      text: selectedUser?.isBlocked ? "Unblock" : "Block",
      action: handleToggleBlock,
      style: selectedUser?.isBlocked
        ? "text-white bg-green-600 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800"
        : "text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800",
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
        <span className="text-gray-700">User Management</span>
      </div>

      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 ">
          User Management
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2">
          Manage and monitor user accounts
        </p>
      </div>

      <div className="mb-6">
        <SearchBar searchTerm={setSearchTerm} />
      </div>

      {isModalOpen && (
        <Modal
          title={selectedUser?.isBlocked ? "Unblock User?" : "Block User?"}
          description={
            selectedUser?.isBlocked
              ? "Are you sure you want to unblock this user?"
              : "Are you sure you want to block this user?"
          }
          controles={modalControles}
        />
      )}

      

      <ListItem
        items={users}
        columns={userColumns}
        textColor="text-skyBlue"
        controles={getUserControls}
      />
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

export default UserManagement;
