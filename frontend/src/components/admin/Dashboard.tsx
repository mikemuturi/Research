// 'use client';

// import React, { useState, useEffect } from 'react';
// import { BarChart3, Users, FileText, TrendingUp, Download, Filter } from 'lucide-react';
// import { surveyAPI, interviewAPI } from '@/lib/api';
// import { Statistics, Submission } from '@/types';
// import Button from '@/components/ui/Button';
// import Input from '@/components/ui/Input';
// import Select from '@/components/ui/Select';
// import { Card, CardContent, CardHeader } from '@/components/ui/Card';
// import Modal from '@/components/ui/Modal';

// const Dashboard: React.FC = () => {
//   const [statistics, setStatistics] = useState<Statistics | null>(null);
//   const [submissions, setSubmissions] = useState<Submission[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [showFilters, setShowFilters] = useState(false);
  
//   const [filters, setFilters] = useState({
//     role: '',
//     county: '',
//     institution: '',
//     date_from: '',
//     date_to: '',
//   });

//   useEffect(() => {
//     loadDashboardData();
//   }, [filters]);

//   const loadDashboardData = async () => {
//     try {
//       setLoading(true);
//       const [statsResponse, submissionsResponse] = await Promise.all([
//         surveyAPI.getStatistics(),
//         surveyAPI.getSubmissions(filters),
//       ]);
      
//       setStatistics(statsResponse.data);
//       setSubmissions(submissionsResponse.data);
//     } catch (error) {
//       console.error('Error loading dashboard data:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleExportCSV = async () => {
//     try {
//       const response = await surveyAPI.exportCSV(filters);
//       const blob = new Blob([response.data], { type: 'text/csv' });
//       const url = window.URL.createObjectURL(blob);
//       const a = document.createElement('a');
//       a.href = url;
//       a.download = 'rafsia_submissions.csv';
//       document.body.appendChild(a);
//       a.click();
//       window.URL.revokeObjectURL(url);
//       document.body.removeChild(a);
//     } catch (error) {
//       console.error('Error exporting CSV:', error);
//       alert('Error exporting data. Please try again.');
//     }
//   };

//   const handleFilterChange = (field: string, value: string) => {
//     setFilters(prev => ({ ...prev, [field]: value }));
//   };

//   const clearFilters = () => {
//     setFilters({
//       role: '',
//       county: '',
//       institution: '',
//       date_from: '',
//       date_to: '',
//     });
//   };

//   if (loading && !statistics) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
//           <p className="mt-4 text-gray-600">Loading dashboard...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {/* Header */}
//         <div className="mb-8">
//           <h1 className="text-3xl font-bold text-gray-900">RAFSIA Admin Dashboard</h1>
//           <p className="text-gray-600 mt-2">Monitor and analyze readiness assessment data</p>
//         </div>

//         {/* Statistics Cards */}
//         {statistics && (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//             <Card>
//               <CardContent className="flex items-center p-6">
//                 <div className="flex-shrink-0">
//                   <Users className="h-8 w-8 text-blue-600" />
//                 </div>
//                 <div className="ml-4">
//                   <p className="text-sm font-medium text-gray-600">Total Submissions</p>
//                   <p className="text-2xl font-semibold text-gray-900">{statistics.total_submissions}</p>
//                 </div>
//               </CardContent>
//             </Card>

//             <Card>
//               <CardContent className="flex items-center p-6">
//                 <div className="flex-shrink-0">
//                   <TrendingUp className="h-8 w-8 text-green-600" />
//                 </div>
//                 <div className="ml-4">
//                   <p className="text-sm font-medium text-gray-600">Average Readiness</p>
//                   <p className="text-2xl font-semibold text-gray-900">
//                     {Math.round(statistics.average_scores.overall)}%
//                   </p>
//                 </div>
//               </CardContent>
//             </Card>

