import React, { useState, useEffect } from 'react';
import './TestForgeQAAssistant.css';

/**
 * Smart QA Assistant Component
 * Helps QA engineers generate test cases, find bugs, and recommend tests
 */
const TestForgeQAAssistant = () => {
  const [activeTab, setActiveTab] = useState('generate');
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState('');
  const [selectedFeature, setSelectedFeature] = useState('auth');
  const [complexity, setComplexity] = useState('medium');
  const [selectedArea, setSelectedArea] = useState('login');
  const [changedFiles, setChangedFiles] = useState('');
  const [supportedFeatures, setSupportedFeatures] = useState([]);

  const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

  const fetchSupportedFeatures = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/qa/supported-features`);
      const data = await response.json();
      if (data.success) {
        setSupportedFeatures(data.data.features);
      }
    } catch (error) {
      console.error('Error fetching supported features:', error);
    }
  };

  // Fetch supported features on component mount
  useEffect(() => {
    fetchSupportedFeatures();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleGenerateTestCases = async () => {
    setLoading(true);
    setError('');
    setResults(null);

    try {
      const response = await fetch(`${API_BASE_URL}/qa/generate-test-cases`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          feature: selectedFeature,
          options: { complexity }
        })
      });

      const data = await response.json();

      if (data.success) {
        setResults({
          type: 'test-cases',
          data: data.data
        });
      } else {
        setError(data.error || 'Failed to generate test cases');
      }
    } catch (error) {
      setError('Error: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleIdentifyBugs = async () => {
    setLoading(true);
    setError('');
    setResults(null);

    try {
      const response = await fetch(`${API_BASE_URL}/qa/identify-bugs`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          area: selectedArea,
          codeSnippets: []
        })
      });

      const data = await response.json();

      if (data.success) {
        setResults({
          type: 'bugs',
          data: data.data
        });
      } else {
        setError(data.error || 'Failed to identify bugs');
      }
    } catch (error) {
      setError('Error: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRecommendTests = async () => {
    if (!changedFiles.trim()) {
      setError('Please enter at least one changed file');
      return;
    }

    setLoading(true);
    setError('');
    setResults(null);

    try {
      const files = changedFiles.split('\n').filter(f => f.trim());
      const response = await fetch(`${API_BASE_URL}/qa/recommend-tests`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          changedFiles: files,
          testCategories: []
        })
      });

      const data = await response.json();

      if (data.success) {
        setResults({
          type: 'recommendations',
          data: data.data
        });
      } else {
        setError(data.error || 'Failed to generate recommendations');
      }
    } catch (error) {
      setError('Error: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleNaturalLanguageQuery = async () => {
    if (!query.trim()) {
      setError('Please enter a query');
      return;
    }

    setLoading(true);
    setError('');
    setResults(null);

    try {
      const response = await fetch(`${API_BASE_URL}/qa/query`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ query })
      });

      const data = await response.json();

      if (data.success) {
        setResults({
          type: 'query-response',
          data
        });
      } else {
        setError(data.error || 'Failed to process query');
      }
    } catch (error) {
      setError('Error: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const exportToJSON = () => {
    if (results) {
      const element = document.createElement('a');
      const file = new Blob([JSON.stringify(results, null, 2)], {type: 'application/json'});
      element.href = URL.createObjectURL(file);
      element.download = `qa-assistant-${Date.now()}.json`;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }
  };

  const exportToCSV = () => {
    if (results && results.type === 'test-cases') {
      const testCases = results.data.testCases;
      let csv = 'Test Case ID,Title,Description,Category,Test Type,Priority,Steps,Expected Result\n';
      
      testCases.forEach(tc => {
        csv += `"${tc.testCaseId}","${tc.title}","${tc.description}","${tc.category}","${tc.testType}","${tc.priority}","${tc.steps.join('; ')}","${tc.expectedResult}"\n`;
      });

      const element = document.createElement('a');
      const file = new Blob([csv], {type: 'text/csv'});
      element.href = URL.createObjectURL(file);
      element.download = `test-cases-${Date.now()}.csv`;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }
  };

  return (
    <div className="testforge-qa-assistant">
      <div className="qa-header">
        <h1>🧪 Smart QA Assistant</h1>
        <p className="subtitle">Automated Test Case Generation & Bug Detection</p>
      </div>

      <div className="qa-tabs">
        <button 
          className={`tab-btn ${activeTab === 'generate' ? 'active' : ''}`}
          onClick={() => setActiveTab('generate')}
        >
          Generate Test Cases
        </button>
        <button 
          className={`tab-btn ${activeTab === 'bugs' ? 'active' : ''}`}
          onClick={() => setActiveTab('bugs')}
        >
          Find Bugs
        </button>
        <button 
          className={`tab-btn ${activeTab === 'recommend' ? 'active' : ''}`}
          onClick={() => setActiveTab('recommend')}
        >
          Recommend Tests
        </button>
        <button 
          className={`tab-btn ${activeTab === 'query' ? 'active' : ''}`}
          onClick={() => setActiveTab('query')}
        >
          Ask Assistant
        </button>
      </div>

      <div className="qa-content">
        {/* Generate Test Cases Tab */}
        {activeTab === 'generate' && (
          <div className="qa-tab-content">
            <h2>Generate Test Cases</h2>
            <p>Create comprehensive test cases for any application feature</p>

            <div className="qa-form">
              <div className="form-group">
                <label>Select Feature:</label>
                <select 
                  value={selectedFeature} 
                  onChange={(e) => setSelectedFeature(e.target.value)}
                >
                  {supportedFeatures.map(feature => (
                    <option key={feature.id} value={feature.id}>
                      {feature.name}
                    </option>
                  ))}
                </select>
                <small><em>
                  {supportedFeatures.find(f => f.id === selectedFeature)?.description}
                </em></small>
              </div>

              <div className="form-group">
                <label>Complexity Level:</label>
                <div className="radio-group">
                  <label>
                    <input 
                      type="radio" 
                      name="complexity" 
                      value="low" 
                      checked={complexity === 'low'}
                      onChange={(e) => setComplexity(e.target.value)}
                    />
                    Low (Basic scenarios)
                  </label>
                  <label>
                    <input 
                      type="radio" 
                      name="complexity" 
                      value="medium" 
                      checked={complexity === 'medium'}
                      onChange={(e) => setComplexity(e.target.value)}
                    />
                    Medium (Standard coverage)
                  </label>
                  <label>
                    <input 
                      type="radio" 
                      name="complexity" 
                      value="high" 
                      checked={complexity === 'high'}
                      onChange={(e) => setComplexity(e.target.value)}
                    />
                    High (Comprehensive)
                  </label>
                </div>
              </div>

              <button 
                className="btn btn-primary" 
                onClick={handleGenerateTestCases}
                disabled={loading}
              >
                {loading ? 'Generating...' : 'Generate Test Cases'}
              </button>
            </div>
          </div>
        )}

        {/* Find Bugs Tab */}
        {activeTab === 'bugs' && (
          <div className="qa-tab-content">
            <h2>Find Potential Bugs</h2>
            <p>Identify potential issues and vulnerabilities in your application</p>

            <div className="qa-form">
              <div className="form-group">
                <label>Application Area:</label>
                <select 
                  value={selectedArea} 
                  onChange={(e) => setSelectedArea(e.target.value)}
                >
                  <option value="login">Authentication/Login</option>
                  <option value="dashboard">Dashboard</option>
                  <option value="forms">Forms</option>
                  <option value="api">API</option>
                  <option value="navigation">Navigation</option>
                  <option value="general">General</option>
                </select>
              </div>

              <button 
                className="btn btn-primary" 
                onClick={handleIdentifyBugs}
                disabled={loading}
              >
                {loading ? 'Analyzing...' : 'Analyze for Bugs'}
              </button>
            </div>
          </div>
        )}

        {/* Recommend Tests Tab */}
        {activeTab === 'recommend' && (
          <div className="qa-tab-content">
            <h2>Recommend Tests</h2>
            <p>Get test recommendations based on your code changes</p>

            <div className="qa-form">
              <div className="form-group">
                <label>Changed Files (one per line):</label>
                <textarea 
                  value={changedFiles}
                  onChange={(e) => setChangedFiles(e.target.value)}
                  placeholder="src/components/LoginForm.js&#10;src/utils/authentication.js&#10;src/styles/login.css"
                  rows="6"
                />
                <small><em>Enter file paths of changed files in your last commit</em></small>
              </div>

              <button 
                className="btn btn-primary" 
                onClick={handleRecommendTests}
                disabled={loading}
              >
                {loading ? 'Analyzing Changes...' : 'Recommend Tests'}
              </button>
            </div>
          </div>
        )}

        {/* Natural Language Query Tab */}
        {activeTab === 'query' && (
          <div className="qa-tab-content">
            <h2>Ask the QA Assistant</h2>
            <p>Use natural language to ask questions about testing</p>

            <div className="qa-form">
              <div className="form-group">
                <label>Your Query:</label>
                <input 
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="e.g., 'Generate test cases for login' or 'Find bugs in dashboard'"
                  onKeyPress={(e) => e.key === 'Enter' && handleNaturalLanguageQuery()}
                />
                <small><em>
                  Examples: "Generate test cases for login", "Find bugs in dashboard", 
                  "Which tests should I run after changing the form validation?"
                </em></small>
              </div>

              <button 
                className="btn btn-primary" 
                onClick={handleNaturalLanguageQuery}
                disabled={loading}
              >
                {loading ? 'Processing...' : 'Ask Assistant'}
              </button>
            </div>
          </div>
        )}

        {/* Error Display */}
        {error && (
          <div className="qa-error">
            <strong>⚠️ Error:</strong> {error}
            <button className="close-btn" onClick={() => setError('')}>✕</button>
          </div>
        )}

        {/* Results Display */}
        {results && (
          <div className="qa-results">
            {results.type === 'test-cases' && (
              <div>
                <h3>📋 Generated Test Cases</h3>
                <div className="results-summary">
                  <div className="summary-card">
                    <strong>{results.data.totalTestCases}</strong>
                    <span>Test Cases</span>
                  </div>
                  <div className="summary-card">
                    <strong>{results.data.executionPlan.smokeTests.length}</strong>
                    <span>Smoke Tests</span>
                  </div>
                  <div className="summary-card">
                    <strong>{results.data.executionPlan.estimatedDuration}</strong>
                    <span>Est. Duration</span>
                  </div>
                </div>

                <div className="export-buttons">
                  <button className="btn btn-secondary" onClick={exportToJSON}>
                    📥 Export as JSON
                  </button>
                  <button className="btn btn-secondary" onClick={exportToCSV}>
                    📥 Export as CSV
                  </button>
                </div>

                <div className="test-cases-table">
                  {results.data.testCases.map((tc, idx) => (
                    <div key={idx} className="test-case-card">
                      <div className="tc-header">
                        <span className="tc-id">{tc.testCaseId}</span>
                        <span className={`tc-priority priority-${tc.priority.toLowerCase()}`}>
                          {tc.priority}
                        </span>
                        <span className={`tc-type type-${tc.testType.toLowerCase()}`}>
                          {tc.testType}
                        </span>
                      </div>
                      <h4>{tc.title}</h4>
                      <p className="tc-description">{tc.description}</p>
                      <div className="tc-details">
                        <strong>Preconditions:</strong>
                        <ul>
                          {tc.preconditions.map((pre, i) => (
                            <li key={i}>{pre}</li>
                          ))}
                        </ul>
                        <strong>Steps:</strong>
                        <ol>
                          {tc.steps.map((step, i) => (
                            <li key={i}>{step}</li>
                          ))}
                        </ol>
                        <strong>Expected Result:</strong>
                        <p>{tc.expectedResult}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {results.type === 'bugs' && (
              <div>
                <h3>🐛 Identified Issues</h3>
                <div className="results-summary">
                  <div className="summary-card">
                    <strong>{results.data.totalBugsFound}</strong>
                    <span>Total Issues</span>
                  </div>
                  <div className="summary-card">
                    <strong>{results.data.criticlBugs}</strong>
                    <span>Critical</span>
                  </div>
                  <div className="summary-card">
                    <strong>{results.data.highBugs}</strong>
                    <span>High</span>
                  </div>
                  <div className="summary-card">
                    <strong>{results.data.mediumBugs}</strong>
                    <span>Medium</span>
                  </div>
                </div>

                <div className="bugs-list">
                  {results.data.bugs.map((bug, idx) => (
                    <div key={idx} className={`bug-card severity-${bug.severity.toLowerCase()}`}>
                      <div className="bug-header">
                        <span className="bug-id">{bug.bugId}</span>
                        <span className={`bug-severity severity-${bug.severity.toLowerCase()}`}>
                          {bug.severity}
                        </span>
                      </div>
                      <h4>{bug.title}</h4>
                      <p><strong>Type:</strong> {bug.type}</p>
                      <p><strong>Description:</strong> {bug.description}</p>
                      <p><strong>Suggestion:</strong> {bug.suggestion}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {results.type === 'recommendations' && (
              <div>
                <h3>✅ Test Recommendations</h3>
                <div className="results-summary">
                  <div className="summary-card">
                    <strong>{results.data.analysis.totalChangedFiles}</strong>
                    <span>Changed Files</span>
                  </div>
                  <div className="summary-card">
                    <strong>{results.data.analysis.recommendedTests.length}</strong>
                    <span>Tests Recommended</span>
                  </div>
                  <div className="summary-card">
                    <strong>{results.data.analysis.priority}</strong>
                    <span>Priority Level</span>
                  </div>
                </div>

                <div className="recommendations">
                  <h4>Reasoning:</h4>
                  <ul>
                    {results.data.reasoning.map((reason, idx) => (
                      <li key={idx}>{reason}</li>
                    ))}
                  </ul>

                  <h4>Recommended Tests:</h4>
                  <div className="test-recommendations">
                    {results.data.analysis.recommendedTests.map((test, idx) => (
                      <div key={idx} className="test-rec-card">
                        <h5>{test.testName}</h5>
                        <p><strong>Priority:</strong> {test.priority}</p>
                        <p><strong>Duration:</strong> {test.estimatedDuration}</p>
                        <p><strong>Reason:</strong> {test.reason}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {results.type === 'query-response' && (
              <div>
                <h3>AI Assistant Response</h3>
                <div className="query-response">
                  <p><strong>Query:</strong> {results.data.query}</p>
                  <p><strong>Response:</strong> {results.data.response}</p>
                  {results.data.data && (
                    <div className="response-data">
                      <pre>{JSON.stringify(results.data.data, null, 2)}</pre>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TestForgeQAAssistant;
