import React, { useState, useEffect, useCallback } from 'react';
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
  url?: string;
  citationNumber?: string;
  citationUrl?: string; // Direct URL from citations array
}

interface NewsItem {
  title: string;
  source: NewsSource;
  description: string;
  url: string;
}

// API interfaces
interface ApiMessage {
  role: string;
  content: string;
}

interface ApiRequest {
  model: string;
  messages: ApiMessage[];
  max_tokens: number;
  temperature: number;
  top_p: number;
}

interface ApiResponse {
  response: {
    id: string;
    model?: string;
    created?: number;
    citations?: string[]; // Array of citation URLs
    choices: Array<{
      message: {
        role: string;
        content: string;
      };
      finish_reason: string;
    }>;
    usage: {
      prompt_tokens: number;
      completion_tokens: number;
      total_tokens: number;
    };
  };
}

// Map source names to icons
const sourceIconMap: Record<string, string> = {
  'moneycontrol': '💰',
  'news24online': '📰',
  'indianexpress': '📱',
  'ndtv': '📺',
  'thehindu': '📋',
  'bbc': '🌐',
  'cnn': '🔴',
  'reuters': '📊',
  'ap': '🌍',
  'bloomberg': '💼',
  'forbes': '💲',
  'economictimes': '📈',
  'hindustantimes': '📑',
  'timesnow': '⏰',
  'indiatoday': '📆',
  'zeenews': '📡',
  'firstpost': '1️⃣',
  // Add more source mappings as needed
  'default': '🔗' // Default icon for unknown sources
};

// Function to extract sources from response content
const extractSourcesFromContent = (content: string): NewsSource[] => {
  const sources: NewsSource[] = [];
  
  // Extract numbered references like [1], [2], etc. and keep their order
  const numberRefRegex = /\[(\d+)\]/g;
  const numberRefs: string[] = [];
  let match;
  
  // Get all citation numbers in the order they appear
  while ((match = numberRefRegex.exec(content)) !== null) {
    if (!numberRefs.includes(match[1])) {
      numberRefs.push(match[1]);
    }
  }
  
  // Try to find reference links with format: 🔗 Source name
  const refLinkRegex = /🔗\s+(.*?)(?:\n|$)/g;
  let refMatch;
  let refCount = 0;
  
  while ((refMatch = refLinkRegex.exec(content)) !== null) {
    if (refMatch[1]) {
      const sourceName = refMatch[1].trim();
      // Extract a key word from the source for the icon
      const keyWord = sourceName.split(' ')[0].toLowerCase();
      refCount++;
      sources.push({
        name: sourceName,
        icon: sourceIconMap[keyWord] || sourceIconMap['default'],
        // Associate with the citation number if available
        citationNumber: refCount <= numberRefs.length ? numberRefs[refCount - 1] : undefined
      });
    }
  }
  
  // If reference links were found, return them
  if (sources.length > 0) {
    return sources;
  }
  
  // Otherwise, try to find JSON format sources
  const jsonRegex = /\{(?:[^{}]|{(?:[^{}]|{[^{}]*})*})*\}/g;
  const jsonMatches = content.match(jsonRegex) || [];
  
  // Try to parse any JSON objects that might contain sources
  for (const jsonStr of jsonMatches) {
    try {
      const data = JSON.parse(jsonStr);
      if (data.sources || data.references || data.links) {
        const sourceList = data.sources || data.references || data.links || [];
        for (let i = 0; i < sourceList.length; i++) {
          const source = sourceList[i];
          if (typeof source === 'string') {
            // Simple string source
            const domain = extractDomain(source);
            sources.push({
              name: domain,
              icon: sourceIconMap[domain.toLowerCase()] || sourceIconMap['default'],
              url: source,
              citationNumber: i < numberRefs.length ? numberRefs[i] : undefined
            });
          } else if (source.name || source.title || source.url) {
            // Object source
            const name = source.name || source.title || extractDomain(source.url);
            sources.push({
              name: name,
              icon: sourceIconMap[name.toLowerCase()] || sourceIconMap['default'],
              url: source.url,
              citationNumber: i < numberRefs.length ? numberRefs[i] : undefined
            });
          }
        }
      }
    } catch (e) {
      // Not a valid JSON object, continue
    }
  }
  
  // If no sources found, try to extract URLs from the text
  if (sources.length === 0) {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const urlMatches = content.match(urlRegex) || [];
    
    for (let i = 0; i < urlMatches.length; i++) {
      const url = urlMatches[i];
      const domain = extractDomain(url);
      sources.push({
        name: domain,
        icon: sourceIconMap[domain.toLowerCase()] || sourceIconMap['default'],
        url: url,
        citationNumber: i < numberRefs.length ? numberRefs[i] : undefined
      });
    }
  }
  
  // If we still have no sources but have citation numbers, create generic sources
  if (sources.length === 0 && numberRefs.length > 0) {
    numberRefs.forEach((num, index) => {
      sources.push({
        name: `Reference ${num}`,
        icon: '📄',
        citationNumber: num
      });
    });
  }
  
  // Deduplicate sources by name
  const uniqueSources = Array.from(new Map(sources.map(s => [s.name, s])).values());
  return uniqueSources.slice(0, 8); // Increased limit to 8 sources
};

