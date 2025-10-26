import axios from 'axios';
import { API_URL } from '../config/constants';

// Servicio centralizado para todas las llamadas API
const apiService = {
  // Recipes
  getAllRecipes: () => axios.get(`${API_URL}/api/recipes`),
  getRecipeById: (id) => axios.get(`${API_URL}/api/recipes/${id}`),

  // NEW: crear receta con multipart/form-data
  createRecipe: (formData, onUploadProgress) => {
    return axios.post(`${API_URL}/api/recipes`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      onUploadProgress
    });
  },

  // Life Stories
  getAllStories: () => axios.get(`${API_URL}/api/life-stories`),
  createLifeStory: (formData, onUploadProgress) =>
    axios.post(`${API_URL}/api/life-stories`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      onUploadProgress,
    }),

  addLifeStoryImages: (id, formData) =>
    axios.patch(`${API_URL}/api/life-stories/${id}/images`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  // Cultural Data
  getAllCulturalData: () => axios.get(`${API_URL}/api/cultural-data`),
  getCulturalDataByCategory: (category) => axios.get(`${API_URL}/api/cultural-data/category/${category}`),

  // AI Chat
  askAI: (question, recipeData = null) => axios.post(`${API_URL}/api/chat`, { question, recipeData })
};

export default apiService;
