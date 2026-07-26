import React, { useState, useEffect } from 'react'
import { categoryAPI, uploadAPI } from '../../services/api'
import { Edit, Trash2, Plus, X } from 'lucide-react'
import toast from 'react-hot-toast'

const ManageCategories = () => {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [currentCategory, setCurrentCategory] = useState({
    name: '',
    description: '',
    image: '',
    slug: '',
    displayOrder: 0,
    active: true
  })

  const fetchCategories = async () => {
    try {
      setLoading(true)
      const res = await categoryAPI.getAllCategories()
      setCategories(res.data?.data || [])
    } catch (error) {
      toast.error('Failed to load categories')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  const handleOpenModal = (category = null) => {
    if (category) {
      setIsEditing(true)
      setCurrentCategory(category)
    } else {
      setIsEditing(false)
      setCurrentCategory({
        name: '',
        description: '',
        image: '',
        slug: '',
        displayOrder: 0,
        active: true
      })
    }
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setCurrentCategory(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (isEditing) {
        await categoryAPI.updateCategory(currentCategory.id, currentCategory)
        toast.success('Category updated successfully')
      } else {
        await categoryAPI.createCategory(currentCategory)
        toast.success('Category created successfully')
      }
      handleCloseModal()
      fetchCategories()
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed to save category')
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      try {
        await categoryAPI.deleteCategory(id)
        toast.success('Category deleted successfully')
        fetchCategories()
      } catch (error) {
        toast.error('Failed to delete category')
      }
    }
  }

  return (
    <div className="container-custom py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Manage Categories</h1>
        <button 
          onClick={() => handleOpenModal()} 
          className="btn btn-primary flex items-center gap-2"
        >
          <Plus size={20} />
          Add Category
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-500">Loading categories...</div>
        ) : categories.length === 0 ? (
          <div className="p-8 text-center text-gray-500">No categories found. Create one!</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200 text-sm text-gray-600">
                  <th className="p-4 font-semibold">Image</th>
                  <th className="p-4 font-semibold">Name</th>
                  <th className="p-4 font-semibold">Slug</th>
                  <th className="p-4 font-semibold">Order</th>
                  <th className="p-4 font-semibold">Status</th>
                  <th className="p-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((category) => (
                  <tr key={category.id} className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors">
                    <td className="p-4">
                      {category.image ? (
                        <img src={category.image} alt={category.name} className="w-10 h-10 object-cover rounded-md" />
                      ) : (
                        <div className="w-10 h-10 bg-gray-200 rounded-md flex items-center justify-center text-gray-400 text-xs">No img</div>
                      )}
                    </td>
                    <td className="p-4 font-medium text-gray-800">{category.name}</td>
                    <td className="p-4 text-gray-500 text-sm">{category.slug}</td>
                    <td className="p-4 text-gray-500 text-sm">{category.displayOrder}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${category.active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {category.active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="p-4 flex items-center justify-end gap-2">
                      <button 
                        onClick={() => handleOpenModal(category)}
                        className="p-2 text-gray-400 hover:text-primary transition-colors"
                        title="Edit"
                      >
                        <Edit size={18} />
                      </button>
                      <button 
                        onClick={() => handleDelete(category.id)}
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden">
            <div className="flex justify-between items-center p-5 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-800">
                {isEditing ? 'Edit Category' : 'Add New Category'}
              </h2>
              <button onClick={handleCloseModal} className="text-gray-400 hover:text-gray-600 transition-colors">
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-5 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category Name *</label>
                <input
                  type="text"
                  name="name"
                  required
                  value={currentCategory.name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                  placeholder="e.g. Fiction"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category Image</label>
                <div className="flex items-center gap-4">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={async (e) => {
                      if (e.target.files && e.target.files[0]) {
                        try {
                          setUploading(true)
                          const res = await uploadAPI.uploadImage(e.target.files[0])
                          setCurrentCategory(prev => ({ ...prev, image: res.data.data }))
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
                {currentCategory.image && (
                  <div className="mt-3">
                    <p className="text-xs text-gray-500 mb-1">Preview:</p>
                    <img src={currentCategory.image} alt="Preview" className="w-20 h-20 object-cover rounded-md border" />
                  </div>
                )}
              </div>

              <div className="pt-4 flex justify-end gap-3">
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
                  {isEditing ? 'Save Changes' : 'Create Category'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default ManageCategories
