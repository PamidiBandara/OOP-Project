import React from 'react'

const OffersPage = () => {
  return (
    <div className="container-custom py-12">
      <h1 className="section-title">Special Offers</h1>
      <p className="text-gray-600">Don't miss our latest promotions and discounts.</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        {[...Array(9)].map((_, i) => (
          <div key={i} className="card h-64 bg-gray-100 rounded-xl animate-pulse"></div>
        ))}
      </div>
    </div>
  )
}

export default OffersPage
