import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Copy, Eye } from 'lucide-react';

interface Survey {
  id: number;
  title: string;
  description: string;
  status: 'active' | 'draft' | 'archived';
  created_at: string;
  responses_count: number;
}

const SurveysTab: React.FC = () => {
  const [surveys, setSurveys] = useState<Survey[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingSurvey, setEditingSurvey] = useState<Survey | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'draft' as 'active' | 'draft' | 'archived'
  });

  useEffect(() => {
    loadSurveys();
  }, []);

  const loadSurveys = async () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      const mockData: Survey[] = [
        {
          id: 1,
          title: 'RAFSIA Readiness Assessment 2025',
          description: 'Comprehensive satellite internet adoption readiness assessment',
          status: 'active',
          created_at: '2025-01-01T00:00:00Z',
          responses_count: 45
        },
        {
          id: 2,
          title: 'Pilot Assessment - Kakamega Region',
          description: 'Regional pilot study for satellite internet readiness',
          status: 'draft',
          created_at: '2025-01-10T00:00:00Z',
          responses_count: 12
        }
      ];
      setSurveys(mockData);
      setLoading(false);
    }, 1000);
  };

  const handleCreateSurvey = () => {
    setEditingSurvey(null);
    setFormData({ title: '', description: '', status: 'draft' });
    setShowCreateModal(true);
  };

  const handleEditSurvey = (survey: Survey) => {
    setEditingSurvey(survey);
    setFormData({
      title: survey.title,
      description: survey.description,
      status: survey.status
    });
    setShowCreateModal(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingSurvey) {
      // Update existing survey
      setSurveys(prev => prev.map(s => 
        s.id === editingSurvey.id 
          ? { ...s, ...formData }
          : s
      ));
    } else {
      // Create new survey
      const newSurvey: Survey = {
        id: Date.now(),
        ...formData,
        created_at: new Date().toISOString(),
        responses_count: 0
      };
      setSurveys(prev => [newSurvey, ...prev]);
    }
    
    setShowCreateModal(false);
    setFormData({ title: '', description: '', status: 'draft' });
  };

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this survey?')) {
      setSurveys(prev => prev.filter(s => s.id !== id));
    }
  };

  const handleDuplicate = (survey: Survey) => {
    const duplicatedSurvey: Survey = {
      ...survey,
      id: Date.now(),
      title: `${survey.title} (Copy)`,
      status: 'draft',
      created_at: new Date().toISOString(),
      responses_count: 0
    };
    setSurveys(prev => [duplicatedSurvey, ...prev]);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'draft': return 'bg-yellow-100 text-yellow-800';
      case 'archived': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Survey Management</h3>
          <p className="text-sm text-gray-600">Create and manage assessment surveys</p>
        </div>
        <button
          onClick={handleCreateSurvey}
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus size={16} className="mr-2" />
          Create New Survey
        </button>
      </div>

      {/* Surveys grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          surveys.map((survey) => (
            <div key={survey.id} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">{survey.title}</h4>
                  <p className="text-sm text-gray-600 mb-3">{survey.description}</p>
                </div>
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(survey.status)}`}>
                  {survey.status}
                </span>
              </div>
              
              <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                <span>{survey.responses_count} responses</span>
                <span>{new Date(survey.created_at).toLocaleDateString()}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <button 
                    onClick={() => handleEditSurvey(survey)}
                    className="p-2 text-gray-400 hover:text-blue-600 rounded-lg hover:bg-blue-50"
                    title="Edit"
                  >
                    <Edit size={16} />
                  </button>
                  <button 
                    onClick={() => handleDuplicate(survey)}
                    className="p-2 text-gray-400 hover:text-green-600 rounded-lg hover:bg-green-50"
                    title="Duplicate"
                  >
                    <Copy size={16} />
                  </button>
                  <button 
                    onClick={() => handleDelete(survey.id)}
                    className="p-2 text-gray-400 hover:text-red-600 rounded-lg hover:bg-red-50"
                    title="Delete"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
                <button className="inline-flex items-center px-3 py-1 text-sm text-blue-600 hover:text-blue-700">
                  <Eye size={14} className="mr-1" />
                  View
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Create/Edit Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {editingSurvey ? 'Edit Survey' : 'Create New Survey'}
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Survey Title
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as any }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="draft">Draft</option>
                  <option value="active">Active</option>
                  <option value="archived">Archived</option>
                </select>
              </div>
              
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  {editingSurvey ? 'Update' : 'Create'} Survey
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SurveysTab;