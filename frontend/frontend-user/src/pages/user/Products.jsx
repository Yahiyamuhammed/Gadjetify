import React, { useEffect, useState } from "react";
import ProductCard from "../../components/user/ProductCard";
// import Footer from "../../components/user/Footer";
// import Pagination from "../../components/Pagination";
import { Link } from "react-router";
import { ChevronRight, Home, ListFilter, Search, SortAsc } from "lucide-react";
import Pagination from "../../components/common/Pagination";
import { useUserFetchProducts } from "../../hooks/queries/useUserProductQueries";
import { useFetchBrands } from "../../hooks/queries/useBrandQueries";

const Products = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;
  const [sortBy, setSortBy] = useState("latest");
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  //   const [totalPages, setTotalPages] = useState(1);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const { data, isLoading, isError, error } = useUserFetchProducts({
    search: searchTerm,
    brand: selectedBrand,
    sort: sortBy,
    page: currentPage,
    limit: 8,
    minPrice,
    maxPrice,
  });

  console.log(selectedBrand);

  const products = data?.products || [];
  const totalPages = data?.totalPages || 1;

  const { data: brandData = [] } = useFetchBrands({ search: "" });

  const brands = (brandData?.brands || []).filter((b) => !b.isDeleted);

  //   const filteredProducts = sortProducts(
  //     allProducts.filter((product) => {
  //       const matchesCategory =
  //         categoryFilter === "" || product.categoryId === categoryFilter;
  //       const matchesSearch = product.name
  //         .toLowerCase()
  //         .includes(searchTerm.toLowerCase());
  //       return matchesCategory && matchesSearch;
  //     })
  //   );

  //   useEffect(() => {
  //     setTotalPages(Math.ceil(filteredProducts.length / pageSize));
  //   }, [filteredProducts]);

  //   const paginatedProducts = filteredProducts.slice(
  //     (currentPage - 1) * pageSize,
  //     currentPage * pageSize
  //   );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 ">
      {/* Breadcrumb Header */}
      <nav className="bg-indigo-500 shadow-md fixed w-full z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center text-sm text-white">
            <Link
              to="/"
              className="flex items-center hover:text-white/80 transition-colors"
            >
              <Home className="w-4 h-4 mr-1" />
              Home
            </Link>
            <ChevronRight className="w-4 h-4 mx-2 text-white/60" />
            <span className="font-medium">Products</span>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-20">
        {/* Filters */}
        <section className="bg-white  rounded-xl shadow-sm p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search products..."
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 
                bg-gray-50 focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-3 items-center">
              <ListFilter className="w-4 h-4 text-gray-400" />
              <select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 
                bg-white focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">All Categories</option>
                {brands.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </select>

              {/* Sort */}
              <div className="flex items-center gap-2">
                <SortAsc className="w-4 h-4 text-gray-400" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 
                    bg-white focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="latest">Latest Arrivals</option>
                  <option value="oldest">Oldest Arrivals</option>
                  {/* <option value="price_asc">Price: Low to High</option>
                  <option value="price_desc">Price: High to Low</option> */}
                  <option value="name_asc">Name: A-Z</option>
                  <option value="name_desc">Name: Z-A</option>
                </select>
              </div>
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 5xl:grid-cols-5 justify-center px-4">
          {products.length > 0 ? (
            products.map((product) => (
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

        {/* Pagination */}
        <section className="mt-12 flex justify-center">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </section>
      </main>

      {/* Footer */}
      {/* <Footer /> */}
    </div>
  );
};

export default Products;
