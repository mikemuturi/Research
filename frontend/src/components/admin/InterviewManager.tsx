'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Search, Filter } from 'lucide-react';
import { interviewAPI } from '@/lib/api';
import { InterviewNote } from '@/types';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Modal from '@/components/ui/Modal';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';

const InterviewManager: React.FC = () => {
  const [interviews, setInterviews] = useState<InterviewNote[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingInterview, setEditingInterview] = useState<InterviewNote | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    respondent_type: '',
    dimension: '',
    date_from: '',
    date_to: '',
  });

  const [formData, setFormData] = useState({
    title: '',
    respondent_type: '',
    institution_name: '',
    respondent_name: '',
    respondent_role: '',
    dimension: '',
    question: '',
    response: '',
    key_insights: '',
    interview_date: '',
  });

  useEffect(() => {
    loadInterviews();
  }, [filters, searchTerm]);

  const loadInterviews = async () => {
    try {
      setLoading(true);
      const params = {
        ...filters,
        search: searchTerm || undefined,
      };
      const response = await interviewAPI.getNotes(params);
      setInterviews(response.data);
    } catch (error) {
      console.error('Error loading interviews:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingInterview) {
        await interviewAPI.updateNote(editingInterview.id.toString(), formData);
      } else {
        await interviewAPI.createNote(formData);
      }
      
      setShowModal(false);
      setEditingInterview(null);
      resetForm();
      loadInterviews();
    } catch (error) {
      console.error('Error saving interview:', error);
      alert('Error saving interview. Please try again.');
    }
  };

  const handleEdit = (interview: InterviewNote) => {
    setEditingInterview(interview);
    setFormData({
      title: interview.title,
      respondent_type: interview.respondent_type,
      institution_name: interview.institution_name,
      respondent_name: interview.respondent_name,
      respondent_role: interview.respondent_role,
      dimension: interview.dimension,
      question: interview.question,
      response: interview.response,
      key_insights: interview.key_insights,
      interview_date: interview.interview_date,
    });
    setShowModal(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this interview note?')) return;
    
    try {
      await interviewAPI.deleteNote(id.toString());
      loadInterviews();
    } catch (error) {
      console.error('Error deleting interview:', error);
      alert('Error deleting interview. Please try again.');
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      respondent_type: '',
      institution_name: '',
      respondent_name: '',
      respondent_role: '',
      dimension: '',
      question: '',
      response: '',
      key_insights: '',
      interview_date: '',
    });
  };

  const handleNewInterview = () => {
    setEditingInterview(null);
    resetForm();
    setShowModal(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Interview Management</h2>
          <p className="text-gray-600">Capture and manage qualitative interview data</p>
        </div>
        <Button onClick={handleNewInterview} className="flex items-center space-x-2">
          <Plus size={16} />
          <span>New Interview</span>
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <Input
              placeholder="Search interviews..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1"
            />
            
            <Select
              value={filters.respondent_type}
              onChange={(e) => setFilters(prev => ({ ...prev, respondent_type: e.target.value }))}
              options={[
                { value: '', label: 'All types' },
                { value: 'ihl', label: 'Institution of Higher Learning' },
                { value: 'isp', label: 'Internet Service Provider' },
              ]}
            />
            
            <Select
              value={filters.dimension}
              onChange={(e) => setFilters(prev => ({ ...prev, dimension: e.target.value }))}
              options={[
                { value: '', label: 'All dimensions' },
                { value: 'technical', label: 'Technical' },
                { value: 'economic', label: 'Economic' },
                { value: 'socio_cultural', label: 'Socio-Cultural' },
                { value: 'environmental', label: 'Environmental' },
                { value: 'policy_regulatory', label: 'Policy & Regulatory' },
                { value: 'general', label: 'General' },
              ]}
            />
            
            <Input
              type="date"
              value={filters.date_from}
              onChange={(e) => setFilters(prev => ({ ...prev, date_from: e.target.value }))}
              placeholder="From date"
            />
            
            <Input
              type="date"
              value={filters.date_to}
              onChange={(e) => setFilters(prev => ({ ...prev, date_to: e.target.value }))}
              placeholder="To date"
            />
          </div>
        </CardContent>
      </Card>

      {/* Interviews List */}
      <Card>
        <CardContent>
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-2 text-gray-600">Loading interviews...</p>
            </div>
          ) : interviews.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">No interviews found matching your criteria.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {interviews.map((interview) => (
                <div
                  key={interview.id}
                  className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {interview.title}
                    </h3>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(interview)}
                        className="flex items-center space-x-1"
                      >
                        <Edit size={14} />
                        <span>Edit</span>
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleDelete(interview.id)}
                        className="flex items-center space-x-1"
                      >
                        <Trash2 size={14} />
                        <span>Delete</span>
                      </Button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm mb-3">
                    <div>
                      <span className="text-gray-500">Type:</span>{' '}
                      <span className="font-medium">
                        {interview.respondent_type === 'ihl' ? 'Institution' : 'Service Provider'}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-500">Dimension:</span>{' '}
                      <span className="font-medium capitalize">
                        {interview.dimension.replace('_', ' ')}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-500">Date:</span>{' '}
                      <span className="font-medium">
                        {new Date(interview.interview_date).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  
                  {interview.institution_name && (
                    <p className="text-sm text-gray-600 mb-2">
                      <span className="font-medium">Institution:</span> {interview.institution_name}
                    </p>
                  )}
                  
                  <p className="text-sm text-gray-700 mb-2">
                    <span className="font-medium">Question:</span> {interview.question}
                  </p>
                  
                  <p className="text-sm text-gray-700 mb-2">
                    <span className="font-medium">Response:</span> {interview.response}
                  </p>
                  
                  {interview.key_insights && (
                    <p className="text-sm text-gray-700">
                      <span className="font-medium">Key Insights:</span> {interview.key_insights}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Interview Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={editingInterview ? 'Edit Interview' : 'New Interview'}
        size="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Title *"
            value={formData.title}
            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
            required
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              label="Respondent Type *"
              value={formData.respondent_type}
              onChange={(e) => setFormData(prev => ({ ...prev, respondent_type: e.target.value }))}
              options={[
                { value: '', label: 'Select type...' },
                { value: 'ihl', label: 'Institution of Higher Learning' },
                { value: 'isp', label: 'Internet Service Provider' },
              ]}
              required
            />
            
            <Select
              label="Dimension *"
              value={formData.dimension}
              onChange={(e) => setFormData(prev => ({ ...prev, dimension: e.target.value }))}
              options={[
                { value: '', label: 'Select dimension...' },
                { value: 'technical', label: 'Technical Readiness' },
                { value: 'economic', label: 'Economic Readiness' },
                { value: 'socio_cultural', label: 'Socio-Cultural Readiness' },
                { value: 'environmental', label: 'Environmental Readiness' },
                { value: 'policy_regulatory', label: 'Policy & Regulatory Readiness' },
                { value: 'general', label: 'General' },
              ]}
              required
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Institution Name"
              value={formData.institution_name}
              onChange={(e) => setFormData(prev => ({ ...prev, institution_name: e.target.value }))}
            />
            
            <Input
              label="Interview Date *"
              type="date"
              value={formData.interview_date}
              onChange={(e) => setFormData(prev => ({ ...prev, interview_date: e.target.value }))}
              required
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Respondent Name"
              value={formData.respondent_name}
              onChange={(e) => setFormData(prev => ({ ...prev, respondent_name: e.target.value }))}
            />
            
            <Input
              label="Respondent Role"
              value={formData.respondent_role}
              onChange={(e) => setFormData(prev => ({ ...prev, respondent_role: e.target.value }))}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Question *
            </label>
            <textarea
              value={formData.question}
              onChange={(e) => setFormData(prev => ({ ...prev, question: e.target.value }))}
              rows={3}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Response *
            </label>
            <textarea
              value={formData.response}
              onChange={(e) => setFormData(prev => ({ ...prev, response: e.target.value }))}
              rows={4}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Key Insights
            </label>
            <textarea
              value={formData.key_insights}
              onChange={(e) => setFormData(prev => ({ ...prev, key_insights: e.target.value }))}
              rows={3}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Key themes, insights, or observations from this response..."
            />
          </div>
          
          <div className="flex justify-end space-x-4 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowModal(false)}
            >
              Cancel
            </Button>
            <Button type="submit">
              {editingInterview ? 'Update Interview' : 'Save Interview'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default InterviewManager;