#!/bin/bash

# Enhanced OpenBalena Setup Script
set -e

echo "🚀 Enhanced OpenBalena Setup"
echo "=============================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
DOMAIN=${DOMAIN:-openbalena.local}
SECRET_KEY=${SECRET_KEY:-$(openssl rand -base64 32)}

echo -e "${BLUE}Domain:${NC} $DOMAIN"
echo -e "${BLUE}Secret Key:${NC} Generated"

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo -e "${YELLOW}Creating .env file...${NC}"
    cp .env.example .env
    
    # Update .env with generated values
    sed -i "s/your-very-secret-key-here-change-this-in-production/$SECRET_KEY/g" .env
    sed -i "s/openbalena.local/$DOMAIN/g" .env
    
    echo -e "${GREEN}✓ .env file created${NC}"
else
    echo -e "${GREEN}✓ .env file already exists${NC}"
fi

# Check Docker and Docker Compose
echo -e "${YELLOW}Checking Docker installation...${NC}"
if ! command -v docker &> /dev/null; then
    echo -e "${RED}❌ Docker is not installed. Please install Docker first.${NC}"
    exit 1
fi

if ! command -v docker-compose &> /dev/null && ! docker compose version &> /dev/null; then
    echo -e "${RED}❌ Docker Compose is not installed. Please install Docker Compose first.${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Docker and Docker Compose are installed${NC}"

# Build and start services
echo -e "${YELLOW}Building and starting services...${NC}"

# Stop any existing containers
docker-compose down --remove-orphans 2>/dev/null || true

# Build images
echo -e "${BLUE}Building Docker images...${NC}"
docker-compose build

# Start core services first
echo -e "${BLUE}Starting core services...${NC}"
docker-compose up -d db redis

# Wait for database to be ready
echo -e "${YELLOW}Waiting for database to be ready...${NC}"
sleep 10

# Run Django migrations
echo -e "${BLUE}Running Django migrations...${NC}"
docker-compose run --rm web-interface python manage.py migrate

# Create superuser if it doesn't exist
echo -e "${BLUE}Creating Django superuser...${NC}"
docker-compose run --rm web-interface python manage.py shell -c "
from django.contrib.auth.models import User
if not User.objects.filter(username='admin').exists():
    User.objects.create_superuser('admin', 'admin@example.com', 'admin123')
    print('Superuser created: admin/admin123')
else:
    print('Superuser already exists')
"

# Start all services
echo -e "${BLUE}Starting all services...${NC}"
docker-compose up -d

# Wait for services to be ready
echo -e "${YELLOW}Waiting for services to start...${NC}"
sleep 15

# Check service health
echo -e "${BLUE}Checking service health...${NC}"

services=("web-interface:8080" "db:5432" "redis:6379")
for service in "${services[@]}"; do
    IFS=':' read -r name port <<< "$service"
    if docker-compose ps | grep -q "$name.*Up"; then
        echo -e "${GREEN}✓ $name is running${NC}"
    else
        echo -e "${RED}❌ $name is not running${NC}"
    fi
done

# Display access information
echo ""
echo -e "${GREEN}🎉 Enhanced OpenBalena is ready!${NC}"
echo "=================================="
echo ""
echo -e "${BLUE}Web Dashboard:${NC} http://localhost:8080"
echo -e "${BLUE}React Frontend:${NC} http://localhost:5173 (if running separately)"
echo -e "${BLUE}Django Admin:${NC} http://localhost:8080/admin/"
echo -e "${BLUE}API Endpoint:${NC} http://localhost:8080/api/"
echo -e "${BLUE}HAProxy Stats:${NC} http://localhost:1936/stats"
echo ""
echo -e "${BLUE}Default Credentials:${NC}"
echo -e "  Username: ${GREEN}admin${NC}"
echo -e "  Password: ${GREEN}admin123${NC}"
echo ""
echo -e "${YELLOW}Next Steps:${NC}"
echo "1. Visit the web dashboard to explore the interface"
echo "2. Check the Django admin to manage users and organizations"
echo "3. Review the API documentation at /api/"
echo "4. Configure your domain settings in .env for production"
echo ""
echo -e "${BLUE}Useful Commands:${NC}"
echo "  View logs: ${GREEN}docker-compose logs -f${NC}"
echo "  Stop services: ${GREEN}docker-compose down${NC}"
echo "  Restart services: ${GREEN}docker-compose restart${NC}"
echo "  Update images: ${GREEN}docker-compose pull && docker-compose up -d${NC}"
echo ""

# Show running containers
echo -e "${BLUE}Running Containers:${NC}"
docker-compose ps
