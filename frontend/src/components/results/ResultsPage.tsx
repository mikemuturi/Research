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
//   Economic: '#2E8B57', // green for economy
//   'Socio-Cultural': '#FF8C00', // orange for culture
//   Technical: '#1E90FF', // blue for tech
//   'Policy & Regulatory': '#8A2BE2', // purple for governance
//   Environmental: '#228B22', // forest green for environment
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
//   }, [submissionId]);

//   const loadSubmission = async () => {
//     try {
//       setLoading(true);
//       const response = await surveyAPI.getSubmission(submissionId, isPublic);
//       setSubmission(response.data);
//     } catch (error: any) {
//       console.error('Error loading submission:', error);
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
//     } catch (error) {
//       console.error('Error downloading PDF:', error);
//       alert('Error downloading report. Please try again.');
//     }
//   };

//   const handleShare = () => {
//     if (navigator.share) {
//       navigator.share({
//         title: 'RAFSIA Readiness Assessment Results',
//         text: `My readiness score: ${submission?.overall_score.toFixed(1)}%`,
//         url: window.location.href,
//       });
//     } else {
//       navigator.clipboard.writeText(window.location.href);
//       alert('Link copied to clipboard!');
//     }
//   };

//   const getRadarData = (submission: Submission) => [
//     { dimension: 'Technical', score: submission.technical_score },
//     { dimension: 'Economic', score: submission.economic_score },
//     { dimension: 'Socio-Cultural', score: submission.socio_cultural_score },
//     { dimension: 'Environmental', score: submission.environmental_score },
//     { dimension: 'Policy & Regulatory', score: submission.policy_regulatory_score },
//   ];

//   const getBarData = (submission: Submission) => [
//     { dimension: 'Economic', score: Math.round(submission.economic_score) },
//     { dimension: 'Socio-Cultural', score: Math.round(submission.socio_cultural_score) },
//     { dimension: 'Technical', score: Math.round(submission.technical_score) },
//     { dimension: 'Policy & Regulatory', score: Math.round(submission.policy_regulatory_score) },
//     { dimension: 'Environmental', score: Math.round(submission.environmental_score) },
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

//   const readinessLevel = READINESS_LEVELS[submission.readiness_level] || READINESS_LEVELS.not_ready;

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
//                 {Math.round(submission.overall_score)}
//               </span>
//             </div>
//             <h2 className="text-2xl font-semibold text-gray-900 mb-2">Overall Readiness Score</h2>
//             <p className={`text-lg font-medium mb-2 ${readinessLevel.color}`}>
//               {readinessLevel.label} ({Math.round(submission.overall_score)}/100)
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
//                       <Cell key={`cell-${index}`} fill={CATEGORY_COLORS[entry.dimension]} />
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
//             {Object.entries(submission.scores_by_dimension).map(([dimension, score]) => (
//               <div key={dimension}>
//                 <div className="flex justify-between items-center mb-2">
//                   <span className="text-sm font-medium text-gray-700">
//                     {DIMENSION_LABELS[dimension]}
//                   </span>
//                   <span className="text-sm font-semibold text-gray-900">{Math.round(score)}%</span>
//                 </div>
//                 <ProgressBar value={score} showLabel={false} />
//               </div>
//             ))}
//           </CardContent>
//         </Card>

