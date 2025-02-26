import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

interface SidebarProps {
  userName?: string;
  userImage?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ userName = "Arin Mangal", userImage = "/default-avatar.png" }) => {
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
    <div className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        <h1>{isCollapsed ? 'AW' : 'AI Watchtower'}</h1>
        <button 
          className="collapse-toggle"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? '→' : '←'}
        </button>
      </div>
      
      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handleNavigation(item.id)}
            className={`nav-item ${activeItem === item.id ? 'active' : ''}`}
            title={isCollapsed ? item.label : undefined}
          >
            <span className="nav-item-icon">{item.icon}</span>
            {!isCollapsed && <span>{item.label}</span>}
          </button>
        ))}
      </nav>

      <div className="sidebar-footer">
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