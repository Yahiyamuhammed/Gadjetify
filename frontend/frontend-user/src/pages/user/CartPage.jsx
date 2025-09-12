import ConfirmAlertDialog from "@/components/common/ExternalConfirmDialog";
import { Spinner } from "@/components/ui/shadcn-io/spinner";
import {
  useRemoveFromCart,
  useUpdateCartQuantity,
} from "@/hooks/mutations/useCartMutations";
import { useFetchCart } from "@/hooks/queries/useCartQuery";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const CartPage = () => {
  const { data: items = [], isLoading: cartIsLoading } = useFetchCart();

  const { mutate: updateItemQuantity } = useUpdateCartQuantity();
  const { mutate: deleteItem } = useRemoveFromCart();

  const [showRemoveDialog, setShowRemoveDialog] = useState(false);
  const [itemToRemove, setItemToRemove] = useState(null);

  const navigate = useNavigate();

  console.log(items);
  const formattedItems = items?.items?.map((item) => {
    const actualPrice = item.variantId.price * item.quantity;
    const offerPercentage = item.productId.offerPercentage || 0;
    const offerDiscount =
      offerPercentage > 0 ? (actualPrice * offerPercentage) / 100 : 0;

    const isOutOfStock =
      !item.variantId.stock || item.variantId.stock < item.quantity;
    const isUnlisted = item.productId.isListed === false;
    const isBrandDeleted = item.productId.brand?.isDeleted === true;
    const isVarientDeleted = item?.variantId?.isDeleted === true;

    return {
      id: item._id,
      image: item.productId.images?.[0],
      variantId: item.variantId._id,
      name: item.productId.name,
      ram: item.variantId.ram,
      storage: item.variantId.storage,
      color: item.variantId.color || "N/A",
      price: item.variantId.price,
      quantity: item.quantity,
      actualPrice,
      offerPercentage,
      offerDiscount,
      customDiscount: 0,
      brandName: item.productId.brand.name,

      isOutOfStock,
      isUnlisted,
      isBrandDeleted,
      isVarientDeleted,
      isUnavailable:
        isOutOfStock || isUnlisted || isBrandDeleted || isVarientDeleted,
    };
  });

  //   console.log(formattedItems, "this is formated");

  const IMAGE_BASE_URL = "http://localhost:5000/products/";

  // Price details
  //   const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  //   const discount = 150;
  //   const shipping = subtotal > 1000 ? 0 : 49.99;
  //   const tax = subtotal * 0.08;
  //   const total = subtotal - discount + shipping + tax;

  // Make sure cartItems is the formattedItems
  const cartItems = formattedItems || [];

  const subtotal = cartItems.reduce(
    (sum, item) => sum + (item.actualPrice || 0),
    0
  );
  const totalOfferDiscount = cartItems.reduce(
    (sum, item) => sum + (item.offerDiscount || 0),
    0
  );
  const customDiscount = cartItems.reduce(
    (sum, item) => sum + (item.customDiscount || 0),
    0
  );
  const totalDiscount = totalOfferDiscount + customDiscount;
  const shipping = subtotal > 1000 ? 0 : 49.99;
  const tax = subtotal * 0.08;
  const total = subtotal - totalDiscount + shipping + tax;

  // Calculate total offer percentage (for display)
  const totalOfferPercentage =
    subtotal > 0 ? ((totalOfferDiscount / subtotal) * 100).toFixed(1) : 0;
  // Handle quantity changes
  const updateQuantity = (id, newQuantity) => {
    console.log(id, newQuantity);
    // if (newQuantity < 1) return;
    if (newQuantity < 1) {
      setItemToRemove(id);
      setShowRemoveDialog(true);
      return;
    }

    if (newQuantity > 3) {
      toast.error("Maximum quantity is 3");
      return;
    }
    updateItemQuantity(
      { variantId: id, quantity: newQuantity },
      {
        onSuccess: (res) => {
          console.log(res);
          if (res?.message) toast.success(res.message);
          else toast.success("quantity updated");
        },
        onError: (err) => {
          toast.error(err.response.data.message || `error occured ${err}`);
        },
      }
    );
  };

  const handleDelete = (id) => {
    setItemToRemove(id);
    setShowRemoveDialog(true);
  };
  const removeItem = (id) => {
    deleteItem(
      { variantId: id },
      {
        onSuccess: () => {
          toast.success("item removed");
        },
        onError: (err) => {
          toast.error(`error occured ${err}`);
        },
      }
    );
  };

  const handleCheckout = () => {
    const hasUnavailableItems = cartItems.some((item) => item.isUnavailable);

    if (hasUnavailableItems) {
      toast.error(
        "Some items in your cart are unavailable. Please remove or update them."
      );
      return;
    }
    navigate("/checkout");
  };

  if (cartIsLoading)
    return (
      <>
        <div className="fixed inset-0 flex justify-center items-center">
          <Spinner size={44} />
        </div>
      </>
    );
  if (cartItems?.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
        <div className="max-w-md text-center">
          <div className="bg-gray-200 border-2 border-dashed rounded-xl w-40 h-40 mx-auto flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </div>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            Your cart is empty
          </h2>
          <p className="mt-2 text-gray-600">
            Looks like you haven't added any phones to your cart yet
          </p>

          <div className="mt-6 flex justify-center">
            <Link
              to="/products"
              className="flex items-center text-indigo-600 hover:text-indigo-800"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-1"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                  clipRule="evenodd"
                />
              </svg>
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Your Shopping Cart
        </h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items Section */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="hidden md:grid grid-cols-12 bg-gray-100 px-6 py-3 text-sm font-medium text-gray-500 uppercase tracking-wider">
                <div className="col-span-5">Product</div>
                <div className="col-span-2">Price</div>
                <div className="col-span-3">Quantity</div>
                <div className="col-span-2 text-right">Total</div>
              </div>

              <div className="divide-y">
                {formattedItems?.map((item) => (
                  <div
                    key={item.id}
                    className="grid grid-cols-1 md:grid-cols-12 p-6"
                  >
                    <div className="md:col-span-5 flex items-center mb-4 md:mb-0">
                      <img
                        src={item.image.url}
                        alt={item.name}
                        className="h-24 w-24 object-contain rounded-lg"
                      />
                      <div className="ml-4">
                        <h3 className="text-lg font-medium text-gray-900">
                          {item.name}
                        </h3>
                        <p className="text-sm text-gray-500">
                          Brand: {item.brandName}
                        </p>
                        <div className="flex flex-wrap gap-2 mt-2">
                          <span className="bg-gray-100 px-2 py-1 text-xs rounded-md">
                            {item.ram} RAM
                          </span>
                          <span className="bg-gray-100 px-2 py-1 text-xs rounded-md">
                            {item.storage} Storage
                          </span>
                        </div>
                        <button
                          onClick={() => handleDelete(item.variantId)}
                          className="mt-3 text-red-600 hover:text-red-800 text-sm flex items-center"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 mr-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                          Remove
                        </button>
                        {item.isUnavailable && (
                          <p className="text-sm text-red-600 mt-2">
                            {item.isOutOfStock && "Not enough stock available."}
                            {item.isUnlisted &&
                              "Product is not currently unlisted."}
                            {item.isBrandDeleted && "Brand has been deleted."}
                            {item.isVarientDeleted &&
                              "This varient has been deleted."}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="md:col-span-2 flex items-center mb-4 md:mb-0">
                      <span className="md:hidden font-medium mr-2">
                        Price:{" "}
                      </span>
                      <p className="text-gray-900 font-medium">
                        ₹{item.price.toFixed(2)}
                      </p>
                    </div>

                    <div className="md:col-span-3 flex items-center mb-4 md:mb-0">
                      <span className="md:hidden font-medium mr-2">
                        Quantity:{" "}
                      </span>
                      <div className="flex items-center border rounded-lg">
                        <button
                          onClick={() =>
                            updateQuantity(item.variantId, item.quantity - 1)
                          }
                          className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                        >
                          -
                        </button>
                        <span className="px-3 py-1">{item.quantity}</span>
                        <button
                          onClick={() =>
                            updateQuantity(item.variantId, item.quantity + 1)
                          }
                          className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div className="md:col-span-2 flex items-center justify-end">
                      <span className="md:hidden font-medium mr-2">
                        Total:{" "}
                      </span>
                      <p className="text-gray-900 font-medium">
                        ₹{(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-xl shadow-md p-6 h-fit sticky top-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Order Summary
              </h2>

              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span>₹${subtotal.toFixed(2)}</span>
                </div>

                {/* Show offer discount if exists */}
                {totalOfferDiscount > 0 && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">
                      Offer Discount ({totalOfferPercentage}%)
                    </span>
                    <span className="text-green-600">
                      -₹{totalOfferDiscount.toFixed(2)}
                    </span>
                  </div>
                )}

                {customDiscount > 0 && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Additional Discount</span>
                    <span className="text-green-600">
                      -₹${customDiscount.toFixed(2)}
                    </span>
                  </div>
                )}

                {totalDiscount > 0 && (
                  <div className="flex justify-between border-t pt-2">
                    <span className="text-gray-600 font-medium">
                      Total Savings
                    </span>
                    <span className="text-green-600 font-medium">
                      -₹${totalDiscount.toFixed(2)}
                    </span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span>
                    {shipping === 0 ? "Free" : `₹${shipping.toFixed(2)}`}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span>₹{tax.toFixed(2)}</span>
                </div>

                <div className="border-t pt-4 flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>₹{total.toFixed(2)}</span>
                </div>

                <button
                  onClick={handleCheckout}
                  className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-700 transition duration-300 mt-6"
                >
                  Proceed to Checkout
                </button>

                <div className="flex justify-center mt-4">
                  <Link
                    to="/products"
                    className="flex items-center text-indigo-600 hover:text-indigo-800"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-1"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ConfirmAlertDialog
        open={showRemoveDialog}
        onOpenChange={setShowRemoveDialog}
        title="Remove Item from Cart"
        description="This will remove the product from your cart. Are you sure you want to continue?"
        confirmText="Remove"
        cancelText="Cancel"
        onConfirm={() => {
          removeItem(itemToRemove);
          setShowRemoveDialog(false);
        }}
      />
    </div>
  );
};

export default CartPage;
