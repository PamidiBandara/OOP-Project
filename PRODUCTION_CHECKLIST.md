# Production Deployment Checklist

## Pre-Deployment Code Review

- [ ] All code follows clean code principles
- [ ] No console.log or debug statements left in production code
- [ ] No hardcoded credentials or API keys
- [ ] All error handling is implemented
- [ ] Input validation is complete
- [ ] SQL injection vulnerabilities checked (if applicable)
- [ ] XSS vulnerabilities checked
- [ ] CSRF protections implemented
- [ ] Rate limiting considerations
- [ ] All tests passing
- [ ] No deprecated dependencies

## Backend Preparation

- [ ] Run all unit tests: `mvn test`
- [ ] Run integration tests: `mvn integration-test`
- [ ] Code review completed
- [ ] SonarQube analysis passed
- [ ] Update pom.xml version to release version
- [ ] Remove SNAPSHOT from version
- [ ] Verify all dependencies are final versions
- [ ] Test with production database (MongoDB Atlas)
- [ ] Test with production Cloudinary credentials
- [ ] Verify JWT secret is strong (min 256 chars)
- [ ] Configure production logging levels
- [ ] Verify error messages don't expose sensitive info
- [ ] Load testing completed
- [ ] Performance profiling done
- [ ] Security headers configured (CORS, CSP, etc.)

## Frontend Preparation

- [ ] Run all tests: `npm test`
- [ ] Run linting: `npm run lint`
- [ ] Test production build: `npm run build`
- [ ] Test preview build: `npm run preview`
- [ ] Verify all API endpoints use correct base URL
- [ ] Remove all console.log statements
- [ ] Update package.json version
- [ ] Verify environment variables are set correctly
- [ ] Test with production API endpoint
- [ ] Google Lighthouse audit passed
- [ ] Cross-browser testing completed
- [ ] Mobile responsiveness verified
- [ ] Performance optimization complete
- [ ] All images optimized
- [ ] Lazy loading implemented where needed
- [ ] Build size is acceptable
- [ ] No console errors or warnings

## Database Preparation

- [ ] MongoDB Atlas cluster created
- [ ] Database backups configured
- [ ] Indexes created on frequently queried fields
- [ ] Database user created with strong password
- [ ] IP whitelist configured (production server IP only)
- [ ] Database monitoring enabled
- [ ] Connection string verified
- [ ] Test data loaded and verified
- [ ] Migration scripts tested

## Security Checklist

- [ ] SSL/TLS certificate obtained and configured
- [ ] JWT_SECRET is strong and rotated
- [ ] API endpoints properly protected with @PreAuthorize
- [ ] CORS is configured for production domain only
- [ ] HTTPS enforced (redirect HTTP to HTTPS)
- [ ] Security headers configured:
  - [ ] Content-Security-Policy
  - [ ] X-Frame-Options
  - [ ] X-Content-Type-Options
  - [ ] Strict-Transport-Security
- [ ] Rate limiting implemented
- [ ] Input validation on all endpoints
- [ ] SQL injection prevention verified
- [ ] XSS prevention verified
- [ ] CSRF token validation verified
- [ ] Password requirements enforced
- [ ] API versioning strategy implemented
- [ ] Secrets management implemented
- [ ] Audit logging configured

## Infrastructure Preparation

- [ ] Server/VM provisioned and configured
- [ ] Nginx/Reverse proxy configured
- [ ] Database backup strategy implemented
- [ ] Monitoring and alerting set up
- [ ] Log aggregation configured (CloudWatch, ELK, etc.)
- [ ] CDN configured for static assets (if applicable)
- [ ] Load balancer configured (if applicable)
- [ ] Auto-scaling configured (if applicable)
- [ ] Disaster recovery plan created

## Deployment Steps

1. **Pre-Deployment**
   - [ ] Create backup of production database
   - [ ] Document rollback procedure
   - [ ] Notify stakeholders of deployment window
   - [ ] Prepare rollback plan

2. **Backend Deployment**
   - [ ] Build final JAR: `mvn clean package -DskipTests`
   - [ ] Upload to server
   - [ ] Stop old service: `sudo systemctl stop bookshop`
   - [ ] Backup old JAR
   - [ ] Copy new JAR
   - [ ] Start service: `sudo systemctl start bookshop`
   - [ ] Verify service is running: `sudo systemctl status bookshop`
   - [ ] Check logs: `sudo journalctl -u bookshop -f`
   - [ ] Test API endpoints

3. **Frontend Deployment**
   - [ ] Build: `npm run build`
   - [ ] Upload dist folder to CDN/server
   - [ ] Clear CDN cache
   - [ ] Test website functionality
   - [ ] Verify all links work

4. **Post-Deployment**
   - [ ] Test all critical user flows
   - [ ] Monitor error rates
   - [ ] Check response times
   - [ ] Verify database connections
   - [ ] Monitor resource usage
   - [ ] Test payment processing (if applicable)
   - [ ] Verify email notifications work (if applicable)
   - [ ] Check mobile app functionality
   - [ ] Social media/support team ready for issues

## Post-Deployment Monitoring (First 24 Hours)

- [ ] Monitor error logs for exceptions
- [ ] Check server resource usage (CPU, Memory, Disk)
- [ ] Monitor database connections and performance
- [ ] Check for 500 errors in logs
- [ ] Monitor API response times
- [ ] Verify email notifications are working
- [ ] Check user registration/login flow
- [ ] Monitor real-time user activity
- [ ] Check third-party service integrations (Cloudinary, etc.)
- [ ] Monitor database backup jobs

## Post-Deployment Monitoring (First Week)

- [ ] Review error patterns
- [ ] Analyze user behavior
- [ ] Monitor system performance metrics
- [ ] Check for memory leaks
- [ ] Review database slow queries
- [ ] Monitor storage usage
- [ ] Check API rate limiting
- [ ] Verify backup completion
- [ ] Document any issues found
- [ ] Plan improvements

## Rollback Procedure

If critical issues occur:

1. **Backend Rollback**
   ```bash
   sudo systemctl stop bookshop
   cp /backup/old-bookshop.jar target/bookshop.jar
   sudo systemctl start bookshop
   ```

2. **Frontend Rollback**
   ```bash
   # Restore previous version from CDN/server
   # Clear CDN cache
   ```

3. **Database Rollback**
   ```bash
   # Restore from backup if data corruption
   mongorestore --drop --archive=/path/to/backup.archive
   ```

4. **Communication**
   - Notify stakeholders immediately
   - Post status update on status page
   - Document incident for post-mortem

## Documentation

- [ ] Deployment guide documented
- [ ] Runbook for common issues created
- [ ] API changes documented
- [ ] Database schema changes documented
- [ ] Configuration changes documented
- [ ] Known issues documented
- [ ] Performance metrics documented

## Performance Targets

- Backend response time: < 200ms (p95)
- Frontend page load time: < 3 seconds
- Database query response time: < 100ms (p95)
- API error rate: < 0.1%
- Uptime target: 99.9%
- Server CPU usage: < 70%
- Memory usage: < 80%

---

**Deployment Date**: _______________
**Deployed By**: _______________
**Approved By**: _______________
**Notes**: _______________________________________________________________

---

For issues or questions, contact: devops@bookshop.com
