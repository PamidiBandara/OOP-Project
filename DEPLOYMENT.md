# Deployment Guide

Complete guide for deploying Smart Book Shop to production.

## Pre-Deployment Checklist

- [ ] Code review and testing completed
- [ ] Environment variables configured
- [ ] Database backups created
- [ ] SSL certificates obtained
- [ ] Security audit completed
- [ ] Performance testing passed
- [ ] Documentation updated

## Backend Deployment

### Option 1: AWS EC2

1. **Launch EC2 Instance**
   - Ubuntu 22.04 LTS, t2.micro (free tier)
   - Open ports: 22 (SSH), 80 (HTTP), 443 (HTTPS), 8080

2. **Install Dependencies**
```bash
sudo apt update
sudo apt install openjdk-21-jdk maven git
```

3. **Deploy Application**
```bash
# Clone repository
git clone <your-repo-url>
cd smart-bookshop/backend

# Build
mvn clean package -DskipTests

# Create systemd service
sudo vi /etc/systemd/system/bookshop.service
```

**Service File:**
```ini
[Unit]
Description=Smart Book Shop API
After=network.target

[Service]
Type=simple
User=ubuntu
WorkingDirectory=/home/ubuntu/smart-bookshop/backend
ExecStart=/usr/bin/java -jar target/bookshop-1.0.0.jar
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
```

4. **Start Service**
```bash
sudo systemctl daemon-reload
sudo systemctl enable bookshop
sudo systemctl start bookshop
```

### Option 2: Heroku

1. **Install Heroku CLI**
```bash
curl https://cli-assets.heroku.com/install.sh | sh
```

2. **Login to Heroku**
```bash
heroku login
```

3. **Create Procfile**
```
web: java -Dserver.port=$PORT $JAVA_OPTS -jar target/*.jar
```

4. **Deploy**
```bash
git push heroku main
```

### Option 3: Docker

1. **Create Dockerfile**
```dockerfile
FROM eclipse-temurin:21-jdk-jammy
WORKDIR /app
COPY target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
```

2. **Build and Push**
```bash
docker build -t bookshop-api .
docker tag bookshop-api:latest <your-registry>/bookshop-api:latest
docker push <your-registry>/bookshop-api:latest
```

3. **Run Container**
```bash
docker run -p 8080:8080 -e MONGODB_URI=<uri> bookshop-api
```

---

## Frontend Deployment

### Option 1: Vercel (Recommended)

1. **Install Vercel CLI**
```bash
npm i -g vercel
```

2. **Deploy**
```bash
cd frontend
vercel
```

3. **Configure Environment**
   - Set `VITE_API_BASE_URL` in Vercel dashboard

### Option 2: Netlify

1. **Build Project**
```bash
cd frontend
npm run build
```

2. **Connect Repository**
   - Go to https://netlify.com
   - Connect GitHub repository
   - Set build command: `npm run build`
   - Set publish directory: `dist`

3. **Configure Environment**
   - Add environment variables in Netlify dashboard

### Option 3: AWS S3 + CloudFront

1. **Build Project**
```bash
npm run build
```

2. **Upload to S3**
```bash
aws s3 sync dist/ s3://your-bucket-name
```

3. **Configure CloudFront**
   - Create distribution pointing to S3
   - Set default root object to `index.html`

---

## Database Deployment

### MongoDB Atlas (Recommended)

1. **Create Cluster**
   - Go to MongoDB Atlas
   - Create M0 (free) cluster
   - Choose region

2. **Create Database User**
   - Username: your_username
   - Password: strong_password

3. **Get Connection String**
   - Connection string format: `mongodb+srv://username:password@cluster.mongodb.net/dbname`

4. **Configure IP Whitelist**
   - Allow all IPs (0.0.0.0/0) for development
   - Restrict to server IP in production

### Self-Hosted MongoDB

1. **Install MongoDB on Server**
```bash
sudo apt-get install -y mongodb-org
sudo systemctl start mongod
```

2. **Enable Authentication**
```javascript
use admin
db.createUser({
  user: "admin",
  pwd: "strongpassword",
  roles: ["root"]
})
```

---

## Reverse Proxy Setup (Nginx)

Create `/etc/nginx/sites-available/bookshop`:

