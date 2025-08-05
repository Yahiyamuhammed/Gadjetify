import React, { useState } from "react";
import OrderList from "@/components/user/order/OrderList";

import OrderDetail from "@/components/user/order/OrderDetail";
import { useOrders } from "@/hooks/queries/useOrders";

const Orders = () => {
  const {data:orders} = useOrders();

// const [orders] = useState(MOCK_ORDERS);
const [selectedOrder, setSelectedOrder] = useState(null);

const navigateToOrder = (orderId) => {

    console.log('navigating',orderId)
    // const order = orders.find((o) => o._id === orderId);
    // console.log(order)
    setSelectedOrder(orderId);
  };

  const backToList = () => {
    setSelectedOrder(null);
  };

  return (
    <div className="font-sans bg-gray-100 min-h-screen p-8">
      {selectedOrder ? (
        <OrderDetail orderId={selectedOrder} onBack={backToList} />
      ) : (
        <OrderList orders={orders} navigate={navigateToOrder} />
      )}
    </div>
  );
};

export default Orders;
