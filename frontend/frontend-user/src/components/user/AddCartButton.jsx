import React from "react";
import { ShoppingCart } from "lucide-react";
import LoadingSpinner from "../common/LoadingSpinner";
// import LoadingSpinner from "./LoadingSpinner";

const AddCartButton = ({ onClick, disabled = false, loading = false }) => {
  const isDisabled = disabled || loading;

  return (
    <button
      onClick={onClick}
      disabled={isDisabled}
      className={`group w-full px-6 py-3 rounded-lg 
        flex items-center justify-center gap-3
        font-medium transition-all duration-300
        ${
          isDisabled
            ? "bg-gray-100 cursor-not-allowed"
            : "bg-indigo-600 hover:bg-indigo-700 active:scale-98 hover:shadow-lg"
        }`}
    >
      {loading ? (
        <LoadingSpinner size={10} color={isDisabled ? "gray" : "white"} />
      ) : (
        <>
          <ShoppingCart
            className={`w-5 h-5 transition-transform group-hover:scale-110
              ${isDisabled ? "text-gray-400" : "text-white"}`}
          />
          <span className={`${isDisabled ? "text-gray-400" : "text-white"}`}>
            Add to Cart
          </span>
        </>
      )}
    </button>
  );
};

export default AddCartButton;
