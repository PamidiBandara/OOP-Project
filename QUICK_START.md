# Quick Start Guide

Get Smart Book Shop running in 5 minutes!

## Prerequisites

Ensure you have installed:
- Java 21 (check: `java -version`)
- Maven 3.8+ (check: `mvn --version`)
- Node.js 18+ (check: `node --version`)
- Git (check: `git --version`)

## Quick Setup (5 Minutes)

### Step 1: Clone Repository
```bash
git clone <repository-url>
cd smart-bookshop
```

### Step 2: Backend Setup & Run
```bash
cd backend

# Download dependencies (1-2 minutes)
mvn clean install -DskipTests

# Start the backend (automatically runs on port 8080)
mvn spring-boot:run
```

**Expected output:**
```
Started SmartBookshopApplication in X.XXX seconds
```

### Step 3: Frontend Setup & Run (New Terminal)
```bash
cd frontend

# Install dependencies (1-2 minutes)
npm install

# Start development server
npm run dev
```

**Expected output:**
```
VITE v5.0.8  ready in XXX ms
  ➜  Local:   http://localhost:5173/
```

### Step 4: Open Application
- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:8080/api

---

## First-Time Testing

### Test Registration
1. Go to http://localhost:5173
2. Click **Login** → **Don't have an account? Register**
3. Fill in the form:
   - First Name: John
   - Last Name: Doe
   - Email: john@example.com
   - Phone: +1234567890
   - Password: Password123
4. Click **Register**

### Test Login
1. Click **Login**
2. Email: `john@example.com`
3. Password: `Password123`
4. Click **Login**

### Test Navigation
- Browse products on **Books**, **Stationery**, **Study Kits**
- Click **View Details** on any product
- Add items to **Cart** or **Wishlist**
- View your **Profile** and **Orders**

---

## API Testing

Use any API client (Postman, Insomnia, Thunder Client):

### Register User
```http
POST http://localhost:8080/api/auth/register
Content-Type: application/json

{
  "firstName": "Jane",
  "lastName": "Smith",
  "email": "jane@example.com",
  "phone": "+9876543210",
  "password": "Password123"
}
```

### Login User
```http
POST http://localhost:8080/api/auth/login
Content-Type: application/json

{
  "email": "jane@example.com",
  "password": "Password123"
}
```

Response will include JWT token:
```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzUxMiJ9..."
  }
}
```

### Get All Products
```http
GET http://localhost:8080/api/products?page=0&size=12
```

### Create Product (Admin Only)
```http
POST http://localhost:8080/api/products
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Test Book",
  "description": "A test book",
  "price": 29.99,
  "stock": 100,
  "category": "Fiction"
}
```

---

## Database Setup (Optional for Testing)

### Option 1: Use Local MongoDB
```bash
# Install MongoDB Community
# Start MongoDB
mongod

# Or on Mac with Homebrew
brew services start mongodb-community
```

Update `backend/src/main/resources/application.yml`:
```yaml
spring:
  data:
    mongodb:
      uri: mongodb://localhost:27017/bookshop
```

### Option 2: Use MongoDB Atlas (Cloud)
1. Go to https://www.mongodb.com/cloud/atlas
2. Create free account
3. Create cluster
4. Get connection string
5. Update `application.yml` with connection string

---

## Project Structure Overview

```
smart-bookshop/
├── backend/                    # Spring Boot API
│   ├── src/main/java/com/bookshop/
│   │   ├── entity/            # Database entities
│   │   ├── controller/        # API endpoints
│   │   ├── service/           # Business logic
│   │   ├── repository/        # Database queries
│   │   └── security/          # JWT & auth
│   ├── pom.xml                # Dependencies
│   └── src/main/resources/
│       └── application.yml    # Configuration
│
├── frontend/                  # React Vite App
│   ├── src/
│   │   ├── pages/            # Page components
│   │   ├── components/       # Reusable components
│   │   ├── context/          # State management
│   │   ├── services/         # API client
│   │   └── styles/           # Global styles
│   ├── package.json          # Dependencies
│   └── vite.config.js        # Vite config
│
└── Documentation files (README, guides, etc.)
```

---

## Common Commands

### Backend

```bash
# Build
mvn clean build

# Run tests
mvn test

# Run application
mvn spring-boot:run

# Skip tests during build
mvn clean install -DskipTests
```

### Frontend

```bash
# Install dependencies
npm install

# Development server
npm run dev

# Production build
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

---

## Troubleshooting

### Backend won't start
```bash
# Check if port 8080 is in use
lsof -i :8080  # macOS/Linux
netstat -ano | findstr :8080  # Windows

# Kill the process and try again
kill -9 <PID>  # macOS/Linux
taskkill /PID <PID> /F  # Windows
```

### Frontend won't load
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Clear Vite cache
rm -rf node_modules/.vite

# Try different port
npm run dev -- --port 5174
```

### Database connection error
```bash
# Check MongoDB is running
ps aux | grep mongod  # macOS/Linux
tasklist | findstr mongo  # Windows

# Check connection string in application.yml
# MongoDB Atlas: mongodb+srv://user:pass@cluster.mongodb.net/dbname
# Local: mongodb://localhost:27017/bookshop
```

### Port already in use
```bash
# Backend - change in application.yml
server:
  port: 8081

# Frontend - Vite will auto-select next available port
# Or specify manually
npm run dev -- --port 5174
```

---

## Next Steps

1. **Read the main README**
   - `cat README.md`

2. **Review API Documentation**
   - `cat API.md`

3. **Check Environment Setup**
   - `cat ENV_SETUP.md`

4. **For Deployment**
   - `cat DEPLOYMENT.md`

5. **Production Readiness**
   - `cat PRODUCTION_CHECKLIST.md`

---

## Features to Explore

- **Authentication**: Register, Login, Logout, Password Reset
- **Products**: Search, Filter, Sort, View Details
- **Shopping**: Add to Cart, Wishlist, Checkout
- **Orders**: Place Orders, Track Status, Order History
- **Reviews**: Write Reviews, View Ratings
- **Admin**: Manage Products, Orders, Categories, Customers
- **Profile**: Edit Profile, Change Password, View Addresses
- **Notifications**: Receive and Manage Notifications

---

## Support

- 📚 Full documentation in markdown files
- 🔧 API endpoints documented in `API.md`
- 🚀 Deployment guide in `DEPLOYMENT.md`
- ⚙️ Setup guide in `ENV_SETUP.md`
- ✅ Pre-deployment checklist in `PRODUCTION_CHECKLIST.md`

---

## What's Next?

After running the app:

1. ✅ Test user registration and login
2. ✅ Browse products and add to cart
3. ✅ Place a test order
4. ✅ Review the code structure
5. ✅ Customize for your needs
6. ✅ Deploy to production

---

**Happy Coding! 🚀**

For issues, check the troubleshooting section or review the full documentation.
