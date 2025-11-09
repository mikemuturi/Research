// 'use client';

// import React, { useState, useEffect } from 'react';
// import { Download, Share2, BarChart3, FileText } from 'lucide-react';
// import { surveyAPI } from '@/lib/api';
// import { Submission } from '@/types';
// import Button from '@/components/ui/Button';
// import { Card, CardContent, CardHeader } from '@/components/ui/Card';
// import RadarChart from '@/components/RadarChart';
// import ProgressBar from '@/components/ProgressBar';
// import {
//   BarChart,
//   Bar,
//   CartesianGrid,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
//   Cell,
// } from 'recharts';

// interface ResultsPageProps {
//   submissionId: string;
//   isPublic?: boolean;
// }

// const DIMENSION_LABELS: Record<string, string> = {
//   economic: 'Economic',
//   socio_cultural: 'Socio-Cultural',
//   technical: 'Technical',
//   policy_regulatory: 'Policy & Regulatory',
//   environmental: 'Environmental',
// };

// const CATEGORY_COLORS: Record<string, string> = {
//   Economic: '#2E8B57',
//   'Socio-Cultural': '#FF8C00',
//   Technical: '#1E90FF',
//   'Policy & Regulatory': '#8A2BE2',
//   Environmental: '#228B22',
// };

// const READINESS_LEVELS: Record<
//   string,
//   { label: string; color: string; description: string }
// > = {
//   very_ready: {
//     label: 'Very Ready',
//     color: 'text-green-600',
//     description: 'Excellent readiness for satellite internet adoption',
//   },
//   not_sure: {
//     label: 'Not Sure',
//     color: 'text-amber-600',
//     description: 'Moderate readiness with areas for improvement',
//   },
//   not_ready: {
//     label: 'Not Ready',
//     color: 'text-red-600',
//     description: 'Significant improvements needed before adoption',
//   },
// };

// const ResultsPage: React.FC<ResultsPageProps> = ({ submissionId, isPublic = false }) => {
//   const [submission, setSubmission] = useState<Submission | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     loadSubmission();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [submissionId]);

//   const loadSubmission = async () => {
//     try {
//       setLoading(true);
//       const response = await surveyAPI.getSubmission(submissionId, isPublic);
//       setSubmission(response.data);
//     } catch (err: any) {
//       console.error('Error loading submission:', err);
//       setError('Failed to load results. Please check your link and try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDownloadPDF = async () => {
//     try {
//       const response = await surveyAPI.exportPDF(submissionId);
//       const blob = new Blob([response.data], { type: 'application/pdf' });
//       const url = window.URL.createObjectURL(blob);
//       const a = document.createElement('a');
//       a.href = url;
//       a.download = `rafsia_report_${submissionId}.pdf`;
//       document.body.appendChild(a);
//       a.click();
//       window.URL.revokeObjectURL(url);
//       document.body.removeChild(a);
//     } catch (err) {
//       console.error('Error downloading PDF:', err);
//       alert('Error downloading report. Please try again.');
//     }
//   };

//   const handleShare = () => {
//     const score = (submission?.overall_score ?? 0).toFixed(1);
//     if (navigator.share) {
//       navigator.share({
//         title: 'RAFSIA Readiness Assessment Results',
//         text: `My readiness score: ${score}%`,
//         url: window.location.href,
//       });
//     } else {
//       navigator.clipboard.writeText(window.location.href);
//       alert('Link copied to clipboard!');
//     }
//   };

//   const getRadarData = (s: Submission) => [
//     { dimension: 'Technical', score: s.technical_score ?? 0 },
//     { dimension: 'Economic', score: s.economic_score ?? 0 },
//     { dimension: 'Socio-Cultural', score: s.socio_cultural_score ?? 0 },
//     { dimension: 'Environmental', score: s.environmental_score ?? 0 },
//     { dimension: 'Policy & Regulatory', score: s.policy_regulatory_score ?? 0 },
//   ];

//   const getBarData = (s: Submission) => [
//     { dimension: 'Economic', score: Math.round(s.economic_score ?? 0) },
//     { dimension: 'Socio-Cultural', score: Math.round(s.socio_cultural_score ?? 0) },
//     { dimension: 'Technical', score: Math.round(s.technical_score ?? 0) },
//     { dimension: 'Policy & Regulatory', score: Math.round(s.policy_regulatory_score ?? 0) },
//     { dimension: 'Environmental', score: Math.round(s.environmental_score ?? 0) },
//   ];

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
//           <p className="mt-4 text-gray-600">Loading your results...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error || !submission) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="text-center">
//           <div className="text-red-500 text-6xl mb-4">⚠️</div>
//           <h1 className="text-2xl font-bold text-gray-900 mb-2">Results Not Found</h1>
//           <p className="text-gray-600 mb-4">{error || 'The requested results could not be found.'}</p>
//           <Button onClick={() => (window.location.href = '/')}>Take New Assessment</Button>
//         </div>
//       </div>
//     );
//   }

