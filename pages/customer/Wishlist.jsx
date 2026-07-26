import React from 'react'
import { useWishlist } from '../../context/WishlistContext'
import { useCart } from '../../context/CartContext'
import { HeartCrack, ShoppingCart, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import ProductCard from '../../components/common/ProductCard'

const Wishlist = () => {
  const { wishlistItems, loading, removeFromWishlist } = useWishlist()
  const { addToCart } = useCart()

  if (loading) {
    return (
      <div className="container-custom py-12">
        <h1 className="text-3xl font-bold mb-8">My Wishlist</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="card h-[400px] bg-white rounded-[2rem] animate-pulse"></div>
          ))}
        </div>
      </div>
    )
  }

  if (!wishlistItems || wishlistItems.length === 0) {
    return (
      <div className="container-custom py-24 flex flex-col items-center text-center">
        <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-6">
          <HeartCrack className="w-12 h-12 text-gray-300" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Wishlist is Empty</h2>
        <p className="text-gray-500 max-w-md mb-8">Looks like you haven't added any items to your wishlist yet. Discover our amazing collection of books and stationery!</p>
        <Link to="/books" className="px-8 py-4 bg-primary text-white font-bold rounded-xl shadow-glow flex items-center gap-2 hover:-translate-y-1 transition-transform">
          Start Shopping <ArrowRight size={20} />
        </Link>
      </div>
    )
  }

  return (
    <div className="container-custom py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Wishlist</h1>
          <p className="text-gray-500 mt-2">{wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {wishlistItems.map((product) => (
          <div key={product.id} className="relative group">
            {/* Remove from wishlist button */}
            <button 
              onClick={(e) => {
                e.preventDefault()
                removeFromWishlist(product.id)
              }}
              className="absolute -top-3 -right-3 z-20 w-8 h-8 bg-white border border-gray-100 rounded-full flex items-center justify-center text-gray-400 hover:text-red-500 hover:border-red-100 shadow-md transition-all opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0"
            >
              <HeartCrack size={14} />
            </button>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Wishlist
