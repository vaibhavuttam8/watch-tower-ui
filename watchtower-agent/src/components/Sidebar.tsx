import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

interface SidebarProps {
  userName?: string;
  userImage?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ userName = "Vaibhav", userImage = "/default-avatar.png" }) => {
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState('dashboard');
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'newsfeed', label: 'News Feed', icon: '📰' },
    { id: 'risk-assessment', label: 'Risk Assessment', icon: '⚠️' },
    { id: 'recommended-actions', label: 'Recommended Actions', icon: '📋' },
    { id: 'configure', label: 'Configure', icon: '⚙️' },
    { id: 'saved', label: 'Saved', icon: '📌' },
    { id: 'chat', label: 'Chat', icon: '💬' }
  ];

  const handleNavigation = (itemId: string) => {
    setActiveItem(itemId);
    navigate(`/${itemId}`);
  };

  return (
    <div 
      className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}
      style={{
        width: isCollapsed ? '80px' : '280px',
        minHeight: '100vh',
        transition: 'width 0.3s ease',
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px'
      }}
    >
      <div className="sidebar-header" style={{ marginBottom: '16px' }}>
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: '12px'
        }}>
          <div style={{
            background: 'white',
            padding: '8px',
            borderRadius: '8px',
            display: isCollapsed ? 'none' : 'block'
          }}>
            <img 
              src="/ai-institute-logo.png" 
              alt="AI Institute Logo" 
              style={{ 
                height: '32px',
                width: 'auto'
              }} 
            />
          </div>
          <h1 style={{ 
            fontSize: '32px', 
            fontWeight: 600,
            margin: 0
          }}>{isCollapsed ? 'AW' : 'Watchtower'}</h1>
        </div>
        {/* <button 
          className="collapse-toggle"
          onClick={() => setIsCollapsed(!isCollapsed)}
          style={{
            padding: '8px',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          {isCollapsed ? '→' : '←'}
        </button> */}
      </div>
      
      <nav className="sidebar-nav" style={{ flex: 1 }}>
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handleNavigation(item.id)}
            className={`nav-item ${activeItem === item.id ? 'active' : ''}`}
            title={isCollapsed ? item.label : undefined}
            style={{
              width: '100%',
              padding: '12px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              border: 'none',
              background: 'transparent',
              cursor: 'pointer',
              borderRadius: '8px',
              marginBottom: '8px'
            }}
          >
            <span className="nav-item-icon" style={{ fontSize: '20px' }}>{item.icon}</span>
            {!isCollapsed && <span style={{ fontSize: '16px' }}>{item.label}</span>}
          </button>
        ))}
      </nav>

      <div className="sidebar-footer" style={{ marginTop: 'auto', paddingTop: '16px' }}>
        <div className="user-info">
          <img
            src={userImage}
            alt={userName}
            className="user-avatar"
          />
          {!isCollapsed && <span>{userName}</span>}
          <button 
            className="theme-toggle"
            onClick={toggleTheme}
            title={isCollapsed ? `Switch to ${theme === 'light' ? 'dark' : 'light'} mode` : undefined}
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar; 