//   const readinessLevel = READINESS_LEVELS[submission.readiness_level ?? 'not_ready'] || READINESS_LEVELS.not_ready;

//   return (
//     <div className="min-h-screen bg-gray-50 py-8">
//       <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Header */}
//         <div className="text-center mb-8">
//           <h1 className="text-3xl font-bold text-gray-900">Your RAFSIA Assessment Results</h1>
//           <p className="text-gray-600 mt-2">Satellite Internet Adoption Readiness Report</p>
//         </div>

//         {/* Overall Score */}
//         <Card className="mb-8">
//           <CardContent className="text-center py-8">
//             <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-blue-100 mb-4">
//               <span className="text-3xl font-bold text-blue-600">
//                 {Math.round(submission.overall_score ?? 0)}
//               </span>
//             </div>
//             <h2 className="text-2xl font-semibold text-gray-900 mb-2">Overall Readiness Score</h2>
//             <p className={`text-lg font-medium mb-2 ${readinessLevel.color}`}>
//               {readinessLevel.label} ({Math.round(submission.overall_score ?? 0)}/100)
//             </p>
//             <p className="text-gray-600 max-w-md mx-auto">{readinessLevel.description}</p>

//             <div className="flex flex-wrap justify-center gap-4 mt-6">
//               <Button onClick={handleDownloadPDF} className="flex items-center space-x-2">
//                 <FileText size={16} />
//                 <span>Download PDF Report</span>
//               </Button>
//               <Button variant="outline" onClick={handleShare} className="flex items-center space-x-2">
//                 <Share2 size={16} />
//                 <span>Share Results</span>
//               </Button>
//             </div>
//           </CardContent>
//         </Card>

//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//           {/* Radar Chart */}
//           <Card>
//             <CardHeader>
//               <h3 className="text-lg font-semibold text-gray-900 flex items-center">
//                 <BarChart3 size={20} className="mr-2" />
//                 Readiness by Dimension (Radar)
//               </h3>
//             </CardHeader>
//             <CardContent>
//               <RadarChart data={getRadarData(submission)} />
//             </CardContent>
//           </Card>

//           {/* Bar Chart */}
//           <Card>
//             <CardHeader>
//               <h3 className="text-lg font-semibold text-gray-900 flex items-center">
//                 <BarChart3 size={20} className="mr-2" />
//                 Dimension Scores (Bar Chart)
//               </h3>
//             </CardHeader>
//             <CardContent>
//               <ResponsiveContainer width="100%" height={250}>
//                 <BarChart data={getBarData(submission)} barSize={35} margin={{ bottom: 20 }}>
//                   <CartesianGrid strokeDasharray="3 3" />
//                   <XAxis dataKey="dimension" tick={{ fontSize: 12 }} interval={0} />
//                   <YAxis domain={[0, 100]} />
//                   <Tooltip />
//                   <Bar dataKey="score" radius={[6, 6, 0, 0]}>
//                     {getBarData(submission).map((entry, index) => (
//                       <Cell key={`cell-${index}`} fill={CATEGORY_COLORS[entry.dimension] || '#cccccc'} />
//                     ))}
//                   </Bar>
//                 </BarChart>
//               </ResponsiveContainer>
//             </CardContent>
//           </Card>
//         </div>

//         {/* Dimension Scores List */}
//         <Card className="mt-8">
//           <CardHeader>
//             <h3 className="text-lg font-semibold text-gray-900">Detailed Scores</h3>
//           </CardHeader>
//           <CardContent className="space-y-6">
//             {Object.entries(submission.scores_by_dimension ?? {}).map(([dimension, score]) => (
//               <div key={dimension}>
//                 <div className="flex justify-between items-center mb-2">
//                   <span className="text-sm font-medium text-gray-700">
//                     {DIMENSION_LABELS[dimension] ?? dimension}
//                   </span>
//                   <span className="text-sm font-semibold text-gray-900">{Math.round(score ?? 0)}%</span>
//                 </div>
//                 <ProgressBar value={score ?? 0} showLabel={false} />
//               </div>
//             ))}
//           </CardContent>
//         </Card>

