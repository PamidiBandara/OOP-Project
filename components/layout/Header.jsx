import React, { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { ShoppingCart, Heart, User, Menu, X, Search, LogOut } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { useCart } from '../../context/CartContext'
import { useWishlist } from '../../context/WishlistContext'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const { isAuthenticated, user, logout } = useAuth()
  const { cart } = useCart()
  const { wishlistItems } = useWishlist()
  const navigate = useNavigate()
  const location = useLocation()
  
  const isActive = (path) => location.pathname === path
  const navLinkClass = (path) => `transition-colors duration-300 font-medium text-sm ${isActive(path) ? 'text-primary border-b-2 border-primary pb-1' : 'text-gray-600 hover:text-primary pb-1'}`
  const mobileNavLinkClass = (path) => `px-4 py-3 rounded-lg transition font-medium ${isActive(path) ? 'bg-primary/10 text-primary' : 'hover:bg-gray-50 text-gray-700'}`

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery) {
      navigate(`/books?search=${searchQuery}`)
      setSearchQuery('')
    }
  }

  const cartCount = cart?.items?.length || 0

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container-custom py-4 flex items-center justify-between">
        
        {/* Left: Logo */}
        <Link to="/" className="flex items-center gap-2 min-w-max">
          <img src="/logo.jpg" alt="නැණසල Logo" className="w-10 h-10 object-contain rounded-lg" />
          <span className="hidden lg:inline font-bold text-xl text-dark tracking-tight">නැණසල</span>
        </Link>

        {/* Center: Navigation Menu (Desktop) */}
        <nav className="hidden md:flex items-center justify-center gap-8 flex-1 mx-4">
          <Link to="/" className={navLinkClass('/')}>Home</Link>
          <Link to="/books" className={navLinkClass('/books')}>Books</Link>
          <Link to="/stationery" className={navLinkClass('/stationery')}>Stationery</Link>
          <Link to="/study-kits" className={navLinkClass('/study-kits')}>Study Kits</Link>
          {isAuthenticated && user?.role === 'CUSTOMER' && (
            <Link to="/orders" className={navLinkClass('/orders')}>My Orders</Link>
          )}
          {user?.role === 'ADMIN' && (
            <Link to="/admin/dashboard" className={navLinkClass('/admin/dashboard')}>Admin</Link>
          )}
        </nav>

        {/* Right: Actions */}
        <div className="flex items-center gap-5 min-w-max">
          
          {/* Compact Search */}
          <form onSubmit={handleSearch} className="hidden lg:flex items-center bg-gray-50 rounded-lg border border-gray-200 px-3 py-2 focus-within:ring-2 focus-within:ring-primary/20 transition-all">
            <Search size={18} className="text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border-none focus:outline-none text-sm w-40 px-2 text-gray-700"
            />
          </form>

          {/* Wishlist */}
          <Link to="/wishlist" className="hidden sm:flex items-center text-gray-500 hover:text-primary transition-colors relative">
            <Heart className="w-5 h-5" />
            {wishlistItems && wishlistItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {wishlistItems.length}
              </span>
            )}
          </Link>

          {/* Cart */}
          <Link to="/cart" className="flex items-center text-gray-500 hover:text-primary transition-colors relative">
            <ShoppingCart size={20} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>

          {/* User / Login */}
          {isAuthenticated ? (
            <div className="flex items-center gap-3 pl-4 border-l border-gray-200 ml-2">
              <Link to="/profile" className="flex items-center gap-2 hover:text-primary transition-colors group" title={user?.email || 'Profile'}>
                <div className="w-8 h-8 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                  <User size={16} />
                </div>
                <span className="hidden lg:block text-sm font-medium text-gray-700 group-hover:text-primary transition-colors max-w-[150px] truncate">
                  {user?.email || 'Profile'}
                </span>
              </Link>
              <button onClick={handleLogout} className="text-gray-400 hover:text-danger transition-colors" title="Logout">
                <LogOut size={18} />
              </button>
            </div>
          ) : (
            <Link to="/login" className="hidden sm:block ml-4 px-5 py-2 text-sm bg-primary text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
              Sign In
            </Link>
          )}

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-gray-600 ml-2"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-t border-gray-100 shadow-lg">
          <div className="p-4 flex flex-col gap-2">
            <form onSubmit={handleSearch} className="flex items-center bg-gray-50 rounded-lg border border-gray-200 px-3 py-2 mb-2">
              <Search size={18} className="text-gray-400 mr-2" />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent border-none focus:outline-none text-sm w-full text-gray-700"
              />
            </form>
            <Link to="/" className={mobileNavLinkClass('/')}>Home</Link>
            <Link to="/books" className={mobileNavLinkClass('/books')}>Books</Link>
            <Link to="/stationery" className={mobileNavLinkClass('/stationery')}>Stationery</Link>
            <Link to="/study-kits" className={mobileNavLinkClass('/study-kits')}>Study Kits</Link>
            {isAuthenticated && user?.role === 'CUSTOMER' && (
              <Link to="/orders" className={mobileNavLinkClass('/orders')}>My Orders</Link>
            )}
            {user?.role === 'ADMIN' && (
              <Link to="/admin/dashboard" className={mobileNavLinkClass('/admin/dashboard')}>Admin</Link>
            )}
            {!isAuthenticated && (
              <Link to="/login" className="px-4 py-3 mt-2 bg-primary text-white rounded-lg text-center font-medium">Sign In</Link>
            )}
          </div>
        </div>
      )}
    </header>
  )
}

export default Header
