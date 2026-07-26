import React, { createContext, useContext, useState, useEffect } from 'react'
import { wishlistAPI } from '../services/api'
import { useAuth } from './AuthContext'
import toast from 'react-hot-toast'

const WishlistContext = createContext()

export const useWishlist = () => {
  return useContext(WishlistContext)
}

export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState([])
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()

  const fetchWishlist = async () => {
    if (!user) {
      setWishlistItems([])
      setLoading(false)
      return
    }

    try {
      setLoading(true)
      const res = await wishlistAPI.getWishlist()
      const data = res.data?.data
      setWishlistItems(data?.items || [])
    } catch (error) {
      if (error.response?.status !== 404 && error.response?.status !== 403) {
        console.error('Failed to load wishlist:', error)
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchWishlist()
  }, [user])

  const toggleWishlist = async (product) => {
    if (!user) {
      toast.error('Please login to use wishlist')
      return false
    }

    const isCurrentlyInWishlist = wishlistItems.some(item => item.id === product.id)

    try {
      if (isCurrentlyInWishlist) {
        await wishlistAPI.removeFromWishlist(product.id)
        setWishlistItems(prev => prev.filter(item => item.id !== product.id))
        toast.success('Removed from wishlist')
      } else {
        await wishlistAPI.addToWishlist(product.id)
        setWishlistItems(prev => [...prev, product])
        toast.success('Added to wishlist', { icon: '❤️' })
      }
      return !isCurrentlyInWishlist
    } catch (error) {
      console.error('Failed to update wishlist:', error)
      toast.error('Failed to update wishlist')
      return isCurrentlyInWishlist
    }
  }
  
  const removeFromWishlist = async (productId) => {
      try {
        await wishlistAPI.removeFromWishlist(productId)
        setWishlistItems(prev => prev.filter(item => item.id !== productId))
        toast.success('Removed from wishlist')
      } catch (error) {
        console.error('Failed to remove from wishlist:', error)
        toast.error('Failed to remove from wishlist')
      }
  }

  const isInWishlist = (productId) => {
    return wishlistItems.some(item => item.id === productId)
  }

  const value = {
    wishlistItems,
    loading,
    toggleWishlist,
    removeFromWishlist,
    isInWishlist,
    fetchWishlist
  }

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  )
}
