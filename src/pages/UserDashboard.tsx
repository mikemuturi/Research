import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  BarChart3, 
  FileText, 
  TrendingUp, 
  Calendar, 
  Eye, 
  Download,
  User,
  Award,
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { surveyAPI } from '@/lib/api';
import { Submission } from '@/types';
import ProgressBar from '@/components/ProgressBar';
import RadarChart from '@/components/RadarChart';

interface UserActivity {
  id: number;
  type: 'survey_completed' | 'result_viewed' | 'pdf_downloaded';
  title: string;
  description: string;
  date: string;
  submissionId?: number;
}

const UserDashboard: React.FC = () => {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [activities, setActivities] = useState<UserActivity[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      setLoading(true);
      
      // Mock user submissions - in real app, filter by current user
      const mockSubmissions: Submission[] = [
        {
          id: 1,
          name: 'John Doe',
          email: 'john@example.com',
          phone: '+254 700 000 000',
          role: 'lecturer',
          institution_name: 'Masinde Muliro University',
          institution_name_display: 'Masinde Muliro University',
          county: 'Kakamega',
          consent_given: true,
          is_anonymous: false,
          submitted_at: '2025-01-15T10:30:00Z',
          technical_score: 75,
          economic_score: 68,
          socio_cultural_score: 82,
          environmental_score: 71,
          policy_regulatory_score: 79,
          overall_score: 75,
          readiness_level: 'not_sure',
          answers: [],
          recommendations: [
            'Upgrade ICT infrastructure and equipment',
            'Develop sustainable funding models',
            'Conduct awareness campaigns on digital literacy'
          ],
          scores_by_dimension: {
            technical: 75,
            economic: 68,
            socio_cultural: 82,
            environmental: 71,
            policy_regulatory: 79,
          }
        },
        {
          id: 2,
          name: 'John Doe',
          email: 'john@example.com',
          phone: '+254 700 000 000',
          role: 'lecturer',
          institution_name: 'Masinde Muliro University',
          institution_name_display: 'Masinde Muliro University',
          county: 'Kakamega',
          consent_given: true,
          is_anonymous: false,
          submitted_at: '2025-01-10T14:20:00Z',
          technical_score: 65,
          economic_score: 60,
          socio_cultural_score: 70,
          environmental_score: 68,
          policy_regulatory_score: 72,
          overall_score: 67,
          readiness_level: 'not_sure',
          answers: [],
          recommendations: [
            'Improve internet connectivity and bandwidth',
            'Apply for grants and development funding',
            'Train staff and students on new technologies'
          ],
          scores_by_dimension: {
            technical: 65,
            economic: 60,
            socio_cultural: 70,
            environmental: 68,
            policy_regulatory: 72,
          }
        }
      ];

      // Mock activities
      const mockActivities: UserActivity[] = [
        {
          id: 1,
          type: 'survey_completed',
          title: 'Completed RAFSIA Assessment',
          description: 'Successfully completed readiness assessment with overall score of 75%',
          date: '2025-01-15T10:30:00Z',
          submissionId: 1
        },
        {
          id: 2,
          type: 'result_viewed',
          title: 'Viewed Assessment Results',
          description: 'Accessed detailed results and recommendations',
          date: '2025-01-15T11:00:00Z',
          submissionId: 1
        },
        {
          id: 3,
          type: 'pdf_downloaded',
          title: 'Downloaded PDF Report',
          description: 'Downloaded comprehensive assessment report',
          date: '2025-01-15T11:15:00Z',
          submissionId: 1
        },
        {
          id: 4,
          type: 'survey_completed',
          title: 'Completed Follow-up Assessment',
          description: 'Completed second assessment to track progress',
          date: '2025-01-10T14:20:00Z',
          submissionId: 2
        }
      ];

      setSubmissions(mockSubmissions);
      setActivities(mockActivities);
    } catch (error) {
      console.error('Error loading user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'survey_completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'result_viewed':
        return <Eye className="h-5 w-5 text-blue-500" />;
      case 'pdf_downloaded':
        return <Download className="h-5 w-5 text-purple-500" />;
      default:
        return <AlertCircle className="h-5 w-5 text-gray-500" />;
    }
  };

  const getReadinessColor = (level: string) => {
    switch (level) {
      case 'very_ready': return 'text-green-600';
      case 'not_sure': return 'text-amber-600';
      case 'not_ready': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getReadinessLabel = (level: string) => {
    switch (level) {
      case 'very_ready': return 'Very Ready';
      case 'not_sure': return 'Not Sure';
      case 'not_ready': return 'Not Ready';
      default: return 'Unknown';
    }
  };

  const getRadarData = (submission: Submission) => {
    return [
      { dimension: 'Technical', score: submission.technical_score },
      { dimension: 'Economic', score: submission.economic_score },
      { dimension: 'Socio-Cultural', score: submission.socio_cultural_score },
      { dimension: 'Environmental', score: submission.environmental_score },
      { dimension: 'Policy & Regulatory', score: submission.policy_regulatory_score },
    ];
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  const latestSubmission = submissions[0];
  const averageScore = submissions.length > 0 
    ? submissions.reduce((sum, sub) => sum + sub.overall_score, 0) / submissions.length 
    : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Dashboard</h1>
          <p className="text-gray-600 mt-2">Track your RAFSIA assessments and progress</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <FileText className="h-8 w-8 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Assessments Taken</p>
                <p className="text-2xl font-semibold text-gray-900">{submissions.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Average Score</p>
                <p className="text-2xl font-semibold text-gray-900">{Math.round(averageScore)}%</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Award className="h-8 w-8 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Latest Score</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {latestSubmission ? Math.round(latestSubmission.overall_score) : 0}%
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Clock className="h-8 w-8 text-amber-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Last Assessment</p>
                <p className="text-sm font-semibold text-gray-900">
                  {latestSubmission 
                    ? new Date(latestSubmission.submitted_at).toLocaleDateString()
                    : 'Never'
                  }
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 px-6">
              {[
                { id: 'overview', label: 'Overview', icon: BarChart3 },
                { id: 'assessments', label: 'My Assessments', icon: FileText },
                { id: 'activities', label: 'Recent Activities', icon: Clock },
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === tab.id
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <Icon size={16} className="mr-2" />
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="p-6">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-8">
                {latestSubmission ? (
                  <>
                    {/* Latest Assessment Overview */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Latest Assessment Results</h3>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Radar Chart */}
                        <div className="bg-gray-50 rounded-lg p-6">
                          <h4 className="text-md font-medium text-gray-900 mb-4">Readiness by Dimension</h4>
                          <RadarChart data={getRadarData(latestSubmission)} />
                        </div>

                        {/* Dimension Scores */}
                        <div className="space-y-4">
                          <h4 className="text-md font-medium text-gray-900">Detailed Scores</h4>
                          {Object.entries(latestSubmission.scores_by_dimension).map(([dimension, score]) => (
                            <div key={dimension}>
                              <div className="flex justify-between items-center mb-2">
                                <span className="text-sm font-medium text-gray-700 capitalize">
                                  {dimension.replace('_', ' ')}
                                </span>
                                <span className="text-sm font-semibold text-gray-900">
                                  {Math.round(score)}%
                                </span>
                              </div>
                              <ProgressBar value={score} showLabel={false} />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Recommendations */}
                    {latestSubmission.recommendations && latestSubmission.recommendations.length > 0 && (
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Latest Recommendations</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {latestSubmission.recommendations.slice(0, 4).map((recommendation, index) => (
                            <div
                              key={index}
                              className="bg-blue-50 border border-blue-200 rounded-lg p-4"
                            >
                              <div className="flex items-start">
                                <div className="flex-shrink-0">
                                  <div className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-blue-600 text-white text-xs font-medium">
                                    {index + 1}
                                  </div>
                                </div>
                                <p className="ml-3 text-sm text-gray-700">{recommendation}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="text-center py-12">
                    <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No Assessments Yet</h3>
                    <p className="text-gray-600 mb-6">Take your first RAFSIA assessment to see your results here.</p>
                    <Link
                      to="/survey"
                      className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Start Assessment
                    </Link>
                  </div>
                )}
              </div>
            )}

            {/* Assessments Tab */}
            {activeTab === 'assessments' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-900">My Assessment History</h3>
                  <Link
                    to="/survey"
                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    New Assessment
                  </Link>
                </div>

                {submissions.length > 0 ? (
                  <div className="space-y-4">
                    {submissions.map((submission) => (
                      <div key={submission.id} className="bg-gray-50 rounded-lg p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h4 className="text-lg font-medium text-gray-900">
                              Assessment #{submission.id}
                            </h4>
                            <p className="text-sm text-gray-600">
                              Submitted on {new Date(submission.submitted_at).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-2xl font-bold text-gray-900">
                              {Math.round(submission.overall_score)}%
                            </p>
                            <p className={`text-sm font-medium ${getReadinessColor(submission.readiness_level)}`}>
                              {getReadinessLabel(submission.readiness_level)}
                            </p>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
                          {Object.entries(submission.scores_by_dimension).map(([dimension, score]) => (
                            <div key={dimension} className="text-center">
                              <p className="text-sm text-gray-600 capitalize mb-1">
                                {dimension.replace('_', ' ')}
                              </p>
                              <p className="text-lg font-semibold text-gray-900">
                                {Math.round(score)}%
                              </p>
                            </div>
                          ))}
                        </div>

                        <div className="flex justify-end space-x-3">
                          <Link
                            to={`/results/${submission.id}`}
                            className="inline-flex items-center px-3 py-2 text-sm text-blue-600 hover:text-blue-700 transition-colors"
                          >
                            <Eye size={16} className="mr-1" />
                            View Details
                          </Link>
                          <button className="inline-flex items-center px-3 py-2 text-sm text-gray-600 hover:text-gray-700 transition-colors">
                            <Download size={16} className="mr-1" />
                            Download PDF
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No Assessments Found</h3>
                    <p className="text-gray-600">You haven't taken any assessments yet.</p>
                  </div>
                )}
              </div>
            )}

            {/* Activities Tab */}
            {activeTab === 'activities' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900">Recent Activities</h3>
                
                {activities.length > 0 ? (
                  <div className="space-y-4">
                    {activities.map((activity) => (
                      <div key={activity.id} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                        <div className="flex-shrink-0 mt-1">
                          {getActivityIcon(activity.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-medium text-gray-900">
                            {activity.title}
                          </h4>
                          <p className="text-sm text-gray-600 mt-1">
                            {activity.description}
                          </p>
                          <p className="text-xs text-gray-500 mt-2">
                            {new Date(activity.date).toLocaleString()}
                          </p>
                        </div>
                        {activity.submissionId && (
                          <div className="flex-shrink-0">
                            <Link
                              to={`/results/${activity.submissionId}`}
                              className="text-sm text-blue-600 hover:text-blue-700"
                            >
                              View
                            </Link>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Clock className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No Activities Yet</h3>
                    <p className="text-gray-600">Your activities will appear here as you use the platform.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;