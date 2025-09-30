# Enhanced OpenBalena

A comprehensive IoT device management platform that extends openBalena with a modern Django web interface and advanced features to achieve feature parity with balenaCloud.

## Features

- **Modern Web Dashboard**: Django-based web interface with shadcn/ui components
- **Multi-User Support**: Organization and user management capabilities
- **Delta Updates**: Efficient container image updates with binary differentials
- **Remote Device Access**: SSH, VNC, and HTTP access to devices and containers
- **Real-Time Monitoring**: Live device status, logs, and diagnostics
- **Fleet Management**: Comprehensive device and application management
- **Docker Containerized**: Easy deployment with Docker Compose

## Architecture

This project combines the core openBalena services with additional components:

- **Django Web Interface**: Modern web dashboard with shadcn/ui styling
- **OpenBalena Core**: API, Registry, VPN, Database services
- **Delta Update Service**: Efficient container image updates
- **Remote Access Service**: Secure device connectivity
- **PostgreSQL Database**: Enhanced multi-tenant data storage
- **Redis Cache**: Performance optimization and session management

## Quick Start

1. Clone the repository:
```bash
git clone https://github.com/willbullen/enhanced-openbalena.git
cd enhanced-openbalena
```

2. Configure environment variables:
```bash
cp .env.example .env
# Edit .env with your configuration
```

3. Start the services:
```bash
docker-compose up -d
```

4. Access the dashboard:
```
http://localhost:8080
```

## Development

### Prerequisites

- Docker and Docker Compose
- Python 3.11+
- Node.js 18+
- Git

### Local Development Setup

1. Set up the Django development environment:
```bash
cd web-interface
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

2. Set up the frontend development environment:
```bash
cd frontend
npm install
```

3. Run development servers:
```bash
# Django backend
python manage.py runserver

# Frontend development server
npm run dev
```

## Configuration

See [CONFIGURATION.md](./CONFIGURATION.md) for detailed configuration options.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## License

This project is licensed under the AGPL-3.0 License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [OpenBalena](https://github.com/balena-io/open-balena) - Core IoT device management platform
- [Open-Balena-Admin](https://github.com/ob-community/open-balena-admin) - Community dashboard inspiration
- [shadcn/ui](https://ui.shadcn.com/) - Modern UI components
- [Django](https://www.djangoproject.com/) - Web framework
