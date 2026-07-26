import React from 'react'
import { Link } from 'react-router-dom'
import { Star, ShoppingCart, Heart, Tag } from 'lucide-react'
import { useCart } from '../../context/CartContext'
import { useWishlist } from '../../context/WishlistContext'
import toast from 'react-hot-toast'

const ProductCard = ({ product }) => {
  const { addToCart } = useCart()
  const { toggleWishlist, isInWishlist } = useWishlist()
  
  const inWishlist = isInWishlist(product.id)

  const handleAddToCart = (e) => {
    e.preventDefault()
    e.stopPropagation()
    addToCart(product)
    toast.success(
      <div className="flex items-center gap-2">
        <ShoppingCart size={18} className="text-white" />
        <span>Added to cart</span>
      </div>,
      {
        style: {
          borderRadius: '12px',
          background: '#10B981',
          color: '#fff',
        },
      }
    )
  }

  const handleWishlist = async (e) => {
    e.preventDefault()
    e.stopPropagation()
    await toggleWishlist(product)
  }

  return (
    <div className="group relative overflow-hidden bg-white border border-gray-100 rounded-none shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1 flex flex-col h-full">
      {/* Badges */}
      <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
        {product.isNew && (
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-xs font-bold px-3 py-1.5 rounded-none shadow-lg">
            NEW
          </div>
        )}
      </div>

      {/* Wishlist Button */}
      <button 
        onClick={handleWishlist}
        className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-sm hover:shadow-md transition-shadow text-gray-400 hover:text-red-500 z-10"
      >
        <Heart size={18} className={inWishlist ? 'fill-red-500 text-red-500' : ''} />
      </button>

      {/* Image Container */}
      <Link to={`/products/${product.id}`} className="block relative w-full aspect-[4/5] bg-gradient-to-b from-gray-50 to-white overflow-hidden p-6 flex items-center justify-center">
        {product.mainImage ? (
          <img 
            src={product.mainImage} 
            alt={product.name} 
            className="w-full h-full object-contain filter drop-shadow-md transition-transform duration-700 group-hover:scale-110" 
          />
        ) : (
          <span className="text-gray-300 font-medium">No Image</span>
        )}
        {/* Hover overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      </Link>

      {/* Content */}
      <div className="p-6 flex-1 flex flex-col justify-between bg-white relative z-20">
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold tracking-wider text-primary uppercase">
              {product.type || (product.category ? 'Book' : 'Item')}
            </span>
            <div className="flex items-center gap-1 bg-yellow-50 px-2 py-0.5 rounded-none border border-yellow-100">
              <Star size={12} className="fill-yellow-400 text-yellow-400" />
              <span className="text-xs font-bold text-yellow-700">{product.averageRating || '0.0'}</span>
            </div>
          </div>
          
          <Link to={`/products/${product.id}`}>
            <h3 className="font-bold text-gray-900 text-lg leading-tight mb-1 line-clamp-2 hover:text-primary transition-colors">
              {product.name}
            </h3>
          </Link>
          
          {product.author && (
            <p className="text-sm text-gray-500 line-clamp-1 mb-3">{product.author}</p>
          )}
        </div>

        <div className="mt-auto pt-4 flex flex-col gap-4">
          {/* Price */}
          <div className="flex items-end gap-2">
            <span className="text-2xl font-extrabold text-gray-900 leading-none">Rs. {product.price}</span>
          </div>

          {/* Quick Add Button */}
          <button 
            onClick={handleAddToCart}
            className="w-full py-3 bg-gray-900 hover:bg-primary text-white rounded-none font-semibold text-sm transition-all duration-300 shadow-md hover:shadow-glow-colored flex items-center justify-center gap-2"
          >
            <ShoppingCart size={18} />
            Quick Add
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