```nginx
upstream bookshop_backend {
    server localhost:8080;
}

server {
    listen 80;
    server_name api.bookshop.com;
    
    location / {
        proxy_pass http://bookshop_backend;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}

server {
    listen 80;
    server_name bookshop.com;
    
    root /var/www/bookshop;
    index index.html;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

Enable it:
```bash
sudo ln -s /etc/nginx/sites-available/bookshop /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

---

## SSL/TLS Setup (Let's Encrypt)

1. **Install Certbot**
```bash
sudo apt install certbot python3-certbot-nginx
```

2. **Generate Certificate**
```bash
sudo certbot certonly --nginx -d api.bookshop.com -d bookshop.com
```

3. **Update Nginx Config**
```nginx
server {
    listen 443 ssl http2;
    server_name api.bookshop.com;
    
    ssl_certificate /etc/letsencrypt/live/api.bookshop.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/api.bookshop.com/privkey.pem;
    
    # ... rest of config
}

server {
    listen 80;
    server_name api.bookshop.com;
    return 301 https://$server_name$request_uri;
}
```

4. **Auto-Renewal**
```bash
sudo systemctl enable certbot.timer
sudo systemctl start certbot.timer
```

---

## Monitoring & Logging

### Backend Logs
```bash
# View logs
sudo journalctl -u bookshop -f

# Or Docker
docker logs -f bookshop-api
```

### Application Monitoring
- Set up CloudWatch (AWS)
- Or use New Relic/DataDog

### Database Monitoring
- MongoDB Atlas has built-in monitoring
- Or use Grafana for self-hosted

---

## Performance Optimization

### Backend
- Enable caching with Redis
- Use connection pooling
- Implement pagination
- Add database indexes
- Monitor query performance

### Frontend
- Enable gzip compression
- Minify CSS/JS
- Optimize images
- Lazy load components
- Use CDN for assets

### Database
- Create indexes on frequently queried fields
- Archive old data
- Regular backups
- Monitor query performance

---

## Environment Variables (Production)

### Backend (application.yml)
```yaml
spring:
  profiles:
    active: prod
  data:
    mongodb:
      uri: ${MONGODB_URI}
      
jwt:
  secret: ${JWT_SECRET}
  expiration: ${JWT_EXPIRATION:86400000}
  
cloudinary:
  cloud-name: ${CLOUDINARY_CLOUD_NAME}
  api-key: ${CLOUDINARY_API_KEY}
  api-secret: ${CLOUDINARY_API_SECRET}

server:
  port: ${PORT:8080}
  servlet:
    context-path: /api
  compression:
    enabled: true
```

### Frontend (.env.production)
```
VITE_API_BASE_URL=https://api.bookshop.com
VITE_APP_NAME=Smart Book Shop
VITE_ANALYTICS_ID=your-analytics-id
```

---

## Backup Strategy

### Database
```bash
# MongoDB backup
mongodump --uri="mongodb+srv://user:pass@cluster/dbname" --out=/backups

# Schedule with cron
0 2 * * * /home/ubuntu/backup-mongodb.sh
```

### Application
- Use git for version control
- Tag releases
- Keep backups of config files

---

## Rollback Plan

1. Keep previous version running
2. Use feature flags
3. Database migrations: always reversible
4. Keep DNS pointing to stable version
5. Quick rollback command: `systemctl restart bookshop`

---

## Post-Deployment Checklist

- [ ] Test all endpoints
- [ ] Test authentication flow
- [ ] Test payment processing
- [ ] Monitor error logs
- [ ] Monitor performance metrics
- [ ] Test backup restoration
- [ ] Update documentation
- [ ] Notify stakeholders

---

## Troubleshooting

### Application won't start
```bash
# Check logs
journalctl -u bookshop -n 50

# Verify environment variables
echo $MONGODB_URI

# Test database connection
mongosh "$MONGODB_URI"
```

### High memory usage
- Increase heap size: `-Xmx512m`
- Monitor query performance
- Check for memory leaks

### Database connection issues
- Verify connection string
- Check IP whitelist
- Test with mongodb cli

### Frontend not loading
- Check build output
- Verify API endpoint
- Check browser console

---

## Cost Estimation

- **MongoDB Atlas M0**: Free
- **Vercel Frontend**: Free
- **AWS EC2 t2.micro**: Free (first year)
- **Cloudinary Free Tier**: 25 GB storage
- **Total**: ~$10-50/month after free tier

---

For more help, check the main [README.md](README.md) and [ENV_SETUP.md](ENV_SETUP.md).
