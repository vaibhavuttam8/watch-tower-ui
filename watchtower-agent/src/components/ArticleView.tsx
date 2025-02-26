import React from 'react';
import './ArticleView.css';

interface ArticleViewProps {
  article: {
    title: string;
    source: string;
    date?: string;
    readTime?: string;
    category: string;
    impactScore?: number;
    description: string;
    keyPoints?: string[];
    overview?: string;
    keyChanges?: string;
    impactAssessment?: string;
    nextSteps?: { id: number; text: string; }[];
  };
  onBack: () => void;
}

const ArticleView: React.FC<ArticleViewProps> = ({ article, onBack }) => {
  return (
    <div className="article-view-container">
      <div className="article-view-header">
        <button onClick={onBack} className="back-button">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M15 10H5M5 10L10 15M5 10L10 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Back to Newsfeed
        </button>
        <div className="header-actions">
          <button className="action-button">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M5 5.5L15 15.5M15 5.5L5 15.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
          <button className="action-button">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M5 10H15M10 5V15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
      </div>

      <div className="article-view-content">
        <div className="article-category">{article.category}</div>
        {article.impactScore && (
          <div className="article-impact">Impact Score: <span>{article.impactScore}</span></div>
        )}
        
        <h1 className="article-title">{article.title}</h1>
        
        <div className="article-meta">
          {article.date && <span className="meta-item">{article.date}</span>}
          {article.date && <span className="meta-separator">•</span>}
          {article.readTime && <span className="meta-item">{article.readTime}</span>}
          {article.readTime && <span className="meta-separator">•</span>}
          <span className="meta-item">{article.source}</span>
        </div>

        <p className="article-description">{article.description}</p>

        <div className="article-tags">
          {['Regulation', 'Compliance', 'EU', 'AI Act', 'Timeline'].map((tag, index) => (
            <span key={index} className="tag">{tag}</span>
          ))}
        </div>

        {article.keyPoints && article.keyPoints.length > 0 && (
          <section className="article-section">
            <h2>Key Points</h2>
            <ul className="key-points">
              {article.keyPoints.map((point, index) => (
                <li key={index}>{point}</li>
              ))}
            </ul>
          </section>
        )}

        {article.overview && (
          <section className="article-section">
            <h2>Overview</h2>
            <p>{article.overview}</p>
          </section>
        )}

        {article.keyChanges && (
          <section className="article-section">
            <h2>Key Changes</h2>
            <p>{article.keyChanges}</p>
          </section>
        )}

        {article.impactAssessment && (
          <section className="article-section">
            <h2>Impact Assessment</h2>
            <p>{article.impactAssessment}</p>
          </section>
        )}

        {article.nextSteps && article.nextSteps.length > 0 && (
          <section className="article-section">
            <h2>Recommended Next Steps</h2>
            <div className="next-steps">
              {article.nextSteps.map((step) => (
                <div key={step.id} className="next-step">
                  <div className="step-number">{step.id}</div>
                  <div className="step-text">{step.text}</div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default ArticleView; 