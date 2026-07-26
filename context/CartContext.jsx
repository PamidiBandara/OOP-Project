import React, { createContext, useContext, useState, useEffect } from 'react'

const CartContext = createContext()

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart')
    return savedCart ? JSON.parse(savedCart) : { items: [], total: 0 }
  })

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  const addToCart = (product, quantity = 1) => {
    setCart((prevCart) => {
      const priceToUse = product.price
      const existingItem = prevCart.items.find((item) => item.id === product.id)
      
      if (existingItem) {
        return {
          ...prevCart,
          items: prevCart.items.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          ),
          total: prevCart.total + (priceToUse * quantity),
        }
      }
      
      return {
        ...prevCart,
        items: [...prevCart.items, { ...product, quantity, cartPrice: priceToUse }],
        total: prevCart.total + (priceToUse * quantity),
      }
    })
  }

  const removeFromCart = (productId) => {
    setCart((prevCart) => {
      const item = prevCart.items.find((item) => item.id === productId)
      const priceToUse = item?.price || 0
      return {
        ...prevCart,
        items: prevCart.items.filter((item) => item.id !== productId),
        total: prevCart.total - (priceToUse * (item?.quantity || 0)),
      }
    })
  }

  const updateQuantity = (productId, quantity) => {
    setCart((prevCart) => {
      const item = prevCart.items.find((item) => item.id === productId)
      const priceToUse = item?.price || 0
      const quantityDifference = (quantity - (item?.quantity || 0)) * priceToUse
      
      return {
        ...prevCart,
        items: prevCart.items.map((item) =>
          item.id === productId ? { ...item, quantity } : item
        ),
        total: prevCart.total + quantityDifference,
      }
    })
  }

  const clearCart = () => {
    setCart({ items: [], total: 0 })
  }

  const value = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
  }

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within CartProvider')
  }
  return context
}
