'use client';
import React, { useEffect, useState, useMemo } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { surveyAPI } from '@/lib/api';
import { Search, Download, Filter, MessageSquare, User, Building2, Wifi, Layers } from 'lucide-react';
import Button from '@/components/ui/Button';
import Select from '@/components/ui/Select';
import Input from '@/components/ui/Input';
import Modal from '@/components/ui/Modal';

interface Comment {
  id: number;
  dimension: string;
  dimension_label: string;
  comment: string;
  created_at: string;
  submission: {
    id: number;
    name: string;
    role: string;
    survey_type: 'rafsia' | 'isp';
    survey_type_display: string;
    institution_name_display?: string;
    county: string;
    submitted_at: string;
  };
}

const DIMENSION_OPTIONS = [
  { value: '', label: 'All Dimensions' },
  { value: 'technical', label: 'Technical Readiness' },
  { value: 'economic', label: 'Economic Readiness' },
  { value: 'socio_cultural', label: 'Socio-Cultural Readiness' },
  { value: 'environmental', label: 'Environmental Readiness' },
  { value: 'policy_regulatory', label: 'Policy & Regulatory Readiness' },
  { value: 'strategic', label: 'Strategic & Future Outlook' },
];

const ROLE_OPTIONS = [
  { value: '', label: 'All Roles' },
  { value: 'lecturer', label: 'Lecturer' },
  { value: 'it_support', label: 'IT Support' },
  { value: 'admin', label: 'Administrator' },
  { value: 'principal', label: 'Principal' },
  { value: 'student', label: 'Student' },
  { value: 'service_provider', label: 'Service Provider' },
];