//         {/* Recommendations */}
//         {(submission.recommendations ?? []).length > 0 && (
//           <Card className="mt-8">
//             <CardHeader>
//               <h3 className="text-lg font-semibold text-gray-900">Recommendations for Improvement</h3>
//               <p className="text-sm text-gray-600">
//                 Based on your assessment, here are some areas where you can improve readiness:
//               </p>
//             </CardHeader>
//             <CardContent>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 {(submission.recommendations ?? []).map((recommendation, index) => (
//                   <div key={index} className="bg-blue-50 border border-blue-200 rounded-lg p-4">
//                     <div className="flex items-start">
//                       <div className="flex-shrink-0">
//                         <div className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-blue-600 text-white text-xs font-medium">
//                           {index + 1}
//                         </div>
//                       </div>
//                       <p className="ml-3 text-sm text-gray-700">{recommendation}</p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </CardContent>
//           </Card>
//         )}

//         {/* Respondent Info */}
//         {submission.is_anonymous !== true && (
//           <Card className="mt-8">
//             <CardHeader>
//               <h3 className="text-lg font-semibold text-gray-900">Assessment Details</h3>
//             </CardHeader>
//             <CardContent>
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
//                 <div>
//                   <span className="text-gray-500">Respondent:</span>
//                   <p className="font-medium">{submission.name ?? 'Anonymous'}</p>
//                 </div>
//                 <div>
//                   <span className="text-gray-500">Role:</span>
//                   <p className="font-medium">{submission.role ?? 'N/A'}</p>
//                 </div>
//                 <div>
//                   <span className="text-gray-500">Institution:</span>
//                   <p className="font-medium">
//                     {submission.institution_name_display ?? submission.institution_name ?? 'N/A'}
//                   </p>
//                 </div>
//                 <div>
//                   <span className="text-gray-500">County:</span>
//                   <p className="font-medium">{submission.county ?? 'N/A'}</p>
//                 </div>
//                 <div>
//                   <span className="text-gray-500">Submitted:</span>
//                   <p className="font-medium">
//                     {submission.submitted_at ? new Date(submission.submitted_at).toLocaleDateString() : 'N/A'}
//                   </p>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ResultsPage;
'use client';

import React, { useState, useEffect } from 'react';
import { FileText, Edit, Trash2, MessageSquare } from 'lucide-react';
import { surveyAPI } from '@/lib/api';
import { Submission, DimensionComment } from '@/types';
import Button from '@/components/ui/Button';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import Modal from '@/components/ui/Modal';

interface ResultsPageProps {
  submissionId: string;
  isPublic?: boolean;
  isAdmin?: boolean;
}

const DIMENSION_LABELS: Record<string, string> = {
  technical: 'Technical Readiness',
  economic: 'Economic Readiness',
  socio_cultural: 'Socio-Cultural Readiness',
  environmental: 'Environmental Readiness',
  policy_regulatory: 'Policy & Regulatory Readiness',
  strategic: 'Strategic Readiness',
};

