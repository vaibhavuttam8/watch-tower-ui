import React, { useState } from 'react';
import './NewsFeed.css';
import ArticleView from './ArticleView';

interface NewsArticle {
  title: string;
  source: string;
  timeAgo: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  category: string;
  readTime?: string;
  date?: string;
  impactScore?: number;
  keyPoints?: string[];
  overview?: string;
  keyChanges?: string;
  impactAssessment?: string;
  nextSteps?: { id: number; text: string; }[];
}

const NewsFeed: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);

  const categories = ['All', 'Research', 'Industry', 'Regulation', 'Ethics', 'Business'];

  const newsArticles: NewsArticle[] = [
    {
      title: 'EU Updates AI Act Implementation Timeline',
      source: 'EU Commission',
      timeAgo: '8 min read',
      date: 'February 23, 2025',
      description: 'New timeline provides detailed roadmap for companies to achieve compliance with the EU AI Act, with specific milestones and requirements for different AI system categories.',
      impact: 'high',
      category: 'Regulation',
      impactScore: 95,
      keyPoints: [
        'High-risk AI systems must comply by January 2026',
        'Foundation models face new transparency requirements',
        'SMEs given extended adaptation period',
        'National authorities to begin enforcement preparations'
      ],
      overview: 'The European Commission has released an updated implementation timeline for the EU AI Act, providing organizations with a detailed roadmap for achieving compliance. This revision includes specific deadlines for different categories of AI systems and clarifies the roles of national supervisory authorities.',
      keyChanges: 'The updated timeline introduces several significant changes to the implementation schedule. Most notably, organizations developing or deploying high-risk AI systems will now have until January 2026 to ensure full compliance with the Act\'s requirements. This extension provides additional time for technical adaptation and organizational preparation.',
      impactAssessment: 'This timeline revision will have substantial implications for organizations developing or deploying AI systems within the EU. Companies will need to review their AI development practices, update their risk assessment frameworks, and potentially modify their AI governance structures to align with the new requirements.',
      nextSteps: [
        { id: 1, text: 'Review current AI systems against updated requirements' },
        { id: 2, text: 'Update compliance roadmap with new deadlines' },
        { id: 3, text: 'Assess resource requirements for implementation' },
        { id: 4, text: 'Begin staff training on new requirements' }
      ]
    },
    {
      title: 'OpenAI Releases GPT-5',
      source: 'TechCrunch',
      timeAgo: '15 hours',
      description: 'OpenAI has announced the release of GPT-5, featuring significant improvements in reasoning and multimodal capabilities...',
      impact: 'high',
      category: 'Industry'
    },
    {
      title: 'New Research Shows Promise in AI Safety',
      source: 'MIT Technology Review',
      timeAgo: '16 hours',
      description: 'Researchers at leading institutions have developed new techniques for ensuring AI system safety...',
      impact: 'medium',
      category: 'Research'
    },
    {
      title: 'EU Updates AI Regulation Framework',
      source: 'Wired',
      timeAgo: '14 hours',
      description: 'The European Union has announced significant updates to its AI regulation framework...',
      impact: 'high',
      category: 'Regulation'
    },
    {
      title: 'Tech Giants Collaborate on AI Ethics Board',
      source: 'VentureBeat',
      timeAgo: '13 hours',
      description: 'Major technology companies announce the formation of a joint AI ethics board...',
      impact: 'medium',
      category: 'Ethics'
    }
  ];

  if (selectedArticle) {
    return (
      <ArticleView 
        article={selectedArticle} 
        onBack={() => setSelectedArticle(null)} 
      />
    );
  }

  return (
    <div className="news-feed-container">
      <div className="news-feed-content">
        <h1 className="news-feed-title">AI Developments</h1>
        <p className="news-feed-subtitle">Track the latest developments in AI from multiple sources</p>
        
        <div className="category-nav">
          <div className="category-buttons">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`category-button ${selectedCategory === category ? 'active' : ''}`}
              >
                {category}
              </button>
            ))}
          </div>
          <div className="source-select-wrapper">
            <select className="source-select">
              <option>All Sources</option>
            </select>
            <div className="select-arrow">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        </div>

        <div className="articles-container">
          {newsArticles
            .filter(article => selectedCategory === 'All' || article.category === selectedCategory)
            .map((article, index) => (
              <div key={index} className="article-card">
                <div className="article-header">
                  <div>
                    <h2 className="article-title">{article.title}</h2>
                    <div className="article-meta">
                      <span>{article.source}</span>
                      <span>•</span>
                      <span>in {article.timeAgo}</span>
                    </div>
                  </div>
                  <div className="article-tags">
                    <span className={`impact-tag ${article.impact === 'high' ? 'high' : ''}`}>
                      {article.impact} impact
                    </span>
                    <span className="category-tag">
                      {article.category}
                    </span>
                  </div>
                </div>
                <p className="article-description">{article.description}</p>
                <div className="article-actions">
                  <button 
                    className="read-more-button"
                    onClick={() => setSelectedArticle(article)}
                  >
                    <span>Read Full Article</span>
                    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 10h12m0 0l-4-4m4 4l-4 4"/>
                    </svg>
                  </button>
                  <button className="save-button">
                    Save for Later
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default NewsFeed; 