import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Trash2, X } from 'lucide-react';
import { useFetchWishlist } from '@/hooks/queries/useWishlistQueries';
import ProductCard from '@/components/user/ProductCard';
import toast from 'react-hot-toast';
import { useClearWishlist } from '@/hooks/mutations/useWishListMutations';

const WishlistScreen = () => {

    const {data:products,isLoading,isError}=useFetchWishlist()
    const {mutate:clearWishlist}=useClearWishlist()

    console.log(products)

  const [wishlistItems, setWishlistItems] = useState([])
//     // {
//     //   id: 1,
//     //   name: 'Premium Headphones',
//     //   price: 199.99,
//     //   image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80',
//     // },
//     // {
//     //   id: 2,
//     //   name: 'Designer Watch',
//     //   price: 349.99,
//     //   image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80',
//     // },
//     // {
//     //   id: 3,
//     //   name: 'Wireless Speaker',
//     //   price: 129.99,
//     //   image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80',
//     // },
//   ]);

  const removeItem = (id) => {
    // setWishlistItems(wishlistItems.filter(item => item.id !== id));
  };

  const emptyWishlist = () => {
    toast.success('clicked clear wishlist')
    clearWishlist({
        onSuccess:()=>{
            toast.success('wishlist cleared')
        }
    })
    // setWishlistItems([]);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Your Wishlist</h1>
        {products?.length > 0 && (
          <Button 
            variant="destructive" 
            onClick={emptyWishlist}
            className="flex items-center gap-2"
          >
            <Trash2 size={18} />
            Empty Wishlist
          </Button>
        )}
      </div>

        {/* Products Grid */}
              <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 px-4">
                {products?.length > 0 ? (
                  products.map((product) => (
                    <ProductCard key={product.defaultVariant._id} product={product} />
                  ))
                ) : isLoading ? (
                  <p>Loading products...</p>
                ) : isError ? (
                  <p className="text-red-500">Error: {error.message}</p>
                ) : (
                  <p>No products found.</p>
                )}
              </section>

      {/* {wishlistItems.length === 0 ? (
        <div className="text-center py-20">
          <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">Your wishlist is empty</h2>
          <p className="text-gray-500 max-w-md mx-auto">
            Start adding items you love! Your saved items will appear here.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlistItems.map((item) => (
            <div 
              key={item.id}
              className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-all duration-300"
            >
              <div className="relative">
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-48" />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 rounded-full bg-white/80 hover:bg-white"
                  onClick={() => removeItem(item.id)}
                >
                  <X className="text-gray-700" size={18} />
                </Button>
              </div>
              
              <div className="p-4">
                <h3 className="font-medium text-gray-900 truncate">{item.name}</h3>
                <p className="text-lg font-semibold text-primary mt-1">${item?.price?.toFixed(2)}</p>
                
                <div className="mt-4 flex gap-2">
                  <Button variant="outline" className="flex-1">
                    Add to Cart
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )} */}
    </div>
  );
};

export default WishlistScreen;