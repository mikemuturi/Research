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
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
// import { surveyAPI } from '@/api'; // Adjust the import path as needed
import { surveyAPI } from '@/lib/api';


interface Answer {
  id: string;
  question_id: string;
  question_text?: string;
  answer_value: string | number | boolean;
  answer_text?: string;
  submission_id: string;
  created_at: string;
  updated_at: string;
}

interface Submission {
  id: string;
  answers: Answer[];
  created_at: string;
  updated_at: string;
  role?: string;
  dimension?: string;
  status?: string;
}

export default function AnswersTab() {
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    role: '',
    dimension: '',
    status: ''
  });

  // Fetch submissions and their answers
  const fetchAnswers = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await surveyAPI.getSubmissions(filters);
      const submissionsData = response.data;
      
      setSubmissions(submissionsData);
      
      // Flatten all answers from all submissions
      const allAnswers: Answer[] = [];
      submissionsData.forEach((submission: Submission) => {
        if (submission.answers && Array.isArray(submission.answers)) {
          submission.answers.forEach((answer: Answer) => {
            allAnswers.push({
              ...answer,
              submission_id: submission.id
            });
          });
        }
      });
      
      setAnswers(allAnswers);
    } catch (err: any) {
      console.error('Error fetching answers:', err);
      setError(err.response?.data?.message || 'Failed to fetch answers');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnswers();
  }, [filters]);

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const formatAnswerValue = (answer: Answer) => {
    if (answer.answer_text) return answer.answer_text;
    if (typeof answer.answer_value === 'boolean') {
      return answer.answer_value ? 'Yes' : 'No';
    }
    return String(answer.answer_value);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold text-gray-900">Answers</h3>
          <p className="text-sm text-gray-600">Loading answers...</p>
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
          <h3 className="text-lg font-semibold text-gray-900">Answers</h3>
          <p className="text-sm text-red-600">Error loading answers</p>
        </CardHeader>
        <CardContent>
          <div className="text-red-600 py-4">
            {error}
            <button 
              onClick={fetchAnswers}
              className="ml-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Retry
            </button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <h3 className="text-lg font-semibold text-gray-900">Answers</h3>
        <p className="text-sm text-gray-600">
          {answers.length} answers from {submissions.length} submissions
        </p>
      </CardHeader>
      <CardContent>
        {/* Filters */}
        <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Role
            </label>
            <select
              value={filters.role}
              onChange={(e) => handleFilterChange('role', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Roles</option>
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Dimension
            </label>
            <select
              value={filters.dimension}
              onChange={(e) => handleFilterChange('dimension', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Dimensions</option>
              <option value="technical">Technical</option>
              <option value="social">Social</option>
              <option value="cognitive">Cognitive</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <select
              value={filters.status}
              onChange={(e) => handleFilterChange('status', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Status</option>
              <option value="completed">Completed</option>
              <option value="draft">Draft</option>
              <option value="submitted">Submitted</option>
            </select>
          </div>
        </div>

        {/* Answers Display */}
        {answers.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No answers found with the current filters.
          </div>
        ) : (
          <div className="space-y-4">
            {answers.map((answer) => (
              <div 
                key={`${answer.submission_id}-${answer.question_id}`}
                className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50"
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 mb-1">
                      {answer.question_text || `Question ID: ${answer.question_id}`}
                    </h4>
                    <p className="text-gray-700 bg-gray-100 px-3 py-2 rounded">
                      {formatAnswerValue(answer)}
                    </p>
                  </div>
                  <div className="text-sm text-gray-500 ml-4">
                    <div>Submission: {answer.submission_id}</div>
                    <div>{formatDate(answer.created_at)}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Summary Stats */}
        {answers.length > 0 && (
          <div className="mt-8 pt-6 border-t border-gray-200">
            <h4 className="font-medium text-gray-900 mb-3">Summary</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="bg-blue-50 p-3 rounded">
                <div className="text-blue-600 font-medium">Total Answers</div>
                <div className="text-blue-900 text-lg">{answers.length}</div>
              </div>
              <div className="bg-green-50 p-3 rounded">
                <div className="text-green-600 font-medium">Submissions</div>
                <div className="text-green-900 text-lg">{submissions.length}</div>
              </div>
              <div className="bg-purple-50 p-3 rounded">
                <div className="text-purple-600 font-medium">Latest Answer</div>
                <div className="text-purple-900">
                  {answers.length > 0 ? formatDate(
                    Math.max(...answers.map(a => new Date(a.created_at).getTime())).toString()
                  ) : 'N/A'}
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}