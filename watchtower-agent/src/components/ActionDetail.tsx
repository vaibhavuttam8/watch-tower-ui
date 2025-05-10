import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ActionDetail.css';

interface Issue {
  id: number;
  title: string;
  source: string;
}

interface Document {
  id: number;
  name: string;
  type: string;
  pages: { page: string; title: string; description: string }[];
}

interface ActionDetailProps {
  id?: string;
}

const ActionDetail: React.FC<ActionDetailProps> = ({ id }) => {
  const navigate = useNavigate();
  
  const issues: Issue[] = [
    { id: 1, title: 'Add quantitative metrics for model performance evaluation', source: 'source' },
    { id: 2, title: 'Include bias assessment methodology and results', source: 'source' },
    { id: 3, title: 'Document model testing procedures and validation steps', source: 'source' },
    { id: 4, title: 'Update risk mitigation strategies section', source: 'source' },
  ];

  const documents: Document[] = [
    {
      id: 1,
      name: 'AI_Risk_Assessment_v1.2.pdf',
      type: 'Policy Document',
      pages: [
        {
          page: 'Page 12',
          title: 'Section 3.2: Model Testing',
          description: 'Missing detailed testing procedures'
        },
        {
          page: 'Page 15',
          title: 'Section 4.1: Risk Mitigation',
          description: 'Outdated mitigation strategies'
        }
      ]
    }
  ];

  return (
    <div className="action-detail">
      <button className="back-button" onClick={() => navigate('/recommended-actions')}>
        ← Back to Recommended Actions
      </button>

      <div className="action-detail-header">
        <h1>Update AI Model Risk Assessment Documentation</h1>
        <span className="priority-badge high">High Priority</span>
      </div>

      <div className="action-detail-meta">
        <div className="meta-item">
          <span className="meta-icon">📅</span>
          <div className="meta-content">
            <span className="meta-label">Due</span>
            <span className="meta-value">March 15, 2025</span>
          </div>
        </div>
        <div className="meta-item">
          <span className="meta-icon">⏱️</span>
          <div className="meta-content">
            <span className="meta-label">Estimated time</span>
            <span className="meta-value">2-3 hours</span>
          </div>
        </div>
      </div>

      <section className="action-section">
        <h2>Summary</h2>
        <p>Current documentation does not meet new EU AI Act requirements for high-risk AI systems</p>
      </section>

      <section className="action-section">
        <h2>Impact</h2>
        <p>Critical non-compliance risk if not addressed before EU AI Act enforcement</p>
      </section>

      <section className="action-section">
        <div className="section-header">
          <h2>We identified {issues.length} issues</h2>
          <span className="issue-count">{issues.length}</span>
        </div>
        <div className="issues-list">
          {issues.map((issue, index) => (
            <div key={issue.id} className="issue-item">
              <span className="issue-number">{index + 1}</span>
              <span className="issue-title">{issue.title}</span>
              <a href="#" className="source-link">({issue.source})</a>
            </div>
          ))}
        </div>
      </section>

      <section className="action-section">
        <div className="section-header">
          <h2>Affected Documents</h2>
          <div className="document-pagination">
            <span>1 of 2</span>
            <div className="pagination-controls">
              <button disabled>←</button>
              <button>→</button>
            </div>
          </div>
        </div>

        {documents.map(doc => (
          <div key={doc.id} className="document-card">
            <div className="document-header">
              <div className="document-icon">📄</div>
              <div className="document-info">
                <h3>{doc.name}</h3>
                <span className="document-type">{doc.type}</span>
              </div>
              <span className="document-number">Document 1 of 2</span>
            </div>

            {doc.pages.map((page, index) => (
              <div key={index} className="document-page">
                <div className="page-header">
                  <span className="page-number">{page.page}</span>
                  <span className="update-badge">Requires Update</span>
                  <button className="expand-button">∧</button>
                </div>
                <div className="page-content">
                  <h4>{page.title}</h4>
                  <p>{page.description}</p>
                </div>
                <div className="page-actions">
                  <button className="preview-button">Document Preview</button>
                  <button className="open-tab-button">Open in New Tab</button>
                  <button className="section-button">Jump to Section</button>
                </div>
              </div>
            ))}
          </div>
        ))}
      </section>
    </div>
  );
};

export default ActionDetail; 