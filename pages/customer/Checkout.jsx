import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../../context/CartContext'
import { orderAPI, uploadAPI } from '../../services/api'
import toast from 'react-hot-toast'
import { Upload } from 'lucide-react'

const Checkout = () => {
  const { cart, clearCart } = useCart()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState('CASH_ON_DELIVERY')
  const [slipFile, setSlipFile] = useState(null)

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    postalCode: '',
    phone: '',
    notes: ''
  })

  // Fixed shipping cost for simplicity
  const shippingCost = 5.00
  const totalAmount = cart.total + shippingCost

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (cart.items.length === 0) {
      toast.error('Your cart is empty!')
      return
    }
    if (paymentMethod === 'BANK_TRANSFER' && !slipFile) {
      toast.error('Please upload your payment slip')
      return
    }

    try {
      setLoading(true)
      
      let slipUrl = null
      if (paymentMethod === 'BANK_TRANSFER' && slipFile) {
        const uploadRes = await uploadAPI.uploadImage(slipFile)
        slipUrl = typeof uploadRes.data?.data === 'string' ? uploadRes.data.data : (uploadRes.data?.data?.url || uploadRes.data?.url || uploadRes.data)
      }

      // Format shipping address
      const shippingAddress = `${formData.firstName} ${formData.lastName}, ${formData.addressLine1}, ${formData.addressLine2 ? formData.addressLine2 + ', ' : ''}${formData.city}, ${formData.postalCode}, Phone: ${formData.phone}`

      // Prepare order data
      const orderData = {
        items: cart.items.map(item => ({
          productId: item.id,
          quantity: item.quantity,
          price: item.price
        })),
        subtotal: cart.total,
        shippingCost: shippingCost,
        totalAmount: totalAmount,
        shippingAddress: shippingAddress,
        billingAddress: shippingAddress,
        paymentMethod: paymentMethod,
        paymentSlipUrl: slipUrl,
        notes: formData.notes
      }

      await orderAPI.createOrder(orderData)
      toast.success('Order placed successfully!')
      clearCart()
      navigate('/orders')
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed to place order')
    } finally {
      setLoading(false)
    }
  }

  if (cart.items.length === 0) {
    return (
      <div className="container-custom py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Checkout</h1>
        <p className="text-gray-600 mb-6">Your cart is empty. Please add items to your cart before proceeding to checkout.</p>
        <button onClick={() => navigate('/books')} className="btn btn-primary">
          Continue Shopping
        </button>
      </div>
    )
  }

  return (
    <div className="container-custom py-12">
      <h1 className="section-title mb-8">Checkout</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Checkout Form */}
        <div className="lg:col-span-2">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-6">
            <h2 className="text-lg font-bold mb-4 border-b pb-2">Shipping Details</h2>
            <form id="checkout-form" onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
                  <input type="text" name="firstName" required value={formData.firstName} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
                  <input type="text" name="lastName" required value={formData.lastName} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address Line 1 *</label>
                  <input type="text" name="addressLine1" required value={formData.addressLine1} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" placeholder="Street address, P.O. box, company name, c/o" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address Line 2 (Optional)</label>
                  <input type="text" name="addressLine2" value={formData.addressLine2} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" placeholder="Apartment, suite, unit, building, floor, etc." />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">City *</label>
                  <input type="text" name="city" required value={formData.city} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Postal Code *</label>
                  <input type="text" name="postalCode" required value={formData.postalCode} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                  <input type="tel" name="phone" required value={formData.phone} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Order Notes (Optional)</label>
                  <textarea name="notes" rows="3" value={formData.notes} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" placeholder="Notes about your order, e.g. special notes for delivery."></textarea>
                </div>
              </div>
            </form>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-lg font-bold mb-4 border-b pb-2">Payment Details</h2>
            
            <div className="space-y-4 mb-6">
              <label className={`block p-4 border rounded-lg cursor-pointer transition-colors ${paymentMethod === 'CASH_ON_DELIVERY' ? 'border-primary bg-primary/5' : 'border-gray-200 hover:bg-gray-50'}`}>
                <div className="flex items-center gap-3">
                  <input 
                    type="radio" 
                    name="paymentMethod" 
                    value="CASH_ON_DELIVERY" 
                    checked={paymentMethod === 'CASH_ON_DELIVERY'}
                    onChange={() => setPaymentMethod('CASH_ON_DELIVERY')}
                    className="text-primary focus:ring-primary w-4 h-4" 
                  />
                  <div>
                    <span className="font-semibold text-gray-800 block">Cash on Delivery (COD)</span>
                    <span className="text-sm text-gray-600">Pay with cash upon delivery.</span>
                  </div>
                </div>
              </label>

              <label className={`block p-4 border rounded-lg cursor-pointer transition-colors ${paymentMethod === 'BANK_TRANSFER' ? 'border-primary bg-primary/5' : 'border-gray-200 hover:bg-gray-50'}`}>
                <div className="flex items-center gap-3">
                  <input 
                    type="radio" 
                    name="paymentMethod" 
                    value="BANK_TRANSFER" 
                    checked={paymentMethod === 'BANK_TRANSFER'}
                    onChange={() => setPaymentMethod('BANK_TRANSFER')}
                    className="text-primary focus:ring-primary w-4 h-4" 
                  />
                  <div>
                    <span className="font-semibold text-gray-800 block">Bank Transfer</span>
                    <span className="text-sm text-gray-600">Upload a payment slip.</span>
                  </div>
                </div>
              </label>
            </div>

            {paymentMethod === 'BANK_TRANSFER' && (
              <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                <div className="mb-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
                  <h3 className="font-semibold text-gray-800 mb-2">Bank Transfer Details</h3>
                  <p className="text-sm text-gray-600 mb-1">Please transfer the total amount to the following bank account:</p>
                  <ul className="text-sm font-medium text-gray-800 space-y-1 mt-3">
                    <li>Bank: <span className="font-bold text-primary">Commercial Bank</span></li>
                    <li>Account Name: <span className="font-bold">Smart Book Shop</span></li>
                    <li>Account No: <span className="font-bold text-lg">1234 5678 9012</span></li>
                    <li>Branch: <span className="font-bold">Colombo 01</span></li>
                  </ul>
                </div>

                <div className="space-y-3">
                  <label className="block text-sm font-medium text-gray-700">
                    Upload Payment Slip *
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:bg-gray-50 transition-colors">
                    <input 
                      type="file" 
                      id="slip-upload" 
                      className="hidden" 
                      accept="image/*"
                      onChange={(e) => setSlipFile(e.target.files[0])}
                    />
                    <label htmlFor="slip-upload" className="cursor-pointer flex flex-col items-center justify-center">
                      {slipFile ? (
                        <div className="text-green-600 font-medium flex flex-col items-center">
                          <span className="block mb-2 text-sm truncate max-w-[200px]">{slipFile.name}</span>
                          <span className="text-xs text-gray-500 hover:text-primary underline">Change File</span>
                        </div>
                      ) : (
                        <>
                          <Upload className="w-8 h-8 text-gray-400 mb-2" />
                          <span className="text-sm text-primary font-semibold">Click to upload slip</span>
                          <span className="text-xs text-gray-500 mt-1">JPG, PNG (Max 5MB)</span>
                        </>
                      )}
                    </label>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 sticky top-24">
            <h2 className="text-lg font-bold mb-4 border-b pb-2">Order Summary</h2>
            
            <div className="space-y-3 mb-6 max-h-60 overflow-y-auto pr-2">
              {cart.items.map(item => (
                <div key={item.id} className="flex justify-between items-center gap-2">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-800 truncate">{item.name}</p>
                    <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                  </div>
                  <p className="text-sm font-semibold">Rs. {(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>

            <div className="border-t pt-4 space-y-2 mb-6">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Subtotal</span>
                <span>Rs. {cart.total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Shipping</span>
                <span>Rs. {shippingCost.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-lg font-bold text-gray-800 pt-2 border-t mt-2">
                <span>Total</span>
                <span>Rs. {totalAmount.toFixed(2)}</span>
              </div>
            </div>

            <button 
              type="submit" 
              form="checkout-form"
              disabled={loading}
              className="w-full btn btn-primary py-3 text-lg"
            >
              {loading ? 'Processing...' : 'Place Order'}
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Checkout