//             <Card>
//               <CardContent className="flex items-center p-6">
//                 <div className="flex-shrink-0">
//                   <BarChart3 className="h-8 w-8 text-purple-600" />
//                 </div>
//                 <div className="ml-4">
//                   <p className="text-sm font-medium text-gray-600">Very Ready</p>
//                   <p className="text-2xl font-semibold text-gray-900">
//                     {statistics.by_readiness_level.very_ready || 0}
//                   </p>
//                 </div>
//               </CardContent>
//             </Card>

//             <Card>
//               <CardContent className="flex items-center p-6">
//                 <div className="flex-shrink-0">
//                   <FileText className="h-8 w-8 text-amber-600" />
//                 </div>
//                 <div className="ml-4">
//                   <p className="text-sm font-medium text-gray-600">Counties</p>
//                   <p className="text-2xl font-semibold text-gray-900">
//                     {Object.keys(statistics.by_county).length}
//                   </p>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>
//         )}

//         {/* Filters and Actions */}
//         <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
//           <div className="flex items-center space-x-4">
//             <Button
//               variant="outline"
//               onClick={() => setShowFilters(!showFilters)}
//               className="flex items-center space-x-2"
//             >
//               <Filter size={16} />
//               <span>Filters</span>
//             </Button>
            
//             {Object.values(filters).some(Boolean) && (
//               <Button variant="outline" onClick={clearFilters}>
//                 Clear Filters
//               </Button>
//             )}
//           </div>

//           <div className="flex items-center space-x-4">
//             <Button
//               onClick={handleExportCSV}
//               className="flex items-center space-x-2"
//             >
//               <Download size={16} />
//               <span>Export CSV</span>
//             </Button>
//           </div>
//         </div>

//         {/* Filters Modal */}
//         <Modal
//           isOpen={showFilters}
//           onClose={() => setShowFilters(false)}
//           title="Filter Submissions"
//         >
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <Select
//               label="Role"
//               value={filters.role}
//               onChange={(e) => handleFilterChange('role', e.target.value)}
//               options={[
//                 { value: '', label: 'All roles' },
//                 { value: 'lecturer', label: 'Lecturer' },
//                 { value: 'it_support', label: 'IT Support' },
//                 { value: 'admin', label: 'Administrator' },
//                 { value: 'principal', label: 'Principal' },
//                 { value: 'student', label: 'Student' },
//                 { value: 'service_provider', label: 'Service Provider' },
//               ]}
//             />

//             <Input
//               label="County"
//               type="text"
//               value={filters.county}
//               onChange={(e) => handleFilterChange('county', e.target.value)}
//               placeholder="Filter by county..."
//             />

//             <Input
//               label="Institution"
//               type="text"
//               value={filters.institution}
//               onChange={(e) => handleFilterChange('institution', e.target.value)}
//               placeholder="Filter by institution..."
//             />

//             <Input
//               label="Date From"
//               type="date"
//               value={filters.date_from}
//               onChange={(e) => handleFilterChange('date_from', e.target.value)}
//             />

//             <Input
//               label="Date To"
//               type="date"
//               value={filters.date_to}
//               onChange={(e) => handleFilterChange('date_to', e.target.value)}
//             />
//           </div>

//           <div className="flex justify-end space-x-4 mt-6">
//             <Button variant="outline" onClick={() => setShowFilters(false)}>
//               Cancel
//             </Button>
//             <Button onClick={() => setShowFilters(false)}>
//               Apply Filters
//             </Button>
//           </div>
//         </Modal>

