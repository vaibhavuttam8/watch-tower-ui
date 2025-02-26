import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import NewsFeed from './components/NewsFeed';
import ArticleDetail from './components/ArticleDetail';
import ChatType from './components/ChatType';
import { ThemeProvider } from './context/ThemeContext';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="app-container">
          <Sidebar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/newsfeed" element={<NewsFeed />} />
              <Route path="/article/:id" element={<ArticleDetail />} />
              <Route path="/chat" element={<ChatType />} />
              {/* Add other routes as needed */}
            </Routes>
          </main>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
