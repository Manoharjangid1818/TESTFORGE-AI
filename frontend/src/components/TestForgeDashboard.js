import React from 'react';
import { FiDownload, FiRefreshCw } from 'react-icons/fi';
import './TestForgeDashboard.css';

function TestForgeDashboard({ scan }) {
  if (!scan) {
    return (
      <div className="dashboard-empty">
        <div className="empty-state">
          <h2>📊 Welcome to TestForge AI Dashboard</h2>
          <p>No scan in progress. Start a new scan to see results here.</p>
          <div className="demo-stats">
            <div className="stat-card">
              <div className="stat-number">6</div>
              <div className="stat-label">QA Checks</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">∞</div>
              <div className="stat-label">Scans Allowed</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">3</div>
              <div className="stat-label">Export Formats</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>📊 Scan Dashboard</h1>
        <div className="header-actions">
          <button className="action-btn">
            <FiRefreshCw /> Refresh
          </button>
        </div>
      </div>

      <div className="scan-info">
        <h3>Scan Information</h3>
        <div className="info-grid">
          <div className="info-item">
            <label>URL Scanned</label>
            <p>{scan.url}</p>
          </div>
          <div className="info-item">
            <label>Scan ID</label>
            <p className="scan-id">{scan.scanId}</p>
          </div>
          <div className="info-item">
            <label>Start Time</label>
            <p>{scan.startTime ? new Date(scan.startTime).toLocaleString() : 'N/A'}</p>
          </div>
          <div className="info-item">
            <label>Status</label>
            <p className={`status ${scan.status}`}>
              {scan.status === 'scanning' ? '⏳ In Progress' : '✅ Completed'}
            </p>
          </div>
        </div>
      </div>

      <div className="analytics-section">
        <h3>📈 Analysis Results</h3>
        <div className="metrics-grid">
          <div className="metric-card critical">
            <div className="metric-value">0</div>
            <div className="metric-label">Critical Issues</div>
          </div>
          <div className="metric-card high">
            <div className="metric-value">0</div>
            <div className="metric-label">High Priority</div>
          </div>
          <div className="metric-card medium">
            <div className="metric-value">0</div>
            <div className="metric-label">Medium Priority</div>
          </div>
          <div className="metric-card low">
            <div className="metric-value">0</div>
            <div className="metric-label">Low Priority</div>
          </div>
        </div>
      </div>

      <div className="export-section">
        <h3>📥 Export Reports</h3>
        <div className="export-buttons">
          <button className="export-btn csv">
            <FiDownload /> Export as CSV
          </button>
          <button className="export-btn html">
            <FiDownload /> Export as HTML
          </button>
          <button className="export-btn json">
            <FiDownload /> Export as JSON
          </button>
        </div>
      </div>

      <div className="qa-checks">
        <h3>✓ QA Checks Performed</h3>
        <div className="checks-list">
          <div className="check-item">
            <span className="check-icon">✓</span>
            <span>Page Load Testing</span>
          </div>
          <div className="check-item">
            <span className="check-icon">✓</span>
            <span>Broken Links Detection</span>
          </div>
          <div className="check-item">
            <span className="check-icon">✓</span>
            <span>Form Validation</span>
          </div>
          <div className="check-item">
            <span className="check-icon">✓</span>
            <span>Console Error Monitoring</span>
          </div>
          <div className="check-item">
            <span className="check-icon">✓</span>
            <span>Accessibility Compliance</span>
          </div>
          <div className="check-item">
            <span className="check-icon">✓</span>
            <span>Security & Restrictions</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TestForgeDashboard;