//         {/* Submissions Table */}
//         <Card>
//           <CardHeader>
//             <h3 className="text-lg font-semibold text-gray-900">Recent Submissions</h3>
//             <p className="text-sm text-gray-600">
//               {loading ? 'Loading...' : `${submissions.length} submissions found`}
//             </p>
//           </CardHeader>
//           <CardContent>
//             <div className="overflow-x-auto">
//               <table className="min-w-full divide-y divide-gray-200">
//                 <thead className="bg-gray-50">
//                   <tr>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Respondent
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Role
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Institution
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       County
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Overall Score
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Readiness Level
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Submitted
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Actions
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody className="bg-white divide-y divide-gray-200">
//                   {submissions.map((submission) => (
//                     <tr key={submission.id} className="hover:bg-gray-50">
//                       <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
//                         {submission.name || 'Anonymous'}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                         {submission.role}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                         {submission.institution_name_display}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                         {submission.county}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
//                         {Math.round(submission.overall_score)}%
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <span className={`px-2 py-1 text-xs font-medium rounded-full ${
//                           submission.readiness_level === 'very_ready'
//                             ? 'bg-green-100 text-green-800'
//                             : submission.readiness_level === 'not_sure'
//                             ? 'bg-amber-100 text-amber-800'
//                             : 'bg-red-100 text-red-800'
//                         }`}>
//                           {submission.readiness_level === 'very_ready'
//                             ? 'Very Ready'
//                             : submission.readiness_level === 'not_sure'
//                             ? 'Not Sure'
//                             : 'Not Ready'
//                           }
//                         </span>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                         {new Date(submission.submitted_at).toLocaleDateString()}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                         <Button
//                           variant="outline"
//                           size="sm"
//                           onClick={() => window.open(`/results/${submission.id}`, '_blank')}
//                         >
//                           View Results
//                         </Button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>

//             {submissions.length === 0 && !loading && (
//               <div className="text-center py-8">
//                 <p className="text-gray-500">No submissions found matching your criteria.</p>
//               </div>
//             )}
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// };


'use client';
import React, { useEffect, useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import AdminLayout from '@/components/admin/AdminLayout';
import SubmissionsTab from '@/components/admin/SubmissionsTab';
import SurveysTab from '@/components/admin/SurveysTab';
import QuestionsTab from '@/components/admin/QuestionsTab';
import AnswersTab from '@/components/admin/AnswersTab';
import ProjectsTab from '@/components/admin/ProjectsTab';
import UsersTab from '@/components/admin/UsersTab';
import CommentsTab from '@/components/admin/CommentsTab';

type TabKey = 'submissions' | 'surveys' | 'questions' | 'answers' | 'projects' | 'users' | 'comments';

const TABS: TabKey[] = ['submissions', 'surveys', 'questions', 'answers', 'projects', 'users', 'comments'];

export default function AdminDashboardPage() {
  const router = useRouter();
  const sp = useSearchParams();
  const tabFromUrl = (sp?.get('tab') as TabKey) || 'submissions';
  const [activeTab, setActiveTab] = useState<TabKey>(tabFromUrl);

  // keep URL in sync with selected tab (deep-linkable)
  useEffect(() => {
    if (tabFromUrl !== activeTab) {
      const qp = new URLSearchParams(sp?.toString() || '');
      qp.set('tab', activeTab);
      router.replace(`/admin?${qp.toString()}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

  // if user navigates via back/forward and the URL changes, reflect it
  useEffect(() => {
    if (tabFromUrl !== activeTab) setActiveTab(tabFromUrl);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tabFromUrl]);

  // auth check
  useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null;
    if (!token) {
      router.push('/admin/login');
    }
  }, [router]);

  const content = useMemo(() => {
    switch (activeTab) {
      case 'submissions':
        return <SubmissionsTab />;
      case 'surveys':
        return <SurveysTab />;
      case 'questions':
        return <QuestionsTab />;
      case 'answers':
        return <AnswersTab />;
      case 'projects':
        return <ProjectsTab />;
      case 'users':
        return <UsersTab />;
      case 'comments':
        return <CommentsTab />;
      default:
        return <SubmissionsTab />;
    }
  }, [activeTab]);

  return (
    <AdminLayout
      tabs={TABS}
      activeTab={activeTab}
      onTabChange={setActiveTab}
    >
      {content}
    </AdminLayout>
  );
}