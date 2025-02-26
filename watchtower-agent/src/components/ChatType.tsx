import React, { useState, useEffect } from 'react';
import './ChatType.css';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  sources?: NewsSource[];
}

interface NewsSource {
  name: string;
  icon: string;
}

interface NewsItem {
  title: string;
  source: NewsSource;
  description: string;
  url: string;
}

const mockSources: NewsSource[] = [
  { name: 'moneycontrol', icon: '💰' },
  { name: 'news24online', icon: '📰' },
  { name: 'indianexpress', icon: '📱' },
  { name: 'ndtv', icon: '📺' },
  { name: 'thehindu', icon: '📋' }
];

const ChatType: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isChatStarted, setIsChatStarted] = useState(false);

  useEffect(() => {
    // Add welcome message when component mounts
    const welcomeMessage: Message = {
      id: Date.now(),
      text: "Hello! I can help you find the latest news and information. What would you like to know about?",
      sender: 'ai',
      timestamp: new Date(),
    };
    setMessages([welcomeMessage]);
  }, []);

  const getMockNewsResponse = (query: string) => {
    const mockNews = [
      {
        title: "Latest Political Developments in India",
        description: "• Rekha Gupta set to become Delhi's new Chief Minister: A first-time MLA from Shalimar Bagh, Gupta will be Delhi's fourth woman CM and the only woman CM of a BJP-ruled state or Union Territory at present.\n\n• Rahul Gandhi seeks BSP alliance: The Congress leader has expressed his desire for the Bahujan Samaj Party (BSP) to join forces against the BJP.\n\n• Scrutiny of USAID India head: Veena Reddy, the first Indian-American to head USAID in India, is facing scrutiny from the BJP over recent statements.",
        source: { name: "Political Update", icon: "🗳️" }
      },
      {
        title: "Electoral Developments",
        description: "Recent polls show shifting alliances and new political formations emerging across several states.",
        source: { name: "Election Watch", icon: "📊" }
      },
      {
        title: "Policy Changes and Reforms",
        description: "Government announces new reforms in various sectors with focus on development and governance.",
        source: { name: "Policy Tracker", icon: "📜" }
      }
    ];

    return {
      text: `Here are the latest updates on ${query}:\n\n${mockNews.map(news => 
        `${news.source.icon} ${news.title}\n${news.description}\n`).join('\n')}`,
      sources: mockSources.slice(0, 5)
    };
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || isLoading) return;

    // Set chat as started when user sends first message
    if (!isChatStarted) {
      setIsChatStarted(true);
    }

    const userMessage: Message = {
      id: Date.now(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    
    // Simulate loading
    setIsLoading(true);
    setTimeout(() => {
      const mockResponse = getMockNewsResponse(inputMessage);
      const aiMessage: Message = {
        id: Date.now(),
        text: mockResponse.text,
        sender: 'ai',
        timestamp: new Date(),
        sources: mockResponse.sources
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="chat-container">
      <div className={`chat-header ${isChatStarted ? 'collapsed' : ''}`}>
        <h1>News Assistant</h1>
        <p>Ask me anything about current events and news</p>
      </div>

      <div className="chat-messages">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`message ${message.sender === 'user' ? 'user-message' : 'ai-message'}`}
          >
            <div className="message-content">
              <p className="message-text" style={{ whiteSpace: 'pre-wrap' }}>{message.text}</p>
              {message.sources && (
                <div className="sources-container">
                  <div className="sources-list">
                    {message.sources.map((source, idx) => (
                      <span key={idx} className="source-badge">
                        {source.icon} {source.name}
                      </span>
                    ))}
                    <span className="source-count">+{message.sources.length} sources</span>
                  </div>
                </div>
              )}
              <span className="message-time">
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="message ai-message">
            <div className="message-content">
              <p>Searching for updates...</p>
            </div>
          </div>
        )}
      </div>

      <form onSubmit={handleSendMessage} className="chat-input-form">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Ask about any topic..."
          className="chat-input"
          disabled={isLoading}
        />
        <button type="submit" className="send-button" disabled={isLoading}>
          {isLoading ? 'Searching...' : 'Send'}
        </button>
      </form>
    </div>
  );
};

export default ChatType; 