// 'use client';
// import React from 'react';
// import { Card, CardContent, CardHeader } from '@/components/ui/Card';

// export default function AnswersTab() {
//   return (
//     <Card>
//       <CardHeader>
//         <h3 className="text-lg font-semibold text-gray-900">Answers</h3>
//         <p className="text-sm text-gray-600">Answer sets / options (coming soon)</p>
//       </CardHeader>
//       <CardContent>
//         <div className="text-gray-600">Answer config UI goes here.</div>
//       </CardContent>
//     </Card>
//   );
// }

'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { surveyAPI } from '@/lib/api';
import Button from '@/components/ui/Button';
import Select from '@/components/ui/Select';
import Input from '@/components/ui/Input';
import Modal from '@/components/ui/Modal';
import { Submission, Answer, DimensionComment } from '@/types';
import { FileText, Eye, Loader2 } from 'lucide-react';

const DIMENSION_LABELS: Record<string, string> = {
  technical: 'Technical Readiness',
  economic: 'Economic Readiness',
  socio_cultural: 'Socio-Cultural Readiness',
  environmental: 'Environmental Readiness',
  policy_regulatory: 'Policy & Regulatory Readiness',
  strategic: 'Strategic Readiness',
};

const LIKERT_LABELS: Record<number, string> = {
  1: 'Strongly Disagree',
  2: 'Disagree',
  3: 'Neither Agree nor Disagree',
  4: 'Agree',
  5: 'Strongly Agree',
};

