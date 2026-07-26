import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, BookOpen, PenTool, Book, Sparkles, Send, Truck, Banknote, Headphones, ShieldCheck, CheckCircle } from 'lucide-react'
import { productAPI, categoryAPI } from '../../services/api'
import toast from 'react-hot-toast'
import ProductCard from '../../components/common/ProductCard'

const HomePage = () => {
  const [featured, setFeatured] = useState([])
  const [latest, setLatest] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const [featuredRes, latestRes] = await Promise.all([
          productAPI.getFeaturedProducts(),
          productAPI.getLatestProducts(20)
        ])
        setFeatured(featuredRes.data.data || [])

        // Shuffle and pick 4 random latest products
        const allLatest = latestRes.data.data || []
        const shuffledLatest = [...allLatest].sort(() => 0.5 - Math.random())
        setLatest(shuffledLatest.slice(0, 4))
      } catch (error) {
        toast.error('Failed to load home page data')
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // Helper to map category names to icons
  const getCategoryIcon = (catName) => {
    const name = catName.toLowerCase()
    if (name.includes('book')) return <BookOpen size={32} className="text-white" />
    if (name.includes('stationery') || name.includes('pen')) return <PenTool size={32} className="text-white" />
    if (name.includes('study') || name.includes('kit')) return <Book size={32} className="text-white" />
    return <Sparkles size={32} className="text-white" />
  }

  return (
    <div className="w-full font-poppins bg-gray-50 overflow-hidden">

      {/* 1. HERO SECTION */}
      <section className="relative min-h-[90vh] flex items-center pt-24 pb-16 overflow-hidden">
        {/* Animated Gradient Background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-900 via-slate-900 to-black z-0"></div>
        {/* Glow Orbs */}
        <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[50%] bg-primary/20 blur-[100px] rounded-full pointer-events-none z-0"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-600/20 blur-[120px] rounded-full pointer-events-none z-0"></div>
        <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[50%] bg-primary/20 blur-[100px] pointer-events-none z-0"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-600/20 blur-[120px] pointer-events-none z-0"></div>

        <div className="container-custom relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Hero Text */}
            <div className="flex flex-col items-start gap-6 animate-slideUp">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/10 text-blue-200 text-sm font-semibold tracking-wide uppercase">
                <Sparkles size={16} /> <span>Premium Bookstore Experience</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-[1.1] tracking-tight">
                Discover Your <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">Next Great Read</span>
              </h1>
              <p className="text-lg md:text-xl text-blue-100/80 font-light max-w-lg leading-relaxed">
                Explore thousands of curated books, premium stationery, and comprehensive study kits designed to elevate your learning journey.
              </p>

              <div className="flex flex-wrap items-center gap-4 mt-4">
                <Link to="/books" className="px-8 py-4 rounded-none bg-gradient-to-r from-primary to-blue-600 text-white font-bold text-lg hover:shadow-glow-colored transition-all duration-300 hover:-translate-y-1 flex items-center gap-2 group">
                  Shop Books <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link to="/about" className="px-8 py-4 bg-white/10 backdrop-blur-md text-white border border-white/20 font-bold text-lg hover:bg-white/20 transition-all duration-300">
                  Our Story
                </Link>
              </div>
            </div>

            {/* Hero Image / Graphic */}
            <div className="relative animate-float hidden lg:block">
              <div className="w-full aspect-square bg-gradient-to-tr from-white/5 to-white/10 backdrop-blur-xl border border-white/10 p-4 shadow-2xl relative">
                <div className="absolute -left-8 top-12 bg-white p-4 shadow-xl flex items-center gap-4 animate-slideUp" style={{ animationDelay: '0.2s' }}>
                  <div className="w-12 h-12 bg-green-100 text-green-600 flex items-center justify-center font-bold text-xl">5★</div>
                  <div>
                    <p className="font-bold text-dark text-sm">Top Rated</p>
                    <p className="text-xs text-gray-500">Over 10k Reviews</p>
                  </div>
                </div>

                <img src="/hero.jpg" alt="Smart Book Shop Collection" className="w-full h-full object-cover shadow-inner" />

                <div className="absolute -right-8 bottom-24 bg-white/90 backdrop-blur p-4 shadow-xl flex items-center gap-4 animate-slideUp" style={{ animationDelay: '0.4s' }}>
                  <div className="w-12 h-12 bg-blue-100 text-blue-600 flex items-center justify-center"><BookOpen size={24} /></div>
                  <div>
                    <p className="font-bold text-dark text-sm">New Arrivals</p>
                    <p className="text-xs text-gray-500">Weekly Updates</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CATEGORIES SECTION */}
      <section className="py-24 relative bg-white">
        <div className="container-custom">
          <div className="flex items-end justify-between mb-12">
            <div>
              <span className="text-primary font-bold tracking-wider uppercase text-sm mb-2 block">Collections</span>
              <h2 className="text-4xl font-extrabold text-gray-900">Shop by Category</h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {['Books', 'Stationery', 'Study Kits'].map((cat, i) => (
              <Link
                key={cat}
                to={`/${cat.toLowerCase().replace(' ', '-')}`}
                className="group relative overflow-hidden p-10 bg-gradient-to-br from-white to-gray-50 hover:from-primary hover:to-blue-600 transition-all duration-500 border border-gray-100 hover:border-transparent shadow-soft hover:shadow-2xl hover:-translate-y-2 flex flex-col items-center text-center justify-center min-h-[260px]"
              >
                <div className="w-20 h-20 bg-gray-50 shadow-sm flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 group-hover:bg-white/20">
                  <div className="text-primary group-hover:hidden">
                    {getCategoryIcon(cat).props.children ? React.cloneElement(getCategoryIcon(cat), { className: "text-primary", size: 40 }) : <BookOpen size={40} className="text-primary" />}
                  </div>
                  <div className="hidden group-hover:block">
                    {React.cloneElement(getCategoryIcon(cat), { size: 40 })}
                  </div>
                </div>
                <div>
                  <h3 className="font-extrabold text-2xl text-gray-900 group-hover:text-white transition-colors">{cat}</h3>
                  <div className="w-0 h-1.5 bg-white mt-6 mx-auto group-hover:w-16 transition-all duration-500"></div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 3. FEATURED PRODUCTS */}
      <section className="py-24 bg-gray-50 border-t border-gray-200/60">
        <div className="container-custom">
          <div className="flex items-end justify-between mb-12">
            <div>
              <span className="text-primary font-bold tracking-wider uppercase text-sm mb-2 block">Handpicked</span>
              <h2 className="text-4xl font-extrabold text-gray-900">Featured Products</h2>
            </div>
            <Link to="/books" className="hidden md:flex items-center gap-2 text-primary font-semibold hover:text-blue-700 transition-colors group">
              Shop All <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-white h-[400px] animate-pulse shadow-sm"></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {featured.slice(0, 4).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 4. LATEST ARRIVALS */}
      <section className="py-24 bg-white border-t border-gray-200/60">
        <div className="container-custom">
          <div className="flex items-end justify-between mb-12">
            <div>
              <span className="text-primary font-bold tracking-wider uppercase text-sm mb-2 block">Just In</span>
              <h2 className="text-4xl font-extrabold text-gray-900">Latest Arrivals</h2>
            </div>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-gray-50 h-[400px] animate-pulse border border-gray-100"></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {latest.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 5. NEWSLETTER SECTION */}
      <section className="py-24 relative overflow-hidden">
        {/* Deep immersive background */}
        <div className="absolute inset-0 bg-slate-900 z-0"></div>
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-600/30 via-transparent to-transparent z-0"></div>

        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-xl border border-white/20 p-12 md:p-20 text-center shadow-2xl">
            <span className="inline-block px-4 py-1.5 bg-white/10 text-blue-200 font-semibold tracking-wider text-sm uppercase mb-6">Stay Updated</span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Join Our Reading Community
            </h2>
            <p className="text-blue-100/80 text-lg mb-10 max-w-2xl mx-auto">
              Subscribe to get exclusive early access to new releases, special discounts, and personalized reading recommendations delivered straight to your inbox.
            </p>

            <form className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto relative group">
              <input
                type="email"
                placeholder="Enter your email address..."
                className="flex-1 w-full px-8 py-5 bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-blue-200/50 focus:outline-none focus:bg-white/20 focus:border-white/40 transition-all duration-300 text-lg"
                required
              />
              <button
                type="submit"
                className="sm:absolute sm:right-2 sm:top-2 sm:bottom-2 px-8 py-3 bg-white text-gray-900 font-bold hover:bg-blue-50 transition-colors duration-300 flex items-center justify-center gap-2"
              >
                Subscribe <Send size={18} />
              </button>
            </form>
            <p className="text-xs text-blue-200/50 mt-4">We care about your data in our privacy policy.</p>
          </div>
        </div>
      </section>

      {/* 6. FEATURES BANNER */}
      <section className="bg-white text-gray-900 py-12 border-t border-gray-200/60 shadow-sm">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 divide-x divide-gray-100">
            <div className="flex flex-col items-center text-center px-4">
              <Truck size={32} className="text-primary mb-3" />
              <h4 className="font-bold text-sm uppercase tracking-wider mb-1">Islandwide Delivery</h4>
              <p className="text-xs text-gray-500">Fast & reliable</p>
            </div>
            <div className="flex flex-col items-center text-center px-4">
              <Banknote size={32} className="text-primary mb-3" />
              <h4 className="font-bold text-sm uppercase tracking-wider mb-1">Cash On Delivery</h4>
              <p className="text-xs text-gray-500">Pay at your door</p>
            </div>
            <div className="flex flex-col items-center text-center px-4">
              <Headphones size={32} className="text-primary mb-3" />
              <h4 className="font-bold text-sm uppercase tracking-wider mb-1">24/7 Support</h4>
              <p className="text-xs text-gray-500">Always here for you</p>
            </div>
            <div className="flex flex-col items-center text-center px-4">
              <ShieldCheck size={32} className="text-primary mb-3" />
              <h4 className="font-bold text-sm uppercase tracking-wider mb-1">100% Safe</h4>
              <p className="text-xs text-gray-500">Secure shopping</p>
            </div>
            <div className="flex flex-col items-center text-center px-4">
              <CheckCircle size={32} className="text-primary mb-3" />
              <h4 className="font-bold text-sm uppercase tracking-wider mb-1">No Exchange</h4>
              <p className="text-xs text-gray-500">Quality guaranteed</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}

export default HomePage
