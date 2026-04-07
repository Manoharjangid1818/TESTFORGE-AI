import React from 'react';
import './TestForgeExecutionLogs.css';

function TestForgeExecutionLogs({ scan }) {
  if (!scan) {
    return (
      <div className="component-empty">
        <h2>📝 Execution Logs</h2>
        <p>No scan selected. Start a new scan to view execution logs.</p>
      </div>
    );
  }

  const logs = [
    { timestamp: '2024-01-15 10:30:45', level: 'info', message: 'TestForge scan started for URL' },
    { timestamp: '2024-01-15 10:30:46', level: 'info', message: 'Initializing Playwright browser' },
    { timestamp: '2024-01-15 10:30:48', level: 'info', message: 'Navigating to target URL' },
    { timestamp: '2024-01-15 10:30:50', level: 'info', message: 'Performing page load check' },
    { timestamp: '2024-01-15 10:30:51', level: 'info', message: 'Checking for broken links' },
    { timestamp: '2024-01-15 10:30:52', level: 'warning', message: 'Found external link with 301 redirect' },
    { timestamp: '2024-01-15 10:30:53', level: 'info', message: 'Scanning forms for validation' },
    { timestamp: '2024-01-15 10:30:54', level: 'info', message: 'Checking console for errors' },
    { timestamp: '2024-01-15 10:30:55', level: 'info', message: 'Testing accessibility compliance' },
    { timestamp: '2024-01-15 10:30:56', level: 'info', message: 'Scan completed successfully' }
  ];

  return (
    <div className="execution-logs-container">
      <div className="component-header">
        <h2>📝 Execution Logs</h2>
        <p>URL: {scan.url}</p>
      </div>

      <div className="logs-viewer">
        {logs.map((log, index) => (
          <div key={index} className={`log-entry level-${log.level}`}>
            <span className="log-timestamp">{log.timestamp}</span>
            <span className={`log-level ${log.level}`}>[{log.level.toUpperCase()}]</span>
            <span className="log-message">{log.message}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TestForgeExecutionLogs;
