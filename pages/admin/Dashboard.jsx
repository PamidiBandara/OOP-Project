import React, { useState, useEffect } from 'react'
import { productAPI, orderAPI, customerAPI } from '../../services/api'
import { Package, DollarSign, ShoppingBag, Users } from 'lucide-react'

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalRevenue: 0,
    totalOrders: 0,
    totalCustomers: 0
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true)
        
        // Fetch products count
        const productsRes = await productAPI.getAllProducts(0, 1)
        const productsCount = productsRes.data?.data?.totalElements || 0
        
        // Fetch customers count
        const customersRes = await customerAPI.getAllCustomers(0, 1)
        const customersCount = customersRes.data?.data?.totalElements || 0

        // Fetch orders and calculate revenue
        const ordersRes = await orderAPI.getAdminAllOrders(0, 1000)
        const ordersList = ordersRes.data?.data?.content || ordersRes.data?.data || []
        const ordersCount = ordersRes.data?.data?.totalElements || ordersList.length || 0
        
        // Calculate total revenue from all non-cancelled orders
        const revenue = ordersList
          .filter(order => order.status !== 'CANCELLED')
          .reduce((sum, order) => sum + (order.totalAmount || 0), 0)

        setStats({
          totalProducts: productsCount,
          totalRevenue: revenue,
          totalOrders: ordersCount,
          totalCustomers: customersCount
        })

      } catch (error) {
        console.error('Failed to fetch dashboard stats', error)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  return (
    <div className="container-custom py-12">
      <h1 className="section-title mb-8">Admin Dashboard Overview</h1>
      
      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center text-blue-500">
              <Package size={28} />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Total Products</p>
              <h3 className="text-2xl font-bold text-gray-800">{stats.totalProducts}</h3>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-green-50 flex items-center justify-center text-green-500">
              <DollarSign size={28} />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Total Revenue</p>
              <h3 className="text-2xl font-bold text-gray-800">Rs. {stats.totalRevenue.toFixed(2)}</h3>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-orange-50 flex items-center justify-center text-orange-500">
              <ShoppingBag size={28} />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Total Orders</p>
              <h3 className="text-2xl font-bold text-gray-800">{stats.totalOrders}</h3>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-purple-50 flex items-center justify-center text-purple-500">
              <Users size={28} />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Total Customers</p>
              <h3 className="text-2xl font-bold text-gray-800">{stats.totalCustomers}</h3>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminDashboard
