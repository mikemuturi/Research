import React, { useState, useEffect } from 'react';
import { Download, Filter, Eye, Trash2, Search } from 'lucide-react';
import { surveyAPI } from '@/lib/api';
import { Submission } from '@/types';

const SubmissionsTab: React.FC = () => {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    role: '',
    county: '',
    readiness_level: '',
  });

  useEffect(() => {
    loadSubmissions();
  }, [searchTerm, filters]);

  const loadSubmissions = async () => {
    setLoading(true);
    setError('');
    
    try {
      const params = {
        ...filters,
        search: searchTerm || undefined,
      };
      
      // Remove empty filters
      Object.keys(params).forEach(key => {
        if (!params[key as keyof typeof params]) {
          delete params[key as keyof typeof params];
        }
      });
      
      const response = await surveyAPI.getSubmissions(params);
      setSubmissions(response.data);
    } catch (error: any) {
      console.error('Error loading submissions:', error);
      setError('Failed to load submissions. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleExport = () => {
    try {
      surveyAPI.exportCSV(filters);
    } catch (error) {
      console.error('Error exporting submissions:', error);
      alert('Error exporting data. Please try again.');
    }
  };

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this submission?')) {
      setSubmissions(prev => prev.filter(s => s.id !== id));
      // TODO: Implement actual delete API call
    }
  };

  const getReadinessColor = (level: string) => {
    switch (level) {
      case 'very_ready': return 'bg-green-100 text-green-800';
      case 'not_sure': return 'bg-yellow-100 text-yellow-800';
      case 'not_ready': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getReadinessLabel = (level: string) => {
    switch (level) {
      case 'very_ready': return 'Very Ready';
      case 'not_sure': return 'Not Sure';
      case 'not_ready': return 'Not Ready';
      default: return 'Unknown';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Survey Submissions</h3>
          <p className="text-sm text-gray-600">View and manage all assessment submissions</p>
        </div>
        <button
          onClick={handleExport}
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Download size={16} className="mr-2" />
          Export CSV
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search submissions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <select
            value={filters.role}
            onChange={(e) => setFilters(prev => ({ ...prev, role: e.target.value }))}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Roles</option>
            <option value="lecturer">Lecturer</option>
            <option value="it_support">IT Support</option>
            <option value="admin">Administrator</option>
            <option value="student">Student</option>
          </select>

          <input
            type="text"
            placeholder="Filter by county..."
            value={filters.county}
            onChange={(e) => setFilters(prev => ({ ...prev, county: e.target.value }))}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />

          <select
            value={filters.readiness_level}
            onChange={(e) => setFilters(prev => ({ ...prev, readiness_level: e.target.value }))}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Readiness Levels</option>
            <option value="very_ready">Very Ready</option>
            <option value="not_sure">Not Sure</option>
            <option value="not_ready">Not Ready</option>
          </select>
        </div>
      </div>

      {/* Submissions table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-2 text-gray-600">Loading submissions...</p>
          </div>
        ) : error ? (
          <div className="p-8 text-center">
            <p className="text-red-600">{error}</p>
            <button 
              onClick={loadSubmissions}
              className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Retry
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Respondent
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Institution
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    County
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Score
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Readiness
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {submissions.map((submission) => (
                  <tr key={submission.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{submission.name}</div>
                        <div className="text-sm text-gray-500">{submission.email}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 capitalize">
                      {submission.role.replace('_', ' ')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {submission.institution_name_display || submission.institution_name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {submission.county}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {Math.round(submission.overall_score)}%
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getReadinessColor(submission.readiness_level)}`}>
                        {getReadinessLabel(submission.readiness_level)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(submission.submitted_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button className="text-blue-600 hover:text-blue-900">
                          <Eye size={16} />
                        </button>
                        <button 
                          onClick={() => handleDelete(submission.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {submissions.length === 0 && !loading && !error && (
              <div className="p-8 text-center text-gray-500">
                No submissions found matching your criteria.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SubmissionsTab;