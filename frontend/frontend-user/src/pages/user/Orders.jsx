import React, { useState } from "react";
// import OrderList from "../components/OrderList";
// import OrderDetail from "../components/OrderDetail";
// import MOCK_ORDERS from "../data/mockOrders";

import OrderList from "@/components/user/order/OrderList";
import MOCK_ORDERS from "@/components/user/order/mockOrders";
import OrderDetail from "@/components/user/order/OrderDetail";

const Orders = () => {
  const [orders] = useState(MOCK_ORDERS);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const navigateToOrder = (orderId) => {
    const order = orders.find((o) => o._id === orderId);
    setSelectedOrder(order);
  };

  const backToList = () => {
    setSelectedOrder(null);
  };

  return (
    <div className="font-sans bg-gray-100 min-h-screen p-8">
      {selectedOrder ? (
        <OrderDetail order={selectedOrder} onBack={backToList} />
      ) : (
        <OrderList orders={orders} navigate={navigateToOrder} />
      )}
    </div>
  );
};

export default Orders;