import axios from 'axios'

const API_BASE_URL = 'http://localhost:8080/api'

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request Interceptor
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response Interceptor
apiClient.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

// Authentication APIs
export const authAPI = {
  login: (credentials) => apiClient.post('/auth/login', credentials),
  register: (userData) => apiClient.post('/auth/register', userData),
  getCurrentUser: () => apiClient.get('/auth/me'),
  logout: () => apiClient.post('/auth/logout'),
  refreshToken: (token) => apiClient.post('/auth/refresh-token', null, {
    headers: { 'Authorization': `Bearer ${token}` }
  }),
  forgotPassword: (email) => apiClient.post('/auth/forgot-password', { email }),
  resetPassword: (token, password) => apiClient.post('/auth/reset-password', { token, password }),
}

// Product APIs
export const productAPI = {
  getAllProducts: (page = 0, size = 12, sortBy = 'createdAt', direction = 'DESC') =>
    apiClient.get('/products', { params: { page, size, sortBy, direction } }),
  getProduct: (id) => apiClient.get(`/products/${id}`),
  getProductsByCategory: (category, page = 0, size = 12) =>
    apiClient.get(`/products/category/${category}`, { params: { page, size } }),
  searchProducts: (query, page = 0, size = 12) =>
    apiClient.get('/products/search', { params: { query, page, size } }),
  getFeaturedProducts: () => apiClient.get('/products/featured'),
  getLatestProducts: (limit = 10) =>
    apiClient.get('/products/latest', { params: { limit } }),
  getBestSellers: (limit = 10) =>
    apiClient.get('/products/best-sellers', { params: { limit } }),
  createProduct: (data) => apiClient.post('/products', data),
  updateProduct: (id, data) => apiClient.put(`/products/${id}`, data),
  deleteProduct: (id) => apiClient.delete(`/products/${id}`),
}

// Category APIs
export const categoryAPI = {
  getAllCategories: () => apiClient.get('/categories'),
  getCategory: (id) => apiClient.get(`/categories/${id}`),
  createCategory: (data) => apiClient.post('/categories', data),
  updateCategory: (id, data) => apiClient.put(`/categories/${id}`, data),
  deleteCategory: (id) => apiClient.delete(`/categories/${id}`),
}

// Cart APIs
export const cartAPI = {
  getCart: () => apiClient.get('/cart'),
  addToCart: (productId, quantity) =>
    apiClient.post('/cart/items', { productId, quantity }),
  removeFromCart: (productId) =>
    apiClient.delete(`/cart/items/${productId}`),
  updateCartItem: (productId, quantity) =>
    apiClient.put(`/cart/items/${productId}`, { quantity }),
  clearCart: () => apiClient.delete('/cart'),
}

// Order APIs
export const orderAPI = {
  getAllOrders: (page = 0, size = 10) =>
    apiClient.get('/orders', { params: { page, size } }),
  getAdminAllOrders: (page = 0, size = 10) =>
    apiClient.get('/orders/admin/all', { params: { page, size } }),
  getOrder: (id) => apiClient.get(`/orders/${id}`),
  createOrder: (data) => apiClient.post('/orders', data),
  updateOrderStatus: (id, status) => apiClient.put(`/orders/${id}/status`, {}, { params: { status } }),
}

// Review APIs
export const reviewAPI = {
  getProductReviews: (productId, page = 0, size = 5) =>
    apiClient.get(`/reviews/product/${productId}`, { params: { page, size } }),
  createReview: (data) => apiClient.post('/reviews', data),
  updateReview: (id, data) => apiClient.put(`/reviews/${id}`, data),
  deleteReview: (id) => apiClient.delete(`/reviews/${id}`),
}

// Wishlist APIs
export const wishlistAPI = {
  getWishlist: () => apiClient.get('/wishlist'),
  addToWishlist: (productId) => apiClient.post(`/wishlist/items/${productId}`),
  removeFromWishlist: (productId) => apiClient.delete(`/wishlist/items/${productId}`),
  isInWishlist: (productId) => apiClient.get(`/wishlist/items/${productId}`),
}

export const uploadAPI = {
  uploadImage: (file) => {
    const formData = new FormData();
    formData.append('file', file);
    return apiClient.post('/upload/image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  }
}

// Customer APIs
export const customerAPI = {
  getAllCustomers: (page = 0, size = 10) =>
    apiClient.get('/user/customers', { params: { page, size } }),
}

export default apiClient
