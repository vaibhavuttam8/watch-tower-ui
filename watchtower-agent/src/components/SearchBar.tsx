import React, { useState } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <div className="search-container">
      <h1 className="search-title">What do you want to know?</h1>
      <form onSubmit={handleSubmit} className="search-form">
        <div className="search-input-container">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask anything..."
            className="search-input"
          />
          <div className="search-buttons">
            <button type="button" className="language-button">
              🌐
            </button>
            <button type="submit" className="submit-button">
              →
            </button>
          </div>
        </div>
      </form>
      
      <div className="search-features">
        <div className="feature-card">
          <div className="feature-icon">🔍</div>
          <div className="feature-content">
            <h3>AI News Aggregation</h3>
            <p>Stay updated with the latest in AI policy and technology</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar; 