// Helper function to extract domain from URL
const extractDomain = (url: string): string => {
  try {
    if (!url.startsWith('http')) {
      url = 'https://' + url;
    }
    const domain = new URL(url).hostname.replace('www.', '');
    return domain.split('.')[0];
  } catch (e) {
    return url;
  }
};

// Format the response text to be more readable
const formatResponseText = (text: string): string => {
  // Remove any JSON objects that might be at the end of the text
  const jsonRegex = /\{(?:[^{}]|{(?:[^{}]|{[^{}]*})*})*\}/g;
  const cleanText = text.replace(jsonRegex, '');
  
  // Fix formatting issues with bold text and bullet points
  let formattedText = cleanText
    // Convert markdown headings to HTML
    .replace(/### (.*?)(\n|$)/g, '<h3>$1</h3>\n')
    .replace(/#### (.*?)(\n|$)/g, '<h4>$1</h4>\n')
    
    // Make citation references like [1], [2][3], etc. clickable
    // This handles multiple adjacent citations like [1][2]
    .replace(/\[(\d+)\](?!\()/g, '<a href="#source-$1" class="citation-link">[$1]</a>')
    
    // Fix bold text formatting (convert **Text:** to <strong>Text:</strong>)
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    
    // Fix bullet point formatting
    .replace(/- +\*\*(.*?)\*\*:/g, '• <strong>$1:</strong>')
    .replace(/- +/g, '• ')
    
    // Fix tax slab formatting (remove unusual spacing)
    .replace(/(\d+)\s*-\s*(\d+)/g, '$1-$2')
    .replace(/Rs\s+(\d+)/g, 'Rs $1')
    
    // Add line breaks before bullet points if they don't already have them
    .replace(/([^\n])([•\-\*])/g, '$1\n\n$2')
    
    // Add emphasis to headlines or key topics
    .replace(/(?:^|\n)([A-Z][A-Z\s]+:)/g, '\n\n<strong>$1</strong>')
    
    // Clean up any double or triple line breaks
    .replace(/\n{3,}/g, '\n\n');
  
  return formattedText.trim();
};

const ChatType: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isChatStarted, setIsChatStarted] = useState(false);

  // Handle clicks on citation links
  const handleCitationClick = useCallback((e: MouseEvent) => {
    const target = e.target as HTMLElement;
    
    // Check if the click was on a citation link
    if (target.classList.contains('citation-link')) {
      e.preventDefault();
      
      // Get the target source ID from the href
      const href = (target as HTMLAnchorElement).getAttribute('href');
      if (href && href.startsWith('#source-')) {
        const sourceElement = document.getElementById(href.substring(1));
        
        if (sourceElement) {
          // Smooth scroll to the source
          sourceElement.scrollIntoView({ behavior: 'smooth' });
          
          // Highlight the source temporarily
          sourceElement.classList.add('highlighted-source');
          setTimeout(() => {
            sourceElement.classList.remove('highlighted-source');
          }, 2000);
        }
      }
    }
  }, []);

  useEffect(() => {
    // Add event listener for citation clicks
    document.addEventListener('click', handleCitationClick);
    
    // Cleanup
    return () => {
      document.removeEventListener('click', handleCitationClick);
    };
  }, [handleCitationClick]);

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
    
    // Set loading state
    setIsLoading(true);
    
    try {
      // Prepare API request
      const apiRequest: ApiRequest = {
        model: "sonar",
        messages: [
          {
            role: "system",
            content: "Be precise and elaborate on the answer. You are a news aggregator specializing in clear, well-structured information. Format your response with appropriate headings (use ### for main headings and #### for subheadings) and bullet points (use • for bullets). For emphasis, use <strong>text</strong> format. Use numbered citations like [1], [2] when referencing sources, and ensure the numbers correspond to the order in the response's citations array. Make your content well-structured and visually appealing."
          },
          {
            role: "user",
            content: userMessage.text
          }
        ],
        max_tokens: 1024,
        temperature: 0.2,
        top_p: 0.9
      };
      
      // Call the backend API
      const response = await fetch('http://localhost:8000/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(apiRequest)
      });
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      
      const data: ApiResponse = await response.json();
      
      if (data.response && data.response.choices && data.response.choices.length > 0) {
        const content = data.response.choices[0].message.content;
        const formattedContent = formatResponseText(content);
        
        // Extract sources with our regular method
        let extractedSources = extractSourcesFromContent(content);
        
        // If API provides direct citations, use them
        if (data.response.citations && data.response.citations.length > 0) {
          // If we don't have any extracted sources but have citations, create sources from the citations
          if (extractedSources.length === 0) {
            extractedSources = data.response.citations.map((url, index) => {
              const domain = extractDomain(url);
              return {
                name: `Reference ${index + 1}`,
                icon: sourceIconMap[domain.toLowerCase()] || sourceIconMap['default'],
                citationUrl: url,
                citationNumber: (index + 1).toString()
              };
            });
          } 
          // Otherwise, match existing sources with citation URLs
          else {
            extractedSources = extractedSources.map((source, index) => {
              // If we have a citation number and it's a valid index in the citations array
              if (source.citationNumber && 
                  parseInt(source.citationNumber) > 0 && 
                  parseInt(source.citationNumber) <= data.response.citations!.length) {
                // Use the citation URL from the API response
                return {
                  ...source,
                  citationUrl: data.response.citations![parseInt(source.citationNumber) - 1]
                };
              }
              // If we don't have a citation number but have a URL index, use that
              else if (index < data.response.citations!.length) {
                return {
                  ...source,
                  citationUrl: data.response.citations![index]
                };
              }
              return source;
            });
          }
        }
        
        const aiMessage: Message = {
          id: Date.now(),
          text: formattedContent,
          sender: 'ai',
          timestamp: new Date(),
          sources: extractedSources.length > 0 ? extractedSources : undefined
        };
        
        setMessages(prev => [...prev, aiMessage]);
      } else {
        throw new Error('Invalid API response format');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      
      // Display error message to user
      const errorMessage: Message = {
        id: Date.now(),
        text: "Sorry, I encountered an error while searching for information. Please try again later.",
        sender: 'ai',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
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
              <p 
                className="message-text" 
                style={{ whiteSpace: 'pre-wrap' }}
                dangerouslySetInnerHTML={
                  message.sender === 'ai' 
                    ? { __html: message.text } 
                    : undefined
                }
              >
                {message.sender === 'user' ? message.text : null}
              </p>
              {message.sources && message.sources.length > 0 && (
                <div className="sources-container">
                  <div className="sources-list">
                    {message.sources.map((source, idx) => (
                      <span 
                        key={idx} 
                        className="source-badge"
                        id={`source-${source.citationNumber || (idx + 1)}`}
                      >
                        {source.citationUrl || source.url ? (
                          <a 
                            href={source.citationUrl || source.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="source-link"
                          >
                            {source.icon} {source.citationNumber ? `[${source.citationNumber}] ` : ''}{source.name}
                          </a>
                        ) : (
                          <>{source.icon} {source.citationNumber ? `[${source.citationNumber}] ` : ''}{source.name}</>
                        )}
                      </span>
                    ))}
                    {message.sources.length > 0 && (
                      <span className="source-count">
                        {message.sources.length} {message.sources.length === 1 ? 'source' : 'sources'}
                      </span>
                    )}
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