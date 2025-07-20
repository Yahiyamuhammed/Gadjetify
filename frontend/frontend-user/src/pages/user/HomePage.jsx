import ProductCard from "@/components/user/ProductCard";
import image1 from "@/assets/Banner1_Home.svg";
import image2 from "@/assets/Banner2_Home.svg";
import { useUserFetchProducts } from "@/hooks/queries/useUserProductQueries";

const HomePage = () => {
  const {
    data: products,
    isLoading,
    isError,
    error,
  } = useUserFetchProducts({ sort: "latest" });
  // console.log(products.products)

  return (
    <div className="min-h-screen bg-white">
      <img src={image1} alt="Home Banner" className="w-full h-auto mb-20" />

      <div className="px-4 sm:px-6 md:px-8 lg:px-16 mb-6 sm:mb-8 md:mb-10">
        <p className="font-extrabold text-4xl mb-10">
          New <span className="text-blue-500">arrival</span> for you
        </p>

        {/* Products Grid */}
        <section className="grid gap-4 sm:gap-6 md:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 justify-items-center px-4">
          {products?.products.length > 0 ? (
            products.products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))
          ) : isLoading ? (
            <p>Loading products...</p>
          ) : isError ? (
            <p className="text-red-500">Error: {error.message}</p>
          ) : (
            <p>No products found.</p>
          )}
        </section>
      </div>
      {/* offer banner */}
      <img src={image2} alt="Home Banner" className="w-full h-auto mb-20" />
      <div className="px-4 sm:px-6 md:px-8 lg:px-16 mb-6 sm:mb-8 md:mb-10">
        <p className="font-extrabold text-4xl mb-10">
          Flash Sale: Grab Your{" "}
          <span className="text-blue-500">Favorite Bestsellers!</span>
        </p>
      </div>
    </div>
  );
};

export default HomePage;
