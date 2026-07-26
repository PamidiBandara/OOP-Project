import React from 'react'

const Dashboard = () => (
  <div className="container-custom py-12">
    <h1 className="section-title">Customer Dashboard</h1>
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
      <div className="card p-6 text-center">
        <div className="text-3xl font-bold text-primary">0</div>
        <p className="text-gray-600">Total Orders</p>
      </div>
      <div className="card p-6 text-center">
        <div className="text-3xl font-bold text-secondary">Rs. 0.00</div>
        <p className="text-gray-600">Total Spent</p>
      </div>
      <div className="card p-6 text-center">
        <div className="text-3xl font-bold text-success">0</div>
        <p className="text-gray-600">Wishlist Items</p>
      </div>
      <div className="card p-6 text-center">
        <div className="text-3xl font-bold text-danger">0</div>
        <p className="text-gray-600">Pending Orders</p>
      </div>
    </div>
  </div>
)

export default Dashboard
