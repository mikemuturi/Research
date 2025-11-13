'use client';

import React, { useEffect, useState } from 'react';
import {
  BarChart3,
  Users,
  FileText,
  TrendingUp,
  Download,
  Filter,
  Building2,
  Wifi,
  Eye,
  Trash2,
  AlertTriangle,
} from 'lucide-react';
import { surveyAPI } from '@/lib/api';
import { Statistics, Submission } from '@/types';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import Modal from '@/components/ui/Modal';

type SurveyType = 'all' | 'rafsia' | 'isp';

export default function SubmissionsTab() {
  const [statistics, setStatistics] = useState<Statistics | null>(null);
  const [globalStatistics, setGlobalStatistics] = useState<Statistics | null>(null);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [activeSurveyType, setActiveSurveyType] = useState<SurveyType>('all');
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [submissionToDelete, setSubmissionToDelete] = useState<Submission | null>(null);
  const [deleting, setDeleting] = useState(false);

  const [filters, setFilters] = useState({
    role: '',
    county: '',
    institution: '',
    survey_type: '',
    date_from: '',
    date_to: '',
  });

  useEffect(() => {
    const loadGlobalStatistics = async () => {
      try {
        const response = await surveyAPI.getStatistics();
        setGlobalStatistics(response.data);
      } catch (error) {
        console.error('Error loading global statistics:', error);
      }
    };

    loadGlobalStatistics();
  }, []);

  useEffect(() => {
    loadDashboardData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters, activeSurveyType]);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      
      // Prepare filters with survey type
      const queryFilters = { ...filters };
      if (activeSurveyType !== 'all') {
        queryFilters.survey_type = activeSurveyType;
      }

      const [statsResponse, submissionsResponse] = await Promise.all([
        surveyAPI.getStatistics(queryFilters),
        surveyAPI.getSubmissions(queryFilters),
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
      const queryFilters = { ...filters };
      if (activeSurveyType !== 'all') {
        queryFilters.survey_type = activeSurveyType;
      }

      const response = await surveyAPI.exportCSV(queryFilters);
      const blob = new Blob([response.data], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${activeSurveyType === 'all' ? 'all' : activeSurveyType}_submissions.csv`;
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
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  const clearFilters = () => {
    setFilters({
      role: '',
      county: '',
      institution: '',
      survey_type: '',
      date_from: '',
      date_to: '',
    });
    setActiveSurveyType('all');
  };

  const getSurveyTypeStats = () => {
    if (!globalStatistics?.by_survey_type) {
      return null;
    }
    
    const stats = {
      rafsia: globalStatistics.by_survey_type.rafsia || 0,
      isp: globalStatistics.by_survey_type.isp || 0,
      total: globalStatistics.total_submissions || 0,
    };
    return stats;
  };

  const getSurveyBadge = (surveyType: string) => {
    const isRafsia = surveyType === 'rafsia';
    return (
      <span
        className={`px-2 py-1 text-xs font-medium rounded-full ${
          isRafsia
            ? 'bg-blue-100 text-blue-800'
            : 'bg-purple-100 text-purple-800'
        }`}
      >
        {isRafsia ? 'RAFSIA' : 'ISP'}
      </span>
    );
  };

  const surveyTypeStats = getSurveyTypeStats();

  const handleOpenDeleteModal = (submission: Submission) => {
    setSubmissionToDelete(submission);
    setDeleteModalOpen(true);
  };

  const handleDeleteSubmission = async () => {
    if (!submissionToDelete) return;
    try {
      setDeleting(true);
      await surveyAPI.deleteSubmission(String(submissionToDelete.id));
      setDeleteModalOpen(false);
      setSubmissionToDelete(null);
      await Promise.all([
        loadDashboardData(),
        (async () => {
          try {
            const response = await surveyAPI.getStatistics();
            setGlobalStatistics(response.data);
          } catch (error) {
            console.error('Error refreshing global statistics:', error);
          }
        })(),
      ]);
      alert('Submission deleted successfully.');
    } catch (error) {
      console.error('Error deleting submission:', error);
      alert('Failed to delete submission. Please try again.');
    } finally {
      setDeleting(false);
    }
  };

  if (loading && !statistics) {
    return (
      <div className="bg-gray-50 rounded-xl p-12 text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading submissions…</p>
      </div>
    );
  }

  return (
    <div>
      {/* Survey Type Tabs */}
      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveSurveyType('all')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeSurveyType === 'all'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              All Assessments ({surveyTypeStats?.total || 0})
            </button>
            <button
              onClick={() => setActiveSurveyType('rafsia')}
              className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                activeSurveyType === 'rafsia'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Building2 size={16} />
              <span>RAFSIA Assessment ({surveyTypeStats?.rafsia || 0})</span>
            </button>
            <button
              onClick={() => setActiveSurveyType('isp')}
              className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                activeSurveyType === 'isp'
                  ? 'border-purple-500 text-purple-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Wifi size={16} />
              <span>ISP Assessment ({surveyTypeStats?.isp || 0})</span>
            </button>
          </nav>
        </div>
      </div>

      {/* Statistics Cards */}
      {statistics && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="flex items-center p-6">
              <Users className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  {activeSurveyType === 'all' ? 'Total' : activeSurveyType.toUpperCase()} Submissions
                </p>
                <p className="text-2xl font-semibold text-gray-900">{statistics.total_submissions}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center p-6">
              <TrendingUp className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Average Readiness</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {Math.round(statistics.average_scores.overall)}%
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center p-6">
              <BarChart3 className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Very Ready</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {statistics.by_readiness_level.very_ready || 0}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center p-6">
              <FileText className="h-8 w-8 text-amber-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Counties</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {Object.keys(statistics.by_county).length}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Survey Type Breakdown (only show for 'all' view) */}
      {activeSurveyType === 'all' && surveyTypeStats && (
        <div className="mb-8">
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold text-gray-900">Assessment Type Breakdown</h3>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Building2 className="h-8 w-8 text-blue-600" />
                    <div>
                      <p className="font-medium text-blue-900">RAFSIA Assessment</p>
                      <p className="text-sm text-blue-700">Institution readiness evaluation</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-blue-900">{surveyTypeStats.rafsia}</p>
                    <p className="text-sm text-blue-700">submissions</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Wifi className="h-8 w-8 text-purple-600" />
                    <div>
                      <p className="font-medium text-purple-900">ISP Assessment</p>
                      <p className="text-sm text-purple-700">Service provider readiness evaluation</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-purple-900">{surveyTypeStats.isp}</p>
                    <p className="text-sm text-purple-700">submissions</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Filters and Actions */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="flex items-center space-x-4">
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center space-x-2"
          >
            <Filter size={16} />
            <span>Filters</span>
          </Button>
          {(Object.values(filters).some(Boolean) || activeSurveyType !== 'all') && (
            <Button variant="outline" onClick={clearFilters}>
              Clear Filters
            </Button>
          )}
        </div>
        <div className="flex items-center space-x-4">
          <Button onClick={handleExportCSV} className="flex items-center space-x-2">
            <Download size={16} />
            <span>Export CSV</span>
          </Button>
        </div>
      </div>

      {/* Filters Modal */}
      <Modal isOpen={showFilters} onClose={() => setShowFilters(false)} title="Filter Submissions">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select
            label="Survey Type"
            value={filters.survey_type}
            onChange={(e) => handleFilterChange('survey_type', e.target.value)}
            options={[
              { value: '', label: 'All types' },
              { value: 'rafsia', label: 'RAFSIA Assessment' },
              { value: 'isp', label: 'ISP Assessment' },
            ]}
          />
          <Select
            label="Role"
            value={filters.role}
            onChange={(e) => handleFilterChange('role', e.target.value)}
            options={[
              { value: '', label: 'All roles' },
              { value: 'lecturer', label: 'Lecturer' },
              { value: 'it_support', label: 'IT Support' },
              { value: 'admin', label: 'Administrator' },
              { value: 'principal', label: 'Principal' },
              { value: 'student', label: 'Student' },
              { value: 'service_provider', label: 'Service Provider' },
            ]}
          />
          <Input
            label="County"
            type="text"
            value={filters.county}
            onChange={(e) => handleFilterChange('county', e.target.value)}
            placeholder="Filter by county..."
          />
          <Input
            label="Institution"
            type="text"
            value={filters.institution}
            onChange={(e) => handleFilterChange('institution', e.target.value)}
            placeholder="Filter by institution..."
          />
          <Input
            label="Date From"
            type="date"
            value={filters.date_from}
            onChange={(e) => handleFilterChange('date_from', e.target.value)}
          />
          <Input
            label="Date To"
            type="date"
            value={filters.date_to}
            onChange={(e) => handleFilterChange('date_to', e.target.value)}
          />
        </div>

        <div className="flex justify-end space-x-4 mt-6">
          <Button variant="outline" onClick={() => setShowFilters(false)}>
            Cancel
          </Button>
          <Button onClick={() => setShowFilters(false)}>Apply Filters</Button>
        </div>
      </Modal>

      {/* Submissions Table */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold text-gray-900">
            {activeSurveyType === 'all' ? 'All Submissions' : 
             activeSurveyType === 'rafsia' ? 'RAFSIA Assessment Submissions' : 
             'ISP Assessment Submissions'}
          </h3>
          <p className="text-sm text-gray-600">
            {loading ? 'Loading...' : `${submissions.length} submissions found`}
          </p>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {activeSurveyType === 'all' && (
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Survey Type
                    </th>
                  )}
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
                    Overall Score
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Readiness Level
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Submitted
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {submissions.map((submission) => (
                  <tr key={submission.id} className="hover:bg-gray-50">
                    {activeSurveyType === 'all' && (
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getSurveyBadge(submission.survey_type || 'rafsia')}
                      </td>
                    )}
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {submission.name || 'Anonymous'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {submission.role}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {submission.institution_name_display}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {submission.county}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                      {Math.round(submission.overall_percentage ?? submission.overall_score ?? 0)}%
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded-full ${
                          submission.readiness_level === 'very_ready'
                            ? 'bg-green-100 text-green-800'
                            : submission.readiness_level === 'not_sure'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {submission.readiness_level === 'very_ready'
                          ? 'Very Ready'
                          : submission.readiness_level === 'not_sure'
                          ? 'Not Sure'
                          : 'Not Ready'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(submission.submitted_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => window.open(`/results/${submission.id}`, '_blank')}
                          className="flex items-center space-x-1"
                        >
                          <Eye size={14} />
                          <span>View</span>
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleOpenDeleteModal(submission)}
                          className="flex items-center space-x-1 text-red-600 hover:bg-red-50"
                        >
                          <Trash2 size={14} />
                          <span>Delete</span>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {submissions.length === 0 && !loading && (
            <div className="text-center py-8">
              <p className="text-gray-500">No submissions found matching your criteria.</p>
            </div>
          )}
        </CardContent>
      </Card>

      <Modal
        isOpen={deleteModalOpen}
        onClose={() => {
          if (!deleting) {
            setDeleteModalOpen(false);
            setSubmissionToDelete(null);
          }
        }}
        title="Delete Submission"
      >
        <div className="flex items-start space-x-3">
          <div className="mt-1">
            <AlertTriangle className="h-6 w-6 text-red-500" />
          </div>
          <div>
            <p className="text-sm text-gray-700">
              Are you sure you want to delete this submission? This action cannot be undone.
            </p>
            {submissionToDelete && (
              <div className="mt-3 text-sm text-gray-600">
                <p>
                  <span className="font-semibold">Respondent:</span>{' '}
                  {submissionToDelete.name || 'Anonymous'}
                </p>
                <p>
                  <span className="font-semibold">Survey Type:</span>{' '}
                  {submissionToDelete.survey_type.toUpperCase()}
                </p>
                <p>
                  <span className="font-semibold">Submitted:</span>{' '}
                  {new Date(submissionToDelete.submitted_at).toLocaleString()}
                </p>
              </div>
            )}
          </div>
        </div>
        <div className="flex justify-end space-x-4 mt-6">
          <Button
            variant="outline"
            onClick={() => {
              if (!deleting) {
                setDeleteModalOpen(false);
                setSubmissionToDelete(null);
              }
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleDeleteSubmission}
            disabled={deleting}
            className="bg-red-600 hover:bg-red-700"
          >
            {deleting ? 'Deleting...' : 'Delete'}
          </Button>
        </div>
      </Modal>
    </div>
  );
}