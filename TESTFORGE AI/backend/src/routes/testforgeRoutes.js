import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import TestForgeQAScanner from '../utils/testforgeScanner.js';
import TestForgeTestCaseGenerator from '../utils/testCaseGenerator.js';
import TestForgeExportService from '../utils/exportService.js';

const router = express.Router();

// In-memory storage for scan results
const scanResults = new Map();

/**
 * POST /api/testforge/scan
 * Execute automated QA scan on provided URL
 */
router.post('/scan', async (req, res) => {
  try {
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({
        success: false,
        error: 'URL is required'
      });
    }

    // Validate URL format
    try {
      new URL(url);
    } catch (error) {
      return res.status(400).json({
        success: false,
        error: 'Invalid URL format'
      });
    }

    const scanId = uuidv4();
    const scanner = new TestForgeQAScanner();

    res.json({
      success: true,
      message: 'Scan started - TESTFORGE AI is analyzing your website',
      scanId: scanId
    });

    // Run scan asynchronously
    (async () => {
      try {
        await scanner.initialize();
        const scanResult = await scanner.scanURL(url);

        // Generate test cases based on detected elements
        const testCases = TestForgeTestCaseGenerator.generateFromElements([]);

        scanResults.set(scanId, {
          scanId,
          url,
          startTime: new Date(),
          status: 'completed',
          bugs: scanResult.bugs || [],
          testCases: testCases,
          consoleLogs: scanResult.consoleLogs || [],
          networkIssues: scanResult.networkIssues || []
        });

        console.log(`TestForge: Scan ${scanId} completed. Found ${scanResult.bugs.length} issues.`);
      } catch (error) {
        console.error('TestForge: Scan error:', error);
        scanResults.set(scanId, {
          scanId,
          url,
          startTime: new Date(),
          status: 'error',
          error: error.message,
          bugs: [],
          testCases: []
        });
      } finally {
        await scanner.close();
      }
    })();
  } catch (error) {
    console.error('TestForge: Route error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * GET /api/testforge/scan/:scanId
 * Retrieve scan results by ID
 */
router.get('/scan/:scanId', (req, res) => {
  try {
    const { scanId } = req.params;
    const result = scanResults.get(scanId);

    if (!result) {
      return res.status(404).json({
        success: false,
        error: 'Scan not found'
      });
    }

    res.json({
      success: true,
      data: result
    });
  } catch (error) {
    console.error('TestForge: Route error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * GET /api/testforge/scans
 * List all scans
 */
router.get('/scans', (req, res) => {
  try {
    const scans = Array.from(scanResults.values()).map(scan => ({
      scanId: scan.scanId,
      url: scan.url,
      startTime: scan.startTime,
      status: scan.status,
      bugCount: scan.bugs.length,
      testCaseCount: scan.testCases.length
    }));

    res.json({
      success: true,
      data: scans,
      total: scans.length
    });
  } catch (error) {
    console.error('TestForge: Route error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * GET /api/testforge/export/bugs-csv/:scanId
 * Export bugs as CSV
 */
router.get('/export/bugs-csv/:scanId', async (req, res) => {
  try {
    const { scanId } = req.params;
    const result = scanResults.get(scanId);

    if (!result) {
      return res.status(404).json({
        success: false,
        error: 'Scan not found'
      });
    }

    const filename = `testforge-bugs-${scanId}.csv`;
    await TestForgeExportService.exportBugReportToCSV(result.bugs, filename);

    res.download(filename, 'testforge-bug-report.csv', (err) => {
      if (err) console.error('Download error:', err);
    });
  } catch (error) {
    console.error('TestForge: Export error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * GET /api/testforge/export/test-cases-csv/:scanId
 * Export test cases as CSV
 */
router.get('/export/test-cases-csv/:scanId', async (req, res) => {
  try {
    const { scanId } = req.params;
    const result = scanResults.get(scanId);

    if (!result) {
      return res.status(404).json({
        success: false,
        error: 'Scan not found'
      });
    }

    const filename = `testforge-test-cases-${scanId}.csv`;
    await TestForgeExportService.exportTestCasesToCSV(result.testCases, filename);

    res.download(filename, 'testforge-test-cases.csv', (err) => {
      if (err) console.error('Download error:', err);
    });
  } catch (error) {
    console.error('TestForge: Export error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * GET /api/testforge/export/html-report/:scanId
 * Export comprehensive HTML report
 */
router.get('/export/html-report/:scanId', async (req, res) => {
  try {
    const { scanId } = req.params;
    const result = scanResults.get(scanId);

    if (!result) {
      return res.status(404).json({
        success: false,
        error: 'Scan not found'
      });
    }

    const filename = `testforge-report-${scanId}.html`;
    await TestForgeExportService.generateHTMLReport(result.bugs, result.testCases, filename);

    res.download(filename, 'testforge-qa-report.html', (err) => {
      if (err) console.error('Download error:', err);
    });
  } catch (error) {
    console.error('TestForge: Export error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * DELETE /api/testforge/scan/:scanId
 * Delete a scan result
 */
router.delete('/scan/:scanId', (req, res) => {
  try {
    const { scanId } = req.params;
    
    if (scanResults.has(scanId)) {
      scanResults.delete(scanId);
      res.json({
        success: true,
        message: 'Scan deleted successfully'
      });
    } else {
      res.status(404).json({
        success: false,
        error: 'Scan not found'
      });
    }
  } catch (error) {
    console.error('TestForge: Route error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

export default router;
