import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Star, ShoppingCart, ArrowLeft, Truck, ShieldCheck, Tag, Box, BookOpen, Fingerprint, Heart } from 'lucide-react'
import { productAPI } from '../../services/api'
import { useCart } from '../../context/CartContext'
import { useWishlist } from '../../context/WishlistContext'
import toast from 'react-hot-toast'

const ProductDetailsPage = () => {
  const { id } = useParams()
  const { addToCart } = useCart()
  const { toggleWishlist, isInWishlist } = useWishlist()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState('description') // description or specs

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true)
        const res = await productAPI.getProduct(id)
        setProduct(res.data.data)
      } catch (error) {
        toast.error('Failed to load product details')
      } finally {
        setLoading(false)
      }
    }
    if (id) {
      fetchProduct()
    }
  }, [id])

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity)
      toast.success(
        <div className="flex items-center gap-2">
          <ShoppingCart size={18} className="text-white" />
          <span>{quantity} {quantity > 1 ? 'items' : 'item'} added to cart</span>
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
  }

  const handleQuantityChange = (type) => {
    if (type === 'inc' && quantity < (product?.stock || 1)) {
      setQuantity(q => q + 1)
    } else if (type === 'dec' && quantity > 1) {
      setQuantity(q => q - 1)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-12">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-7 h-[600px] bg-white/60 rounded-3xl animate-pulse"></div>
            <div className="lg:col-span-5 space-y-6">
              <div className="h-12 bg-white/60 rounded-xl w-3/4 animate-pulse"></div>
              <div className="h-6 bg-white/60 rounded-xl w-1/4 animate-pulse"></div>
              <div className="h-40 bg-white/60 rounded-2xl w-full animate-pulse"></div>
              <div className="h-16 bg-white/60 rounded-2xl w-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex flex-col items-center justify-center p-6 text-center">
        <Box size={64} className="text-gray-300 mb-6 animate-float" />
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Product Not Found</h2>
        <p className="text-gray-500 mb-8 max-w-md">The product you are looking for does not exist or has been removed from our catalog.</p>
        <Link to="/" className="px-8 py-4 bg-primary text-white rounded-xl shadow-glow-colored font-bold hover:-translate-y-1 transition-transform inline-flex items-center gap-2">
          <ArrowLeft size={20} /> Back to Home
        </Link>
      </div>
    )
  }

  const isOutOfStock = product.stock <= 0
  const productType = product.type || (product.category ? 'Book' : 'Item')

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/50 py-8 lg:py-16 font-poppins relative overflow-hidden">
      {/* Decorative background blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-400/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-400/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="container-custom relative z-10">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8 font-medium animate-slideUp">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <span>/</span>
          <Link to={`/${productType.toLowerCase()}s`} className="hover:text-primary transition-colors">{productType}s</Link>
          <span>/</span>
          <span className="text-dark truncate max-w-[200px]">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          {/* Left Column: Image Gallery */}
          <div className="lg:col-span-7 flex flex-col gap-6 animate-slideUp">
            <div className="w-full aspect-square bg-white rounded-[2rem] p-12 shadow-soft border border-white/40 backdrop-blur-xl relative flex items-center justify-center group overflow-hidden">
              {product.mainImage ? (
                <img 
                  src={product.mainImage} 
                  alt={product.name} 
                  className="w-full h-full object-contain filter drop-shadow-2xl transition-transform duration-700 group-hover:scale-105" 
                />
              ) : (
                <div className="text-gray-300 flex flex-col items-center gap-4">
                  <Box size={64} />
                  <span className="font-medium text-lg">No Image Available</span>
                </div>
              )}
            </div>
            
            {/* Trust Badges */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/80 backdrop-blur-sm p-4 rounded-2xl border border-white flex items-center gap-4 shadow-sm">
                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center shrink-0">
                  <Truck size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-dark text-sm">Free Shipping</h4>
                  <p className="text-xs text-gray-500">On orders over Rs. 5,000</p>
                </div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm p-4 rounded-2xl border border-white flex items-center gap-4 shadow-sm">
                <div className="w-12 h-12 bg-green-50 text-green-600 rounded-xl flex items-center justify-center shrink-0">
                  <ShieldCheck size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-dark text-sm">Secure Payment</h4>
                  <p className="text-xs text-gray-500">100% safe checkout</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Details & CTA */}
          <div className="lg:col-span-5 lg:sticky lg:top-24 animate-slideUp" style={{ animationDelay: '0.1s' }}>
            <div className="mb-6">
              <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-primary/10 text-primary font-semibold text-sm tracking-wide">
                {productType === 'Book' ? <BookOpen size={16} /> : <Box size={16} />}
                {productType}
              </span>
            </div>
            
            <h1 className="text-4xl lg:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-600 mb-4 leading-tight">
              {product.name}
            </h1>
            
            {product.author && (
              <p className="text-xl text-gray-600 mb-6 font-medium flex items-center gap-2">
                <span className="w-8 h-[2px] bg-primary"></span>
                By {product.author}
              </p>
            )}

            <div className="flex items-center gap-4 mb-8">
              <div className="flex items-center gap-1 bg-yellow-50 px-3 py-1.5 rounded-lg border border-yellow-100">
                <Star size={18} className="fill-yellow-400 text-yellow-400" />
                <span className="font-bold text-yellow-700">{product.averageRating || '0.0'}</span>
              </div>
              <span className="text-gray-500 font-medium hover:text-primary cursor-pointer transition-colors underline decoration-dotted underline-offset-4">
                See all {product.reviewCount || 0} reviews
              </span>
            </div>

            <div className="bg-white/80 backdrop-blur-xl p-8 rounded-3xl border border-white/50 shadow-soft mb-8">
              <div className="flex flex-col gap-6">
                {/* Price */}
                <div className="flex items-end gap-4 border-b border-gray-100 pb-6">
                  <span className="text-5xl font-extrabold text-gray-900">Rs. {product.price}</span>
                </div>

                {/* Stock & Quantity */}
                <div className="flex flex-col sm:flex-row items-center gap-4 justify-between pt-2">
                  <div className="flex items-center gap-3">
                    <span className="font-semibold text-gray-700">Quantity</span>
                    <div className="flex items-center bg-gray-50 border border-gray-200 rounded-xl overflow-hidden shadow-inner">
                      <button 
                        onClick={() => handleQuantityChange('dec')}
                        disabled={quantity <= 1}
                        className="w-12 h-12 flex items-center justify-center text-gray-600 hover:bg-gray-200 disabled:opacity-30 transition-all font-medium text-lg"
                      >
                        -
                      </button>
                      <span className="w-12 text-center font-bold text-gray-900 text-lg">{quantity}</span>
                      <button 
                        onClick={() => handleQuantityChange('inc')}
                        disabled={quantity >= product.stock}
                        className="w-12 h-12 flex items-center justify-center text-gray-600 hover:bg-gray-200 disabled:opacity-30 transition-all font-medium text-lg"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  
                  <div className={`px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 ${
                    product.stock > 10 ? 'bg-green-50 text-green-700 border border-green-100' : 
                    product.stock > 0 ? 'bg-orange-50 text-orange-700 border border-orange-100' : 
                    'bg-red-50 text-red-700 border border-red-100'
                  }`}>
                    <div className={`w-2 h-2 rounded-full ${
                      product.stock > 10 ? 'bg-green-500' : 
                      product.stock > 0 ? 'bg-orange-500' : 
                      'bg-red-500'
                    } animate-pulse`}></div>
                    {product.stock > 0 ? `${product.stock} Available` : 'Out of Stock'}
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex gap-4 mt-4">
                  <button 
                    onClick={handleAddToCart}
                    disabled={isOutOfStock}
                    className="flex-1 h-16 bg-gradient-to-r from-primary to-blue-600 hover:from-blue-600 hover:to-blue-700 disabled:from-gray-300 disabled:to-gray-400 text-white rounded-2xl font-bold text-xl transition-all duration-300 hover:shadow-glow-colored disabled:shadow-none flex items-center justify-center gap-3 transform hover:-translate-y-1 disabled:transform-none disabled:cursor-not-allowed"
                  >
                    <ShoppingCart size={24} />
                    {isOutOfStock ? 'Sold Out' : 'Add to Cart'}
                  </button>
                  <button
                    onClick={() => toggleWishlist(product)}
                    className="w-16 h-16 bg-gray-50 border border-gray-200 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-2xl flex items-center justify-center transition-all duration-300 hover:shadow-sm hover:border-red-100"
                  >
                    <Heart size={24} className={isInWishlist(product.id) ? 'fill-red-500 text-red-500' : ''} />
                  </button>
                </div>
              </div>
            </div>

            {/* Description & Specs Tabs */}
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl border border-white/50 shadow-soft overflow-hidden">
              <div className="flex border-b border-gray-100">
                <button 
                  onClick={() => setActiveTab('description')}
                  className={`flex-1 py-4 text-center font-bold text-sm uppercase tracking-wider transition-colors ${activeTab === 'description' ? 'text-primary border-b-2 border-primary' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  Description
                </button>
                <button 
                  onClick={() => setActiveTab('specs')}
                  className={`flex-1 py-4 text-center font-bold text-sm uppercase tracking-wider transition-colors ${activeTab === 'specs' ? 'text-primary border-b-2 border-primary' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  Specifications
                </button>
              </div>
              
              <div className="p-8">
                {activeTab === 'description' ? (
                  <p className="text-gray-600 leading-relaxed text-lg">
                    {product.description || 'Discover more about this fantastic item. A detailed description is coming soon!'}
                  </p>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
                      <div className="flex items-center gap-3 text-gray-500">
                        <Box size={18} /> <span className="font-medium">Product Type</span>
                      </div>
                      <span className="font-bold text-gray-800">{productType}</span>
                    </div>
                    {product.isbn && (
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
                        <div className="flex items-center gap-3 text-gray-500">
                          <Fingerprint size={18} /> <span className="font-medium">ISBN</span>
                        </div>
                        <span className="font-bold text-gray-800">{product.isbn}</span>
                      </div>
                    )}
                    {product.sku && (
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
                        <div className="flex items-center gap-3 text-gray-500">
                          <Tag size={18} /> <span className="font-medium">SKU</span>
                        </div>
                        <span className="font-bold text-gray-800 font-mono text-sm">{product.sku}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetailsPage
