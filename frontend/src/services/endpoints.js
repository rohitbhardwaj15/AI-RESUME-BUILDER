import api from "./api";

export const authApi = {
  register: (payload) => api.post("/auth/register", payload),
  login: (payload) => api.post("/auth/login", payload),
  forgotPassword: (payload) => api.post("/auth/forgot-password", payload),
  resetPassword: (token, payload) => api.post(`/auth/reset-password/${token}`, payload),
  me: () => api.get("/user/me")
};

export const resumeApi = {
  list: () => api.get("/resume"),
  create: (payload) => api.post("/resume", payload),
  get: (id) => api.get(`/resume/${id}`),
  update: (id, payload) => api.put(`/resume/${id}`, payload),
  remove: (id) => api.delete(`/resume/${id}`),
  toggleVisibility: (id) => api.patch(`/resume/${id}/visibility`),
  getShared: (slug) => api.get(`/resume/public/${slug}`)
};

export const aiApi = {
  enhanceSummary: (payload) => api.post("/ai/summary", payload),
  improveExperience: (payload) => api.post("/ai/experience", payload),
  atsSuggestions: (payload) => api.post("/ai/ats", payload)
};

export const uploadApi = {
  uploadProfileImage: (formData) =>
    api.post("/upload/profile-image", formData, {
      headers: { "Content-Type": "multipart/form-data" }
    })
};
