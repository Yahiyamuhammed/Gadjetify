import React, { useState, useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Home,
  MapPin,
  PlusCircle,
  Edit,
  Trash2,
  Star,
  User,
  Phone,
  Flag,
  Building2,
  XCircle,
  AlertTriangle,
  CheckCircle,
  MoreVertical,
} from "lucide-react";
import EditAddressDialog from "./address/EditAddressDialog";

// Main App Component
function App() {
  // Initial dummy data for addresses
  const [addresses, setAddresses] = useState([
    {
      id: "1",
      name: "Home Address",
      fullName: "Alex Johnson",
      streetAddress: "123 Main Street, Apt 4B",
      city: "San Francisco",
      state: "CA",
      zipCode: "94105",
      country: "United States",
      phone: "(415) 555-0123",
      isPrimary: true,
    },
    {
      id: "2",
      name: "Work Address",
      fullName: "Alex Johnson",
      streetAddress: "456 Tech Boulevard, Suite 1200",
      city: "San Francisco",
      state: "CA",
      zipCode: "94103",
      country: "United States",
      phone: "(415) 555-9876",
      isPrimary: false,
    },
    {
      id: "3",
      name: "Vacation Home",
      fullName: "Alex & Taylor Johnson",
      streetAddress: "789 Ocean Drive",
      city: "Miami Beach",
      state: "FL",
      zipCode: "33139",
      country: "United States",
      phone: "(305) 555-4567",
      isPrimary: false,
    },
  ]);

  // State for modal visibility
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // State to hold the address being edited (null for new address)
  const [editingAddress, setEditingAddress] = useState(null);

  // State to hold the ID of the address to be deleted
  const [addressToDeleteId, setAddressToDeleteId] = useState(null);

  // State for form inputs in the edit/add modal
  const [formState, setFormState] = useState({
    name: "",
    fullName: "",
    streetAddress: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    phone: "",
    isPrimary: false,
  });

  // State for toast notifications
  const [toast, setToast] = useState({
    message: "",
    type: "success",
    show: false,
  });

  // Effect to populate form when an address is selected for editing
  useEffect(() => {
    if (editingAddress) {
      setFormState({
        name: editingAddress.name,
        fullName: editingAddress.fullName,
        streetAddress: editingAddress.streetAddress,
        city: editingAddress.city,
        state: editingAddress.state,
        zipCode: editingAddress.zipCode,
        country: editingAddress.country,
        phone: editingAddress.phone,
        isPrimary: editingAddress.isPrimary,
      });
    } else {
      // Reset form for adding a new address
      setFormState({
        name: "",
        fullName: "",
        streetAddress: "",
        city: "",
        state: "",
        zipCode: "",
        country: "",
        phone: "",
        isPrimary: false,
      });
    }
  }, [editingAddress]);

  /**
   * Displays a toast notification.
   * @param {string} message - The message to display.
   * @param {'success' | 'error'} type - The type of toast (success or error).
   */
  const showToast = (message, type = "success") => {
    setToast({ message, type, show: true });
    // Hide toast after 3 seconds
    setTimeout(() => {
      setToast((prev) => ({ ...prev, show: false }));
    }, 3000);
  };

  /**
   * Opens the edit/add address modal.
   * @param {object | null} address - The address object to edit, or null for a new address.
   */
  const openEditModal = (address = null) => {
    setEditingAddress(address);
    setIsEditModalOpen(true);
  };

  /**
   * Opens the delete confirmation modal.
   * @param {string} id - The ID of the address to be deleted.
   */
  const openDeleteModal = (id) => {
    setAddressToDeleteId(id);
    setIsDeleteModalOpen(true);
  };

  /**
   * Closes all modals and resets related states.
   */
  const closeAllModals = () => {
    setIsEditModalOpen(false);
    setIsDeleteModalOpen(false);
    setEditingAddress(null);
    setAddressToDeleteId(null);
  };

  /**
   * Handles changes in form input fields.
   * @param {Event} e - The change event.
   */
  const handleInputChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormState((prev) => ({
      ...prev,
      [id]: type === "checkbox" ? checked : value,
    }));
  };

  /**
   * Handles saving an address (either adding new or updating existing).
   */
  const handleSaveAddress = () => {
    // Basic validation
    if (
      !formState.name ||
      !formState.fullName ||
      !formState.streetAddress ||
      !formState.city ||
      !formState.state ||
      !formState.zipCode ||
      !formState.country ||
      !formState.phone
    ) {
      showToast("Please fill in all required fields.", "error");
      return;
    }

    let updatedAddresses;
    if (editingAddress) {
      // Update existing address
      updatedAddresses = addresses.map((addr) =>
        addr.id === editingAddress.id
          ? { ...formState, id: editingAddress.id }
          : addr
      );
    } else {
      // Add new address with a unique ID
      const newId = (
        addresses.length > 0
          ? Math.max(...addresses.map((a) => parseInt(a.id))) + 1
          : 1
      ).toString();
      updatedAddresses = [...addresses, { ...formState, id: newId }];
    }

    // Logic to ensure only one address is primary
    if (formState.isPrimary) {
      updatedAddresses = updatedAddresses.map((addr) => ({
        ...addr,
        isPrimary:
          addr.id ===
          (editingAddress
            ? editingAddress.id
            : updatedAddresses[updatedAddresses.length - 1].id),
      }));
    }

    setAddresses(updatedAddresses);
    closeAllModals();
    showToast(
      editingAddress
        ? "Address updated successfully!"
        : "Address added successfully!"
    );
  };

  /**
   * Handles deleting an address.
   */
  const handleDeleteAddress = () => {
    // Filter out the address to be deleted
    const newAddresses = addresses.filter(
      (addr) => addr.id !== addressToDeleteId
    );

    // If the deleted address was primary, and there are other addresses, set the first one as primary
    if (
      addresses.find((addr) => addr.id === addressToDeleteId)?.isPrimary &&
      newAddresses.length > 0
    ) {
      newAddresses[0].isPrimary = true;
    }

    setAddresses(newAddresses);
    closeAllModals();
    showToast("Address deleted successfully!");
  };

  /**
   * Sets a specific address as primary.
   * @param {string} id - The ID of the address to set as primary.
   */
  const handleSetPrimary = (id) => {
    const updatedAddresses = addresses.map((addr) => ({
      ...addr,
      isPrimary: addr.id === id,
    }));
    setAddresses(updatedAddresses);
    showToast(`Address set as primary successfully!`);
  };

  return (
    <div className="container mx-auto w-full max-w-7xl px-4 py-8 font-inter">
      {/* Address Manager Section */}
      {/* <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden"> */}
      <Card className="overflow-hidden border shadow-xl rounded-3xl py-0">
        <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50 border-b p-8 ">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <h2 className="text-3xl font-bold text-slate-900 flex items-center gap-4">
              <MapPin className="text-indigo-600 w-8 h-8" />
              Your Saved Addresses
            </h2>

            {/* <Button
              onClick={openEditModal}
              className="relative group flex items-center gap-3 px-7 py-4 bg-gradient-to-r from-indigo-600 to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-400 ease-in-out"
            >
              <PlusCircle className="w-5 h-5" />
              Add New Address
              <span className="absolute inset-0 bg-gradient-to-r from-indigo-700 to-purple-800 opacity-0 group-hover:opacity-100 transition-opacity duration-400 ease-in-out -z-10 rounded-xl" />
            </Button> */}

            <EditAddressDialog
                          address={''}
                          onSubmit={() => 0}
                          trigger={
                           
                              // <Edit className="w-4 h-4 mr-2 text-amber-600" />
                              <Button >
                                <PlusCircle className="w-5 h-5" />
                                Add New Address

                              </Button>
                            
                          }
                        />
          </div>
        </CardHeader>

        {/* If you need to show address list below, include it inside CardContent */}
        <CardContent className="p-6">
          {/* Address list goes here */}

          {/* Address List */}
          <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {addresses.length === 0 ? (
              // Empty state message
              <Card className="col-span-full text-center py-20 px-6">
                <MapPin className="w-24 h-24 mx-auto mb-8 text-slate-300 opacity-50" />
                <h3 className="text-4xl font-extrabold mb-4 text-slate-900">
                  No Addresses Found
                </h3>
                <p className="max-w-xl mx-auto text-lg text-slate-500 leading-relaxed">
                  It looks like you haven't added any addresses yet.
                  <br />
                  Click{" "}
                  <span className="font-semibold text-indigo-600">
                    "Add New Address"
                  </span>{" "}
                  to get started!
                </p>
              </Card>
            ) : (
              // Render address cards dynamically
              addresses.map((address, index) => (
                <Card
                  className={`relative overflow-hidden flex flex-col h-full p-8 pr-2 border transition-all duration-300 hover:border-indigo-300 hover:-translate-y-1 hover:shadow-lg animate-[cardEnter_0.6s_ease-out_forwards]`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {address.isPrimary && (
                    <>
                      <div className="absolute top-0 right-0 w-0 h-0 border-t-[70px] border-l-[70px] border-t-indigo-600 border-l-transparent"></div>
                      <Star className="absolute top-3 right-3 text-white w-5 h-5 z-20" />
                    </>
                  )}

                  <CardContent className="flex-grow mb-6 px-8">
                    <h3 className="text-2xl font-extrabold mb-5 flex items-center gap-3">
                      {address.name.toLowerCase().includes("home") && (
                        <Home className="text-indigo-600 w-6 h-6" />
                      )}
                      {address.name.toLowerCase().includes("work") && (
                        <Building2 className="text-indigo-600 w-6 h-6" />
                      )}
                      {address.name.toLowerCase().includes("vacation") && (
                        <Star className="text-indigo-600 w-6 h-6" />
                      )}
                      {!["home", "work", "vacation"].some((type) =>
                        address.name.toLowerCase().includes(type)
                      ) && <MapPin className="text-indigo-600 w-6 h-6" />}
                      {address.name}
                    </h3>

                    <div className="space-y-3 text-slate-600">
                      <div className="flex items-start gap-3">
                        <User className="mt-1 text-indigo-600 w-5 h-5" />
                        {address.fullName}
                      </div>
                      <div className="flex items-start gap-3">
                        <MapPin className="mt-1 text-indigo-600 w-5 h-5" />
                        {address.streetAddress}
                      </div>
                      <div className="flex items-start gap-3">
                        <Building2 className="mt-1 text-indigo-600 w-5 h-5" />
                        {address.city}, {address.state} {address.zipCode}
                      </div>
                      <div className="flex items-start gap-3">
                        <Flag className="mt-1 text-indigo-600 w-5 h-5" />
                        {address.country}
                      </div>
                      <div className="flex items-start gap-3">
                        <Phone className="mt-1 text-indigo-600 w-5 h-5" />
                        {address.phone}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className=" flex justify-end p-0">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="outline"
                        >
                          More options
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        {!address.isPrimary && (
                          <DropdownMenuItem
                            onClick={() => handleSetPrimary(address.id)}
                            className="cursor-pointer"
                          >
                            <Star className="w-4 h-4 mr-2 text-indigo-600" />
                            Set as Primary
                          </DropdownMenuItem>
                        )}
                        {/* Edit option with dialog */}
                        <EditAddressDialog
                          address={address}
                          onSubmit={() => 0}
                          trigger={
                            <DropdownMenuItem
                              className="cursor-pointer"
                              onSelect={(e) => e.preventDefault()}
                            >
                              <Edit className="w-4 h-4 mr-2 text-amber-600" />
                              Edit
                            </DropdownMenuItem>
                          }
                        />

                        <DropdownMenuItem
                          onClick={() => openDeleteModal(address.id)}
                          className="cursor-pointer text-red-600"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </CardFooter>
                </Card>
              ))
            )}
          </div>
        </CardContent>
      </Card>
      {/* </div> */}

      {/* Edit/Add Address Modal */}
      {isEditModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[1000] opacity-100 visible backdrop-blur-sm transition-all duration-300 ease-in-out"
          onClick={(e) => e.target === e.currentTarget && closeAllModals()} // Close on overlay click
        >
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg transform translate-y-0 transition-transform duration-300 ease-in-out">
            <div className="flex justify-between items-center p-6 border-b border-slate-200">
              <h3 className="text-2xl font-bold flex items-center gap-3">
                {editingAddress ? (
                  <Edit className="w-6 h-6" />
                ) : (
                  <PlusCircle className="w-6 h-6" />
                )}
                {editingAddress ? "Edit Address" : "Add New Address"}
              </h3>
              <button
                onClick={closeAllModals}
                className="text-slate-500 hover:text-slate-700 text-2xl cursor-pointer"
              >
                <XCircle className="w-7 h-7" />
              </button>
            </div>
            <div className="p-6">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSaveAddress();
                }}
              >
                <div className="mb-5">
                  <label
                    htmlFor="name"
                    className="block mb-2 font-medium text-slate-800"
                  >
                    Address Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl text-base focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-colors duration-300"
                    value={formState.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="mb-5">
                  <label
                    htmlFor="fullName"
                    className="block mb-2 font-medium text-slate-800"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl text-base focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-colors duration-300"
                    value={formState.fullName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="mb-5">
                  <label
                    htmlFor="streetAddress"
                    className="block mb-2 font-medium text-slate-800"
                  >
                    Street Address
                  </label>
                  <input
                    type="text"
                    id="streetAddress"
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl text-base focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-colors duration-300"
                    value={formState.streetAddress}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="mb-5">
                  <label
                    htmlFor="city"
                    className="block mb-2 font-medium text-slate-800"
                  >
                    City
                  </label>
                  <input
                    type="text"
                    id="city"
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl text-base focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-colors duration-300"
                    value={formState.city}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="mb-5">
                  <label
                    htmlFor="state"
                    className="block mb-2 font-medium text-slate-800"
                  >
                    State
                  </label>
                  <input
                    type="text"
                    id="state"
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl text-base focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-colors duration-300"
                    value={formState.state}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="mb-5">
                  <label
                    htmlFor="zipCode"
                    className="block mb-2 font-medium text-slate-800"
                  >
                    ZIP Code
                  </label>
                  <input
                    type="text"
                    id="zipCode"
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl text-base focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-colors duration-300"
                    value={formState.zipCode}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="mb-5">
                  <label
                    htmlFor="country"
                    className="block mb-2 font-medium text-slate-800"
                  >
                    Country
                  </label>
                  <input
                    type="text"
                    id="country"
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl text-base focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-colors duration-300"
                    value={formState.country}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="mb-5">
                  <label
                    htmlFor="phone"
                    className="block mb-2 font-medium text-slate-800"
                  >
                    Phone
                  </label>
                  <input
                    type="text"
                    id="phone"
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl text-base focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-colors duration-300"
                    value={formState.phone}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="isPrimary"
                    className="w-4 h-4 text-indigo-600 border-slate-300 rounded focus:ring-indigo-500"
                    checked={formState.isPrimary}
                    onChange={handleInputChange}
                  />
                  <label
                    htmlFor="isPrimary"
                    className="font-medium text-slate-800"
                  >
                    Set as primary address
                  </label>
                </div>
              </form>
            </div>
            <div className="flex justify-end gap-3 p-6 border-t border-slate-200">
              <button
                onClick={closeAllModals}
                className="relative overflow-hidden z-10 flex items-center gap-2 px-5 py-3 bg-slate-100 text-slate-800 font-semibold rounded-xl hover:bg-slate-200 hover:-translate-y-1 transition-all duration-400 ease-in-out group"
              >
                Cancel
                <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-400 ease-in-out -z-10"></span>
              </button>
              <button
                onClick={handleSaveAddress}
                className="relative overflow-hidden z-10 flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-indigo-600 to-purple-700 text-white font-semibold rounded-xl shadow-md shadow-indigo-300 hover:shadow-lg hover:-translate-y-1 transition-all duration-400 ease-in-out group"
              >
                {editingAddress ? "Save Changes" : "Add Address"}
                <span className="absolute inset-0 bg-gradient-to-r from-indigo-700 to-purple-800 opacity-0 group-hover:opacity-100 transition-opacity duration-400 ease-in-out -z-10"></span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[1000] opacity-100 visible backdrop-blur-sm transition-all duration-300 ease-in-out"
          onClick={(e) => e.target === e.currentTarget && closeAllModals()} // Close on overlay click
        >
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md transform translate-y-0 transition-transform duration-300 ease-in-out">
            <div className="flex justify-between items-center p-6 border-b border-slate-200">
              <h3 className="text-2xl font-bold flex items-center gap-3 text-red-600">
                <AlertTriangle className="w-6 h-6" /> Confirm Deletion
              </h3>
              <button
                onClick={closeAllModals}
                className="text-slate-500 hover:text-slate-700 text-2xl cursor-pointer"
              >
                <XCircle className="w-7 h-7" />
              </button>
            </div>
            <div className="text-center p-10">
              <Trash2 className="w-20 h-20 mx-auto mb-8 text-red-500" />
              <h3 className="text-3xl font-extrabold mb-5 text-slate-900">
                Delete Address?
              </h3>
              <p className="text-lg text-slate-600 leading-relaxed">
                Are you sure you want to delete this address? This action cannot
                be undone.
              </p>
            </div>
            <div className="flex justify-center gap-3 p-6 border-t border-slate-200">
              <button
                onClick={closeAllModals}
                className="relative overflow-hidden z-10 flex items-center gap-2 px-5 py-3 bg-slate-100 text-slate-800 font-semibold rounded-xl hover:bg-slate-200 hover:-translate-y-1 transition-all duration-400 ease-in-out group"
              >
                Cancel
                <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-400 ease-in-out -z-10"></span>
              </button>
              <button
                onClick={handleDeleteAddress}
                className="relative overflow-hidden z-10 flex items-center gap-2 px-5 py-3 bg-red-50 text-red-600 font-semibold rounded-xl border border-red-200 hover:bg-red-100 hover:-translate-y-1 transition-all duration-400 ease-in-out group"
              >
                Delete Address
                <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-400 ease-in-out -z-10"></span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      <div
        className={`fixed bottom-8 right-8 bg-white rounded-xl p-6 shadow-xl flex items-center gap-4 transition-all duration-400 ease-in-out z-[1000] ${
          toast.show ? "translate-y-0 opacity-100" : "translate-y-24 opacity-0"
        } ${
          toast.type === "error"
            ? "border-l-4 border-red-500"
            : "border-l-4 border-emerald-500"
        }`}
      >
        {toast.type === "success" ? (
          <CheckCircle className="w-8 h-8 text-emerald-500" />
        ) : (
          <XCircle className="w-8 h-8 text-red-500" />
        )}
        <div className="toast-content">
          <h4 className="font-bold text-lg mb-1">
            {toast.type === "success" ? "Success" : "Error"}
          </h4>
          <p className="text-base text-slate-600">{toast.message}</p>
        </div>
      </div>
    </div>
  );
}

export default App;
