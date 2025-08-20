import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import SurveyForm from './components/survey/SurveyForm';
import ResultsPage from './pages/ResultsPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import SettingsPage from './pages/SettingsPage';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminDashboard from './pages/AdminDashboard';
import PrivacyPage from './pages/PrivacyPage';
import UserDashboard from './pages/UserDashboard';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<><Navbar /><HomePage /></>} />
          <Route path="/about" element={<><Navbar /><AboutPage /></>} />
          <Route path="/contact" element={<><Navbar /><ContactPage /></>} />
          <Route path="/survey" element={<SurveyForm />} />
          <Route path="/results/:id" element={<><Navbar /><ResultsPage /></>} />
          <Route path="/login" element={<><Navbar /><LoginPage /></>} />
          <Route path="/register" element={<><Navbar /><RegisterPage /></>} />
          <Route path="/profile" element={<><Navbar /><ProfilePage /></>} />
          <Route path="/settings" element={<><Navbar /><SettingsPage /></>} />
          <Route path="/privacy" element={<><Navbar /><PrivacyPage /></>} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/dashboard" element={<><Navbar /><UserDashboard /></>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;