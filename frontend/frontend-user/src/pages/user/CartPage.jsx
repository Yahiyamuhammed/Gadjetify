import React, { useState } from 'react';

const CartPage = () => {
  // Sample cart data
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Samsung Galaxy S23 Ultra",
      image: "https://via.placeholder.com/80",
      ram: "12GB",
      storage: "256GB",
      color: "Phantom Black",
      price: 1199.99,
      quantity: 1
    },
    {
      id: 2,
      name: "iPhone 15 Pro Max",
      image: "https://via.placeholder.com/80",
      ram: "8GB",
      storage: "512GB",
      color: "Titanium Blue",
      price: 1299.99,
      quantity: 1
    }
  ]);

  // Price details
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discount = 150;
  const shipping = subtotal > 1000 ? 0 : 49.99;
  const tax = subtotal * 0.08;
  const total = subtotal - discount + shipping + tax;

  // Handle quantity changes
  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems(cartItems.map(item => 
      item.id === id ? {...item, quantity: newQuantity} : item
    ));
  };

  // Remove item from cart
  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Shopping Cart</h1>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items Section */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="hidden md:grid grid-cols-12 bg-gray-100 px-6 py-3 text-sm font-medium text-gray-500 uppercase tracking-wider">
                <div className="col-span-5">Product</div>
                <div className="col-span-2">Price</div>
                <div className="col-span-3">Quantity</div>
                <div className="col-span-2 text-right">Total</div>
              </div>
              
              <div className="divide-y">
                {cartItems.map((item) => (
                  <div key={item.id} className="grid grid-cols-1 md:grid-cols-12 p-6">
                    <div className="md:col-span-5 flex items-center mb-4 md:mb-0">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="h-24 w-24 object-contain rounded-lg"
                      />
                      <div className="ml-4">
                        <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
                        <div className="flex flex-wrap gap-2 mt-2">
                          <span className="bg-gray-100 px-2 py-1 text-xs rounded-md">
                            {item.ram} RAM
                          </span>
                          <span className="bg-gray-100 px-2 py-1 text-xs rounded-md">
                            {item.storage} Storage
                          </span>
                          <span className="bg-gray-100 px-2 py-1 text-xs rounded-md">
                            {item.color}
                          </span>
                        </div>
                        <button 
                          onClick={() => removeItem(item.id)}
                          className="mt-3 text-red-600 hover:text-red-800 text-sm flex items-center"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                          Remove
                        </button>
                      </div>
                    </div>
                    
                    <div className="md:col-span-2 flex items-center mb-4 md:mb-0">
                      <span className="md:hidden font-medium mr-2">Price: </span>
                      <p className="text-gray-900 font-medium">${item.price.toFixed(2)}</p>
                    </div>
                    
                    <div className="md:col-span-3 flex items-center mb-4 md:mb-0">
                      <span className="md:hidden font-medium mr-2">Quantity: </span>
                      <div className="flex items-center border rounded-lg">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                        >
                          -
                        </button>
                        <span className="px-3 py-1">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    
                    <div className="md:col-span-2 flex items-center justify-end">
                      <span className="md:hidden font-medium mr-2">Total: </span>
                      <p className="text-gray-900 font-medium">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-xl shadow-md p-6 h-fit sticky top-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Discount</span>
                  <span className="text-green-600">-${discount.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                
                <div className="border-t pt-4 flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                
                <button className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-700 transition duration-300 mt-6">
                  Proceed to Checkout
                </button>
                
                <div className="flex justify-center mt-4">
                  <button className="text-indigo-600 hover:text-indigo-800 font-medium">
                    Continue Shopping
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;