# TESTFORGE AI - Complete API Reference

## 📚 API Overview

TESTFORGE AI provides 7 RESTful API endpoints for automated QA scanning, bug detection, test case generation, and report export.

**Base URL:** `http://localhost:5000/api/testforge`

**Authentication:** None (development) - Implement as needed for production

## 🔐 Health & Status Endpoints

### GET `/health`
Check backend server health status

**URL:** `http://localhost:5000/health`

**Response:**
```json
{
  "status": "healthy",
  "application": "TESTFORGE AI",
  "version": "2.0.0",
  "timestamp": "2024-01-15T10:30:45.123Z"
}
```

### GET `/api/version`
Get application version information

**Response:**
```json
{
  "app": "TESTFORGE AI",
  "version": "2.0.0",
  "description": "Automated QA Testing, Bug Detection & Test Case Generation",
  "tagline": "Forge Quality. Automate Confidence."
}
```

### GET `/api/status`
Get API status and available endpoints

**Response:**
```json
{
  "success": true,
  "message": "TestForge AI Backend is running",
  "status": "online",
  "endpoints": {
    "/api/testforge/scan": "POST - Start QA scan",
    "/api/testforge/scan/:scanId": "GET - Get scan results",
    "/api/testforge/scans": "GET - List all scans",
    "/api/testforge/export/bugs-csv/:scanId": "GET - Export bugs as CSV",
    "/api/testforge/export/test-cases-csv/:scanId": "GET - Export test cases as CSV",
    "/api/testforge/export/html-report/:scanId": "GET - Export HTML report",
    "/api/testforge/scan/:scanId": "DELETE - Delete scan"
  }
}
```

## 🔍 Scanning Endpoints

### POST `/api/testforge/scan`
Start a new automated QA scan on a website

**Request:**
```bash
curl -X POST http://localhost:5000/api/testforge/scan \
  -H "Content-Type: application/json" \
  -d '{"url":"https://example.com"}'
```

**Request Body:**
```json
{
  "url": "https://example.com"
}
```

**Response (Success):**
```json
{
  "success": true,
  "message": "Scan started - TESTFORGE AI is analyzing your website",
  "scanId": "550e8400-e29b-41d4-a716-446655440000"
}
```

**Response (Error):**
```json
{
  "success": false,
  "error": "Invalid URL format"
}
```

**Status Codes:**
- `200` - Scan started successfully
- `400` - Invalid URL or missing parameters
- `500` - Server error

**What the Scanner Does:**
1. Navigates to the provided URL
2. Checks page load time and content
3. Scans for broken links (first 20)
4. Analyzes forms for validation
5. Monitors console for errors
6. Checks accessibility (alt text, headings)
7. Detects security issues
8. Generates test cases
9. Stores results by scanId

---

### GET `/api/testforge/scan/:scanId`
Retrieve detailed results of a completed scan

**Request:**
```bash
curl http://localhost:5000/api/testforge/scan/550e8400-e29b-41d4-a716-446655440000
```

**Response (Success):**
```json
{
  "success": true,
  "data": {
    "scanId": "550e8400-e29b-41d4-a716-446655440000",
    "url": "https://example.com",
    "startTime": "2024-01-15T10:30:45.123Z",
    "status": "completed",
    "bugs": [
      {
        "id": "bug-uuid",
        "title": "Broken Navigation Link",
        "module": "Navigation",
        "stepsToReproduce": "Click on /contact link",
        "expectedResult": "Page should load",
        "actualResult": "HTTP 404 error",
        "priority": "High",
        "severity": "high",
        "timestamp": "2024-01-15T10:30:50.000Z"
      }
    ],
    "testCases": [
      {
        "id": "tc-uuid",
        "title": "TF-AUTH-001",
        "description": "Valid Login with Correct Credentials",
        "module": "Authentication",
        "testType": "Positive",
        "expectedResult": "User is logged in and redirected",
        "priority": "Critical"
      }
    ],
    "consoleLogs": [],
    "networkIssues": []
  }
}
```

**Response (Error):**
```json
{
  "success": false,
  "error": "Scan not found"
}
```

**Status Codes:**
- `200` - Scan found
- `404` - Scan not found
- `500` - Server error

---

### GET `/api/testforge/scans`
List all scans performed

**Request:**
```bash
curl http://localhost:5000/api/testforge/scans
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "scanId": "550e8400-e29b-41d4-a716-446655440000",
      "url": "https://example.com",
      "startTime": "2024-01-15T10:30:45.123Z",
      "status": "completed",
      "bugCount": 3,
      "testCaseCount": 12
    },
    {
      "scanId": "660e8400-e29b-41d4-a716-446655440001",
      "url": "https://google.com",
      "startTime": "2024-01-15T10:25:20.000Z",
      "status": "completed",
      "bugCount": 1,
      "testCaseCount": 8
    }
  ],
  "total": 2
}
```

**Status Codes:**
- `200` - Success
- `500` - Server error

---

## 📥 Export Endpoints

### GET `/api/testforge/export/bugs-csv/:scanId`
Export detected bugs as CSV file

**Request:**
```bash
curl -O http://localhost:5000/api/testforge/export/bugs-csv/550e8400-e29b-41d4-a716-446655440000
```

**Response:**
- File download: `testforge-bug-report.csv`
- CSV columns: Bug ID, Title, Module, Steps to Reproduce, Expected Result, Actual Result, Priority, Detected At

**HTTP Headers:**
```
Content-Type: text/csv
Content-Disposition: attachment; filename="testforge-bug-report.csv"
```

**Status Codes:**
- `200` - CSV generated and sent
- `404` - Scan not found
- `500` - Server error

