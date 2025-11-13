'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { surveyAPI } from '@/lib/api';
import { Search, Download, Users, Mail, Phone, MapPin, Building2, Filter } from 'lucide-react';
import Button from '@/components/ui/Button';
import Select from '@/components/ui/Select';
import Input from '@/components/ui/Input';

interface Respondent {
  name: string;
  email: string;
  phone: string;
  role: string;
  gender: string;
  county: string;
  institution_name: string;
  survey_type: 'rafsia' | 'isp';
  submission_count: number;
  latest_submission: string;
}

const ROLE_OPTIONS = [
  { value: '', label: 'All Roles' },
  { value: 'lecturer', label: 'Lecturer' },
  { value: 'it_support', label: 'IT Support' },
  { value: 'admin', label: 'Administrator' },
  { value: 'principal', label: 'Principal' },
  { value: 'student', label: 'Student' },
  { value: 'service_provider', label: 'Service Provider' },
];

export default function UsersTab() {
  const [respondents, setRespondents] = useState<Respondent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('');
  const [exporting, setExporting] = useState(false);

  const fetchRespondents = async () => {
    try {
      setLoading(true);
      setError(null);

      const filters: Record<string, string> = {};
      if (filterRole) filters.role = filterRole;
      if (searchTerm.trim()) filters.search = searchTerm.trim();

      const response = await surveyAPI.getRespondents(filters);
      setRespondents(response.data.results || []);
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || 'Failed to fetch respondents');
      console.error('Error fetching respondents:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRespondents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterRole, searchTerm]);

  const handleExport = async () => {
    try {
      setExporting(true);
      const filters: Record<string, string> = {};
      if (filterRole) filters.role = filterRole;
      if (searchTerm.trim()) filters.search = searchTerm.trim();

      const response = await surveyAPI.exportRespondentsCSV(filters);
      const blob = new Blob([response.data], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      const dateStr = new Date().toISOString().split('T')[0];
      a.download = `respondents_${dateStr}.csv`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err: any) {
      console.error('Error exporting respondents:', err);
      alert('Error exporting respondents. Please try again.');
    } finally {
      setExporting(false);
    }
  };

  const clearFilters = () => {
    setFilterRole('');
    setSearchTerm('');
  };

  const getRoleDisplay = (role: string) => {
    return ROLE_OPTIONS.find((r) => r.value === role)?.label || role;
  };

  const stats = {
    total: respondents.length,
    byRole: respondents.reduce((acc, r) => {
      acc[r.role] = (acc[r.role] || 0) + 1;
      return acc;
    }, {} as Record<string, number>),
    withEmail: respondents.filter((r) => r.email).length,
    withPhone: respondents.filter((r) => r.phone).length,
  };

  if (loading && respondents.length === 0) {
    return (
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold text-gray-900">Survey Respondents</h3>
          <p className="text-sm text-gray-600">Loading respondents...</p>
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
          <h3 className="text-lg font-semibold text-gray-900">Survey Respondents</h3>
          <p className="text-sm text-red-600">Error loading respondents</p>
        </CardHeader>
        <CardContent>
          <div className="bg-red-50 border border-red-200 rounded-md p-4">
            <p className="text-red-800">{error}</p>
            <Button onClick={fetchRespondents} className="mt-2">
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
                <p className="text-sm font-medium text-gray-600">Total Respondents</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.total}</p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">With Email</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.withEmail}</p>
              </div>
              <Mail className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">With Phone</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.withPhone}</p>
              </div>
              <Phone className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Unique Roles</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {Object.keys(stats.byRole).length}
                </p>
              </div>
              <Filter className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Actions */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Survey Respondents</h3>
              <p className="text-sm text-gray-600">
                {respondents.length} respondent{respondents.length !== 1 ? 's' : ''} found
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                onClick={handleExport}
                disabled={exporting || respondents.length === 0}
                className="flex items-center gap-2"
              >
                <Download className="h-4 w-4" />
                {exporting ? 'Exporting...' : 'Export CSV'}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Search and Filters */}
          <div className="mb-6 space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by name, email, institution, or county..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="min-w-[200px]">
                <select
                  value={filterRole}
                  onChange={(e) => setFilterRole(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {ROLE_OPTIONS.map((role) => (
                    <option key={role.value} value={role.value}>
                      {role.label}
                    </option>
                  ))}
                </select>
              </div>
              {(filterRole || searchTerm) && (
                <Button variant="outline" onClick={clearFilters}>
                  Clear Filters
                </Button>
              )}
            </div>
          </div>

          {/* Respondents Table */}
          {respondents.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <Users className="h-12 w-12 mx-auto mb-4 text-gray-400" />
              <p className="text-lg font-medium mb-2">No respondents found</p>
              <p className="text-sm">
                {searchTerm || filterRole
                  ? 'Try adjusting your search or filters.'
                  : 'No survey respondents have been recorded yet.'}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Contact
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Role
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Location
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Institution
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Survey Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Submissions
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Latest
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {respondents.map((respondent, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{respondent.name}</div>
                        {respondent.gender && (
                          <div className="text-xs text-gray-500">{respondent.gender}</div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {respondent.email && (
                            <div className="flex items-center gap-1">
                              <Mail className="h-3 w-3 text-gray-400" />
                              <span>{respondent.email}</span>
                            </div>
                          )}
                          {respondent.phone && (
                            <div className="flex items-center gap-1 mt-1">
                              <Phone className="h-3 w-3 text-gray-400" />
                              <span>{respondent.phone}</span>
                            </div>
                          )}
                          {!respondent.email && !respondent.phone && (
                            <span className="text-gray-400 text-xs">No contact info</span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 text-xs font-medium bg-purple-100 text-purple-800 rounded-full">
                          {getRoleDisplay(respondent.role)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-1 text-sm text-gray-900">
                          <MapPin className="h-3 w-3 text-gray-400" />
                          <span>{respondent.county}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1 text-sm text-gray-900">
                          {respondent.institution_name ? (
                            <>
                              <Building2 className="h-3 w-3 text-gray-400" />
                              <span className="max-w-xs truncate">{respondent.institution_name}</span>
                            </>
                          ) : (
                            <span className="text-gray-400 text-xs">N/A</span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded-full ${
                            respondent.survey_type === 'rafsia'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-purple-100 text-purple-800'
                          }`}
                        >
                          {respondent.survey_type.toUpperCase()}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <span className="font-medium">{respondent.submission_count}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {respondent.latest_submission
                          ? new Date(respondent.latest_submission).toLocaleDateString()
                          : 'N/A'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
