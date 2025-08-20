import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import SurveyPage from './pages/SurveyPage';
import ResultsPage from './pages/ResultsPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import SettingsPage from './pages/SettingsPage';
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
          <Route path="/contact" element={<><Navbar /><ContactPage /></>} />
          <Route path="/survey" element={<><Navbar /><SurveyPage /></>} />
          <Route path="/results/:id" element={<><Navbar /><ResultsPage /></>} />
          <Route path="/login" element={<><Navbar /><LoginPage /></>} />
          <Route path="/register" element={<><Navbar /><RegisterPage /></>} />
          <Route path="/profile" element={<><Navbar /><ProfilePage /></>} />
          <Route path="/settings" element={<><Navbar /><SettingsPage /></>} />
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/privacy" element={<><Navbar /><PrivacyPage /></>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;