export default function CommentsTab() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    survey_type: '',
    role: '',
    dimension: '',
  });
  const [exporting, setExporting] = useState(false);

  const fetchComments = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const params: Record<string, string> = {};
      if (filters.survey_type) params.survey_type = filters.survey_type;
      if (filters.role) params.role = filters.role;
      if (filters.dimension) params.dimension = filters.dimension;

      const response = await surveyAPI.getAllComments(params);
      setComments(response.data || []);
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || 'Failed to fetch comments');
      console.error('Error fetching comments:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  const filteredComments = useMemo(() => {
    return comments.filter((comment) => {
      const matchesSearch = 
        comment.comment.toLowerCase().includes(searchTerm.toLowerCase()) ||
        comment.submission.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        comment.submission.institution_name_display?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        comment.submission.county.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesSearch;
    });
  }, [comments, searchTerm]);

  const handleFilterChange = (field: string, value: string) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  const clearFilters = () => {
    setFilters({
      survey_type: '',
      role: '',
      dimension: '',
    });
    setSearchTerm('');
  };

  const handleExport = async () => {
    try {
      setExporting(true);
      const params: Record<string, string> = {};
      if (filters.survey_type) params.survey_type = filters.survey_type;
      if (filters.role) params.role = filters.role;
      if (filters.dimension) params.dimension = filters.dimension;

      const response = await surveyAPI.exportCommentsCSV(params);
      const blob = new Blob([response.data], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      const filename = `comments_${filters.survey_type || 'all'}_${new Date().toISOString().split('T')[0]}.csv`;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err: any) {
      console.error('Error exporting comments:', err);
      alert('Error exporting comments. Please try again.');
    } finally {
      setExporting(false);
    }
  };

  const getDimensionColor = (dimension: string) => {
    const colors: Record<string, string> = {
      technical: 'bg-blue-100 text-blue-800',
      economic: 'bg-green-100 text-green-800',
      socio_cultural: 'bg-purple-100 text-purple-800',
      environmental: 'bg-emerald-100 text-emerald-800',
      policy_regulatory: 'bg-orange-100 text-orange-800',
      strategic: 'bg-pink-100 text-pink-800',
    };
    return colors[dimension] || 'bg-gray-100 text-gray-800';
  };

  const stats = useMemo(() => {
    const total = filteredComments.length;
    const bySurveyType = {
      rafsia: filteredComments.filter(c => c.submission.survey_type === 'rafsia').length,
      isp: filteredComments.filter(c => c.submission.survey_type === 'isp').length,
    };
    const byDimension = filteredComments.reduce((acc, comment) => {
      acc[comment.dimension] = (acc[comment.dimension] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    return { total, bySurveyType, byDimension };
  }, [filteredComments]);

  if (loading && comments.length === 0) {
    return (
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold text-gray-900">Dimension Comments</h3>
          <p className="text-sm text-gray-600">Loading comments...</p>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold text-gray-900">Dimension Comments</h3>
          <p className="text-sm text-red-600">Error loading comments</p>
        </CardHeader>
        <CardContent>
          <div className="bg-red-50 border border-red-200 rounded-md p-4">
            <p className="text-red-800">{error}</p>
            <Button onClick={fetchComments} className="mt-2">
              Try Again
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Comments</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.total}</p>
              </div>
              <MessageSquare className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">RAFSIA</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.bySurveyType.rafsia}</p>
              </div>
              <Building2 className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">ISP</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.bySurveyType.isp}</p>
              </div>
              <Wifi className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Dimensions</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {Object.keys(stats.byDimension).length}
                </p>
              </div>
              <Layers className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Actions */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Dimension Comments</h3>
              <p className="text-sm text-gray-600">
                {filteredComments.length} comment{filteredComments.length !== 1 ? 's' : ''} found
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2"
              >
                <Filter className="h-4 w-4" />
                Filters
              </Button>
              <Button
                onClick={handleExport}
                disabled={exporting || filteredComments.length === 0}
                className="flex items-center gap-2"
              >
                <Download className="h-4 w-4" />
                {exporting ? 'Exporting...' : 'Export CSV'}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Search */}
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by comment, name, institution, or county..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Active Filters */}
          {(filters.survey_type || filters.role || filters.dimension) && (
            <div className="mb-4 flex flex-wrap gap-2">
              {filters.survey_type && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                  {filters.survey_type === 'rafsia' ? 'RAFSIA' : 'ISP'}
                  <button
                    onClick={() => handleFilterChange('survey_type', '')}
                    className="hover:text-blue-900"
                  >
                    ×
                  </button>
                </span>
              )}
              {filters.role && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                  {ROLE_OPTIONS.find(r => r.value === filters.role)?.label || filters.role}
                  <button
                    onClick={() => handleFilterChange('role', '')}
                    className="hover:text-purple-900"
                  >
                    ×
                  </button>
                </span>
              )}
              {filters.dimension && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm">
                  {DIMENSION_OPTIONS.find(d => d.value === filters.dimension)?.label || filters.dimension}
                  <button
                    onClick={() => handleFilterChange('dimension', '')}
                    className="hover:text-orange-900"
                  >
                    ×
                  </button>
                </span>
              )}
              <Button variant="outline" size="sm" onClick={clearFilters}>
                Clear All
              </Button>
            </div>
          )}

          {/* Comments List */}
          {filteredComments.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <MessageSquare className="h-12 w-12 mx-auto mb-4 text-gray-400" />
              <p className="text-lg font-medium mb-2">No comments found</p>
              <p className="text-sm">
                {searchTerm || Object.values(filters).some(Boolean)
                  ? 'Try adjusting your search or filters.'
                  : 'No dimension comments have been submitted yet.'}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredComments.map((comment) => (
                <div
                  key={comment.id}
                  className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow bg-white"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getDimensionColor(comment.dimension)}`}>
                          {comment.dimension_label}
                        </span>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          comment.submission.survey_type === 'rafsia'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-purple-100 text-purple-800'
                        }`}>
                          {comment.submission.survey_type_display}
                        </span>
                        <span className="px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded-full">
                          {comment.submission.role}
                        </span>
                      </div>
                      <p className="text-gray-900 mb-3 whitespace-pre-wrap">{comment.comment}</p>
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span className="inline-flex items-center gap-1">
                          <User className="h-3 w-3" />
                          {comment.submission.name || 'Anonymous'}
                        </span>
                        {comment.submission.institution_name_display && (
                          <span className="inline-flex items-center gap-1">
                            <Building2 className="h-3 w-3" />
                            {comment.submission.institution_name_display}
                          </span>
                        )}
                        <span>{comment.submission.county}</span>
                        <span>{new Date(comment.created_at).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Filters Modal */}
      <Modal
        isOpen={showFilters}
        onClose={() => setShowFilters(false)}
        title="Filter Comments"
      >
        <div className="space-y-4">
          <Select
            label="Survey Type"
            value={filters.survey_type}
            onChange={(e) => handleFilterChange('survey_type', e.target.value)}
            options={[
              { value: '', label: 'All Survey Types' },
              { value: 'rafsia', label: 'RAFSIA Assessment' },
              { value: 'isp', label: 'ISP Assessment' },
            ]}
          />
          <Select
            label="Role"
            value={filters.role}
            onChange={(e) => handleFilterChange('role', e.target.value)}
            options={ROLE_OPTIONS}
          />
          <Select
            label="Dimension"
            value={filters.dimension}
            onChange={(e) => handleFilterChange('dimension', e.target.value)}
            options={DIMENSION_OPTIONS}
          />
        </div>
        <div className="flex justify-end space-x-4 mt-6">
          <Button variant="outline" onClick={() => setShowFilters(false)}>
            Cancel
          </Button>
          <Button onClick={() => setShowFilters(false)}>Apply Filters</Button>
        </div>
      </Modal>
    </div>
  );
}

