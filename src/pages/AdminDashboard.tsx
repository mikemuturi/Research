import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../components/admin/AdminLayout';
import SubmissionsTab from '../components/admin/SubmissionsTab';
import SurveysTab from '../components/admin/SurveysTab';
import QuestionsTab from '../components/admin/QuestionsTab';
import AnswersTab from '../components/admin/AnswersTab';
import ProjectsTab from '../components/admin/ProjectsTab';
import UsersTab from '../components/admin/UsersTab';

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('submissions');
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem('access_token');
    if (!token) {
      navigate('/admin/login');
      return;
    }
  }, [navigate]);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'submissions':
        return <SubmissionsTab />;
      case 'surveys':
        return <SurveysTab />;
      case 'questions':
        return <QuestionsTab />;
      case 'answers':
        return <AnswersTab />;
      case 'projects':
        return <ProjectsTab />;
      case 'users':
        return <UsersTab />;
      default:
        return <SubmissionsTab />;
    }
  };

  return (
    <AdminLayout activeTab={activeTab} onTabChange={setActiveTab}>
      {renderTabContent()}
    </AdminLayout>
  );
};

export default AdminDashboard;