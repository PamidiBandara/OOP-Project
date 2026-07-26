import React from 'react'
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { LayoutDashboard, Package, Tags, ShoppingBag, Users, LogOut, Home, Menu } from 'lucide-react'

const AdminLayout = () => {
  const { logout, user } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const navItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Products', path: '/admin/products', icon: Package },
    { name: 'Categories', path: '/admin/categories', icon: Tags },
    { name: 'Orders', path: '/admin/orders', icon: ShoppingBag },
    { name: 'Customers', path: '/admin/customers', icon: Users },
  ]

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar Desktop */}
      <aside className="w-64 bg-white border-r border-gray-200 shadow-sm hidden md:flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-gray-200 gap-3">
          <img src="/logo.jpg" alt="Logo" className="w-8 h-8 rounded-md object-cover" />
          <span className="font-bold text-lg text-primary">Admin Panel</span>
        </div>
        
        <div className="p-4 border-b border-gray-100">
          <p className="text-sm text-gray-500">Welcome,</p>
          <p className="font-medium text-gray-800">{user?.firstName || 'Admin'}</p>
        </div>

        <nav className="flex-grow py-4 px-3 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = location.pathname === item.path
            return (
              <Link 
                key={item.path}
                to={item.path} 
                className={`flex items-center px-3 py-2 rounded-lg transition-colors ${isActive ? 'bg-primary/10 text-primary font-medium' : 'text-gray-700 hover:bg-gray-100'}`}
              >
                <Icon className={`w-5 h-5 mr-3 ${isActive ? 'text-primary' : 'text-gray-500'}`} />
                {item.name}
              </Link>
            )
          })}
        </nav>

        <div className="p-4 border-t border-gray-200 space-y-2">

          <button 
            onClick={handleLogout}
            className="w-full flex items-center px-3 py-2 text-danger rounded-lg hover:bg-red-50 transition-colors"
          >
            <LogOut className="w-5 h-5 mr-3" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 md:hidden">
           <div className="flex items-center gap-3">
             <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-gray-600">
               <Menu size={24} />
             </button>
             <span className="font-bold text-lg text-primary">Admin</span>
           </div>
           <button onClick={handleLogout} className="text-danger"><LogOut size={20}/></button>
        </header>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-gray-200 absolute top-16 left-0 right-0 z-50 shadow-lg">
            <nav className="flex flex-col py-2">
              {navItems.map((item) => {
                const Icon = item.icon
                const isActive = location.pathname === item.path
                return (
                  <Link 
                    key={item.path}
                    to={item.path} 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center px-4 py-3 border-b border-gray-50 transition-colors ${isActive ? 'bg-primary/5 text-primary font-medium' : 'text-gray-700'}`}
                  >
                    <Icon className={`w-5 h-5 mr-3 ${isActive ? 'text-primary' : 'text-gray-500'}`} />
                    {item.name}
                  </Link>
                )
              })}

            </nav>
          </div>
        )}

        <main className="flex-1 overflow-auto bg-gray-50 relative">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default AdminLayout
