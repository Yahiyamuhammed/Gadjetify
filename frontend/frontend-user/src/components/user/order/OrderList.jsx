import React from "react";
import OrderCard from "./OrderCard";

const OrderList = ({ orders, navigate }) => {
  if (!orders?.length) return <p className="text-center text-gray-500">No orders found.</p>;

  return (
    <div className="grid gap-4 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-4">My Orders</h1>
      {orders.map((order) => (
        <OrderCard key={order.orderId} order={order} navigate={navigate} />
      ))}
    </div>
  );
};

export default OrderList;