# TESTFORGE AI - Quick Start Guide (Windows)

## 🟢 Prerequisites

Before getting started, ensure you have:
- **Windows 10/11** operating system
- **Node.js** version 16 or higher ([Download](https://nodejs.org))
- **npm** (comes with Node.js)
- **Git** (optional, for version control)
- **Docker Desktop** (optional, for containerized deployment)

## ⚙️ Installation Steps

### Step 1: Download/Clone Project

```powershell
# Navigate to your projects folder
cd C:\Users\YourUsername\Projects

# Clone or extract the testforge-ai project
git clone https://github.com/yourusername/testforge-ai.git
cd testforge-ai
```

### Step 2: Install Backend Dependencies

```powershell
# Navigate to backend folder
cd backend

# Install Node packages
npm install

# Install Playwright browsers
npm run install-browsers
```

### Step 3: Configure Backend

```powershell
# Copy example environment file
Copy-Item .env.example -Destination .env

# Edit .env with your configuration (optional)
notepad .env
```

### Step 4: Start Backend Server

```powershell
# From backend folder
npm run dev
```

**Expected Output:**
```
╔════════════════════════════════════════════════════════╗
║     🚀 TESTFORGE AI - Backend Server Started 🚀        ║
║  Version: 2.0.0                                        ║
║  Host: http://localhost:5000                           ║
║  Tagline: Forge Quality. Automate Confidence.          ║
╚════════════════════════════════════════════════════════╝
```

### Step 5: Install Frontend Dependencies (New Terminal)

```powershell
# Open new PowerShell terminal
# Navigate to project root
cd C:\Users\YourUsername\Projects\testforge-ai

# Go to frontend folder
cd frontend

# Install dependencies
npm install
```

### Step 6: Start Frontend Application

```powershell
# From frontend folder
npm start
```

**Expected Output:**
```
Compiled successfully!

You can now view testforge-ai-frontend in the browser.

  Local:            http://localhost:3000
  On Your Network:  http://192.168.1.x:3000
```

## 🌐 Access TESTFORGE AI

Open your web browser and navigate to:
```
http://localhost:3000
```

## ✅ First Scan

1. **Click "New Scan"** in the sidebar
2. **Enter a URL** (e.g., `https://example.com`)
3. **Click "Start Scan"**
4. **View results** in Dashboard, Bug Report, and Test Cases tabs
5. **Export reports** as CSV or HTML

## 🐳 Alternative: Docker Installation

If you have Docker Desktop installed:

```powershell
# Navigate to project root
cd testforge-ai

# Build and start services
docker-compose up --build

# Wait for services to be ready (2-3 minutes)
# Then access at http://localhost:3000
```

## 🛑 Stopping Services

### Local Environment:
- Press `Ctrl + C` in both terminals (backend and frontend)

### Docker:
```powershell
docker-compose down
```

## 🐛 Troubleshooting

### Port Already in Use
```powershell
# Find process using port 5000
netstat -ano | findstr :5000

# Kill the process (replace PID with actual process ID)
taskkill /PID <PID> /F
```

### Node Modules Issues
```powershell
# Delete node_modules and reinstall
Remove-Item -Recurse -Force node_modules
npm install
```

### Playwright Browser Issues
```powershell
# Reinstall Playwright browsers
npm run install-browsers
```

## 📁 Project Structure

```
testforge-ai/
├── backend/              # Express.js server
│   ├── src/
│   ├── package.json
│   └── Dockerfile
├── frontend/             # React application
│   ├── src/
│   ├── public/
│   └── package.json
├── docs/                 # Documentation
├── docker-compose.yml    # Docker configuration
└── README.md
```

## 📊 Features Overview

✅ **6 Automated QA Checks** - Page load, broken links, forms, console, accessibility, security
✅ **Bug Detection** - Automatic issue discovery with detailed steps
✅ **Test Case Generation** - Positive, negative, and edge cases
✅ **Multiple Export Formats** - CSV, HTML, JSON
✅ **RESTful API** - 7 endpoints for automation
✅ **Professional UI** - React-based dashboard

## 🔗 Useful Links

- **Backend API**: http://localhost:5000/api/status
- **Frontend**: http://localhost:3000
- **Health Check**: http://localhost:5000/health

## 📝 Environment Variables

Located in `.env` file:

```bash
# Backend
TESTFORGE_PORT=5000
TESTFORGE_HOST=localhost
TESTFORGE_VERSION=2.0.0

# Frontend
REACT_APP_API_BASE_URL=http://localhost:5000
```

## ✨ Next Steps

1. Read [API.md](./API.md) for API endpoint documentation
2. Check [ARCHITECTURE.md](./ARCHITECTURE.md) for system design
3. Visit [ADVANCED.md](./ADVANCED.md) for advanced configuration

## 💡 Tips

- Keep both backend and frontend terminals open during development
- Check browser console (F12) for frontend errors
- Check backend terminal for API errors and logs
- Use Ctrl+Shift+K to clear terminal

## ❓ Need Help?

1. Check [README.md](../README.md) for general information
2. Review error messages in terminals
3. Check GitHub Issues for similar problems
4. Create a new issue with detailed error information

---

**Happy Testing! 🚀**

Forge Quality. Automate Confidence.
