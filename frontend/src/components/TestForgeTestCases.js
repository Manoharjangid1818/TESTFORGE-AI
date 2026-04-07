import React from 'react';
import './TestForgeTestCases.css';

function TestForgeTestCases({ scan }) {
  if (!scan) {
    return (
      <div className="component-empty">
        <h2>📋 Test Cases</h2>
        <p>No scan selected. Start a new scan to view generated test cases.</p>
      </div>
    );
  }

  const testCases = [
    {
      id: 'TC001',
      title: 'Valid Login Test',
      type: 'Positive',
      description: 'Test successful login with valid credentials',
      priority: 'Critical'
    },
    {
      id: 'TC002',
      title: 'Empty Password Field',
      type: 'Negative',
      description: 'Test form validation when password is empty',
      priority: 'High'
    },
    {
      id: 'TC003',
      title: 'SQL Injection Test',
      type: 'Edge Case',
      description: 'Test security against SQL injection attacks',
      priority: 'Critical'
    }
  ];

  return (
    <div className="test-cases-container">
      <div className="component-header">
        <h2>📋 Generated Test Cases</h2>
        <p>URL: {scan.url}</p>
      </div>

      <div className="test-cases-grid">
        {testCases.map((testCase) => (
          <div key={testCase.id} className={`test-case-card type-${testCase.type.toLowerCase()}`}>
            <div className="card-header">
              <h3>{testCase.title}</h3>
              <span className={`type-badge ${testCase.type.toLowerCase()}`}>
                {testCase.type}
              </span>
            </div>
            <p className="card-description">{testCase.description}</p>
            <div className="card-footer">
              <span className="case-id">{testCase.id}</span>
              <span className={`priority-badge ${testCase.priority.toLowerCase()}`}>
                {testCase.priority}
              </span>
            </div>
          </div>
        ))}
      </div>

      {testCases.length === 0 && (
        <div className="no-data">
          <p>No test cases generated yet.</p>
        </div>
      )}
    </div>
  );
}

export default TestForgeTestCases;
