import React, { useState, useEffect } from 'react';
import './Demo.css';

// Interface for the alert types
interface AlertItem {
  id: number;
  title: string;
  description: string;
  type: 'CRITICAL' | 'WARNING';
  time?: string;
}

// Main Dashboard Component
const Dashboard: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isRedirecting, setIsRedirecting] = useState<boolean>(false);

  useEffect(() => {
    let searchTimeout: ReturnType<typeof setTimeout>;

    if (searchQuery.trim()) {
      setIsRedirecting(true);
      searchTimeout = setTimeout(() => {
        // You can replace this with your actual search results page
        window.location.href = 'https://www.google.com';
      }, 500); // 500ms delay before redirect
    } else {
      setIsRedirecting(false);
    }

    return () => {
      if (searchTimeout) {
        clearTimeout(searchTimeout);
      }
    };
  }, [searchQuery]);

  // Handle search submission
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.open('https://www.google.com', '_blank');
    }
  };
  
  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Sample alerts data
  const alertsData: AlertItem[] = [
    {
      id: 1,
      title: 'Financial/Habitat',
      description: 'Decreased Confidence of 12.3% (Below threshold of 5.9%)',
      type: 'CRITICAL'
    },
    {
      id: 2,
      title: 'Customer/Credit',
      description: 'Decreased Confidence of 7.8% (Below threshold of 6.7%)',
      type: 'WARNING'
    },
    {
      id: 3,
      title: 'Data/Analysis',
      description: 'Decreased Confidence of 8.5% (Below threshold of 7.8%)',
      type: 'WARNING'
    }
  ];

  return (
    <div className="dashboard-container">
      {/* Header section */}
      <header className="dashboard-header">
        <div className="header-left">
          <div className="logo">
            <img src="/trustwise-logo-with-owl.png" alt="trustwise logo with owl" className="trustwise-owl-logo" />
            <span className="trustwise-text"></span>
          </div>
          <div className="navigation">
            <span className="nav-item">Monitoring</span>
            <span className="nav-item">Insights & Reports</span>
            <span className="nav-item">AI Control Tower</span>
          </div>
        </div>
        <div className="header-right">
          <span className="username">Matthew Blake</span>
          <div className="user-icon">MB</div>
        </div>
      </header>

      {/* Main dashboard content */}
      <div className="dashboard-content">
        {/* Sidebar */}
        <div className="sidebar">
          <div className="sidebar-section">
            <div className="sidebar-item">
              <div className="sidebar-icon">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span>Quick Start</span>
            </div>
            <div className="sidebar-item">
              <div className="sidebar-icon">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span>Activity Log</span>
            </div>
            <div className="sidebar-item">
              <div className="sidebar-icon">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span>Compliance</span>
            </div>
            <div className="sidebar-item">
              <div className="sidebar-icon">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span>Activity Monitor</span>
            </div>
            <div className="sidebar-item">
              <div className="sidebar-icon">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span>AI Safety Risk</span>
            </div>
            <div className="sidebar-item">
              <div className="sidebar-icon">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span>Usage Stats</span>
            </div>
          </div>
          <div className="sidebar-footer">
            <div className="sidebar-item">
              <div className="sidebar-icon">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" stroke="currentColor" strokeWidth="2" />
                  <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" stroke="currentColor" strokeWidth="2" />
                </svg>
              </div>
              <span>Settings</span>
            </div>
            <div className="sidebar-item">
              <div className="sidebar-icon">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" stroke="currentColor" strokeWidth="2" />
                  <path d="M13.73 21a2 2 0 01-3.46 0" stroke="currentColor" strokeWidth="2" />
                </svg>
              </div>
              <span>Help</span>
            </div>
          </div>
        </div>

        {/* Main panel */}
        <div className="main-panel">
          {/* Dashboard title */}
          <div className="dashboard-title">
            <h1>AI Control Tower Executive Dashboard</h1>
            <p>Optimized for analytics and insights for executives</p>
          </div>

          {/* Search bar */}
          <div className="search-container">
            <form onSubmit={handleSearchSubmit}>
              <input
                type="text"
                placeholder="Ask THEO AI: What is common poor AI system use case?"
                value={searchQuery}
                onChange={handleSearchChange}
                className={isRedirecting ? 'redirecting' : ''}
              />
              <button type="submit">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </form>
          </div>

          {/* Metrics grid */}
          <div className="metrics-grid">
            <div className="metric-card">
              <div className="metric-header">
                <h3>Total Systems</h3>
                <span className="metric-subtitle">Last 30 Days</span>
              </div>
              <div className="metric-value">203,187</div>
            </div>

            <div className="metric-card">
              <div className="metric-header">
                <h3>Total Prompts</h3>
                <span className="metric-subtitle">Active: 5,423</span>
                <span className="metric-subtitle">Total: 7,856</span>
              </div>
              <div className="metric-value">Active: 5,423</div>
              <div className="metric-value">Total: 7,856</div>
            </div>

            <div className="metric-card">
              <div className="metric-header">
                <h3>Analytic AI Systems</h3>
                <span className="metric-subtitle">Active: 18</span>
                <span className="metric-subtitle">Total: 24</span>
              </div>
              <div className="metric-value">Active: 18</div>
              <div className="metric-value">Total: 24</div>
            </div>

            <div className="metric-card">
              <div className="metric-header">
                <h3>Gen AI Systems</h3>
                <span className="metric-subtitle">Active: 9</span>
                <span className="metric-subtitle">Total: 12</span>
              </div>
              <div className="metric-value">Active: 9</div>
              <div className="metric-value">Total: 12</div>
            </div>

            <div className="metric-card">
              <h3>Daily Usage Trends</h3>
              <div className="chart-legend">
                <span className="legend-item">
                  <span className="legend-color purple"></span>
                  Agents
                </span>
                <span className="legend-item">
                  <span className="legend-color blue"></span>
                  ML/LLM
                </span>
              </div>
              <div className="chart-container">
                <svg viewBox="0 0 300 100" className="line-chart">
                  <path d="M0,80 C50,70 100,40 150,30 C200,20 250,10 300,20" 
                        stroke="#6366f1" fill="none" strokeWidth="2" />
                  <path d="M0,70 C50,80 100,60 150,50 C200,40 250,30 300,40" 
                        stroke="#3b82f6" fill="none" strokeWidth="2" />
                </svg>
              </div>
            </div>

            <div className="metric-card">
              <h3>Carbon Footprint</h3>
              <div className="chart-with-stats">
                <div className="donut-chart">
                  <svg viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="40" fill="transparent" stroke="#e5e7eb" strokeWidth="15" />
                    <circle cx="50" cy="50" r="40" fill="transparent" stroke="#10b981" strokeWidth="15" 
                            strokeDasharray="251.2 251.2" strokeDashoffset="90.4" transform="rotate(-90 50 50)" />
                    <text x="50" y="50" textAnchor="middle" dominantBaseline="middle" fontSize="20" fontWeight="500" fill="#333">64%</text>
                  </svg>
                </div>
                <div className="chart-stats">
                  <div className="stat-item">
                    <span className="stat-label">Monthly CO2 Score:</span>
                    <span className="stat-value">8.7 tonnes</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">YTD Average:</span>
                    <span className="stat-value">10.2 tonnes</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">Impact Savings:</span>
                    <span className="stat-value">$1.7M</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="metric-card">
              <h3>Cost Optimization</h3>
              <div className="chart-with-stats">
                <div className="donut-chart">
                  <svg viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="40" fill="transparent" stroke="#e5e7eb" strokeWidth="15" />
                    <circle cx="50" cy="50" r="40" fill="transparent" stroke="#10b981" strokeWidth="15" 
                            strokeDasharray="251.2 251.2" strokeDashoffset="37.7" transform="rotate(-90 50 50)" />
                    <text x="50" y="50" textAnchor="middle" dominantBaseline="middle" fontSize="20" fontWeight="500" fill="#333">85%</text>
                  </svg>
                </div>
                <div className="chart-stats">
                  <div className="stat-item">
                    <span className="stat-label">Monthly Spend:</span>
                    <span className="stat-value">$14,750</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">Budget:</span>
                    <span className="stat-value">$17,500</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">Total Savings:</span>
                    <span className="stat-value">$2.7M</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="metric-card">
              <h3>Safety & Alignment Metrics</h3>
              <div className="safety-metrics">
                <div className="safety-metric-item">
                  <div className="safety-metric-details">
                    <span className="safety-metric-name">Faithfulness</span>
                    <span className="safety-metric-value">93.8%</span>
                    <span className="safety-metric-change positive">+2.4%</span>
                  </div>
                  <div className="safety-progress-bar">
                    <div className="safety-progress-fill" style={{width: '93.8%'}}></div>
                  </div>
                </div>
                <div className="safety-metric-item">
                  <div className="safety-metric-details">
                    <span className="safety-metric-name">Completion Rate</span>
                    <span className="safety-metric-value">92.1%</span>
                    <span className="safety-metric-change positive">+1.7%</span>
                  </div>
                  <div className="safety-progress-bar">
                    <div className="safety-progress-fill" style={{width: '92.1%'}}></div>
                  </div>
                </div>
                <div className="safety-metric-item">
                  <div className="safety-metric-details">
                    <span className="safety-metric-name">Hallucination Rate</span>
                    <span className="safety-metric-value">0.42%</span>
                    <span className="safety-metric-change positive">+0.3%</span>
                  </div>
                  <div className="safety-progress-bar">
                    <div className="safety-progress-fill" style={{width: '0.42%'}}></div>
                  </div>
                </div>
                <div className="safety-metric-item">
                  <div className="safety-metric-details">
                    <span className="safety-metric-name">Policy Alignment</span>
                    <span className="safety-metric-value">99.2%</span>
                    <span className="safety-metric-change">no change</span>
                  </div>
                  <div className="safety-progress-bar">
                    <div className="safety-progress-fill" style={{width: '99.2%'}}></div>
                  </div>
                </div>
                <div className="safety-metric-item">
                  <div className="safety-metric-details">
                    <span className="safety-metric-name">Data Leakage Incidents</span>
                    <span className="safety-metric-value">0</span>
                    <span className="safety-metric-change">no change</span>
                  </div>
                  <div className="safety-progress-bar">
                    <div className="safety-progress-fill" style={{width: '0%'}}></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="metric-card">
              <div className="card-header">
                <h3>Active Drift Alerts</h3>
                <span className="alert-badge">7</span>
              </div>
              <div className="alerts-list">
                {alertsData.map((alert) => (
                  <div key={alert.id} className={`alert-item ${alert.type.toLowerCase()}`}>
                    <div className="alert-content">
                      <h4>{alert.title}</h4>
                      <p>{alert.description}</p>
                    </div>
                    <div className="alert-type">{alert.type}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="metric-card">
              <h3>Top AI Use Cases by Value</h3>
              <div className="use-cases-list">
                <div className="use-case-item">
                  <div className="use-case-name">Fraud Detection</div>
                  <div className="use-case-bar">
                    <div className="use-case-progress" style={{width: '90%'}}></div>
                  </div>
                  <div className="use-case-value">$2.4M</div>
                </div>
                <div className="use-case-item">
                  <div className="use-case-name">Customer Service</div>
                  <div className="use-case-bar">
                    <div className="use-case-progress" style={{width: '80%'}}></div>
                  </div>
                  <div className="use-case-value">$1.9M</div>
                </div>
                <div className="use-case-item">
                  <div className="use-case-name">Risk Assessment</div>
                  <div className="use-case-bar">
                    <div className="use-case-progress" style={{width: '70%'}}></div>
                  </div>
                  <div className="use-case-value">$1.4M</div>
                </div>
                <div className="use-case-item">
                  <div className="use-case-name">Document Processing</div>
                  <div className="use-case-bar">
                    <div className="use-case-progress" style={{width: '60%'}}></div>
                  </div>
                  <div className="use-case-value">$1.2M</div>
                </div>
                <div className="use-case-item">
                  <div className="use-case-name">Mortgage Processing</div>
                  <div className="use-case-bar">
                    <div className="use-case-progress" style={{width: '50%'}}></div>
                  </div>
                  <div className="use-case-value">$0.9M</div>
                </div>
                <div className="total-value">
                  <span>Total Value:</span>
                  <span>$13M annually</span>
                </div>
              </div>
            </div>

            <div className="metric-card">
              <h3>Department AI Adoption</h3>
              <div className="department-list">
                <div className="department-item">
                  <div className="department-name">Customer Success</div>
                  <div className="department-bar">
                    <div className="department-progress" style={{width: '90%'}}></div>
                  </div>
                  <div className="department-count">8 systems</div>
                </div>
                <div className="department-item">
                  <div className="department-name">Engineering</div>
                  <div className="department-bar">
                    <div className="department-progress" style={{width: '75%'}}></div>
                  </div>
                  <div className="department-count">5 systems</div>
                </div>
                <div className="department-item">
                  <div className="department-name">Finance</div>
                  <div className="department-bar">
                    <div className="department-progress" style={{width: '60%'}}></div>
                  </div>
                  <div className="department-count">4 systems</div>
                </div>
                <div className="department-item">
                  <div className="department-name">Marketing</div>
                  <div className="department-bar">
                    <div className="department-progress" style={{width: '45%'}}></div>
                  </div>
                  <div className="department-count">3 systems</div>
                </div>
                <div className="department-item">
                  <div className="department-name">Product</div>
                  <div className="department-bar">
                    <div className="department-progress" style={{width: '30%'}}></div>
                  </div>
                  <div className="department-count">2 systems</div>
                </div>
              </div>
            </div>

            <div className="metric-card">
              <h3>Prompt Engineering Efficiency</h3>
              <h4 className="subtitle">Key Optimization Metrics</h4>
              <div className="engineering-metrics">
                <div className="engineering-metric">
                  <div className="engineering-metric-details">
                    <span className="engineering-metric-name">Token Reduction</span>
                    <span className="engineering-metric-value">34%</span>
                  </div>
                  <div className="engineering-bar">
                    <div className="engineering-progress" style={{width: '34%'}}></div>
                  </div>
                </div>
                <div className="engineering-metric">
                  <div className="engineering-metric-details">
                    <span className="engineering-metric-name">Context Optimization</span>
                    <span className="engineering-metric-value">27%</span>
                  </div>
                  <div className="engineering-bar">
                    <div className="engineering-progress" style={{width: '27%'}}></div>
                  </div>
                </div>
                <div className="engineering-metric">
                  <div className="engineering-metric-details">
                    <span className="engineering-metric-name">Model Accuracy</span>
                    <span className="engineering-metric-value">19%</span>
                  </div>
                  <div className="engineering-bar">
                    <div className="engineering-progress" style={{width: '19%'}}></div>
                  </div>
                </div>
                <div className="engineering-metric">
                  <div className="engineering-metric-details">
                    <span className="engineering-metric-name">Latency Improvement</span>
                    <span className="engineering-metric-value">22%</span>
                  </div>
                  <div className="engineering-bar">
                    <div className="engineering-progress" style={{width: '22%'}}></div>
                  </div>
                </div>
                <div className="team-savings">
                  <span>Team Savings:</span>
                  <span>$26,500 monthly</span>
                </div>
              </div>
            </div>
          </div>

          {/* Pagination */}
          <div className="pagination">
            <button className="page-button active">1</button>
            <button className="page-button">2</button>
            <button className="page-button">3</button>
            <button className="page-button">4</button>
            <button className="page-button">5</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;