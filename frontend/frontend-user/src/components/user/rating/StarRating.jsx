import { useState } from "react";
import { useRateProduct } from "@/hooks/mutations/useRatingMutations";
import toast from "react-hot-toast";

export default function StarRating({ productId, variantId, initialRating }) {
  const [rating, setRating] = useState(initialRating || 0);
  const { mutate } = useRateProduct();

  console.log(productId, variantId,)

  const handleRate = (value) => {
    setRating(value);
    mutate({ productId, variantId, rating: value },
        {
            onError:(err)=>toast.error(err.response.data.message || 'something went wrong')
        }
    );
  };

  return (
    <div className="flex gap-1 mt-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          onClick={() => handleRate(star)}
          className={`w-6 h-6 cursor-pointer ${star <= rating ? "text-yellow-500" : "text-gray-300"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.18c.969 0 1.371 1.24.588 1.81l-3.39 2.463a1 1 0 00-.364 1.118l1.286 3.967c.3.921-.755 1.688-1.54 1.118l-3.39-2.463a1 1 0 00-1.176 0l-3.39 2.463c-.784.57-1.838-.197-1.539-1.118l1.286-3.967a1 1 0 00-.364-1.118L2.045 9.394c-.783-.57-.38-1.81.588-1.81h4.18a1 1 0 00.95-.69l1.286-3.967z" />
        </svg>
      ))}
    </div>
  );
}