export default function AnswersTab() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [listFilters, setListFilters] = useState({
    survey_type: '',
    role: '',
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [detailError, setDetailError] = useState<string | null>(null);
  const [dimensionFilter, setDimensionFilter] = useState<string>('');
  const [showSubmissionModal, setShowSubmissionModal] = useState(false);

  const fetchSubmissions = async () => {
    try {
      setLoading(true);
      setError(null);
      const params: Record<string, string> = {};
      if (listFilters.survey_type) params.survey_type = listFilters.survey_type;
      if (listFilters.role) params.role = listFilters.role;
      const response = await surveyAPI.getSubmissions(params);
      setSubmissions(response.data || []);
    } catch (err: any) {
      console.error('Error loading submissions:', err);
      setError(err.response?.data?.detail || 'Unable to load submissions.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubmissions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listFilters.survey_type, listFilters.role]);

  const filteredSubmissions = useMemo(() => {
    if (!searchTerm.trim()) return submissions;
    const term = searchTerm.toLowerCase();
    return submissions.filter((submission) => {
      return (
        submission.name?.toLowerCase().includes(term) ||
        submission.role?.toLowerCase().includes(term) ||
        submission.county?.toLowerCase().includes(term) ||
        submission.institution_name_display?.toLowerCase().includes(term)
      );
    });
  }, [submissions, searchTerm]);

  const loadSubmissionDetail = async (id: number) => {
    try {
      setDetailLoading(true);
      setDetailError(null);
      setDimensionFilter('');
      const response = await surveyAPI.getSubmission(String(id));
      setSelectedSubmission(response.data);
    } catch (err: any) {
      console.error('Error loading submission detail:', err);
      setDetailError(err.response?.data?.detail || 'Unable to load submission answers.');
    } finally {
      setDetailLoading(false);
    }
  };

  const handleSelectSubmission = async (submission: Submission) => {
    setShowSubmissionModal(true);
    await loadSubmissionDetail(submission.id);
  };

  const groupedAnswers = useMemo(() => {
    if (!selectedSubmission?.answers) return {};
    return selectedSubmission.answers.reduce((acc, answer) => {
      const dimensionKey = answer.dimension || 'uncategorized';
      if (!acc[dimensionKey]) acc[dimensionKey] = [];
      acc[dimensionKey].push(answer);
      return acc;
    }, {} as Record<string, Answer[]>);
  }, [selectedSubmission]);

  const dimensionComments = useMemo(() => {
    const map: Record<string, DimensionComment> = {};
    selectedSubmission?.dimension_comments?.forEach((comment) => {
      map[comment.dimension] = comment;
    });
    return map;
  }, [selectedSubmission]);

  const availableDimensions = useMemo(() => {
    return Object.keys(groupedAnswers).filter((key) => key !== 'uncategorized');
  }, [groupedAnswers]);

  const formatSubmittedAt = (dateString?: string) => {
    if (!dateString) return '—';
    return new Date(dateString).toLocaleString();
  };

  const formatAnswer = (answer: Answer) => {
    if (answer.value !== undefined && answer.value !== null) {
      const numericValue = Number(answer.value);
      const likertLabel = LIKERT_LABELS[numericValue];
      if (!Number.isNaN(numericValue) && likertLabel) {
        return `${likertLabel} (${numericValue})`;
      }
      return numericValue.toString();
    }
    return '—';
  };

  const renderDimensionCard = (dimension: string, answers: Answer[]) => {
    if (dimensionFilter && dimension !== dimensionFilter) return null;
    const label = DIMENSION_LABELS[dimension] || dimension;
    const comment = dimensionComments[dimension];

    return (
      <div key={dimension} className="border border-gray-200 rounded-lg overflow-hidden">
        <div className="px-4 py-3 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
          <div>
            <h4 className="text-sm font-semibold text-gray-900">{label}</h4>
            <p className="text-xs text-gray-500">{answers.length} response(s)</p>
          </div>
        </div>
        <div className="divide-y divide-gray-100">
          {answers.map((answer) => (
            <div key={answer.question} className="px-4 py-3">
              <p className="text-sm font-medium text-gray-900">{answer.question_text}</p>
              <p className="mt-2 text-sm text-gray-700 bg-gray-100 px-3 py-2 rounded-lg inline-block">
                {formatAnswer(answer)}
              </p>
            </div>
          ))}
        </div>
        <div className="px-4 py-3 bg-gray-50">
          <h5 className="text-xs font-semibold text-gray-700 uppercase tracking-wide">
            Qualitative Comment
          </h5>
          <p className="mt-2 text-sm text-gray-600 whitespace-pre-wrap">
            {comment?.comment || 'No comment provided for this dimension.'}
          </p>
        </div>
      </div>
    );
  };

    return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Survey Answers</h3>
              <p className="text-sm text-gray-600">
                Review respondent answers and qualitative comments for each dimension.
              </p>
            </div>
            <div className="flex items-center gap-3 w-full md:w-auto">
              <Input
                label=""
                placeholder="Search respondent, institution, county..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Button variant="outline" onClick={fetchSubmissions}>
                <Loader2 className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Select
              label="Survey Type"
              value={listFilters.survey_type}
              onChange={(e) =>
                setListFilters((prev) => ({ ...prev, survey_type: e.target.value }))
              }
              options={[
                { value: '', label: 'All Types' },
                { value: 'rafsia', label: 'RAFSIA Assessment' },
                { value: 'isp', label: 'ISP Assessment' },
              ]}
            />
            <Select
              label="Role"
              value={listFilters.role}
              onChange={(e) => setListFilters((prev) => ({ ...prev, role: e.target.value }))}
              options={[
                { value: '', label: 'All Roles' },
                { value: 'lecturer', label: 'Lecturer' },
                { value: 'it_support', label: 'IT Support' },
                { value: 'admin', label: 'Administrator' },
                { value: 'principal', label: 'Principal' },
                { value: 'student', label: 'Student' },
                { value: 'service_provider', label: 'Service Provider' },
              ]}
            />
          </div>

          {loading ? (
            <div className="py-12 text-center text-gray-500">
              <div className="flex items-center justify-center mb-3">
                <Loader2 className="h-6 w-6 animate-spin text-blue-500" />
              </div>
              Loading submissions…
            </div>
          ) : error ? (
            <div className="py-8 text-center text-red-600">{error}</div>
          ) : filteredSubmissions.length === 0 ? (
            <div className="py-12 text-center text-gray-500">
              No submissions found with the selected filters.
            </div>
          ) : (
            <div className="overflow-x-auto border border-gray-200 rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Respondent
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Role
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Survey
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Institution / County
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Overall Score
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Submitted
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredSubmissions.map((submission) => (
                    <tr key={submission.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm text-gray-900">
                        {submission.name || 'Anonymous'}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600 capitalize">
                        {submission.role?.replace('_', ' ') || '—'}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            submission.survey_type === 'rafsia'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-purple-100 text-purple-800'
                          }`}
                        >
                          {submission.survey_type === 'rafsia' ? 'RAFSIA' : 'ISP'}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        <div>{submission.institution_name_display || '—'}</div>
                        <div className="text-xs text-gray-400">{submission.county || '—'}</div>
                      </td>
                      <td className="px-4 py-3 text-sm font-semibold text-gray-900">
                        {Math.round(submission.overall_score ?? 0)}%
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        {formatSubmittedAt(submission.submitted_at)}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleSelectSubmission(submission)}
                          className="inline-flex items-center gap-1"
                        >
                          <Eye className="h-4 w-4" />
                          View Answers
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      <Modal
        isOpen={showSubmissionModal}
        onClose={() => {
          setShowSubmissionModal(false);
          setSelectedSubmission(null);
        }}
        title="Submission Answers"
        size="xl"
      >
        {detailLoading ? (
          <div className="py-12 text-center text-gray-500">
            <Loader2 className="h-6 w-6 animate-spin mx-auto text-blue-500" />
            <p className="mt-3">Loading submission answers…</p>
          </div>
        ) : detailError ? (
          <div className="py-8 text-center text-red-600">{detailError}</div>
        ) : !selectedSubmission ? (
          <div className="py-8 text-center text-gray-500">
            Select a submission to review answers.
          </div>
        ) : (
          <div className="space-y-6">
            <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
              <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                <div>
                  <h4 className="text-base font-semibold text-gray-900">
                    {selectedSubmission.name || 'Anonymous Respondent'}
                    </h4>
                  <p className="text-sm text-gray-600 capitalize">
                    {selectedSubmission.role?.replace('_', ' ')} •{' '}
                    {selectedSubmission.survey_type === 'rafsia' ? 'RAFSIA' : 'ISP'} Survey
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    {selectedSubmission.institution_name_display || selectedSubmission.institution_name || '—'}{' '}
                    • {selectedSubmission.county || '—'}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-center">
                    <p className="text-xs uppercase text-gray-500">Overall Score</p>
                    <p className="text-2xl font-semibold text-blue-600">
                      {Math.round(selectedSubmission.overall_score ?? 0)}%
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      window.open(`/results/${selectedSubmission.id}`, '_blank', 'noopener')
                    }
                    className="inline-flex items-center gap-2"
                  >
                    <FileText className="h-4 w-4" />
                    Full Report
                  </Button>
                </div>
              </div>
              <p className="text-xs text-gray-400 mt-3">
                Submitted {formatSubmittedAt(selectedSubmission.submitted_at)}
              </p>
          </div>

            <Select
              label="Filter by Dimension"
              value={dimensionFilter}
              onChange={(e) => setDimensionFilter(e.target.value)}
              options={[
                { value: '', label: 'All Dimensions' },
                ...availableDimensions.map((key) => ({
                  value: key,
                  label: DIMENSION_LABELS[key] || key,
                })),
              ]}
            />

            {selectedSubmission.answers?.length ? (
              <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-1">
                {availableDimensions.length === 0 && groupedAnswers['uncategorized']
                  ? renderDimensionCard('uncategorized', groupedAnswers['uncategorized'])
                  : availableDimensions.map((dimension) =>
                      renderDimensionCard(dimension, groupedAnswers[dimension])
                    )}
              </div>
            ) : (
              <div className="py-8 text-center text-gray-500">
                No answers recorded for this submission.
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
}