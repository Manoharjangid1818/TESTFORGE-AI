import React from 'react';
import './TestForgeScanHistory.css';

function TestForgeScanHistory({ scans, onSelectScan }) {
  if (!scans || scans.length === 0) {
    return (
      <div className="component-empty">
        <h2>⏱️ Scan History</h2>
        <p>No scans yet. Start a new scan to build your history.</p>
      </div>
    );
  }

  return (
    <div className="scan-history-container">
      <div className="component-header">
        <h2>⏱️ Scan History</h2>
        <p>Total scans: {scans.length}</p>
      </div>

      <div className="history-table">
        <table>
          <thead>
            <tr>
              <th>Scan ID</th>
              <th>URL</th>
              <th>Start Time</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {scans.map((scan) => (
              <tr key={scan.scanId}>
                <td className="scan-id">{scan.scanId}</td>
                <td className="url">{scan.url}</td>
                <td>{scan.startTime ? new Date(scan.startTime).toLocaleString() : 'N/A'}</td>
                <td>
                  <span className={`status-badge ${scan.status}`}>
                    {scan.status === 'scanning' ? '⏳ Scanning' : '✅ Completed'}
                  </span>
                </td>
                <td>
                  <button
                    className="view-btn"
                    onClick={() => onSelectScan(scan)}
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TestForgeScanHistory;
