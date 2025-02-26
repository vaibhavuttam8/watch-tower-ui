import React from 'react';
import { useNavigate } from 'react-router-dom';

interface RequiredAction {
  priority: 'HIGH' | 'MEDIUM';
  title: string;
  status: 'PENDING' | 'IN-PROGRESS';
  dueDate: string;
}

interface NewsItem {
  title: string;
  category: string;
  timeAgo: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
}

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const requiredActions: RequiredAction[] = [
    {
      priority: 'HIGH',
      title: 'Review EU AI Act Compliance',
      status: 'PENDING',
      dueDate: '2025-03-15'
    },
    {
      priority: 'MEDIUM',
      title: 'Update Model Risk Assessment',
      status: 'IN-PROGRESS',
      dueDate: '2025-03-01'
    }
  ];

  const newsItems: NewsItem[] = [
    {
      title: 'OpenAI Releases GPT-5',
      category: 'Breaking News',
      timeAgo: '2 hours ago',
      description: 'OpenAI has announced the release of GPT-5, featuring significant improvements in reasoning and multimodal capabilities...',
      impact: 'high'
    },
    {
      title: 'EU AI Act Updates',
      category: 'Regulatory Update',
      timeAgo: '1 day ago',
      description: 'New amendments to the EU AI Act introduce additional requirements for AI model deployment...',
      impact: 'high'
    }
  ];

  return (
    <div className="main-content">
      <div className="header">
        <h1>Dashboard</h1>
        <button className="refresh-button">
          Refresh Updates
        </button>
      </div>

      <div className="dashboard-grid">
        <div className="news-section">
          {/* News Items */}
          {newsItems.map((item, index) => (
            <div key={index} className="news-item">
              <div className="news-item-header">
                <div>
                  <h3 className="news-item-title">{item.title}</h3>
                  <div className="news-item-meta">
                    {item.category} • {item.timeAgo}
                  </div>
                </div>
                <span className={`impact-badge ${item.impact}`}>
                  {item.impact} impact
                </span>
              </div>
              <p className="news-item-description">{item.description}</p>
              <button 
                onClick={() => navigate('/article/1')}
                className="read-more-button"
              >
                Read More
              </button>
            </div>
          ))}
        </div>

        <div className="actions-section">
          {/* Required Actions */}
          <div className="required-actions">
            <h2>Required Actions</h2>
            {requiredActions.map((action, index) => (
              <div key={index} className="action-item">
                <div className="action-header">
                  <span className={`priority-badge ${action.priority.toLowerCase()}`}>
                    {action.priority}
                  </span>
                  <span className="due-date">
                    Due {action.dueDate}
                  </span>
                </div>
                <h3 className="action-title">{action.title}</h3>
                <div className="action-footer">
                  <span className={`status-label ${action.status.toLowerCase()}`}>
                    {action.status}
                  </span>
                  <button className="take-action-button">
                    Take Action
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 