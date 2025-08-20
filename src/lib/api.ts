import axios from 'axios';
import { SURVEY_QUESTIONS } from './questions';

const API_BASE_URL = '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      const refreshToken = localStorage.getItem('refresh_token');
      if (refreshToken) {
        try {
          const response = await axios.post(`${API_BASE_URL}/auth/token/refresh/`, {
            refresh: refreshToken,
          });
          const { access } = response.data;
          localStorage.setItem('access_token', access);
          
          // Retry original request
          error.config.headers.Authorization = `Bearer ${access}`;
          return api.request(error.config);
        } catch (refreshError) {
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          window.location.href = '/admin/login';
        }
      }
    }
    return Promise.reject(error);
  }
);

export default api;

// Auth API
export const authAPI = {
  login: (usernameOrEmail: string, password: string) => {
    // Mock authentication since backend is not running
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Check admin credentials
        if ((usernameOrEmail === 'admin' && password === 'admin123') ||
            (usernameOrEmail === 'admin@rafsia.org' && password === 'admin123')) {
          resolve({
            data: {
              access: 'mock-admin-access-token',
              refresh: 'mock-admin-refresh-token',
              user: {
                id: 1,
                username: 'admin',
                email: 'admin@rafsia.org',
                first_name: 'Admin',
                last_name: 'User',
                is_staff: true,
                is_superuser: true,
                role: 'admin'
              }
            }
          });
        }
        // Check user credentials
        else if ((usernameOrEmail === 'user' && password === 'password') ||
                 (usernameOrEmail === 'user@example.com' && password === 'password')) {
          resolve({
            data: {
              access: 'mock-user-access-token',
              refresh: 'mock-user-refresh-token',
              user: {
                id: 2,
                username: 'user',
                email: 'user@example.com',
                first_name: 'John',
                last_name: 'Doe',
                is_staff: false,
                is_superuser: false,
                role: 'user'
              }
            }
          });
        }
        else {
          reject({
            response: {
              status: 400,
              data: { detail: 'Invalid credentials' }
            }
          });
        }
      }, 500); // Simulate network delay
    });
  },
  
  refresh: (refresh_token: string) =>
    api.post('/auth/token/refresh/', { refresh: refresh_token }),
};

// Survey API
export const surveyAPI = {
  getQuestions: (role?: string, dimension?: string) => {
    // Mock questions data
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockQuestions = [
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
          // Add more mock questions as needed
        ];
        resolve({ data: mockQuestions });
      }, 300);
    });
  },
  
  submitSurvey: (data: any) => {
    // Mock survey submission
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: {
            id: Math.floor(Math.random() * 1000),
            ...data,
            submitted_at: new Date().toISOString(),
            overall_score: Math.floor(Math.random() * 40) + 60, // Random score 60-100
            readiness_level: 'not_sure'
          }
        });
      }, 1000);
    });
  },
  
  getSubmission: (id: string, isPublic?: boolean) => {
    // Mock submission data
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: {
            id: parseInt(id),
            name: 'John Doe',
            email: 'john@example.com',
            role: 'lecturer',
            institution_name_display: 'Masinde Muliro University',
            county: 'Kakamega',
            submitted_at: new Date().toISOString(),
            technical_score: 75,
            economic_score: 68,
            socio_cultural_score: 82,
            environmental_score: 71,
            policy_regulatory_score: 79,
            overall_score: 75,
            readiness_level: 'not_sure',
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
          }
        });
      }, 300);
    });
  },
  
  getSubmissions: (filters?: any) => {
    // Mock submissions data
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: [
            {
              id: 1,
              name: 'John Doe',
              role: 'lecturer',
              institution_name_display: 'Masinde Muliro University',
              county: 'Kakamega',
              submitted_at: '2025-01-15T10:30:00Z',
              overall_score: 75,
              readiness_level: 'not_sure'
            }
          ]
        });
      }, 300);
    });
  },
  
  getStatistics: () => {
    // Mock statistics data
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: {
            total_submissions: 45,
            by_role: { lecturer: 20, student: 15, admin: 10 },
            by_county: { Kakamega: 25, Bungoma: 20 },
            by_readiness_level: { very_ready: 15, not_sure: 20, not_ready: 10 },
            average_scores: {
              technical: 72,
              economic: 65,
              socio_cultural: 78,
              environmental: 70,
              policy_regulatory: 75,
              overall: 72
            }
          }
        });
      }, 300);
    });
  },
  
  exportCSV: (filters?: any) =>
    api.get('/surveys/submissions/export_csv/', { params: filters }),
  
  exportPDF: (id: string) =>
    api.get(`/surveys/submissions/${id}/export_pdf/`),
  
  getInstitutions: () =>
    api.get('/surveys/institutions/'),
  
  getProjects: () =>
    api.get('/surveys/projects/'),

  // Projects CRUD
  createProject: (data: any) =>
    api.post('/surveys/projects/', data),
  
  updateProject: (id: string, data: any) =>
    api.put(`/surveys/projects/${id}/`, data),
  
  deleteProject: (id: string) =>
    api.delete(`/surveys/projects/${id}/`),

  // Questions CRUD
  createQuestion: (data: any) =>
    api.post('/surveys/questions-admin/', data),
  
  updateQuestion: (id: string, data: any) =>
    api.put(`/surveys/questions-admin/${id}/`, data),
  
  deleteQuestion: (id: string) =>
    api.delete(`/surveys/questions-admin/${id}/`),

  // Institutions CRUD
  createInstitution: (data: any) =>
    api.post('/surveys/institutions/', data),
  
  updateInstitution: (id: string, data: any) =>
    api.put(`/surveys/institutions/${id}/`, data),
  
  deleteInstitution: (id: string) =>
    api.delete(`/surveys/institutions/${id}/`),
};

// Interview API
export const interviewAPI = {
  getNotes: (filters?: any) =>
    api.get('/interviews/notes/', { params: filters }),
  
  createNote: (data: any) =>
    api.post('/interviews/notes/', data),
  
  updateNote: (id: string, data: any) =>
    api.put(`/interviews/notes/${id}/`, data),
  
  deleteNote: (id: string) =>
    api.delete(`/interviews/notes/${id}/`),
  
  getAnalytics: () =>
    api.get('/interviews/notes/analytics/'),
};

// Admin API for user management
export const adminAPI = {
  getUsers: (filters?: any) =>
    api.get('/admin/users/', { params: filters }),
  
  createUser: (data: any) =>
    api.post('/admin/users/', data),
  
  updateUser: (id: string, data: any) =>
    api.put(`/admin/users/${id}/`, data),
  
  deleteUser: (id: string) =>
    api.delete(`/admin/users/${id}/`),

  // Get answers with detailed information
  getAnswers: (filters?: any) =>
    api.get('/surveys/answers/', { params: filters }),
};