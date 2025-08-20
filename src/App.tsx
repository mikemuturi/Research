import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import SurveyPage from './pages/SurveyPage';
import ResultsPage from './pages/ResultsPage';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminDashboard from './pages/AdminDashboard';
import PrivacyPage from './pages/PrivacyPage';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<><Navbar /><HomePage /></>} />
          <Route path="/about" element={<><Navbar /><AboutPage /></>} />
          <Route path="/survey" element={<><Navbar /><SurveyPage /></>} />
          <Route path="/results/:id" element={<><Navbar /><ResultsPage /></>} />
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/privacy" element={<><Navbar /><PrivacyPage /></>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;