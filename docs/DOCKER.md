# TESTFORGE AI - Docker & Containerization Guide

## 🐳 Docker Overview

TESTFORGE AI includes Docker support for easy deployment and development.

**What is Docker?**
Docker containers package your application with all dependencies, ensuring it runs the same everywhere.

**Benefits:**
- ✅ Consistent environment (dev, test, prod)
- ✅ Easy deployment
- ✅ Isolated services
- ✅ Scalable architecture
- ✅ Simplified dependency management

---

## 📋 Prerequisites

### Install Docker Desktop
1. Download [Docker Desktop](https://www.docker.com/products/docker-desktop)
2. Install and start the application
3. Verify installation:

```powershell
docker --version
docker-compose --version
```

**Expected Output:**
```
Docker version 24.0.0, build ...
Docker Compose version v2.23.0
```

---

## 🚀 Quick Start with Docker Compose

### Single Command Deployment

```powershell
# Navigate to project root
cd testforge-ai

# Build and start all services
docker-compose up --build

# Wait for services to be ready (2-3 minutes)
```

**Expected Output:**
```
[+] Running 2/2
 ✓ Container testforge-ai-backend   Started
 ✓ Container testforge-ai-frontend  Started

testforge-backend  | TestForge AI Backend is running
testforge-frontend | Compiled successfully!
```

### Access Services

- **Frontend:** http://localhost:3000
- **Backend:** http://localhost:5000
- **API Status:** http://localhost:5000/api/status
- **Health Check:** http://localhost:5000/health

### Stop Services

```powershell
# Stop and remove containers
docker-compose down

# Stop but keep containers
docker-compose stop

# View logs
docker-compose logs -f
```

---

## 🔨 Individual Container Commands

### Backend Container

**Build:**
```powershell
docker build -t testforge-ai-backend ./backend
```

**Run:**
```powershell
docker run -p 5000:5000 \
  -e TESTFORGE_PORT=5000 \
  -e TESTFORGE_VERSION=2.0.0 \
  testforge-ai-backend
```

**View Logs:**
```powershell
docker logs -f testforge-ai-backend
```

---

### Frontend Container

**Build:**
```powershell
docker build -t testforge-ai-frontend ./frontend
```

**Run:**
```powershell
docker run -p 3000:3000 \
  -e REACT_APP_API_BASE_URL=http://localhost:5000 \
  testforge-ai-frontend
```

---

## 📝 Docker Files Explained

### docker-compose.yml

```yaml
version: '3.8'

services:
  # Backend service
  testforge-backend:
    build:                    # Build image from Dockerfile
      context: ./backend
    container_name: testforge-ai-backend
    ports:
      - "5000:5000"          # Map port 5000 to container
    environment:             # Environment variables
      - TESTFORGE_VERSION=2.0.0
      - TESTFORGE_PORT=5000
    volumes:                 # Mount folders
      - ./backend/src:/app/src
    networks:                # Connect to network
      - testforge-network
    healthcheck:             # Monitor container health
      test: ["CMD", "curl", "-f", "http://localhost:5000/health"]
      interval: 30s
      timeout: 10s
      retries: 3
    restart: unless-stopped  # Auto-restart on failure

  # Frontend service
  testforge-frontend:
    build:
      context: ./frontend
    container_name: testforge-ai-frontend
    ports:
      - "3000:3000"
    environment:
      - REACT_APP_API_BASE_URL=http://testforge-backend:5000
    depends_on:              # Wait for backend to be healthy
      testforge-backend:
        condition: service_healthy
    networks:
      - testforge-network
    restart: unless-stopped

networks:
  testforge-network:         # Custom network for services
    driver: bridge
```

---

### Backend Dockerfile

```dockerfile
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY public ./public
COPY src ./src

# Install Playwright browsers
RUN npm run install-browsers

# Configure health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:5000/health', (r) => {if (r.statusCode !== 200) throw new Error(r.statusCode)})"

# Expose port
EXPOSE 5000

# Start backend
CMD ["npm", "start"]
```

---

### Frontend Dockerfile

```dockerfile
FROM node:18-alpine as build

WORKDIR /app
COPY package*.json ./
RUN npm ci

COPY public ./public
COPY src ./src
RUN npm run build

# Stage 2: Nginx for serving
FROM nginx:alpine

COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]
```

---

## 🔍 Docker Commands Reference

### Container Management

```powershell
# List running containers
docker ps

# List all containers (including stopped)
docker ps -a

# View container logs
docker logs <container-id>

# Follow logs in real-time
docker logs -f <container-id>

# Execute command in container
docker exec -it <container-id> /bin/sh

# Stop container
docker stop <container-id>

# Remove container
docker rm <container-id>
```

### Image Management

```powershell
# List images
docker images

# Remove image
docker rmi <image-id>

# Tag image
docker tag <image-id> <new-name>

# Inspect image
docker inspect <image-id>
```

### Docker Compose

```powershell
# Build images
docker-compose build

# Start services
docker-compose up

# Start in background
docker-compose up -d

# Stop services
docker-compose stop

# Remove services
docker-compose down

# View logs
docker-compose logs

# View service status
docker-compose ps
```

---

## 🐛 Troubleshooting Docker

### Port Already in Use

```powershell
# Find what's using port 5000
netstat -ano | findstr :5000

# Kill the process
taskkill /PID <PID> /F

# Or change port in docker-compose.yml
# Change: "5000:5000" to "5001:5000"
```

### Container Won't Start

```powershell
# Check logs
docker logs testforge-ai-backend

# Common issues:
# - Port conflict
# - Missing environment variables
# - Insufficient memory
```

### Frontend Can't Connect to Backend

```powershell
# Check Docker network
docker network ls

# Inspect network
docker network inspect testforge-network

# Verify API_BASE_URL
docker inspect testforge-ai-frontend | grep REACT_APP_API_BASE_URL
```

### Out of Memory

```powershell
# Increase Docker Desktop memory:
# Windows: Settings > Resources > Memory > Increase to 4GB+
# Mac: Docker menu > Preferences > Resources > Increase

# Check memory usage
docker stats
```

---

## 📊 Docker Performance Tips

### 1. Optimize Dockerfile
```dockerfile
# Good: Multi-stage build
FROM node:18 as builder
# Build stage

FROM node:18-alpine
# Runtime stage

# Result: Smaller final image (~400MB instead of 1.5GB)
```

### 2. Use .dockerignore
```
# .dockerignore file
node_modules
npm-debug.log
.git
.gitignore
.env
.env.local
dist
build
coverage
.vscode
.idea
```

### 3. Cache Dependencies
```dockerfile
# Copy package first (leverages Docker cache)
COPY package*.json ./
RUN npm ci

# Then copy source (changes frequently)
COPY . .
```

### 4. Monitor Resources
```powershell
# View real-time stats
docker stats

# Set memory limits
docker run -m 500m testforge-ai-backend
```

---

## ☁️ Deploying to Cloud

### AWS (ECR + ECS)

```bash
# Login to AWS ECR
aws ecr get-login-password > ecr-login.txt

# Push image
docker push <account>.dkr.ecr.us-east-1.amazonaws.com/testforge-ai:latest
```

### Azure Container Registry

```bash
# Login
az acr login --name testforgeregistry

# Tag and push
docker tag testforge-ai:latest testforgeregistry.azurecr.io/testforge-ai:latest
docker push testforgeregistry.azurecr.io/testforge-ai:latest
```

### Docker Hub

```bash
# Login
docker login

# Tag
docker tag testforge-ai:latest yourusername/testforge-ai:latest

# Push
docker push yourusername/testforge-ai:latest
```

---

## 🔒 Security Best Practices

### 1. Use Specific Base Image Versions
```dockerfile
# Good
FROM node:18.17.0-alpine

# Avoid
FROM node:latest
```

### 2. Run as Non-Root User
```dockerfile
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nodejs -u 1001
USER nodejs
```

### 3. Scan Images for Vulnerabilities
```bash
docker scan testforge-ai-backend
```

### 4. Don't Store Secrets in Images
```dockerfile
# Bad
ENV DATABASE_PASSWORD=secret123

# Good
# Use Docker secrets or environment variables at runtime
docker run -e DATABASE_PASSWORD=secret123 image
```

---

## 📈 Scaling with Docker

### Multiple Backend Instances

```yaml
services:
  backend-1:
    build: ./backend
    ports:
      - "5000:5000"

  backend-2:
    build: ./backend
    ports:
      - "5001:5000"

  backend-3:
    build: ./backend
    ports:
      - "5002:5000"

  # Use Nginx to load balance
  nginx:
    image: nginx:alpine
    ports:
      - "5000:5000"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
```

### Docker Swarm

```bash
# Initialize swarm
docker swarm init

# Deploy stack
docker stack deploy -c docker-compose.yml testforge-ai

# Scale service
docker service scale testforge-ai_backend=3
```

---

## 📚 Docker Resources

- [Docker Official Documentation](https://docs.docker.com/)
- [Docker Compose Reference](https://docs.docker.com/compose/compose-file/)
- [Docker Best Practices](https://docs.docker.com/develop/develop-images/dockerfile_best-practices/)
- [Container Security](https://docs.docker.com/engine/security/)

---

## ✅ Docker Checklist

- [ ] Docker Desktop installed and running
- [ ] docker-compose.yml validated
- [ ] All services in docker-compose.yml have healthchecks
- [ ] Environment variables documented
- [ ] .dockerignore file present
- [ ] Images scanned for vulnerabilities
- [ ] Ports configured correctly
- [ ] Volumes mounted for development
- [ ] Networks configured for service communication
- [ ] Restart policies set appropriately

---

**Docker Version:** v24+  
**Docker Compose Version:** v2+  
**Last Updated:** 2024-01-15  
**Status:** Production Ready ✅

Forge Quality. Automate Confidence. 🚀
