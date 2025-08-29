'use client';

import React, { useState, useEffect } from 'react';
import {
  BarChart3,
  Users,
  FileText,
  TrendingUp,
  Download,
  Filter,
  ClipboardList,
  BookOpen,
  HelpCircle,
  Building2,
  LayoutDashboard,
} from 'lucide-react';
import Link from 'next/link';
import { surveyAPI } from '@/lib/api';
import { Statistics, Submission } from '@/types';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import Modal from '@/components/ui/Modal';

const Sidebar: React.FC = () => {
  const navItems = [
    { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/admin/submissions', label: 'Submissions', icon: ClipboardList },
    { href: '/admin/results', label: 'Results', icon: BarChart3 },
    { href: '/admin/projects', label: 'Projects', icon: BookOpen },
    { href: '/admin/questions', label: 'Questions', icon: HelpCircle },
    { href: '/admin/surveys', label: 'Surveys', icon: FileText },
    { href: '/admin/institutions', label: 'Institutions', icon: Building2 },
  ];

  return (
    <aside className="w-64 bg-white shadow-md h-screen p-4 fixed top-0 left-0 flex flex-col">
      <h2 className="text-xl font-bold mb-6">RAFSIA Admin</h2>
      <nav className="space-y-2">
        {navItems.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 text-gray-700 font-medium"
          >
            <Icon size={18} className="text-gray-600" />
            {label}
          </Link>
        ))}
      </nav>
    </aside>
  );
};

const Dashboard: React.FC = () => {
  const [statistics, setStatistics] = useState<Statistics | null>(null);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);

  const [filters, setFilters] = useState({
    role: '',
    county: '',
    institution: '',
    date_from: '',
    date_to: '',
  });

  useEffect(() => {
    loadDashboardData();
  }, [filters]);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      const [statsResponse, submissionsResponse] = await Promise.all([
        surveyAPI.getStatistics(),
        surveyAPI.getSubmissions(filters),
      ]);
      setStatistics(statsResponse.data);
      setSubmissions(submissionsResponse.data);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleExportCSV = async () => {
    try {
      const response = await surveyAPI.exportCSV(filters);
      const blob = new Blob([response.data], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'rafsia_submissions.csv';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error exporting CSV:', error);
      alert('Error exporting data. Please try again.');
    }
  };

  const handleFilterChange = (field: string, value: string) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const clearFilters = () => {
    setFilters({
      role: '',
      county: '',
      institution: '',
      date_from: '',
      date_to: '',
    });
  };

  if (loading && !statistics) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <main className="flex-1 ml-64 p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">RAFSIA Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">Monitor and analyze readiness assessment data</p>
        </div>

        {/* Your existing dashboard content (statistics, filters, table, etc.) stays the same */}
      </main>
    </div>
  );
};

export default Dashboard;
