import React from 'react'
import { Link } from 'react-router-dom'

const AnnouncementsPage = () => {
  return (
    <div className="container-custom py-12">
      <h1 className="section-title">Announcements</h1>
      <p className="text-gray-600">Latest news and updates from නැණසල.</p>
      <div className="space-y-6 mt-8">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="card p-6">
            <div className="h-6 w-32 bg-gray-200 rounded mb-4 animate-pulse"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3 animate-pulse"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AnnouncementsPage
