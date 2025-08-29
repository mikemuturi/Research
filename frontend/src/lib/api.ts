
import axios from "axios";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:8000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

const isBrowser = typeof window !== "undefined";

// attach token (client only)
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

// auto-refresh once on 401 (client only)
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
          // fall-through to logout below
        }
      }
      // clear & redirect to login
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      if (isBrowser) window.location.href = "/admin/login";
    }
    return Promise.reject(error);
  }
);

export default api;

export const authAPI = {
  // returns AxiosResponse; your page reads response.data (OK)
  login: (username: string, password: string) =>
    api.post("/auth/token/", { username, password }),
  refresh: (refresh_token: string) =>
    api.post("/auth/token/refresh/", { refresh: refresh_token }),
};

export const surveyAPI = {
  getQuestions: (role?: string, dimension?: string) =>
    api.get("/surveys/questions/", { params: { role, dimension } }),
  submitSurvey: (data: any) => api.post("/surveys/submissions/", data),
  getSubmission: (id: string, isPublic?: boolean) =>
    api.get(`/surveys/submissions/${id}/`, {
      params: isPublic ? { public: "true" } : {},
    }),
  getSubmissions: (filters?: any) =>
    api.get("/surveys/submissions/", { params: filters }),
  getStatistics: () => api.get("/surveys/submissions/statistics/"),
  exportCSV: (filters?: any) =>
    api.get("/surveys/submissions/export_csv/", { params: filters }),
  exportPDF: (id: string) => api.get(`/surveys/submissions/${id}/export_pdf/`),
  getInstitutions: () => api.get("/surveys/institutions/"),
  getProjects: () => api.get("/surveys/projects/"),
  
};

export const interviewAPI = {
  getNotes: (filters?: any) => api.get("/interviews/notes/", { params: filters }),
  createNote: (data: any) => api.post("/interviews/notes/", data),
  updateNote: (id: string, data: any) => api.put(`/interviews/notes/${id}/`, data),
  deleteNote: (id: string) => api.delete(`/interviews/notes/${id}/`),
  getAnalytics: () => api.get("/interviews/notes/analytics/"),
};