---

### GET `/api/testforge/export/test-cases-csv/:scanId`
Export generated test cases as CSV file

**Request:**
```bash
curl -O http://localhost:5000/api/testforge/export/test-cases-csv/550e8400-e29b-41d4-a716-446655440000
```

**Response:**
- File download: `testforge-test-cases.csv`
- CSV columns: Test Case ID, Description, Module, Type, Expected Result, Priority

**Status Codes:**
- `200` - CSV generated and sent
- `404` - Scan not found
- `500` - Server error

---

### GET `/api/testforge/export/html-report/:scanId`
Export comprehensive HTML report with styling

**Request:**
```bash
curl -O http://localhost:5000/api/testforge/export/html-report/550e8400-e29b-41d4-a716-446655440000
```

**Response:**
- File download: `testforge-qa-report.html`
- Professional formatted report with:
  - TESTFORGE AI branding
  - Summary statistics
  - Bug report table
  - Test case table
  - Color-coded severity levels
  - Responsive design

**Features:**
- ✅ Printable design
- ✅ Color-coded severity (Critical, High, Medium, Low)
- ✅ Statistics dashboard
- ✅ Professional styling
- ✅ Mobile responsive

**Status Codes:**
- `200` - HTML generated and sent
- `404` - Scan not found
- `500` - Server error

---

## 🗑️ Management Endpoints

### DELETE `/api/testforge/scan/:scanId`
Delete a scan and its results

**Request:**
```bash
curl -X DELETE http://localhost:5000/api/testforge/scan/550e8400-e29b-41d4-a716-446655440000
```

**Response (Success):**
```json
{
  "success": true,
  "message": "Scan deleted successfully"
}
```

**Response (Error):**
```json
{
  "success": false,
  "error": "Scan not found"
}
```

**Status Codes:**
- `200` - Scan deleted
- `404` - Scan not found
- `500` - Server error

---

## 📊 Response Objects

### Bug Object
```json
{
  "id": "uuid",
  "title": "Issue title",
  "module": "Module affected",
  "stepsToReproduce": "Steps to reproduce",
  "expectedResult": "What should happen",
  "actualResult": "What actually happened",
  "priority": "Critical|High|Medium|Low",
  "severity": "critical|high|medium|low",
  "timestamp": "ISO 8601 timestamp"
}
```

### Test Case Object
```json
{
  "id": "uuid",
  "title": "TF-MODULE-###",
  "description": "Test description",
  "module": "Module name",
  "testType": "Positive|Negative|Edge Case",
  "preconditions": "Setup required",
  "steps": ["Step 1", "Step 2", "..."],
  "expectedResult": "Expected behavior",
  "priority": "Critical|High|Medium|Low",
  "severity": "critical|high|medium|low"
}
```

### Scan Object
```json
{
  "scanId": "uuid",
  "url": "https://example.com",
  "startTime": "ISO 8601 timestamp",
  "status": "scanning|completed|error",
  "bugs": [...],
  "testCases": [...],
  "consoleLogs": [...],
  "networkIssues": [...]
}
```

---

## 🔄 Workflow Example

### Complete Scan & Export Workflow

```bash
# 1. Start a scan
curl -X POST http://localhost:5000/api/testforge/scan \
  -H "Content-Type: application/json" \
  -d '{"url":"https://example.com"}'

# Response: scanId = "550e8400-e29b-41d4-a716-446655440000"

# 2. Wait for scan to complete (poll every 2 seconds)
curl http://localhost:5000/api/testforge/scan/550e8400-e29b-41d4-a716-446655440000

# 3. Export results as CSV
curl -O http://localhost:5000/api/testforge/export/bugs-csv/550e8400-e29b-41d4-a716-446655440000

# 4. Export as HTML report
curl -O http://localhost:5000/api/testforge/export/html-report/550e8400-e29b-41d4-a716-446655440000

# 5. Delete scan (optional cleanup)
curl -X DELETE http://localhost:5000/api/testforge/scan/550e8400-e29b-41d4-a716-446655440000
```

---

## ⚙️ Error Handling

### Common Error Responses

**Invalid URL:**
```json
{
  "success": false,
  "error": "Invalid URL format"
}
```

**Scan Not Found:**
```json
{
  "success": false,
  "error": "Scan not found"
}
```

**Server Error:**
```json
{
  "success": false,
  "error": "Internal server error",
  "message": "Detailed error message"
}
```

**Endpoint Not Found:**
```json
{
  "success": false,
  "error": "Endpoint not found",
  "path": "/api/invalid/endpoint"
}
```

---

## 🔐 Best Practices

1. **Implement Rate Limiting** - Limit requests per IP/user
2. **Add Authentication** - Use JWT or API keys for production
3. **Input Validation** - Always validate URLs before scanning
4. **Error Handling** - Implement proper error handling on client
5. **Logging** - Log all API requests for debugging
6. **CORS** - Configure CORS for production use
7. **Caching** - Consider caching scan results
8. **Cleanup** - Periodically delete old scans

---

## 📝 Rate Limiting (Recommended)

```javascript
// Suggest implementing in production
const rateLimit = require('express-rate-limit');

const scanLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many scans from this IP'
});

app.post('/api/testforge/scan', scanLimiter, ...)
```

---

## 📞 Support

For API issues or questions:
1. Check error responses for details
2. Review backend logs
3. Visit GitHub Issues
4. Contact support team

---

**API Version:** 2.0.0  
**Last Updated:** 2024-01-15  
**Status:** Production Ready ✅

Forge Quality. Automate Confidence. 🚀
