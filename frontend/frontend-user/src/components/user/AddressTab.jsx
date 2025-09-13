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
import {
  useAddAddress,
  useDeleteAddress,
  useEditAddress,
  useSetPrimaryAddress,
} from "@/hooks/mutations/useAddressMutations";
import { addressSchema } from "@/utils/validation/addressSchema";
import { getAddresses } from "@/hooks/queries/useAddressQueries";
import { useQueryClient } from "@tanstack/react-query";
import ConfirmDialog from "../common/ConfirmDialog";
import ConfirmAlertDialog from "../common/ConfirmDialog";
import toast from "react-hot-toast";
import LoadMoreButton from "../common/LoadMoreButton";

// import { useAddressMutations } from "@/hooks/mutations/useAddressMutations";

// Main App Component
function App() {
  // Initial dummy data for addresses

  const { mutate: addAddress, data: adddress } = useAddAddress();
  const { mutate: editAddress, data: address } = useEditAddress();
  const { mutate: deleteAddress } = useDeleteAddress();
  const { mutate: setPrimary } = useSetPrimaryAddress();
  const [limit, setLimit] = useState(5);

  const {
    data: addresses = [],
    isError: adError,
    isLoading: adLoading,
  } = getAddresses(limit);
  const queryClient = useQueryClient();

  const [openDropdownId, setOpenDropdownId] = useState(null);

  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const handleLoadMore = () => {
    setLimit(limit + 5);
  };

  const handleNewAddress = (formData) => {
    addAddress(formData, {
      onSuccess: () => {
        toast.success("address added");
        setIsEditDialogOpen(false);
        queryClient.invalidateQueries(["address"]);
        setOpenDropdownId(null);
      },
      onError: (err) => {
        toast.error(err.response.data.message);
        console.log("error occured", err);
      },
    });
  };

  const handleEditAddress = (formData) => {
    editAddress(
      { updateData: formData, addressId: formData._id },
      {
        onSuccess: () => {
          console.log("address changed");
          setIsEditDialogOpen(false);
          queryClient.invalidateQueries(["addresses"]);
          setOpenDropdownId(null);
        },
        onError: (err) => {
          console.log("error occured", err);
        },
      }
    );
  };

  /**
   * Handles deleting an address.
   */
  const handleDeleteAddress = (addressId) => {
    console.log("this is the address id", addressId);

    deleteAddress(addressId, {
      onSuccess: () => {
        console.log("address deleted");
        queryClient.invalidateQueries(["addresses"]);
        setOpenDropdownId(null);
      },
    });
  };

  const handleSetPrimary = (id) => {
    setPrimary(id, {
      onSuccess: () => {
        console.log("address set to primary");
        queryClient.invalidateQueries(["addresses"]);
        setOpenDropdownId(null);
      },
      onError: (err) => {
        console.log("error occured", err);
      },
    });
  };

  return (
    <div className="container mx-auto w-full max-w-7xl px-4 py-8 font-inter">
      <Card className="overflow-hidden border shadow-xl rounded-3xl py-0">
        <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50 border-b p-8 ">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <h2 className="text-3xl font-bold text-slate-900 flex items-center gap-4">
              <MapPin className="text-indigo-600 w-8 h-8" />
              Your Saved Addresses
            </h2>
            <EditAddressDialog
              address={""}
              onSubmit={handleNewAddress}
              open={isEditDialogOpen}
              setOpen={setIsEditDialogOpen}
              validationSchema={addressSchema}
              trigger={
                <Button onClick={() => setIsEditDialogOpen(true)}>
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
              <Card className="col-span-full text-center py-20 px-6" key={1}>
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
                  key={address._id}
                >
                  {address.isPrimary && (
                    <>
                      <div className="absolute top-0 right-0 w-0 h-0 border-t-[70px] border-l-[70px] border-t-indigo-600 border-l-transparent"></div>
                      <Star className="absolute top-3 right-3 text-white w-5 h-5 z-20" />
                    </>
                  )}

                  <CardContent className="flex-grow mb-6 px-8">
                    <h3 className="text-2xl font-extrabold mb-5 flex items-center gap-3">
                      {address.addressType.toLowerCase().includes("home") && (
                        <Home className="text-indigo-600 w-6 h-6" />
                      )}
                      {address.addressType.toLowerCase().includes("office") && (
                        <Building2 className="text-indigo-600 w-6 h-6" />
                      )}
                      {address.addressType
                        .toLowerCase()
                        .includes("vacation") && (
                        <Star className="text-indigo-600 w-6 h-6" />
                      )}
                      {!["home", "office", "vacation"].some((type) =>
                        address.addressType.toLowerCase().includes(type)
                      ) && <MapPin className="text-indigo-600 w-6 h-6" />}
                      {address.addressType}
                    </h3>

                    <div className="space-y-3 text-slate-600">
                      <div className="flex items-start gap-3">
                        <User className="mt-1 text-indigo-600 w-5 h-5" />
                        {address.name}
                      </div>
                      <div className="flex items-start gap-3">
                        <Phone className="mt-1 text-indigo-600 w-5 h-5" />
                        {address.phone}
                      </div>
                      {address.alternatePhone && (
                        <div className="flex items-start gap-3">
                          <Phone className="mt-1 text-indigo-600 w-5 h-5" />
                          {address.alternatePhone}
                        </div>
                      )}
                      <div className="flex items-start gap-3">
                        <div className="mt-1 flex-shrink-0">
                          <MapPin className="text-indigo-600 w-5 h-5" />
                        </div>
                        <div className="space-y-1">
                          <div>{address.locality}</div>
                          <div>{address.address}</div>
                          {address.landmark && <div>{address.landmark}</div>}
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <Building2 className="mt-1 text-indigo-600 w-5 h-5" />
                        {address.district}, {address.state} - {address.pincode}
                      </div>
                      <div className="flex items-start gap-3">
                        <Flag className="mt-1 text-indigo-600 w-5 h-5" />
                        India
                      </div>
                      {address.isPrimary && (
                        <div className="flex items-start gap-3">
                          <Star className="mt-1 text-yellow-600 w-5 h-5" />
                          Primary Address
                        </div>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter className=" flex justify-end p-0">
                    <DropdownMenu
                      open={openDropdownId === address._id}
                      onOpenChange={(isOpen) => {
                        setOpenDropdownId(isOpen ? address._id : null);
                      }}
                    >
                      {" "}
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="outline"
                          onClick={() => setOpenDropdownId(address._id)}
                        >
                          More options
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        {!address.isPrimary && (
                          <ConfirmAlertDialog
                            title="Set as Primary Address"
                            description="Do you want to set this address as your primary address?"
                            confirmText="Yes"
                            cancelText="Cancel"
                            onConfirm={() => handleSetPrimary(address._id)}
                            trigger={
                              <DropdownMenuItem
                                onSelect={(e) => e.preventDefault()}
                                className="cursor-pointer"
                              >
                                <Star className="w-4 h-4 mr-2 text-indigo-600" />
                                Set as Primary
                              </DropdownMenuItem>
                            }
                          />
                        )}
                        {/* Edit option with dialog */}
                        <EditAddressDialog
                          address={address}
                          onSubmit={handleEditAddress}
                          trigger={
                            <DropdownMenuItem
                              className="cursor-pointer"
                              onSelect={(e) => e.preventDefault()}
                            >
                              <Edit className="w-4 h-4 mr-2 text-amber-600" />
                              Edit
                            </DropdownMenuItem>
                          }
                          open={isEditDialogOpen}
                          setOpen={setIsEditDialogOpen}
                          validationSchema={addressSchema}
                        />

                        <ConfirmAlertDialog
                          title="Delete Address"
                          description="Are you sure you want to delete this address? This action cannot be undone."
                          confirmText="Delete"
                          cancelText="Cancel"
                          onConfirm={() => handleDeleteAddress(address._id)}
                          trigger={
                            <DropdownMenuItem
                              className="cursor-pointer text-red-600"
                              onSelect={(e) => e.preventDefault()} // prevent dropdown from closing instantly
                            >
                              <Trash2 className="w-4 h-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          }
                        />
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </CardFooter>
                </Card>
              ))
            )}
          </div>
        </CardContent>
        {addresses.length >= limit && (
          <div className="text-center mt-4">
            <LoadMoreButton
              onClick={() => setLimit(limit + 5)}
              disabled={false}
            />
          </div>
        )}
      </Card>

      {/* </div> */}
    </div>
  );
}

export default App;
