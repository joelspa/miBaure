import axios from 'axios';
import { API_URL } from '../config/constants';
import { mockRecipes, mockLifeStories, mockCulturalData } from './mockData';

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

// --- AXIOS INTERCEPTOR PARA MODO DEMO ---
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    // Si no hay respuesta (servidor caído) o es un error de red
    if (!error.response || error.code === 'ERR_NETWORK') {
      const url = error.config.url;
      console.warn(`[Demo Mode] Intercepted failed request to: ${url}`);
      
      // Simular respuestas exitosas con mock data basado en la URL
      if (url.includes('/api/recipes')) {
        const match = url.match(/\/api\/recipes\/([^/]+)$/);
        if (match && error.config.method === 'get') {
           const id = match[1];
           const recipe = mockRecipes.find(r => r._id === id);
           return Promise.resolve({ data: recipe || mockRecipes[0] });
        }
        return Promise.resolve({ data: mockRecipes });
      }
      if (url.includes('/api/life-stories')) {
        const match = url.match(/\/api\/life-stories\/([^/]+)$/);
        if (match && error.config.method === 'get') {
           const id = match[1];
           const story = mockLifeStories.find(s => s._id === id);
           return Promise.resolve({ data: story || mockLifeStories[0] });
        }
        return Promise.resolve({ data: mockLifeStories });
      }
      if (url.includes('/api/cultural-data')) {
        const matchCategory = url.match(/\/api\/cultural-data\/category\/([^/]+)$/);
        if (matchCategory && error.config.method === 'get') {
           const category = decodeURIComponent(matchCategory[1]);
           const filtered = category === 'all' 
              ? mockCulturalData 
              : mockCulturalData.filter(d => d.category.toLowerCase() === category.toLowerCase());
           return Promise.resolve({ data: filtered });
        }
        
        const matchId = url.match(/\/api\/cultural-data\/([^/]+)$/);
        if (matchId && error.config.method === 'get' && !url.includes('/category/')) {
           const id = matchId[1];
           const data = mockCulturalData.find(d => d._id === id);
           return Promise.resolve({ data: data || mockCulturalData[0] });
        }
        return Promise.resolve({ data: mockCulturalData });
      }
      if (url.includes('/api/chat')) {
        return Promise.resolve({ data: { answer: "Modo demo: ¡Hola! Soy el asistente virtual (simulado). Esta es una respuesta de prueba ya que no hay conexión con el backend en este momento." } });
      }
      if (url.includes('/api/admin/validate')) {
         return Promise.resolve({ data: { success: true, token: "demo-token-123" } });
      }
      
      return Promise.resolve({ data: { success: true, message: "Acción simulada en modo demo" } });
    }
    return Promise.reject(error);
  }
);
// ----------------------------------------

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
