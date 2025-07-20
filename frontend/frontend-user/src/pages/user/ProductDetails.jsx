import React from "react";
import ProductDetailsCard from "@/components/user/ProductDetailCard.jsx";
// import Review from "../../components/user/Review.jsx";
// import Footer from "../../components/user/Footer.jsx";
import ProductCard from "../../components/user/ProductCard.jsx";
import { Link } from "react-router";
import { Box, ChevronRight, Home } from "lucide-react";
import { useParams } from "react-router-dom";
import { useSingleProduct } from "../../hooks/queries/useSignleProductQueries.js";



const mockedProducts = [
  {
    _id: "1",
    name: "Wireless Headphones",
    price: 1999,
    brand: "AudioPro",
    images: [{ secure_url: "/images/product1.jpg" }],
    rating: 4.3,
  },
  {
    _id: "2",
    name: "Gaming Mouse",
    price: 899,
    brand: "HyperClick",
    images: [{ secure_url: "/images/product2.jpg" }],
    rating: 4.7,
  },
  {
    _id: "3",
    name: "Smartphone Stand",
    price: 499,
    brand: "HoldIt",
    images: [{ secure_url: "/images/product3.jpg" }],
    rating: 4.2,
  },
  {
    _id: "4",
    name: "Portable Speaker",
    price: 1499,
    brand: "BoomSound",
    images: [{ secure_url: "/images/product4.jpg" }],
    rating: 4.5,
  },
];

const ProductDetails = () => {
  

    const { id } = useParams(); 

    // console.log('this is the id',id)

      const { data: product, isLoading, isError, error } = useSingleProduct(id);
      if (isLoading) return <p>Loading product...</p>;
  if (isError) return <p>Error: {error?.response?.data?.message || error.message}</p>;

  // console.log('this is the product',product)
  



  const products = mockedProducts;

  return (
    <div>
      {/* Product Details Section */}
      <ProductDetailsCard  product={product}/>

      {/* Related Products */}
      <div className="flex flex-col justify-center my-20">
        <p className="text-2xl text-center mb-10 font-bold dark:text-lightText">
          Related Products
        </p>
        <div className="grid xl:grid-cols-4 gap-7 lg:grid-cols-3 md:grid-cols-2 mx-auto">
          {mockedProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>

      {/* Review & Footer */}
      {/* <Review /> */}
      {/* <Footer /> */}
    </div>
  );
};

export default ProductDetails;