//         {/* Recommendations */}
//         {submission.recommendations && submission.recommendations.length > 0 && (
//           <Card className="mt-8">
//             <CardHeader>
//               <h3 className="text-lg font-semibold text-gray-900">Recommendations for Improvement</h3>
//               <p className="text-sm text-gray-600">
//                 Based on your assessment, here are some areas where you can improve readiness:
//               </p>
//             </CardHeader>
//             <CardContent>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 {submission.recommendations.map((recommendation, index) => (
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
//         {!submission.is_anonymous && (
//           <Card className="mt-8">
//             <CardHeader>
//               <h3 className="text-lg font-semibold text-gray-900">Assessment Details</h3>
//             </CardHeader>
//             <CardContent>
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
//                 <div>
//                   <span className="text-gray-500">Respondent:</span>
//                   <p className="font-medium">{submission.name}</p>
//                 </div>
//                 <div>
//                   <span className="text-gray-500">Role:</span>
//                   <p className="font-medium">{submission.role}</p>
//                 </div>
//                 <div>
//                   <span className="text-gray-500">Institution:</span>
//                   <p className="font-medium">
//                     {submission.institution_name_display || submission.institution_name}
//                   </p>
//                 </div>
//                 <div>
//                   <span className="text-gray-500">County:</span>
//                   <p className="font-medium">{submission.county}</p>
//                 </div>
//                 <div>
//                   <span className="text-gray-500">Submitted:</span>
//                   <p className="font-medium">
//                     {new Date(submission.submitted_at).toLocaleDateString()}
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
import { Download, Share2, BarChart3, FileText } from 'lucide-react';
import { surveyAPI } from '@/lib/api';
import { Submission } from '@/types';
import Button from '@/components/ui/Button';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import RadarChart from '@/components/RadarChart';
import ProgressBar from '@/components/ProgressBar';
import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';

interface ResultsPageProps {
  submissionId: string;
  isPublic?: boolean;
}

const DIMENSION_LABELS: Record<string, string> = {
  economic: 'Economic',
  socio_cultural: 'Socio-Cultural',
  technical: 'Technical',
  policy_regulatory: 'Policy & Regulatory',
  environmental: 'Environmental',
};

const CATEGORY_COLORS: Record<string, string> = {
  Economic: '#2E8B57',
  'Socio-Cultural': '#FF8C00',
  Technical: '#1E90FF',
  'Policy & Regulatory': '#8A2BE2',
  Environmental: '#228B22',
};

const READINESS_LEVELS: Record<
  string,
  { label: string; color: string; description: string }
> = {
  very_ready: {
    label: 'Very Ready',
    color: 'text-green-600',
    description: 'Excellent readiness for satellite internet adoption',
  },
  not_sure: {
    label: 'Not Sure',
    color: 'text-amber-600',
    description: 'Moderate readiness with areas for improvement',
  },
  not_ready: {
    label: 'Not Ready',
    color: 'text-red-600',
    description: 'Significant improvements needed before adoption',
  },
};

