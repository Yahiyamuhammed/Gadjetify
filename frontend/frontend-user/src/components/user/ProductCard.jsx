import React from "react";
import { useNavigate } from "react-router";
import { Heart, Star, StarHalf } from "lucide-react";
import AddCartButton from "./AddCartButton";
// import { useToggleWishListMutation } from "../../redux/slices/wishlistApiSlice";
// import { useDispatch, useSelector } from "react-redux";
// import { successToast } from "../toast";
import { toast } from "react-hot-toast";
import { useToggleWishlist } from "@/hooks/mutations/useWishListMutations";
import { useFetchWishlist } from "@/hooks/queries/useWishlistQueries";
import { useAddToCart } from "@/hooks/mutations/useCartMutations";

const ProductCard = ({ product = [], refetch }) => {
  const navigate = useNavigate();
  //   const [toggleWishlist] = useToggleWishListMutation();

  //   const { userInfo } = useSelector((state) => state.userAuth);
  const { mutate: toggleWishlist } = useToggleWishlist();
  const { mutate: addToCart } = useAddToCart();
  const { data: wishlistItems } = useFetchWishlist();

  // console.log(wishlistItems,'this is wish')
  const isInWishlist = wishlistItems?.some(
    (item) => item?._id === product?._id
  );

  const handleClick = (e) => {
    if (!e.target.closest(".wishlist-btn") && !e.target.closest(".cart-btn")) {
      navigate(`/products/${product._id}/${product.brand._id}`);
      window.scrollTo(0, 0);
    }
  };

  const handleFavClick = async (productId, variantId) => {
    // e.stopPropagation();

    // toast.success(`wishlist added ${productIdvariantId ${vId}`)
    // console.log(productId,variantId)

    toggleWishlist(
      { productId, variantId },
      {
        onSuccess: (res) => {
          if (res.wishlist) toast.success("wishlist added");
          else toast.success("wishlist removed");
        },
        onError: (err) => {
          toast.error(` ${err.response.data.message}` || `failed to update ${err.message}`);
        },
      }
    );
  };

  const handleAddToCart = (productId, variantId) => {
    addToCart(
      { productId, variantId },
      {
        onSuccess: (res) => {
          if (res.quantity > 1) {
            toast.success(`Item quantity increased to ${res.quantity}`);
          } else {
            toast.success("Item added to cart");
          }
        },
        onError: (err) => {
          if (err?.status === 409)
            toast.error(`Maximum quantity (3) reached for this item in cart`);
          else toast.error(` ${err.response.data.message}` || `an error occured}`);
        },
      }
    );
  };

  // console.log(product,'this is the products from the card')

  const finalPrice = () => {
    // console.log(product.offerPercentage, "this is the offer percent");

    let effectiveOfferPercent =
      (product?.offerPercentage || 0) + (product?.categoryDetails?.offer || 0);
    effectiveOfferPercent = Math.min(effectiveOfferPercent, 100);

    // console.log(effectiveOfferPercent, "this is the effective offer percent");

    const price = product.defaultVariant?.price || 10000;
    const discountedPrice = price - (price * effectiveOfferPercent) / 100;

    return effectiveOfferPercent > 0
      ? discountedPrice.toLocaleString("en-IN", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })
      : price.toLocaleString("en-IN", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        });
  };

  // console.log(product, "thisis the products");

  return (
    <div className="group relative max-w-[290px] min-w-[270px] bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 flex flex-col h-full">
      <div
        onClick={handleClick}
        className="cursor-pointer flex flex-col flex-grow"
      >
        {/* Image Container */}
        <div className="relative h-72 overflow-hidden rounded-t-xl">
          <img
            src={
              product?.images?.[0]
                ? `${product.images[0].url}`
                : "/api/placeholder/320/288"
            }
            alt={product?.name || "Product"}
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
          />
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleFavClick(product._id, product?.defaultVariant?._id);
            }}
            className="wishlist-btn absolute top-4 right-4 p-2 bg-white rounded-full shadow-lg hover:scale-110 transition-transform duration-200"
          >
            <Heart
              className={`w-5 h-5 ${
                isInWishlist ? "fill-red-500 text-red-500" : "text-gray-600"
              }`}
            />
          </button>

          {/* Offer Badge */}
          {(product?.offerPercentage || product?.categoryDetails?.offer) >
            0 && (
            <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
              {Math.min(
                (product?.offerPercentage || 0) +
                  (product?.categoryDetails?.offer || 0),
                100
              )}
              % OFF
            </div>
          )}
        </div>

        {/* Content Area */}
        <div className="p-4 flex flex-col flex-grow">
          {/* Title and Price */}
          <div className="flex justify-between items-start mb-2 gap-2">
            <h3 className="text-lg font-semibold text-gray-800 line-clamp-2 flex-grow">
              {product.name}
            </h3>
            <div className="flex flex-col items-end min-w-[30%] pl-2">
              <span className="text-sm text-gray-500 line-through whitespace-nowrap">
                ₹
                {product.defaultVariant?.price?.toLocaleString("en-IN", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }) || "10,000.00"}
              </span>
              <span className="text-lg font-bold text-indigo-600 whitespace-nowrap">
                ₹{finalPrice()}
              </span>
            </div>
          </div>

          {/* Description - Fixed height ensures consistent spacing */}
          <div className="min-h-[40px] mb-2">
            <p className="text-gray-600 text-sm line-clamp-2">
              {product.description}
            </p>
          </div>

          {/* Rating - Now properly aligned with fixed height */}
          <div className="flex items-center gap-1 min-h-[24px] mb-2">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => {
                const rating = product?.reviewStats?.avgRating || 0;
                const fullStars = Math.floor(rating);
                const hasHalfStar = rating % 1 !== 0 && i === fullStars;

                if (i < fullStars) {
                  return (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-yellow-400 text-yellow-400"
                    />
                  );
                } else if (hasHalfStar) {
                  return (
                    <StarHalf
                      key={i}
                      className="w-4 h-4 fill-yellow-400 text-yellow-400"
                    />
                  );
                }
                return <Star key={i} className="w-4 h-4 text-gray-300" />;
              })}
            </div>
            <span className="text-sm text-gray-500">
              ({product?.reviewStats?.reviewCount || 0})
            </span>
          </div>

          {/* Stock Status */}
          {product?.defaultVariant?.stock === 0 ? (
            <>
              <p className="text-sm mb-2">
                <span className="text-red-500 font-medium">Out of Stock</span>
                <span className="text-gray-500">
                  {" "}
                  – you may explore more variants on the product page
                </span>
              </p>
            </>
          ) : (
            <div className="min-h-[20px]"></div>
          )}

          <div className="mt-auto pt-2">
            <AddCartButton
              disabled={
                product?.defaultVariant?.stock === 0 || product.isDeleted
              }
              onClick={(e) => {
                e.stopPropagation();
                handleAddToCart(product._id, product?.defaultVariant?._id);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
