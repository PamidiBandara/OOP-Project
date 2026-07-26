# API Documentation

Complete REST API documentation for Smart Book Shop backend.

## Base URL
```
http://localhost:8080/api
```

## Authentication
All endpoints (except public ones) require JWT token in header:
```
Authorization: Bearer <your-jwt-token>
```

## Response Format
```json
{
  "success": true,
  "message": "Operation successful",
  "data": {},
  "errors": null,
  "timestamp": "2024-01-15T10:30:00"
}
```

---

## Authentication Endpoints

### Register
```
POST /auth/register
```
**Request:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "password123",
  "phone": "+1234567890"
}
```

### Login
```
POST /auth/login
```
**Request:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

### Get Current User
```
GET /auth/me
Authorization: Bearer <token>
```

### Refresh Token
```
POST /auth/refresh-token
Authorization: Bearer <refresh-token>
```

---

## Product Endpoints

### Get All Products
```
GET /products?page=0&size=12&sortBy=createdAt&direction=DESC
```

### Get Product by ID
```
GET /products/{id}
```

### Get Products by Category
```
GET /products/category/{category}?page=0&size=12
```

### Search Products
```
GET /products/search?query=book&page=0&size=12
```

### Get Featured Products
```
GET /products/featured
```

### Get Latest Products
```
GET /products/latest?limit=10
```

### Get Best Sellers
```
GET /products/best-sellers?limit=10
```

### Create Product (Admin Only)
```
POST /products
Authorization: Bearer <admin-token>
Content-Type: application/json
```
**Request:**
```json
{
  "name": "The Great Gatsby",
  "description": "Classic novel",
  "sku": "GATSBY001",
  "isbn": "9780743273565",
  "price": 29.99,
  "discountPrice": 24.99,
  "stock": 100,
  "minStock": 10,
  "category": "Fiction",
  "author": "F. Scott Fitzgerald",
  "language": "English",
  "pages": 180,
  "active": true,
  "featured": true
}
```

### Update Product (Admin Only)
```
PUT /products/{id}
Authorization: Bearer <admin-token>
```

### Delete Product (Admin Only)
```
DELETE /products/{id}
Authorization: Bearer <admin-token>
```

---

## Category Endpoints

### Get All Categories
```
GET /categories
```

### Get Category by ID
```
GET /categories/{id}
```

### Create Category (Admin Only)
```
POST /categories
Authorization: Bearer <admin-token>
```

### Update Category (Admin Only)
```
PUT /categories/{id}
Authorization: Bearer <admin-token>
```

### Delete Category (Admin Only)
```
DELETE /categories/{id}
Authorization: Bearer <admin-token>
```

---

## Order Endpoints

### Get User Orders
```
GET /orders?page=0&size=10
Authorization: Bearer <token>
```

### Get Order Details
```
GET /orders/{orderId}
Authorization: Bearer <token>
```

### Create Order
```
POST /orders
Authorization: Bearer <token>
Content-Type: application/json
```
**Request:**
```json
{
  "items": [
    {
      "productId": "product-id",
      "quantity": 2,
      "price": 29.99
    }
  ],
  "shippingAddress": "address-id",
  "billingAddress": "address-id",
  "paymentMethod": "CASH_ON_DELIVERY"
}
```

### Get All Orders (Admin Only)
```
GET /orders?page=0&size=20
Authorization: Bearer <admin-token>
```

### Update Order Status (Admin Only)
```
PUT /orders/{orderId}/status
Authorization: Bearer <admin-token>
Content-Type: application/json
```
**Request:**
```json
{
  "status": "SHIPPED"
}
```

### Cancel Order
```
DELETE /orders/{orderId}
Authorization: Bearer <token>
```

---

## Cart Endpoints

### Get Cart
```
GET /cart
Authorization: Bearer <token>
```

### Add to Cart
```
POST /cart/items
Authorization: Bearer <token>
Content-Type: application/json
```
**Request:**
```json
{
  "productId": "product-id",
  "quantity": 2
}
```

### Remove from Cart
```
DELETE /cart/items/{productId}
Authorization: Bearer <token>
```

### Update Cart Item Quantity
```
PUT /cart/items/{productId}
Authorization: Bearer <token>
Content-Type: application/json
```
**Request:**
```json
{
  "quantity": 3
}
```

### Clear Cart
```
DELETE /cart
Authorization: Bearer <token>
```

---

## Wishlist Endpoints

### Get Wishlist
```
GET /wishlist
Authorization: Bearer <token>
```

### Add to Wishlist
```
POST /wishlist/items
Authorization: Bearer <token>
Content-Type: application/json
```
**Request:**
```json
{
  "productId": "product-id"
}
```

### Remove from Wishlist
```
DELETE /wishlist/items/{productId}
Authorization: Bearer <token>
```

---

## Review Endpoints

### Get Product Reviews
```
GET /reviews/product/{productId}?page=0&size=5
```

### Create Review
```
POST /reviews
Authorization: Bearer <token>
Content-Type: application/json
```
**Request:**
```json
{
  "productId": "product-id",
  "rating": 5,
  "title": "Excellent book",
  "comment": "This is a great book with amazing content and story."
}
```

### Update Review
```
PUT /reviews/{reviewId}
Authorization: Bearer <token>
```

### Delete Review
```
DELETE /reviews/{reviewId}
Authorization: Bearer <token>
```

---

## Status Codes

| Code | Meaning |
|------|---------|
| 200  | OK - Request succeeded |
| 201  | Created - Resource created |
| 400  | Bad Request - Invalid input |
| 401  | Unauthorized - Invalid token |
| 403  | Forbidden - Insufficient permissions |
| 404  | Not Found - Resource not found |
| 500  | Internal Server Error |

---

## Error Response Example
```json
{
  "success": false,
  "message": "Validation failed",
  "data": null,
  "errors": {
    "email": "Email already registered",
    "password": "Password must be at least 8 characters"
  },
  "timestamp": "2024-01-15T10:30:00"
}
```

---

## Rate Limiting
- No official rate limiting implemented
- Consider adding for production

## Pagination
```
?page=0&size=10
```

---

For more information, visit the project repository.
