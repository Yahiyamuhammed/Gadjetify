import React, { useState } from "react";
import OrderCard from "./OrderCard";
import LoadingSpinner from "@/components/common/LoadingSpinner";

import { useOrders } from "@/hooks/queries/useOrders";
import LoadMoreButton from "@/components/common/LoadMoreButton";

const OrderList = ({ navigate }) => {
  const [limit, setLimit] = useState(5);
  const { data: orders, isLoading } = useOrders(limit);

  if (isLoading) return <LoadingSpinner fullscreen />;
  if (!orders?.length) return <p className="text-center text-gray-500">No orders found.</p>;

  return (
    <div className="grid gap-4 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-4">My Orders</h1>
      {orders.map((order) => (
        <OrderCard key={order.orderId} order={order} navigate={navigate} />
      ))}

      {orders.length >= limit && (
        <div className="text-center mt-4">
          <LoadMoreButton onClick={() => setLimit(limit + 5)} />
        </div>
      )}
    </div>
  );
};

export default OrderList;
