import React, { useState, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { productAPI } from '../../services/api'
import toast from 'react-hot-toast'
import ProductCard from '../../components/common/ProductCard'
import FilterBar from '../../components/common/FilterBar'

const StudyKitsPage = () => {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [sortOption, setSortOption] = useState('default')

  useEffect(() => {
    const fetchItems = async () => {
      try {
        setLoading(true)
        const res = await productAPI.getAllProducts(0, 100)
        const allProducts = res.data?.data?.content || []
        const filtered = allProducts.filter(p => p.type === 'Study Pack')
        setItems(filtered)
      } catch (error) {
        toast.error('Failed to load study kits')
      } finally {
        setLoading(false)
      }
    }

    fetchItems()
  }, [])

  const filteredAndSortedItems = useMemo(() => {
    let result = [...items]
    
    if (searchQuery.trim()) {
      const lowerQuery = searchQuery.toLowerCase()
      result = result.filter(item => 
        item.name?.toLowerCase().includes(lowerQuery) || 
        item.description?.toLowerCase().includes(lowerQuery)
      )
    }

    switch (sortOption) {
      case 'price-asc':
        result.sort((a, b) => (a.discountPrice || a.price) - (b.discountPrice || b.price))
        break
      case 'price-desc':
        result.sort((a, b) => (b.discountPrice || b.price) - (a.discountPrice || a.price))
        break
      case 'name-asc':
        result.sort((a, b) => a.name.localeCompare(b.name))
        break
      case 'name-desc':
        result.sort((a, b) => b.name.localeCompare(a.name))
        break
      default:
        break
    }
    
    return result
  }, [items, searchQuery, sortOption])

  return (
    <div className="container-custom py-12 min-h-screen">
      <h1 className="section-title">Study Kits</h1>
      <p className="text-gray-600 mb-8">Comprehensive study kits for all your educational needs.</p>
      
      {!loading && (
        <FilterBar 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          sortOption={sortOption}
          setSortOption={setSortOption}
          totalItems={filteredAndSortedItems.length}
        />
      )}
      
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="card h-80 bg-gray-100 rounded-xl animate-pulse"></div>
          ))}
        </div>
      ) : filteredAndSortedItems.length === 0 ? (
        <div className="text-center py-12 text-gray-500 bg-white rounded-none border border-gray-100 shadow-sm">
          No study kits found matching your criteria. Try adjusting your search!
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {filteredAndSortedItems.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}

export default StudyKitsPage
