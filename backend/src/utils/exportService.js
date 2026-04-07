import { createObjectCsvStringifier } from 'csv-writer';
import * as fs from 'fs';

/**
 * TestForge Export Service
 * Handles exports in multiple formats: CSV, HTML, JSON
 */
class TestForgeExportService {
  static async exportBugReportToCSV(bugs, filename) {
    try {
      const csvStringifier = createObjectCsvStringifier({
        header: [
          { id: 'id', title: 'Bug ID' },
          { id: 'title', title: 'Title' },
          { id: 'module', title: 'Module' },
          { id: 'stepsToReproduce', title: 'Steps to Reproduce' },
          { id: 'expectedResult', title: 'Expected Result' },
          { id: 'actualResult', title: 'Actual Result' },
          { id: 'priority', title: 'Priority' },
          { id: 'timestamp', title: 'Detected At' }
        ]
      });

      const csvString = csvStringifier.stringifyRecords(bugs.map(bug => ({
        ...bug,
        timestamp: new Date(bug.timestamp).toLocaleString()
      })));

      fs.writeFileSync(filename, csvString);
      return filename;
    } catch (error) {
      console.error('TestForge: Error exporting to CSV:', error);
      throw error;
    }
  }

  static async exportTestCasesToCSV(testCases, filename) {
    try {
      const csvStringifier = createObjectCsvStringifier({
        header: [
          { id: 'title', title: 'Test Case ID' },
          { id: 'description', title: 'Description' },
          { id: 'module', title: 'Module' },
          { id: 'testType', title: 'Type' },
          { id: 'preconditions', title: 'Preconditions' },
          { id: 'expectedResult', title: 'Expected Result' },
          { id: 'priority', title: 'Priority' }
        ]
      });

      const formattedTestCases = testCases.map(tc => ({
        ...tc,
        preconditions: tc.preconditions || 'N/A',
        steps: (tc.steps || []).join(' | ')
      }));

      const csvString = csvStringifier.stringifyRecords(formattedTestCases);
      fs.writeFileSync(filename, csvString);
      return filename;
    } catch (error) {
      console.error('TestForge: Error exporting test cases to CSV:', error);
      throw error;
    }
  }

  static async exportToJSON(data, filename) {
    try {
      fs.writeFileSync(filename, JSON.stringify(data, null, 2));
      return filename;
    } catch (error) {
      console.error('TestForge: Error exporting to JSON:', error);
      throw error;
    }
  }

  static async generateHTMLReport(bugs, testCases, filename) {
    try {
      const bugTableHTML = bugs.map(bug => `
        <tr style="border-bottom: 1px solid #ddd;">
          <td style="padding: 10px; color: ${this.getSeverityColor(bug.severity)}">${bug.title}</td>
          <td style="padding: 10px;">${bug.module}</td>
          <td style="padding: 10px;">${bug.stepsToReproduce}</td>
          <td style="padding: 10px;">${bug.priority}</td>
          <td style="padding: 10px; color: ${this.getSeverityColor(bug.severity)}">${bug.severity}</td>
        </tr>
      `).join('');

      const testCaseTableHTML = testCases.map(tc => `
        <tr style="border-bottom: 1px solid #ddd;">
          <td style="padding: 10px;">${tc.title}</td>
          <td style="padding: 10px;">${tc.description}</td>
          <td style="padding: 10px;">${tc.testType}</td>
          <td style="padding: 10px;">${tc.expectedResult}</td>
          <td style="padding: 10px;">${tc.priority}</td>
        </tr>
      `).join('');

      const html = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>TestForge AI - QA Report</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; background-color: #f5f5f5; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 5px; text-align: center; }
            h1 { margin: 0; color: white; }
            .tagline { font-size: 0.9em; opacity: 0.9; margin: 5px 0 0 0; }
            h2 { color: #333; border-bottom: 3px solid #667eea; padding-bottom: 10px; margin-top: 30px; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; background: white; }
            th { background-color: #4CAF50; color: white; padding: 12px; text-align: left; }
            td { padding: 10px; }
            tr:nth-child(even) { background-color: #f2f2f2; }
            .summary { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; margin: 20px 0; }
            .stat-box { background: white; padding: 15px; border-radius: 5px; text-align: center; border-left: 4px solid #667eea; }
            .stat-value { font-size: 2em; font-weight: bold; color: #667eea; }
            .footer { text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; color: #666; font-size: 0.9em; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>🚀 TestForge AI</h1>
            <p class="tagline">Forge Quality. Automate Confidence.</p>
          </div>
          
          <h2>📊 QA Testing Report</h2>
          <p>Generated on: ${new Date().toLocaleString()}</p>
          
          <div class="summary">
            <div class="stat-box">
              <div class="stat-value">${bugs.length}</div>
              <div>Total Bugs</div>
            </div>
            <div class="stat-box">
              <div class="stat-value">${bugs.filter(b => b.priority === 'Critical').length}</div>
              <div>Critical Issues</div>
            </div>
            <div class="stat-box">
              <div class="stat-value">${testCases.length}</div>
              <div>Test Cases</div>
            </div>
            <div class="stat-box">
              <div class="stat-value">${new Date().toLocaleDateString()}</div>
              <div>Scan Date</div>
            </div>
          </div>
          
          <h2>🐛 Bug Report (${bugs.length} issues found)</h2>
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Module</th>
                <th>Steps to Reproduce</th>
                <th>Priority</th>
                <th>Severity</th>
              </tr>
            </thead>
            <tbody>
              ${bugTableHTML}
            </tbody>
          </table>

          <h2>📋 Test Cases (${testCases.length} scenarios generated)</h2>
          <table>
            <thead>
              <tr>
                <th>Test ID</th>
                <th>Description</th>
                <th>Type</th>
                <th>Expected Result</th>
                <th>Priority</th>
              </tr>
            </thead>
            <tbody>
              ${testCaseTableHTML}
            </tbody>
          </table>
          
          <div class="footer">
            <p>© 2024 TestForge AI - Automated Quality Assurance Platform</p>
            <p>Forge Quality. Automate Confidence.</p>
          </div>
        </body>
        </html>
      `;

      fs.writeFileSync(filename, html);
      return filename;
    } catch (error) {
      console.error('TestForge: Error generating HTML report:', error);
      throw error;
    }
  }

  static getSeverityColor(severity) {
    const colors = {
      critical: '#ff0000',
      high: '#ff9800',
      medium: '#ffc107',
      low: '#4CAF50'
    };
    return colors[severity] || '#666';
  }
}

export default TestForgeExportService;