const ResultsPage: React.FC<ResultsPageProps> = ({
  submissionId,
  isPublic = false,
  isAdmin = false,
}) => {
  const [submission, setSubmission] = useState<Submission | null>(null);
  const [comments, setComments] = useState<DimensionComment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editingComments, setEditingComments] = useState<Record<string, string>>({});

  useEffect(() => {
    loadSubmission();
  }, [submissionId]);

  const loadSubmission = async () => {
    try {
      setLoading(true);
      const [subResponse, commentsResponse] = await Promise.all([
        surveyAPI.getSubmission(submissionId, isPublic),
        surveyAPI.getComments(submissionId),
      ]);
      setSubmission(subResponse.data);
      setComments(commentsResponse.data);

      // Map dimension comments for editing modal
      const commentsMap: Record<string, string> = {};
      commentsResponse.data.forEach((c: DimensionComment) => {
        commentsMap[c.dimension] = c.comment;
      });
      setEditingComments(commentsMap);
    } catch (err) {
      console.error('Error loading submission:', err);
      setError('Failed to load results. Please check your link and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateComments = async () => {
    try {
      setLoading(true);
      await surveyAPI.updateComments(submissionId, editingComments);
      await loadSubmission();
      setShowEditModal(false);
      alert('Comments updated successfully!');
    } catch (err) {
      console.error('Error updating comments:', err);
      alert('Error updating comments. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      setLoading(true);
      await surveyAPI.deleteSubmission(submissionId);
      alert('Submission deleted successfully!');
      window.location.href = '/admin';
    } catch (err) {
      console.error('Error deleting submission:', err);
      alert('Error deleting submission. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadPDF = async () => {
    try {
      const response = await surveyAPI.exportPDF(submissionId);
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `assessment_report_${submissionId}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      console.error('Error downloading PDF:', err);
      alert('Error downloading report. Please try again.');
    }
  };

  if (loading && !submission) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your results...</p>
        </div>
      </div>
    );
  }

  if (error || !submission) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Results Not Found</h1>
          <p className="text-gray-600 mb-4">{error || 'The requested results could not be found.'}</p>
          <Button onClick={() => (window.location.href = '/')}>Take New Assessment</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {submission.survey_type === 'isp' ? 'ISP' : 'RAFSIA'} Assessment Results
            </h1>
            <p className="text-gray-600 mt-2">Satellite Internet Adoption Readiness Report</p>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={handleDownloadPDF}
              variant="outline"
              className="flex items-center space-x-2"
            >
              <FileText size={16} />
              <span>PDF</span>
            </Button>
            {isAdmin && (
              <>
                <Button
                  onClick={() => setShowEditModal(true)}
                  variant="outline"
                  className="flex items-center space-x-2"
                >
                  <Edit size={16} />
                  <span>Edit</span>
                </Button>
                <Button
                  onClick={() => setShowDeleteModal(true)}
                  variant="outline"
                  className="flex items-center space-x-2 text-red-600 hover:bg-red-50"
                >
                  <Trash2 size={16} />
                  <span>Delete</span>
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Overall Score */}
        <Card className="mb-8">
          <CardContent className="text-center py-8">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-blue-100 mb-4">
              <span className="text-3xl font-bold text-blue-600">
                {Math.round(submission.overall_score ?? 0)}
              </span>
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">Overall Readiness Score</h2>
            <p className="text-lg font-medium mb-2">
              {submission.readiness_level === 'very_ready' && (
                <span className="text-green-600">Very Ready</span>
              )}
              {submission.readiness_level === 'not_sure' && (
                <span className="text-amber-600">Not Sure</span>
              )}
              {submission.readiness_level === 'not_ready' && (
                <span className="text-red-600">Not Ready</span>
              )}
            </p>
          </CardContent>
        </Card>

        {/* Comments */}
        {comments.length > 0 && (
          <Card className="mb-8">
            <CardHeader>
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <MessageSquare size={20} className="mr-2" />
                Qualitative Feedback by Dimension
              </h3>
              <p className="text-sm text-gray-600">Additional context provided for each dimension</p>
            </CardHeader>
            <CardContent className="space-y-6">
              {comments.map((comment) => (
                <div
                  key={comment.dimension}
                  className="bg-gray-50 p-4 rounded-lg border-l-4 border-blue-500"
                >
                  <h4 className="font-semibold text-gray-900 mb-2">
                    {DIMENSION_LABELS[comment.dimension] || comment.dimension}
                  </h4>
                  <p className="text-gray-700 text-sm whitespace-pre-wrap">{comment.comment}</p>
                  <p className="text-xs text-gray-500 mt-2">
                    {new Date(comment.created_at).toLocaleDateString()} at{' '}
                    {new Date(comment.created_at).toLocaleTimeString()}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Dimension Scores */}
        <Card className="mb-8">
          <CardHeader>
            <h3 className="text-lg font-semibold text-gray-900">Detailed Dimension Scores</h3>
          </CardHeader>
          <CardContent className="space-y-4">
            {Object.entries(submission.scores_by_dimension ?? {}).map(([dimension, score]) => (
              <div key={dimension} className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700">
                  {DIMENSION_LABELS[dimension] || dimension}
                </span>
                <span className="text-sm font-semibold text-gray-900">
                  {Math.round(score ?? 0)}%
                </span>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Edit Comments Modal */}
        <Modal
          isOpen={showEditModal}
          onClose={() => setShowEditModal(false)}
          title="Edit Dimension Comments"
        >
          <div className="space-y-4">
            {Object.keys(DIMENSION_LABELS).map((dimension) => {
              if (submission.survey_type !== 'isp' && dimension === 'strategic') return null;
              return (
                <div key={dimension}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {DIMENSION_LABELS[dimension]}
                  </label>
                  <textarea
                    value={editingComments[dimension] || ''}
                    onChange={(e) =>
                      setEditingComments((prev) => ({
                        ...prev,
                        [dimension]: e.target.value,
                      }))
                    }
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder={`Comments about ${DIMENSION_LABELS[dimension].toLowerCase()}...`}
                    maxLength={1000}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    {(editingComments[dimension] || '').length}/1000 characters
                  </p>
                </div>
              );
            })}
          </div>
          <div className="flex justify-end space-x-4 mt-6">
            <Button variant="outline" onClick={() => setShowEditModal(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdateComments} disabled={loading}>
              {loading ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </Modal>

        {/* Delete Confirmation Modal */}
        <Modal
          isOpen={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          title="Confirm Deletion"
        >
          <p className="text-gray-700 mb-6">
            Are you sure you want to delete this submission? This action cannot be undone.
          </p>
          <div className="flex justify-end space-x-4">
            <Button variant="outline" onClick={() => setShowDeleteModal(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleDelete}
              disabled={loading}
              className="bg-red-600 hover:bg-red-700"
            >
              {loading ? 'Deleting...' : 'Delete Submission'}
            </Button>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default ResultsPage;
