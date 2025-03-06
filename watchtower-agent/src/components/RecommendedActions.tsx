import React from 'react';
import { useNavigate } from 'react-router-dom';
import './RecommendedActions.css';

interface Action {
  id: number;
  priority: 'High' | 'Medium' | 'Low';
  title: string;
  description: string;
  category: string;
  dueDate: string;
  requiredActions?: string[];
  impact?: string;
}

const RecommendedActions: React.FC = () => {
  const navigate = useNavigate();
  const actions: Action[] = [
    {
      id: 1,
      priority: 'High',
      title: 'Update AI Model Risk Assessment Documentation',
      description: 'Current documentation does not meet new EU AI Act requirements for high-risk AI systems',
      category: 'Compliance',
      dueDate: '2025-03-15',
    },
    {
      id: 2,
      priority: 'Medium',
      title: 'Implement New Model Monitoring Requirements',
      description: 'Enhanced monitoring requirements specified in latest AI safety guidelines',
      category: 'Technical',
      dueDate: '2025-04-01',
      requiredActions: [
        'Set up real-time performance monitoring',
        'Implement automated drift detection',
        'Create alert system for anomalous behavior',
        'Document monitoring procedures'
      ],
      impact: 'Potential system reliability issues if not implemented'
    },
    {
      id: 3,
      priority: 'Low',
      title: 'Update Privacy Impact Assessment',
      description: 'Regular update required for privacy impact assessment documentation',
      category: 'Privacy',
      dueDate: '2025-04-15',
      requiredActions: [
        'Review current data handling practices',
        'Update data flow diagrams',
        'Reassess privacy risks',
        'Update mitigation strategies'
      ],
      impact: 'Maintaining compliance with data protection regulations'
    }
  ];

  const priorityCounts = {
    High: actions.filter(a => a.priority === 'High').length,
    Medium: actions.filter(a => a.priority === 'Medium').length,
    Low: actions.filter(a => a.priority === 'Low').length
  };

  const handleActionClick = (actionId: number) => {
    navigate(`/recommended-actions/${actionId}`);
  };

  return (
    <div className="recommended-actions">
      <h1>Recommended Actions</h1>
      <p className="subtitle">Identified {actions.length} tasks to ensure compliance and optimal performance</p>

      <div className="priority-summary">
        <div className="priority-card high">
          <span className="priority-label">High Priority</span>
          <span className="priority-count">{priorityCounts.High}</span>
        </div>
        <div className="priority-card medium">
          <span className="priority-label">Medium Priority</span>
          <span className="priority-count">{priorityCounts.Medium}</span>
        </div>
        <div className="priority-card low">
          <span className="priority-label">Low Priority</span>
          <span className="priority-count">{priorityCounts.Low}</span>
        </div>
      </div>

      <div className="actions-list">
        {actions.map(action => (
          <div 
            key={action.id} 
            className={`action-card ${action.priority.toLowerCase()}`}
            onClick={() => handleActionClick(action.id)}
            style={{ cursor: 'pointer' }}
          >
            <div className="action-header">
              <span className="priority-tag">{action.priority}</span>
              <h2>{action.title}</h2>
              <button className="expand-button" onClick={(e) => {
                e.stopPropagation();
                handleActionClick(action.id);
              }}>→</button>
            </div>
            <p className="description">{action.description}</p>
            <div className="action-meta">
              <span>Category: {action.category}</span>
              <span>Due: {action.dueDate}</span>
            </div>
            {action.requiredActions && (
              <div className="required-actions">
                <h3>Required Actions:</h3>
                <ul>
                  {action.requiredActions.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
            {action.impact && (
              <div className="impact">
                <h3>Impact:</h3>
                <p>{action.impact}</p>
              </div>
            )}
            {action.requiredActions && (
              <button 
                className="take-action"
                onClick={(e) => {
                  e.stopPropagation();
                  handleActionClick(action.id);
                }}
              >
                Take Action
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendedActions; 