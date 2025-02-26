import React from 'react';

interface Source {
  name: string;
  icon: string;
}

interface SearchResult {
  title: string;
  content: string;
  sources: Source[];
}

interface SearchResultsProps {
  query: string;
  results: SearchResult[];
}

const SearchResults: React.FC<SearchResultsProps> = ({ query, results }) => {
  return (
    <div className="results-container">
      <div className="results-header">
        <h2>{query}</h2>
        <div className="source-filters">
          <span className="source-count">13 sources</span>
        </div>
      </div>

      <div className="results-list">
        {results.map((result, index) => (
          <div key={index} className="result-card">
            <h3>{result.title}</h3>
            <p>{result.content}</p>
            <div className="sources">
              {result.sources.map((source, sIndex) => (
                <div key={sIndex} className="source-badge">
                  <span className="source-icon">{source.icon}</span>
                  <span className="source-name">{source.name}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="results-actions">
        <div className="action-buttons">
          <button className="search-images">🖼️ Search Images</button>
          <button className="search-videos">🎥 Search Videos</button>
          <button className="generate-image">✨ Generate Image</button>
        </div>
      </div>
    </div>
  );
};

export default SearchResults; 