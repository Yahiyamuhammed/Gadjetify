"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import {
  useApplyCoupon,
  useRemoveCoupon,
} from "@/hooks/mutations/useCouponMutations";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import { UNSAFE_getTurboStreamSingleFetchDataStrategy } from "react-router-dom";
import LoadingSpinner from "@/components/common/LoadingSpinner";

export default function OrderSummary({
  items = [],
  onPlaceOrder,
  onPymentChange,
  loading,
}) {
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  // const [couponDiscount, setCouponDiscount] = useState(0);

  const { mutate: applyCoupon } = useApplyCoupon();
  const { mutate: removeCoupon } = useRemoveCoupon();
  const removeCouponMutation = useRemoveCoupon();
  // console.log(items);
  const formattedItems = items.map((item) => {
    const actualPrice = item.variantId.price * item.quantity;

    const productOffer = item.productId.offerPercentage || 0;
    const brandOffer = item.productId.brand?.offerPercentage || 0;

    const productDiscount =
      productOffer > 0 ? (actualPrice * productOffer) / 100 : 0;
    const brandDiscount = brandOffer > 0 ? (actualPrice * brandOffer) / 100 : 0;

    // Pick which discount applies
    const isProductChosen = productDiscount > brandDiscount;
    const chosenOffer = isProductChosen ? productOffer : brandOffer;
    const chosenDiscount = isProductChosen ? productDiscount : brandDiscount;

    return {
      productId: item.productId._id,
      name: item.productId.name,
      ram: item.variantId.ram,
      storage: item.variantId.storage,
      price: item.variantId.price,
      quantity: item.quantity,
      actualPrice,
      chosenOffer,
      offerDiscount: chosenDiscount, // apply only chosen discount
      productDiscount: isProductChosen ? productDiscount : 0, // store only if chosen
      brandDiscount: !isProductChosen ? brandDiscount : 0, // store only if chosen
      variantId: item.variantId._id,
      brand: item.productId.brand._id,
    };
  });
  const subtotal = formattedItems.reduce(
    (sum, item) => sum + item.actualPrice,
    0
  );

  // sum of only chosen discounts
  const totalOfferDiscount = formattedItems.reduce(
    (sum, item) => sum + item.offerDiscount,
    0
  );

  // sum chosen brand discounts
  const totalChosenBrandDiscount = formattedItems.reduce(
    (sum, item) => sum + item.brandDiscount,
    0
  );

  // sum chosen product discounts
  const totalChosenProductDiscount = formattedItems.reduce(
    (sum, item) => sum + item.productDiscount,
    0
  );

  // coupon stays same
  const couponDiscount = appliedCoupon
    ? Math.min(
        ((subtotal - totalOfferDiscount) * appliedCoupon.discountPercent) / 100,
        subtotal - totalOfferDiscount
      )
    : 0;

  // total savings before coupon

  const totalDiscount = totalChosenBrandDiscount + totalChosenProductDiscount;

  const shipping = subtotal > 1000 ? 0 : 49.99;
  const tax = subtotal * 0.08;

  const total =
    Math.round(
      (subtotal - totalDiscount - couponDiscount + shipping + tax) * 100
    ) / 100;
  useEffect(() => {
    onPymentChange({ amount: total });
  }, [total]);

  const totalOfferPercentage =
    subtotal > 0 ? ((totalOfferDiscount / subtotal) * 100).toFixed(1) : 0;

  const handleApplyCoupon = async () => {
    applyCoupon(
      { code: couponCode },
      {
        onSuccess: (data) => {
          if (data.coupon.minPurchase && subtotal < data.coupon.minPurchase) {
            // discount = 0;
            toast.error(`Doesn't qualify for minimum purchase`);
          } else {
            toast.success("coupon applied");
            setAppliedCoupon({
              code: data.coupon.code,
              discountPercent: data.coupon.discountValue,
              minPurchase: data.coupon?.minPurchase,
            });
          }
        },
        onError: (err) => {
          toast.error(err.response.data.message || "cannot apply coupon");
        },
      }
    );
  };

  const handleRemoveCoupon = async () => {
    try {
      await removeCouponMutation.mutateAsync();
      setAppliedCoupon(null);
      // setCouponDiscount(0);
      setCouponCode("");
    } catch (err) {
      console.error(err);
    }
  };

  const handlePlaceOrder = () => {
    if (onPlaceOrder) {
      //   onPlaceOrder(formatOrderItems(items));
      onPlaceOrder({
        items: formattedItems,
        summary: {
          subtotal,
          totalOfferDiscount: totalChosenProductDiscount,
          customDiscount: totalChosenBrandDiscount,
          totalDiscount,
          shipping,
          coupon: appliedCoupon,
          tax,
          total,
        },
      });
    }
  };

  return (
    <Card>
      <CardContent className="pt-6 space-y-6 max-h-[500px] overflow-y-auto">
        <h2 className="text-lg font-semibold">Order Summary</h2>

        {/* === Item List === */}
        {formattedItems.map((item) => (
          <div key={item.id} className="border-b pb-3">
            <div className="flex justify-between items-center">
              <div>
                <div className="font-medium">
                  {item.name} <br /> ({item.ram}GB RAM, {item.storage}GB
                  STORAGE)
                </div>
                <div className="text-sm text-gray-500">
                  Qty: {item.quantity}
                </div>
              </div>
              <div className="font-semibold text-gray-800">
                ₹ {item.actualPrice.toLocaleString()}
              </div>
            </div>

            {/* <div className="ml-1 mt-1 text-sm text-gray-500">
              Price: ₹{item.price.toFixed(2)} x {item.quantity}
              {item.offerPercentage > 0 && (
                <div className="text-green-600">
                  Offer: -₹{item.offerDiscount.toFixed(2)} ({item.offerPercentage}%)
                </div>
              )}
              {item.customDiscount > 0 && (
                <div className="text-green-600">
                  Additional Discount: -₹{item.customDiscount.toFixed(2)}
                </div>
              )}
            </div> */}
          </div>
        ))}

        {/* === Coupon Section === */}
        <div className="space-y-3 pt-4">
          {!appliedCoupon ? (
            <div className="flex gap-2">
              <Input
                placeholder="Enter coupon code"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
              />
              <Button onClick={handleApplyCoupon}>Apply</Button>
            </div>
          ) : (
            <div className="flex justify-between items-center bg-green-50 p-2 rounded">
              <span className="text-green-700 font-medium">
                {appliedCoupon.code} applied ({appliedCoupon.discountPercent}%
                OFF)
              </span>
              <Button variant="ghost" size="sm" onClick={handleRemoveCoupon}>
                Remove
              </Button>
            </div>
          )}
        </div>

        {/* === Price Breakdown === */}
        <div className="space-y-3 pt-4 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Subtotal</span>
            <span className="text-gray-800 font-medium">
              ₹{subtotal.toFixed(2)}
            </span>
          </div>

          {totalChosenProductDiscount > 0 && (
            <div className="flex justify-between">
              <span className="text-gray-600">Product Offer</span>
              <span className="text-green-600">
                -₹{totalChosenProductDiscount.toFixed(2)}
              </span>
            </div>
          )}

          {totalChosenBrandDiscount > 0 && (
            <div className="flex justify-between">
              <span className="text-gray-600">Brand Offer</span>
              <span className="text-green-600">
                -₹{totalChosenBrandDiscount.toFixed(2)}
              </span>
            </div>
          )}
          {couponDiscount > 0 && (
            <div className="flex justify-between">
              <span className="text-gray-600">Coupon Discount</span>
              <span className="text-green-600">
                -₹{couponDiscount.toFixed(2)}
              </span>
            </div>
          )}

          {totalOfferDiscount + couponDiscount > 0 && (
            <div className="flex justify-between border-t pt-2">
              <span className="text-gray-800 font-medium">Total Savings</span>
              <span className="text-green-600 font-medium">
                -₹{(totalOfferDiscount + couponDiscount).toFixed(2)}
              </span>
            </div>
          )}

          <div className="flex justify-between">
            <span className="text-gray-600">Shipping</span>
            <span className="text-gray-800">
              {shipping === 0 ? "Free" : `₹${shipping.toFixed(2)}`}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-600">Tax (8%)</span>
            <span className="text-gray-800">₹{tax.toFixed(2)}</span>
          </div>

          <div className="border-t pt-4 flex justify-between text-base font-bold">
            <span>Total Payable</span>
            <span>₹{total.toFixed(2)}</span>
          </div>
        </div>

        <Button
          className="w-full mt-4"
          onClick={handlePlaceOrder}
          disabled={loading}
        >
          {loading ? (
            <>
              <LoadingSpinner size={18} color="white" />
              <span>Placing Order...</span>
            </>
          ) : (
            "Place Order"
          )}{" "}
        </Button>
      </CardContent>
    </Card>
  );
}
