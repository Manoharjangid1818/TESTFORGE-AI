import React from 'react';
import './TestForgeBugReport.css';

function TestForgeBugReport({ scan }) {
  if (!scan) {
    return (
      <div className="component-empty">
        <h2>🐛 Bug Report</h2>
        <p>No scan selected. Start a new scan to view bug reports.</p>
      </div>
    );
  }

  const bugs = [
    {
      id: 'BUG001',
      title: 'Page Load Performance Issue',
      module: 'Performance',
      priority: 'High',
      severity: 'high',
      description: 'Page takes longer than 3 seconds to load'
    },
    {
      id: 'BUG002',
      title: 'Broken Navigation Link',
      module: 'Navigation',
      priority: 'Critical',
      severity: 'critical',
      description: '/contact page returns 404 error'
    }
  ];

  return (
    <div className="bug-report-container">
      <div className="component-header">
        <h2>🐛 Bug Report</h2>
        <p>URL: {scan.url}</p>
      </div>

      <div className="bugs-table">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Module</th>
              <th>Priority</th>
              <th>Severity</th>
            </tr>
          </thead>
          <tbody>
            {bugs.map((bug) => (
              <tr key={bug.id} className={`severity-${bug.severity}`}>
                <td>{bug.id}</td>
                <td>{bug.title}</td>
                <td>{bug.module}</td>
                <td>
                  <span className={`priority-badge ${bug.priority.toLowerCase()}`}>
                    {bug.priority}
                  </span>
                </td>
                <td>{bug.severity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {bugs.length === 0 && (
        <div className="no-data">
          <p>✓ No bugs found! Your website passed all QA checks.</p>
        </div>
      )}
    </div>
  );
}

export default TestForgeBugReport;