const ResultsPage: React.FC<ResultsPageProps> = ({ submissionId, isPublic = false }) => {
  const [submission, setSubmission] = useState<Submission | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadSubmission();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submissionId]);

  const loadSubmission = async () => {
    try {
      setLoading(true);
      const response = await surveyAPI.getSubmission(submissionId, isPublic);
      setSubmission(response.data);
    } catch (err: any) {
      console.error('Error loading submission:', err);
      setError('Failed to load results. Please check your link and try again.');
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
      a.download = `rafsia_report_${submissionId}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      console.error('Error downloading PDF:', err);
      alert('Error downloading report. Please try again.');
    }
  };

  const handleShare = () => {
    const score = (submission?.overall_score ?? 0).toFixed(1);
    if (navigator.share) {
      navigator.share({
        title: 'RAFSIA Readiness Assessment Results',
        text: `My readiness score: ${score}%`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const getRadarData = (s: Submission) => [
    { dimension: 'Technical', score: s.technical_score ?? 0 },
    { dimension: 'Economic', score: s.economic_score ?? 0 },
    { dimension: 'Socio-Cultural', score: s.socio_cultural_score ?? 0 },
    { dimension: 'Environmental', score: s.environmental_score ?? 0 },
    { dimension: 'Policy & Regulatory', score: s.policy_regulatory_score ?? 0 },
  ];

  const getBarData = (s: Submission) => [
    { dimension: 'Economic', score: Math.round(s.economic_score ?? 0) },
    { dimension: 'Socio-Cultural', score: Math.round(s.socio_cultural_score ?? 0) },
    { dimension: 'Technical', score: Math.round(s.technical_score ?? 0) },
    { dimension: 'Policy & Regulatory', score: Math.round(s.policy_regulatory_score ?? 0) },
    { dimension: 'Environmental', score: Math.round(s.environmental_score ?? 0) },
  ];

  if (loading) {
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

  const readinessLevel = READINESS_LEVELS[submission.readiness_level ?? 'not_ready'] || READINESS_LEVELS.not_ready;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Your RAFSIA Assessment Results</h1>
          <p className="text-gray-600 mt-2">Satellite Internet Adoption Readiness Report</p>
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
            <p className={`text-lg font-medium mb-2 ${readinessLevel.color}`}>
              {readinessLevel.label} ({Math.round(submission.overall_score ?? 0)}/100)
            </p>
            <p className="text-gray-600 max-w-md mx-auto">{readinessLevel.description}</p>

            <div className="flex flex-wrap justify-center gap-4 mt-6">
              <Button onClick={handleDownloadPDF} className="flex items-center space-x-2">
                <FileText size={16} />
                <span>Download PDF Report</span>
              </Button>
              <Button variant="outline" onClick={handleShare} className="flex items-center space-x-2">
                <Share2 size={16} />
                <span>Share Results</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Radar Chart */}
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <BarChart3 size={20} className="mr-2" />
                Readiness by Dimension (Radar)
              </h3>
            </CardHeader>
            <CardContent>
              <RadarChart data={getRadarData(submission)} />
            </CardContent>
          </Card>

          {/* Bar Chart */}
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <BarChart3 size={20} className="mr-2" />
                Dimension Scores (Bar Chart)
              </h3>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={getBarData(submission)} barSize={35} margin={{ bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="dimension" tick={{ fontSize: 12 }} interval={0} />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Bar dataKey="score" radius={[6, 6, 0, 0]}>
                    {getBarData(submission).map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={CATEGORY_COLORS[entry.dimension] || '#cccccc'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Dimension Scores List */}
        <Card className="mt-8">
          <CardHeader>
            <h3 className="text-lg font-semibold text-gray-900">Detailed Scores</h3>
          </CardHeader>
          <CardContent className="space-y-6">
            {Object.entries(submission.scores_by_dimension ?? {}).map(([dimension, score]) => (
              <div key={dimension}>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">
                    {DIMENSION_LABELS[dimension] ?? dimension}
                  </span>
                  <span className="text-sm font-semibold text-gray-900">{Math.round(score ?? 0)}%</span>
                </div>
                <ProgressBar value={score ?? 0} showLabel={false} />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recommendations */}
        {(submission.recommendations ?? []).length > 0 && (
          <Card className="mt-8">
            <CardHeader>
              <h3 className="text-lg font-semibold text-gray-900">Recommendations for Improvement</h3>
              <p className="text-sm text-gray-600">
                Based on your assessment, here are some areas where you can improve readiness:
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {(submission.recommendations ?? []).map((recommendation, index) => (
                  <div key={index} className="bg-blue-50 border border-blue-200 rounded-lg p-4">
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
            </CardContent>
          </Card>
        )}

        {/* Respondent Info */}
        {submission.is_anonymous !== true && (
          <Card className="mt-8">
            <CardHeader>
              <h3 className="text-lg font-semibold text-gray-900">Assessment Details</h3>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">Respondent:</span>
                  <p className="font-medium">{submission.name ?? 'Anonymous'}</p>
                </div>
                <div>
                  <span className="text-gray-500">Role:</span>
                  <p className="font-medium">{submission.role ?? 'N/A'}</p>
                </div>
                <div>
                  <span className="text-gray-500">Institution:</span>
                  <p className="font-medium">
                    {submission.institution_name_display ?? submission.institution_name ?? 'N/A'}
                  </p>
                </div>
                <div>
                  <span className="text-gray-500">County:</span>
                  <p className="font-medium">{submission.county ?? 'N/A'}</p>
                </div>
                <div>
                  <span className="text-gray-500">Submitted:</span>
                  <p className="font-medium">
                    {submission.submitted_at ? new Date(submission.submitted_at).toLocaleDateString() : 'N/A'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ResultsPage;
