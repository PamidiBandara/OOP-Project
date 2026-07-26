import React from 'react'
import { Link } from 'react-router-dom'

const NotFoundPage = () => {
  return (
    <div className="container-custom py-24 text-center">
      <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
      <p className="text-2xl font-semibold text-dark mb-2">Page Not Found</p>
      <p className="text-gray-600 mb-8">Sorry, the page you're looking for doesn't exist.</p>
      <Link to="/" className="btn btn-primary">
        Go Home
      </Link>
    </div>
  )
}

export default NotFoundPage
