import React, { useState, useRef } from "react";
import { Heart } from "lucide-react";
import { useFetchWishlist } from "@/hooks/queries/useWishlistQueries";
import { useToggleWishlist } from "@/hooks/mutations/useWishListMutations";
import toast from "react-hot-toast";

const ImageZoom = ({ mainImage, product, onFavClick, selectedVariant }) => {
  const [isZoomed, setIsZoomed] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);
  const { data: wishlistItems = [] } = useFetchWishlist();
  const { mutate: toggleWishlist } = useToggleWishlist();

  const isInWishlist = wishlistItems.some(
    (item) =>
      item._id === product._id &&
      item.defaultVariant._id === selectedVariant._id
  );

  const handleMouseMove = (e) => {
    if (!isZoomed || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    setPosition({ x, y });
  };

  const handleFavClick = async (productId, variantId) => {
    // e.stopPropagation();

    // toast.success(`wishlist added ${productId} ${variantId}`);
    // console.log(productId, variantId);

    toggleWishlist(
      { productId, variantId },
      {
        onSuccess: (res) => {
          if (res.wishlist) toast.success("wishlist added");
          else toast.success("wishlist removed");
        },
        onError: (err) => {
          toast.error(`failed to update ${err.message}`);
        },
      }
    );
  };

  return (
    <div
      ref={containerRef}
      className="relative h-[500px]  rounded-lg overflow-hidden cursor-z"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsZoomed(true)}
      onMouseLeave={() => setIsZoomed(false)}
    >
      <div
        className="w-full h-full flex items-center justify-center"
        style={{
          position: "relative",
          overflow: "hidden",
        }}
      >
        <img
          src={mainImage}
          alt="Main Product"
          className="w-full h-full object-cover transition-transform  duration-200"
          style={{
            transform: isZoomed ? "scale(2)" : "scale(1)",
            transformOrigin: `${position.x * 100}% ${position.y * 100}%`,
          }}
        />
      </div>

      <button
        onClick={() => handleFavClick(product._id, selectedVariant?._id)}
        className="absolute top-4 right-4 p-1.5 rounded-full bg-white/70 backdrop-blur-md shadow hover:bg-white/90 transition"
        aria-label="Add to Wishlist"
      >
        <Heart
          className={
            isInWishlist
              ? "text-red-600 fill-current"
              : "text-gray-700 dark:text-gray-300 "
          }
          size={20}
        />
      </button>
    </div>
  );
};

export default ImageZoom;
