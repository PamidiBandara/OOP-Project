import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react'
import { useCart } from '../../context/CartContext'

const Cart = () => {
  const { cart, updateQuantity, removeFromCart } = useCart()
  const navigate = useNavigate()

  if (!cart.items || cart.items.length === 0) {
    return (
      <div className="container-custom py-24 flex flex-col items-center justify-center text-center min-h-[60vh]">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
          <ShoppingBag size={48} className="text-gray-400" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
        <p className="text-gray-500 mb-8 max-w-md">Looks like you haven't added anything to your cart yet. Browse our categories and discover our amazing products.</p>
        <Link to="/" className="btn btn-primary px-8 py-3 rounded-none inline-flex items-center gap-2 font-semibold">
          Continue Shopping <ArrowRight size={18} />
        </Link>
      </div>
    )
  }

  const shipping = cart.total > 5000 ? 0 : 350
  const orderTotal = cart.total + shipping

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container-custom">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Shopping Cart</h1>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="lg:w-2/3">
            <div className="bg-white border border-gray-200 shadow-sm">
              {/* Header */}
              <div className="hidden md:grid grid-cols-12 gap-4 p-4 border-b border-gray-100 bg-gray-50/50 text-sm font-semibold text-gray-500 uppercase tracking-wider">
                <div className="col-span-6">Product</div>
                <div className="col-span-2 text-center">Price</div>
                <div className="col-span-2 text-center">Quantity</div>
                <div className="col-span-2 text-right">Total</div>
              </div>

              {/* Items List */}
              <div className="divide-y divide-gray-100">
                {cart.items.map((item) => {
                  const priceToUse = item.discountPrice || item.price
                  
                  return (
                    <div key={item.id} className="grid grid-cols-1 md:grid-cols-12 gap-4 p-6 items-center">
                      
                      {/* Product Info */}
                      <div className="col-span-1 md:col-span-6 flex gap-4">
                        <div className="w-20 h-24 bg-gray-50 flex-shrink-0 flex items-center justify-center border border-gray-100 p-2">
                          {item.mainImage ? (
                            <img src={item.mainImage} alt={item.name} className="w-full h-full object-contain" />
                          ) : (
                            <ShoppingBag size={24} className="text-gray-300" />
                          )}
                        </div>
                        <div className="flex flex-col justify-center">
                          <Link to={`/products/${item.id}`} className="font-bold text-gray-900 hover:text-primary transition-colors line-clamp-2">
                            {item.name}
                          </Link>
                          {item.author && <p className="text-sm text-gray-500 mt-1">{item.author}</p>}
                          <button 
                            onClick={() => removeFromCart(item.id)}
                            className="text-red-500 hover:text-red-700 text-sm flex items-center gap-1 mt-3 w-max transition-colors font-medium"
                          >
                            <Trash2 size={14} /> Remove
                          </button>
                        </div>
                      </div>

                      {/* Price */}
                      <div className="col-span-1 md:col-span-2 text-center hidden md:block">
                        <span className="font-medium text-gray-900">Rs. {priceToUse.toFixed(2)}</span>
                      </div>

                      {/* Quantity */}
                      <div className="col-span-1 md:col-span-2 flex items-center justify-between md:justify-center">
                        <span className="md:hidden text-sm text-gray-500 font-medium">Quantity:</span>
                        <div className="flex items-center border border-gray-200 bg-gray-50">
                          <button 
                            onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                            className="w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-gray-200 hover:text-gray-900 transition-colors"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="w-10 text-center font-medium text-gray-900 bg-white h-8 flex items-center justify-center border-x border-gray-200">
                            {item.quantity}
                          </span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-gray-200 hover:text-gray-900 transition-colors"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      </div>

                      {/* Subtotal */}
                      <div className="col-span-1 md:col-span-2 text-right flex items-center justify-between md:justify-end">
                        <span className="md:hidden text-sm text-gray-500 font-medium">Total:</span>
                        <span className="font-bold text-primary">Rs. {(priceToUse * item.quantity).toFixed(2)}</span>
                      </div>

                    </div>
                  )
                })}
              </div>
            </div>
            
            <div className="mt-6">
              <Link to="/" className="text-primary hover:text-blue-700 font-semibold inline-flex items-center gap-2">
                 Continue Shopping
              </Link>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:w-1/3">
            <div className="bg-white border border-gray-200 shadow-sm p-6 sticky top-24">
              <h2 className="text-lg font-bold text-gray-900 mb-6 uppercase tracking-wider border-b border-gray-100 pb-4">Order Summary</h2>
              
              <div className="space-y-4 text-sm text-gray-600 mb-6">
                <div className="flex justify-between">
                  <span>Subtotal ({cart.items.reduce((acc, item) => acc + item.quantity, 0)} items)</span>
                  <span className="font-medium text-gray-900">Rs. {cart.total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping Estimate</span>
                  <span className="font-medium text-gray-900">{shipping === 0 ? 'Free' : `Rs. ${shipping.toFixed(2)}`}</span>
                </div>
                {shipping > 0 && (
                  <p className="text-xs text-blue-600 bg-blue-50 p-2 border border-blue-100 mt-1">
                    Free shipping on orders over Rs. 5,000!
                  </p>
                )}
              </div>
              
              <div className="border-t border-gray-100 pt-4 mb-6">
                <div className="flex justify-between items-end">
                  <span className="text-base font-bold text-gray-900">Total</span>
                  <div className="text-right">
                    <span className="text-2xl font-extrabold text-primary">Rs. {orderTotal.toFixed(2)}</span>
                    <p className="text-xs text-gray-500 mt-1">Including GST</p>
                  </div>
                </div>
              </div>
              
              <button 
                onClick={() => navigate('/checkout')}
                className="w-full btn btn-primary py-4 rounded-none font-bold text-base shadow-lg hover:shadow-xl transition-all"
              >
                Proceed to Checkout
              </button>
              
              <div className="mt-6 text-center text-xs text-gray-400 flex flex-col gap-2">
                <p>Secure Checkout powered by Stripe</p>
                <div className="flex justify-center gap-2">
                  <span className="bg-gray-100 px-2 py-1 rounded">VISA</span>
                  <span className="bg-gray-100 px-2 py-1 rounded">MasterCard</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
