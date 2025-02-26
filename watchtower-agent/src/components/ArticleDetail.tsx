import React from 'react';
import { useNavigate } from 'react-router-dom';

interface ArticleDetailProps {
  article?: {
    title: string;
    date: string;
    readTime: string;
    source: string;
    impactScore: number;
    category: string;
    content: string;
    tags: string[];
  };
}

const ArticleDetail: React.FC<ArticleDetailProps> = ({ 
  article = {
    title: "EU Updates AI Act Implementation Timeline",
    date: "February 23, 2025",
    readTime: "8 min read",
    source: "EU Commission",
    impactScore: 95,
    category: "Regulation",
    content: "New timeline provides detailed roadmap for companies to achieve compliance with the EU AI Act, with specific milestones and requirements for different AI system categories.",
    tags: ["Regulation", "Compliance", "EU", "AI Act", "Timeline"]
  }
}) => {
  const navigate = useNavigate();

  const keyPoints = [
    "High-risk AI systems must comply by January 2026",
    "Foundation models face new transparency requirements",
    "SMEs given extended adaptation period",
    "National authorities to begin enforcement preparations"
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      {/* Header with navigation */}
      <div className="flex items-center mb-8">
        <button 
          onClick={() => navigate('/newsfeed')}
          className="flex items-center text-gray-400 hover:text-white"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Newsfeed
        </button>
        <div className="ml-auto flex space-x-4">
          <button className="text-gray-400 hover:text-white">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
          </button>
          <button className="text-gray-400 hover:text-white">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Article content */}
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <span className="bg-purple-900 text-purple-200 px-3 py-1 rounded-full text-sm">
            {article.category}
          </span>
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <span>{article.date}</span>
              <span>•</span>
              <span>{article.readTime}</span>
              <span>•</span>
              <span>{article.source}</span>
            </div>
            <div className="flex items-center">
              <span className="text-sm text-gray-400 mr-2">Impact Score:</span>
              <span className="text-2xl font-bold text-purple-400">{article.impactScore}</span>
            </div>
          </div>
        </div>

        <h1 className="text-3xl font-bold mb-6">{article.title}</h1>

        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Key Points</h2>
          <ul className="space-y-3">
            {keyPoints.map((point, index) => (
              <li key={index} className="flex items-start">
                <span className="text-blue-400 mr-2">•</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="prose prose-invert max-w-none">
          <h2 className="text-xl font-semibold mb-4">Overview</h2>
          <p className="text-gray-300 mb-6">
            The European Commission has released an updated implementation timeline for the EU AI Act, providing
            organizations with a detailed roadmap for achieving compliance. This revision includes specific deadlines for
            different categories of AI systems and clarifies the roles of national supervisory authorities.
          </p>

          <h2 className="text-xl font-semibold mb-4">Key Changes</h2>
          <p className="text-gray-300 mb-6">
            The updated timeline introduces several significant changes to the implementation schedule. Most notably,
            organizations developing or deploying high-risk AI systems will now have until January 2026 to ensure full
            compliance with the Act's requirements. This extension provides additional time for technical adaptation and
            organizational preparation.
          </p>

          <h2 className="text-xl font-semibold mb-4">Impact Assessment</h2>
          <p className="text-gray-300 mb-6">
            This timeline revision will have substantial implications for organizations developing or deploying AI systems
            within the EU. Companies will need to review their AI development practices, update their risk assessment
            frameworks, and potentially modify their AI governance structures to align with the new requirements.
          </p>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-700">
          <h3 className="text-lg font-semibold mb-4">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {article.tags.map((tag, index) => (
              <span key={index} className="bg-gray-800 px-3 py-1 rounded-full text-sm text-gray-300">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleDetail; 