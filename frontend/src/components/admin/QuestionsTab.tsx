'use client';
import React, { useEffect, useMemo, useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { surveyAPI } from '@/lib/api';
import { Search, Plus, Edit, Trash2, Layers, Users } from 'lucide-react';
import Button from '@/components/ui/Button';
import Select from '@/components/ui/Select';
import Input from '@/components/ui/Input';
import Modal from '@/components/ui/Modal';

interface Question {
  id: number;
  text: string;
  survey_type: 'rafsia' | 'isp';
  role?: string;
  dimension?: string;
  order?: number;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
}

type SurveyKey = 'rafsia' | 'isp';

const RAFSIA_DIMENSIONS = [
  { value: 'technical', label: 'Technical Readiness' },
  { value: 'economic', label: 'Economic Readiness' },
  { value: 'socio_cultural', label: 'Socio-Cultural Readiness' },
  { value: 'environmental', label: 'Environmental Readiness' },
  { value: 'policy_regulatory', label: 'Policy & Regulatory Readiness' },
];

const ISP_DIMENSIONS = [
  { value: 'technical', label: 'Technical Readiness' },
  { value: 'economic', label: 'Economic Readiness' },
  { value: 'policy_regulatory', label: 'Policy & Regulatory Readiness' },
  { value: 'socio_cultural', label: 'Socio-Cultural Readiness' },
  { value: 'environmental', label: 'Environmental Readiness' },
  { value: 'strategic', label: 'Strategic & Future Outlook' },
];

const ROLE_OPTIONS = [
  { value: 'ihl', label: 'Institution of Higher Learning' },
  { value: 'isp', label: 'Internet Service Provider' },
  { value: 'both', label: 'Both (All Respondents)' },
];

export default function QuestionsTab() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState<string>('');
  const [filterDimension, setFilterDimension] = useState<string>('');
  const [activeSurvey, setActiveSurvey] = useState<SurveyKey>('rafsia');
  const [showFormModal, setShowFormModal] = useState(false);
  const [saving, setSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingQuestionId, setEditingQuestionId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    survey_type: 'rafsia' as SurveyKey,
    dimension: '',
    role: '',
    text: '',
    order: '',
    is_active: true,
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const fetchQuestions = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await surveyAPI.getQuestions(
        filterRole || undefined,
        activeSurvey,
        filterDimension || undefined
      );

      setQuestions(response.data || []);
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || 'Failed to fetch questions');
      console.error('Error fetching questions:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterRole, filterDimension, activeSurvey]);

  const filteredQuestions = questions.filter((question) =>
    question.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
    question.role?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    question.dimension?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const uniqueRoles = [...new Set(questions.map((q) => q.role).filter(Boolean))];

  const dimensionOptions = useMemo(() => {
    return (formData.survey_type === 'rafsia' ? RAFSIA_DIMENSIONS : ISP_DIMENSIONS).map((dim) => ({
      value: dim.value,
      label: dim.label,
    }));
  }, [formData.survey_type]);

  const activeSurveyDimensions = useMemo(() => {
    return activeSurvey === 'rafsia' ? RAFSIA_DIMENSIONS : ISP_DIMENSIONS;
  }, [activeSurvey]);

  const resetForm = () => {
    setFormData({
      survey_type: activeSurvey,
      dimension: '',
      role: '',
      text: '',
      order: '',
      is_active: true,
    });
    setFormErrors({});
    setIsEditing(false);
    setEditingQuestionId(null);
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!formData.text.trim()) errors.text = 'Question text is required';
    if (!formData.role) errors.role = 'Role classification is required';
    if (!formData.dimension) errors.dimension = 'Dimension is required';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmitQuestion = async () => {
    if (!validateForm()) return;
    try {
      setSaving(true);
      const payload = {
        text: formData.text.trim(),
        role: formData.role,
        dimension: formData.dimension,
        survey_type: formData.survey_type,
        order: formData.order ? Number(formData.order) : undefined,
        is_active: formData.is_active,
      };

      if (isEditing && editingQuestionId) {
        await surveyAPI.updateQuestion(editingQuestionId, payload);
        alert('Question updated successfully.');
      } else {
        await surveyAPI.createQuestion(payload);
        alert('Question created successfully.');
      }

      await fetchQuestions();
      setShowFormModal(false);
      resetForm();
    } catch (err: any) {
      console.error('Error saving question:', err);
      const message =
        err?.response?.data?.detail ||
        'Unable to save question. Please check the form values.';
      alert(message);
    } finally {
      setSaving(false);
    }
  };

  const handleInputChange = (field: keyof typeof formData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (formErrors[field]) {
      setFormErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold text-gray-900">Questions</h3>
          <p className="text-sm text-gray-600">Loading questions...</p>
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
          <h3 className="text-lg font-semibold text-gray-900">Questions</h3>
          <p className="text-sm text-gray-600">Error loading questions</p>
        </CardHeader>
        <CardContent>
          <div className="bg-red-50 border border-red-200 rounded-md p-4">
            <p className="text-red-800">{error}</p>
            <button
              onClick={fetchQuestions}
              className="mt-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Questions</h3>
              <p className="text-sm text-gray-600">
                Manage survey questions ({questions.length} in {activeSurvey.toUpperCase()} survey)
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Select
                label=""
                value={activeSurvey}
                onChange={(e) => {
                  const selected = e.target.value as SurveyKey;
                  setActiveSurvey(selected);
                  setFilterDimension('');
                  resetForm();
                }}
                options={[
                  { value: 'rafsia', label: 'RAFSIA Survey' },
                  { value: 'isp', label: 'ISP Survey' },
                ]}
              />
              <Button
                onClick={() => {
                  resetForm();
                  setShowFormModal(true);
                }}
                className="inline-flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Add Question
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <div className="mb-6 space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search questions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="min-w-[150px]">
                <select
                  value={filterRole}
                  onChange={(e) => setFilterRole(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">All Roles</option>
                  {uniqueRoles.map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
              </div>

              <div className="min-w-[150px]">
                <select
                  value={filterDimension}
                  onChange={(e) => setFilterDimension(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">All Dimensions</option>
                  {activeSurveyDimensions.map((dimension) => (
                    <option key={dimension.value} value={dimension.value}>
                      {dimension.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {filteredQuestions.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              {searchTerm || filterRole || filterDimension
                ? 'No questions match your current filters.'
                : 'No questions found.'}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredQuestions.map((question) => (
                <div
                  key={question.id}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm font-medium text-blue-600">ID: {question.id}</span>
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${
                            question.is_active
                              ? 'bg-green-100 text-green-800'
                              : 'bg-gray-100 text-gray-600'
                          }`}
                        >
                          {question.is_active ? 'Active' : 'Inactive'}
                        </span>
                        {question.role && (
                          <span className="px-2 py-1 text-xs bg-purple-100 text-purple-800 rounded-full">
                            {question.role}
                          </span>
                        )}
                        {question.dimension && (
                          <span className="px-2 py-1 text-xs bg-orange-100 text-orange-800 rounded-full">
                            {(activeSurvey === 'rafsia'
                              ? RAFSIA_DIMENSIONS
                              : ISP_DIMENSIONS
                            ).find((d) => d.value === question.dimension)?.label || question.dimension}
                          </span>
                        )}
                      </div>

                      <p className="text-gray-900 mb-2">{question.text}</p>

                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span className="inline-flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          {question.role || 'N/A'}
                        </span>
                        {question.dimension && (
                          <span className="inline-flex items-center gap-1">
                            <Layers className="h-3 w-3" />
                            {question.dimension}
                          </span>
                        )}
                        {question.order && <span>Order: {question.order}</span>}
                        {question.created_at && (
                          <span>Created: {new Date(question.created_at).toLocaleDateString()}</span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 ml-4">
                      <button
                        className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                        onClick={() => {
                          setIsEditing(true);
                          setEditingQuestionId(question.id);
                          setFormData({
                            survey_type: question.survey_type,
                            dimension: question.dimension || '',
                            role: question.role || '',
                            text: question.text,
                            order: question.order?.toString() || '',
                            is_active: question.is_active,
                          });
                          setFormErrors({});
                          setShowFormModal(true);
                        }}
                        aria-label={`Edit question ${question.id}`}
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                        onClick={async () => {
                          if (
                            window.confirm(
                              'Are you sure you want to delete this question? This action cannot be undone.'
                            )
                          ) {
                            try {
                              await surveyAPI.deleteQuestion(question.id);
                              await fetchQuestions();
                              alert('Question deleted successfully.');
                            } catch (err: any) {
                              console.error('Error deleting question:', err);
                              alert(
                                err?.response?.data?.detail ||
                                  'Unable to delete question. Please try again.'
                              );
                            }
                          }
                        }}
                        aria-label={`Delete question ${question.id}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Modal
        isOpen={showFormModal}
        onClose={() => {
          if (!saving) {
            setShowFormModal(false);
            resetForm();
          }
        }}
        title={isEditing ? 'Edit Question' : 'Add New Question'}
      >
        <div className="space-y-4">
          <Select
            label="Survey Type *"
            value={formData.survey_type}
            onChange={(e) => handleInputChange('survey_type', e.target.value as SurveyKey)}
            options={[
              { value: 'rafsia', label: 'RAFSIA Assessment' },
              { value: 'isp', label: 'ISP Assessment' },
            ]}
          />
          <Select
            label="Dimension *"
            value={formData.dimension}
            onChange={(e) => handleInputChange('dimension', e.target.value)}
            options={dimensionOptions}
            error={formErrors.dimension}
          />
          <Select
            label="Role *"
            value={formData.role}
            onChange={(e) => handleInputChange('role', e.target.value)}
            options={[{ value: '', label: 'Select role...' }, ...ROLE_OPTIONS]}
            error={formErrors.role}
          />
          <Input
            label="Order"
            type="number"
            value={formData.order}
            onChange={(e) => handleInputChange('order', e.target.value)}
            placeholder="Optional ordering index"
            min="0"
          />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Question Text *</label>
            <textarea
              rows={4}
              value={formData.text}
              onChange={(e) => handleInputChange('text', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-gray-700"
              placeholder="Enter the question prompt here..."
            />
            {formErrors.text && <p className="text-sm text-red-600 mt-1">{formErrors.text}</p>}
          </div>
          <div className="flex items-center space-x-2">
            <input
              id="question-active"
              type="checkbox"
              checked={formData.is_active}
              onChange={(e) => handleInputChange('is_active', e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="question-active" className="text-sm text-gray-600">
              Question is active and available to respondents
            </label>
          </div>
        </div>
        <div className="flex justify-end space-x-4 mt-6">
          <Button
            variant="outline"
            onClick={() => {
              if (!saving) {
                setShowFormModal(false);
                resetForm();
              }
            }}
          >
            Cancel
          </Button>
          <Button onClick={handleSubmitQuestion} disabled={saving}>
            {saving ? 'Saving…' : isEditing ? 'Update Question' : 'Save Question'}
          </Button>
        </div>
      </Modal>
    </div>
  );
}