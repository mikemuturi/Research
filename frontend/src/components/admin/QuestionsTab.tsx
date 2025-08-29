'use client';
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { surveyAPI } from '@/lib/api';
import { Search, Filter, Plus, Edit, Trash2 } from 'lucide-react';

interface Question {
  id: number;
  text: string;
  question_type: string;
  role?: string;
  dimension?: string;
  order?: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export default function QuestionsTab() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState<string>('');
  const [filterDimension, setFilterDimension] = useState<string>('');

  // Fetch questions
  const fetchQuestions = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await surveyAPI.getQuestions(
        filterRole || undefined,
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
  }, [filterRole, filterDimension]);

  // Filter questions based on search term
  const filteredQuestions = questions.filter(question =>
    question.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
    question.role?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    question.dimension?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get unique roles and dimensions for filters
  const uniqueRoles = [...new Set(questions.map(q => q.role).filter(Boolean))];
  const uniqueDimensions = [...new Set(questions.map(q => q.dimension).filter(Boolean))];

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
                Manage survey questions ({questions.length} total)
              </p>
            </div>
            <button className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
              <Plus className="h-4 w-4" />
              Add Question
            </button>
          </div>
        </CardHeader>
        
        <CardContent>
          {/* Filters and Search */}
          <div className="mb-6 space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Search */}
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
              
              {/* Role Filter */}
              <div className="min-w-[150px]">
                <select
                  value={filterRole}
                  onChange={(e) => setFilterRole(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">All Roles</option>
                  {uniqueRoles.map(role => (
                    <option key={role} value={role}>{role}</option>
                  ))}
                </select>
              </div>
              
              {/* Dimension Filter */}
              <div className="min-w-[150px]">
                <select
                  value={filterDimension}
                  onChange={(e) => setFilterDimension(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">All Dimensions</option>
                  {uniqueDimensions.map(dimension => (
                    <option key={dimension} value={dimension}>{dimension}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Questions List */}
          {filteredQuestions.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              {searchTerm || filterRole || filterDimension ? 
                'No questions match your current filters.' : 
                'No questions found.'
              }
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
                        <span className="text-sm font-medium text-blue-600">
                          ID: {question.id}
                        </span>
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          question.is_active 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-gray-100 text-gray-600'
                        }`}>
                          {question.is_active ? 'Active' : 'Inactive'}
                        </span>
                        {question.role && (
                          <span className="px-2 py-1 text-xs bg-purple-100 text-purple-800 rounded-full">
                            {question.role}
                          </span>
                        )}
                        {question.dimension && (
                          <span className="px-2 py-1 text-xs bg-orange-100 text-orange-800 rounded-full">
                            {question.dimension}
                          </span>
                        )}
                      </div>
                      
                      <p className="text-gray-900 mb-2">{question.text}</p>
                      
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span>Type: {question.question_type}</span>
                        {question.order && <span>Order: {question.order}</span>}
                        <span>Created: {new Date(question.created_at).toLocaleDateString()}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 ml-4">
                      <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors">
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
    </div>
  );
}