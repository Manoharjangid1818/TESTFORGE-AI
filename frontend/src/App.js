import React, { useState } from 'react';
import { FiMenu, FiX, FiHome, FiSettings, FiGithub } from 'react-icons/fi';
import TestForgeURLForm from './components/TestForgeURLForm';
import TestForgeDashboard from './components/TestForgeDashboard';
import TestForgeBugReport from './components/TestForgeBugReport';
import TestForgeTestCases from './components/TestForgeTestCases';
import TestForgeExecutionLogs from './components/TestForgeExecutionLogs';
import TestForgeScanHistory from './components/TestForgeScanHistory';
import TestForgeQAAssistant from './components/TestForgeQAAssistant';
import './App.css';

function TestForgeApp() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentScan, setCurrentScan] = useState(null);
  const [scanHistory, setScanHistory] = useState([]);

  const handleScanStart = (scanData) => {
    setCurrentScan(scanData);
    setScanHistory([scanData, ...scanHistory]);
    setActiveTab('dashboard');
  };

  const handleScanSelect = (scan) => {
    setCurrentScan(scan);
    setActiveTab('dashboard');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <TestForgeDashboard scan={currentScan} />;
      case 'urlform':
        return <TestForgeURLForm onScanStart={handleScanStart} />;
      case 'bugs':
        return <TestForgeBugReport scan={currentScan} />;
      case 'testcases':
        return <TestForgeTestCases scan={currentScan} />;
      case 'logs':
        return <TestForgeExecutionLogs scan={currentScan} />;
      case 'history':
        return <TestForgeScanHistory scans={scanHistory} onSelectScan={handleScanSelect} />;
      case 'qa':
        return <TestForgeQAAssistant />;
      default:
        return <TestForgeDashboard scan={currentScan} />;
    }
  };

  return (
    <div className="testforge-app">
      {/* Header */}
      <header className="testforge-header">
        <div className="header-container">
          <div className="header-left">
            <button
              className="toggle-sidebar"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              title="Toggle Sidebar"
            >
              {sidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
            <div className="logo">
              <h1>🚀 TESTFORGE AI</h1>
              <p className="tagline">Forge Quality. Automate Confidence.</p>
            </div>
          </div>
          <div className="header-right">
            <a href="https://github.com/testforge-ai" target="_blank" rel="noopener noreferrer" className="icon-link">
              <FiGithub size={24} />
            </a>
            <a href="#settings" className="icon-link">
              <FiSettings size={24} />
            </a>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="testforge-container">
        {/* Sidebar */}
        <aside className={`testforge-sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
          <nav className="sidebar-nav">
            <div className="nav-section">
              <h3 className="nav-title">Main</h3>
              <button
                className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}
                onClick={() => { setActiveTab('dashboard'); setSidebarOpen(false); }}
              >
                <FiHome size={20} /> Dashboard
              </button>
              <button
                className={`nav-item ${activeTab === 'urlform' ? 'active' : ''}`}
                onClick={() => { setActiveTab('urlform'); setSidebarOpen(false); }}
              >
                🔗 New Scan
              </button>
            </div>

            <div className="nav-section">
              <h3 className="nav-title">Results</h3>
              <button
                className={`nav-item ${activeTab === 'bugs' ? 'active' : ''}`}
                onClick={() => { setActiveTab('bugs'); setSidebarOpen(false); }}
              >
                🐛 Bug Report
              </button>
              <button
                className={`nav-item ${activeTab === 'testcases' ? 'active' : ''}`}
                onClick={() => { setActiveTab('testcases'); setSidebarOpen(false); }}
              >
                📋 Test Cases
              </button>
              <button
                className={`nav-item ${activeTab === 'logs' ? 'active' : ''}`}
                onClick={() => { setActiveTab('logs'); setSidebarOpen(false); }}
              >
                📝 Execution Logs
              </button>
            </div>

            <div className="nav-section">
              <h3 className="nav-title">History</h3>
              <button
                className={`nav-item ${activeTab === 'history' ? 'active' : ''}`}
                onClick={() => { setActiveTab('history'); setSidebarOpen(false); }}
              >
                ⏱️ Scan History
              </button>
            </div>

            <div className="nav-section">
              <h3 className="nav-title">AI Assistant</h3>
              <button
                className={`nav-item ${activeTab === 'qa' ? 'active' : ''}`}
                onClick={() => { setActiveTab('qa'); setSidebarOpen(false); }}
              >
                🧪 QA Assistant
              </button>
            </div>

            <div className="nav-footer">
              <p className="version">v2.0.0</p>
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="testforge-main">
          {renderContent()}
        </main>
      </div>

      {/* Footer */}
      <footer className="testforge-footer">
        <p>&copy; 2024 TESTFORGE AI - Automated Quality Assurance Platform</p>
        <p>Forge Quality. Automate Confidence.</p>
      </footer>
    </div>
  );
}

export default TestForgeApp;
