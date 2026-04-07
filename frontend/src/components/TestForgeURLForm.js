import React, { useState } from 'react';
import axios from 'axios';
import { FiSend, FiLoader } from 'react-icons/fi';
import './TestForgeURLForm.css';

function TestForgeURLForm({ onScanStart }) {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [suggestions] = useState([
    'https://example.com',
    'https://google.com',
    'https://github.com',
    'https://www.wikipedia.org'
  ]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!url.trim()) {
      setError('Please enter a valid URL');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post('/api/testforge/scan', { url });
      
      if (response.data.success) {
        onScanStart({
          scanId: response.data.scanId,
          url,
          startTime: new Date(),
          status: 'scanning'
        });
        setUrl('');
      } else {
        setError(response.data.error || 'Failed to start scan');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to connect to TestForge AI backend');
    } finally {
      setLoading(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setUrl(suggestion);
  };

  return (
    <div className="testforge-url-form-container">
      <div className="form-header">
        <h2>🔗 Start New QA Scan</h2>
        <p>Enter a website URL to begin automated testing with TESTFORGE AI</p>
      </div>

      <form onSubmit={handleSubmit} className="testforge-url-form">
        <div className="form-group">
          <label htmlFor="url">Website URL</label>
          <div className="input-wrapper">
            <input
              id="url"
              type="text"
              placeholder="https://example.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              disabled={loading}
              className={error ? 'error' : ''}
            />
            <button
              type="submit"
              disabled={loading || !url.trim()}
              className="submit-btn"
            >
              {loading ? (
                <>
                  <FiLoader className="spinner" /> Scanning...
                </>
              ) : (
                <>
                  <FiSend /> Start Scan
                </>
              )}
            </button>
          </div>
          {error && <div className="error-message">{error}</div>}
        </div>

        <div className="suggestions">
          <p className="suggestions-label">Quick Start Examples:</p>
          <div className="suggestions-grid">
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                type="button"
                className="suggestion-btn"
                onClick={() => handleSuggestionClick(suggestion)}
                disabled={loading}
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      </form>

      <div className="features-info">
        <h3>TestForge AI Features</h3>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h4>6 Automated QA Checks</h4>
            <p>Page load, broken links, forms, console errors, accessibility, and security checks</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🐛</div>
            <h4>Bug Detection</h4>
            <p>Detect and report issues with detailed reproduction steps</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📋</div>
            <h4>Test Case Generation</h4>
            <p>Automatic positive, negative, and edge case test creation</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📥</div>
            <h4>Easy Export</h4>
            <p>Export reports as CSV or HTML for sharing and documentation</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TestForgeURLForm;
