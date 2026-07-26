import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Package, ArrowRight, Loader2 } from 'lucide-react'
import { orderAPI } from '../../services/api'
import toast from 'react-hot-toast'

const MyOrders = () => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    try {
      setLoading(true)
      const response = await orderAPI.getAllOrders()
      setOrders(response.data?.data?.content || response.data?.data || [])
    } catch (error) {
      console.error('Error fetching orders:', error)
      toast.error('Failed to load your orders')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="container-custom py-24 flex items-center justify-center min-h-[60vh]">
        <Loader2 className="animate-spin text-primary w-12 h-12" />
      </div>
    )
  }

  if (orders.length === 0) {
    return (
      <div className="container-custom py-24 flex flex-col items-center justify-center text-center min-h-[60vh]">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
          <Package size={48} className="text-gray-400" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">No Orders Yet</h1>
        <p className="text-gray-500 mb-8 max-w-md">You haven't placed any orders with us yet. Start exploring our collection to find something you love.</p>
        <Link to="/" className="btn btn-primary px-8 py-3 rounded-none inline-flex items-center gap-2 font-semibold">
          Start Shopping <ArrowRight size={18} />
        </Link>
      </div>
    )
  }

  return (
    <div className="container-custom py-12 min-h-screen">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-8">My Orders</h1>
      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order.id} className="bg-white border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <p className="font-bold text-gray-900 text-lg">Order #{order.id?.substring(0, 8) || order.orderNumber || 'Unknown'}</p>
                <p className="text-gray-500 text-sm mt-1">
                  Placed on {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : 'N/A'}
                </p>
              </div>
              <div className="text-left sm:text-right">
                <p className="font-extrabold text-primary text-xl mb-1">
                  Rs. {order.totalAmount?.toFixed(2) || '0.00'}
                </p>
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                  order.status === 'DELIVERED' ? 'bg-green-100 text-green-700' :
                  order.status === 'PENDING' ? 'bg-yellow-100 text-yellow-700' :
                  order.status === 'CANCELLED' ? 'bg-red-100 text-red-700' :
                  'bg-blue-100 text-blue-700'
                }`}>
                  {order.status || 'PROCESSING'}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MyOrders
