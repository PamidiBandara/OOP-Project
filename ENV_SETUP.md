# Environment Setup Guide

Complete guide for setting up the development environment for Smart Book Shop.

## Prerequisites

- **OS**: Windows 10+, macOS 10.15+, or Linux (Ubuntu 20.04+)
- **Node.js**: 18.x or later (download from https://nodejs.org/)
- **Java**: JDK 21 (download from https://www.oracle.com/java/technologies/downloads/#java21)
- **Maven**: 3.8.1+ (download from https://maven.apache.org/download.cgi)
- **Git**: 2.30+ (download from https://git-scm.com/)
- **MongoDB**: Local installation or MongoDB Atlas account
- **Cloudinary**: Account with API credentials

## Step-by-Step Setup

### 1. Install Java 21

#### Windows
```bash
# Download JDK 21 installer
# Run the installer and follow the wizard
# Set JAVA_HOME environment variable:
# - Right-click This PC > Properties
# - Advanced system settings > Environment Variables
# - New System Variable: JAVA_HOME = C:\Program Files\Java\jdk-21
# - Add %JAVA_HOME%\bin to PATH

# Verify installation
java -version
javac -version
```

#### macOS
```bash
# Using Homebrew
brew install openjdk@21

# Set JAVA_HOME
echo 'export JAVA_HOME=$(/usr/libexec/java_home -v 21)' >> ~/.zshrc
source ~/.zshrc

# Verify
java -version
```

#### Linux (Ubuntu)
```bash
# Update package index
sudo apt update

# Install OpenJDK 21
sudo apt install openjdk-21-jdk

# Verify
java -version
```

### 2. Install Maven

#### Windows
```bash
# Download Maven zip from https://maven.apache.org/download.cgi
# Extract to C:\Program Files\Apache\maven
# Add M2_HOME environment variable
# Add %M2_HOME%\bin to PATH

# Verify
mvn --version
```

#### macOS
```bash
brew install maven

# Verify
mvn --version
```

#### Linux
```bash
sudo apt install maven

# Verify
mvn --version
```

### 3. Install Node.js & npm

#### All Platforms
- Download Node.js LTS from https://nodejs.org/
- Run installer and follow wizard
- npm is included with Node.js

```bash
# Verify installation
node --version
npm --version
```

### 4. Install Git

#### All Platforms
- Download from https://git-scm.com/
- Run installer and follow wizard
- Use default settings

```bash
# Verify installation
git --version

# Configure git (if not done before)
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

### 5. MongoDB Setup

#### Option A: MongoDB Atlas (Cloud)
1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free account
3. Create a cluster
4. Create a database user
5. Get connection string
6. Add connection string to `application.yml`

#### Option B: Local MongoDB
```bash
# Download from https://www.mongodb.com/try/download/community

# Start MongoDB service
# Windows: mongo.exe
# macOS: brew services start mongodb-community
# Linux: sudo systemctl start mongod

# Verify connection
mongosh "mongodb://localhost:27017"
```

### 6. Cloudinary Setup

1. Create account at https://cloudinary.com/
2. Go to Dashboard to get:
   - Cloud Name
   - API Key
   - API Secret
3. Add to `application.yml`

### 7. Clone Repository

```bash
# Clone the repository
git clone https://github.com/yourusername/smart-bookshop.git
cd smart-bookshop

# Create a feature branch (optional)
git checkout -b feature/your-feature-name
```

### 8. Backend Setup

```bash
# Navigate to backend
cd backend

# Clean and download dependencies
mvn clean install

# If you want to skip tests
mvn clean install -DskipTests

# Create application.yml
cp src/main/resources/application.yml.example src/main/resources/application.yml
```

#### Configure application.yml
```yaml
spring:
  application:
    name: bookshop-api
  data:
    mongodb:
      uri: mongodb+srv://username:password@cluster.mongodb.net/bookshop

jwt:
  secret: YOUR_SUPER_SECRET_KEY_HERE_MIN_256_CHARS
  expiration: 86400000
  refresh-expiration: 604800000

cloudinary:
  cloud-name: your-cloud-name
  api-key: your-api-key
  api-secret: your-api-secret

server:
  port: 8080
```

### 9. Frontend Setup

```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Create .env file
echo "VITE_API_BASE_URL=http://localhost:8080/api" > .env
```

### 10. Running Development Server

#### Backend
```bash
cd backend
mvn spring-boot:run

# Or if using IDE:
# Right-click SmartBookshopApplication.java > Run
```

Backend will start on http://localhost:8080

#### Frontend (in another terminal)
```bash
cd frontend
npm run dev

# Or for production build
npm run build
npm run preview
```

Frontend will start on http://localhost:5173

## Environment Variables

### Backend (.env or application.yml)
```
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/bookshop
JWT_SECRET=your_secret_key_min_256_chars
JWT_EXPIRATION=86400000
JWT_REFRESH_EXPIRATION=604800000
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### Frontend (.env)
```
VITE_API_BASE_URL=http://localhost:8080/api
VITE_APP_NAME=Smart Book Shop
```

## IDE Setup

### IntelliJ IDEA (Recommended for Backend)
1. Download from https://www.jetbrains.com/idea/
2. Open project folder
3. Select JDK 21 when prompted
4. Maven projects auto-discovered

### VS Code (Recommended for Frontend)
1. Download from https://code.visualstudio.com/
2. Install extensions:
   - ES7+ React/Redux/React-Native snippets
   - Prettier Code Formatter
   - Tailwind CSS IntelliSense
   - Thunder Client (for API testing)

### Eclipse (Alternative)
1. Download from https://www.eclipse.org/
2. Install Maven for Eclipse plugin
3. Import existing Maven project

## Troubleshooting

### Java Version Issues
```bash
# Check Java version
java -version

# If wrong version:
# Windows: Delete old JAVA_HOME from Environment Variables
# macOS: Verify brew link
brew link openjdk@21
```

### Maven Build Failures
```bash
# Clear cache and rebuild
mvn clean install -U

# Skip tests if having issues
mvn clean install -DskipTests
```

### Node Modules Issues
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Port Already in Use
```bash
# Backend (change port in application.yml)
server.port: 8081

# Frontend (Vite automatically finds free port)
# Or manually specify:
npm run dev -- --port 5174
```

### MongoDB Connection Issues
```bash
# Check connection string format
# Should be: mongodb+srv://user:password@cluster/dbname

# Test connection using mongosh
mongosh "your-connection-string"
```

## VSCode Extensions Recommended

- Prettier - Code formatter
- ESLint - JavaScript linter
- Tailwind CSS IntelliSense
- REST Client
- Thunder Client
- MongoDB for VS Code

## Next Steps

1. Read the main [README.md](README.md)
2. Review [API.md](API.md) for API documentation
3. Start with creating a test product
4. Test authentication flow
5. Explore database structure

## Common Commands

### Backend
```bash
# Build
mvn clean build

# Run tests
mvn test

# Run specific test
mvn test -Dtest=AuthServiceImplTest

# Run application
mvn spring-boot:run
```

### Frontend
```bash
# Development
npm run dev

# Production build
npm run build

# Preview build
npm run preview

# Lint check
npm run lint

# Format code
npm run format
```

## Getting Help

- Check project issues on GitHub
- Read Spring Boot documentation: https://spring.io/
- Read React documentation: https://react.dev/
- Check Tailwind CSS docs: https://tailwindcss.com/
- MongoDB documentation: https://docs.mongodb.com/

---

Setup complete! Start developing! 🎉
