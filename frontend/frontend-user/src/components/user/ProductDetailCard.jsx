import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AddCartButton from "./AddCartButton";
import ImageZoom from "./ImageZooming";
import {
  Box,
  ChevronRight,
  Home,
  Star,
  ShoppingCart,
  CreditCard,
  Check,
  PackageOpen,
} from "lucide-react";
import noImage from "@/assets/noImage.png";

// Replace with your backend URL
const backendUrl = "http://localhost:5000";

const ProductDetailsCard = ({ product }) => {
  const navigate = useNavigate();
  const [mainImage, setMainImage] = useState(noImage);

  useEffect(() => {
    if (product?.images?.[0]) {
      setMainImage(`${backendUrl}/products/${product.images[0]}`);
    }
  }, [product]);

  const finalPrice = () => {
    const totalDiscount = (product?.offerPercent || 0) + (product?.category?.offer || 0);
    const discountedPrice = (product?.price || 1000) - ((product?.price||1000) * totalDiscount) / 100 ;
    return discountedPrice.toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Breadcrumb */}
      <div className="bg-gradient-to-r bg-indigo-500 shadow-md fixed w-full z-20">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center text-sm text-white">
            <Link to="/" className="flex items-center hover:text-white/80">
              <Home className="w-4 h-4 mr-1" />
              Home
            </Link>
            <ChevronRight className="w-4 h-4 mx-2 text-white/60" />
            <Link to="/products" className="flex items-center hover:text-white/80">
              <Box className="w-4 h-4 mr-1" />
              Products
            </Link>
            <ChevronRight className="w-4 h-4 mx-2 text-white/60" />
            <span className="font-medium">{product.name}</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 mt-8">
          <div className="dark:bg-gray-800">
            <div className="grid lg:grid-cols-2 gap-0">
              {/* Images */}
               <div className="p-6 lg:p-8 border-b lg:border-b-0 lg:border-r border-gray-200 dark:border-gray-700">
                <div className="dark:bg-gray-900 rounded-xl p-6">
                  <ImageZoom mainImage={mainImage} product={product} onFavClick={() => {}} />
                </div>
                <div className="grid grid-cols-5 gap-3 mt-4">
                  {product.images.map((filename, index) => (
                    <button
                      key={index}
                      onClick={() => setMainImage(`${backendUrl}/products/${filename}`)}
                      className={`relative aspect-square rounded-lg overflow-hidden
                        ${
                          mainImage === `${backendUrl}/products/${filename}`
                            ? "ring-2 ring-indigo-500"
                            : "ring-1 ring-gray-200 dark:ring-gray-700"
                        } hover:ring-2 hover:ring-indigo-400 transition-all`}
                    >
                      <img
                        src={`${backendUrl}/products/${filename}`}
                        alt={`thumb-${index}`}
                        className="object-cover w-full h-full"
                      />
                    </button>
                  ))}
                </div>
              </div>  

              {/* Details */}

              <div className="p-6 lg:p-8 space-y-6">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{product.name}</h1>
                <p className="text-gray-600 dark:text-gray-400">
                  Model: <span className="font-medium">{product.model}</span>
                </p>

                {/* Rating */}
                <div className="flex items-center gap-2">
                  <div className="flex text-yellow-500">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(product?.review?.averageRating || 0)
                            ? "fill-current"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    ({product?.review?.count || 0} reviews)
                  </span>
                </div>

                {/* Price */}
                <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-4">
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-gray-900 dark:text-white">
                      ₹{finalPrice()}
                    </span>
                    <span className="text-lg text-gray-500 line-through">
                      ₹{(product?.price || 1000).toLocaleString("en-IN")}
                    </span>
                    <span className="text-green-600 font-medium">
                      {((product?.offerPercent || 5)+ (product.category?.offer || 0))}% OFF
                    </span>
                  </div>
                </div>

                {/* Features */}
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { icon: PackageOpen, label: "RAM", value: `${product.ram} GB` },
                    { icon: Box, label: "Storage", value: `${product.storage} GB` },
                    { icon: Check, label: "Warranty", value: product.warranty },
                    { icon: CreditCard, label: "COD", value: product.codAvailable ? "Available" : "Not Available" },
                  ].map((feature, i) => (
                    <div key={i} className="bg-gray-50 dark:bg-gray-900 p-3 rounded-lg flex items-center gap-3">
                      <feature.icon className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{feature.label}</p>
                        <p className="font-medium text-gray-900 dark:text-white">{feature.value}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Stock Status */}
                <p
                  className={`text-lg font-medium ${
                    (product?.stock || 5) === 0
                      ? "text-red-600"
                      : (product?.stock || 5) > 20
                      ? "text-green-600"
                      : "text-yellow-600"
                  }`}
                >
                  {(product?.stock || 5) === 0
                    ? "Out of Stock"
                    : (product?.stock || 5) > 20
                    ? "In Stock"
                    : `Only ${(product?.stock || 5)} left`}
                </p>

                {/* Add to Cart */}
                <div className="grid grid-cols-2 gap-4">
                  <AddCartButton
                    productId={product._id}
                    disabled={product.stock === 0}
                    className="w-full px-6 py-3 text-indigo-600 bg-indigo-50 hover:bg-indigo-100 
                      disabled:bg-gray-100 disabled:text-gray-400 rounded-lg font-medium flex items-center justify-center gap-2"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    Add to Cart
                  </AddCartButton>
                </div>
              </div>
              
            </div>

            {/* Description */}
            <div className="border-t border-gray-200 dark:border-gray-700 p-6 lg:p-8">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Description
              </h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {product.description}
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductDetailsCard;
