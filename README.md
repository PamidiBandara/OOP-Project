# Smart Online Bookshop & Stationery Management System

A comprehensive, production-ready full-stack web application for online bookshop and stationery management with a modern UI, robust backend, and advanced features.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Database Design](#database-design)
- [Authentication & Security](#authentication--security)
- [Deployment](#deployment)
- [Contributing](#contributing)

## 🎯 Overview

Smart Book Shop is a university OOP project that demonstrates professional full-stack development practices. It's built with modern technologies and follows clean code principles, SOLID architecture, and Object-Oriented Programming patterns.

The application supports two main user roles:
- **Customers**: Browse, purchase books and stationery, manage wishlists and orders
- **Admins**: Manage products, inventory, orders, customers, and view detailed reports

## ✨ Features

### Customer Features
- ✅ User Authentication (Register, Login, JWT-based)
- ✅ Product Browsing with Advanced Search & Filtering
- ✅ Shopping Cart Management
- ✅ Wishlist Management
- ✅ Order Placement & Tracking
- ✅ Order History & Details
- ✅ Review & Rating System
- ✅ User Profile Management
- ✅ Multiple Delivery Addresses
- ✅ Notifications System
- ✅ Recently Viewed Products

### Admin Features
- ✅ Dashboard with Analytics
- ✅ Product Management (CRUD)
- ✅ Category Management
- ✅ Author, Publisher, Brand Management
- ✅ Supplier Management
- ✅ Order Management & Status Updates
- ✅ Customer Management
- ✅ Review Moderation
- ✅ Offer & Coupon Management
- ✅ Announcement Management
- ✅ Reports & Analytics
- ✅ Inventory Management

### General Features
- ✅ Responsive Design (Desktop, Tablet, Mobile)
- ✅ Search Bar with Debouncing
- ✅ Advanced Filtering by Category, Price, Rating
- ✅ Pagination & Infinite Scroll
- ✅ Dark Mode Support
- ✅ Toast Notifications
- ✅ Loading Skeletons
- ✅ Error Handling & Validation
- ✅ Image Optimization
- ✅ SEO-Friendly

## 🛠 Tech Stack

### Frontend
- **React 19** - UI Library
- **Vite** - Build Tool
- **Tailwind CSS** - Styling
- **React Router DOM** - Routing
- **Axios** - HTTP Client
- **React Hook Form** - Form Management
- **React Hot Toast** - Notifications
- **Framer Motion** - Animations
- **Swiper.js** - Carousel
- **Lucide React** - Icons
- **Zustand** - State Management

### Backend
- **Spring Boot 3** - Framework
- **Java 21** - Language
- **Spring Security** - Authentication & Authorization
- **JWT** - Token-based Authentication
- **Spring Data MongoDB** - Data Access
- **Maven** - Build Tool
- **Lombok** - Code Generation
- **Bean Validation** - Input Validation
- **Global Exception Handling** - Error Management

### Database
- **MongoDB Atlas** - NoSQL Database

### Image Storage
- **Cloudinary** - Image CDN & Storage

### Version Control
- **Git** - Version Control

## 📁 Project Structure

```
Smart Book Shop/
├── backend/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/bookshop/
│   │   │   │   ├── entity/              # JPA Entities
│   │   │   │   ├── dto/                 # Data Transfer Objects
│   │   │   │   ├── controller/          # REST Controllers
│   │   │   │   ├── service/             # Business Logic
│   │   │   │   ├── repository/          # Data Access Layer
│   │   │   │   ├── security/            # JWT & Security
│   │   │   │   ├── config/              # Configuration Classes
│   │   │   │   ├── exception/           # Custom Exceptions
│   │   │   │   ├── validation/          # Validation Classes
│   │   │   │   └── util/                # Utility Classes
│   │   │   └── resources/
│   │   │       └── application.yml      # Configuration File
│   │   └── test/
│   ├── pom.xml                          # Maven Dependencies
│   └── .gitignore
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/                  # Reusable Components
│   │   │   ├── layout/                  # Layout Components
│   │   │   ├── product/                 # Product Components
│   │   │   ├── cart/                    # Cart Components
│   │   │   ├── auth/                    # Auth Components
│   │   │   └── admin/                   # Admin Components
│   │   ├── pages/
│   │   │   ├── public/                  # Public Pages
│   │   │   ├── customer/                # Customer Pages
│   │   │   └── admin/                   # Admin Pages
│   │   ├── services/
│   │   │   ├── api.js                   # API Client
│   │   │   └── utils.js                 # Utilities
│   │   ├── context/                     # Context Providers
│   │   ├── hooks/                       # Custom Hooks
│   │   ├── styles/                      # Global Styles
│   │   ├── utils/                       # Utility Functions
│   │   ├── App.jsx                      # Main App Component
│   │   └── main.jsx                     # Entry Point
│   ├── public/                          # Static Files
│   ├── package.json                     # NPM Dependencies
│   ├── vite.config.js                   # Vite Configuration
│   ├── tailwind.config.js               # Tailwind Configuration
│   ├── postcss.config.js                # PostCSS Configuration
│   └── .gitignore
│
├── README.md                            # This File
├── DEPLOYMENT.md                        # Deployment Guide
├── API.md                               # API Documentation
└── ENV_SETUP.md                         # Environment Setup
```

## 📦 Prerequisites

- Node.js 18+ and npm
- Java 21
- Maven 3.8+
- MongoDB Atlas Account
- Cloudinary Account (for image storage)
- Git

## 🚀 Installation

### Backend Setup

```bash
# Navigate to backend directory
cd backend

# Download dependencies
mvn clean install

# Build the project
mvn clean build
```

### Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Install Tailwind CSS
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

## ⚙️ Configuration

### Backend Configuration

Create a `.env` file in the backend directory or update `application.yml`:

```yaml
spring:
  data:
    mongodb:
      uri: mongodb+srv://username:password@cluster0.mongodb.net/bookshop

jwt:
  secret: your-super-secret-key-here-min-256-characters
  expiration: 86400000    # 24 hours
  refresh-expiration: 604800000  # 7 days

cloudinary:
  cloud-name: your-cloud-name
  api-key: your-api-key
  api-secret: your-api-secret

server:
  port: 8080
```

### Frontend Configuration

Create a `.env` file in the frontend directory:

```env
VITE_API_BASE_URL=http://localhost:8080/api
VITE_APP_NAME=Smart Book Shop
```

Update `src/services/api.js` with your backend URL.

## 🏃 Running the Application

### Start Backend

```bash
cd backend
mvn spring-boot:run
```

Backend will run on `http://localhost:8080`

### Start Frontend

```bash
cd frontend
npm run dev
```

Frontend will run on `http://localhost:5173`

## 📡 API Documentation

See [API.md](API.md) for detailed API documentation including:
- Authentication Endpoints
- Product Management
- Order Management
- Cart & Wishlist
- Reviews & Ratings
- User Management
- Admin Operations

## 💾 Database Design

### MongoDB Collections

1. **users** - User accounts and profiles
2. **products** - Books and stationery items
3. **categories** - Product categories
4. **authors** - Book authors
5. **publishers** - Book publishers
6. **brands** - Product brands
7. **suppliers** - Product suppliers
8. **orders** - Customer orders
9. **cart** - Shopping carts
10. **wishlist** - Customer wishlists
11. **reviews** - Product reviews
12. **offers** - Promotional offers
13. **announcements** - System announcements
14. **studykits** - Bundled study kits
15. **notifications** - User notifications
16. **recentlyViewed** - Recently viewed products
17. **deliveryAddresses** - Customer delivery addresses

## 🔐 Authentication & Security

- **JWT Tokens**: Stateless authentication
- **BCrypt**: Password encryption
- **Role-Based Access Control**: Admin vs Customer roles
- **Token Refresh**: Extended session management
- **CORS Configuration**: Cross-Origin Resource Sharing
- **Input Validation**: Server-side validation
- **Global Exception Handling**: Centralized error management

## 📲 Pages & Routes

### Public Pages
- `/` - Home
- `/books` - Books Listing
- `/stationery` - Stationery Listing
- `/study-kits` - Study Kits
- `/offers` - Offers
- `/announcements` - Announcements
- `/products/:id` - Product Details
- `/about` - About Us
- `/contact` - Contact Us
- `/login` - Login
- `/register` - Register
- `/forgot-password` - Password Recovery

### Customer Pages
- `/dashboard` - Customer Dashboard
- `/profile` - User Profile
- `/orders` - My Orders
- `/orders/:id` - Order Details
- `/wishlist` - Wishlist
- `/cart` - Shopping Cart
- `/checkout` - Checkout
- `/notifications` - Notifications
- `/addresses` - Delivery Addresses
- `/recently-viewed` - Recently Viewed Products

### Admin Pages
- `/admin/dashboard` - Admin Dashboard
- `/admin/products` - Product Management
- `/admin/categories` - Category Management
- `/admin/orders` - Order Management
- `/admin/customers` - Customer Management

## 🎨 UI Design System

### Colors
- Primary: #2563EB (Blue)
- Secondary: #F59E0B (Amber)
- Background: #F8FAFC (Light Gray)
- Dark: #111827 (Dark Gray)
- Success: #10B981 (Green)
- Danger: #EF4444 (Red)

### Typography
- Font Family: Poppins
- Font Sizes: Responsive (mobile-first)
- Font Weights: 300, 400, 500, 600, 700

### Components
- Rounded corners on cards and buttons
- Smooth hover animations
- Shadow effects for depth
- Responsive layouts
- Accessible color contrasts

## 🚢 Deployment

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed deployment instructions for:
- Deploying Backend (AWS, Heroku, DigitalOcean)
- Deploying Frontend (Vercel, Netlify, GitHub Pages)
- Database Setup
- Environment Variables
- Production Checklist

## 🧪 Testing

### Backend Testing
```bash
cd backend
mvn test
```

### Frontend Testing
```bash
cd frontend
npm run test
```

## 📚 Best Practices Implemented

- **Clean Code**: Following Java and JavaScript best practices
- **SOLID Principles**: Single Responsibility, Open/Closed, Liskov, Interface Segregation, Dependency Inversion
- **Design Patterns**: Factory, Singleton, Strategy, Builder
- **Error Handling**: Comprehensive exception management
- **Input Validation**: Both client-side and server-side
- **Security**: JWT, CORS, Password encryption
- **Performance**: Pagination, Lazy loading, Image optimization
- **Scalability**: Microservices-ready architecture
- **Maintainability**: Well-organized code structure
- **Documentation**: Comprehensive comments and documentation

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support

For support, email support@smartbookshop.com or open an issue on GitHub.

## 👥 Authors

- Smart Book Shop Development Team
- University OOP Project

## 🎓 Learning Outcomes

This project demonstrates:
- Full-stack web development
- OOP principles and design patterns
- RESTful API design
- Database design and optimization
- Authentication and security
- Responsive web design
- State management
- Error handling and validation
- Deployment and DevOps

---

**Built with ❤️ for learning and production use**
