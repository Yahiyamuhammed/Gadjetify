"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function OrderSummary({ items = [], onPlaceOrder }) {
  console.log(items,'these are the items');
  const formattedItems = items.map((item) => {
    const actualPrice = item.variantId.price * item.quantity;
    const offerPercentage = item.productId.offerPercentage || 0;
    const offerDiscount =
      offerPercentage > 0 ? (actualPrice * offerPercentage) / 100 : 0;

    return {
      productId: item.productId._id,
      name: item.productId.name,
      ram: item.variantId.ram,
      storage: item.variantId.storage,
      price: item.variantId.price,
      quantity: item.quantity,
      actualPrice,
      offerPercentage,
      offerDiscount,
      customDiscount: 0,
      brand:item.productId.brand._id,
      variantId:item.variantId._id
      
    };
  });

  const subtotal = formattedItems.reduce(
    (sum, item) => sum + item.actualPrice,
    0
  );
  const totalOfferDiscount = formattedItems.reduce(
    (sum, item) => sum + item.offerDiscount,
    0
  );
  const customDiscount = formattedItems.reduce(
    (sum, item) => sum + item.customDiscount,
    0
  );
  const totalDiscount = totalOfferDiscount + customDiscount;
  const shipping = subtotal > 1000 ? 0 : 49.99;
  const tax = subtotal * 0.08;
  const total = subtotal - totalDiscount + shipping + tax;
  const totalOfferPercentage =
    subtotal > 0 ? ((totalOfferDiscount / subtotal) * 100).toFixed(1) : 0;

  const handlePlaceOrder = () => {
    const formatOrderItems = (items = []) => {
      return items.map((item) => {
        const product = item.productId;
        const variant = item.variantId;
        const brand = product.brand;

        return {
          productId: product._id,
          productName: product.name,
          brandId: brand._id,
          brandName: brand.name,
          variantId: variant._id,
          ram: variant.ram,
          storage: variant.storage,
          price: variant.price,
          quantity: item.quantity,
          offerPercentage: product.offerPercentage,
          image: product.images?.[0] || null,
        };
      });
    };

    // Call parent function
    if (onPlaceOrder) {
    //   onPlaceOrder(formatOrderItems(items));
    onPlaceOrder({
      items: formattedItems,
      summary: {
        subtotal,
        totalOfferDiscount,
        customDiscount,
        totalDiscount,
        shipping,
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

        {/* === Price Breakdown === */}
        <div className="space-y-3 pt-4 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Subtotal</span>
            <span className="text-gray-800 font-medium">
              ₹{subtotal.toFixed(2)}
            </span>
          </div>

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
                -₹{customDiscount.toFixed(2)}
              </span>
            </div>
          )}

          {totalDiscount > 0 && (
            <div className="flex justify-between border-t pt-2">
              <span className="text-gray-800 font-medium">Total Savings</span>
              <span className="text-green-600 font-medium">
                -₹{totalDiscount.toFixed(2)}
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

        <Button className="w-full mt-4" onClick={handlePlaceOrder}>
          Place Order
        </Button>
      </CardContent>
    </Card>
  );
}
