import axios from 'axios';
import { API_URL } from '../config/constants';

// Helper: agrega Authorization si hay token en sessionStorage
const withAuth = (headers = {}) => {
  try {
    const token = sessionStorage.getItem('authToken');
    if (token) {
      return { ...headers, Authorization: `Bearer ${token}` };
    }
  } catch (_) { /* no-op en SSR/test */ }
  return headers;
};

// Servicio centralizado para todas las llamadas API
const apiService = {
  // Recipes
  getAllRecipes: () => axios.get(`${API_URL}/api/recipes`),
  getRecipeById: (id) => axios.get(`${API_URL}/api/recipes/${id}`),

  // NEW: crear receta con multipart/form-data
  createRecipe: (formData, onUploadProgress) => {
    return axios.post(`${API_URL}/api/recipes`, formData, {
      headers: withAuth({ 'Content-Type': 'multipart/form-data' }),
      onUploadProgress
    });
  },

  // NEW: actualizar receta
  updateRecipe: (id, formData, onUploadProgress) => {
    return axios.put(`${API_URL}/api/recipes/${id}`, formData, {
      headers: withAuth({ 'Content-Type': 'multipart/form-data' }),
      onUploadProgress
    });
  },

  // NEW: eliminar receta
  deleteRecipe: (id) => axios.delete(`${API_URL}/api/recipes/${id}`, { headers: withAuth() }),

  // Life Stories
  getAllStories: () => axios.get(`${API_URL}/api/life-stories`),
  getLifeStoryById: (id) => axios.get(`${API_URL}/api/life-stories/${id}`),
  createLifeStory: (formData, onUploadProgress) =>
    axios.post(`${API_URL}/api/life-stories`, formData, {
      headers: withAuth({ 'Content-Type': 'multipart/form-data' }),
      onUploadProgress,
    }),

  updateLifeStory: (id, formData, onUploadProgress) =>
    axios.put(`${API_URL}/api/life-stories/${id}`, formData, {
      headers: withAuth({ 'Content-Type': 'multipart/form-data' }),
      onUploadProgress,
    }),

  addLifeStoryImages: (id, formData) =>
    axios.patch(`${API_URL}/api/life-stories/${id}/images`, formData, {
      headers: withAuth({ 'Content-Type': 'multipart/form-data' }),
    }),

  deleteLifeStory: (id) => axios.delete(`${API_URL}/api/life-stories/${id}`, { headers: withAuth() }),

  // Cultural Data
  getAllCulturalData: () => axios.get(`${API_URL}/api/cultural-data`),
  getCulturalDataById: (id) => axios.get(`${API_URL}/api/cultural-data/${id}`),
  getCulturalDataByCategory: (category) => axios.get(`${API_URL}/api/cultural-data/category/${category}`),
  createCulturalData: (formData, onUploadProgress) =>
    axios.post(`${API_URL}/api/cultural-data`, formData, {
      headers: withAuth({ 'Content-Type': 'multipart/form-data' }),
      onUploadProgress,
    }),

  updateCulturalData: (id, formData, onUploadProgress) =>
    axios.put(`${API_URL}/api/cultural-data/${id}`, formData, {
      headers: withAuth({ 'Content-Type': 'multipart/form-data' }),
      onUploadProgress,
    }),

  deleteCulturalData: (id) => axios.delete(`${API_URL}/api/cultural-data/${id}`, { headers: withAuth() }),

  // AI Chat
  askAI: (question, recipeData = null) => axios.post(`${API_URL}/api/chat`, { question, recipeData }),

  // Admin
  validateAdminPassword: (password) => axios.post(`${API_URL}/api/admin/validate`, { password })
};

export default apiService;
