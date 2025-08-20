import React, { useState, useEffect } from 'react';
import { Search, Filter, Download, Eye } from 'lucide-react';

interface Answer {
  id: number;
  submission_id: number;
  question_id: number;
  question_text: string;
  dimension: string;
  value: number;
  respondent_name: string;
  submitted_at: string;
}

const AnswersTab: React.FC = () => {
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    dimension: '',
    value: '',
    submission_id: ''
  });

  const dimensions = [
    { value: 'technical', label: 'Technical Readiness' },
    { value: 'economic', label: 'Economic Readiness' },
    { value: 'socio_cultural', label: 'Socio-Cultural Readiness' },
    { value: 'environmental', label: 'Environmental Readiness' },
    { value: 'policy_regulatory', label: 'Policy & Regulatory Readiness' }
  ];

  const likertLabels = {
    1: 'Strongly Disagree',
    2: 'Disagree',
    3: 'Neutral',
    4: 'Agree',
    5: 'Strongly Agree'
  };

  useEffect(() => {
    loadAnswers();
  }, [searchTerm, filters]);

  const loadAnswers = async () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      const mockData: Answer[] = [
        {
          id: 1,
          submission_id: 1,
          question_id: 1,
          question_text: 'Our institution has adequate ICT infrastructure to support satellite internet connectivity',
          dimension: 'technical',
          value: 4,
          respondent_name: 'John Doe',
          submitted_at: '2025-01-15T10:30:00Z'
        },
        {
          id: 2,
          submission_id: 1,
          question_id: 2,
          question_text: 'We have reliable power supply to support continuous internet connectivity',
          dimension: 'technical',
          value: 3,
          respondent_name: 'John Doe',
          submitted_at: '2025-01-15T10:30:00Z'
        },
        {
          id: 3,
          submission_id: 2,
          question_id: 1,
          question_text: 'Our institution has adequate ICT infrastructure to support satellite internet connectivity',
          dimension: 'technical',
          value: 5,
          respondent_name: 'Jane Smith',
          submitted_at: '2025-01-14T14:20:00Z'
        }
      ];
      setAnswers(mockData);
      setLoading(false);
    }, 1000);
  };

  const handleExport = () => {
    console.log('Exporting answers...');
  };

  const getDimensionLabel = (dimension: string) => {
    return dimensions.find(d => d.value === dimension)?.label || dimension;
  };

  const getValueColor = (value: number) => {
    if (value >= 4) return 'bg-green-100 text-green-800';
    if (value === 3) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  const filteredAnswers = answers.filter(answer => {
    const matchesSearch = answer.question_text.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         answer.respondent_name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDimension = !filters.dimension || answer.dimension === filters.dimension;
    const matchesValue = !filters.value || answer.value.toString() === filters.value;
    const matchesSubmission = !filters.submission_id || answer.submission_id.toString() === filters.submission_id;
    
    return matchesSearch && matchesDimension && matchesValue && matchesSubmission;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Answer Analysis</h3>
          <p className="text-sm text-gray-600">View and analyze individual question responses</p>
        </div>
        <button
          onClick={handleExport}
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Download size={16} className="mr-2" />
          Export Data
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search answers..."
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
            value={filters.value}
            onChange={(e) => setFilters(prev => ({ ...prev, value: e.target.value }))}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Responses</option>
            <option value="1">1 - Strongly Disagree</option>
            <option value="2">2 - Disagree</option>
            <option value="3">3 - Neutral</option>
            <option value="4">4 - Agree</option>
            <option value="5">5 - Strongly Agree</option>
          </select>

          <input
            type="text"
            placeholder="Submission ID..."
            value={filters.submission_id}
            onChange={(e) => setFilters(prev => ({ ...prev, submission_id: e.target.value }))}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Answers table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-2 text-gray-600">Loading answers...</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Question
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Dimension
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Response
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Respondent
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Submission
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredAnswers.map((answer) => (
                  <tr key={answer.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 max-w-xs truncate" title={answer.question_text}>
                        {answer.question_text}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                        {getDimensionLabel(answer.dimension)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getValueColor(answer.value)}`}>
                          {answer.value}
                        </span>
                        <span className="text-sm text-gray-500">
                          {likertLabels[answer.value as keyof typeof likertLabels]}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {answer.respondent_name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      #{answer.submission_id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(answer.submitted_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-blue-600 hover:text-blue-900">
                        <Eye size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {filteredAnswers.length === 0 && (
              <div className="p-8 text-center text-gray-500">
                No answers found matching your criteria.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AnswersTab;