import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import testforgeRoutes from './routes/testforgeRoutes.js';

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const PORT = process.env.TESTFORGE_PORT || 5000;
const HOST = process.env.TESTFORGE_HOST || 'localhost';
const VERSION = process.env.TESTFORGE_VERSION || '2.0.0';

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging
app.use((req, res, next) => {
  console.log(`[TestForge] ${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    application: 'TESTFORGE AI',
    version: VERSION,
    timestamp: new Date().toISOString()
  });
});

// Version endpoint
app.get('/api/version', (req, res) => {
  res.json({
    app: 'TESTFORGE AI',
    version: VERSION,
    description: 'Automated QA Testing, Bug Detection & Test Case Generation',
    tagline: 'Forge Quality. Automate Confidence.'
  });
});

// API status endpoint
app.get('/api/status', (req, res) => {
  res.json({
    success: true,
    message: 'TestForge AI Backend is running',
    status: 'online',
    endpoints: {
      '/api/testforge/scan': 'POST - Start QA scan',
      '/api/testforge/scan/:scanId': 'GET - Get scan results',
      '/api/testforge/scans': 'GET - List all scans',
      '/api/testforge/export/bugs-csv/:scanId': 'GET - Export bugs as CSV',
      '/api/testforge/export/test-cases-csv/:scanId': 'GET - Export test cases as CSV',
      '/api/testforge/export/html-report/:scanId': 'GET - Export HTML report',
      '/api/testforge/scan/:scanId': 'DELETE - Delete scan'
    }
  });
});

// Mount TestForge API routes
app.use('/api/testforge', testforgeRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('[TestForge] Error:', err);
  res.status(500).json({
    success: false,
    error: 'Internal server error',
    message: err.message
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint not found',
    path: req.path
  });
});

// Start server
app.listen(PORT, HOST, () => {
  console.log('\n╔════════════════════════════════════════════════════════╗');
  console.log('║                                                        ║');
  console.log('║     🚀 TESTFORGE AI - Backend Server Started 🚀        ║');
  console.log('║                                                        ║');
  console.log('║  Version: ' + VERSION.padEnd(36) + '║');
  console.log('║  Host: ' + `http://${HOST}:${PORT}`.padEnd(39) + '║');
  console.log('║  Tagline: Forge Quality. Automate Confidence.           ║');
  console.log('║                                                        ║');
  console.log('║  Features:                                             ║');
  console.log('║  ✓ Automated QA Scanning                               ║');
  console.log('║  ✓ Bug Detection (6 QA Checks)                         ║');
  console.log('║  ✓ Test Case Generation                                ║');
  console.log('║  ✓ CSV/HTML Report Export                              ║');
  console.log('║  ✓ RESTful API (7 Endpoints)                           ║');
  console.log('║                                                        ║');
  console.log('║  API Base URL: /api/testforge/                         ║');
  console.log('║  Documentation: POST /api/status                       ║');
  console.log('║                                                        ║');
  console.log('╚════════════════════════════════════════════════════════╝\n');
});

export default app;
