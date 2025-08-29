// 'use client';
// import React from 'react';
// import { Card, CardContent, CardHeader } from '@/components/ui/Card';

// export default function ProjectsTab() {
//   return (
//     <Card>
//       <CardHeader>
//         <h3 className="text-lg font-semibold text-gray-900">Projects</h3>
//         <p className="text-sm text-gray-600">Manage research projects (coming soon)</p>
//       </CardHeader>
//       <CardContent>
//         <div className="text-gray-600">Projects management UI goes here.</div>
//       </CardContent>
//     </Card>
//   );
// }

'use client';
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { surveyAPI } from '@/lib/api'; // Adjust the import path as needed

interface Project {
  id: string;
  name: string;
  description?: string;
  status?: string;
  created_at: string;
  updated_at: string;
  created_by?: string;
  institution?: string;
  start_date?: string;
  end_date?: string;
  participants_count?: number;
  surveys_count?: number;
}

export default function ProjectsTab() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);

  // Fetch projects and calculate participants from submissions
  const fetchProjects = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Fetch projects
      const projectsResponse = await surveyAPI.getProjects();
      const projectsData = projectsResponse.data;
      
      // Debug logging
      console.log('Projects API Response:', projectsResponse);
      console.log('Projects Data:', projectsData);
      console.log('Data type:', typeof projectsData);
      console.log('Is array?', Array.isArray(projectsData));
      
      // Handle different possible response structures
      let actualProjects = projectsData;
      
      // If response has a 'results' field (paginated response)
      if (projectsData && projectsData.results) {
        actualProjects = projectsData.results;
        console.log('Using paginated results:', actualProjects);
      }
      
      // If response has a 'data' field
      if (projectsData && projectsData.data) {
        actualProjects = projectsData.data;
        console.log('Using nested data:', actualProjects);
      }
      
      // Ensure it's an array
      if (!Array.isArray(actualProjects)) {
        console.warn('Expected array but got:', typeof actualProjects);
        actualProjects = [];
      }

      // Fetch all submissions to calculate participants per project
      let submissionsData = [];
      try {
        const submissionsResponse = await surveyAPI.getSubmissions();
        let actualSubmissions = submissionsResponse.data;
        
        console.log('Submissions API Response:', submissionsResponse);
        console.log('Submissions Data:', actualSubmissions);
        
        // Handle different possible submission response structures
        if (actualSubmissions && actualSubmissions.results) {
          actualSubmissions = actualSubmissions.results;
        }
        
        if (actualSubmissions && actualSubmissions.data) {
          actualSubmissions = actualSubmissions.data;
        }
        
        if (Array.isArray(actualSubmissions)) {
          submissionsData = actualSubmissions;
        }
        
        console.log('Final submissions data:', submissionsData);
      } catch (submissionErr) {
        console.warn('Could not fetch submissions:', submissionErr);
      }

      // Calculate participants and surveys per project from submissions
      const projectStats = actualProjects.reduce((stats: any, project: any) => {
        const projectId = project.id || project.pk;
        
        // Find submissions for this project - try different possible field names
        const projectSubmissions = submissionsData.filter((submission: any) => {
          const submissionProjectId = submission.project_id || 
                                    submission.project || 
                                    submission.survey_project ||
                                    submission.related_project;
          
          return submissionProjectId && 
                 (submissionProjectId === projectId || 
                  submissionProjectId.toString() === projectId.toString());
        });
        
        console.log(`Project ${projectId} submissions:`, projectSubmissions);
        
        // Count unique participants (by email, user_id, participant_id, etc.)
        const uniqueParticipants = new Set();
        projectSubmissions.forEach((submission: any) => {
          const participantId = submission.participant_id ||
                               submission.user_id ||
                               submission.email ||
                               submission.participant_email ||
                               submission.respondent ||
                               submission.created_by ||
                               submission.id; // fallback to submission id
          
          if (participantId) {
            uniqueParticipants.add(participantId);
          }
        });
        
        stats[projectId] = {
          participants_count: uniqueParticipants.size,
          surveys_count: projectSubmissions.length,
          submissions: projectSubmissions
        };
        
        return stats;
      }, {});

      console.log('Project statistics from submissions:', projectStats);
      
      // Map the data to ensure consistent structure with calculated stats
      const formattedProjects = actualProjects.map((project: any) => {
        const projectId = project.id || project.pk || 'unknown';
        const stats = projectStats[projectId] || { participants_count: 0, surveys_count: 0 };
        
        return {
          id: projectId,
          name: project.name || project.title || project.project_name || 'Unnamed Project',
          description: project.description || project.desc || '',
          status: project.status || 'active',
          created_at: project.created_at || new Date().toISOString(),
          updated_at: project.updated_at || new Date().toISOString(),
          created_by: project.created_by || project.owner || project.creator,
          institution: project.institution || project.organization,
          start_date: project.start_date,
          end_date: project.end_date,
          // Use calculated stats from submissions, fallback to project data
          participants_count: stats.participants_count || project.participants_count || project.participants || 0,
          surveys_count: stats.surveys_count || project.surveys_count || project.surveys || 0
        };
      });
      
      console.log('Final formatted projects:', formattedProjects);
      setProjects(formattedProjects);
    } catch (err: any) {
      console.error('Error fetching projects:', err);
      setError(err.response?.data?.message || 'Failed to fetch projects');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch {
      return 'Invalid Date';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'paused':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleCreateProject = () => {
    setShowCreateForm(true);
    // TODO: Implement create project functionality
    console.log('Create new project clicked');
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold text-gray-900">Projects</h3>
          <p className="text-sm text-gray-600">Loading projects...</p>
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
          <h3 className="text-lg font-semibold text-gray-900">Projects</h3>
          <p className="text-sm text-red-600">Error loading projects</p>
        </CardHeader>
        <CardContent>
          <div className="text-red-600 py-4">
            {error}
            <button 
              onClick={fetchProjects}
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
    <div className="space-y-6">
      {/* Statistics Cards - Now at the top */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <span className="text-blue-600 text-xl">📁</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Projects</p>
                <p className="text-2xl font-bold text-gray-900">{projects.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <span className="text-green-600 text-xl">✅</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active Projects</p>
                <p className="text-2xl font-bold text-gray-900">
                  {projects.filter(p => p.status?.toLowerCase() === 'active').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <span className="text-purple-600 text-xl">👥</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Participants</p>
                <p className="text-2xl font-bold text-gray-900">
                  {projects.reduce((sum, p) => sum + (p.participants_count || 0), 0)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-orange-100 rounded-lg">
                <span className="text-orange-600 text-xl">📋</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Surveys</p>
                <p className="text-2xl font-bold text-gray-900">
                  {projects.reduce((sum, p) => sum + (p.surveys_count || 0), 0)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Projects Table */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Research Projects</h3>
              <p className="text-sm text-gray-600">
                Manage and monitor your research projects
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={fetchProjects}
                className="px-4 py-2 bg-gray-100 text-gray-700 text-sm rounded hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                Refresh
              </button>
              <button
                onClick={handleCreateProject}
                className="px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                + Create New Project
              </button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {projects.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">📁</div>
              <h4 className="text-lg font-medium text-gray-900 mb-2">No projects found</h4>
              <p className="text-gray-600 mb-6">
                Get started by creating your first research project.
              </p>
              <button
                onClick={handleCreateProject}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Create Your First Project
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Project Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Institution
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Participants
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Surveys
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Created
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Last Updated
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {projects.map((project) => (
                    <tr key={project.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {project.name}
                          </div>
                          {project.description && (
                            <div className="text-sm text-gray-500 truncate max-w-xs">
                              {project.description}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(project.status || 'active')}`}>
                          {project.status || 'Active'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {project.institution || '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {project.participants_count || 0}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {project.surveys_count || 0}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(project.created_at)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(project.updated_at)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-2">
                          <button 
                            className="text-blue-600 hover:text-blue-900"
                            onClick={() => console.log('View project:', project.id)}
                          >
                            View
                          </button>
                          <button 
                            className="text-indigo-600 hover:text-indigo-900"
                            onClick={() => console.log('Edit project:', project.id)}
                          >
                            Edit
                          </button>
                          <button 
                            className="text-red-600 hover:text-red-900"
                            onClick={() => console.log('Delete project:', project.id)}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}