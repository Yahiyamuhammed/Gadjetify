import React from "react";
import { ShoppingCart } from "lucide-react";

const AddCartButton = ({ onClick, disabled = false }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`group w-full px-6 py-3 rounded-lg 
        flex items-center justify-center gap-3
        font-medium transition-all duration-300
        ${
          disabled
            ? "bg-gray-100 cursor-not-allowed"
            : "bg-indigo-600 hover:bg-indigo-700 active:scale-98 hover:shadow-lg"
        }`}
    >
      <ShoppingCart
        className={`w-5 h-5 transition-transform group-hover:scale-110
          ${disabled ? "text-gray-400" : "text-white"}`}
      />
      <span className={`${disabled ? "text-gray-400" : "text-white"}`}>
        Add to Cart
      </span>
    </button>
  );
};

export default AddCartButton;
