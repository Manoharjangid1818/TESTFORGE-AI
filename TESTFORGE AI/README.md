<div align="center">

# 🚀 TESTFORGE AI

### Automated QA Testing & Bug Detection Platform

**Forge Quality. Automate Confidence.**

[![Version](https://img.shields.io/badge/version-2.0.0-blue.svg)](CHANGELOG.md)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![Node.js](https://img.shields.io/badge/node-%3E%3D16.0.0-brightgreen.svg)](https://nodejs.org)
[![React](https://img.shields.io/badge/react-18.2.0-61dafb.svg)](https://reactjs.org)
[![Docker](https://img.shields.io/badge/docker-enabled-2496ed.svg)](https://www.docker.com)

[Features](#-features) • [Quick Start](#-quick-start) • [Architecture](#-architecture) • [API](#-api-reference) • [Contributing](#-contributing) • [Docs](#-documentation)

</div>

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#-features)
- [Quick Start](#-quick-start)
- [Architecture](#-architecture)
- [API Reference](#-api-reference)
- [Configuration](#-configuration)
- [Technology Stack](#-technology-stack)
- [Usage Examples](#-usage-examples)
- [Documentation](#-documentation)
- [Contributing](#-contributing)
- [License](#-license)
- [Support](#-support)

---

## Overview

**TESTFORGE AI** is a production-ready automated QA testing platform that helps development teams rapidly identify issues, generate comprehensive test cases, and maintain exceptional code quality through intelligent browser automation and intelligent analysis.

Perfect for:
- 🎯 **Rapid QA Testing** - Automated website testing in seconds
- 🔎 **Bug Detection** - Find issues before they reach production
- 📝 **Test Generation** - Auto-generate test cases from website elements
- 📊 **Quality Reporting** - Professional reports in CSV, HTML, and JSON
- 🚀 **Team Collaboration** - Shareable results and historical tracking

---

## ✨ Features

### 🔍 **6 Automated QA Checks**

| Check | Description | Benefits |
|-------|-------------|----------|
| **Page Load Testing** | Verify website loads correctly | Catch performance issues early |
| **Broken Links Detection** | Identify HTTP errors & unreachable links | Improve user experience |
| **Form Validation** | Analyze form fields & submission handling | Ensure data integrity |
| **Console Error Monitoring** | Detect JavaScript errors & warnings | Find code bugs |
| **Accessibility Compliance** | Check WCAG standards (alt text, headings, etc.) | Ensure inclusive design |
| **Security & Restrictions** | Identify vulnerabilities & access issues | Protect users |

### 🐛 **Intelligent Bug Detection**
```
✅ Automatic bug discovery with detailed steps
✅ Priority classification (Critical, High, Medium, Low)
✅ Severity assessment and impact analysis
✅ Exportable reports (CSV/HTML/JSON)
```

### 📋 **Test Case Generation**
```
✅ Positive test cases (happy path)
✅ Negative test cases (error handling)
✅ Edge cases (boundary conditions)
✅ Auto-generated from page elements
✅ Export ready for TestRail, Jira, etc.
```

### 📊 **Multiple Export Formats**
- **CSV** - Import into Excel, Jira, TestRail
- **HTML** - Professional styled reports
- **JSON** - API integration ready

### 🎯 **RESTful API (7 Endpoints)**
```
POST   /api/testforge/scan              - Create new scan
GET    /api/testforge/scan/:scanId      - Get results
GET    /api/testforge/scans             - List all scans
GET    /api/testforge/export/*          - Export formats
DELETE /api/testforge/scan/:scanId      - Delete scan
```

### 💻 **Modern React Frontend**
- 📱 Responsive Material Design UI
- ⚡ Real-time scan progress
- 📈 Interactive dashboard with metrics
- 🎨 Sidebar navigation (6 views)
- 📱 Mobile-friendly interface

### 🐳 **Enterprise Ready**
- Docker & Docker Compose support
- One-command deployment
- Production-ready configuration
- Health checks & error handling
- Scalable architecture

---

## 🚀 Quick Start

### Prerequisites

```bash
# Node.js 16+ OR Docker installed
node --version    # Should be v16 or higher
docker --version  # For Docker deployment
```

### Option 1: Local Installation (Node.js)

```bash
# 1. Navigate to project
cd "TESTFORGE AI"

# 2. Install & start backend
cd backend
npm install
npm start

# 3. In new terminal, install & start frontend
cd frontend
npm install
npm start

# 4. Open browser
# Frontend: http://localhost:3000
# Backend:  http://localhost:5000
```

### Option 2: Docker Compose (Recommended)

```bash
# 1. Navigate to project
cd "TESTFORGE AI"

# 2. Start all services
docker-compose up --build

# 3. Open browser
# Frontend: http://localhost:3000
# Backend:  http://localhost:5000
```

### First Scan

1. Open **http://localhost:3000** in your browser
2. Click **"New Scan"** in the sidebar
3. Enter website URL (e.g., `https://example.com`)
4. Click **"Start Scan"**
5. View results in:
   - **Dashboard** - Overview & metrics
   - **Bug Report** - Detailed issues
   - **Test Cases** - Generated scenarios
   - **Execution Logs** - Process details

---

## 🏗️ Architecture

### System Design

```
┌─────────────────────────────────────────┐
│          TESTFORGE AI v2.0.0             │
├─────────────────────────────────────────┤
│                                          │
│  ┌──────────────┐    ┌────────────────┐ │
│  │   Frontend   │    │   Backend      │ │
│  │   (React)    │    │  (Express)     │ │
│  │ Port: 3000   │    │ Port: 5000     │ │
│  └──────────────┘    └────────────────┘ │
│         ↓                    ↓           │
│    Dashboard              API Routes     │
│    Components             Scan Logic     │
│    UI/UX                  Utils          │
│                                          │
└─────────────────────────────────────────┘
         │
         ↓
    ┌────────────────┐
    │ Playwright     │
    │ Browser Engine │
    │ (Chromium)     │
    └────────────────┘
```

### Directory Structure

```
TESTFORGE AI/
├── backend/                          # Express.js server
│   ├── src/
│   │   ├── index.js                  # Server entry point
│   │   ├── routes/
│   │   │   └── testforgeRoutes.js    # 7 API endpoints
│   │   └── utils/
│   │       ├── testforgeScanner.js   # QA checks (6 automated)
│   │       ├── testCaseGenerator.js  # Test case generation
│   │       └── exportService.js      # CSV/HTML/JSON export
│   ├── package.json
│   ├── Dockerfile
│   └── .env.example
│
├── frontend/                         # React application
│   ├── src/
│   │   ├── App.js                    # Main component
│   │   ├── App.css                   # Styles
│   │   ├── components/               # 6 React components
│   │   │   ├── TestForgeURLForm.js
│   │   │   ├── TestForgeDashboard.js
│   │   │   ├── TestForgeBugReport.js
│   │   │   ├── TestForgeTestCases.js
│   │   │   ├── TestForgeExecutionLogs.js
│   │   │   └── TestForgeScanHistory.js
│   │   ├── index.js
│   │   └── index.css
│   ├── public/
│   │   └── index.html
│   ├── package.json
│   ├── Dockerfile
│   ├── nginx.conf                    # Production server
│   └── .env.example
│
├── docs/                             # Documentation
│   ├── QUICKSTART-WINDOWS.md
│   ├── DOCKER.md
│   ├── ARCHITECTURE.md
│   ├── API.md
│   └── PROJECT-SUMMARY.md
│
├── tests/                            # Test suites
├── assets/                           # Branding assets
├── docker-compose.yml                # Multi-container setup
├── .env.example                      # Environment template
├── .gitignore
└── README.md                         # This file
```

---

## 🔗 API Reference

### Core Endpoints

#### `POST /api/testforge/scan`
**Start a new QA scan**

```bash
curl -X POST http://localhost:5000/api/testforge/scan \
  -H "Content-Type: application/json" \
  -d '{"url": "https://example.com"}'
```

**Response:**
```json
{
  "success": true,
  "scanId": "550e8400-e29b-41d4-a716-446655440000",
  "message": "Scan initiated"
}
```

---

#### `GET /api/testforge/scan/:scanId`
**Retrieve detailed scan results**

```bash
curl http://localhost:5000/api/testforge/scan/550e8400-e29b-41d4-a716-446655440000
```

**Response:**
```json
{
  "success": true,
  "data": {
    "scanId": "550e8400-e29b-41d4-a716-446655440000",
    "url": "https://example.com",
    "status": "completed",
    "timestamp": "2024-04-07T10:30:00Z",
    "bugs": [
      {
        "id": "BUG001",
        "title": "Missing alt text on images",
        "severity": "High",
        "priority": "High",
        "description": "...",
        "location": "...",
        "reproductionSteps": [...]
      }
    ],
    "testCases": [
      {
        "type": "Positive",
        "scenario": "...",
        "steps": [...],
        "expectedResult": "..."
      }
    ],
    "metrics": {
      "critical": 2,
      "high": 5,
      "medium": 8,
      "low": 3
    }
  }
}
```

---

#### `GET /api/testforge/scans`
**List all scans**

```bash
curl http://localhost:5000/api/testforge/scans
```

---

#### `GET /api/testforge/export/bugs-csv/:scanId`
**Download bugs as CSV**

```bash
curl http://localhost:5000/api/testforge/export/bugs-csv/550e8400-e29b-41d4-a716-446655440000 \
  -o bugs-report.csv
```

---

#### `GET /api/testforge/export/html-report/:scanId`
**Download HTML report**

```bash
curl http://localhost:5000/api/testforge/export/html-report/550e8400-e29b-41d4-a716-446655440000 \
  -o report.html
```

---

#### `GET /api/testforge/export/test-cases-csv/:scanId`
**Download test cases as CSV**

```bash
curl http://localhost:5000/api/testforge/export/test-cases-csv/550e8400-e29b-41d4-a716-446655440000 \
  -o test-cases.csv
```

---

#### `DELETE /api/testforge/scan/:scanId`
**Delete a scan**

```bash
curl -X DELETE http://localhost:5000/api/testforge/scan/550e8400-e29b-41d4-a716-446655440000
```

---

## 🛠️ Configuration

### Environment Variables

**Backend** (`.env` in `/backend`):
```bash
TESTFORGE_PORT=5000
TESTFORGE_HOST=localhost
TESTFORGE_VERSION=2.0.0
TESTFORGE_APP_NAME=TESTFORGE AI
NODE_ENV=development
```

**Frontend** (`.env` in `/frontend`):
```bash
REACT_APP_API_BASE_URL=http://localhost:5000
REACT_APP_APP_NAME=TESTFORGE AI
REACT_APP_VERSION=2.0.0
```

---

## 📊 Technology Stack

### Frontend
| Technology | Version | Purpose |
|-----------|---------|---------|
| React | 18.2.0 | UI Framework |
| Axios | Latest | HTTP Client |
| react-icons | Latest | Icon Library |
| CSS3 | Native | Styling |

### Backend
| Technology | Version | Purpose |
|-----------|---------|---------|
| Node.js | 16+ | Runtime |
| Express | 4.18.2 | Web Framework |
| Playwright | 1.40.0 | Browser Automation |
| csv-writer | Latest | CSV Generation |

### DevOps
| Technology | Purpose |
|-----------|---------|
| Docker | Containerization |
| Docker Compose | Multi-container orchestration |
| Nginx | Production web server |

---

## 💡 Usage Examples

### Example 1: Scan a Website

```javascript
// Using Frontend
1. Open http://localhost:3000
2. Click "New Scan"
3. Enter: https://example.com
4. Click "Start Scan"
5. Wait for results
```

### Example 2: API Integration

```javascript
// Using Backend API
const scanUrl = async (website) => {
  const response = await fetch('http://localhost:5000/api/testforge/scan', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url: website })
  });
  
  const { scanId } = await response.json();
  
  // Get results
  const results = await fetch(
    `http://localhost:5000/api/testforge/scan/${scanId}`
  ).then(r => r.json());
  
  return results;
};
```

### Example 3: Export Results

```bash
# Export as CSV
curl http://localhost:5000/api/testforge/export/bugs-csv/SCAN_ID \
  -o bugs.csv

# Export as HTML
curl http://localhost:5000/api/testforge/export/html-report/SCAN_ID \
  -o report.html

# Export as JSON
curl http://localhost:5000/api/testforge/export/test-cases-csv/SCAN_ID \
  -o test-cases.csv
```

---

## 📚 Documentation

Comprehensive guides available in `/docs`:

| Document | Contents |
|----------|----------|
| **QUICKSTART-WINDOWS.md** | Windows installation & setup |
| **DOCKER.md** | Containerization & deployment |
| **ARCHITECTURE.md** | System design & components |
| **API.md** | Complete API reference |
| **PROJECT-SUMMARY.md** | Project statistics & overview |

---

## 🤝 Contributing

We welcome contributions! Here's how:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Development Setup

```bash
# Clone the repo
git clone https://github.com/YOUR_USERNAME/testforge-ai.git
cd testforge-ai

# Install dependencies
cd frontend && npm install
cd ../backend && npm install

# Start development servers
npm run dev
```

---

## 📄 License

MIT License - See [LICENSE](LICENSE) file for details

This project is open source and available under the MIT License.

---

## 💬 Support

### Getting Help

- **Documentation**: See `/docs` folder
- **Issues**: [Report a bug](../../issues)
- **Discussions**: [Join discussions](../../discussions)
- **Email**: support@testforge-ai.com

### Troubleshooting

| Issue | Solution |
|-------|----------|
| Port 3000 in use | Change `PORT` in `.env` or kill process |
| Port 5000 in use | Change `TESTFORGE_PORT` in backend `.env` |
| Docker error | Run `docker-compose down && docker-compose up --build` |
| Module not found | Run `npm install` in backend and frontend dirs |

---

## 🙏 Acknowledgments

Built with:
- ❤️ By the QA automation community
- 🎯 For better software quality
- 🚀 To empower development teams

---

<div align="center">

### Made with ❤️ for Quality Assurance

[![Star this repo](https://img.shields.io/github/stars/Manoharjangid1818/testforge-ai?style=social)](../../stargazers)
[![Follow](https://img.shields.io/github/followers/Manoharjangid1818?style=social)](https://github.com/Manoharjangid1818)

**[↑ Back to Top](#-testforge-ai)**

© 2024 TESTFORGE AI - Forge Quality. Automate Confidence.

</div>
- **Documentation**: See [/docs](/docs) folder
- **Discussions**: Use GitHub Discussions for questions

## 🌟 Roadmap

- [ ] Mobile app support
- [ ] Advanced analytics
- [ ] Team collaboration features
- [ ] CI/CD pipeline integration
- [ ] Performance profiling
- [ ] Custom rules engine

## ✨ About

**TESTFORGE AI** is an automated quality assurance platform designed to help teams:
- ✅ Catch bugs early in development
- ✅ Generate comprehensive test coverage
- ✅ Maintain consistent code quality
- ✅ Reduce manual testing effort
- ✅ Accelerate testing cycles

**Tagline**: *Forge Quality. Automate Confidence.*

---

<div align="center">

**Made with ❤️ by the TESTFORGE AI Team**

© 2024 TESTFORGE AI - All Rights Reserved

</div>
