'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { PlusCircle, RefreshCcw, Calendar, ClipboardList } from 'lucide-react';
import { surveyAPI } from '@/lib/api';
import { Project } from '@/types';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Modal from '@/components/ui/Modal';

type SurveyForm = {
  name: string;
  description: string;
  survey_type: 'rafsia' | 'isp';
  start_date: string;
  end_date: string;
};

const defaultForm: SurveyForm = {
  name: '',
  description: '',
  survey_type: 'rafsia',
  start_date: '',
  end_date: '',
};

export default function SurveysTab() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [formData, setFormData] = useState<SurveyForm>(defaultForm);
  const [submitting, setSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      setLoading(true);
      const response = await surveyAPI.getProjects();
      setProjects(response.data);
    } catch (error) {
      console.error('Error loading surveys:', error);
      alert('Unable to load surveys. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const refreshProjects = async () => {
    try {
      setRefreshing(true);
      await loadProjects();
    } finally {
      setRefreshing(false);
    }
  };

  const handleInputChange = (field: keyof SurveyForm, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (formErrors[field]) {
      setFormErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!formData.name.trim()) errors.name = 'Survey name is required';
    if (!formData.start_date) errors.start_date = 'Start date is required';
    if (formData.end_date && formData.end_date < formData.start_date) {
      errors.end_date = 'End date cannot be before start date';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const resetForm = () => {
    setFormData(defaultForm);
    setFormErrors({});
  };

  const handleCreateSurvey = async () => {
    if (!validateForm()) return;
    try {
      setSubmitting(true);
      await surveyAPI.createProject({
        name: formData.name.trim(),
        description: formData.description.trim(),
        survey_type: formData.survey_type,
        start_date: formData.start_date,
        end_date: formData.end_date || null,
      });
      await loadProjects();
      resetForm();
      setShowCreateModal(false);
      alert('Survey created successfully.');
    } catch (error: any) {
      console.error('Error creating survey:', error);
      const message =
        error?.response?.data?.detail ||
        'Unable to create survey. Please verify the details and try again.';
      alert(message);
    } finally {
      setSubmitting(false);
    }
  };

  const surveyStats = useMemo(() => {
    const total = projects.length;
    const rafsia = projects.filter((p) => p.survey_type === 'rafsia').length;
    const isp = projects.filter((p) => p.survey_type === 'isp').length;
    return { total, rafsia, isp };
  }, [projects]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">Survey Manager</h2>
          <p className="text-sm text-gray-600">
            Create and manage assessments available to respondents.
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            onClick={refreshProjects}
            disabled={refreshing}
            className="flex items-center space-x-2"
          >
            <RefreshCcw size={16} className={refreshing ? 'animate-spin' : ''} />
            <span>{refreshing ? 'Refreshing…' : 'Refresh'}</span>
          </Button>
          <Button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center space-x-2"
          >
            <PlusCircle size={16} />
            <span>Create Survey</span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="flex items-center p-6">
            <ClipboardList className="h-10 w-10 text-blue-600" />
            <div className="ml-4">
              <p className="text-sm text-gray-500">Total Surveys</p>
              <p className="text-2xl font-semibold text-gray-900">{surveyStats.total}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center p-6">
            <Calendar className="h-10 w-10 text-emerald-600" />
            <div className="ml-4">
              <p className="text-sm text-gray-500">RAFSIA Assessments</p>
              <p className="text-2xl font-semibold text-gray-900">{surveyStats.rafsia}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center p-6">
            <Calendar className="h-10 w-10 text-purple-600" />
            <div className="ml-4">
              <p className="text-sm text-gray-500">ISP Assessments</p>
              <p className="text-2xl font-semibold text-gray-900">{surveyStats.isp}</p>
            </div>
          </CardContent>
        </Card>
      </div>

    <Card>
      <CardHeader>
          <h3 className="text-lg font-semibold text-gray-900">Active Surveys</h3>
          <p className="text-sm text-gray-600">
            {loading ? 'Loading surveys…' : `${projects.length} survey(s) configured`}
          </p>
      </CardHeader>
      <CardContent>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Survey
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Start Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    End Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Description
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {loading ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-6 text-center text-sm text-gray-500">
                      Loading surveys…
                    </td>
                  </tr>
                ) : projects.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-6 text-center text-sm text-gray-500">
                      No surveys available yet. Create your first survey to get started.
                    </td>
                  </tr>
                ) : (
                  projects.map((survey) => (
                    <tr key={survey.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        <div>{survey.name}</div>
                        <div className="text-xs text-gray-500">
                          Created {new Date(survey.start_date).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded-full ${
                            survey.survey_type === 'rafsia'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-purple-100 text-purple-800'
                          }`}
                        >
                          {survey.survey_type === 'rafsia' ? 'RAFSIA' : 'ISP'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {survey.start_date ? new Date(survey.start_date).toLocaleDateString() : '—'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {survey.end_date ? new Date(survey.end_date).toLocaleDateString() : 'Open'}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600 max-w-xs">
                        {survey.description || <span className="text-gray-400">No description</span>}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
      </CardContent>
    </Card>

      <Modal
        isOpen={showCreateModal}
        onClose={() => {
          if (!submitting) {
            setShowCreateModal(false);
            resetForm();
          }
        }}
        title="Create New Survey"
      >
        <div className="space-y-4">
          <Input
            label="Survey Name *"
            type="text"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            error={formErrors.name}
            placeholder="e.g. 2025 University Readiness Assessment"
          />
          <Select
            label="Survey Type *"
            value={formData.survey_type}
            onChange={(e) =>
              handleInputChange('survey_type', e.target.value as SurveyForm['survey_type'])
            }
            options={[
              { value: 'rafsia', label: 'RAFSIA Assessment' },
              { value: 'isp', label: 'ISP Assessment' },
            ]}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Start Date *"
              type="date"
              value={formData.start_date}
              onChange={(e) => handleInputChange('start_date', e.target.value)}
              error={formErrors.start_date}
            />
            <Input
              label="End Date"
              type="date"
              value={formData.end_date}
              onChange={(e) => handleInputChange('end_date', e.target.value)}
              error={formErrors.end_date}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              rows={4}
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Provide context, goals or instructions for this survey."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm text-gray-700"
            />
          </div>
        </div>
        <div className="flex justify-end space-x-4 mt-6">
          <Button
            variant="outline"
            onClick={() => {
              if (!submitting) {
                setShowCreateModal(false);
                resetForm();
              }
            }}
          >
            Cancel
          </Button>
          <Button onClick={handleCreateSurvey} disabled={submitting}>
            {submitting ? 'Creating…' : 'Create Survey'}
          </Button>
        </div>
      </Modal>
    </div>
  );
}
