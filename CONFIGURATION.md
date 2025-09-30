# Enhanced OpenBalena Configuration Guide

## Overview

Enhanced OpenBalena is a comprehensive IoT device management platform that extends the open-source openBalena with a modern Django web interface, React frontend with shadcn/ui components, and advanced features for enterprise use.

## Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   React Frontend │    │  Django Backend │    │  OpenBalena Core│
│   (shadcn/ui)   │◄──►│   (REST API)    │◄──►│   Services      │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│     Nginx       │    │   PostgreSQL    │    │     Redis       │
│  (Load Balancer)│    │   (Database)    │    │    (Cache)      │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## Environment Variables

### Core Configuration

| Variable | Default | Description |
|----------|---------|-------------|
| `SECRET_KEY` | Generated | Django secret key for cryptographic signing |
| `DEBUG` | `1` | Enable/disable debug mode (0 for production) |
| `ALLOWED_HOSTS` | `localhost,127.0.0.1,0.0.0.0` | Comma-separated list of allowed hosts |

### Database Configuration

| Variable | Default | Description |
|----------|---------|-------------|
| `DATABASE_URL` | `postgresql://postgres:postgres@db:5432/enhanced_openbalena` | Full database URL |
| `POSTGRES_DB` | `enhanced_openbalena` | PostgreSQL database name |
| `POSTGRES_USER` | `postgres` | PostgreSQL username |
| `POSTGRES_PASSWORD` | `postgres` | PostgreSQL password |

### Redis Configuration

| Variable | Default | Description |
|----------|---------|-------------|
| `REDIS_URL` | `redis://redis:6379/0` | Redis connection URL |

### OpenBalena Integration

| Variable | Default | Description |
|----------|---------|-------------|
| `OPENBALENA_API_URL` | `http://api:1337` | OpenBalena API endpoint |
| `OPENBALENA_REGISTRY_URL` | `http://registry:2375` | OpenBalena registry endpoint |
| `OPENBALENA_VPN_URL` | `http://vpn:443` | OpenBalena VPN endpoint |
| `OPENBALENA_S3_URL` | `http://s3:9000` | OpenBalena S3 endpoint |

### Domain Configuration

| Variable | Default | Description |
|----------|---------|-------------|
| `DOMAIN` | `openbalena.local` | Base domain for the platform |
| `API_DOMAIN` | `api.openbalena.local` | API subdomain |
| `REGISTRY_DOMAIN` | `registry.openbalena.local` | Registry subdomain |
| `VPN_DOMAIN` | `vpn.openbalena.local` | VPN subdomain |
| `S3_DOMAIN` | `s3.openbalena.local` | S3 subdomain |
| `WEB_DOMAIN` | `admin.openbalena.local` | Web interface subdomain |

### Feature Flags

| Variable | Default | Description |
|----------|---------|-------------|
| `ENABLE_DELTA_UPDATES` | `true` | Enable delta update functionality |
| `ENABLE_MULTI_USER` | `true` | Enable multi-user and organization support |
| `ENABLE_REMOTE_ACCESS` | `true` | Enable remote device access features |
| `ENABLE_DIAGNOSTICS` | `true` | Enable device diagnostics |

### Security Settings

| Variable | Default | Description |
|----------|---------|-------------|
| `SSL_ENABLED` | `false` | Enable SSL/TLS encryption |
| `CERT_PATH` | `/certs` | Path to SSL certificates |
| `JWT_SECRET` | Generated | JWT signing secret |
| `SESSION_COOKIE_AGE` | `86400` | Session timeout in seconds |

## Service Configuration

### Web Interface (Django)

The Django web interface serves as the API backend and admin interface.

**Key Features:**
- REST API for device and fleet management
- Multi-tenant organization support
- User authentication and authorization
- Real-time device metrics
- Integration with OpenBalena services

**Configuration Files:**
- `web-interface/enhanced_openbalena/settings.py` - Django settings
- `web-interface/requirements.txt` - Python dependencies
- `web-interface/Dockerfile` - Container configuration

### Frontend (React + shadcn/ui)

The React frontend provides a modern, responsive dashboard interface.

**Key Features:**
- Modern UI with shadcn/ui components
- Dark/light mode support
- Real-time device monitoring
- Responsive design for mobile and desktop
- Interactive charts and visualizations

**Configuration Files:**
- `frontend/package.json` - Node.js dependencies
- `frontend/vite.config.js` - Build configuration
- `frontend/components.json` - shadcn/ui configuration

### Database (PostgreSQL)

PostgreSQL serves as the primary data store for device information, user data, and application state.

