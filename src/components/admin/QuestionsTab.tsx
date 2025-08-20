import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Search, Filter } from 'lucide-react';

interface Question {
  id: number;
  text: string;
  dimension: string;
  role: string;
  order: number;
  is_active: boolean;
}

const QuestionsTab: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    dimension: '',
    role: '',
    is_active: ''
  });
  
  const [formData, setFormData] = useState({
    text: '',
    dimension: 'technical',
    role: 'both',
    order: 1,
    is_active: true
  });

  const dimensions = [
    { value: 'technical', label: 'Technical Readiness' },
    { value: 'economic', label: 'Economic Readiness' },
    { value: 'socio_cultural', label: 'Socio-Cultural Readiness' },
    { value: 'environmental', label: 'Environmental Readiness' },
    { value: 'policy_regulatory', label: 'Policy & Regulatory Readiness' }
  ];

  const roles = [
    { value: 'both', label: 'Both' },
    { value: 'ihl', label: 'Institution of Higher Learning' },
    { value: 'isp', label: 'Internet Service Provider' }
  ];

  useEffect(() => {
    loadQuestions();
  }, [searchTerm, filters]);

  const loadQuestions = async () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      const mockData: Question[] = [
        {
          id: 1,
          text: 'Our institution has adequate ICT infrastructure to support satellite internet connectivity',
          dimension: 'technical',
          role: 'ihl',
          order: 1,
          is_active: true
        },
        {
          id: 2,
          text: 'We have reliable power supply to support continuous internet connectivity',
          dimension: 'technical',
          role: 'both',
          order: 2,
          is_active: true
        },
        {
          id: 3,
          text: 'Our institution can afford the costs associated with satellite internet connectivity',
          dimension: 'economic',
          role: 'ihl',
          order: 1,
          is_active: true
        }
      ];
      setQuestions(mockData);
      setLoading(false);
    }, 1000);
  };

  const handleCreate = () => {
    setEditingQuestion(null);
    setFormData({
      text: '',
      dimension: 'technical',
      role: 'both',
      order: questions.length + 1,
      is_active: true
    });
    setShowModal(true);
  };

  const handleEdit = (question: Question) => {
    setEditingQuestion(question);
    setFormData({
      text: question.text,
      dimension: question.dimension,
      role: question.role,
      order: question.order,
      is_active: question.is_active
    });
    setShowModal(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingQuestion) {
      setQuestions(prev => prev.map(q => 
        q.id === editingQuestion.id 
          ? { ...q, ...formData }
          : q
      ));
    } else {
      const newQuestion: Question = {
        id: Date.now(),
        ...formData
      };
      setQuestions(prev => [...prev, newQuestion]);
    }
    
    setShowModal(false);
  };

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this question?')) {
      setQuestions(prev => prev.filter(q => q.id !== id));
    }
  };

  const getDimensionLabel = (dimension: string) => {
    return dimensions.find(d => d.value === dimension)?.label || dimension;
  };

  const getRoleLabel = (role: string) => {
    return roles.find(r => r.value === role)?.label || role;
  };

  const filteredQuestions = questions.filter(question => {
    const matchesSearch = question.text.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDimension = !filters.dimension || question.dimension === filters.dimension;
    const matchesRole = !filters.role || question.role === filters.role;
    const matchesActive = !filters.is_active || question.is_active.toString() === filters.is_active;
    
    return matchesSearch && matchesDimension && matchesRole && matchesActive;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Question Management</h3>
          <p className="text-sm text-gray-600">Manage assessment questions across all dimensions</p>
        </div>
        <button
          onClick={handleCreate}
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus size={16} className="mr-2" />
          Add Question
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search questions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <select
            value={filters.dimension}
            onChange={(e) => setFilters(prev => ({ ...prev, dimension: e.target.value }))}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Dimensions</option>
            {dimensions.map(dim => (
              <option key={dim.value} value={dim.value}>{dim.label}</option>
            ))}
          </select>

          <select
            value={filters.role}
            onChange={(e) => setFilters(prev => ({ ...prev, role: e.target.value }))}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Roles</option>
            {roles.map(role => (
              <option key={role.value} value={role.value}>{role.label}</option>
            ))}
          </select>

          <select
            value={filters.is_active}
            onChange={(e) => setFilters(prev => ({ ...prev, is_active: e.target.value }))}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Status</option>
            <option value="true">Active</option>
            <option value="false">Inactive</option>
          </select>
        </div>
      </div>

      {/* Questions list */}
      <div className="bg-white rounded-lg border border-gray-200">
        {loading ? (
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-2 text-gray-600">Loading questions...</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {filteredQuestions.map((question) => (
              <div key={question.id} className="p-6 hover:bg-gray-50">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                        {getDimensionLabel(question.dimension)}
                      </span>
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">
                        {getRoleLabel(question.role)}
                      </span>
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        question.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {question.is_active ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                    <p className="text-gray-900 mb-2">{question.text}</p>
                    <p className="text-sm text-gray-500">Order: {question.order}</p>
                  </div>
                  
                  <div className="flex items-center space-x-2 ml-4">
                    <button
                      onClick={() => handleEdit(question)}
                      className="p-2 text-gray-400 hover:text-blue-600 rounded-lg hover:bg-blue-50"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(question.id)}
                      className="p-2 text-gray-400 hover:text-red-600 rounded-lg hover:bg-red-50"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
            
            {filteredQuestions.length === 0 && (
              <div className="p-8 text-center text-gray-500">
                No questions found matching your criteria.
              </div>
            )}
          </div>
        )}
      </div>

      {/* Create/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {editingQuestion ? 'Edit Question' : 'Add New Question'}
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Question Text
                </label>
                <textarea
                  value={formData.text}
                  onChange={(e) => setFormData(prev => ({ ...prev, text: e.target.value }))}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Dimension
                  </label>
                  <select
                    value={formData.dimension}
                    onChange={(e) => setFormData(prev => ({ ...prev, dimension: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {dimensions.map(dim => (
                      <option key={dim.value} value={dim.value}>{dim.label}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Target Role
                  </label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {roles.map(role => (
                      <option key={role.value} value={role.value}>{role.label}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Order
                  </label>
                  <input
                    type="number"
                    value={formData.order}
                    onChange={(e) => setFormData(prev => ({ ...prev, order: parseInt(e.target.value) }))}
                    min="1"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status
                  </label>
                  <div className="flex items-center space-x-4 pt-2">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="is_active"
                        checked={formData.is_active}
                        onChange={() => setFormData(prev => ({ ...prev, is_active: true }))}
                        className="mr-2"
                      />
                      Active
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="is_active"
                        checked={!formData.is_active}
                        onChange={() => setFormData(prev => ({ ...prev, is_active: false }))}
                        className="mr-2"
                      />
                      Inactive
                    </label>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  {editingQuestion ? 'Update' : 'Create'} Question
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionsTab;