const MOCK_ORDERS = [
  {
    _id: "669922e9e2b1b36952e42b2e",
    orderId: "ORD123456",
    status: "Delivered",
    createdAt: "2024-07-18T10:00:00Z",
    customer: {
      name: "John Doe",
      email: "john.doe@example.com",
      address: "123 Main St, Anytown, USA",
    },
    items: [
      {
        _id: "669922e9e2b1b36952e42b2f",
        quantity: 1,
        product: {
          name: "Smartphone X",
          images: ["https://placehold.co/64x64/E0E7FF/4338CA?text=Phone"],
        },
        variant: {
          ram: "8GB",
          storage: "128GB",
          price: 45000,
        },
      },
      {
        _id: "669922e9e2b1b36952e42b30",
        quantity: 2,
        product: {
          name: "Smartwatch Pro",
          images: ["https://placehold.co/64x64/E0E7FF/4338CA?text=Watch"],
        },
        variant: {
          ram: "2GB",
          storage: "16GB",
          price: 15000,
        },
      },
      {
        _id: "669922e9e2b1b36952e42b31",
        quantity: 1,
        product: {
          name: "Wireless Earbuds",
          images: ["https://placehold.co/64x64/E0E7FF/4338CA?text=Buds"],
        },
        variant: {
          ram: "-",
          storage: "-",
          price: 3000,
        },
      },
    ],
    total: 45000 * 1 + 15000 * 2 + 3000 * 1, // 78000
  },
  {
    _id: "669922e9e2b1b36952e42b32",
    orderId: "ORD654321",
    status: "Placed",
    createdAt: "2024-07-19T12:30:00Z",
    customer: {
      name: "Alice Smith",
      email: "alice.smith@example.com",
      address: "456 Oak Ave, Springfield, USA",
    },
    items: [
      {
        _id: "669922e9e2b1b36952e42b33",
        quantity: 1,
        product: {
          name: "Laptop Z",
          images: ["https://placehold.co/64x64/E0E7FF/4338CA?text=Laptop"],
        },
        variant: {
          ram: "16GB",
          storage: "512GB",
          price: 85000,
        },
      },
    ],
    total: 85000,
  },
  {
    _id: "669922e9e2b1b36952e42b34",
    orderId: "ORD789012",
    status: "Shipped",
    createdAt: "2024-07-20T08:15:00Z",
    customer: {
      name: "Bob Johnson",
      email: "bob.johnson@example.com",
      address: "789 Pine Rd, Metro City, USA",
    },
    items: [
      {
        _id: "669922e9e2b1b36952e42b35",
        quantity: 3,
        product: {
          name: "Gaming Mouse",
          images: ["https://placehold.co/64x64/E0E7FF/4338CA?text=Mouse"],
        },
        variant: {
          ram: "-",
          storage: "-",
          price: 2500,
        },
      },
    ],
    total: 2500 * 3, // 7500
  },
];

export default MOCK_ORDERS;