**Key Features:**
- Multi-tenant data isolation
- Time-series metrics storage
- Full-text search capabilities
- ACID compliance for data integrity

### Cache (Redis)

Redis provides caching and session storage for improved performance.

**Key Features:**
- Session management
- API response caching
- Real-time data caching
- Pub/Sub for real-time updates

### Load Balancer (HAProxy)

HAProxy manages traffic routing and load balancing across services.

**Key Features:**
- SSL termination
- Health checks
- Traffic routing based on domain/path
- Statistics and monitoring

## Deployment Options

### Development Deployment

For development and testing:

```bash
# Clone the repository
git clone https://github.com/willbullen/enhanced-openbalena.git
cd enhanced-openbalena

# Run setup script
./setup.sh

# Access the dashboard
open http://localhost:8080
```

### Production Deployment

For production environments:

1. **Update Environment Variables:**
   ```bash
   cp .env.example .env
   # Edit .env with production values
   ```

2. **Configure SSL/TLS:**
   ```bash
   # Set SSL_ENABLED=true in .env
   # Place certificates in ./certs/ directory
   ```

3. **Deploy with Docker Compose:**
   ```bash
   docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d
   ```

### Kubernetes Deployment

For Kubernetes environments, use the provided Helm charts:

```bash
helm install enhanced-openbalena ./helm/enhanced-openbalena
```

## Monitoring and Logging

### Application Logs

View application logs:
```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f web-interface
```

### Health Checks

Monitor service health:
```bash
# Check container status
docker-compose ps

# View HAProxy stats
open http://localhost:1936/stats
```

### Metrics Collection

The platform includes built-in metrics collection:
- Device performance metrics
- API response times
- Database query performance
- Cache hit rates

## Backup and Recovery

### Database Backup

```bash
# Create backup
docker-compose exec db pg_dump -U postgres enhanced_openbalena > backup.sql

# Restore backup
docker-compose exec -T db psql -U postgres enhanced_openbalena < backup.sql
```

### Configuration Backup

```bash
# Backup configuration
tar -czf config-backup.tar.gz .env docker-compose.yml certs/
```

## Troubleshooting

### Common Issues

1. **Database Connection Errors:**
   - Check PostgreSQL container status
   - Verify database credentials in .env
   - Ensure database is fully initialized

2. **Frontend Build Errors:**
   - Clear node_modules and reinstall dependencies
   - Check Node.js version compatibility
   - Verify shadcn/ui component imports

3. **SSL Certificate Issues:**
   - Regenerate certificates using cert-manager
   - Check certificate file permissions
   - Verify domain configuration

### Debug Mode

Enable debug mode for troubleshooting:
```bash
# Set DEBUG=1 in .env
docker-compose restart web-interface
```

### Log Levels

Adjust log levels in .env:
```bash
LOG_LEVEL=DEBUG
DJANGO_LOG_LEVEL=DEBUG
```

## Performance Optimization

### Database Optimization

- Enable connection pooling
- Configure appropriate indexes
- Regular VACUUM and ANALYZE operations

### Cache Configuration

- Tune Redis memory settings
- Configure appropriate TTL values
- Monitor cache hit rates

### Frontend Optimization

- Enable gzip compression
- Configure CDN for static assets
- Optimize bundle size

## Security Considerations

### Authentication

- Use strong passwords for admin accounts
- Enable two-factor authentication
- Regular password rotation

### Network Security

- Configure firewall rules
- Use SSL/TLS for all connections
- Implement rate limiting

### Data Protection

- Regular security updates
- Encrypt sensitive data at rest
- Implement audit logging

## API Documentation

The REST API provides programmatic access to all platform features:

- **Base URL:** `http://localhost:8080/api/`
- **Authentication:** Token-based or session-based
- **Format:** JSON
- **Documentation:** Available at `/api/docs/`

### Key Endpoints

- `GET /api/dashboard/stats/` - Dashboard statistics
- `GET /api/devices/` - Device list and management
- `GET /api/fleets/` - Fleet management
- `POST /api/devices/{id}/actions/` - Device actions

## Integration Guide

### OpenBalena Integration

The platform integrates with OpenBalena services through REST APIs:

1. **Device Registration:** Automatic device discovery and registration
2. **Application Deployment:** Integration with OpenBalena build and deployment pipeline
3. **Remote Access:** Secure tunneling through OpenBalena VPN
4. **Delta Updates:** Efficient container image updates

### Third-Party Integrations

- **Monitoring Systems:** Prometheus, Grafana integration
- **Alerting:** Webhook support for external alerting systems
- **CI/CD:** Integration with GitLab, GitHub Actions
- **Cloud Providers:** AWS, GCP, Azure deployment options
