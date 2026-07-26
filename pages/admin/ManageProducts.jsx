import React, { useState, useEffect } from 'react'
import { productAPI, categoryAPI, uploadAPI } from '../../services/api'
import { Edit, Trash2, Plus, X } from 'lucide-react'
import toast from 'react-hot-toast'

const ManageProducts = () => {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [currentProduct, setCurrentProduct] = useState({
    name: '',
    description: '',
    price: 0,
    stock: 0,
    type: 'Book',
    category: '',
    author: '',
    isbn: '',
    mainImage: '',
    active: true,
    featured: false
  })

  const fetchData = async () => {
    try {
      setLoading(true)
      const [prodRes, catRes] = await Promise.all([
        productAPI.getAllProducts(0, 100),
        categoryAPI.getAllCategories()
      ])
      setProducts(prodRes.data?.data?.content || [])
      setCategories(catRes.data?.data || [])
    } catch (error) {
      toast.error('Failed to load data')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleOpenModal = (product = null) => {
    if (product) {
      setIsEditing(true)
      setCurrentProduct({
        ...product,
        type: product.category ? 'Book' : 'Other', // Infer type for existing
        price: product.price || 0,
        stock: product.stock || 0,
      })
    } else {
      setIsEditing(false)
      setCurrentProduct({
        name: '',
        description: '',
        price: 0,
        stock: 0,
        type: 'Book',
        category: categories.length > 0 ? categories[0].id : '',
        author: '',
        isbn: '',
        mainImage: '',
        active: true,
        featured: false
      })
    }
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setCurrentProduct(prev => {
      const updates = { [name]: type === 'checkbox' ? checked : type === 'number' ? Number(value) : value }
      if (name === 'type' && value !== 'Book') {
        updates.category = ''
        updates.author = ''
        updates.isbn = ''
      }
      return { ...prev, ...updates }
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (isEditing) {
        await productAPI.updateProduct(currentProduct.id, currentProduct)
        toast.success('Product updated successfully')
      } else {
        await productAPI.createProduct(currentProduct)
        toast.success('Product created successfully')
      }
      handleCloseModal()
      fetchData()
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed to save product')
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await productAPI.deleteProduct(id)
        toast.success('Product deleted successfully')
        fetchData()
      } catch (error) {
        toast.error('Failed to delete product')
      }
    }
  }

  const getCategoryName = (catId) => {
    const cat = categories.find(c => c.id === catId)
    return cat ? cat.name : 'Unknown'
  }

  return (
    <div className="container-custom py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Manage Products</h1>
        <button 
          onClick={() => handleOpenModal()} 
          className="btn btn-primary flex items-center gap-2"
        >
          <Plus size={20} />
          Add Product
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-500">Loading products...</div>
        ) : products.length === 0 ? (
          <div className="p-8 text-center text-gray-500">No products found. Create one!</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200 text-sm text-gray-600">
                  <th className="p-4 font-semibold">Image</th>
                  <th className="p-4 font-semibold">Type</th>
                  <th className="p-4 font-semibold">Name</th>
                  <th className="p-4 font-semibold">Category</th>
                  <th className="p-4 font-semibold">Price</th>
                  <th className="p-4 font-semibold">Stock</th>
                  <th className="p-4 font-semibold">Status</th>
                  <th className="p-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors">
                    <td className="p-4">
                      {product.mainImage ? (
                        <img src={product.mainImage} alt={product.name} className="w-10 h-10 object-cover rounded-md" />
                      ) : (
                        <div className="w-10 h-10 bg-gray-200 rounded-md flex items-center justify-center text-gray-400 text-xs">No img</div>
                      )}
                    </td>
                    <td className="p-4">
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-md text-xs font-medium">
                        {product.category ? 'Book' : 'Other'}
                      </span>
                    </td>
                    <td className="p-4 font-medium text-gray-800">
                      {product.name}
                      {product.featured && <span className="ml-2 text-[10px] bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded uppercase font-bold tracking-wider">Featured</span>}
                    </td>
                    <td className="p-4 text-gray-500 text-sm">{product.category ? getCategoryName(product.category) : '-'}</td>
                    <td className="p-4 text-gray-800 font-medium">Rs. {(product.price || 0).toFixed(2)}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${product.stock > 10 ? 'bg-green-100 text-green-700' : product.stock > 0 ? 'bg-orange-100 text-orange-700' : 'bg-red-100 text-red-700'}`}>
                        {product.stock} in stock
                      </span>
                    </td>
                    <td className="p-4">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${product.active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {product.active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="p-4 flex items-center justify-end gap-2">
                      <button 
                        onClick={() => handleOpenModal(product)}
                        className="p-2 text-gray-400 hover:text-primary transition-colors"
                        title="Edit"
                      >
                        <Edit size={18} />
                      </button>
                      <button 
                        onClick={() => handleDelete(product.id)}
                        className="p-2 text-gray-400 hover:text-danger transition-colors"
                        title="Delete"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 overflow-y-auto pt-24 pb-12">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl overflow-hidden my-auto">
            <div className="flex justify-between items-center p-5 border-b border-gray-100 sticky top-0 bg-white z-10">
              <h2 className="text-xl font-bold text-gray-800">
                {isEditing ? 'Edit Product' : 'Add New Product'}
              </h2>
              <button onClick={handleCloseModal} className="text-gray-400 hover:text-gray-600 transition-colors">
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-5 space-y-4">
              <div className="flex gap-4 mb-4 pb-4 border-b border-gray-100">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="type" value="Book" checked={currentProduct.type === 'Book'} onChange={handleChange} className="text-primary focus:ring-primary" />
                  <span className="text-sm font-medium text-gray-700">Book</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="type" value="Stationary" checked={currentProduct.type === 'Stationary'} onChange={handleChange} className="text-primary focus:ring-primary" />
                  <span className="text-sm font-medium text-gray-700">Stationary</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="type" value="Study Pack" checked={currentProduct.type === 'Study Pack'} onChange={handleChange} className="text-primary focus:ring-primary" />
                  <span className="text-sm font-medium text-gray-700">Study Pack</span>
                </label>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={currentProduct.name}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                    placeholder="Product name"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    name="description"
                    rows="3"
                    value={currentProduct.description}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                  />
                </div>

                {currentProduct.type === 'Book' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
                    <select
                      name="category"
                      required
                      value={currentProduct.category}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                    >
                      <option value="" disabled>Select a category</option>
                      {categories.map(cat => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                      ))}
                    </select>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Image Upload</label>
                  <div className="flex items-center gap-4">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={async (e) => {
                        if (e.target.files && e.target.files[0]) {
                          try {
                            setUploading(true)
                            const res = await uploadAPI.uploadImage(e.target.files[0])
                            setCurrentProduct(prev => ({ ...prev, mainImage: res.data.data }))
                            toast.success('Image uploaded successfully')
                          } catch (error) {
                            toast.error('Failed to upload image')
                          } finally {
                            setUploading(false)
                          }
                        }
                      }}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
                      disabled={uploading}
                    />
                    {uploading && <span className="text-sm text-gray-500">Uploading...</span>}
                  </div>
                  {currentProduct.mainImage && (
                    <div className="mt-3">
                      <p className="text-xs text-gray-500 mb-1">Preview:</p>
                      <img src={currentProduct.mainImage} alt="Preview" className="w-20 h-20 object-cover rounded-md border" />
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price *</label>
                  <input
                    type="number"
                    step="0.01"
                    name="price"
                    required
                    value={currentProduct.price}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Stock *</label>
                  <input
                    type="number"
                    name="stock"
                    required
                    value={currentProduct.stock}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                  />
                </div>
                
                {currentProduct.type === 'Book' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Author</label>
                      <input
                        type="text"
                        name="author"
                        value={currentProduct.author || ''}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">ISBN</label>
                      <input
                        type="text"
                        name="isbn"
                        value={currentProduct.isbn || ''}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                      />
                    </div>
                  </>
                )}
                
                <div className="flex gap-6 mt-2 md:col-span-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      name="active"
                      checked={currentProduct.active}
                      onChange={handleChange}
                      className="w-5 h-5 rounded text-primary focus:ring-primary border-gray-300"
                    />
                    <span className="text-sm font-medium text-gray-700">Active</span>
                  </label>
                  
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      name="featured"
                      checked={currentProduct.featured}
                      onChange={handleChange}
                      className="w-5 h-5 rounded text-primary focus:ring-primary border-gray-300"
                    />
                    <span className="text-sm font-medium text-gray-700">Featured</span>
                  </label>
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-3 sticky bottom-0 bg-white border-t border-gray-100 mt-6 -mx-5 px-5 pb-2">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-white bg-primary hover:bg-blue-700 rounded-lg font-medium transition-colors"
                >
                  {isEditing ? 'Save Changes' : 'Create Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default ManageProducts
