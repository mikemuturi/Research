@@ .. @@
 // Survey API
 export const surveyAPI = {
   getQuestions: (role?: string, dimension?: string) =>
     api.get('/surveys/questions/', { params: { role, dimension } }),
   
   submitSurvey: (data: any) =>
     api.post('/surveys/submissions/', data),
   
   getSubmission: (id: string, isPublic?: boolean) =>
     api.get(`/surveys/submissions/${id}/`, { 
       params: isPublic ? { public: 'true' } : {} 
     }),
   
   getSubmissions: (filters?: any) =>
     api.get('/surveys/submissions/', { params: filters }),
   
   getStatistics: () =>
     api.get('/surveys/submissions/statistics/'),
   
   exportCSV: (filters?: any) =>
     api.get('/surveys/submissions/export_csv/', { params: filters }),
   
   exportPDF: (id: string) =>
     api.get(`/surveys/submissions/${id}/export_pdf/`),
   
   getInstitutions: () =>
     api.get('/surveys/institutions/'),
   
   getProjects: () =>
     api.get('/surveys/projects/'),
+
+  // Projects CRUD
+  createProject: (data: any) =>
+    api.post('/surveys/projects/', data),
+  
+  updateProject: (id: string, data: any) =>
+    api.put(`/surveys/projects/${id}/`, data),
+  
+  deleteProject: (id: string) =>
+    api.delete(`/surveys/projects/${id}/`),
+
+  // Questions CRUD
+  createQuestion: (data: any) =>
+    api.post('/surveys/questions/', data),
+  
+  updateQuestion: (id: string, data: any) =>
+    api.put(`/surveys/questions/${id}/`, data),
+  
+  deleteQuestion: (id: string) =>
+    api.delete(`/surveys/questions/${id}/`),
+
+  // Institutions CRUD
+  createInstitution: (data: any) =>
+    api.post('/surveys/institutions/', data),
+  
+  updateInstitution: (id: string, data: any) =>
+    api.put(`/surveys/institutions/${id}/`, data),
+  
+  deleteInstitution: (id: string) =>
+    api.delete(`/surveys/institutions/${id}/`),
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
+
+// Admin API for user management
+export const adminAPI = {
+  getUsers: (filters?: any) =>
+    api.get('/admin/users/', { params: filters }),
+  
+  createUser: (data: any) =>
+    api.post('/admin/users/', data),
+  
+  updateUser: (id: string, data: any) =>
+    api.put(`/admin/users/${id}/`, data),
+  
+  deleteUser: (id: string) =>
+    api.delete(`/admin/users/${id}/`),
+
+  // Get answers with detailed information
+  getAnswers: (filters?: any) =>
+    api.get('/surveys/answers/', { params: filters }),
+};