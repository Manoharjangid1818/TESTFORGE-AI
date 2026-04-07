import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import TestForgeQAScanner from '../utils/testforgeScanner.js';
import TestForgeTestCaseGenerator from '../utils/testCaseGenerator.js';
import TestForgeExportService from '../utils/exportService.js';
import SmartQAAssistant from '../utils/qaAssistant.js';

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

/**
 * ==================== SMART QA ASSISTANT ENDPOINTS ====================
 */

/**
 * POST /api/qa/generate-test-cases
 * Generate test cases for a given feature
 */
router.post('/qa/generate-test-cases', (req, res) => {
  try {
    const { feature, options = {} } = req.body;

    if (!feature) {
      return res.status(400).json({
        success: false,
        error: 'Feature name is required'
      });
    }

    const testCases = SmartQAAssistant.generateTestCases(feature, options);
    const executionPlan = SmartQAAssistant.generateExecutionPlan(testCases, options);

    res.json({
      success: true,
      message: `Generated ${testCases.length} test cases for ${feature}`,
      data: {
        feature,
        totalTestCases: testCases.length,
        testCases,
        executionPlan
      }
    });
  } catch (error) {
    console.error('TestForge: QA Assistant error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * POST /api/qa/identify-bugs
 * Identify potential bugs in an area of the application
 */
router.post('/qa/identify-bugs', (req, res) => {
  try {
    const { area, codeSnippets = [] } = req.body;

    if (!area) {
      return res.status(400).json({
        success: false,
        error: 'Application area is required'
      });
    }

    const bugs = SmartQAAssistant.identifyPotentialBugs(area, codeSnippets);

    res.json({
      success: true,
      message: `Identified ${bugs.length} potential issues in ${area}`,
      data: {
        area,
        totalBugsFound: bugs.length,
        criticlBugs: bugs.filter(b => b.severity === 'Critical').length,
        highBugs: bugs.filter(b => b.severity === 'High').length,
        mediumBugs: bugs.filter(b => b.severity === 'Medium').length,
        bugs
      }
    });
  } catch (error) {
    console.error('TestForge: QA Assistant error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * POST /api/qa/recommend-tests
 * Recommend which tests to run based on changed files
 */
router.post('/qa/recommend-tests', (req, res) => {
  try {
    const { changedFiles = [], testCategories = [] } = req.body;

    if (changedFiles.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'At least one changed file is required'
      });
    }

    const recommendations = SmartQAAssistant.recommendTestsForChanges(changedFiles, testCategories);

    res.json({
      success: true,
      message: `Generated test recommendations for ${changedFiles.length} changed files`,
      data: recommendations
    });
  } catch (error) {
    console.error('TestForge: QA Assistant error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * GET /api/qa/supported-features
 * Get list of supported test case generation features
 */
router.get('/qa/supported-features', (req, res) => {
  try {
    const supportedFeatures = [
      {
        name: 'Authentication/Login',
        id: 'auth',
        description: 'Generate test cases for login and authentication flows'
      },
      {
        name: 'Forms & Input Validation',
        id: 'form',
        description: 'Generate test cases for form submission and field validation'
      },
      {
        name: 'Dashboard & UI',
        id: 'dashboard',
        description: 'Generate test cases for dashboard page layout and interactions'
      },
      {
        name: 'Navigation',
        id: 'navigation',
        description: 'Generate test cases for menu and navigation flows'
      },
      {
        name: 'Search & Filters',
        id: 'search',
        description: 'Generate test cases for search and filter functionality'
      },
      {
        name: 'File Upload',
        id: 'upload',
        description: 'Generate test cases for file upload and handling'
      },
      {
        name: 'API Integration',
        id: 'api',
        description: 'Generate test cases for API endpoints and integration'
      },
      {
        name: 'Responsive Design',
        id: 'responsive',
        description: 'Generate test cases for responsive layout on different devices'
      }
    ];

    res.json({
      success: true,
      message: 'Retrieved supported test case features',
      data: {
        totalFeatures: supportedFeatures.length,
        features: supportedFeatures
      }
    });
  } catch (error) {
    console.error('TestForge: QA Assistant error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * POST /api/qa/generate-execution-plan
 * Generate test execution plan based on test cases
 */
router.post('/qa/generate-execution-plan', (req, res) => {
  try {
    const { testCases = [], options = {} } = req.body;

    if (testCases.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Test cases array is required'
      });
    }

    const executionPlan = SmartQAAssistant.generateExecutionPlan(testCases, options);

    res.json({
      success: true,
      message: 'Generated test execution plan',
      data: executionPlan
    });
  } catch (error) {
    console.error('TestForge: QA Assistant error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * POST /api/qa/query
 * Natural language query handler for QA assistant
 */
router.post('/qa/query', (req, res) => {
  try {
    const { query } = req.body;

    if (!query) {
      return res.status(400).json({
        success: false,
        error: 'Query is required'
      });
    }

    const queryLower = query.toLowerCase();
    let response = {
      success: true,
      query,
      response: 'Query processed'
    };

    // Parse natural language queries
    if (queryLower.includes('generate test') || queryLower.includes('create test')) {
      const featureMatch = query.match(/(?:for|on)\s+(\w+)/i);
      const feature = featureMatch ? featureMatch[1] : 'general';
      const testCases = SmartQAAssistant.generateTestCases(feature);
      response.action = 'generate_test_cases';
      response.data = { feature, testCases, totalGenerated: testCases.length };
    } else if (queryLower.includes('find bug') || queryLower.includes('identify bug')) {
      const areaMatch = query.match(/(?:in|on)\s+(\w+)/i);
      const area = areaMatch ? areaMatch[1] : 'general';
      const bugs = SmartQAAssistant.identifyPotentialBugs(area);
      response.action = 'identify_bugs';
      response.data = { area, bugs, totalFound: bugs.length };
    } else if (queryLower.includes('which test') || queryLower.includes('recommend test')) {
      response.action = 'recommend_tests';
      response.message = 'Please provide list of changed files for test recommendations';
    } else {
      response.message = 'I can help you with: "Generate test cases for [feature]", "Find bugs in [area]", or "Recommend tests after changes"';
    }

    res.json(response);
  } catch (error) {
    console.error('TestForge: QA Assistant error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * ==================== QA MENTOR ENDPOINTS ====================
 */

/**
 * POST /api/qa/mentor/teach
 * Generate test cases WITH educational explanations for junior QA engineers
 */
router.post('/qa/mentor/teach', (req, res) => {
  try {
    const { feature, options = {} } = req.body;

    if (!feature) {
      return res.status(400).json({
        success: false,
        error: 'Feature name is required'
      });
    }

    const mentorContent = SmartQAAssistant.generateTeachingTestCases(feature, options);

    res.json({
      success: true,
      message: `Generated ${mentorContent.testCases.length} test cases with educational explanations for ${feature}`,
      data: mentorContent
    });
  } catch (error) {
    console.error('TestForge: QA Mentor error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * GET /api/qa/mentor/concepts
 * Get testing concepts and best practices
 */
router.get('/qa/mentor/concepts', (req, res) => {
  try {
    const concepts = {
      testTypes: {
        'Positive Testing': 'Testing with valid inputs to verify correct behavior',
        'Negative Testing': 'Testing with invalid inputs to verify error handling',
        'Edge Case Testing': 'Testing boundary conditions and extreme values',
        'Security Testing': 'Testing for vulnerabilities and malicious inputs',
        'Performance Testing': 'Testing response times and resource usage'
      },
      testingTechniques: {
        'Equivalence Partitioning': 'Divide inputs into groups that behave similarly',
        'Boundary Value Analysis': 'Test at the edges of valid ranges',
        'State Transition Testing': 'Test transitions between different states',
        'Error Guessing': 'Use experience to predict likely bugs',
        'Decision Table Testing': 'Test combinations of inputs and conditions'
      },
      bestPractices: [
        'Write clear, descriptive test case names',
        'Test one behavior per test case',
        'Make test steps specific and reproducible',
        'Always verify expected results',
        'Test happy path, edge cases, and error cases',
        'Test on multiple browsers and devices',
        'Automate repetitive test cases',
        'Keep test cases maintainable and organized'
      ]
    };

    res.json({
      success: true,
      message: 'Retrieved QA testing concepts',
      data: concepts
    });
  } catch (error) {
    console.error('TestForge: QA Mentor error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * GET /api/qa/mentor/guide/:feature
 * Get detailed testing guide for a specific feature
 */
router.get('/qa/mentor/guide/:feature', (req, res) => {
  try {
    const { feature } = req.params;

    if (!feature) {
      return res.status(400).json({
        success: false,
        error: 'Feature name is required'
      });
    }

    const overview = SmartQAAssistant.getFeatureOverview(feature);
    const strategy = SmartQAAssistant.getTestingStrategy(feature);
    const edgeCases = SmartQAAssistant.suggestEdgeCases(feature);
    const negativeCases = SmartQAAssistant.suggestNegativeCases(feature);
    const mistakes = SmartQAAssistant.getCommonMistakes(feature);
    const resources = SmartQAAssistant.getLearningResources(feature);

    res.json({
      success: true,
      message: `Generated detailed testing guide for ${feature}`,
      data: {
        feature,
        overview,
        testingStrategy: strategy,
        edgeCases,
        negativeCases,
        commonMistakes: mistakes,
        learningResources: resources
      }
    });
  } catch (error) {
    console.error('TestForge: QA Mentor error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * POST /api/qa/mentor/coverage-analysis
 * Analyze test coverage and suggest improvements
 */
router.post('/api/qa/mentor/coverage-analysis', (req, res) => {
  try {
    const { feature, existingTestCount = 0 } = req.body;

    if (!feature) {
      return res.status(400).json({
        success: false,
        error: 'Feature name is required'
      });
    }

    const allTestCases = SmartQAAssistant.generateTestCases(feature, { complexity: 'high' });
    const gaps = SmartQAAssistant.identifyCoverageGaps(feature, allTestCases);
    const recommendations = SmartQAAssistant.getBestPractices(feature);

    const analysis = {
      feature,
      totalSuggestedTests: allTestCases.length,
      currentTestCount: existingTestCount,
      coveragePercentage: existingTestCount > 0 
        ? Math.round((existingTestCount / allTestCases.length) * 100) 
        : 0,
      gaps,
      recommendations,
      improvementSuggestions: [
        existingTestCount === 0 
          ? `Start with ${Math.ceil(allTestCases.length / 3)} core test cases covering happy path, validation, and error cases`
          : `Add ${Math.max(1, allTestCases.length - existingTestCount)} more tests to improve coverage`,
        gaps.length > 0 ? `Focus on missing areas: ${gaps.slice(0, 3).join(', ')}` : 'Coverage looks good!',
        'Prioritize security and edge case testing',
        'Automate repetitive test cases'
      ]
    };

    res.json({
      success: true,
      message: 'Analyzed test coverage',
      data: analysis
    });
  } catch (error) {
    console.error('TestForge: QA Mentor error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

export default router;
