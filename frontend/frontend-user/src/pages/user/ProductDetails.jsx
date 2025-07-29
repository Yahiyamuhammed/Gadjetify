import React from "react";
import ProductDetailsCard from "@/components/user/ProductDetailCard.jsx";
// import Review from "../../components/user/Review.jsx";
// import Footer from "../../components/user/Footer.jsx";
import ProductCard from "../../components/user/ProductCard.jsx";
import { Link } from "react-router";
import { Box, ChevronRight, Home } from "lucide-react";
import { useParams } from "react-router-dom";
import { useSingleProduct } from "../../hooks/queries/useSignleProductQueries.js";
import { useUserFetchProducts } from "@/hooks/queries/useUserProductQueries.js";
const ProductDetails = () => {
  
  const { id ,brand } = useParams(); 

  const {data:relatedProducts,isLoading:relatedIsLoading,isError:relatedIsError}=useUserFetchProducts({brand:brand,})


    // console.log('this is the id',id,brand,relatedProducts)

      const { data: product, isLoading, isError, error } = useSingleProduct(id);
      if (isLoading) return <p>Loading product...</p>;
  if (isError) return <p>Error: {error?.response?.data?.message || error.message}</p>;

  console.log('this is the product varients',product.variants)
  




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
          {relatedProducts?.products.map((product) => (
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
