import axios, { AxiosResponse } from "axios";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "https://rafsia.org/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

const isBrowser = typeof window !== "undefined";

// Attach access token for client requests
api.interceptors.request.use((config) => {
  if (isBrowser) {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers = config.headers || {};
      (config.headers as any).Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// Auto-refresh access token once on 401
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const status = error?.response?.status;
    const original = error.config;

    if (status === 401 && isBrowser && !original?._retry) {
      const refreshToken = localStorage.getItem("refresh_token");
      if (refreshToken) {
        try {
          original._retry = true;
          const { data } = await axios.post(`${API_BASE_URL}/auth/token/refresh/`, {
            refresh: refreshToken,
          });
          const { access } = data || {};
          if (access) {
            localStorage.setItem("access_token", access);
            original.headers = original.headers || {};
            original.headers.Authorization = `Bearer ${access}`;
            return api.request(original);
          }
        } catch {
          // fall-through to logout
        }
      }
      // clear tokens & redirect to login
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      if (isBrowser) window.location.href = "/admin/login";
    }
    return Promise.reject(error);
  }
);

export default api;

export const authAPI = {
  login: (usernameOrEmail: string, password: string): Promise<AxiosResponse<any>> =>
    api.post("/auth/token/", { username: usernameOrEmail, password }),
  
  register: (username: string, email: string, password: string): Promise<AxiosResponse<any>> =>
    api.post("/auth/register/", { username, email, password }),

  refresh: (refresh_token: string): Promise<AxiosResponse<any>> =>
    api.post("/auth/token/refresh/", { refresh: refresh_token }),
};

export const surveyAPI = {
  // Enhanced getQuestions method with survey_type support (keeping backward compatibility)
  getQuestions: (role?: string, surveyType: string = 'rafsia', dimension?: string) => {
    const params: any = {};
    if (role) params.role = role;
    if (surveyType) params.survey_type = surveyType;
    if (dimension) params.dimension = dimension;
    
    return api.get("/surveys/questions/", { params });
  },

  // Keep the working submitSurvey method from the first part
  submitSurvey: (data: any) => api.post("/surveys/submissions/", data),

  getSubmission: (id: string, isPublic?: boolean) =>
    api.get(`/surveys/submissions/${id}/`, { params: isPublic ? { public: "true" } : {} }),

  // Enhanced getSubmissions with survey_type filter support
  getSubmissions: (filters?: any, page?: number, pageSize?: number) => {
    const params = { ...filters };
    if (page) params.page = page;
    if (pageSize) params.page_size = pageSize;
    return api.get("/surveys/submissions/", { params });
  },

  // Enhanced getStatistics with survey_type filter support
  getStatistics: (filters?: any) => 
    api.get("/surveys/submissions/statistics/", { params: filters }),

  // Enhanced exportCSV with survey_type filter support
  exportCSV: (filters?: any) => 
    api.get("/surveys/submissions/export_csv/", { params: filters }),

  exportPDF: (id: string) => api.get(`/surveys/submissions/${id}/export_pdf/`),

  getInstitutions: () => api.get("/surveys/institutions/"),

  getProjects: () => api.get("/surveys/projects/"),

  // Helper methods for specific survey types
  getRafsiaQuestions: (role?: string, dimension?: string) =>
    surveyAPI.getQuestions(role, 'rafsia', dimension),

  getIspQuestions: (role?: string, dimension?: string) =>
    surveyAPI.getQuestions(role, 'isp', dimension),

  // Get submissions filtered by survey type
  getRafsiaSubmissions: (filters?: any, page?: number, pageSize?: number) =>
    surveyAPI.getSubmissions({ ...filters, survey_type: 'rafsia' }, page, pageSize),

  getIspSubmissions: (filters?: any, page?: number, pageSize?: number) =>
    surveyAPI.getSubmissions({ ...filters, survey_type: 'isp' }, page, pageSize),

  // Get statistics filtered by survey type
  getRafsiaStatistics: (filters?: any) =>
    surveyAPI.getStatistics({ ...filters, survey_type: 'rafsia' }),

  getIspStatistics: (filters?: any) =>
    surveyAPI.getStatistics({ ...filters, survey_type: 'isp' }),

  // Export CSV filtered by survey type
  exportRafsiaCSV: (filters?: any) =>
    surveyAPI.exportCSV({ ...filters, survey_type: 'rafsia' }),

  exportIspCSV: (filters?: any) =>
    surveyAPI.exportCSV({ ...filters, survey_type: 'isp' }),
};

export const interviewAPI = {
  getNotes: (filters?: any) => api.get("/interviews/notes/", { params: filters }),
  createNote: (data: any) => api.post("/interviews/notes/", data),
  updateNote: (id: string, data: any) => api.put(`/interviews/notes/${id}/`, data),
  deleteNote: (id: string) => api.delete(`/interviews/notes/${id}/`),
  getAnalytics: () => api.get("/interviews/notes/analytics/"),
};